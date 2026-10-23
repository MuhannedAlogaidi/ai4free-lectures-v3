# src/api/main.py — one job: create the app and connect the routes.
# Run with: uvicorn src.api.main:app --reload   (venv active; otherwise put uv run in front)

from dotenv import load_dotenv
from fastapi import FastAPI

from src.api.routes import router

load_dotenv()                      # read .env before any route uses a key

app = FastAPI(
    title="my-project API",
    description="The RAG project's API, built step by step",
    version="0.1.0",
)
app.include_router(router)
