import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq

load_dotenv()


def get_llm():
    return ChatGroq(
        model=os.environ.get("MODEL_NAME", "llama-3.3-70b-versatile"),
        api_key=os.environ["GROQ_API_KEY"],
        temperature=0,
    )
    
from groq import RateLimitError
from exceptions.llm_exceptions import LLMRateLimitError

def safe_invoke(llm, messages):
    try:
        return llm.invoke(messages)
    except RateLimitError:
        raise LLMRateLimitError()
