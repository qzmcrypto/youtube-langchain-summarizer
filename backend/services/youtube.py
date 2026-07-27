import re

import requests
from langchain_community.document_loaders import YoutubeLoader
from youtube_transcript_api import YouTubeTranscriptApi

VIDEO_ID_REGEX = re.compile(r"(?:v=|youtu\.be/|shorts/|embed/)([\w-]{11})")


def clean_youtube_url(video_url: str) -> str:
    """Remove accidental spaces from user-provided YouTube URL."""
    if not video_url:
        raise ValueError("YouTube URL cannot be empty.")

    return video_url.strip()


def extract_video_id(video_url: str) -> str:
    """Pull the 11-character YouTube video ID out of any common URL shape."""
    match = VIDEO_ID_REGEX.search(video_url)

    if not match:
        raise ValueError("Could not extract a video ID from this URL.")

    return match.group(1)


def format_timestamp(seconds: float) -> str:
    """Format a second offset as MM:SS, or HH:MM:SS for videos over an hour."""
    total_seconds = int(seconds)
    hours, remainder = divmod(total_seconds, 3600)
    minutes, secs = divmod(remainder, 60)

    if hours:
        return f"{hours:02d}:{minutes:02d}:{secs:02d}"
    return f"{minutes:02d}:{secs:02d}"


def get_video_metadata(video_url: str) -> dict:
    """Fetch title, channel name, and thumbnail via YouTube's public oEmbed endpoint."""
    try:
        video_url = clean_youtube_url(video_url)

        response = requests.get(
            "https://www.youtube.com/oembed",
            params={
                "url": video_url,
                "format": "json"
            },
            timeout=5,
        )

        response.raise_for_status()

        data = response.json()

        return {
            "title": data.get("title"),
            "channel": data.get("author_name"),
            "thumbnail_url": data.get("thumbnail_url"),
        }

    except requests.RequestException:
        return {
            "title": None,
            "channel": None,
            "thumbnail_url": None,
        }


def get_video_transcript(video_url: str) -> str:
    """Extract transcript from YouTube video."""

    video_url = clean_youtube_url(video_url)

    loader = YoutubeLoader.from_youtube_url(
        video_url,
        add_video_info=False
    )

    docs = loader.load()

    if not docs:
        raise ValueError("Could not find a transcript for this video.")

    return docs[0].page_content


def get_timestamped_transcript_text(video_url: str) -> str:
    """Build a transcript string with real, per-line timestamps for the LLM to ground its timeline on."""

    video_url = clean_youtube_url(video_url)
    video_id = extract_video_id(video_url)

    try:
        segments = YouTubeTranscriptApi().fetch(video_id)
    except Exception as exc:
        raise ValueError("Could not find a transcript for this video.") from exc

    if not segments:
        raise ValueError("Could not find a transcript for this video.")

    lines = [
        f"[{format_timestamp(segment.start)}] {segment.text}"
        for segment in segments
    ]

    return "\n".join(lines)