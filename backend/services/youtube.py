import requests
from langchain_community.document_loaders import YoutubeLoader


def clean_youtube_url(video_url: str) -> str:
    """Remove accidental spaces from user-provided YouTube URL."""
    if not video_url:
        raise ValueError("YouTube URL cannot be empty.")

    return video_url.strip()


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