from backend.services.youtube import get_video_transcript, get_video_metadata
from backend.services.llm import get_llm
from backend.prompts.templates import SUMMARY_PROMPT

def generate_summary(video_url: str):
    # 1. Fetch transcript
    transcript = get_video_transcript(video_url)

    # 2. Fetch video metadata (title, channel, thumbnail)
    metadata = get_video_metadata(video_url)

    # 3. Get LLM instance
    llm = get_llm()

    # 4. Create LangChain Expression Language (LCEL) Chain
    chain = SUMMARY_PROMPT | llm

    # 5. Run chain with transcript input
    response = chain.invoke({"transcript": transcript})

    return {"summary": response.content, "metadata": metadata}