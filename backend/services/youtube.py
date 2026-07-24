from langchain_community.document_loaders import YoutubeLoader

def get_video_transcript(video_url: str) -> str:
    # Initialize the loader with the video URL
    loader = YoutubeLoader.from_youtube_url(video_url, add_video_info=False)
    
    # .load() fetches the data and returns a list of LangChain Document objects
    docs = loader.load()
    
    if not docs:
        raise ValueError("Could not find a transcript for this video.")
        
    # We return the text content of the first Document
    return docs[0].page_content