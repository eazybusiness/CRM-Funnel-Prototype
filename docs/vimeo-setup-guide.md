# Vimeo Domain Restriction Setup Guide

## Overview
This guide explains how to set up domain restrictions on Vimeo to ensure your videos can only be embedded on your platform.

## Step 1: Configure Domain Privacy Settings

1. **Log in to Vimeo**
   - Go to [vimeo.com](https://vimeo.com) and log in

2. **Navigate to Video Settings**
   - Go to your video library
   - Click on the video you want to protect
   - Click the "Settings" button (gear icon)

3. **Set Domain Restrictions**
   - Go to the "Privacy" tab
   - Under "Where can this be embedded?" select "Only on sites I choose"
   - Add your domain: `crm-funnel-prototype.vercel.app`
   - Also add your local development domain: `localhost:3000`
   - Click "Save changes"

## Step 2: Configure Player Settings

1. **Player Preferences**
   - In video settings, go to "Embed" tab
   - Customize the player appearance as needed
   - Enable "Hide Vimeo logo" if desired (Pro/Plus feature)

2. **Advanced Settings**
   - Disable "Show video title and author" if you want a cleaner look
   - Enable "Loop" if you want the video to replay automatically
   - Set "Autoplay" preferences

## Step 3: Get the Embed Code

1. **Share Options**
   - Click the "Share" button on your video
   - Copy the embed code
   - The embed URL should look like: `https://player.vimeo.com/video/VIDEO_ID`

2. **Embed Parameters**
   - Add `h=UNIQUE_HASH` for additional security
   - Use `badge=0` to remove Vimeo badge
   - Use `autopause=0` to prevent other videos from pausing

## Step 4: Update Your Course Content

### For Free Preview Videos
The preview video is already embedded in `/pages/checkout.js`:
```html
<iframe
  src="https://player.vimeo.com/video/1201351155?h=YOUR_HASH&badge=0&autopause=0&player_id=0&app_id=58479"
  className="absolute top-0 left-0 w-full h-full rounded-lg"
  frameBorder="0"
  allow="autoplay; fullscreen; picture-in-picture"
  allowFullScreen
  title="Kurs Vorschau Video"
></iframe>
```

### For Paid Course Videos
1. Add video URLs to your database using the SQL script:
   ```sql
   UPDATE lessons 
   SET video_url = 'https://vimeo.com/YOUR_PROTECTED_VIDEO_ID'
   WHERE id = LESSON_ID;
   ```

2. The platform will automatically serve these videos to enrolled users only

## Security Best Practices

### Domain Whitelisting
- Always restrict embedding to your specific domains
- Include both production and development domains
- Remove any domains you no longer use

### Video Privacy Levels
- **Public**: Anyone can see the video
- **Password**: Requires password (not recommended for courses)
- **Only on sites I choose**: Best for course platforms
- **Only me**: For private testing

### Additional Protection
- Use the `h=` parameter in embed URLs for hash protection
- Regularly review your domain whitelist
- Monitor video analytics for unusual embedding

## Testing Your Setup

1. **Test Embedding**
   - Try embedding the video on your approved domain
   - Try embedding on an unauthorized domain (should fail)

2. **Test Access Control**
   - Log in as an enrolled user and verify video access
   - Log out or use a non-enrolled account (should be blocked)

3. **Check Analytics**
   - Monitor Vimeo analytics for embedding locations
   - Set up alerts for unauthorized embedding attempts

## Troubleshooting

### Video Not Showing
- Check if your domain is properly whitelisted
- Verify the video URL is correct
- Ensure you're using the player URL, not the regular Vimeo URL

### Embed Blocked
- Confirm domain restrictions are properly configured
- Check if you're using HTTP vs HTTPS consistently
- Verify your embed parameters are correct

### Access Issues
- Ensure users are properly enrolled in the course
- Check database connections and user authentication
- Verify the video URLs are stored correctly in the database

## Contact Support

If you need help with:
- Vimeo account settings: Contact Vimeo support
- Platform integration: Contact your development team
- Database issues: Contact your database administrator

## Next Steps

1. Set up domain restrictions for all your course videos
2. Update the database with your protected video URLs
3. Test the complete user flow from purchase to video access
4. Monitor analytics and security regularly
