from fastapi import FastAPI
from backend.services.youtube import get_video_transcript
from backend.services.llm import get_llm  # <-- Make sure this is here

app = FastAPI(title="YouTube Summarizer API")

@app.get("/")
def health_check():
    return {"status": "ok", "message": "API is running!"}

@app.get("/transcript")
def fetch_transcript(url: str):
    transcript_text = get_video_transcript(url)
    return {"transcript": transcript_text}

# <-- MAKE SURE THIS NEW ENDPOINT IS ADDED AND SAVED
@app.get("/test-ai")
def test_ai():
    llm = get_llm()
    response = llm.invoke("Say hello in one short sentence.")
    return {"ai_response": response.content}