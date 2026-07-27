from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from backend.services.youtube import get_video_transcript
from backend.services.llm import get_llm
from backend.services.summarizer import generate_summary

app = FastAPI(title="YouTube Summarizer API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SummarizeRequest(BaseModel):
    video_url: str


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
    return generate_summary(url)

@app.post("/summarize")
def summarize_video_post(request: SummarizeRequest):
    return generate_summary(request.video_url)