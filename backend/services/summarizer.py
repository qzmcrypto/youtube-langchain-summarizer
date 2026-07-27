from langchain_core.output_parsers import JsonOutputParser

from backend.services.youtube import get_timestamped_transcript_text, get_video_metadata
from backend.services.llm import get_llm
from backend.prompts.templates import STRUCTURED_SUMMARY_PROMPT

DEFAULT_SUMMARY = {
    "executive_summary": "",
    "key_takeaways": [],
    "concepts": [],
    "examples": [],
    "action_items": [],
    "timeline": [],
}


def generate_summary(video_url: str):
    # 1. Fetch transcript with real per-line timestamps
    transcript = get_timestamped_transcript_text(video_url)

    # 2. Fetch video metadata (title, channel, thumbnail)
    metadata = get_video_metadata(video_url)

    # 3. Get LLM instance
    llm = get_llm()

    # 4. Ask the LLM to produce structured study notes as JSON
    chain = STRUCTURED_SUMMARY_PROMPT | llm | JsonOutputParser()

    try:
        result = chain.invoke({"transcript": transcript})
        summary = {**DEFAULT_SUMMARY, **result} if isinstance(result, dict) else DEFAULT_SUMMARY
    except Exception:
        # Model didn't return parseable JSON - fall back to a single executive summary
        # so the frontend still has something to render instead of erroring out.
        raw_chain = STRUCTURED_SUMMARY_PROMPT | llm
        raw_response = raw_chain.invoke({"transcript": transcript})
        summary = {**DEFAULT_SUMMARY, "executive_summary": raw_response.content}

    return {"metadata": metadata, **summary}
