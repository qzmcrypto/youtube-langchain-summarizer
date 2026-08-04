import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq

# Load keys from the .env file into the system
load_dotenv()

def get_llm():
    # Initialize the LangChain Groq model using your team's configuration
    llm = ChatGroq(
        api_key=os.getenv("GROQ_API_KEY"),
        model=os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile"),
        temperature=0,
    )
    return llm