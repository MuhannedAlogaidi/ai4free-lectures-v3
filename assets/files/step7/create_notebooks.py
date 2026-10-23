# scripts/create_notebooks.py — builds notebooks/: 11 topics, their subfolders, one runnable sample each.
# Run from the project root:  python scripts/create_notebooks.py
# Safe to run again: it never overwrites a notebook that already exists.

import json
from pathlib import Path

ROOT = Path("notebooks")


def notebook(title, cells):
    """Turn a title and a list of ("md" | "code", text) cells into notebook JSON."""
    out = [{"cell_type": "markdown", "metadata": {}, "source": f"# {title}"}]
    for kind, text in cells:
        cell = {"cell_type": "markdown" if kind == "md" else "code", "metadata": {}, "source": text.strip()}
        if kind == "code":
            cell.update(execution_count=None, outputs=[])
        out.append(cell)
    return {
        "nbformat": 4, "nbformat_minor": 5, "cells": out,
        "metadata": {"kernelspec": {"name": "python3", "display_name": "Python 3", "language": "python"}},
    }


SAMPLES = {
    "reference/01-python/basics/01_python-basics.ipynb": ("Python basics", [
        ("md", "Lists, dicts, functions and classes: the four things every later notebook uses."),
        ("code", '''
steps = ["load", "split", "embed", "search"]
config = {"chunk_size": 500, "top_k": 3}
print(steps[0], "->", steps[-1])
print(config["top_k"])
'''),
        ("code", '''
def describe(name: str, size: int = 500) -> str:
    return f"{name}: chunks of {size} characters"

print(describe("default"))
print(describe("small", size=200))
'''),
        ("md", "**Your turn:** add a `Chunker` class with a `split(text)` method that cuts text every `size` characters."),
    ]),
    "reference/02-data/pandas/01_pandas-basics.ipynb": ("Pandas basics", [
        ("md", "A DataFrame is a table in memory. Filter it, group it, plot it."),
        ("code", '''
import pandas as pd

df = pd.DataFrame({
    "course": ["Python", "ML", "RAG", "Python", "RAG"],
    "hours": [3, 5, 4, 2, 6],
})
df
'''),
        ("code", '''
totals = df.groupby("course")["hours"].sum()
totals
'''),
        ("code", '''
totals.plot(kind="bar", title="Hours per course");
'''),
        ("md", "**Your turn:** add a `score` column and find the course with the highest average score."),
    ]),
    "reference/03-ml/classification/01_first-classifier.ipynb": ("Your first classifier", [
        ("md", "Train a model on the iris flowers dataset (built into scikit-learn) and measure its accuracy."),
        ("code", '''
from sklearn.datasets import load_iris
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
print(X_train.shape, X_test.shape)
'''),
        ("code", '''
model = LogisticRegression(max_iter=200)
model.fit(X_train, y_train)
print(f"Accuracy: {model.score(X_test, y_test):.2f}")
'''),
        ("md", "**Your turn:** swap in `DecisionTreeClassifier` from `sklearn.tree` and compare the accuracy."),
    ]),
    "reference/04-dl/neural-nets/01_neural-net-numpy.ipynb": ("A neural network in NumPy", [
        ("md", "A tiny two-layer network learns XOR. No framework: just matrix maths, so you see what PyTorch does for you."),
        ("code", '''
import numpy as np

rng = np.random.default_rng(0)
X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
y = np.array([[0], [1], [1], [0]])
W1, W2 = rng.normal(size=(2, 4)), rng.normal(size=(4, 1))

def sigmoid(z):
    return 1 / (1 + np.exp(-z))
'''),
        ("code", '''
for epoch in range(5000):
    hidden = sigmoid(X @ W1)
    output = sigmoid(hidden @ W2)
    error = y - output
    d_out = error * output * (1 - output)
    d_hid = (d_out @ W2.T) * hidden * (1 - hidden)
    W2 += hidden.T @ d_out
    W1 += X.T @ d_hid

print(output.round(2).ravel())   # close to [0, 1, 1, 0]
'''),
        ("md", "**Your turn:** change the hidden size from 4 to 2 and the epochs to 500. Does it still learn?"),
    ]),
    "reference/05-nlp/embeddings/01_text-to-vectors.ipynb": ("Text to vectors", [
        ("md", "Computers compare numbers, not words. TF-IDF turns each sentence into a vector; cosine similarity says how close two are."),
        ("code", '''
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

sentences = [
    "RAG retrieves documents before answering",
    "Retrieval finds the most relevant documents",
    "Pandas is a library for tables",
]
vectors = TfidfVectorizer().fit_transform(sentences)
print(vectors.shape)
'''),
        ("code", '''
cosine_similarity(vectors).round(2)
'''),
        ("md", "**Your turn:** add a sentence of your own. Which existing sentence is it closest to?"),
    ]),
    "reference/06-llm/prompts/01_first-llm-call.ipynb": ("Your first LLM call", [
        ("md", "Ask a model a question from a notebook. Without `OPENAI_API_KEY` in `.env`, the cell explains and stops."),
        ("code", '''
import os
from dotenv import load_dotenv

load_dotenv()
HAS_KEY = bool(os.getenv("OPENAI_API_KEY"))
print("Key loaded:", HAS_KEY)
'''),
        ("code", '''
if HAS_KEY:
    from openai import OpenAI
    reply = OpenAI().chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": "Explain embeddings in one sentence."}],
    )
    print(reply.choices[0].message.content)
else:
    print("Add OPENAI_API_KEY to .env, then restart the kernel and run again.")
'''),
        ("md", "**Your turn:** add a `system` message that makes the model answer as a pirate."),
    ]),
    "reference/07-frameworks/langchain/01_first-chain.ipynb": ("Your first LangChain chain", [
        ("md", "A chain pipes steps together with `|`: prompt template, then model, then output parser. Without a key, a fake model stands in so the chain still runs."),
        ("code", '''
import os

from dotenv import load_dotenv
from langchain_core.language_models import FakeListChatModel
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate

load_dotenv()
if os.getenv("OPENAI_API_KEY"):
    from langchain_openai import ChatOpenAI
    model = ChatOpenAI(model="gpt-4o-mini", temperature=0)
else:
    model = FakeListChatModel(responses=["(fake model) A vector database stores embeddings for fast search."])
print(type(model).__name__)
'''),
        ("code", '''
prompt = ChatPromptTemplate.from_messages([
    ("system", "You explain AI terms to beginners in one sentence."),
    ("user", "What is {term}?"),
])
chain = prompt | model | StrOutputParser()
print(chain.invoke({"term": "a vector database"}))
'''),
        ("md", "**Your turn:** add a second variable `{level}` (beginner or expert) to the prompt and pass it in `invoke`."),
    ]),
    "reference/08-rag/retrieval/01_tiny-rag.ipynb": ("A tiny RAG", [
        ("md", "RAG in three moves: **retrieve** the closest document, **augment** the prompt with it, **generate** the answer."),
        ("code", '''
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

docs = [
    "Our office opens at 9am and closes at 5pm.",
    "A refund is accepted within 30 days with a receipt.",
    "The Wi-Fi password is printed on the meeting room wall.",
]
question = "How long do I have to ask for a refund?"

vectorizer = TfidfVectorizer().fit(docs + [question])
scores = cosine_similarity(vectorizer.transform([question]), vectorizer.transform(docs))[0]
best = docs[scores.argmax()]
print("Retrieved:", best)
'''),
        ("code", '''
prompt = f"Answer using only this context.\\nContext: {best}\\nQuestion: {question}"
print(prompt)
'''),
        ("md", "Send `prompt` to a model as in `06-llm/prompts` to finish the G in RAG.\n\nTF-IDF matches **words**, not meaning: ask *Can I get my money back?* and it picks the wrong document. Embeddings (Step 12) fix that.\n\n**Your turn:** add two documents and a question that needs one of them."),
    ]),
    "reference/09-agents/tools/01_tool-picker.ipynb": ("An agent picks a tool", [
        ("md", "An agent is a loop: read the task, pick a tool, use it, answer. Here a simple rule picks the tool; in a real agent, the LLM picks it."),
        ("code", '''
from datetime import date

def calculator(expr: str) -> str:
    a, op, b = expr.split()
    ops = {"+": float.__add__, "-": float.__sub__, "*": float.__mul__, "/": float.__truediv__}
    return str(ops[op](float(a), float(b)))

def today(_: str) -> str:
    return date.today().isoformat()

TOOLS = {"calculator": calculator, "today": today}
'''),
        ("code", '''
def agent(task: str) -> str:
    tool = "calculator" if any(op in task for op in "+-*/") else "today"
    result = TOOLS[tool](task)
    return f"[{tool}] {result}"

for task in ["12 * 4", "what day is it?"]:
    print(task, "->", agent(task))
'''),
        ("md", "**Your turn:** add a `word_count` tool and a rule that picks it when the task starts with `count:`."),
    ]),
    "reference/10-cv/images/01_images-are-arrays.ipynb": ("Images are arrays", [
        ("md", "To a computer, an image is a grid of numbers. Build one, change it, and show it."),
        ("code", '''
import matplotlib.pyplot as plt
import numpy as np
from PIL import Image

pixels = np.zeros((100, 100, 3), dtype=np.uint8)
pixels[20:80, 20:80] = [255, 140, 0]        # an orange square
img = Image.fromarray(pixels)
print(img.size, img.mode)
'''),
        ("code", '''
gray = img.convert("L")
flipped = img.transpose(Image.Transpose.FLIP_LEFT_RIGHT)
fig, axes = plt.subplots(1, 3, figsize=(9, 3))
for ax, im, name in zip(axes, [img, gray, flipped], ["original", "gray", "flipped"]):
    ax.imshow(im, cmap="gray" if name == "gray" else None)
    ax.set_title(name)
    ax.axis("off")
'''),
        ("md", "**Your turn:** draw a second square in another colour, or rotate the image 45 degrees with `img.rotate(45)`."),
    ]),
    "reference/11-mlops/tracking/01_save-and-track.ipynb": ("Save a model and track a run", [
        ("md", "MLOps starts small: save the trained model, and record what you did so you can repeat it."),
        ("code", '''
import json
import time
from pathlib import Path

import joblib
from sklearn.datasets import load_iris
from sklearn.linear_model import LogisticRegression

X, y = load_iris(return_X_y=True)
start = time.perf_counter()
model = LogisticRegression(max_iter=200).fit(X, y)
seconds = round(time.perf_counter() - start, 3)
'''),
        ("code", '''
out = Path("runs")
out.mkdir(exist_ok=True)
joblib.dump(model, out / "model.joblib")
run = {"model": "LogisticRegression", "accuracy": round(model.score(X, y), 3), "train_seconds": seconds}
(out / "run.json").write_text(json.dumps(run, indent=2))
print(run)
'''),
        ("code", '''
loaded = joblib.load(out / "model.joblib")
print("Prediction for the first flower:", loaded.predict(X[:1]))
'''),
        ("md", "**Your turn:** train with `max_iter=50` and save a second run file. Which run was better?"),
    ]),
}

# Every topic and its subfolders. Add your own: the script creates any that are missing.
TOPICS = {
    "01-python": ["basics", "oop", "async", "typing", "testing"],
    "02-data": ["numpy", "pandas", "visualization", "sql"],
    "03-ml": ["regression", "classification", "clustering", "evaluation", "features"],
    "04-dl": ["neural-nets", "pytorch", "cnn", "rnn", "transformers"],
    "05-nlp": ["text-processing", "tokenizers", "embeddings", "hugging-face"],
    "06-llm": ["prompts", "openai", "gemini", "claude", "local-models", "structured-output", "fine-tuning"],
    "07-frameworks": ["langchain", "langgraph", "llamaindex"],
    "08-rag": ["loaders", "chunking", "vector-stores", "retrieval", "reranking", "evaluation"],
    "09-agents": ["tools", "memory", "multi-agent", "mcp"],
    "10-cv": ["images", "detection", "segmentation"],
    "11-mlops": ["tracking", "serving", "docker", "monitoring"],
}

EMPTY = ["course", "project"]   # yours to fill


def keep(folder):
    """Create the folder; an empty .gitkeep lets Git track it while it is still empty."""
    folder.mkdir(parents=True, exist_ok=True)
    if not any(p.suffix == ".ipynb" for p in folder.iterdir()):
        (folder / ".gitkeep").touch()


def main():
    for rel, (title, cells) in SAMPLES.items():
        path = ROOT / rel
        path.parent.mkdir(parents=True, exist_ok=True)
        if path.exists():
            print(f"Kept:    {path}")
            continue
        path.write_text(json.dumps(notebook(title, cells), indent=1), encoding="utf-8")
        print(f"Created: {path}")
    for topic, subs in TOPICS.items():
        for sub in subs:
            keep(ROOT / "reference" / topic / sub)
    print(f"Ready:   {sum(len(s) for s in TOPICS.values())} subfolders in {len(TOPICS)} topics")
    for name in EMPTY:
        keep(ROOT / name)
        print(f"Ready:   {ROOT / name}/")
    print("Done.")


if __name__ == "__main__":
    main()
