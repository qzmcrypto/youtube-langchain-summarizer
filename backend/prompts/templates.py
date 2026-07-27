from langchain_core.prompts import PromptTemplate

structured_summary_template = """
You are an expert technical summarizer creating structured study notes from a video transcript.

The transcript below is a sequence of lines. Each line starts with a real timestamp taken directly
from the video, in [MM:SS] or [HH:MM:SS] format, followed by the spoken text at that moment.

You MUST respond with ONLY valid JSON (no markdown code fences, no commentary, no explanation)
matching exactly this shape:

{{
  "executive_summary": "A brief, high-level overview of what the video covers (2-4 sentences, plain text).",
  "key_takeaways": ["The most important points, each as a short plain-text sentence."],
  "concepts": [
    {{"term": "Name of the concept/term", "explanation": "A short plain-text explanation of it."}}
  ],
  "examples": ["Concrete examples, demos, case studies, or use cases mentioned in the video, each as a short plain-text sentence."],
  "action_items": ["Specific, actionable steps a viewer could take as a result of watching, each as a short plain-text sentence."],
  "timeline": [
    {{
      "time": "00:00 - 01:30",
      "content": "Markdown-formatted summary of this segment. Use **bold**, bullet points, etc. where helpful."
    }}
  ]
}}

Rules:
- Use only information present in the transcript. Do not invent or add outside information.
- If a section has no relevant content in the transcript, return an empty array (or empty string for
  executive_summary) for that field instead of inventing content.
- Do not repeat the same point across multiple sections; each section should add new information.
- key_takeaways, examples, and action_items must be plain text (no markdown syntax).
- For the timeline, use the ACTUAL timestamps found in the transcript as the start and end of each
  segment, cover the entire video from start to end with consecutive, non-overlapping segments, and
  prefer 5-12 segments for a typical video.
- Return raw JSON only. It must be parseable by a JSON parser with no surrounding text.

Transcript:
{transcript}
"""

STRUCTURED_SUMMARY_PROMPT = PromptTemplate(
    input_variables=["transcript"],
    template=structured_summary_template
)
