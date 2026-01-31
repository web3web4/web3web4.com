# Image Optimization Guide

This guide explains how to optimize images in the web3web4.com repository.

## Quick Start

The easiest way to optimize images is to use the npm scripts:

```bash
# Optimize all images in the repository
pnpm optimize-images

# Optimize only public directory images
pnpm optimize-images:public

# Optimize only draft images
pnpm optimize-images:drafts
```

## What Gets Optimized

The script handles three scenarios:

### 1. Misnamed JPEG Files
Files with `.png` extension but JPEG format will be:
- Converted to true PNG format
- Optimized with pngquant (95-100% quality)
- If pngquant fails, optipng is used instead

### 2. PNG Files
True PNG files will be:
- Optimized with optipng (`-o7` maximum compression)
- Losslessly compressed
- Metadata preserved

### 3. JPEG/JPG Files
JPEG files will be:
- Compressed to 90% quality
- Stripped of unnecessary metadata (EXIF, comments)
- Optimized with jpegoptim

## Installation

If you haven't installed the required tools yet:

```bash
brew install imagemagick pngquant optipng jpegoptim
```

## Advanced Usage

You can also run the script directly for more control:

```bash
# Optimize everything
./scripts/optimize-images.sh

# Optimize specific directory
./scripts/optimize-images.sh path/to/directory

# See what will be optimized (dry run - not implemented yet)
# ./scripts/optimize-images.sh --dry-run
```

## When to Use

### Before Committing New Images
Always optimize images before committing them to version control:

```bash
# After adding new images to public/
pnpm optimize-images:public
git add public/
git commit -m "Add optimized images"
```

### Regular Maintenance
Run periodically to ensure all images are optimized:

```bash
pnpm optimize-images
```

### After Importing Images
If you've imported images from an external source or image generation tool:

```bash
# Optimize the specific directory
./scripts/optimize-images.sh drafts-for-refrence/
```

## Expected Results

### File Size Changes

- **JPEG → PNG conversion**: Files may increase in size (PNG is lossless)
  - Example: 182KB (JPEG) → 397KB (PNG)
  - This is expected and desirable for transparency support

- **PNG optimization**: Usually 0.1% - 5% reduction
  - Highly compressed PNGs may show little improvement
  - Some files may already be optimally compressed

- **JPEG optimization**: Usually 20% - 80% reduction
  - Depends on original compression
  - High-quality source images see more reduction

### Quality

- **PNG**: 100% lossless, no quality degradation
- **JPEG**: 90% quality, imperceptible quality loss

## Troubleshooting

### Script Won't Run

Make sure it's executable:
```bash
chmod +x scripts/optimize-images.sh
```

### Missing Dependencies

Install all required tools:
```bash
brew install imagemagick pngquant optipng jpegoptim
```

### No Space Saved

If files are already optimized, the script will report 0 bytes saved. This is normal.

### Permission Denied

Run with appropriate permissions:
```bash
# Make script executable
chmod +x scripts/optimize-images.sh

# Or run with bash explicitly
bash scripts/optimize-images.sh
```

## Tips

1. **Run after every image import** - Make it part of your workflow
2. **Commit separately** - Consider committing optimized images separately from code changes
3. **Check git diff** - Verify optimizations didn't corrupt images
4. **Safe to re-run** - The script is idempotent and safe to run multiple times

## Technical Details

For more information about the script internals, see [scripts/README.md](scripts/README.md).
