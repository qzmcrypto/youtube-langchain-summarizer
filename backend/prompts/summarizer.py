from backend.services.youtube import get_video_transcript
from backend.services.llm import get_llm
from backend.prompts.templates import SUMMARY_PROMPT

def generate_summary(video_url: str):
    # 1. Fetch transcript
    transcript = get_video_transcript(video_url)
    
    # 2. Get LLM instance
    llm = get_llm()
    
    # 3. Create LangChain Expression Language (LCEL) Chain
    chain = SUMMARY_PROMPT | llm
    
    # 4. Run chain with transcript input
    response = chain.invoke({"transcript": transcript})
    
    return response.content