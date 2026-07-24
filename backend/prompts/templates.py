from langchain.prompts import PromptTemplate

summary_template = """
You are an expert technical summarizer.
Read the following video transcript and provide:
1. Executive Summary
2. Key Takeaways
3. Important Concepts
4. Action Items

Transcript:
{transcript}
"""

SUMMARY_PROMPT = PromptTemplate(
    input_variables=["transcript"],
    template=summary_template
)