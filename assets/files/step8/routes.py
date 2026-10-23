# src/api/routes.py — one job: what each endpoint does.

import os
import sys

from fastapi import APIRouter

from src.api.schemas import AskRequest, AskResponse, HealthResponse, InfoResponse

router = APIRouter()

VERSION = "0.1.0"
MODEL = "gpt-4o-mini"
SYSTEM_PROMPT = "You are a helpful assistant. Answer in two or three sentences."


@router.get("/health", response_model=HealthResponse)
def health():
    """Is the server alive?"""
    return HealthResponse(status="ok", version=VERSION)


@router.get("/info", response_model=InfoResponse)
def info():
    """Project and system information."""
    return InfoResponse(
        project=os.getenv("PROJECT_NAME", "my-project"),
        python_version=sys.version.split()[0],
        environment=os.getenv("ENVIRONMENT", "dev"),
    )


@router.post("/ask", response_model=AskResponse)
def ask(request: AskRequest):
    """Answer a question with the LLM. Step 13 swaps this for RAG."""
    if not os.getenv("OPENAI_API_KEY"):
        return AskResponse(
            question=request.question,
            answer="Add OPENAI_API_KEY to .env and restart the server.",
            source="no-key",
        )
    from openai import OpenAI
    reply = OpenAI().chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": request.question},
        ],
    )
    return AskResponse(
        question=request.question,
        answer=reply.choices[0].message.content,
        source="llm",
    )
