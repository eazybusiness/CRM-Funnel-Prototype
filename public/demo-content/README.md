# Demo Course Content

This directory contains placeholder content for testing the course purchase and viewing flow.

## Contents

- `course-1-modul-1-workbook.pdf` - Demo workbook for Course 1
- `course-2-stoffwechselkur-guide.pdf` - Demo ebook for Course 2

## Setup Instructions

To add demo content to the database, run:

```bash
# Connect to your Neon database and run:
psql $POSTGRES_URL_NON_POOLING -f scripts/add-demo-course-content.sql
```

Or use the Vercel Postgres dashboard to execute the SQL script.

## Video Placeholders

The demo uses YouTube placeholder URLs. Replace these with:
- **Client preference**: YouTube unlisted videos
- **Alternative**: Vimeo (for copy protection)

## Replacing with Real Content

When client provides real content:

1. Replace PDF files in this directory
2. Update video URLs in the database
3. Update lesson descriptions and titles
4. Test the full purchase-to-viewing flow

## Notes

- All PDFs are minimal placeholders for testing
- Video URLs point to placeholder content
- This content is NOT for production use
- Client will provide final course materials
