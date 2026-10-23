# src/main.py — Step 5: Appetizers. A quick test that every tool works.
# Run with: python -m src.main   (venv active; otherwise put uv run in front)

import os

from dotenv import load_dotenv
from pydantic import BaseModel, ValidationError

load_dotenv()                                   # read .env before any key is used

# ── Settings you can change ───────────────────────────────────
OPENAI_MODEL = "gpt-4o-mini"
GEMINI_MODEL = "gemini-3.8-flash"
QUESTION = "Explain RAG in one sentence for a beginner."


# ── Your sections go here ─────────────────────────────────────
def section_python_basics():
    print("\n── SECTION 1: Python basics ──")
    steps = ["ingest", "retrieve", "generate"]          # a list: ordered
    for i, step in enumerate(steps, start=1):
        print(f"  Step {i}: {step}")
    config = {"model": OPENAI_MODEL, "chunk_size": 500}  # a dict: key -> value
    for key, value in config.items():
        print(f"  {key} = {value}")
    print(f"  Upper: {[s.upper() for s in steps]}")      # a list comprehension

def greet(name: str, role: str = "student") -> str:
    return f"Hello {name}, you are a {role}."

def section_functions():
    print("\n── SECTION 2: Functions ──")
    print(f"  {greet('Ali')}")
    print(f"  {greet('Sara', role='teacher')}")

class DocumentProcessor:
    def __init__(self, name: str):
        self.name = name
        self.processed: list[str] = []

    def process(self, text: str) -> str:
        clean = text.strip().lower()
        self.processed.append(clean)
        return clean

    def summary(self) -> str:
        return f"{self.name} processed {len(self.processed)} document(s)."

def section_classes():
    print("\n── SECTION 3: Classes ──")
    p = DocumentProcessor("MyProcessor")
    print(f"  {p.process('  Hello World  ')!r}")
    p.process("  RAG is powerful  ")
    print(f"  {p.summary()}")

def section_files():
    print("\n── SECTION 4: Files ──")
    path = "sample.txt"
    with open(path, "w", encoding="utf-8") as f:
        f.write("line one\nline two")
    with open(path, encoding="utf-8") as f:
        lines = f.read().splitlines()
    print(f"  Read {len(lines)} lines: {lines}")
    os.remove(path)
    print(f"  Cleaned up {path}")

def section_keys():
    print("\n── SECTION 5: Keys ──")
    for name in ("OPENAI_API_KEY", "GOOGLE_API_KEY"):
        print(f"  {name} loaded: {bool(os.getenv(name))}")   # never print the key itself

class Document(BaseModel):
    title: str
    source: str
    pages: int = 1

def section_pydantic():
    print("\n── SECTION 6: Pydantic ──")
    doc = Document(title="Intro to RAG", source="docs/intro.pdf", pages="3")
    print(f"  {doc.model_dump()}  <- pages '3' became the number 3")
    try:
        Document(title="Bad", source=None)
    except ValidationError as e:
        err = e.errors()[0]
        print(f"  Rejected: {err['loc'][0]}: {err['msg']}")

def section_ask_openai():
    print("\n── SECTION 7: Ask OpenAI ──")
    if not os.getenv("OPENAI_API_KEY"):
        print("  Skipped: no OPENAI_API_KEY in .env"); return
    from openai import OpenAI
    client = OpenAI()                                   # reads OPENAI_API_KEY
    reply = client.chat.completions.create(
        model=OPENAI_MODEL,
        messages=[{"role": "user", "content": QUESTION}],
    )
    print(f"  Q: {QUESTION}")
    print(f"  A: {reply.choices[0].message.content}")

SYSTEM_PROMPT = "You are a friendly teacher. Answer in 2 short bullet points, no jargon."

def section_shape_openai():
    print("\n── SECTION 8: Shape the answer ──")
    if not os.getenv("OPENAI_API_KEY"):
        print("  Skipped: no OPENAI_API_KEY in .env"); return
    from openai import OpenAI
    client = OpenAI()
    for temperature in (0.0, 1.0):
        reply = client.chat.completions.create(
            model=OPENAI_MODEL,
            temperature=temperature,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": QUESTION},
            ],
        )
        print(f"  temperature={temperature}:\n{reply.choices[0].message.content}")

def section_gemini():
    print("\n── SECTION 9: Ask Gemini ──")
    if not os.getenv("GOOGLE_API_KEY"):
        print("  Skipped: no GOOGLE_API_KEY in .env"); return
    from google import genai
    client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))
    reply = client.models.generate_content(model=GEMINI_MODEL, contents=QUESTION)
    print(f"  A: {reply.text}")

def section_langchain():
    print("\n── SECTION 10: LangChain ──")
    if not os.getenv("OPENAI_API_KEY"):
        print("  Skipped: no OPENAI_API_KEY in .env"); return
    from langchain_core.messages import HumanMessage, SystemMessage
    from langchain_openai import ChatOpenAI
    llm = ChatOpenAI(model=OPENAI_MODEL, temperature=0)
    reply = llm.invoke([SystemMessage(content=SYSTEM_PROMPT), HumanMessage(content=QUESTION)])
    print(f"  A: {reply.content}")


# ── Main: runs every section; one failure never stops the rest ─
SECTIONS = [section_python_basics, section_functions, section_classes, section_files,
            section_keys, section_pydantic,
            section_ask_openai, section_shape_openai, section_gemini, section_langchain]

def main():
    print("=== Step 5: Appetizers ===")
    for section in SECTIONS:
        try:
            section()
        except Exception as e:  # noqa: BLE001 - report it and run the next section
            print(f"  Failed: {type(e).__name__}: {e}")
    print("\n=== All sections complete ===")


if __name__ == "__main__":
    main()
