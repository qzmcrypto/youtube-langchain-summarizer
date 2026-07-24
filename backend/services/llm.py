import os
from dotenv import load_dotenv
from langchain_openai import AzureChatOpenAI

# Load keys from the .env file into the system
load_dotenv()

def get_llm():
    # Initialize the LangChain Azure model using your team's configuration
    llm = AzureChatOpenAI(
        azure_deployment=os.getenv("AZURE_CHAT_MODEL_DEPLOYMENT"),
        azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
        api_key=os.getenv("AZURE_OPENAI_API_KEY"),
        api_version=os.getenv("OPENAI_API_VERSION"),
        temperature=0, 
    )
    return llm