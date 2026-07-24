from langchain_core.prompts import PromptTemplate

summary_template = """
You are an expert technical summarizer.
Read the following video transcript carefully and produce a well-structured summary using clean markdown headings, in this exact order:

## Executive Summary
A brief, high-level overview of what the video covers (2-4 sentences).

## Key Takeaways
The most important points as a concise bulleted list.

## Important Concepts
Any notable concepts, terms, or ideas explained in the video, with a short explanation of each.

## Practical Examples
Concrete examples, demos, case studies, or use cases mentioned in the video, if any.

## Action Items
Specific, actionable steps a viewer could take as a result of watching, phrased as a bulleted list.

## Final Summary
A short closing summary that wraps up the video's core message (2-3 sentences).

Rules:
- Use only information present in the transcript. Do not invent or add outside information.
- Do not repeat the same point across multiple sections; each section should add new information.
- If a section has no relevant content in the transcript, write "Not covered in this video." under that heading instead of omitting it.
- Use markdown headings exactly as shown above, and use bullet points where indicated.

Transcript:
{transcript}
"""

SUMMARY_PROMPT = PromptTemplate(
    input_variables=["transcript"],
    template=summary_template
)