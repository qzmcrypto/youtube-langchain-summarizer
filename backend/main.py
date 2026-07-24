from fastapi import FastAPI
from backend.services.youtube import get_video_transcript
from backend.services.llm import get_llm
from backend.services.summarizer import generate_summary

app = FastAPI(title="YouTube Summarizer API")

@app.get("/")
def health_check():
    return {"status": "ok", "message": "API is running!"}

@app.get("/transcript")
def fetch_transcript(url: str):
    transcript_text = get_video_transcript(url)
    return {"transcript": transcript_text}

@app.get("/test-ai")
def test_ai():
    llm = get_llm()
    response = llm.invoke("Say hello in one short sentence.")
    return {"ai_response": response.content}

@app.get("/summarize")
def summarize_video(url: str):
    summary = generate_summary(url)
    return {"summary": summary}