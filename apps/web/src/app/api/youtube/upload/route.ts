// apps/web/src/app/api/youtube/upload/route.ts
import { google } from 'googleapis';
import { NextResponse } from 'next/server';

const oauth2Client = new google.auth.OAuth2(
  process.env.YOUTUBE_CLIENT_ID,
  process.env.YOUTUBE_CLIENT_SECRET,
  process.env.YOUTUBE_REDIRECT_URI
);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const video = formData.get('video') as File;

    // Configure YouTube upload
    const youtube = google.youtube('v3');

    await oauth2Client.setCredentials({
      access_token: process.env.YOUTUBE_ACCESS_TOKEN,
      refresh_token: process.env.YOUTUBE_REFRESH_TOKEN,
    });

    // Upload to YouTube
    const res = await youtube.videos.insert({
      auth: oauth2Client,
      part: ['snippet', 'status'],
      requestBody: {
        snippet: {
          title: `Session Recording - ${new Date().toISOString()}`,
          description: 'Recorded session from Prep AI platform',
        },
        status: {
          privacyStatus: 'unlisted',
        },
      },
      media: {
        body: video as any,
      },
    });

    return NextResponse.json({
      url: `https://www.youtube.com/watch?v=${res.data.id}`,
    });
  } catch (error) {
    console.error('YouTube upload error:', error);
    return NextResponse.json({ error: 'Failed to upload to YouTube' }, { status: 500 });
  }
}
