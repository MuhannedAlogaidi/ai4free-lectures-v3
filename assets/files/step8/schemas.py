# src/api/schemas.py — one job: the shape of every request and response.

from pydantic import BaseModel


class HealthResponse(BaseModel):
    status: str
    version: str


class InfoResponse(BaseModel):
    project: str
    python_version: str
    environment: str


class AskRequest(BaseModel):
    question: str


class AskResponse(BaseModel):
    question: str
    answer: str
    source: str            # "llm" now, "rag" from Step 13
