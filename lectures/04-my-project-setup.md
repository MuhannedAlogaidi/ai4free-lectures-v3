Production RAG pipeline setup for **my-project**: Python 3.12, uv-managed, `src` layout. Work through the 18 steps in order, phase by phase.

| Phase | Steps |
|---|---|
| Phase 1 — Environment | 1, 2, 3 |
| Phase 2 — Folders | 4, 5, 6, 7 |
| Phase 3 — Config | 8, 9, 10 |
| Phase 4 — Dependencies | 11, 12, 13 |
| Phase 5 — Run | 14, 15, 16, 17, 18 |

## Step 1: Install uv

`Phase 1 — Environment`

uv is the package and project manager we use instead of pip + venv + poetry. It is significantly faster, handles Python version management, and generates a lockfile automatically. Install it once on your machine — it manages everything else.

::: info What you will do
Install uv globally on your machine using the official installer script.
:::

::: note Why
uv replaces pip, venv, and pyenv in one tool. It resolves and installs deps in seconds, pins exact versions in uv.lock, and guarantees every collaborator gets the identical environment.
:::

```bash title="macOS / Linux"
curl -LsSf https://astral.sh/uv/install.sh | sh
```

→ Downloads and runs the uv installer

```powershell title="Windows (PowerShell)"
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

→ Windows installer via PowerShell

```bash title="Verify installation"
uv --version
```

→ Should print: uv 0.x.x

::: info Restart your terminal
After installing uv, close and reopen your terminal so the PATH is updated and the uv command is found.
:::

::: success Already have uv?
Run uv self update to get the latest version, then continue.
:::

#### Details

| Item | Value |
|---|---|
| Installed to | ~/.cargo/bin/uv (macOS/Linux) or %USERPROFILE%\.cargo\bin\uv (Windows) |
| Python management | uv can also install and pin Python versions — no need for pyenv |
| Lockfile | Every uv project gets a uv.lock — exact pinned versions for reproducible installs |

## Step 2: Create GitHub repo + clone + uv init

`Phase 1 — Environment`

Before writing a single line of code, create the GitHub repository first. Then clone it locally and run uv init inside it. This order ensures your project is on GitHub from day one — not an afterthought.

::: info What you will do
Create a GitHub repo with the right settings, clone it locally, run uv init inside the cloned folder, then make your first commit and push.
:::

::: note Why
Starting from GitHub means every change is tracked from the very first file. Cloning first and running uv init inside gives you the correct remote origin automatically — no need to set it up manually later.
:::

```bash title="Step A — Create repo on GitHub"
# Go to github.com → click "New repository"
#
# Naming conventions (important):
#   my-project            ← kebab-case, all lowercase
#   rag-learning-env      ← descriptive, short
#   NOT: MyProject  my_project  RAGProject
#
# Settings to fill in:
#   Repository name → your-repo-name
#   Description     → Production RAG learning environment
#   Visibility      → Public or Private
#   ✓ Add a README file
#   ✓ .gitignore template → Python
#   ✓ License → MIT
#
# Click "Create repository"
```
→ Or create a new repository on the command line
```bash title="Step A — Create repo on CLI"
echo "# RAG-PRODUCTION-CICD" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/TheUniverseOfAI/RAG-PRODUCTION-CICD.git
git push -u origin main
```
→ Or push an existing repository from the command line
```bash title="Step A — Create repo on CLI"
git remote add origin https://github.com/TheUniverseOfAI/RAG-PRODUCTION-CICD.git
git branch -M main
git push -u origin main
```
→ Do this on github.com before touching your terminal

```bash title="Step B — Clone the repo locally"
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

→ Replace with your actual GitHub username and repo name

```bash title="Step C — Run uv init inside the cloned folder"
uv init . --python 3.12
```

→ The dot means init here — not uv init my-project which creates a nested subfolder

```bash title="Step D — Delete the stub file"
rm hello.py
```

→ uv creates hello.py as a placeholder — we do not need it

```bash title="Step E — First commit and push"
git add .
git commit -m "chore: init project with uv"
git push origin main
```

→ Your project is now live on GitHub from step one

```bash title="Verify everything is connected"
git remote -v
git log --oneline
```

→ remote -v shows your GitHub URL · log shows your first commit

```text title="Result — cloned repo with uv scaffold inside"
YOUR_REPO_NAME/
├── .git/              ← from GitHub clone
├── .gitignore         ← from GitHub (Python template)
├── README.md          ← from GitHub
├── .python-version    ← from uv init  ✓
├── pyproject.toml     ← from uv init  ✓
└── hello.py           ← delete this
```

::: info Repo naming best practices
Use kebab-case — all lowercase, words separated by hyphens. Examples: my-project, rag-learning-env, llm-notebook-hub. No underscores, no spaces, no capitals. Think about how it looks in a URL: github.com/you/my-project.
:::

::: success Why clone first, not push later?
If you run uv init my-project first then try to connect GitHub later, you have to manually set the remote origin and reconcile the README GitHub created. Clone first — uv init inside — and everything is wired automatically.
:::

::: warning GitHub .gitignore vs our RAG rules
GitHub gives you a basic Python .gitignore when you create the repo. We extend it with RAG-specific rules in Step 10 — FAISS indexes, ChromaDB SQLite, .env, and all parser outputs.
:::

::: info Commit message convention
Use conventional commits throughout the project. chore: for setup tasks, feat: for new features, fix: for bug fixes, docs: for documentation updates. Example: git commit -m "feat: add data folder structure"
:::

#### Details

| Item | Value |
|---|---|
| git clone | Downloads the repo and sets the remote origin automatically — no manual git remote add needed |
| uv init . | The dot is critical — init in the current cloned folder, not a new nested subfolder |
| pyproject.toml | Single source of truth for deps, Python version, and tool config |
| First push | "chore: init project with uv" — baseline commit. Every phase ends with a commit and push. |

## Step 3: Understand the target structure

`Phase 1 — Environment`

Before creating any folders, understand what we are building and why every folder exists. This is the complete target layout. Every folder has a single responsibility.

::: info What you will do
Review the complete project structure so every subsequent step makes sense.
:::

::: note Why
Understanding the structure before building it means you make deliberate decisions instead of guessing. Each folder exists for one reason — knowing that reason prevents misuse.
:::

```text title="Complete target structure"
my-project/
├── .env.example          ← API keys template
├── .gitignore            ← never commit artifacts
├── .python-version       ← pins Python 3.12
├── pyproject.toml        ← single dep source
├── uv.lock               ← exact pinned versions
├── README.md             ← project docs
├── requirements_sunnay.txt
├── requirements_vectordb.txt
├── data/
│   ├── raw/              ← source files (git tracked)
│   ├── processed/        ← parser output (gitignored)
│   └── indexes/          ← vector indexes (gitignored)
├── notebooks/
│   ├── sunnay-rag-complete/
│   ├── langchain-tutorial/
│   ├── paul-rag-*/
│   └── python-*/
├── src/my_project/
│   ├── config.py
│   ├── main.py
│   ├── api/
│   ├── models/
│   ├── rag/
│   ├── llm/
│   ├── services/
│   └── utils/
├── tests/
├── scripts/
└── docs/
```

::: success The core rule
Notebooks import from src/my_project/ — never the reverse. This keeps production code clean and testable.
:::

::: info Data rule
Every source file lives in data/raw/ exactly once. All notebooks reference it as ../../data/raw/filename. No duplicates.
:::

## Step 4: Create data folders

`Phase 2 — Folders`

The data/ folder has three sub-folders with distinct responsibilities. raw/ is tracked by git. processed/ and indexes/ are gitignored because they are always regenerable — running a notebook recreates them.

::: info What you will do
Create data/raw/, data/processed/, and data/indexes/ and add a README.md explaining the layout.
:::

::: note Why
Centralising data prevents the most common mistake in notebook projects — duplicate source files in every class folder. One PDF in data/raw/, referenced by all notebooks.
:::

```bash title="Create folders"
mkdir -p data/{raw,processed,indexes}
```

→ Creates all three in one command

```bash title="Add a README"
cat > data/README.md << 'EOF'
# Data
raw/       ← source files, tracked by git
processed/ ← parser outputs, gitignored
indexes/   ← vector indexes, gitignored

Notebooks reference files as: ../../data/raw/filename
EOF
```

→ Documents the layout for the team

```text title="Result"
data/
├── README.md
├── raw/       ← put your PDFs here
├── processed/ ← gitignored
└── indexes/   ← gitignored
```

::: warning Git does not track empty folders
Add a .gitkeep file inside processed/ and indexes/ if you want git to track the empty folders: touch data/processed/.gitkeep data/indexes/.gitkeep
:::

::: success Notebook path convention
Always use: file_path = "../../data/raw/llama2.pdf" — this works from any class folder depth.
:::

#### Details

| Item | Value |
|---|---|
| data/raw/ | Tracked by git. Source PDFs, DOCX, CSV, XLSX. One copy of each file shared by every notebook. |
| data/processed/ | Gitignored. Docling JSON, extracted tables, page images, LlamaParser outputs. Rebuild by running parsing notebooks. |
| data/indexes/ | Gitignored. FAISS indexes, ChromaDB stores, Qdrant storage. Rebuild by running vector store notebooks. |

## Step 5: Create notebook folders

`Phase 2 — Folders`

All Jupyter notebooks live under notebooks/. Each resource or course gets its own sub-folder. Notebooks are for exploration only — they import from src/ and never contain production logic.

::: info What you will do
Create the full notebooks/ directory tree with all sub-folders for current and upcoming resources.
:::

::: note Why
Creating the folder structure upfront means adding a new course later is just adding notebooks — the skeleton never changes. Empty placeholder folders are perfectly fine in a new project.
:::

```bash title="sunnay RAG complete (Class-29 → 36)"
mkdir -p notebooks/sunnay-rag/01_RAG_Introduction.ipynb
mkdir -p notebooks/sunnay-rag-complete/Class-33-19-July-FAISS/FAISS
mkdir -p notebooks/sunnay-rag-complete/Class-34-25-July-2026-Chromadb-Pinecone-Qdrant/{Chroma-DB,Pinecone,Qdrant}
mkdir -p notebooks/sunnay-rag-complete/{Class-35-26-July-2026-Chuking-Retriever,Class-36-29-July-2026-Retriever}
```

→ Full sunnay course structure

```bash title="LangChain tutorial"
mkdir -p notebooks/langchain-tutorial/{CH-1,CH-2,CH-3/SalesDB}
```

→ 3 chapters + SalesDB for CH-3 agents

```bash title="Paul RAG (incoming)"
mkdir -p notebooks/{paul-rag-basic,paul-rag-advanced,paul-rag-chunking-chonkie,paul-rag-llamaIndex,paul-rag-parser,paul-rag-text2sql}
```

→ Placeholder folders — content incoming

```bash title="Python learning"
mkdir -p notebooks/{python-basics,python-oop,python-advanced,project-exploration}
```

→ Python fundamentals + project exploration

```bash title="Add notebooks README"
cat > notebooks/README.md << 'EOF'
# Notebooks
Import from src/ only. Data always in data/raw/.
Kernel: Python (my-project)
EOF
```

```text title="notebooks/ structure"
notebooks/
├── README.md
├── sunnay-rag-complete/
│   ├── Class-29 through Class-36
├── langchain-tutorial/
│   ├── CH-1/
│   ├── CH-2/
│   └── CH-3/SalesDB/
├── paul-rag-*/ (6 dirs)
├── python-basics/
├── python-oop/
├── python-advanced/
└── project-exploration/
```

::: info Adding future resources
When a new book or course arrives: mkdir -p notebooks/new-resource-name. Nothing else needs to change.
:::

::: success Naming convention
Use kebab-case for folder names. Date-prefix class folders (e.g. Class-33-19-July-FAISS) for clear ordering.
:::

## Step 6: Create the src/ package

`Phase 2 — Folders`

The src/ layout is the production Python package. Using src/ instead of putting my_project/ at the root prevents accidental imports of the uninstalled package and is the modern Python standard for installable packages.

::: info What you will do
Create src/my_project/ with all sub-packages and `__init__.py` files.
:::

::: note Why
The src/ layout forces the package to be installed (via uv sync) before notebooks can import it. This ensures notebooks always use the installed version — the same one that gets tested and shipped.
:::

```bash title="Create all directories"
mkdir -p src/my_project/api/{routes,middleware}
mkdir -p src/my_project/{models,llm,services,utils}
mkdir -p src/my_project/rag/{parser,chunker,embedder,vectorstore,retriever}
```

→ Full src/my_project/ structure in 3 commands

```python title="Create all __init__.py files"
touch src/my_project/__init__.py
touch src/my_project/api/__init__.py
touch src/my_project/api/routes/__init__.py
touch src/my_project/api/middleware/__init__.py
touch src/my_project/models/__init__.py
touch src/my_project/rag/__init__.py
touch src/my_project/rag/{parser,chunker,embedder,vectorstore,retriever}/__init__.py
touch src/my_project/{llm,services,utils}/__init__.py
```

→ Makes every directory a Python package

```python title="Add package version to __init__.py"
echo '__version__ = "0.1.0"' > src/my_project/__init__.py
```

```text title="src/ structure"
src/my_project/
├── __init__.py          ← version
├── config.py            ← (write next)
├── main.py              ← (write next)
├── api/routes/
├── api/middleware/
├── models/
├── rag/parser/
├── rag/chunker/
├── rag/embedder/
├── rag/vectorstore/
├── rag/retriever/
├── llm/
├── services/
└── utils/
```

::: info Why src/ layout?
Without src/, Python can import my_project directly from the project root without installing it. This hides import errors that only appear in production. The src/ layout forces proper installation.
:::

::: success `__init__.py` files
Every directory needs an empty `__init__.py` to be a Python package. Without it, imports like "from my_project.rag.parser.docling_parser import DoclingParser" will fail.
:::

## Step 7: Create tests, scripts, and docs

`Phase 2 — Folders`

Complete the folder structure with tests/, scripts/, and docs/. Tests prove the src/ code works. Scripts holds one-off utilities. Docs holds the HTML documentation.

::: info What you will do
Create tests/, scripts/, and docs/ with their sub-folders and initial files.
:::

::: note Why
Creating these now establishes the habit — tests live next to the code they test, and every utility script has a home instead of cluttering the root.
:::

```bash title="Create tests"
mkdir -p tests/{unit,integration}
touch tests/__init__.py
touch tests/unit/__init__.py
touch tests/integration/__init__.py
touch tests/conftest.py
```

→ conftest.py holds shared pytest fixtures

```bash title="Create scripts and docs"
mkdir -p scripts
mkdir -p docs
```

→ Empty placeholders — add content as needed

```text title="Result"
tests/
├── __init__.py
├── conftest.py
├── unit/__init__.py
└── integration/__init__.py
scripts/
docs/
```

::: success conftest.py
Add shared fixtures here — settings, sample documents, mock pipeline. pytest loads this file automatically before any test.
:::

::: info scripts/
Use for one-off tasks: bulk ingestion, index rebuilding, data migration. Never import from scripts/ in src/ or notebooks/.
:::

## Step 8: Configure pyproject.toml

`Phase 3 — Config`

pyproject.toml is the single source of truth for the project. It defines the package name, Python version, all dependencies, tool configurations (ruff, mypy, pytest), and dependency groups. We add dependencies using uv add — never edit the file manually for deps.

::: info What you will do
Add production dependencies, dependency groups, and tool configurations to pyproject.toml.
:::

::: note Why
A well-structured pyproject.toml means one command installs exactly what is needed for any context — dev, notebooks, or a specific tutorial. It also configures ruff, mypy, and pytest so they all share one config file.
:::

```bash title="Add production dependencies"
uv add fastapi pydantic pydantic-settings "pydantic[email]" "uvicorn[standard]" python-multipart
```

→ Core FastAPI stack — goes into [project].dependencies. python-multipart is required just to import the app: the documents route uses UploadFile/File(...), and without it FastAPI raises RuntimeError at import time, not just a warning.

```bash title="Add dev dependencies"
uv add --group dev pytest ruff mypy httpx2
```

→ Testing and code quality tools. httpx2 — not httpx — is what starlette.testclient now expects; using plain httpx raises a deprecation warning on every test run.

```bash title="Add notebook dependencies"
uv add --group notebooks jupyter ipykernel pandas matplotlib nbstripout
```

→ Jupyter and data science basics

```bash title="Add LangChain tutorial deps"
uv add --group langchain-tutorial langchain langchain-community langchain-core langchain-openai python-dotenv openai wikipedia
```

→ CH-1 through CH-3 notebook deps

```toml title="Verify pyproject.toml"
cat pyproject.toml
```

→ Should show all groups and tool configs

```text title="pyproject.toml structure"
[project]
name = "my-project"
version = "0.1.0"
requires-python = ">=3.12"
dependencies = [fastapi, pydantic, uvicorn...]

[dependency-groups]
dev = [pytest, ruff, mypy]
notebooks = [jupyter, ipykernel...]
langchain-tutorial = [langchain...]

[tool.ruff]
[tool.mypy]
[tool.pytest.ini_options]
```

::: success uv add vs manual edit
Always use uv add to add dependencies. It updates pyproject.toml AND uv.lock atomically. Manual edits to pyproject.toml require running uv sync to update the lockfile.
:::

::: info External course deps
requirements_sunnay.txt and requirements_vectordb.txt are kept separate because they come from external resources we do not control. They do not go into pyproject.toml.
:::

#### Details

| Item | Value |
|---|---|
| uv sync | Installs [project].dependencies only |
| uv sync --group dev | Also installs ruff, mypy, pytest |
| uv sync --group notebooks | Also installs jupyter, ipykernel, pandas |
| uv sync --group langchain-tutorial | Also installs langchain, openai, wikipedia |

## Step 9: Create .env.example

`Phase 3 — Config`

.env.example is the template for environment variables. It documents every API key and setting the project needs, with placeholder values. It is committed to git. The real .env file (with actual keys) is gitignored.

::: info What you will do
Create .env.example with all required API keys and settings documented.
:::

::: note Why
Without .env.example, a new contributor has no way of knowing which API keys are needed. With it, setup is: cp .env.example .env — then fill in the values.
:::

```text title="Create .env.example"
cat > .env.example << 'EOF'
# ── LLM Providers ──────────────────────────────
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_API_KEY=...
GROQ_API_KEY=...
OPENROUTER_API_KEY=...

# ── Vector Stores ───────────────────────────────
PINECONE_API_KEY=...
PINECONE_ENV=us-east-1
PINECONE_INDEX_NAME=rag-index

# ── Embeddings ──────────────────────────────────
HUGGINGFACEHUB_API_TOKEN=hf_...
EMBEDDING_MODEL=sentence-transformers/all-MiniLM-L6-v2

# ── Data Paths ──────────────────────────────────
DATA_RAW_PATH=data/raw
DATA_PROCESSED_PATH=data/processed
DATA_INDEXES_PATH=data/indexes

# ── RAG Settings ────────────────────────────────
CHUNK_SIZE=512
CHUNK_OVERLAP=50
RETRIEVER_TOP_K=5

# ── App ─────────────────────────────────────────
APP_NAME=RAG Project
DEBUG=false
EOF
```

→ All keys documented with placeholder values

::: danger Never put real keys in .env.example
.env.example is committed to git and visible to everyone. Always use placeholder values like sk-... or hf_...
:::

::: success Rule of thumb
Every time you add a new integration that needs an API key, add the key name to .env.example first — before writing any code.
:::

#### Details

| Item | Value |
|---|---|
| .env.example | Committed to git. Contains placeholder values. Template for teammates. |
| .env | NOT committed. Contains real API keys. Created by: cp .env.example .env |

## Step 10: Update .gitignore

`Phase 3 — Config`

uv init creates a basic .gitignore. We need to extend it with RAG-specific rules — vector indexes, parser outputs, and environment files. This must be done BEFORE running any notebooks to prevent accidentally committing binary artifacts.

::: info What you will do
Add RAG-specific ignore rules to the existing .gitignore.
:::

::: note Why
One git add . after running any RAG notebook without proper gitignore rules would commit 200MB+ of binary files permanently. Git history is very hard to clean after the fact.
:::

```text title="Append RAG rules to .gitignore"
cat >> .gitignore << 'EOF'

# ── RAG artifacts ───────────────────────────────
*.faiss
*.pkl
*.sqlite3
data/processed/
data/indexes/
qdrant_storage/
**/docling_parsed_output/
**/llamaparse_output/
**/parsed_complex_pdf_output/
**/page_images/
**/extracted_images/

# ── Env & secrets ───────────────────────────────
.env
.envrc
*.pem

# ── Jupyter ─────────────────────────────────────
.ipynb_checkpoints/
*.ipynb_checkpoints
EOF
```

→ Appends to the existing uv-generated .gitignore

```bash title="Verify a rule works"
echo "test" > data/processed/test.txt
git check-ignore -v data/processed/test.txt
rm data/processed/test.txt
```

→ Should print: .gitignore:N:data/processed/  data/processed/test.txt

::: danger Do this before running any notebook
If you run a notebook before updating .gitignore, generated files will be untracked (not ignored). Add them to .gitignore then run git rm --cached <file> to untrack them.
:::

::: info git check-ignore
Use git check-ignore -v <file> to test any rule. It shows exactly which line in .gitignore is responsible for ignoring a file.
:::

#### Details

| Item | Value |
|---|---|
| `*.faiss` / `*.pkl` | FAISS binary index + metadata files — rebuilt in seconds |
| `*.sqlite3` | ChromaDB database — rebuilt by running the notebook |
| data/processed/ | All parser outputs — docling, llamaparse, pymupdf |
| data/indexes/ | All vector indexes — faiss, chroma, qdrant |
| .env | Real API keys — never commit |

## Step 11: Install scaffold dependencies

`Phase 4 — Dependencies`

uv sync reads pyproject.toml and installs everything in [project].dependencies into a .venv/ virtual environment. It also generates uv.lock with exact pinned versions. This is the reproducible install.

::: info What you will do
Run uv sync to create the virtual environment and install the FastAPI scaffold.
:::

::: note Why
uv sync is idempotent — run it as many times as you want, the result is always the same. It uses uv.lock to pin exact versions so your environment matches every collaborator's exactly.
:::

```bash title="Install scaffold"
uv sync
```

→ Creates .venv/ and installs fastapi, pydantic, uvicorn

```bash title="Install dev tools"
uv sync --group dev
```

→ Adds pytest, ruff, mypy to .venv/

```bash title="Verify installation"
uv run python -c "import fastapi; print(fastapi.__version__)"
```

→ Should print the FastAPI version

```bash title="Check lockfile was generated"
ls -la uv.lock
```

→ uv.lock should now exist

```text title="After uv sync"
.venv/
├── bin/python          ← Python 3.12
├── lib/python3.12/     ← all installed packages
└── ...
uv.lock                 ← exact pinned versions
```

::: success Never activate the venv manually
uv run <command> handles activation automatically. Never need to run source .venv/bin/activate.
:::

::: info uv.lock
Commit uv.lock to git. It ensures every collaborator installs the exact same versions. Never edit it manually.
:::

## Step 12: Install RAG course dependencies

`Phase 4 — Dependencies`

The sunnay RAG course and vector DB deps come from external requirements files — not from pyproject.toml. This is intentional: these deps belong to an external resource we do not control, so they are kept separate to avoid conflicts.

::: info What you will do
Install requirements_sunnay.txt and requirements_vectordb.txt using pip inside the uv environment.
:::

::: note Why
Keeping external course deps in separate requirements files means updating one course's deps cannot break another course or the scaffold. Each resource owns its own file.
:::

```bash title="Install sunnay RAG deps"
uv run pip install -r requirements_sunnay.txt
```

→ Installs langchain, docling, sentence-transformers, all vector store clients

```bash title="Install vector DB deps (optional subset)"
uv run pip install -r requirements_vectordb.txt
```

→ Focused subset for Class-33, 34 only

```bash title="Pin the installed versions"
uv run pip freeze > requirements_sunnay.lock
```

→ Creates a lockfile for reproducibility

```bash title="Verify key packages"
uv run python -c "import langchain; print('langchain:', langchain.__version__)"
uv run python -c "import docling; print('docling ok')"
```

::: warning Large download
sentence-transformers pulls PyTorch which is several hundred MB. This is expected. Run once and it is cached.
:::

::: info requirements_sunnay.lock
After running pip freeze, commit the .lock file. This pins exact versions for the sunnay notebooks so they always run identically.
:::

## Step 13: Install notebook and tutorial dependencies

`Phase 4 — Dependencies`

Install the notebooks group (Jupyter, ipykernel, pandas, matplotlib) and the langchain-tutorial group for the CH-1 through CH-3 LangChain notebooks.

::: info What you will do
Install the notebooks and langchain-tutorial dependency groups from pyproject.toml.
:::

::: note Why
Keeping these as separate groups means you can install only what you need. A student running only RAG notebooks does not need the LangChain tutorial deps and vice versa.
:::

```bash title="Install notebook dependencies"
uv sync --group notebooks
```

→ Installs jupyter, ipykernel, pandas, matplotlib, nbstripout

```bash title="Install LangChain tutorial dependencies"
uv sync --group langchain-tutorial
```

→ Installs langchain, openai, wikipedia for CH-1 → CH-3

```bash title="Initialize the LangChain tutorial SalesDB"
uv run python notebooks/langchain-tutorial/CH-3/init_db.py
```

→ Creates SalesDB/sales.db for the agent notebooks

```bash title="Verify Jupyter is available"
uv run jupyter --version
```

→ Should print Jupyter version numbers

::: success nbstripout
nbstripout strips output cells from notebooks before git commits. This keeps notebook diffs clean and prevents large outputs from inflating the repo. Set it up with: uv run nbstripout --install
:::

::: info init_db.py
Run this once before opening any CH-3 notebooks. It creates the SQLite SalesDB with a sample orders table used by the ReAct agent.
:::

## Step 14: Configure your .env file

`Phase 5 — Run`

Copy .env.example to .env and fill in your real API keys. You do not need all keys to get started — the minimum setup (Groq only) is free and lets you run most notebooks.

::: info What you will do
Create .env from the template and add at minimum one LLM provider key.
:::

::: note Why
.env is never committed (it is gitignored). It holds your real secrets. The project reads it automatically via pydantic-settings in config.py.
:::

```bash title="Copy the template"
cp .env.example .env
```

→ Creates your local .env from the template

```bash title="Open and edit"
# Open in your editor — add your real keys
# Minimum setup (free):
GROQ_API_KEY=your_real_groq_key_here

# For full functionality add:
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
PINECONE_API_KEY=pcsk_...
```

→ Only GROQ_API_KEY needed for basic notebooks

```text title="Verify .env is not tracked"
git status
```

→ .env should NOT appear in git status output

```bash title="Test settings load correctly"
uv run python -c "
from my_project.config import get_settings
s = get_settings()
print('App:', s.app_name)
print('Chunk size:', s.chunk_size)
"
```

→ Should print without errors

::: success Minimum free setup
You only need GROQ_API_KEY to run most notebooks. Groq has a generous free tier with fast llama3 inference. Get a free key at console.groq.com
:::

::: danger Never share your .env
Never paste .env contents in chat, emails, or screenshots. Never commit it. If a key is accidentally exposed, revoke it immediately from the provider's dashboard.
:::

::: info Where keys are used
config.py reads all keys via pydantic-settings. Every module uses get_settings() to access them. No hardcoded keys anywhere in the codebase.
:::

#### Details

| Item | Value |
|---|---|
| GROQ_API_KEY | Free tier — fast llama3 inference. Best for development and testing. |
| OPENAI_API_KEY | gpt-4o — best quality, costs money. Needed for OpenAI embeddings. |
| ANTHROPIC_API_KEY | claude-sonnet-4-6 — strong reasoning, costs money. |
| PINECONE_API_KEY | Cloud vector store — only needed for Class-34 Pinecone notebook. |

## Step 15: Register the Jupyter kernel

`Phase 5 — Run`

Register the project's virtual environment as a Jupyter kernel. This means every notebook in the project uses the same .venv — no more "module not found" errors from the wrong Python.

::: info What you will do
Install the project's .venv as a named Jupyter kernel called "Python (my-project)".
:::

::: note Why
Without registering the kernel, Jupyter uses the system Python by default — not the .venv where all the RAG packages are installed. Every notebook must use the project kernel.
:::

```bash title="Register the kernel"
uv run python -m ipykernel install --user \
    --name my-project \
    --display-name "Python (my-project)"
```

→ Registers .venv as a named Jupyter kernel

```bash title="Verify kernel is registered"
jupyter kernelspec list
```

→ Should show "my-project" in the list

```text title="Expected output from kernelspec list"
Available kernels:
  my-project    /path/to/kernels/my-project
  python3       /path/to/kernels/python3
```

::: success Selecting the kernel in Jupyter
When you open any notebook, click the kernel selector in the top right and choose "Python (my-project)". All notebooks in this project should use this kernel.
:::

::: warning After uv sync --group X
If you add new deps with uv sync after registering the kernel, the kernel automatically picks them up — no need to re-register.
:::

## Step 16: Start Jupyter Lab

`Phase 5 — Run`

Start the Jupyter Lab server from the project root. Jupyter Lab is the modern notebook interface — it shows the full file tree, supports multiple tabs, and has a built-in terminal.

::: info What you will do
Launch Jupyter Lab using uv run so it uses the project's .venv.
:::

::: note Why
Running jupyter lab through uv run ensures the correct Python environment is used. Starting from the project root means all relative paths in notebooks (../../data/raw/) resolve correctly.
:::

```bash title="Start Jupyter Lab"
uv run jupyter lab
```

→ Opens in your browser at http://localhost:8888

```bash title="Start on a specific port (if 8888 is busy)"
uv run jupyter lab --port 8889
```

```bash title="Start without opening browser"
uv run jupyter lab --no-browser
```

→ Copy the URL from terminal and open manually

```text title="First notebook checklist"
1. Open any notebook
2. Select kernel: Python (my-project)
3. Test the import:
   from my_project.config import get_settings
   s = get_settings()
   print(s.app_name)  # → RAG Project
```

::: success Keep this terminal open
Jupyter Lab runs in the foreground. Keep this terminal open while using notebooks. Press Ctrl+C to stop.
:::

::: info Always start from project root
Always run jupyter lab from the my-project/ directory. This ensures relative paths like ../../data/raw/ resolve correctly from any notebook subfolder.
:::

## Step 17: Start the FastAPI server

`Phase 5 — Run`

The FastAPI server exposes the RAG pipeline as HTTP endpoints. Run it in a separate terminal from Jupyter. The --reload flag automatically restarts the server when you edit src/ files.

::: info What you will do
Start the FastAPI development server with auto-reload using uvicorn.
:::

::: note Why
Having the API running lets you test endpoints with curl or the built-in Swagger docs at /docs. The auto-reload flag means you see changes immediately without restarting manually.
:::

```bash title="Start the API server"
uv run uvicorn my_project.main:app --reload
```

→ Starts on http://localhost:8000 with auto-reload

```bash title="Test the health endpoint"
curl http://localhost:8000/health/
```

→ Should return: {"status":"ok"}

```bash title="Test the ready endpoint"
curl http://localhost:8000/health/ready
```

→ Returns app name and version

```bash title="Open interactive API docs"
open http://localhost:8000/docs
```

→ Swagger UI — test all endpoints in browser

```text title="Server startup output"
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Started reloader process
INFO:     Application startup complete.
```

::: success Two terminals
Run Jupyter Lab in one terminal, the API server in another. Both should be open simultaneously during development.
:::

::: info API docs
Visit http://localhost:8000/docs for Swagger UI. You can test every endpoint directly in the browser without writing curl commands.
:::

::: warning /rag/query returns 503
The RAG endpoints return 503 until you wire a RAGPipeline via FastAPI dependency injection. This is expected — the endpoint contract is defined, the implementation comes later.
:::

## Step 18: Verify everything works

`Phase 5 — Run`

Run through this checklist to confirm the full project is correctly set up. Every item should pass before you start writing RAG code.

::: info What you will do
Run the full verification checklist — Python, imports, API, tests, and a quick RAG smoke test.
:::

::: note Why
Catching setup issues now prevents confusing errors later. A clean verification means you can focus on RAG logic instead of environment debugging.
:::

```bash title="Check Python version"
uv run python --version
# Expected: Python 3.12.x
```

```bash title="Check package imports"
uv run python -c "
import fastapi, pydantic, langchain
from my_project.config import get_settings
from my_project.models.document import Document, Chunk
from my_project.models.query import QueryRequest
print('All imports OK')
"
```

```bash title="Run tests"
uv run pytest tests/unit/ -v
```

→ All unit tests should pass

```bash title="Run linter"
uv run ruff check src/
```

→ Should report no errors

```bash title="Run type checker"
uv run mypy src/
```

→ Should report no errors

```bash title="Quick RAG smoke test"
uv run python -c "
from my_project.rag.chunker.recursive import RecursiveChunker
from my_project.models.document import ParsedOutput

chunker = RecursiveChunker(chunk_size=100, overlap=10)
output  = ParsedOutput(document_id='test', text='Hello world ' * 50)
chunks  = chunker.chunk(output)
print(f'Chunker OK — {len(chunks)} chunks created')
"
```

→ Tests the RAG core without any API key

```text title="Expected results"
Python 3.12.x              ✓
All imports OK             ✓
pytest: all tests passed   ✓
ruff: no errors            ✓
mypy: no errors            ✓
Chunker OK — N chunks      ✓
```

::: success You are ready
If all checks pass, the project is fully set up. Open notebooks/project-exploration/01-explore-models.ipynb as your first notebook — it exercises the src/ package interactively.
:::

::: info Next step
Open Jupyter Lab, select the "Python (my-project)" kernel, and start with Class-29 or LangChain Tutorial CH-1.
:::
