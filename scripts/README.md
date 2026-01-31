# Scripts

This directory contains utility scripts for the web3web4.com project.

## optimize-images.sh

Comprehensive image optimization script that:

- **Converts** JPEG files with `.png` extensions to true PNG format
- **Optimizes** PNG files with pngquant and optipng
- **Optimizes** JPEG files with jpegoptim
- **Reports** detailed statistics about space saved

### Prerequisites

Install required dependencies:

```bash
brew install imagemagick pngquant optipng jpegoptim
```

### Usage

**Optimize all images in the repository:**
```bash
./scripts/optimize-images.sh
```

**Optimize images in a specific directory:**
```bash
./scripts/optimize-images.sh public/
./scripts/optimize-images.sh drafts-for-refrence/
```

### What It Does

1. **Step 1: Convert Misnamed Files**
   - Finds JPEG files with `.png` extensions
   - Converts them to true PNG format using ImageMagick
   - Optimizes with pngquant (95-100% quality) or optipng

2. **Step 2: Optimize PNG Files**
   - Runs optipng with maximum compression (`-o7`)
   - Uses lossless optimization
   - Preserves all metadata

3. **Step 3: Optimize JPEG Files**
   - Compresses JPEG files to 90% quality
   - Strips unnecessary metadata (EXIF, comments)
   - Maintains visual quality

### Output Example

```
========================================
Image Optimization Script
========================================

Checking dependencies...
✓ All dependencies installed

Step 1: Converting misnamed JPEG files to PNG...

Converting: ./public/og-image.png
  ✓ Converted and saved 65.1KB

Converted 1 JPEG files to PNG

Step 2: Optimizing PNG files...

./drafts-for-refrence/logo/web3web4_logo.png
  ✓ Saved 44.9KB

Optimized 15 PNG files

Step 3: Optimizing JPEG/JPG files...

Optimized 0 JPEG files

========================================
Summary
========================================
Total files processed:     77
Converted (JPEG→PNG):      14
Optimized PNG files:       15
Optimized JPEG files:      0
Total space saved:         2.1MB
========================================

✓ Image optimization complete!
```

### Tips

- Run this script before committing new images
- The script is safe to run multiple times (it will skip already optimized files)
- For very large repositories, specify a directory to speed up processing
- The script excludes `.git` directory automatically

### Technical Details

- PNG quality: 95-100% (pngquant) or lossless (optipng)
- JPEG quality: 90% (jpegoptim)
- Compression level: Maximum (`-o7` for PNG)
- Metadata: Stripped from JPEG, preserved in PNG
