#!/bin/bash

###############################################################################
# Image Optimization Script
# 
# This script optimizes images in your repository:
# - Converts JPEG files with .png extensions to true PNG format
# - Optimizes PNG files with pngquant and optipng
# - Optimizes JPEG files with jpegoptim
# - Provides detailed output about all operations
#
# Usage:
#   ./scripts/optimize-images.sh [directory]
#
# If no directory is specified, it will process the entire repo (except .git)
###############################################################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if required tools are installed
check_dependencies() {
    local missing_deps=()
    
    command -v magick >/dev/null 2>&1 || missing_deps+=("imagemagick")
    command -v pngquant >/dev/null 2>&1 || missing_deps+=("pngquant")
    command -v optipng >/dev/null 2>&1 || missing_deps+=("optipng")
    command -v jpegoptim >/dev/null 2>&1 || missing_deps+=("jpegoptim")
    
    if [ ${#missing_deps[@]} -ne 0 ]; then
        echo -e "${RED}Error: Missing dependencies: ${missing_deps[*]}${NC}"
        echo -e "${YELLOW}Install with: brew install ${missing_deps[*]}${NC}"
        exit 1
    fi
}

# Get the directory to process
SEARCH_DIR="${1:-.}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Image Optimization Script${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check dependencies
echo -e "${YELLOW}Checking dependencies...${NC}"
check_dependencies
echo -e "${GREEN}✓ All dependencies installed${NC}"
echo ""

# Statistics
total_files=0
converted_files=0
optimized_jpeg_files=0
optimized_png_files=0
total_saved=0

# Process misnamed JPEG files (JPEGs with .png extension)
echo -e "${BLUE}Step 1: Converting misnamed JPEG files to PNG...${NC}"
echo ""

while IFS= read -r -d '' file; do
    if file "$file" | grep -qi "jpeg"; then
        echo -e "${YELLOW}Converting: $file${NC}"
        
        # Get original size
        original_size=$(stat -f%z "$file")
        
        # Convert JPEG to PNG
        magick "$file" -quality 100 "${file}.tmp.png" 2>/dev/null
        
        # Optimize with pngquant (try high quality first)
        if pngquant --quality=95-100 --speed 1 --force "${file}.tmp.png" --output "$file" 2>/dev/null; then
            rm "${file}.tmp.png"
        else
            # If pngquant fails, use optipng
            optipng -o7 "${file}.tmp.png" >/dev/null 2>&1
            mv "${file}.tmp.png" "$file"
        fi
        
        # Get new size
        new_size=$(stat -f%z "$file")
        saved=$((original_size - new_size))
        total_saved=$((total_saved + saved))
        
        if [ $saved -gt 0 ]; then
            echo -e "${GREEN}  ✓ Converted and saved $(numfmt --to=iec-i --suffix=B $saved)${NC}"
        else
            echo -e "${GREEN}  ✓ Converted (size increased by $(numfmt --to=iec-i --suffix=B ${saved#-}) - expected for PNG)${NC}"
        fi
        
        ((converted_files++))
        ((total_files++))
    fi
done < <(find "$SEARCH_DIR" -name "*.png" -type f ! -path "*/.git/*" -print0)

echo ""
echo -e "${GREEN}Converted $converted_files JPEG files to PNG${NC}"
echo ""

# Optimize true PNG files
echo -e "${BLUE}Step 2: Optimizing PNG files...${NC}"
echo ""

while IFS= read -r -d '' file; do
    # Skip if it's still a JPEG (shouldn't happen after step 1, but just in case)
    if file "$file" | grep -qi "jpeg"; then
        continue
    fi
    
    # Get original size
    original_size=$(stat -f%z "$file")
    
    # Try optimizing with optipng
    if optipng -o7 -preserve -quiet "$file" 2>/dev/null; then
        new_size=$(stat -f%z "$file")
        saved=$((original_size - new_size))
        
        if [ $saved -gt 0 ]; then
            echo -e "${YELLOW}$file${NC}"
            echo -e "${GREEN}  ✓ Saved $(numfmt --to=iec-i --suffix=B $saved)${NC}"
            total_saved=$((total_saved + saved))
            ((optimized_png_files++))
        fi
    fi
    
    ((total_files++))
done < <(find "$SEARCH_DIR" -name "*.png" -type f ! -path "*/.git/*" -print0)

echo ""
echo -e "${GREEN}Optimized $optimized_png_files PNG files${NC}"
echo ""

# Optimize JPEG files
echo -e "${BLUE}Step 3: Optimizing JPEG/JPG files...${NC}"
echo ""

while IFS= read -r -d '' file; do
    # Get original size
    original_size=$(stat -f%z "$file")
    
    # Optimize with jpegoptim
    if jpegoptim --max=90 --strip-all --quiet "$file" 2>/dev/null; then
        new_size=$(stat -f%z "$file")
        saved=$((original_size - new_size))
        
        if [ $saved -gt 0 ]; then
            echo -e "${YELLOW}$file${NC}"
            echo -e "${GREEN}  ✓ Saved $(numfmt --to=iec-i --suffix=B $saved)${NC}"
            total_saved=$((total_saved + saved))
            ((optimized_jpeg_files++))
        fi
    fi
    
    ((total_files++))
done < <(find "$SEARCH_DIR" \( -name "*.jpg" -o -name "*.jpeg" \) -type f ! -path "*/.git/*" -print0)

echo ""
echo -e "${GREEN}Optimized $optimized_jpeg_files JPEG files${NC}"
echo ""

# Summary
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Summary${NC}"
echo -e "${BLUE}========================================${NC}"
echo -e "Total files processed:     ${total_files}"
echo -e "Converted (JPEG→PNG):      ${converted_files}"
echo -e "Optimized PNG files:       ${optimized_png_files}"
echo -e "Optimized JPEG files:      ${optimized_jpeg_files}"
echo -e "Total space saved:         ${GREEN}$(numfmt --to=iec-i --suffix=B $total_saved)${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "${GREEN}✓ Image optimization complete!${NC}"
