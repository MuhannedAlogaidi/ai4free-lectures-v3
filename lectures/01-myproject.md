A production AI/RAG application built step by step. Environment: **Windows + Bash + uv**.

## Step 1: Create Project

**Create the MyProject Application with the Default Virtual Environment**

::: info Goal
Create the MyProject application, initialize it with uv, use Python 3.12, and create the default virtual environment named `.venv`.
:::

#### Why

This gives the project a clean Python foundation with version management, dependency management, and an isolated environment.

#### Command — Windows Bash

```bash
mkdir myproject
cd myproject
uv init --python 3.12
uv venv
source .venv/Scripts/activate
```

#### Expected Result

```text
myproject/
├── .python-version
├── .venv/
├── README.md
├── main.py
└── pyproject.toml
```

#### Project Structure Test

Run this command to verify the project structure:

```bash
find . -maxdepth 2 -print
```

#### Expected Test Output

```text
.
./.python-version
./.venv
./README.md
./main.py
./pyproject.toml
```

::: success What We Completed
The project is initialized with uv, Python 3.12 is selected, and the default `.venv` environment is active.
:::

## Alternative Step 1: Custom Environment

**Create the Project with a Custom Virtual Environment Name**

::: info Goal
Create the same MyProject application, but choose a custom virtual environment name while still using Python 3.12.
:::

#### Why

A custom environment name can make it easier to identify the environment when you manage several Python projects on the same machine.

#### Command — Windows Bash

```bash
mkdir myproject
cd myproject
uv init --python 3.12
uv venv .ragvenv --python 3.12
source .ragvenv/Scripts/activate
```

#### Expected Result

```text
myproject/
├── .python-version
├── .ragvenv/
├── README.md
├── main.py
└── pyproject.toml
```

#### Project Structure Test

Run this command to verify the custom environment structure:

```bash
find . -maxdepth 2 -print
```

#### Expected Test Output

```text
.
./.python-version
./.ragvenv
./README.md
./main.py
./pyproject.toml
```

#### What We Completed

The project is initialized with uv, Python 3.12 is selected, and the custom `.ragvenv` environment is active.

::: note
Use either the default Step 1 or the alternative Step 1. Do not run both for the same project.
:::

## Step 2: Install Dependencies

**Configure pyproject.toml and Install Core Dependencies**

::: info Goal
Define the first production dependencies for the RAG application and let uv record them in `pyproject.toml` and `uv.lock`.
:::

#### Why

A professional Python project keeps runtime and development dependencies declared centrally. This makes the environment reproducible for every developer, CI job, and deployment.

#### Core Runtime Dependencies

| Dependency | Purpose |
|---|---|
| fastapi | Production API layer for the RAG service. |
| uvicorn[standard] | ASGI server used to run FastAPI. |
| pydantic | Typed request, response, and internal data models. |
| pydantic-settings | Typed configuration from environment variables. |
| python-dotenv | Loads local development values from a .env file. |
| httpx | HTTP client for external model and service integrations. |
| tenacity | Retry and backoff support for transient failures. |
| openai | Direct OpenAI API client. |
| langchain | Core RAG and LLM orchestration building blocks. |
| langchain-openai | LangChain integration for OpenAI models and embeddings. |
| qdrant-client | Client for the Qdrant vector database. |

#### Command — Windows Bash

```bash
uv add fastapi "uvicorn[standard]" pydantic pydantic-settings python-dotenv httpx tenacity openai langchain langchain-openai qdrant-client

uv add --dev pytest pytest-cov ruff mypy pre-commit
```

#### What uv Does

`uv add` installs the packages, adds them to `pyproject.toml`, and updates `uv.lock`. The second command keeps testing and code-quality tools in the development dependency group instead of mixing them with runtime packages.

#### Expected Result

```text
myproject/
├── .python-version
├── .venv/
├── README.md
├── main.py
├── pyproject.toml
└── uv.lock
```

#### Expected pyproject.toml Direction

```text
[project]
name = "myproject"
version = "0.1.0"
requires-python = ">=3.12"

dependencies = [
    "fastapi",
    "uvicorn[standard]",
    "pydantic",
    "pydantic-settings",
    "python-dotenv",
    "httpx",
    "tenacity",
    "openai",
    "langchain",
    "langchain-openai",
    "qdrant-client",
]

[dependency-groups]
dev = [
    "pytest",
    "pytest-cov",
    "ruff",
    "mypy",
    "pre-commit",
]
```

#### Project Structure Test

Run this command to verify the project after dependency installation:

```bash
find . -maxdepth 2 -print
```

#### Expected Test Output

```text
.
./.python-version
./.venv
./README.md
./main.py
./pyproject.toml
./uv.lock
```

#### Dependency Test

Verify that uv can resolve the project environment:

```bash
uv sync
```

#### Expected Dependency Test Output

```text
Resolved packages successfully
Installed / verified project dependencies
uv.lock is up to date
```

#### What We Completed

The project now has its first production dependency baseline, development tooling, and a reproducible uv lockfile.

::: note
Advanced RAG packages are intentionally not added yet. They should be introduced later when the corresponding architecture step is implemented.
:::

## Step 3: Verify Setup

**Verify Installed Dependencies and Load the Environment**

::: info Goal
Create one simple Python file that verifies the core dependencies installed in Step 2 and confirms that the project can load values from a local `.env` file.
:::

#### Why

Before building the RAG application, verify that the Python environment is working correctly. This catches installation or environment problems early.

#### Create the Local Environment File — Windows Bash

```bash title=".env"
cat > .env <<'EOF'
APP_ENV=development
EOF
```

#### Create the Test File — Windows Bash

```bash title="test_setup.py"
cat > test_setup.py <<'EOF'
import os

from dotenv import load_dotenv

import fastapi
import pydantic
import httpx
import openai
import langchain
import qdrant_client

load_dotenv()

print("APP_ENV:", os.getenv("APP_ENV"))
print("Environment file loaded successfully.")
print("Core dependencies imported successfully.")
print("MyProject setup is ready.")
EOF
```

#### Run the Test

```bash
python test_setup.py
```

#### Expected Output

```text
APP_ENV: development
Environment file loaded successfully.
Core dependencies imported successfully.
MyProject setup is ready.
```

#### Project Structure Test

Run this command to verify the project after Step 3:

```bash
find . -maxdepth 2 -print
```

#### Expected Project Structure

```text
.
./.env
./.python-version
./.venv
./README.md
./main.py
./pyproject.toml
./test_setup.py
./uv.lock
```

::: success What We Completed
The project environment now loads correctly, and the main installed dependencies have been verified with one simple test file.
:::

## Step 4: Create Data Structure

**Create the Data Directories for Raw, Processed, Evaluation, and Sample Data**

::: info Goal
Create the main data folders used by the MyProject application before notebooks and ingestion code begin reading or writing data.
:::

#### Why

A clear data layout separates original source files from transformed data, evaluation datasets, and small development samples. This prevents accidental overwrites and makes the ingestion workflow easier to manage.

#### Command — Windows Bash

```bash
mkdir -p data/raw data/processed data/evaluation data/samples

touch data/raw/.gitkeep
touch data/processed/.gitkeep
touch data/evaluation/.gitkeep
touch data/samples/.gitkeep
```

#### Expected Result

```text
data/
├── raw/
│   └── .gitkeep
├── processed/
│   └── .gitkeep
├── evaluation/
│   └── .gitkeep
└── samples/
    └── .gitkeep
```

#### Project Structure Test

Run this command to verify the data folders:

```bash
find data -maxdepth 2 -print
```

#### Expected Test Output

```text
data
data/raw
data/raw/.gitkeep
data/processed
data/processed/.gitkeep
data/evaluation
data/evaluation/.gitkeep
data/samples
data/samples/.gitkeep
```

::: success What We Completed
The project now has a clean data foundation for ingestion, transformation, evaluation, and development samples.
:::

## Step 5: Create Notebook Structure

**Create the Notebook Folders by RAG Capability, Framework, and Engineering Stage**

::: info Goal
Create the notebook workspace for RAG, prompting, LangChain, LangGraph, agents, evaluation, observability, and end-to-end experimentation.
:::

#### Why

Notebooks are organized by technology, capability, and engineering purpose rather than by instructor or course source. This keeps related work together and makes the learning path easier to maintain as the project grows.

#### Command — Windows Bash

```bash
mkdir -p \
notebooks/01_ingestion \
notebooks/02_chunking \
notebooks/03_embeddings \
notebooks/04_vectorstore \
notebooks/05_retrieval \
notebooks/06_generation \
notebooks/07_prompting \
notebooks/08_langchain \
notebooks/09_langgraph \
notebooks/10_agents \
notebooks/11_evaluation \
notebooks/12_guardrails \
notebooks/13_observability \
notebooks/14_end_to_end \
notebooks/experiments

touch notebooks/README.md
touch notebooks/experiments/.gitkeep
```

#### Expected Result

```text
notebooks/
├── README.md
├── 01_ingestion/
├── 02_chunking/
├── 03_embeddings/
├── 04_vectorstore/
├── 05_retrieval/
├── 06_generation/
├── 07_prompting/
├── 08_langchain/
├── 09_langgraph/
├── 10_agents/
├── 11_evaluation/
├── 12_guardrails/
├── 13_observability/
├── 14_end_to_end/
└── experiments/
    └── .gitkeep
```

#### Folder Purpose

| Folder | Purpose |
|---|---|
| 01_ingestion | Document loading, parsing, metadata, and preprocessing. |
| 02_chunking | Recursive, semantic, and comparative chunking experiments. |
| 03_embeddings | Embedding models, similarity, and benchmarking. |
| 04_vectorstore | Qdrant setup, indexing, and vector search. |
| 05_retrieval | Dense, sparse, hybrid, query rewriting, multi-query, and reranking. |
| 06_generation | Context building, answer generation, and citations. |
| 07_prompting | Prompt design, structured output, CoT, ReAct, and prompt evaluation. |
| 08_langchain | LangChain-specific chains, retrievers, tools, and integrations. |
| 09_langgraph | State graphs, checkpoints, memory, branching, and workflow orchestration. |
| 10_agents | Tool-using agents, planning, execution loops, and agentic RAG. |
| 11_evaluation | RAGAS, DeepEval, retrieval metrics, and regression testing. |
| 12_guardrails | Input/output safety, PII, injection, and policy controls. |
| 13_observability | Tracing, latency, token usage, and telemetry. |
| 14_end_to_end | Complete RAG and agentic RAG pipeline validation. |
| experiments | Temporary research that has not yet been promoted into a stable topic folder. |

#### Project Structure Test

Run this command to verify the notebook folders:

```bash
find notebooks -maxdepth 2 -print
```

#### Expected Test Output

```text
notebooks
notebooks/README.md
notebooks/01_ingestion
notebooks/02_chunking
notebooks/03_embeddings
notebooks/04_vectorstore
notebooks/05_retrieval
notebooks/06_generation
notebooks/07_prompting
notebooks/08_langchain
notebooks/09_langgraph
notebooks/10_agents
notebooks/11_evaluation
notebooks/12_guardrails
notebooks/13_observability
notebooks/14_end_to_end
notebooks/experiments
notebooks/experiments/.gitkeep
```

::: success What We Completed
The notebook workspace now covers RAG, agentic RAG, prompting, LangChain, LangGraph, and broader AI application learning, organized by technology and capability instead of instructor or source.
:::

## Step 6: Create Project Workspaces

**Create Dedicated Areas for Mini Projects, Self-Contained Projects, and Capstone Work**

::: info Goal
Create a dedicated `projects/` area for practical builds that are larger than notebooks but still belong inside the main Production RAG repository.
:::

#### Why

This keeps learning notebooks separate from complete implementations. Mini projects can stay small and focused, while self-contained projects and capstones can grow without polluting the main `src/` or notebook structure.

::: tip Engineering Rule
By default, these projects share the root `pyproject.toml`, `uv.lock`, virtual environment, and shared resources. A subproject gets its own environment only when it truly needs different dependencies, a different Python version, independent deployment, or complete portability.
:::

#### Command — Windows Bash

```bash
mkdir -p \
projects/mini_projects \
projects/self_contained \
projects/capstone \
shared/utils \
shared/resources \
shared/prompts \
shared/fixtures

touch projects/mini_projects/.gitkeep
touch projects/self_contained/.gitkeep
touch projects/capstone/.gitkeep
touch shared/utils/.gitkeep
touch shared/resources/.gitkeep
touch shared/prompts/.gitkeep
touch shared/fixtures/.gitkeep
```

#### Expected Result

```text
projects/
├── mini_projects/
│   └── .gitkeep
├── self_contained/
│   └── .gitkeep
└── capstone/
    └── .gitkeep

shared/
├── utils/
│   └── .gitkeep
├── resources/
│   └── .gitkeep
├── prompts/
│   └── .gitkeep
└── fixtures/
    └── .gitkeep
```

#### How to Use These Folders

| Folder | Use |
|---|---|
| projects/mini_projects | Small focused builds such as simple PDF RAG, hybrid search, or prompt routing. |
| projects/self_contained | Complete applications such as customer support RAG or Text-to-SQL agents. |
| projects/capstone | Larger integrated projects that combine multiple RAG and agentic capabilities. |
| shared/utils | Reusable helper functions shared across projects. |
| shared/resources | Reusable files, templates, and non-code resources. |
| shared/prompts | Prompt templates reused by notebooks or projects. |
| shared/fixtures | Reusable sample and test data. |

#### Project Structure Test

Run this command to verify the new project and shared folders:

```bash
find projects shared -maxdepth 2 -print
```

#### Expected Test Output

```text
projects
projects/mini_projects
projects/mini_projects/.gitkeep
projects/self_contained
projects/self_contained/.gitkeep
projects/capstone
projects/capstone/.gitkeep
shared
shared/utils
shared/utils/.gitkeep
shared/resources
shared/resources/.gitkeep
shared/prompts
shared/prompts/.gitkeep
shared/fixtures
shared/fixtures/.gitkeep
```

::: success What We Completed
The repository now has a clean place for practical project work and reusable shared assets, while still using the main root environment by default.
:::

## Step 7: Create Source Structure

**Create the Production Source Code Structure under src/myproject**

::: info Goal
Create the main production Python package under `src/myproject/`. This package can hold RAG, agents, LangGraph workflows, APIs, evaluation, security, observability, and other AI application capabilities.
:::

#### Why

Using a generic application package such as `myproject` avoids coupling the codebase to only one capability such as RAG. The package can grow with the application while keeping each engineering concern isolated.

#### Command — Windows Bash

```bash
mkdir -p \
src/myproject/api \
src/myproject/core \
src/myproject/schemas \
src/myproject/ingestion \
src/myproject/embeddings \
src/myproject/vectorstore \
src/myproject/retrieval \
src/myproject/generation \
src/myproject/pipelines \
src/myproject/agents \
src/myproject/langgraph \
src/myproject/evaluation \
src/myproject/guardrails \
src/myproject/security \
src/myproject/observability \
src/myproject/cache \
src/myproject/services \
src/myproject/versioning \
src/myproject/governance \
src/myproject/utils

touch src/myproject/__init__.py
touch src/myproject/api/__init__.py
touch src/myproject/core/__init__.py
touch src/myproject/schemas/__init__.py
touch src/myproject/ingestion/__init__.py
touch src/myproject/embeddings/__init__.py
touch src/myproject/vectorstore/__init__.py
touch src/myproject/retrieval/__init__.py
touch src/myproject/generation/__init__.py
touch src/myproject/pipelines/__init__.py
touch src/myproject/agents/__init__.py
touch src/myproject/langgraph/__init__.py
touch src/myproject/evaluation/__init__.py
touch src/myproject/guardrails/__init__.py
touch src/myproject/security/__init__.py
touch src/myproject/observability/__init__.py
touch src/myproject/cache/__init__.py
touch src/myproject/services/__init__.py
touch src/myproject/versioning/__init__.py
touch src/myproject/governance/__init__.py
touch src/myproject/utils/__init__.py
```

#### Expected Result

```text
src/
└── myproject/
    ├── __init__.py
    ├── api/
    ├── core/
    ├── schemas/
    ├── ingestion/
    ├── embeddings/
    ├── vectorstore/
    ├── retrieval/
    ├── generation/
    ├── pipelines/
    ├── agents/
    ├── langgraph/
    ├── evaluation/
    ├── guardrails/
    ├── security/
    ├── observability/
    ├── cache/
    ├── services/
    ├── versioning/
    ├── governance/
    └── utils/
```

#### What Each Section Is For

| Section | Purpose | Example |
|---|---|---|
| api/ | HTTP/API entry points and route handling. | FastAPI query, document, health, and admin routes. |
| core/ | Application-wide foundation. | Configuration, logging, constants, lifecycle, exceptions. |
| schemas/ | Typed data contracts. | Request, response, document, retrieval, and generation models. |
| ingestion/ | Bring external information into the system. | Loaders, parsers, normalization, metadata, chunking. |
| embeddings/ | Convert content into vector representations. | OpenAI or local embedding providers and factories. |
| vectorstore/ | Store and search vectors. | Qdrant collections, indexing, migrations. |
| retrieval/ | Find relevant information. | Dense, sparse, hybrid, filters, multi-query, reranking. |
| generation/ | Build model context and generate responses. | Prompts, context builder, token budget, citations, LLM calls. |
| pipelines/ | Coordinate multiple application stages. | Ingestion, query, and end-to-end RAG pipelines. |
| agents/ | Agent-specific planning and tool use. | Agent executors, tools, planning, action loops. |
| langgraph/ | Stateful graph-based workflows. | Graphs, state, nodes, checkpoints, branching, memory. |
| evaluation/ | Measure application and model quality. | RAGAS, DeepEval, retrieval metrics, regression tests. |
| guardrails/ | AI-specific safety and policy controls. | Input/output checks, PII, prompt injection detection. |
| security/ | Application and data protection. | Authentication, permissions, secrets, sanitization, audit. |
| observability/ | Understand production behavior. | Tracing, metrics, token usage, latency, telemetry. |
| cache/ | Reduce repeated work and cost. | Redis cache, embedding cache, semantic cache. |
| services/ | Expose application-level use cases. | Query service, ingestion service, evaluation service. |
| versioning/ | Track important AI artifacts and configurations. | Pipeline, model, prompt, and index versions. |
| governance/ | Control data lifecycle and provenance. | Retention, classification, provenance, access policy. |
| utils/ | Generic reusable helpers. | Hashing, retries, timing, small shared helpers. |

#### Engineering Boundary

Keep domain logic inside its own section. For example, retrieval logic belongs in `retrieval/`, not `utils/`. LangGraph workflows belong in `langgraph/`, while reusable agent tools belong in `agents/`.

#### Project Structure Test

```bash
find src/myproject -maxdepth 2 -print
```

::: success What We Completed
The production package now has a generic, extensible source structure that can support RAG, agents, LangGraph, APIs, evaluation, and other AI application capabilities.
:::

## Step 8: Build Production API

**Build a Versioned FastAPI Foundation with Health, Ping, and Ask-AI Endpoints**

::: info Goal
Build the first complete API layer for `myproject` using a production-oriented, multi-file FastAPI structure. The API includes versioned routing, schemas, a service layer, request timing middleware, and three sample endpoints: `health`, `ping`, and `ask-ai`.
:::

#### Why

The API should stay thin. Routes handle HTTP, schemas define contracts, services hold application behavior, and the main app only wires everything together. This makes it easier to extend later with RAG, agents, LangGraph, authentication, and observability.

#### API Structure

```text
src/myproject/
├── api/
│   ├── __init__.py
│   ├── main.py
│   ├── middleware.py
│   └── v1/
│       ├── __init__.py
│       ├── router.py
│       ├── health.py
│       ├── ping.py
│       └── ask_ai.py
├── schemas/
│   ├── __init__.py
│   └── ai.py
└── services/
    ├── __init__.py
    └── ai_service.py
```

#### Create the API Files — Windows Bash

```bash
cat > setup_api.sh <<'BASH'
#!/usr/bin/env bash
set -euo pipefail

mkdir -p src/myproject/api/v1 src/myproject/schemas src/myproject/services

touch src/myproject/api/__init__.py
touch src/myproject/api/v1/__init__.py
touch src/myproject/schemas/__init__.py
touch src/myproject/services/__init__.py

cat > src/myproject/schemas/ai.py <<'PY'
from pydantic import BaseModel, Field


class AskAIRequest(BaseModel):
    question: str = Field(min_length=1, max_length=2000)


class AskAIResponse(BaseModel):
    answer: str
PY

cat > src/myproject/services/ai_service.py <<'PY'
from myproject.schemas.ai import AskAIRequest, AskAIResponse


class AIService:
    async def ask(self, request: AskAIRequest) -> AskAIResponse:
        return AskAIResponse(
            answer=f"AI service received: {request.question}"
        )
PY

cat > src/myproject/api/v1/health.py <<'PY'
from fastapi import APIRouter

router = APIRouter(tags=["health"])


@router.get("/health")
async def health() -> dict[str, str]:
    return {"status": "healthy"}
PY

cat > src/myproject/api/v1/ping.py <<'PY'
from fastapi import APIRouter

router = APIRouter(tags=["system"])


@router.get("/ping")
async def ping() -> dict[str, str]:
    return {"message": "pong"}
PY

cat > src/myproject/api/v1/ask_ai.py <<'PY'
from fastapi import APIRouter

from myproject.schemas.ai import AskAIRequest, AskAIResponse
from myproject.services.ai_service import AIService

router = APIRouter(prefix="/ai", tags=["ai"])


@router.post("/ask", response_model=AskAIResponse)
async def ask_ai(request: AskAIRequest) -> AskAIResponse:
    service = AIService()
    return await service.ask(request)
PY

cat > src/myproject/api/v1/router.py <<'PY'
from fastapi import APIRouter

from myproject.api.v1 import ask_ai, health, ping

router = APIRouter()
router.include_router(health.router)
router.include_router(ping.router)
router.include_router(ask_ai.router)
PY

cat > src/myproject/api/middleware.py <<'PY'
from time import perf_counter

from fastapi import FastAPI, Request


def register_middleware(app: FastAPI) -> None:
    @app.middleware("http")
    async def add_process_time_header(request: Request, call_next):
        start = perf_counter()
        response = await call_next(request)
        elapsed = perf_counter() - start
        response.headers["X-Process-Time"] = f"{elapsed:.6f}"
        return response
PY

cat > src/myproject/api/main.py <<'PY'
from contextlib import asynccontextmanager

from fastapi import FastAPI

from myproject.api.middleware import register_middleware
from myproject.api.v1.router import router as v1_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield


def create_app() -> FastAPI:
    app = FastAPI(
        title="MyProject API",
        version="1.0.0",
        lifespan=lifespan,
    )

    register_middleware(app)
    app.include_router(v1_router, prefix="/api/v1")
    return app


app = create_app()
PY

echo "API foundation created."
BASH

chmod +x setup_api.sh
./setup_api.sh
```

#### What the Example Endpoints Do

| Endpoint | Purpose | Example Response |
|---|---|---|
| GET /api/v1/health | Basic health check for operators and deployment systems. | `{"status":"healthy"}` |
| GET /api/v1/ping | Simple connectivity test. | `{"message":"pong"}` |
| POST /api/v1/ai/ask | Demonstrates request validation and API → service separation. | `{"answer":"AI service received: ..."}` |

#### Run the API — Windows Bash

```bash
PYTHONPATH=src uv run uvicorn myproject.api.main:app --reload
```

#### Expected Startup

```text
Uvicorn running on http://127.0.0.1:8000
```

#### API Tests — Windows Bash

```bash
curl http://127.0.0.1:8000/api/v1/health
curl http://127.0.0.1:8000/api/v1/ping

curl -X POST http://127.0.0.1:8000/api/v1/ai/ask \
  -H "Content-Type: application/json" \
  -d '{"question":"What is RAG?"}'
```

#### Expected Test Output

```text
{"status":"healthy"}

{"message":"pong"}

{"answer":"AI service received: What is RAG?"}
```

#### Interactive API Documentation

Open `http://127.0.0.1:8000/docs` after the server starts.

#### Best-Practice Boundaries

| Layer | Responsibility |
|---|---|
| api/ | HTTP transport, routing, status codes, headers, API versioning. |
| schemas/ | Validated request and response contracts. |
| services/ | Application use cases and orchestration exposed to routes. |
| main.py | Create the app and wire routers, middleware, and lifecycle resources. |
| middleware.py | Cross-request behavior such as timing, request IDs, logging, and later security. |

#### Project Structure Test

```bash
find src/myproject/api src/myproject/schemas src/myproject/services -maxdepth 3 -print
```

#### API Extension Guide — How to Add a New Endpoint

Once this API foundation exists, every new endpoint should follow the same pattern. Do not place business logic directly inside the route file.

#### Example: Add a New Document Endpoint

**1. Create the request/response schema**

```bash title="src/myproject/schemas/document.py"
cat > src/myproject/schemas/document.py <<'PY'
from pydantic import BaseModel, Field


class DocumentRequest(BaseModel):
    content: str = Field(min_length=1)


class DocumentResponse(BaseModel):
    message: str
PY
```

**2. Create the service logic**

```bash title="src/myproject/services/document_service.py"
cat > src/myproject/services/document_service.py <<'PY'
from myproject.schemas.document import DocumentRequest, DocumentResponse


class DocumentService:
    async def create(self, request: DocumentRequest) -> DocumentResponse:
        return DocumentResponse(
            message=f"Document received with {len(request.content)} characters."
        )
PY
```

**3. Create the API route**

```bash title="src/myproject/api/v1/documents.py"
cat > src/myproject/api/v1/documents.py <<'PY'
from fastapi import APIRouter

from myproject.schemas.document import DocumentRequest, DocumentResponse
from myproject.services.document_service import DocumentService

router = APIRouter(prefix="/documents", tags=["documents"])


@router.post("", response_model=DocumentResponse)
async def create_document(request: DocumentRequest) -> DocumentResponse:
    service = DocumentService()
    return await service.create(request)
PY
```

**4. Register the router**

Update `src/myproject/api/v1/router.py` so FastAPI knows about the new endpoint.

```python
from fastapi import APIRouter

from myproject.api.v1 import ask_ai, documents, health, ping

router = APIRouter()
router.include_router(health.router)
router.include_router(ping.router)
router.include_router(ask_ai.router)
router.include_router(documents.router)
```

**5. Test the new endpoint**

```bash
curl -X POST http://127.0.0.1:8000/api/v1/documents \
  -H "Content-Type: application/json" \
  -d '{"content":"This is my first document."}'
```

#### Expected Output

```text
{"message":"Document received with 26 characters."}
```

#### Repeatable Production Pattern

```text
New API Feature
      ↓
schemas/<feature>.py
      ↓
services/<feature>_service.py
      ↓
api/v1/<feature>.py
      ↓
register in api/v1/router.py
      ↓
test with curl / Swagger / automated tests
```

::: tip Engineering Rule
Keep route files thin. HTTP handling belongs in `api/`, validation belongs in `schemas/`, and application logic belongs in `services/`. Use the same pattern later for chat, RAG, documents, agents, evaluation, authentication, and other production APIs.
:::

::: success What We Completed
MyProject now has a working, versioned FastAPI foundation with clean layer boundaries, lifecycle support, middleware, automatic OpenAPI documentation, and sample system and AI endpoints. The `ask-ai` service is intentionally a placeholder; real LLM/RAG integration comes later.
:::

## Step 9: Configure Environment

**Add Typed Configuration, .env Loading, and Environment-Safe Settings**

::: info Goal
Create one central configuration system for `myproject` using `pydantic-settings`. The application will load values from environment variables and a local `.env` file without scattering configuration logic across the codebase.
:::

#### Why

Production applications should not hard-code API keys, database URLs, model names, environment names, or service settings inside application code. Central typed configuration makes settings easier to validate, test, document, and change between local, test, staging, and production environments.

#### Configuration Structure

```text
myproject/
├── .env
├── .env.example
└── src/
    └── myproject/
        └── core/
            ├── __init__.py
            └── config.py
```

#### Create .env.example — Windows Bash

```bash title=".env.example"
cat > .env.example <<'EOF'
APP_NAME=MyProject
APP_ENV=development
DEBUG=true
API_V1_PREFIX=/api/v1

OPENAI_API_KEY=
OPENAI_MODEL=gpt-4.1-mini

QDRANT_URL=http://localhost:6333
REDIS_URL=redis://localhost:6379
EOF
```

#### Create Local .env — Windows Bash

```bash
cp .env.example .env
```

::: warning Important
Keep `.env` local and private. Commit `.env.example` so other developers know which variables are required, but never put real secrets in the example file.
:::

#### Create the Typed Settings Class — Windows Bash

```bash title="src/myproject/core/config.py"
cat > src/myproject/core/config.py <<'PY'
from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "MyProject"
    app_env: str = "development"
    debug: bool = False
    api_v1_prefix: str = "/api/v1"

    openai_api_key: str | None = Field(default=None, repr=False)
    openai_model: str = "gpt-4.1-mini"

    qdrant_url: str = "http://localhost:6333"
    redis_url: str = "redis://localhost:6379"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()
PY
```

#### Why Use get_settings()

`get_settings()` caches one settings object for the application process. This avoids repeatedly reading and parsing environment configuration throughout the app.

#### Connect Settings to FastAPI

Update `src/myproject/api/main.py` so API metadata and route prefixes come from configuration.

```python
from contextlib import asynccontextmanager

from fastapi import FastAPI

from myproject.api.middleware import register_middleware
from myproject.api.v1.router import router as v1_router
from myproject.core.config import get_settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield


def create_app() -> FastAPI:
    settings = get_settings()

    app = FastAPI(
        title=f"{settings.app_name} API",
        version="1.0.0",
        debug=settings.debug,
        lifespan=lifespan,
    )

    register_middleware(app)
    app.include_router(v1_router, prefix=settings.api_v1_prefix)

    return app


app = create_app()
```

#### Create a Configuration Test File

```bash title="test_config.py"
cat > test_config.py <<'PY'
from myproject.core.config import get_settings


settings = get_settings()

print("APP_NAME:", settings.app_name)
print("APP_ENV:", settings.app_env)
print("DEBUG:", settings.debug)
print("API_V1_PREFIX:", settings.api_v1_prefix)
print("OPENAI_MODEL:", settings.openai_model)
print("QDRANT_URL:", settings.qdrant_url)
print("REDIS_URL:", settings.redis_url)

print("Configuration loaded successfully.")
PY
```

#### Run the Configuration Test — Windows Bash

```bash
PYTHONPATH=src uv run python test_config.py
```

#### Expected Output

```text
APP_NAME: MyProject
APP_ENV: development
DEBUG: True
API_V1_PREFIX: /api/v1
OPENAI_MODEL: gpt-4.1-mini
QDRANT_URL: http://localhost:6333
REDIS_URL: redis://localhost:6379
Configuration loaded successfully.
```

#### Environment Strategy

| Environment | Typical Use | Configuration Source |
|---|---|---|
| development | Local engineering and notebook work. | Local `.env` |
| test | Automated tests and CI. | CI/test environment variables |
| staging | Pre-production validation. | Deployment platform / secret manager |
| production | Live application. | Secret manager / deployment environment |

#### Configuration Rules

| Rule | Reason |
|---|---|
| Do not hard-code secrets. | Credentials must be replaceable and protected. |
| Commit .env.example, not .env. | Developers need the variable names, not real values. |
| Use typed settings. | Invalid configuration fails early instead of later at runtime. |
| Keep configuration centralized. | Prevents duplicated environment parsing across modules. |
| Use deployment secrets in production. | Production credentials should not depend on local files. |

#### Project Structure Test

```bash
find src/myproject/core -maxdepth 2 -print
ls -la .env .env.example test_config.py
```

#### Expected Structure

```text
.
├── .env
├── .env.example
├── test_config.py
└── src/
    └── myproject/
        └── core/
            ├── __init__.py
            └── config.py
```

::: success What We Completed
MyProject now has centralized, typed, environment-aware configuration. Local development can use `.env`, while staging and production can inject settings through deployment systems or secret managers without changing application code.
:::

## Step 10: Add Logging and Errors

**Add Structured Logging, Request Correlation, and Global Error Handling**

::: info Goal
Add a consistent logging system and centralized exception handling so every request, error, and important application event can be traced and diagnosed.
:::

#### Why

Production systems need predictable logs and error responses. Logging should help engineers understand what happened without exposing sensitive information, while global error handling should return clean API responses instead of raw stack traces.

#### Structure

```text
src/myproject/
├── core/
│   ├── __init__.py
│   ├── logging.py
│   └── exceptions.py
└── api/
    ├── main.py
    ├── middleware.py
    └── error_handlers.py
```

#### Create Application Exceptions — Windows Bash

```bash title="src/myproject/core/exceptions.py"
cat > src/myproject/core/exceptions.py <<'PY'
class AppError(Exception):
    def __init__(
        self,
        message: str,
        status_code: int = 500,
        code: str = "app_error",
    ) -> None:
        super().__init__(message)
        self.message = message
        self.status_code = status_code
        self.code = code


class NotFoundError(AppError):
    def __init__(self, message: str = "Resource not found.") -> None:
        super().__init__(
            message=message,
            status_code=404,
            code="not_found",
        )


class BadRequestError(AppError):
    def __init__(self, message: str = "Invalid request.") -> None:
        super().__init__(
            message=message,
            status_code=400,
            code="bad_request",
        )
PY
```

#### Create Logging Configuration — Windows Bash

```bash title="src/myproject/core/logging.py"
cat > src/myproject/core/logging.py <<'PY'
import logging
import sys


def configure_logging() -> None:
    logging.basicConfig(
        level=logging.INFO,
        format=(
            "%(asctime)s | %(levelname)s | "
            "%(name)s | %(message)s"
        ),
        handlers=[logging.StreamHandler(sys.stdout)],
        force=True,
    )


def get_logger(name: str) -> logging.Logger:
    return logging.getLogger(name)
PY
```

#### Create Global Error Handlers — Windows Bash

```bash title="src/myproject/api/error_handlers.py"
cat > src/myproject/api/error_handlers.py <<'PY'
import logging

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from myproject.core.exceptions import AppError

logger = logging.getLogger(__name__)


def register_error_handlers(app: FastAPI) -> None:
    @app.exception_handler(AppError)
    async def app_error_handler(
        request: Request,
        exc: AppError,
    ) -> JSONResponse:
        logger.warning(
            "Application error: %s | path=%s",
            exc.message,
            request.url.path,
        )

        return JSONResponse(
            status_code=exc.status_code,
            content={
                "error": {
                    "code": exc.code,
                    "message": exc.message,
                }
            },
        )

    @app.exception_handler(Exception)
    async def unhandled_error_handler(
        request: Request,
        exc: Exception,
    ) -> JSONResponse:
        logger.exception(
            "Unhandled exception | path=%s",
            request.url.path,
        )

        return JSONResponse(
            status_code=500,
            content={
                "error": {
                    "code": "internal_server_error",
                    "message": "An unexpected error occurred.",
                }
            },
        )
PY
```

#### Add Request ID and Request Logging Middleware

Update `src/myproject/api/middleware.py` so each request receives a correlation ID and basic request timing is logged.

```bash title="src/myproject/api/middleware.py"
cat > src/myproject/api/middleware.py <<'PY'
import logging
from time import perf_counter
from uuid import uuid4

from fastapi import FastAPI, Request

logger = logging.getLogger(__name__)


def register_middleware(app: FastAPI) -> None:
    @app.middleware("http")
    async def request_context_middleware(
        request: Request,
        call_next,
    ):
        request_id = request.headers.get(
            "X-Request-ID",
            str(uuid4()),
        )

        start = perf_counter()

        response = await call_next(request)

        elapsed = perf_counter() - start

        response.headers["X-Request-ID"] = request_id
        response.headers["X-Process-Time"] = f"{elapsed:.6f}"

        logger.info(
            "%s %s | status=%s | request_id=%s | time=%.4fs",
            request.method,
            request.url.path,
            response.status_code,
            request_id,
            elapsed,
        )

        return response
PY
```

#### Wire Logging and Error Handling into FastAPI

Update `src/myproject/api/main.py`.

```python
from contextlib import asynccontextmanager

from fastapi import FastAPI

from myproject.api.error_handlers import register_error_handlers
from myproject.api.middleware import register_middleware
from myproject.api.v1.router import router as v1_router
from myproject.core.config import get_settings
from myproject.core.logging import configure_logging


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield


def create_app() -> FastAPI:
    settings = get_settings()

    configure_logging()

    app = FastAPI(
        title=f"{settings.app_name} API",
        version="1.0.0",
        debug=settings.debug,
        lifespan=lifespan,
    )

    register_middleware(app)
    register_error_handlers(app)

    app.include_router(
        v1_router,
        prefix=settings.api_v1_prefix,
    )

    return app


app = create_app()
```

#### Create a Sample Error Endpoint

Add one temporary endpoint to verify that application exceptions are handled correctly.

```bash title="src/myproject/api/v1/errors.py"
cat > src/myproject/api/v1/errors.py <<'PY'
from fastapi import APIRouter

from myproject.core.exceptions import BadRequestError

router = APIRouter(
    prefix="/errors",
    tags=["errors"],
)


@router.get("/sample")
async def sample_error():
    raise BadRequestError(
        "This is a controlled sample error."
    )
PY
```

#### Register the Sample Error Router

Update `src/myproject/api/v1/router.py`.

```python
from fastapi import APIRouter

from myproject.api.v1 import ask_ai, errors, health, ping

router = APIRouter()

router.include_router(health.router)
router.include_router(ping.router)
router.include_router(ask_ai.router)
router.include_router(errors.router)
```

#### Run the API

```bash
PYTHONPATH=src uv run uvicorn myproject.api.main:app --reload
```

#### Test Normal Request Logging

```bash
curl -i http://127.0.0.1:8000/api/v1/ping
```

#### Expected Response Headers

```text
HTTP/1.1 200 OK
x-request-id: <generated-request-id>
x-process-time: <seconds>
```

#### Test Controlled Error Handling

```bash
curl -i http://127.0.0.1:8000/api/v1/errors/sample
```

#### Expected Error Response

```text
{
  "error": {
    "code": "bad_request",
    "message": "This is a controlled sample error."
  }
}
```

#### What Good Production Logging Should Capture

| Item | Reason |
|---|---|
| Timestamp | Know exactly when the event occurred. |
| Log level | Separate information, warnings, and failures. |
| Logger/module name | Identify which component emitted the event. |
| Request ID | Correlate events belonging to the same request. |
| HTTP method/path | Identify the operation being executed. |
| Status code | See whether the request succeeded or failed. |
| Latency | Track performance regressions and slow operations. |

#### What Should Not Be Logged

| Avoid Logging | Reason |
|---|---|
| API keys and passwords | Logs are often visible to many systems and engineers. |
| Authorization tokens | Tokens may grant direct access to protected systems. |
| Full sensitive documents | Could expose confidential or personal information. |
| Raw private prompts/responses by default | AI traffic may contain sensitive user data. |

#### Project Structure Test

```bash
find src/myproject/core src/myproject/api -maxdepth 3 -print
```

#### Expected New Files

```text
src/myproject/core/logging.py
src/myproject/core/exceptions.py
src/myproject/api/error_handlers.py
src/myproject/api/middleware.py
src/myproject/api/v1/errors.py
```

::: success What We Completed
MyProject now has centralized logging, per-request correlation IDs, timing information, controlled application exceptions, and a safe fallback for unexpected errors. This creates the operational foundation needed before adding real external AI providers, databases, vector stores, and distributed services.
:::

## Step 11: Build Testing Foundation

**Create Unit, Integration, and API Tests with pytest**

::: info Goal
Create the automated testing foundation for `myproject` and verify configuration, services, API endpoints, and error handling.
:::

#### Why

Automated tests protect the project from regressions and provide a quality gate before CI/CD, security, AI providers, vector databases, and deployment.

#### Testing Structure

```text
tests/
├── conftest.py
├── unit/
│   ├── __init__.py
│   ├── test_config.py
│   └── test_ai_service.py
├── integration/
│   ├── __init__.py
│   ├── test_api_health.py
│   ├── test_api_ping.py
│   ├── test_api_ask_ai.py
│   └── test_error_handling.py
├── e2e/
│   └── __init__.py
└── fixtures/
    └── .gitkeep
```

#### Install the Remaining Test Dependency — Windows Bash

```bash
uv add --dev pytest-asyncio
```

#### Create the Test Folders

```bash
mkdir -p tests/unit tests/integration tests/e2e tests/fixtures

touch tests/unit/__init__.py
touch tests/integration/__init__.py
touch tests/e2e/__init__.py
touch tests/fixtures/.gitkeep
```

#### Create Shared Test Setup

```bash title="tests/conftest.py"
cat > tests/conftest.py <<'PY'
import sys
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"

if str(SRC) not in sys.path:
    sys.path.insert(0, str(SRC))

from myproject.api.main import app


@pytest.fixture()
def client() -> TestClient:
    return TestClient(app)
PY
```

#### Unit Test — Configuration

```bash title="tests/unit/test_config.py"
cat > tests/unit/test_config.py <<'PY'
from myproject.core.config import get_settings


def test_settings_load():
    settings = get_settings()

    assert settings.app_name
    assert settings.api_v1_prefix == "/api/v1"
    assert settings.openai_model
PY
```

#### Unit Test — AI Service

```bash title="tests/unit/test_ai_service.py"
cat > tests/unit/test_ai_service.py <<'PY'
import pytest

from myproject.schemas.ai import AskAIRequest
from myproject.services.ai_service import AIService


@pytest.mark.asyncio
async def test_ai_service_returns_answer():
    service = AIService()

    response = await service.ask(
        AskAIRequest(question="What is RAG?")
    )

    assert "What is RAG?" in response.answer
PY
```

#### Integration Test — Health API

```bash title="tests/integration/test_api_health.py"
cat > tests/integration/test_api_health.py <<'PY'
def test_health(client):
    response = client.get("/api/v1/health")

    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}
PY
```

#### Integration Test — Ping API

```bash title="tests/integration/test_api_ping.py"
cat > tests/integration/test_api_ping.py <<'PY'
def test_ping(client):
    response = client.get("/api/v1/ping")

    assert response.status_code == 200
    assert response.json() == {"message": "pong"}
    assert "x-request-id" in response.headers
    assert "x-process-time" in response.headers
PY
```

#### Integration Test — Ask AI API

```bash title="tests/integration/test_api_ask_ai.py"
cat > tests/integration/test_api_ask_ai.py <<'PY'
def test_ask_ai(client):
    response = client.post(
        "/api/v1/ai/ask",
        json={"question": "What is RAG?"},
    )

    assert response.status_code == 200

    body = response.json()

    assert "answer" in body
    assert "What is RAG?" in body["answer"]
PY
```

#### Integration Test — Error Handling

```bash title="tests/integration/test_error_handling.py"
cat > tests/integration/test_error_handling.py <<'PY'
def test_controlled_error(client):
    response = client.get("/api/v1/errors/sample")

    assert response.status_code == 400
    assert response.json() == {
        "error": {
            "code": "bad_request",
            "message": "This is a controlled sample error.",
        }
    }
PY
```

#### Run the Full Test Suite

```bash
PYTHONPATH=src uv run pytest -v
```

#### Expected Test Result

```text
6 passed
```

#### Run Tests with Coverage

```bash
PYTHONPATH=src uv run pytest --cov=src/myproject --cov-report=term-missing
```

#### What Each Test Level Means

| Level | Purpose | Example |
|---|---|---|
| unit | Test one class or function in isolation. | Configuration or AI service behavior. |
| integration | Test multiple application layers together. | FastAPI route → schema → service → response. |
| e2e | Test the complete user-visible workflow. | Later: upload document → retrieve → generate answer. |
| fixtures | Store reusable deterministic test data. | Sample documents and expected outputs. |

#### Project Structure Test

```bash
find tests -maxdepth 2 -print
```

::: success What We Completed
MyProject now has unit tests, API integration tests, async test support, shared fixtures, and coverage reporting.
:::

## Step 12: Add Security Foundation

**Add Authentication, Authorization, Protected Routes, and Security Tests**

::: info Goal
Add a simple but extensible security foundation using FastAPI security dependencies. Public endpoints remain open, while protected endpoints require credentials.
:::

#### Why

Security belongs in the architecture before real AI providers, documents, vector stores, and private data are connected. The first version uses an API key so the pattern is easy to understand; the same dependency boundary can later be replaced by JWT/OAuth without rewriting routes.

#### Add Security Setting

```bash
cat >> .env.example <<'EOF'
APP_API_KEY=change-me
EOF

cat >> .env <<'EOF'
APP_API_KEY=dev-secret-key
EOF
```

#### Update Configuration

```bash title="/dev/null"
cat >> /dev/null <<'NOTE'
Add this field inside Settings in src/myproject/core/config.py:

app_api_key: str = Field(default="change-me", repr=False)
NOTE
```

#### Create Security Dependency

```bash title="src/myproject/security/auth.py"
cat > src/myproject/security/auth.py <<'PY'
from fastapi import HTTPException, Security, status
from fastapi.security import APIKeyHeader

from myproject.core.config import get_settings

api_key_header = APIKeyHeader(
    name="X-API-Key",
    auto_error=False,
)


async def require_api_key(
    api_key: str | None = Security(api_key_header),
) -> str:
    settings = get_settings()

    if not api_key or api_key != settings.app_api_key:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing API key.",
        )

    return api_key
PY
```

#### Create Protected Endpoint

```bash title="src/myproject/api/v1/admin.py"
cat > src/myproject/api/v1/admin.py <<'PY'
from fastapi import APIRouter, Depends

from myproject.security.auth import require_api_key

router = APIRouter(
    prefix="/admin",
    tags=["admin"],
)


@router.get("/status")
async def admin_status(
    _: str = Depends(require_api_key),
):
    return {"status": "authorized"}
PY
```

#### Register the Router

Import `admin` in `api/v1/router.py` and add:

```bash
router.include_router(admin.router)
```

#### Test Unauthorized Access

```bash
curl -i http://127.0.0.1:8000/api/v1/admin/status
```

#### Expected

```text
HTTP/1.1 401 Unauthorized
```

#### Test Authorized Access

```bash
curl -H "X-API-Key: dev-secret-key" \
http://127.0.0.1:8000/api/v1/admin/status
```

#### Expected

```text
{"status":"authorized"}
```

::: success What We Completed
The project now has a reusable authentication boundary, public/protected route separation, and a clean path to later JWT, OAuth, RBAC, or tenant-level authorization.
:::

## Step 13: Connect Real AI Provider

**Replace the Placeholder AI Service with a Real OpenAI Provider**

::: info Goal
Connect the existing `ask-ai` API to a real model through a dedicated provider/service boundary.
:::

#### Why

Provider-specific SDK calls should stay outside routes. This makes model providers swappable and keeps API code stable.

#### Add Your Key Locally

```bash
OPENAI_API_KEY=your-real-key
```

#### Create LLM Provider

```bash title="src/myproject/generation/llm.py"
cat > src/myproject/generation/llm.py <<'PY'
from openai import AsyncOpenAI

from myproject.core.config import get_settings


class OpenAIProvider:
    def __init__(self) -> None:
        settings = get_settings()

        self.client = AsyncOpenAI(
            api_key=settings.openai_api_key,
        )
        self.model = settings.openai_model

    async def generate(self, prompt: str) -> str:
        response = await self.client.responses.create(
            model=self.model,
            input=prompt,
        )

        return response.output_text
PY
```

#### Update AI Service

```bash title="src/myproject/services/ai_service.py"
cat > src/myproject/services/ai_service.py <<'PY'
from myproject.generation.llm import OpenAIProvider
from myproject.schemas.ai import AskAIRequest, AskAIResponse


class AIService:
    def __init__(self) -> None:
        self.provider = OpenAIProvider()

    async def ask(self, request: AskAIRequest) -> AskAIResponse:
        answer = await self.provider.generate(
            request.question
        )

        return AskAIResponse(answer=answer)
PY
```

#### Test the Real AI Endpoint

```bash
curl -X POST http://127.0.0.1:8000/api/v1/ai/ask \
  -H "Content-Type: application/json" \
  -d '{"question":"Explain RAG in one sentence."}'
```

::: success What We Completed
The API now reaches a real model through a provider abstraction rather than embedding SDK logic in the route.
:::

## Step 14: Add Embeddings

**Add an Embedding Provider with a Stable Application Interface**

::: info Goal
Create a reusable embedding service for documents and queries.
:::

#### Why

Embeddings are used by vector retrieval. Keeping them behind a provider class allows model changes without changing ingestion or retrieval logic.

#### Add Embedding Model Setting

```bash
OPENAI_EMBEDDING_MODEL=text-embedding-3-small
```

#### Create Embedding Provider

```bash title="src/myproject/embeddings/openai.py"
cat > src/myproject/embeddings/openai.py <<'PY'
from openai import AsyncOpenAI

from myproject.core.config import get_settings


class OpenAIEmbeddingProvider:
    def __init__(self) -> None:
        settings = get_settings()
        self.client = AsyncOpenAI(
            api_key=settings.openai_api_key,
        )
        self.model = settings.openai_embedding_model

    async def embed(self, texts: list[str]) -> list[list[float]]:
        response = await self.client.embeddings.create(
            model=self.model,
            input=texts,
        )

        return [
            item.embedding
            for item in response.data
        ]
PY
```

#### Simple Verification

```bash title="test_embeddings.py"
cat > test_embeddings.py <<'PY'
import asyncio

from myproject.embeddings.openai import OpenAIEmbeddingProvider


async def main():
    provider = OpenAIEmbeddingProvider()

    vectors = await provider.embed(
        ["RAG combines retrieval and generation."]
    )

    print("Vectors:", len(vectors))
    print("Dimensions:", len(vectors[0]))


asyncio.run(main())
PY

PYTHONPATH=src uv run python test_embeddings.py
```

::: success What We Completed
The project can now convert text into vectors through a reusable embedding boundary.
:::

## Step 15: Add Vector Store

**Connect Qdrant and Create the Vector Persistence Layer**

::: info Goal
Connect the application to Qdrant and define collection, upsert, search, and delete operations.
:::

#### Why

The vector-store layer should isolate database-specific code from retrieval and ingestion logic.

#### Run Qdrant Locally

```bash
docker run -d \
  --name myproject-qdrant \
  -p 6333:6333 \
  qdrant/qdrant
```

#### Create Qdrant Adapter

```bash title="src/myproject/vectorstore/qdrant.py"
cat > src/myproject/vectorstore/qdrant.py <<'PY'
from qdrant_client import AsyncQdrantClient
from qdrant_client.models import (
    Distance,
    PointStruct,
    VectorParams,
)

from myproject.core.config import get_settings


class QdrantStore:
    def __init__(self) -> None:
        settings = get_settings()
        self.client = AsyncQdrantClient(
            url=settings.qdrant_url,
        )

    async def ensure_collection(
        self,
        name: str,
        vector_size: int,
    ) -> None:
        exists = await self.client.collection_exists(
            collection_name=name
        )

        if not exists:
            await self.client.create_collection(
                collection_name=name,
                vectors_config=VectorParams(
                    size=vector_size,
                    distance=Distance.COSINE,
                ),
            )

    async def upsert(
        self,
        collection: str,
        points: list[PointStruct],
    ) -> None:
        await self.client.upsert(
            collection_name=collection,
            points=points,
        )
PY
```

#### Connectivity Test

```bash
curl http://localhost:6333/healthz
```

::: success What We Completed
Qdrant is now isolated behind a vector-store adapter ready for ingestion and retrieval.
:::

## Step 16: Build Ingestion Pipeline

**Build the First Document → Chunk → Embed → Index Pipeline**

::: info Goal
Create the first real ingestion path that converts raw documents into searchable vector-store records.
:::

#### Why

Ingestion is responsible for preparing trusted, traceable evidence for retrieval. It should remain independent from the query/generation path.

#### Create a Simple Chunker

```bash title="src/myproject/ingestion/chunker.py"
cat > src/myproject/ingestion/chunker.py <<'PY'
def chunk_text(
    text: str,
    chunk_size: int = 500,
) -> list[str]:
    return [
        text[i:i + chunk_size]
        for i in range(0, len(text), chunk_size)
    ]
PY
```

#### Create Ingestion Pipeline

```bash title="src/myproject/pipelines/ingestion_pipeline.py"
cat > src/myproject/pipelines/ingestion_pipeline.py <<'PY'
from uuid import uuid4

from qdrant_client.models import PointStruct

from myproject.embeddings.openai import OpenAIEmbeddingProvider
from myproject.ingestion.chunker import chunk_text
from myproject.vectorstore.qdrant import QdrantStore


class IngestionPipeline:
    def __init__(self) -> None:
        self.embedder = OpenAIEmbeddingProvider()
        self.store = QdrantStore()

    async def run(
        self,
        text: str,
        collection: str = "documents",
    ) -> int:
        chunks = chunk_text(text)
        vectors = await self.embedder.embed(chunks)

        await self.store.ensure_collection(
            collection,
            len(vectors[0]),
        )

        points = [
            PointStruct(
                id=str(uuid4()),
                vector=vector,
                payload={"text": chunk},
            )
            for chunk, vector in zip(chunks, vectors)
        ]

        await self.store.upsert(
            collection,
            points,
        )

        return len(points)
PY
```

::: success What We Completed
The project now has its first working document indexing pipeline.
:::

## Step 17: Build Retrieval Pipeline

**Build Query Embedding and Vector Retrieval**

::: info Goal
Create the query-side retrieval pipeline that turns a user query into ranked evidence.
:::

#### Create Retrieval Pipeline

```bash title="src/myproject/pipelines/query_pipeline.py"
cat > src/myproject/pipelines/query_pipeline.py <<'PY'
from myproject.embeddings.openai import OpenAIEmbeddingProvider
from myproject.vectorstore.qdrant import QdrantStore


class QueryPipeline:
    def __init__(self) -> None:
        self.embedder = OpenAIEmbeddingProvider()
        self.store = QdrantStore()

    async def retrieve(
        self,
        query: str,
        collection: str = "documents",
        limit: int = 5,
    ):
        query_vector = (
            await self.embedder.embed([query])
        )[0]

        result = await self.store.client.query_points(
            collection_name=collection,
            query=query_vector,
            limit=limit,
        )

        return result.points
PY
```

#### Retrieval Contract

```text
User Query
    ↓
Query Embedding
    ↓
Qdrant Search
    ↓
Top-K Evidence
    ↓
Generation Pipeline
```

::: success What We Completed
The application can now retrieve evidence from indexed documents for a user query.
:::

## Step 18: Build RAG Pipeline

**Combine Retrieval, Context Building, Generation, and the API into the First End-to-End RAG Flow**

::: info Goal
Connect retrieval results to the LLM and return a grounded answer through the existing API architecture.
:::

#### Create Context Builder

```bash title="src/myproject/generation/context_builder.py"
cat > src/myproject/generation/context_builder.py <<'PY'
def build_context(points) -> str:
    return "\n\n".join(
        point.payload.get("text", "")
        for point in points
    )
PY
```

#### Create RAG Pipeline

```bash title="src/myproject/pipelines/rag_pipeline.py"
cat > src/myproject/pipelines/rag_pipeline.py <<'PY'
from myproject.generation.context_builder import build_context
from myproject.generation.llm import OpenAIProvider
from myproject.pipelines.query_pipeline import QueryPipeline


class RAGPipeline:
    def __init__(self) -> None:
        self.retrieval = QueryPipeline()
        self.llm = OpenAIProvider()

    async def ask(self, question: str) -> str:
        points = await self.retrieval.retrieve(question)

        context = build_context(points)

        prompt = f"""
Answer the question using only the context below.

Context:
{context}

Question:
{question}
"""

        return await self.llm.generate(prompt)
PY
```

#### Connect the Service to RAG

```bash title="src/myproject/services/ai_service.py"
cat > src/myproject/services/ai_service.py <<'PY'
from myproject.pipelines.rag_pipeline import RAGPipeline
from myproject.schemas.ai import AskAIRequest, AskAIResponse


class AIService:
    def __init__(self) -> None:
        self.rag = RAGPipeline()

    async def ask(
        self,
        request: AskAIRequest,
    ) -> AskAIResponse:
        answer = await self.rag.ask(
            request.question
        )

        return AskAIResponse(answer=answer)
PY
```

#### End-to-End Flow

```text
Document
   ↓
Ingestion Pipeline
   ↓
Chunk
   ↓
Embedding
   ↓
Qdrant

User Question
   ↓
FastAPI
   ↓
AI Service
   ↓
RAG Pipeline
   ↓
Query Embedding
   ↓
Qdrant Retrieval
   ↓
Context Builder
   ↓
LLM
   ↓
Answer
```

#### Test the RAG API

```bash
curl -X POST http://127.0.0.1:8000/api/v1/ai/ask \
  -H "Content-Type: application/json" \
  -d '{"question":"What does the indexed document say about RAG?"}'
```

::: success What We Completed
MyProject now has the first complete production-oriented RAG path from document indexing through retrieval and grounded generation, while preserving the API, service, pipeline, provider, and infrastructure boundaries established in the earlier steps.
:::

## Step 19: Dockerize Application

::: info Production AI Engineering Phase
**Learning pattern from Step 19 onward:** each step explains why the capability exists, how to build it with the correct architectural boundary, how to test it, the expected result, common failure modes, and how it connects to the next production concern.

**Deferred:** Steps 24–26 (Kubernetes, Terraform/cloud infrastructure, and platform-level production monitoring) remain intentionally deferred. The application can already progress through advanced RAG and agent engineering without them.
:::

**Package MyProject as a Reproducible, Production-Oriented Container**

::: info Goal
Create a Docker image that runs the same FastAPI application anywhere without depending on the developer machine.
:::

#### Why We Are Building This

Until this point the application depends on your local Python installation, virtual environment, and operating-system state. Docker freezes the runtime boundary: Python version, dependencies, source code, startup command, and runtime user. This is the first step toward repeatable deployment.

#### Build It the Right Way

**Do not copy the whole project blindly.** Keep build inputs small, separate dependency installation from source copying for cache efficiency, keep secrets out of the image, and run the application as a non-root user. A multi-stage Dockerfile keeps build tooling out of the final runtime image.

#### Files / Structure

```text
.
├── Dockerfile
├── .dockerignore
├── pyproject.toml
├── uv.lock
└── src/
```

#### Implementation

```bash
cat > .dockerignore <<'EOF'
.git
.github
.venv
.env
__pycache__/
.pytest_cache/
.mypy_cache/
.ruff_cache/
.coverage
htmlcov/
notebooks/
data/
tests/
EOF

cat > Dockerfile <<'EOF'
FROM python:3.12-slim AS builder

ENV UV_COMPILE_BYTECODE=1
ENV UV_LINK_MODE=copy

WORKDIR /build

RUN pip install --no-cache-dir uv

COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-dev

FROM python:3.12-slim AS runtime

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PATH="/app/.venv/bin:$PATH"
ENV PYTHONPATH="/app/src"

WORKDIR /app

RUN useradd --create-home --uid 10001 appuser

COPY --from=builder /build/.venv /app/.venv
COPY src /app/src

USER appuser

EXPOSE 8000

CMD ["uvicorn", "myproject.api.main:app", "--host", "0.0.0.0", "--port", "8000"]
EOF

docker build -t myproject-api:local .
```

#### How It Works

The `builder` stage resolves dependencies. The `runtime` stage contains only what is needed to run the service. `.dockerignore` prevents local secrets, test caches, notebooks, and unnecessary files from entering the build context. `USER appuser` avoids running the API as root.

#### Functional Test

```bash
docker run --rm   -p 8000:8000   --env-file .env   myproject-api:local

# In another terminal
curl http://127.0.0.1:8000/api/v1/health
```

#### Expected Result

```text
{"status":"healthy"}
```

#### Project Structure Test

```bash
docker image ls myproject-api
docker inspect myproject-api:local --format '{{.Config.User}}'
```

::: warning Common Failure to Understand
Do not bake `.env`, API keys, or cloud credentials into the image. Runtime configuration must be injected when the container starts.
:::

::: success Outcome
You now have a repeatable runtime artifact: the same container image can be tested locally, published by CI/CD, and deployed later.
:::

::: note Next
Step 20 will connect this API container to the infrastructure it needs: Qdrant and Redis.
:::

## Step 20: Build Docker Compose Stack

**Run FastAPI, Qdrant, and Redis as One Local Production-Like Stack**

::: info Goal
Run the application and its backing services together with deterministic service names and networking.
:::

#### Why We Are Building This

RAG does not run as one process. The API needs a vector database, and later caching/coordination uses Redis. Starting each dependency manually creates inconsistent environments. Docker Compose gives the team one command and one network.

#### Build It the Right Way

Use service names as internal DNS names. The API should talk to `qdrant:6333` and `redis:6379` inside Compose—not `localhost`. Keep persistent database data in named volumes so container recreation does not erase state.

#### Files / Structure

```text
.
├── docker-compose.yml
├── Dockerfile
├── .env
└── src/
```

#### Implementation

```bash title="docker-compose.yml"
cat > docker-compose.yml <<'EOF'
services:
  api:
    build:
      context: .
    container_name: myproject-api
    env_file:
      - .env
    environment:
      QDRANT_URL: http://qdrant:6333
      REDIS_URL: redis://redis:6379
    ports:
      - "8000:8000"
    depends_on:
      qdrant:
        condition: service_healthy
      redis:
        condition: service_healthy

  qdrant:
    image: qdrant/qdrant
    container_name: myproject-qdrant
    ports:
      - "6333:6333"
    volumes:
      - qdrant_data:/qdrant/storage
    healthcheck:
      test: ["CMD-SHELL", "bash -c 'echo > /dev/tcp/127.0.0.1/6333'"]
      interval: 10s
      timeout: 5s
      retries: 10

  redis:
    image: redis:7-alpine
    container_name: myproject-redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 10

volumes:
  qdrant_data:
  redis_data:
EOF

docker compose up --build
```

#### How It Works

Compose creates a private network automatically. `depends_on` with health conditions prevents the API from being launched before its dependencies are usable. Named volumes separate persistent service data from disposable containers.

#### Functional Test

```bash
docker compose ps
curl http://127.0.0.1:8000/api/v1/health
curl http://127.0.0.1:6333/collections
docker exec myproject-redis redis-cli ping
```

#### Expected Result

```text
API responds healthy
Qdrant returns a JSON response
Redis returns PONG
```

#### Project Structure Test

```bash
docker compose config
docker volume ls | grep -E 'qdrant|redis'
```

::: warning Common Failure to Understand
Inside a container, `localhost` means that same container. Using `localhost:6333` from the API would therefore fail to reach Qdrant.
:::

::: success Outcome
Your local machine now behaves much more like a deployed system: separate application, vector database, and cache services communicating over a service network.
:::

::: note Next
Step 21 will make startup and failure states observable instead of merely assuming all containers are ready.
:::

## Step 21: Validate Container Health

**Separate Liveness, Readiness, and Dependency Health**

::: info Goal
Make it obvious whether the application process is alive and whether it is actually ready to serve AI requests.
:::

#### Why We Are Building This

A process can be running while Qdrant is unreachable or configuration is invalid. Production systems need signals that distinguish 'the process exists' from 'the service can handle traffic.'

#### Build It the Right Way

Keep a lightweight liveness endpoint independent of external dependencies. Add a readiness endpoint that verifies required dependencies. Container orchestration can restart dead processes and avoid routing traffic to unready ones.

#### Files / Structure

```text
src/myproject/api/v1/
├── health.py
└── readiness.py
```

#### Implementation

```bash title="src/myproject/api/v1/readiness.py"
cat > src/myproject/api/v1/readiness.py <<'PY'
from fastapi import APIRouter, HTTPException

from myproject.vectorstore.qdrant import QdrantStore

router = APIRouter(tags=["health"])


@router.get("/ready")
async def ready():
    store = QdrantStore()

    try:
        await store.client.get_collections()
    except Exception as exc:
        raise HTTPException(
            status_code=503,
            detail="Vector store unavailable",
        ) from exc

    return {"status": "ready"}
PY
```

#### How It Works

`/health` answers whether the API process is alive. `/ready` answers whether required infrastructure is usable. Keep these meanings stable because deployment platforms will depend on them.

#### Functional Test

```bash
curl -i http://127.0.0.1:8000/api/v1/health
curl -i http://127.0.0.1:8000/api/v1/ready

docker compose stop qdrant
curl -i http://127.0.0.1:8000/api/v1/ready

docker compose start qdrant
```

#### Expected Result

```text
Healthy stack:
HTTP 200 from /health
HTTP 200 from /ready

Qdrant stopped:
HTTP 200 from /health
HTTP 503 from /ready
```

#### Project Structure Test

```bash
find src/myproject/api/v1 -maxdepth 1 -type f -print
docker compose ps
```

::: warning Common Failure to Understand
Do not make liveness depend on every downstream service. If Qdrant is temporarily unavailable, killing and restarting a healthy API process may make the incident worse.
:::

::: success Outcome
The application now exposes meaningful operational health signals instead of a single superficial status endpoint.
:::

::: note Next
Step 22 will use automated checks so broken code cannot progress simply because it builds.
:::

## Step 22: Build CI Pipeline

**Create an Automated Engineering Quality Gate for Every Change**

::: info Goal
Run formatting/linting, type checks, tests, and coverage automatically on every pull request and push.
:::

#### Why We Are Building This

Local checks are useful but optional. CI converts engineering expectations into an enforced, repeatable contract. A change that breaks imports, typing, tests, or coverage should be discovered before merge.

#### Build It the Right Way

CI should install dependencies from the lockfile, use a known Python version, run fast deterministic checks first, and fail early. Keep deployment out of CI; CI proves the candidate is acceptable, while CD distributes an accepted artifact.

#### Files / Structure

```text
.github/
└── workflows/
    └── ci.yml
```

#### Implementation

```bash title=".github/workflows/ci.yml"
mkdir -p .github/workflows

cat > .github/workflows/ci.yml <<'EOF'
name: CI

on:
  push:
  pull_request:

jobs:
  quality:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v6

      - name: Set up uv
        uses: astral-sh/setup-uv@v7

      - name: Install Python
        run: uv python install 3.12

      - name: Install dependencies
        run: uv sync --frozen

      - name: Lint
        run: uv run ruff check .

      - name: Type check
        run: uv run mypy src

      - name: Test with coverage
        env:
          APP_ENV: test
          APP_API_KEY: test-key
        run: >
          PYTHONPATH=src uv run pytest
          --cov=src/myproject
          --cov-report=term-missing
          --cov-fail-under=80
EOF
```

#### How It Works

`uv sync --frozen` ensures CI uses the committed dependency solution. Ruff catches style/code-quality problems, MyPy catches type inconsistencies, and pytest proves behavior. The coverage threshold prevents silent erosion of tested code.

#### Functional Test

```bash
uv run ruff check .
uv run mypy src
PYTHONPATH=src uv run pytest --cov=src/myproject --cov-report=term-missing
```

#### Expected Result

```text
All lint checks pass
MyPy reports success
Tests pass
Coverage remains at or above the configured threshold
```

#### Project Structure Test

```bash
find .github/workflows -maxdepth 1 -type f -print
```

::: warning Common Failure to Understand
Avoid relying on unpinned dependency resolution in CI. If CI installs a different dependency graph from development, failures become difficult to reproduce.
:::

::: success Outcome
The repository now has an automated engineering gate that gives every contributor the same definition of a technically acceptable change.
:::

::: note Next
Step 23 will publish the exact container artifact that passed the delivery workflow.
:::

## Step 23: Lightweight AWS Deployment

**Publish FastAPI and Connect It to a Frontend UI**

::: info Goal
Deploy the Dockerized FastAPI backend to AWS so a frontend can call it over HTTPS.
:::

#### Why

The first deployment goal is simple: make the backend publicly reachable without introducing Kubernetes or Terraform yet.

#### Flow

```text
Local FastAPI
↓
Docker Image
↓
Amazon ECR
↓
AWS App Runner
↓
Public HTTPS API
↓
Frontend / UI
```

### 23A — Push Image to Amazon ECR

```bash
aws ecr create-repository --repository-name myproject-api

aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com

docker tag myproject-api:local ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/myproject-api:latest

docker push ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/myproject-api:latest
```

::: success Outcome
The application image is stored in ECR and ready for deployment.
:::

### 23B — Deploy with AWS App Runner

Create an App Runner service from the ECR image and configure required environment variables and secrets.

```text
https://your-service.awsapprunner.com
```

Verify:

```bash
curl https://your-service.awsapprunner.com/api/v1/health
curl https://your-service.awsapprunner.com/api/v1/ready
```

### 23C — Configure CORS and Connect the UI

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-frontend-domain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

#### Final Outcome

```text
Frontend
↓ HTTPS
App Runner / FastAPI
↓
RAG Pipeline
↓
LLM + Qdrant + Redis
↓
Response to UI
```

## Step 27: Add Hybrid Retrieval

**Combine Semantic and Lexical Retrieval to Improve Recall**

::: info Goal
Retrieve relevant evidence using both dense semantic similarity and sparse lexical matching, then fuse the candidate lists.
:::

#### Why We Are Building This

Dense embeddings understand meaning but can miss exact identifiers, acronyms, error codes, product names, or rare tokens. Sparse retrieval is strong at exact term matching but weak at semantic equivalence. Hybrid retrieval covers both failure modes.

#### Build It the Right Way

Keep dense retrieval, sparse retrieval, and fusion as separate components. Retrieve more candidates than you finally need, fuse them with rank-based logic such as Reciprocal Rank Fusion, then pass the fused candidates to reranking.

#### Files / Structure

```text
src/myproject/retrieval/
├── dense.py
├── sparse.py
├── fusion.py
└── hybrid.py
```

#### Implementation

```bash title="src/myproject/retrieval/fusion.py"
cat > src/myproject/retrieval/fusion.py <<'PY'
from collections import defaultdict


def reciprocal_rank_fusion(
    ranked_lists: list[list[str]],
    k: int = 60,
) -> list[str]:
    scores: dict[str, float] = defaultdict(float)

    for ranked in ranked_lists:
        for rank, doc_id in enumerate(ranked, start=1):
            scores[doc_id] += 1 / (k + rank)

    return [
        doc_id
        for doc_id, _ in sorted(
            scores.items(),
            key=lambda item: item[1],
            reverse=True,
        )
    ]
PY
```

#### How It Works

RRF does not require dense and sparse scores to be numerically comparable. It uses rank positions instead. This makes it a practical first fusion strategy and keeps retrieval-provider-specific scoring details isolated.

#### Functional Test

```bash
python - <<'PY'
from myproject.retrieval.fusion import reciprocal_rank_fusion

dense = ["doc-a", "doc-b", "doc-c"]
sparse = ["doc-c", "doc-a", "doc-d"]

print(reciprocal_rank_fusion([dense, sparse]))
PY
```

#### Expected Result

```text
Expected top candidates include doc-a and doc-c because both retrievers support them.
```

#### Project Structure Test

```bash
find src/myproject/retrieval -maxdepth 1 -type f -print
```

::: warning Common Failure to Understand
Do not merge raw cosine scores and BM25-style scores by simple addition unless they have been normalized intentionally. Their score scales have different meanings.
:::

::: success Outcome
The retriever can now balance semantic meaning with exact lexical evidence instead of depending on one retrieval signal.
:::

::: note Next
Step 28 improves what we search for before the retrieval layer runs.
:::

## Step 28: Add Query Rewriting

**Improve Search Intent Before Retrieval**

::: info Goal
Transform unclear user questions into retrieval-friendly queries and optionally generate multiple complementary queries.
:::

#### Why We Are Building This

Users ask conversational questions, use pronouns, omit context, or combine several intents. The best text to send to a retriever is not always the exact text the user typed.

#### Build It the Right Way

Keep the original user question unchanged for the final answer. Create a separate retrieval-query stage. Limit the number of rewrites, require rewrites to preserve intent, and deduplicate them before retrieval.

#### Files / Structure

```text
src/myproject/retrieval/
├── query_rewriter.py
└── multi_query.py
```

#### Implementation

```bash title="src/myproject/retrieval/query_rewriter.py"
cat > src/myproject/retrieval/query_rewriter.py <<'PY'
from myproject.generation.llm import OpenAIProvider


class QueryRewriter:
    def __init__(self):
        self.llm = OpenAIProvider()

    async def rewrite(self, question: str) -> str:
        prompt = f"""
Rewrite the question for document retrieval.
Preserve the original intent.
Return only the rewritten query.

Question:
{question}
"""
        return (await self.llm.generate(prompt)).strip()
PY
```

#### How It Works

The rewrite is an internal search artifact, not the user's answer. Log both original and rewritten forms for debugging. For multi-query retrieval, generate a small bounded set such as three variants and fuse results.

#### Functional Test

```bash
# Unit-test the contract with a mocked LLM:
# - output is non-empty
# - intent terms are preserved
# - original question is still passed to final generation
```

#### Expected Result

```text
Original question remains unchanged.
One or more retrieval queries are produced.
Retrieval receives rewritten queries, not the final-answer prompt.
```

#### Project Structure Test

```bash
find src/myproject/retrieval -maxdepth 1 -type f -print
```

::: warning Common Failure to Understand
Do not let query rewriting invent facts. If the rewrite changes intent, retrieval quality can look good while answering the wrong question.
:::

::: success Outcome
The system now separates conversational input from search-optimized input.
:::

::: note Next
Step 29 will judge the retrieved candidates more precisely before they enter the LLM context.
:::

## Step 29: Add Reranking

**Use a Stronger Relevance Stage After Broad Retrieval**

::: info Goal
Retrieve a broad candidate set cheaply, then reorder those candidates with a stronger relevance model before context construction.
:::

#### Why We Are Building This

First-stage retrieval optimizes recall: find likely evidence quickly. The final context needs precision: the most relevant evidence should appear first. Reranking separates those objectives.

#### Build It the Right Way

Retrieve perhaps 20–50 candidates, rerank them, then keep a much smaller context set such as 5–10. Put reranking behind an interface so you can compare local, hosted, or LLM-based rerankers.

#### Files / Structure

```text
src/myproject/retrieval/
├── reranker.py
└── pipeline.py
```

#### Implementation

```bash title="src/myproject/retrieval/reranker.py"
cat > src/myproject/retrieval/reranker.py <<'PY'
from dataclasses import dataclass


@dataclass
class Candidate:
    text: str
    score: float
    metadata: dict


class Reranker:
    async def rerank(
        self,
        query: str,
        candidates: list[Candidate],
        top_k: int = 5,
    ) -> list[Candidate]:
        # Provider implementation belongs here.
        # Keep this interface stable.
        return sorted(
            candidates,
            key=lambda item: item.score,
            reverse=True,
        )[:top_k]
PY
```

#### How It Works

The placeholder preserves the architecture while allowing a real cross-encoder or provider to replace the implementation later. Measure reranking separately from retrieval so you can tell which stage improved quality.

#### Functional Test

```bash
# Given 20 retrieved candidates:
# assert reranker returns <= 5
# assert metadata survives reranking
# assert ordering is deterministic for mocked scores
```

#### Expected Result

```text
Broad candidate set → reranker → smaller ordered evidence set.
```

#### Project Structure Test

```bash
find src/myproject/retrieval -maxdepth 1 -type f -print
```

::: warning Common Failure to Understand
Do not discard document identifiers or metadata during reranking. Losing provenance here makes citations impossible later.
:::

::: success Outcome
The RAG pipeline now has separate recall and precision stages.
:::

::: note Next
Step 30 will make those selected evidence items visible to the user as citations.
:::

## Step 30: Add Citations

**Make Generated Answers Traceable to Retrieved Evidence**

::: info Goal
Return structured citations that identify which retrieved chunks support the generated answer.
:::

#### Why We Are Building This

A RAG answer without provenance is difficult to verify. Citations improve trust, debugging, evaluation, and auditability because users and engineers can inspect the evidence behind an answer.

#### Build It the Right Way

Store source metadata during ingestion, preserve it through retrieval/reranking, number sources when constructing context, and return citations as structured response data rather than embedding everything into one unstructured string.

#### Files / Structure

```text
src/myproject/schemas/
└── rag.py

src/myproject/generation/
└── context_builder.py
```

#### Implementation

```bash title="src/myproject/schemas/rag.py"
cat > src/myproject/schemas/rag.py <<'PY'
from pydantic import BaseModel


class Citation(BaseModel):
    source_id: str
    chunk_id: str
    title: str | None = None


class RAGResponse(BaseModel):
    answer: str
    citations: list[Citation]
PY
```

#### How It Works

The model may generate citation markers, but the application owns the authoritative source metadata. Keep source IDs, document IDs, chunk IDs, titles, and optional page/URL metadata in the retrieval objects.

#### Functional Test

```bash
# Integration expectations:
# response.answer is non-empty
# response.citations is a list
# every citation references a retrieved source
# unknown source IDs are rejected
```

#### Expected Result

```text
{
  "answer": "... [1] ...",
  "citations": [
    {
      "source_id": "document-42",
      "chunk_id": "chunk-7",
      "title": "Example Document"
    }
  ]
}
```

#### Project Structure Test

```bash
find src/myproject/schemas src/myproject/generation -maxdepth 2 -type f -print
```

::: warning Common Failure to Understand
Do not allow the model to invent source IDs. Validate every returned citation against the retrieved evidence set.
:::

::: success Outcome
Answers now carry machine-readable provenance instead of forcing the user to trust generated text blindly.
:::

::: note Next
Step 31 uses these retrieval and citation signals to evaluate whether the RAG system is actually improving.
:::

## Step 31: Add RAG Evaluation

**Measure Retrieval and Answer Quality with a Repeatable Dataset**

::: info Goal
Create an evaluation dataset and score retrieval quality and answer quality separately.
:::

#### Why We Are Building This

RAG changes are easy to judge subjectively and hard to compare from memory. Evaluation turns 'this seems better' into measurable engineering evidence and allows safe iteration.

#### Build It the Right Way

Evaluate at multiple layers. Retrieval metrics diagnose whether evidence was found. Generation metrics diagnose whether the answer used the evidence correctly. Keep a small curated golden dataset in version control and run larger experiments outside normal unit tests.

#### Files / Structure

```text
data/evaluation/
├── rag_eval.jsonl
└── README.md

src/myproject/evaluation/
├── retrieval_metrics.py
├── rag_metrics.py
└── runner.py
```

#### Implementation

```bash title="data/evaluation/rag_eval.jsonl"
cat > data/evaluation/rag_eval.jsonl <<'EOF'
{"id":"q1","question":"What is RAG?","expected_source_ids":["doc-rag-1"],"reference_answer":"RAG combines retrieval with generation."}
EOF
```

#### How It Works

| Layer | Useful measures | Question answered |
|---|---|---|
| Retrieval | Recall@k, Precision@k, MRR, NDCG | Did we find the right evidence? |
| Generation | Faithfulness, relevance, groundedness | Did the model use the evidence correctly? |
| End-to-end | Task correctness / reference comparison | Did the system solve the user's task? |

#### Functional Test

```bash
PYTHONPATH=src uv run python -m myproject.evaluation.runner data/evaluation/rag_eval.jsonl
```

#### Expected Result

```text
Example report:
retrieval_recall_at_5: 1.00
faithfulness: 0.92
answer_relevance: 0.89
```

#### Project Structure Test

```bash
find data/evaluation src/myproject/evaluation -maxdepth 2 -type f -print
```

::: warning Common Failure to Understand
A single aggregate score can hide the cause of failure. Keep retrieval and generation measurements separate so the team knows what to fix.
:::

::: success Outcome
The RAG pipeline now has a baseline that can be compared across retrieval, prompting, model, and chunking changes.
:::

::: note Next
Step 32 adds safety controls around the same pipeline.
:::

## Step 32: Add Guardrails

**Protect Input, Retrieval, Tool Use, and Generated Output**

::: info Goal
Add explicit controls for prompt injection, unauthorized document access, sensitive data, unsafe tool calls, and output validation.
:::

#### Why We Are Building This

AI systems process untrusted natural language and may connect to private data or tools. Traditional API validation is necessary but not sufficient; RAG and agents introduce new trust boundaries.

#### Build It the Right Way

Apply guardrails at boundaries, not as one final filter. Validate user input, authorize retrieval scope, treat retrieved text as untrusted data, restrict tools, and validate the generated result before returning it.

#### Files / Structure

```text
src/myproject/guardrails/
├── input.py
├── retrieval.py
├── output.py
└── policies.py
```

#### Implementation

```bash title="src/myproject/guardrails/retrieval.py"
cat > src/myproject/guardrails/retrieval.py <<'PY'
def filter_authorized_documents(
    documents: list[dict],
    allowed_tenant_id: str,
) -> list[dict]:
    return [
        doc
        for doc in documents
        if doc.get("tenant_id") == allowed_tenant_id
    ]
PY
```

#### How It Works

Authorization must be enforced by application code before evidence reaches the model. A prompt such as 'ignore previous instructions' cannot be allowed to expand the user's data permissions.

#### Functional Test

```bash
# Security tests:
# unauthorized tenant document is removed
# missing tenant metadata is rejected
# malicious retrieved text cannot invoke tools directly
# output schema validation still runs
```

#### Expected Result

```text
Only authorized evidence reaches context construction.
Invalid or policy-breaking output is blocked or safely handled.
```

#### Project Structure Test

```bash
find src/myproject/guardrails -maxdepth 1 -type f -print
```

::: warning Common Failure to Understand
Never use an LLM prompt as the sole authorization mechanism. Permissions must be enforced outside the model.
:::

::: success Outcome
The AI pipeline now has explicit trust boundaries around data and model behavior.
:::

::: note Next
Step 33 reduces repeated cost and latency while preserving these security boundaries.
:::

## Step 33: Add Caching

**Reduce Repeated Embedding, Retrieval, and Generation Work**

::: info Goal
Use Redis to cache safe, repeatable AI work and reduce latency and provider cost.
:::

#### Why We Are Building This

Embedding and LLM calls are expensive compared with local computation. Repeating identical work wastes time and money. Caching is valuable, but incorrect cache scope can leak private data or return stale answers.

#### Build It the Right Way

Start with deterministic caches such as embeddings. Add retrieval or semantic response caching only when keys include the relevant tenant, user permission scope, model/prompt version, and knowledge-base version.

#### Files / Structure

```text
src/myproject/cache/
├── redis.py
├── keys.py
└── embedding_cache.py
```

#### Implementation

```bash title="src/myproject/cache/keys.py"
cat > src/myproject/cache/keys.py <<'PY'
import hashlib


def embedding_key(
    model: str,
    text: str,
) -> str:
    digest = hashlib.sha256(text.encode()).hexdigest()
    return f"embedding:{model}:{digest}"
PY
```

#### How It Works

Versioned cache keys prevent a model or prompt change from silently reusing incompatible old results. Sensitive cache entries should have TTLs and access scope.

#### Functional Test

```bash
python - <<'PY'
from myproject.cache.keys import embedding_key

a = embedding_key("model-a", "hello")
b = embedding_key("model-a", "hello")
c = embedding_key("model-b", "hello")

assert a == b
assert a != c
print("cache key behavior OK")
PY
```

#### Expected Result

```text
cache key behavior OK
```

#### Project Structure Test

```bash
find src/myproject/cache -maxdepth 1 -type f -print
```

::: warning Common Failure to Understand
Do not use only the raw user question as a response-cache key in a multi-user system. Two users can ask the same question while having different document permissions.
:::

::: success Outcome
The system now has a controlled place to trade storage for lower AI latency and cost.
:::

::: note Next
Step 34 makes these savings—and every other RAG stage—observable.
:::

## Step 34: Add Observability

**Trace the AI Request Across Retrieval, Reranking, Cache, and LLM Calls**

::: info Goal
Measure where each request spends time, tokens, retries, and money and preserve enough context to debug failures.
:::

#### Why We Are Building This

Normal HTTP logs show that a request took two seconds, but not whether 1.8 seconds came from embedding, retrieval, reranking, or generation. AI systems need stage-level observability.

#### Build It the Right Way

Use request/trace IDs that flow through the entire pipeline. Record structured spans and metrics for each major stage. Log identifiers and measurements—not secrets or private document bodies.

#### Files / Structure

```text
src/myproject/observability/
├── tracing.py
├── metrics.py
└── ai_events.py
```

#### Implementation

```bash title="src/myproject/observability/ai_events.py"
cat > src/myproject/observability/ai_events.py <<'PY'
from dataclasses import dataclass


@dataclass
class AIEvent:
    trace_id: str
    stage: str
    latency_ms: float
    model: str | None = None
    tokens: int | None = None
    cache_hit: bool | None = None
PY
```

#### How It Works

Keep measurements structured so dashboards and alerts can aggregate them later. Useful dimensions include pipeline version, model, retriever version, tenant, status, and cache hit—but avoid high-cardinality or sensitive labels.

#### Functional Test

```bash
# For one request verify logs/spans contain:
# request_id / trace_id
# retrieval latency
# rerank latency
# LLM latency
# token counts when available
# cache hit/miss
# final status
```

#### Expected Result

```text
One trace explains the complete request path instead of producing unrelated log lines.
```

#### Project Structure Test

```bash
find src/myproject/observability -maxdepth 1 -type f -print
```

::: warning Common Failure to Understand
Do not log API keys, authorization headers, full private documents, or raw sensitive prompts merely for debugging convenience.
:::

::: success Outcome
The team can now identify where quality, latency, and cost problems actually originate.
:::

::: note Next
Step 35 introduces stateful workflow orchestration while preserving this visibility.
:::

## Step 35: Add LangGraph Workflows

**Introduce Explicit State and Branching for Multi-Step AI Workflows**

::: info Goal
Use LangGraph when the workflow needs state, branches, retries, checkpoints, or multiple AI/tool steps.
:::

#### Why We Are Building This

A simple RAG pipeline is naturally linear. As soon as the system needs decisions such as 'retrieve again?', 'call a tool?', or 'ask for clarification?', deeply nested service code becomes difficult to reason about. A graph makes transitions explicit.

#### Build It the Right Way

Do not move all business logic into graph nodes. Keep retrieval, generation, tools, and policies as reusable services. LangGraph should orchestrate them. Define a typed state and small nodes with one responsibility.

#### Files / Structure

```text
src/myproject/langgraph/
├── state.py
├── nodes.py
└── graph.py
```

#### Implementation

```bash
cat > src/myproject/langgraph/state.py <<'PY'
from typing import TypedDict


class RAGState(TypedDict, total=False):
    question: str
    rewritten_query: str
    documents: list[dict]
    answer: str
PY

cat > src/myproject/langgraph/graph.py <<'PY'
from langgraph.graph import END, START, StateGraph

from myproject.langgraph.state import RAGState


async def retrieve_node(state: RAGState):
    return {"documents": []}


async def answer_node(state: RAGState):
    return {"answer": "placeholder"}


builder = StateGraph(RAGState)
builder.add_node("retrieve", retrieve_node)
builder.add_node("answer", answer_node)
builder.add_edge(START, "retrieve")
builder.add_edge("retrieve", "answer")
builder.add_edge("answer", END)

rag_graph = builder.compile()
PY
```

#### How It Works

State is the contract shared across graph nodes. Each node reads only what it needs and returns state updates. Later you can add conditional edges without rewriting the services underneath.

#### Functional Test

```bash
python - <<'PY'
import asyncio
from myproject.langgraph.graph import rag_graph

print(asyncio.run(rag_graph.ainvoke({"question": "What is RAG?"})))
PY
```

#### Expected Result

```text
State flows through retrieve → answer → END and returns a final state dictionary.
```

#### Project Structure Test

```bash
find src/myproject/langgraph -maxdepth 1 -type f -print
```

::: warning Common Failure to Understand
Do not use LangGraph merely because the project contains AI. A simple deterministic pipeline should remain simple until branching/state requirements justify a graph.
:::

::: success Outcome
The project can now represent complex AI workflows explicitly rather than hiding orchestration inside large service methods.
:::

::: note Next
Step 36 gives those workflows controlled external capabilities through tools.
:::

## Step 36: Add Agents and Tools

**Expose Controlled Capabilities to the Model Through Typed Tools**

::: info Goal
Allow an AI agent to invoke approved application capabilities such as search, retrieval, calculation, or internal services.
:::

#### Why We Are Building This

An LLM only generates text until the application gives it tools. Tools turn model intent into actions, so tool design becomes a security and reliability boundary.

#### Build It the Right Way

Each tool should have a narrow purpose, typed inputs, validated outputs, explicit permissions, timeouts, and logging. The model chooses a tool, but application code decides whether that invocation is allowed.

#### Files / Structure

```text
src/myproject/agents/
├── agent.py
├── policies.py
└── tools/
    ├── __init__.py
    └── search_documents.py
```

#### Implementation

```bash title="src/myproject/agents/tools/search_documents.py"
cat > src/myproject/agents/tools/search_documents.py <<'PY'
from pydantic import BaseModel, Field


class SearchDocumentsInput(BaseModel):
    query: str = Field(min_length=1, max_length=500)
    top_k: int = Field(default=5, ge=1, le=20)


async def search_documents(
    data: SearchDocumentsInput,
) -> list[dict]:
    # Call the retrieval service here.
    return []
PY
```

#### How It Works

The schema is part of the tool contract. Restricting `top_k` is not cosmetic: it bounds cost and prevents the agent from requesting arbitrary amounts of data.

#### Functional Test

```bash
python - <<'PY'
from pydantic import ValidationError
from myproject.agents.tools.search_documents import SearchDocumentsInput

print(SearchDocumentsInput(query="RAG", top_k=5))

try:
    SearchDocumentsInput(query="RAG", top_k=1000)
except ValidationError:
    print("invalid tool request blocked")
PY
```

#### Expected Result

```text
Valid request accepted.
Out-of-range tool request blocked before execution.
```

#### Project Structure Test

```bash
find src/myproject/agents -maxdepth 3 -type f -print
```

::: warning Common Failure to Understand
Never expose a generic shell, SQL executor, filesystem write, or unrestricted HTTP client as a tool without a strong security design.
:::

::: success Outcome
The model can now gain capabilities through explicit, validated application interfaces rather than arbitrary code execution.
:::

::: note Next
Step 37 combines tool use, retrieval, and graph state into agentic RAG.
:::

## Step 37: Build Agentic RAG

**Let the Workflow Decide When Retrieval or Tools Are Needed**

::: info Goal
Extend deterministic RAG so the workflow can choose among retrieval, query refinement, approved tools, and direct answering.
:::

#### Why We Are Building This

Basic RAG retrieves on every question. Some questions need no retrieval; others need multiple searches or a specialized tool. Agentic RAG adds controlled decision-making—but also increases latency, cost, and failure modes.

#### Build It the Right Way

Use bounded loops and explicit decision nodes. Keep tool permissions outside the model. Record every transition. Define termination conditions so the graph cannot loop indefinitely.

#### Files / Structure

```text
src/myproject/langgraph/
├── agentic_state.py
├── agentic_nodes.py
└── agentic_graph.py
```

#### Implementation

```text
Agentic RAG Decision Flow

START
  ↓
Classify Need
  ├── no retrieval ──────────────┐
  ├── retrieve → evaluate ───────┤
  │                └─ rewrite ───┤
  └── tool call → observe ───────┤
                                 ↓
                              Answer
                                 ↓
                                END
```

#### How It Works

This architecture separates reasoning about the next action from the services that perform actions. The graph can later add human approval for risky tools without changing retrieval or generation implementations.

#### Functional Test

```bash
# Integration-test at least these paths:
# 1. direct answer path
# 2. retrieval path
# 3. rewrite + second retrieval path
# 4. tool path
# 5. maximum-step termination path
```

#### Expected Result

```text
Every test case reaches END within the configured step limit and records which path was taken.
```

#### Project Structure Test

```bash
find src/myproject/langgraph src/myproject/agents -maxdepth 2 -type f -print
```

::: warning Common Failure to Understand
Do not treat 'agentic' as automatically better. Use it only where adaptive decision-making produces measurable benefit over a deterministic pipeline.
:::

::: success Outcome
The system now supports bounded agentic behavior while retaining explicit control over data access and tools.
:::

::: note Next
Step 38 prevents future changes from silently making these more complex workflows worse.
:::

## Step 38: Add Quality Gates

**Turn AI Evaluation Results into Release Criteria**

::: info Goal
Prevent a model, prompt, retriever, chunking, or agent change from being released when it meaningfully degrades quality.
:::

#### Why We Are Building This

Traditional tests catch deterministic code regressions. AI behavior can degrade while every unit test still passes. Quality gates connect the evaluation dataset from Step 31 to engineering release decisions.

#### Build It the Right Way

Store a baseline, evaluate the candidate pipeline on the same dataset, compare important metrics, and fail the gate only on meaningful thresholds. Use multiple metrics so one improvement cannot hide a critical regression elsewhere.

#### Files / Structure

```text
data/evaluation/
├── rag_eval.jsonl
└── baseline.json

src/myproject/evaluation/
└── quality_gate.py
```

#### Implementation

```bash title="src/myproject/evaluation/quality_gate.py"
cat > src/myproject/evaluation/quality_gate.py <<'PY'
def passes_gate(
    baseline: dict[str, float],
    candidate: dict[str, float],
) -> bool:
    return (
        candidate["retrieval_recall_at_5"]
        >= baseline["retrieval_recall_at_5"] - 0.02
        and candidate["faithfulness"]
        >= baseline["faithfulness"] - 0.02
    )
PY
```

#### How It Works

Thresholds should reflect product risk and normal metric variance. A two-point allowance is only an example; your real threshold comes from repeated evaluation runs and business tolerance.

#### Functional Test

```bash
python - <<'PY'
from myproject.evaluation.quality_gate import passes_gate

baseline = {
    "retrieval_recall_at_5": 0.90,
    "faithfulness": 0.92,
}
candidate = {
    "retrieval_recall_at_5": 0.91,
    "faithfulness": 0.91,
}

assert passes_gate(baseline, candidate)
print("quality gate passed")
PY
```

#### Expected Result

```text
quality gate passed
```

#### Project Structure Test

```bash
find data/evaluation src/myproject/evaluation -maxdepth 2 -type f -print
```

::: warning Common Failure to Understand
Do not optimize only for one average score. A release may improve answer relevance while causing retrieval recall or safety to collapse.
:::

::: success Outcome
AI quality can now participate in CI/CD decisions instead of being checked manually after release.
:::

::: note Next
Step 39 verifies that the quality-preserving pipeline can also survive realistic concurrency.
:::

## Step 39: Add Load Testing

**Measure Capacity, Latency, Cost, and Failure Behavior Under Concurrency**

::: info Goal
Measure how the API behaves when many users trigger retrieval and model calls at the same time.
:::

#### Why We Are Building This

AI systems often fail differently under load: provider rate limits appear, connection pools saturate, queues grow, vector searches slow down, and token cost spikes. A single-user functional test cannot reveal these behaviors.

#### Build It the Right Way

Test realistic user journeys, not only `/health`. Measure p50/p95/p99 latency, throughput, error rate, rate-limit responses, cache hit rate, and downstream saturation. Use non-production test credentials and controlled datasets.

#### Files / Structure

```text
tests/
└── load/
    └── locustfile.py
```

#### Implementation

```bash title="tests/load/locustfile.py"
uv add --dev locust

mkdir -p tests/load

cat > tests/load/locustfile.py <<'PY'
from locust import HttpUser, between, task


class AIUser(HttpUser):
    wait_time = between(1, 3)

    @task
    def ask(self):
        self.client.post(
            "/api/v1/ai/ask",
            json={"question": "What is RAG?"},
        )
PY

uv run locust   -f tests/load/locustfile.py   --host http://127.0.0.1:8000
```

#### How It Works

Start with a small concurrency level. Observe your own API, Qdrant, Redis, and provider limits while increasing load. A load test that blindly overwhelms a paid LLM API can create unnecessary cost.

#### Functional Test

```bash
# Record after each run:
# requests/sec
# p50 latency
# p95 latency
# p99 latency
# failure rate
# provider 429 rate
# token/cost estimate
# cache hit ratio
```

#### Expected Result

```text
A useful result identifies the first bottleneck and the concurrency level where service objectives stop being met.
```

#### Project Structure Test

```bash
find tests/load -maxdepth 1 -type f -print
```

::: warning Common Failure to Understand
Do not run uncontrolled load tests against shared production systems or third-party AI providers without explicit limits and authorization.
:::

::: success Outcome
You now know not only that the system works, but approximately how much concurrent work it can handle and where it fails first.
:::

::: note Next
Step 40 turns all previous work into one final production-readiness decision.
:::

## Step 40: Run Production Readiness Review

**Verify the Complete Application Before Calling It Production Ready**

::: info Goal
Perform one final cross-functional review covering software engineering, security, RAG quality, agents, reliability, cost, and operations.
:::

#### Why We Are Building This

A system can pass tests and still be operationally unsafe. Production readiness is not one technology; it is evidence that the whole system has understood failure modes, measurable quality, secure boundaries, and a release/rollback path.

#### Build It the Right Way

Review evidence, not intentions. Each item should point to a test, metric, workflow, configuration, or documented decision. Mark unresolved items explicitly instead of assuming they are covered.

#### Files / Structure

```text
docs/
└── production-readiness.md
```

#### Implementation

| Area | Evidence to Require |
|---|---|
| Application | API tests, typed config, global error handling, structured logs |
| Security | Authentication, authorization, secret handling, tenant/document isolation |
| RAG | Ingestion traceability, hybrid retrieval, reranking, citations |
| Evaluation | Golden dataset, baseline metrics, regression thresholds |
| Safety | Prompt-injection controls, PII policy, tool permissions |
| Reliability | Timeouts, retries, health/readiness, bounded agent loops |
| Performance | Load-test report, latency targets, rate-limit behavior |
| Cost | Token/model usage visibility, caching strategy, budget awareness |
| Delivery | Docker image, CI gate, immutable image tag, rollback method |
| Operations | Trace IDs, alerts/runbook plan, incident ownership |

```bash title="docs/production-readiness.md"
mkdir -p docs

cat > docs/production-readiness.md <<'EOF'
# Production Readiness

## Application
- [ ] CI passing
- [ ] API integration tests passing
- [ ] Typed configuration validated

## Security
- [ ] Secrets externalized
- [ ] Authorization tested
- [ ] Retrieval access scoped

## RAG Quality
- [ ] Evaluation baseline recorded
- [ ] Quality gate passing
- [ ] Citations validated

## Reliability
- [ ] Health and readiness tested
- [ ] Timeouts/retries defined
- [ ] Agent loops bounded

## Performance
- [ ] Load test completed
- [ ] p95 target documented

## Delivery
- [ ] Image published by SHA
- [ ] Rollback procedure documented
EOF
```

#### How It Works

The checklist is evidence-driven. For example, 'authorization exists' is weaker than 'an integration test proves tenant A cannot retrieve tenant B documents.'

#### Functional Test

```bash
grep -R "\[ \]" docs/production-readiness.md || true
PYTHONPATH=src uv run pytest
docker compose config
docker compose ps
```

#### Expected Result

```text
The project is ready only when unresolved checklist items are understood, explicitly accepted, or closed with evidence.
```

#### Project Structure Test

```bash
find docs .github tests src/myproject -maxdepth 2 -type f -print | sort
```

::: warning Common Failure to Understand
Production readiness is not permanent. Re-run the review whenever deployment architecture, data sensitivity, model behavior, or agent capabilities materially change.
:::

::: success Outcome
The project now has a complete learning and engineering path: environment → API → AI → RAG → containers → CI/CD → advanced retrieval → safety → evaluation → agents → performance → production-readiness review.
:::

::: note Next
Deferred infrastructure work such as Kubernetes, Terraform, and platform-level monitoring can be added later without changing the application boundaries built here.
:::
