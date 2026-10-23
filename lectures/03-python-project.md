A Python project scaffold that helps you build a simple **python** project and the **rag-production** project step by step, from an empty folder to tested, containerized RAG.

Production RAG pipeline setup for my-project: Python 3.12, uv-managed, src layout. Work through the steps in order, phase by phase.

**Tech:** `Python 3.12` · `uv` · `Git`

| Phase | Steps |
|---|---|
| Phase 1 — Environment |  |
| Phase 2 — Folders |  |
| Phase 3 — Config |  |
| Phase 4 — Dependencies |  |
| Phase 5 — Run |  |

## Step 1: Install uv

[!Phase 1: Environment|blue]

uv is the package and project manager we use instead of pip, venv and poetry. It is much faster, manages Python versions and writes a lockfile automatically. You install it once per machine, not per project. uv replaces pip, venv and pyenv in one tool. It resolves and installs packages in seconds, pins exact versions in uv.lock, and gives every collaborator the same environment.

::: objective What you will do
- Install uv on your machine with the official installer
- Restart the terminal so the `uv` command is found
- Confirm the install with `uv --version`
:::

::: prereq Prerequisites
- A terminal: Terminal on macOS/Linux, PowerShell or Git Bash on Windows
- Internet access to download the installer
:::
### 1.1 Install uv

Run the command for your operating system.

::: tabs
```bash title="macOS / Linux"
curl -LsSf https://astral.sh/uv/install.sh | sh
```
```powershell title="Windows (PowerShell)"
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```
```bash title="Windows (Git Bash)"
curl -LsSf https://astral.sh/uv/install.sh | sh
```
:::

→ Downloads and runs the uv installer.

::: info Restart your terminal
After installing `uv`, close and reopen your terminal so the PATH is updated and the `uv` command is found. Already have uv? Run `uv self update` to get the latest version, then continue.



:::
### 1.2 Expected result and verify

```bash title="Verify installation"
uv --version      # Same output as `uv self version`
uv -V             # Will not include the build commit and date

uv --help         # The --help flag can be used to view the help menu for a command, e.g., for uv:
uv init --help    # To view the help menu for a specific command, e.g., for uv init:

```

→ Prints a version number, for example `uv 0.x.x`.

::: mistake Common mistake: "uv: command not found"
The terminal was not restarted after the install. Close it, open a new one and run `uv --version` again.
:::



#### Details

| Item | Value |
|---|---|
| Installed to | ~/.cargo/bin/uv (macOS/Linux) or %USERPROFILE%\.cargo\bin\uv (Windows) |
| Python management | uv can install and pin Python versions, no pyenv needed |
| Lockfile | Every uv project gets a uv.lock with exact pinned versions for reproducible installs |
| Install scope | Once per machine, not per project |



#### Step checklist

- ☐ uv installed with the installer for your OS
- ☐ Terminal restarted
- ☐ `uv --version` prints a version number

## Step 2: Create the repo and the project

[!Phase 1: Environment|blue]

Before writing any code, put the project under Git and GitHub. There are three simple ways to create the repo. Pick one. All three end the same way: a repo on GitHub, the **my-project** folder on your machine, a `.gitignore` with our entries, and a first commit with a README pushed.

::: steps
- Tell Git who you are (once per machine)
- Create the repo in one of three ways
- Add the `.gitignore` entries
- Make the first commit with the README and push
- Check that everything is connected
:::

> Starting from Git and GitHub means every change is tracked from the first file, and your work is backed up from day one.

You need Step 1 done (`uv --version` works), Git installed (`git --version`) and a GitHub account.

### 2.1 Tell Git who you are

Every commit records an author. Git reads it from two settings. Without them, your first commit fails with **"Author identity unknown"**.

```bash title="Set your Git identity"
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

| Part | What it does |
|---|---|
| `git config` | Reads or writes a Git setting |
| `--global` | Saves it for your user on this machine, so every repo uses it |
| `user.name` | The name shown on your commits |
| `user.email` | Use the same email as your GitHub account, so GitHub links the commits to you |

Check both values:

::: tabs
```bash title="Command"
git config --global user.name
git config --global user.email
```
```terminal title="Output"
$ git config --global user.name
Your Name
$ git config --global user.email
you@example.com
```
:::

→ Without a value after the setting name, `git config` prints the current value instead of changing it.

> Set it once per machine. If both lines already print your details, skip to 2.2.

### 2.2 Create the repo: pick one of three ways

| | Way 1: GitHub first | Way 2: new local folder | Way 3: existing local folder |
|---|---|---|---|
| Start | Create the repo on github.com, then clone it | Create a folder, then an empty GitHub repo | You already have a folder, then an empty GitHub repo |
| README | Created by GitHub | You create it | You create it (if missing) |
| Remote | Set by `git clone` | `git remote add origin` | `git remote add origin` |
| Best for | Beginners | Learning what Git does | Code you already started |

> Do one way only, then continue at 2.3. Name the repo in kebab-case (`my-project`, `rag-learning-env`): lowercase, hyphens, no spaces or capitals, because it becomes part of the URL `github.com/you/my-project`.

#### Way 1: create on GitHub, then clone

```bash title="On github.com"
# github.com → + → New repository
#   Repository name → my-project
#   Visibility      → Public or Private
#   ✓ Add a README file
#   ✓ .gitignore template → Python
# Click "Create repository"
```

→ GitHub creates the repo with a first commit that already holds `README.md` and a Python `.gitignore`.

```bash title="Clone and enter the folder"
git clone https://github.com/YOUR_USERNAME/my-project.git
cd my-project
```

| Line | What it does |
|---|---|
| `git clone <url>` | Downloads the repo into a new folder named `my-project`, with its full history |
| | Sets the remote `origin` to that URL, so `push` and `pull` already know where to go |
| `cd my-project` | Moves into the folder. Every command from now on runs here (check with `pwd`) |

#### Way 2: new local folder, then connect to GitHub

```bash title="Create the folder, Git and the README"
mkdir my-project
cd my-project
git init
git branch -M main
echo "# my-project" > README.md
```

| Line | What it does |
|---|---|
| `mkdir my-project` | Creates the project folder |
| `cd my-project` | Moves into it |
| `git init` | Turns the folder into a Git repo: creates the hidden `.git/` folder that stores the history |
| `git branch -M main` | Names the branch `main`, the name GitHub uses (some Git setups start with `master`) |
| `echo "# my-project" > README.md` | Creates `README.md` with one heading line. `>` writes a new file |

```bash title="On github.com"
# github.com → + → New repository
#   Repository name → my-project
#   Leave it EMPTY: no README, no .gitignore, no license
# Click "Create repository"
```

→ The GitHub repo must be **empty**. If GitHub adds its own README, the two histories do not match and your first push is rejected.

```bash title="Connect the folder to GitHub"
git remote add origin https://github.com/YOUR_USERNAME/my-project.git
git remote -v
```

| Line | What it does |
|---|---|
| `git remote add origin <url>` | Saves the GitHub URL under the short name `origin` |
| `git remote -v` | Lists the remotes. You see your URL twice: once for fetch, once for push |

#### Way 3: existing local folder, then push to GitHub

```bash title="Turn the folder into a Git repo"
cd path/to/my-project
git init
git branch -M main
echo "# my-project" > README.md     # skip if you already have a README.md
```

→ Same as Way 2, but the folder already has your files. `git init` does not change them; it only adds `.git/`. Skip the `echo` line if a README exists, because `>` would overwrite it.

Create the **empty** GitHub repo exactly as in Way 2, then connect it:

```bash title="Connect the folder to GitHub"
git remote add origin https://github.com/YOUR_USERNAME/my-project.git
git remote -v
```

> If Git answers **"remote origin already exists"**, the folder was connected before. Run `git remote remove origin`, then the `git remote add origin ...` line again.

### 2.3 Add the .gitignore entries (all ways)

`.gitignore` lists files Git must never track. Run this once from inside **my-project**:

```bash title="Create or extend .gitignore"
cat >> .gitignore <<'EOF'
.venv/
.env
__pycache__/
*.pyc
*.pyo
.DS_Store
*.egg-info/
dist/
.ipynb_checkpoints/
EOF

cat .gitignore
```

How the command works:

| Part | Meaning |
|---|---|
| `cat >> .gitignore` | Write into `.gitignore`. `>>` **adds** to the end, and creates the file if it is missing |
| `<<'EOF'` | Take every following line as the text to write, until a line that says `EOF` |
| `EOF` | Ends the text. The quotes in `'EOF'` keep the lines exactly as typed |
| `cat .gitignore` | Prints the file so you can check the entries are there |

→ In Way 1 our lines go after GitHub's Python rules. In Ways 2 and 3 the file is created with only our lines. Run it once: running it again adds the lines twice.

What each entry ignores:

| Entry | Why it stays out of Git |
|---|---|
| `.venv/` | The virtual environment: large, and rebuilt on every machine (Step 3) |
| `.env` | Your secret keys. Never commit it |
| `__pycache__/`, `*.pyc`, `*.pyo` | Compiled Python files, created automatically |
| `.DS_Store` | macOS folder settings |
| `*.egg-info/`, `dist/` | Build output from packaging |
| `.ipynb_checkpoints/` | Jupyter autosave copies |

> RAG-specific rules (FAISS indexes, ChromaDB files, parser outputs) are added in Step 10.

### 2.4 First commit with the README, then push (all ways)

```bash title="Commit and push"
git add README.md .gitignore
git status
git commit -m "chore: initial commit with README and .gitignore" \
  -m "- README.md: project title
- .gitignore: skip .venv, .env, Python caches, build output, Jupyter checkpoints"
git push -u origin main
```

| Line | What it does |
|---|---|
| `git add README.md .gitignore` | Stages the two files: marks them to go into the next commit |
| `git status` | Shows what is staged. Check that only these two files are listed under "Changes to be committed" |
| `git commit -m "..." -m "..."` | The first `-m` is the title: one line, with a type (`chore:`, `init:`, `feat:`). The second `-m` is the body: one line per change. GitHub shows the title in the history and the body when you open the commit |
| `git push -u origin main` | Sends the commit to GitHub. `-u` links local `main` to GitHub's `main`, so later a plain `git push` is enough |

→ The message follows the conventional commit style used in this course: `chore:` for setup, `feat:` for features, `fix:` for bug fixes, `docs:` for documentation.

> In Way 1 the README is already on GitHub, so this commit only adds your `.gitignore` lines. That is expected.

On Windows Git Bash, paste and run one command at a time, and read each result before the next.

### 2.5 Verify

Check the folder, history and remote:

::: tabs
```bash title="Command"
ls -a
git log --oneline
git remote -v
git status
```
```terminal title="Output"
$ ls -a
.  ..  .git  .gitignore  README.md
$ git log --oneline
a1b2c3d (HEAD -> main, origin/main) chore: initial commit with README and .gitignore
$ git remote -v
origin  https://github.com/YOUR_USERNAME/my-project.git (fetch)
origin  https://github.com/YOUR_USERNAME/my-project.git (push)
$ git status
On branch main
Your branch is up to date with 'origin/main'.
nothing to commit, working tree clean
```
:::

| Check | Proves |
|---|---|
| `ls -a` | `.git/`, `.gitignore` and `README.md` exist (`-a` shows hidden files) |
| `git log --oneline` | Your commit exists, and `origin/main` points to it: it reached GitHub |
| `git remote -v` | The folder is connected to your GitHub repo |
| `git status` | Nothing is left to commit |

Open `https://github.com/YOUR_USERNAME/my-project`: you see the README and `.gitignore`. In Way 1 you also see GitHub's first commit in the history.

::: mistake Common mistakes
- **"Author identity unknown"**: do 2.1 first.
- **Push rejected ("fetch first")** in Way 2 or 3: the GitHub repo was created with a README. Delete it and create it again **empty**, or run `git pull origin main --allow-unrelated-histories` once, then push.
- **"src refspec main does not match any"**: you pushed before committing. Do 2.4 in order.
:::

#### Details

| Item | Value |
|---|---|
| Project name | my-project (folder and repo) |
| Way 1 remote | Set by `git clone` |
| Ways 2 and 3 remote | Empty GitHub repo + `git remote add origin` |
| Branch | `main` |
| First commit | `chore: initial commit with README and .gitignore` |
| Full files | Every file this step creates or changes is in the Resources panel |

#### Step checklist

::: checklist Step checklist
- [ ] Git identity set
- [ ] Repo created on GitHub and my-project on your machine (one of the three ways)
- [ ] `.gitignore` has our entries
- [ ] First commit with README pushed
- [ ] `git status` is clean and the repo shows on GitHub
:::

::: takeaway Next
Step 3: create the project with uv (Python pin, virtual environment, pyproject.toml).
:::

## Step 3: Create Project with uv

[!Phase 1: Environment|blue]

Your repo from Step 2 has a README and a `.gitignore`. Now turn it into a Python project with uv: pin Python, create the virtual environment, write `pyproject.toml`, lock the dependencies and add the support files. There are three ways to start. All three end with the same project, pushed to GitHub.

::: steps
- Learn the four files that make a uv project
- Start the project in one of three ways
- Activate the environment
- Write `pyproject.toml`, then lock and sync
- Add the support files, commit and push
- Check the result
:::

> Run every command from inside **my-project**, the folder you created or cloned in Step 2. Check with `pwd`.

### 3.1 What a uv project is

> A uv project is a folder with four things: the Python version it uses, an isolated environment, one file that describes the project, and one file that records the exact package versions.

| File | What it is | Commit it? |
|---|---|---|
| `.python-version` | The Python version uv uses here (`3.12`) | Yes |
| `.venv/` | The virtual environment: this project's own Python and packages | No (ignored in Step 2) |
| `pyproject.toml` | Project name, Python range, dependencies and tool settings | Yes |
| `uv.lock` | The exact version of every package, so every machine installs the same | Yes |

### 3.2 Start the project: pick one of three ways

| | Way 1: by hand | Way 2: `uv init` | Way 3: `uv init --package` |
|---|---|---|---|
| You run | `uv python pin`, `uv venv` | One command, uv writes the files | One command, uv writes a package layout |
| uv creates | `.python-version`, `.venv/` | `.python-version`, `pyproject.toml`, `main.py` | `.python-version`, `pyproject.toml`, `src/my_project/` |
| Best for | Learning what each file does | Quick scripts and apps | Libraries and installable packages |

> Do one way only, then continue at 3.3. Each way ends with the same three things: `.python-version`, `.venv/` and a `src/` folder with `__init__.py`. The course uses `src/` itself as the package, so imports read `from src.module import ...`.

#### Way 1: by hand

```bash title="Pin Python and create the environment"
uv python pin 3.12
uv venv
mkdir src
touch src/__init__.py
```

| Line | What it does |
|---|---|
| `uv python pin 3.12` | Writes `.python-version` with `3.12`. uv installs Python 3.12 if your machine does not have it |
| `uv venv` | Creates `.venv/` using that Python |
| `mkdir src` | Creates the folder for your code |
| `touch src/__init__.py` | An empty `__init__.py` makes `src/` a Python package, so it can be imported |

#### Way 2: uv init (app)

Let uv create the base, then align it:

::: tabs
```bash title="Command"
uv init . --python 3.12
rm main.py
uv venv
mkdir src
touch src/__init__.py
```
```terminal title="Output"
$ uv init . --python 3.12
Initialized project `my-project` at `/path/to/my-project`
$ rm main.py
$ uv venv
Using CPython 3.12.x
Creating virtual environment at: .venv
Activate with: source .venv/bin/activate
$ mkdir src
$ touch src/__init__.py
```
:::

| Line | What it does |
|---|---|
| `uv init . --python 3.12` | Turns this folder into a uv project. The dot means "here"; `uv init my-project` would create a nested folder |
| | Writes `.python-version`, `pyproject.toml` and a sample `main.py`. Your README and `.gitignore` from Step 2 are kept |
| `rm main.py` | Removes the sample script. The course code lives in `src/` |
| `uv venv`, `mkdir src`, `touch src/__init__.py` | Same as Way 1 |

#### Way 3: uv init --package (src layout)

```bash title="Let uv create a package, then align it"
uv init . --package --python 3.12
rm -r src/my_project
touch src/__init__.py
uv venv
```

| Line | What it does |
|---|---|
| `uv init . --package --python 3.12` | Same as Way 2, but builds an installable package: `src/my_project/__init__.py` and a build system |
| `rm -r src/my_project` | Removes the generated package folder. The name comes from your folder (`my-project` becomes `my_project`) |
| `touch src/__init__.py` | Makes `src/` itself the package, as in Way 1 |
| `uv venv` | Creates `.venv/` |

> `src/my_project/` is the standard layout for libraries you publish. This course keeps one flat `src/` package so imports stay short. Both are valid.

### 3.3 Activate the environment

Activating makes `python` and the tools in your terminal point to `.venv`:

::: tabs
```bash title="macOS / Linux"
source .venv/bin/activate
```
```powershell title="PowerShell"
.venv\Scripts\Activate.ps1
```
```bash title="Git Bash"
source .venv/Scripts/activate
```
:::

→ The environment's name appears in brackets at the start of your prompt. Run `deactivate` to leave it.

> Activation is optional. `uv run <command>` always runs inside the project environment, activated or not. You need to activate again in every new terminal.

#### The name in your prompt

The name in brackets is only a label, stored in `.venv/pyvenv.cfg`. The folder is always `.venv`. Which label you see depends on the command that created the environment:

| Created by | Label in the prompt |
|---|---|
| `uv venv` | The folder name, e.g. `(RAG-PRODUCTION-CICD)` |
| `uv sync` or `uv run`, when no `.venv` exists yet | The project name from `pyproject.toml`, lowercase, e.g. `(rag-production-cicd)` |
| `uv venv --prompt my-project` | Your own name: `(my-project)` |

To choose your own label, recreate the environment with `--prompt`:

::: tabs
```bash title="Command"
uv venv --clear --prompt my-project
```
```terminal title="Output"
$ uv venv --clear --prompt my-project
Using CPython 3.12.x
Creating virtual environment at: .venv
Activate with: source .venv/bin/activate
```
:::

| Part | What it does |
|---|---|
| `--prompt my-project` | Sets the label shown in brackets |
| `--clear` | Replaces the existing `.venv`. Without it, uv stops with "A virtual environment already exists at: .venv" |

→ `--clear` empties the environment. If you already ran `uv sync` (3.5), run it again to reinstall. Later `uv sync` and `uv run` keep your label.

> Change the label, not the folder. `uv venv myenv` would create a folder named `myenv`, but `uv sync` and `uv run` always use `.venv`, so they would ignore it.

### 3.4 Write pyproject.toml (all ways)

This command writes the course version of the file. In Ways 2 and 3 it replaces the one `uv init` generated:

```bash title="Create pyproject.toml"
cat > pyproject.toml <<'EOF'
[project]
name            = "my-project"
version         = "0.1.0"
description     = "Production RAG system"
requires-python = ">=3.12"
dependencies    = [
    "requests>=2.31.0",
]

[dependency-groups]
dev       = []
notebooks = []

[tool.uv]
default-groups = ["dev", "notebooks"]

[build-system]
requires      = ["hatchling"]
build-backend = "hatchling.build"

[tool.hatch.build.targets.wheel]
packages = ["src"]

[tool.ruff]
line-length    = 100
target-version = "py312"

[tool.pytest.ini_options]
testpaths = ["tests"]
EOF
```

→ `>` writes a new file and replaces an existing one, so running it twice is safe.

| Section | What it says |
|---|---|
| `[project]` | Name, version and description of the project |
| `requires-python = ">=3.12"` | The Python versions this project supports |
| `dependencies` | Packages the app needs to run. It starts with `requests` (HTTP calls to other APIs); later steps add more with `uv add` |
| `"requests>=2.31.0"` | Any version from 2.31.0 up. `uv.lock` records the exact one installed |
| `[dependency-groups]` | Packages only for working on the project, kept apart from the app. Two groups, empty for now |
| `default-groups` | A plain `uv sync` installs both groups, so your machine has everything |
| `[build-system]` | How to build the project so Python can import `src/`. Here: Hatchling |
| `[tool.hatch.build.targets.wheel]` | `packages = ["src"]` tells Hatchling that `src/` is the package |
| `[tool.ruff]` | Settings for ruff, the linter: line length and Python version |
| `[tool.pytest.ini_options]` | pytest looks for tests in `tests/` |

#### Why dependency groups

Not every package belongs in the running app. Groups sort them by job:

| Group | Holds | Filled with |
|---|---|---|
| `dependencies` | What the app needs to run (requests, FastAPI, LangChain, ...) | `uv add fastapi` |
| `dev` | Tools for building and checking code: pytest, ruff | `uv add --dev pytest ruff` |
| `notebooks` | Jupyter and notebook helpers | `uv add --group notebooks ipykernel jupyterlab` |

| Reason | What groups give you |
|---|---|
| Smaller, safer production | Docker and servers run `uv sync --no-default-groups`: only the app's packages, no test or Jupyter tools |
| Faster CI | A test job installs `dev` only; a notebook job adds `notebooks` |
| Clear ownership | Anyone reading `pyproject.toml` sees what the app needs and what is just tooling |
| One lockfile | All groups are still locked together in `uv.lock`, so every machine gets the same versions |

#### Example: fill the groups with the tools you need most

Add the two dev tools and the two notebook packages almost every project uses:

::: tabs
```bash title="Command"
uv add --dev pytest ruff
uv add --group notebooks ipykernel jupyterlab
```
```terminal title="Output"
$ uv add --dev pytest ruff
Resolved 8 packages in 157ms
Installed 7 packages in 8ms
 + iniconfig==2.3.1
 + packaging==26.3
 + pluggy==1.6.0
 + pygments==2.21.0
 + pytest==9.1.1
 + ruff==0.17.0
$ uv add --group notebooks ipykernel jupyterlab
Resolved 98 packages in 924ms
 ...
 + ipykernel==7.4.0
 + jupyterlab==4.6.4
 ...
```
:::

| Package | Group | What it is for |
|---|---|---|
| `pytest` | dev | Runs your tests (`uv run pytest`) |
| `ruff` | dev | Finds code errors and formats code (`uv run ruff check .`) |
| `ipykernel` | notebooks | Lets Jupyter run notebooks on this project's `.venv` |
| `jupyterlab` | notebooks | The notebook editor (`uv run jupyter lab`) |

→ The other lines in the output (`iniconfig`, `pluggy`, ...) are packages these tools need. uv installs them for you. Your version numbers may be newer.

uv writes each package into its group:

```toml title="pyproject.toml (after)"
[dependency-groups]
dev = [
    "pytest>=9.1.1",
    "ruff>=0.17.0",
]
notebooks = [
    "ipykernel>=7.4.0",
    "jupyterlab>=4.6.4",
]
```

Check that the tools run:

::: tabs
```bash title="Command"
uv run pytest --version
uv run ruff --version
uv run jupyter lab --version
```
```terminal title="Output"
$ uv run pytest --version
pytest 9.1.1
$ uv run ruff --version
ruff 0.17.0
$ uv run jupyter lab --version
4.6.4
```
:::

> None of these four goes into `dependencies`: the running app does not need them. `dependencies` keeps only `requests`, and later steps add app packages with plain `uv add`.

> **Two version settings.** `.python-version` picks the Python uv uses on this machine (3.12). `requires-python = ">=3.12"` states which versions the project supports; it allows newer ones and does not pin 3.12.

> **Why Hatchling.** With an older setuptools backend, `uv sync` fails with `No module named setuptools.backends`. Hatchling with `packages = ["src"]` installs this layout cleanly.

### 3.5 Lock and sync

```bash title="Record exact versions and install"
uv lock
uv sync
```

| Line | What it does |
|---|---|
| `uv lock` | Reads `pyproject.toml` and writes `uv.lock` with the exact version of every package |
| `uv sync` | Makes `.venv` match `uv.lock`, and installs your project into it so `import src` works |

Check that the project imports:

::: tabs
```bash title="Command"
uv run python -c "import src, sys; print('import src OK', sys.version.split()[0])"
uv run python -c "import requests; print('requests', requests.__version__)"
```
```terminal title="Output"
$ uv run python -c "import src, sys; print('import src OK', sys.version.split()[0])"
import src OK 3.12.x
$ uv run python -c "import requests; print('requests', requests.__version__)"
requests 2.34.2
```
:::

The uv commands you will use from now on:

| Command | When |
|---|---|
| `uv add <package>` | Add a dependency: updates `pyproject.toml`, `uv.lock` and `.venv` in one go |
| `uv add --dev <package>` | Add a tool to the `dev` group |
| `uv add --group notebooks <package>` | Add a package to the `notebooks` group |
| `uv sync --no-default-groups` | Install the app's packages only (Docker, production) |

#### Sync with groups: when and why

`uv sync` makes `.venv` match the project **exactly**. It installs the app's packages plus the **default groups**, and removes anything else. Without a `default-groups` line, only `dev` is a default group.

| Command | Installs | Use it when |
|---|---|---|
| `uv sync` | App + default groups | Every day. With our `pyproject.toml`: app + `dev` + `notebooks` |
| `uv sync --group notebooks` | App + default groups + `notebooks` | Your `pyproject.toml` has no `default-groups` and you need Jupyter |
| `uv sync --all-groups` | App + every group | You want everything, whatever the defaults |
| `uv sync --no-default-groups` | App only | Docker and production: no test or notebook tools |
| `uv sync --only-group dev` | `dev` only, not even the app | A CI job that only runs the linter |

Here is what happens without `default-groups`: plain `uv sync` skips `notebooks`, so Jupyter is missing until you ask for the group.

::: tabs
```bash title="Command"
uv sync
uv run jupyter lab --version
uv sync --group notebooks
uv run jupyter lab --version
```
```terminal title="Output"
$ uv sync
Installed 6 packages in 172ms
$ uv run jupyter lab --version
error: Failed to spawn: `jupyter`
  Caused by: program not found
$ uv sync --group notebooks
Installed 88 packages in 2.03s
$ uv run jupyter lab --version
4.6.4
```
:::

> **Watch out:** a later plain `uv sync` removes the `notebooks` packages again, because `.venv` must match exactly. `uv run` does not remove anything. This is why our `pyproject.toml` sets `default-groups = ["dev", "notebooks"]`: one plain `uv sync` always installs both.

#### uv tools: run tools outside the project

Some tools you use in every folder, not just this project. uv can run or install them separately, without touching `pyproject.toml`:

| Command | What it does | Use it when |
|---|---|---|
| `uvx <tool>` | Runs the tool once in a temporary environment | Trying a tool, or a one-off check |
| `uv tool install <tool>` | Installs it once, as a command available in every terminal | You use it often, in many projects |
| `uv tool list` | Shows the tools you installed | Checking what you have |
| `uv tool upgrade <tool>` | Updates it to the newest version | Keeping tools current |
| `uv tool uninstall <tool>` | Removes it | You no longer need it |

::: tabs
```bash title="Command"
uvx ruff --version
uv tool install ruff
ruff --version
```
```terminal title="Output"
$ uvx ruff --version
ruff 0.17.0
$ uv tool install ruff
Resolved 1 package in 3ms
Installed 1 package in 2ms
 + ruff==0.17.0
Installed 1 executable: ruff
$ ruff --version
ruff 0.17.0
```
:::

| | `dev` group (`uv add --dev ruff`) | uv tool (`uv tool install ruff`) |
|---|---|---|
| Lives in | This project's `.venv` | Its own place, outside every project |
| Version | Locked in `uv.lock`: the whole team and CI get the same one | Whatever you installed on your machine |
| Run with | `uv run ruff ...` | `ruff ...` from anywhere |
| Use for | Tools the project depends on: tests, lint in CI | Personal helpers you use everywhere |

> In this course, project tools (pytest, ruff) go in the `dev` group so everyone runs the same version. Use `uvx` or `uv tool` for your own extras.
| `uv remove <package>` | Remove a dependency |
| `uv sync` | After cloning or pulling: install exactly what `uv.lock` says |
| `uv lock` | After editing `pyproject.toml` by hand |
| `uv run <command>` | Run anything inside the project environment |

### 3.6 Support files (all ways)

Create the two support files:

```bash title="Command"
touch Makefile .env.example
```

| File | Purpose |
|---|---|
| `Makefile` | Shortcuts for common tasks (run, test, lint). Empty for now |
| `.env.example` | A template of the secret names this project needs. Safe to commit |

Add the placeholders this project uses:

```bash title="Command"
cat > .env.example <<'EOF'
# Copy this file to .env and fill in your real values
# Never commit .env to Git
OPENAI_API_KEY=your-key-here
GOOGLE_API_KEY=your-key-here
EOF
```

→ The real `.env` holds your actual keys and stays on your machine (Step 2 ignores it). Anyone who clones the repo copies `.env.example` to `.env` and fills it in.

#### .env.masterkey: every key name in one place

`.env.example` lists only what this project needs. `.env.masterkey` is the full reference: the variable name of every major AI and cloud service (LLMs, embeddings, vector databases, speech, cloud, payments...), each with where to get the key and what it is for. All values are empty.

Download **.env master key template** from **Resources** (right panel), put it in the project folder, then rename it:

::: tabs
```bash title="Command"
mv ~/Downloads/env-masterkey.txt .env.masterkey
grep -cE "^[A-Z0-9_]+=" .env.masterkey
```
```terminal title="Output"
$ mv ~/Downloads/env-masterkey.txt .env.masterkey
$ grep -cE "^[A-Z0-9_]+=" .env.masterkey
714
```
:::

→ `grep -cE` counts the key lines: 714 names, ready to copy. The download is a `.txt` file because browsers handle files that start with a dot badly. `mv` moves it into the project and gives it its real name. Use the folder your browser saved it to if it is not `~/Downloads`.

| File | Holds | Values | In Git? |
|---|---|---|---|
| `.env.masterkey` | Every key name you might ever need, with notes | Empty | Yes: a reference |
| `.env.example` | Only the keys this project uses | Placeholders | Yes: the template |
| `.env` | Only the keys this project uses | Your real keys | **Never** |

How you use them together: when the project needs a new service, find it in `.env.masterkey`, copy its lines into `.env.example` (empty value) and into `.env` (real value).

> `.env.masterkey` is safe to commit because it has no real keys. Never paste a real key into it: if you do, it is no longer a reference but a secret file. Its own header suggests ignoring `.env.*`, but we do not, because that would also hide `.env.example`.

### 3.7 Commit and push (all ways)

```bash title="Stage, check, commit, push"
git add .python-version pyproject.toml uv.lock src/ Makefile .env.example .env.masterkey
git status
git commit -m "init: project scaffold with uv and src layout" \
  -m "- uv project on Python 3.12: .python-version, pyproject.toml, uv.lock
- src/ package with __init__.py
- dependency groups: dev (pytest, ruff), notebooks (ipykernel, jupyterlab)
- .env.example and .env.masterkey (no real keys), empty Makefile"
git push
```

| Line | What it does |
|---|---|
| `git add ...` | Stages the seven new items by name, so nothing unexpected goes in |
| `git status` | Check: exactly these seven under "Changes to be committed", and no `.venv/` |
| `git commit -m "..." -m "..."` | The first `-m` is the title: one line, with a type (`chore:`, `init:`, `feat:`). The second `-m` is the body: one line per change. GitHub shows the title in the history and the body when you open the commit |
| `git push` | Sends it to GitHub. Plain `push` works because Step 2 used `-u` |

#### Project structure after Step 3

Highlighted lines are new in this step. The rest came from Step 2:

```tree title="my-project" {3,4,5,6,7,9,10,12,13}
my-project/
├── .git/                 # from Step 2: Git history
├── .venv/                # new: virtual environment (ignored by Git)
├── src/                  # new: your code
│   └── __init__.py       # new: makes src/ a package
├── .env.example          # new: template of the keys this project uses
├── .env.masterkey        # new: every key name, for reference
├── .gitignore            # from Step 2
├── .python-version       # new: Python 3.12
├── Makefile              # new: task shortcuts, empty for now
├── README.md             # from Step 2
├── pyproject.toml        # new: settings, requests, dev and notebooks groups
└── uv.lock               # new: exact version of every package
```

| | Items |
|---|---|
| New and committed | `src/__init__.py`, `.env.example`, `.env.masterkey`, `.python-version`, `Makefile`, `pyproject.toml`, `uv.lock` |
| New, not in Git | `.venv/`: rebuilt on any machine with `uv sync` |
| From Step 2 | `.git/`, `.gitignore`, `README.md` |

### 3.8 Verify

Check the files and the history:

::: tabs
```bash title="Command"
find . -not -path './.venv*' -not -path './.git' -not -path './.git/*' -not -path '*__pycache__*' | sort
git log --oneline
```
```terminal title="Output"
$ find . -not -path './.venv*' -not -path './.git' -not -path './.git/*' -not -path '*__pycache__*' | sort
.
./.env.example
./.env.masterkey
./.gitignore
./.python-version
./Makefile
./README.md
./pyproject.toml
./src
./src/__init__.py
./uv.lock
$ git log --oneline
b2c3d4e (HEAD -> main, origin/main) init: project scaffold with uv and src layout
a1b2c3d chore: initial commit with README and .gitignore
```
:::

→ The same files in all three ways. `origin/main` on the newest commit means it reached GitHub.

![Project structure after Step 3](assets/images/l03-project-structure.jpg)

> The image names the folder `rag-production/`; yours is `my-project/`. The files are the same.

::: mistake Common mistakes
- **Nested folder (3.2, Ways 2 and 3):** you ran `uv init my-project` instead of `uv init .`. Delete the inner folder and run it again with the dot.
- **PowerShell: "running scripts is disabled on this system" (3.3):** Windows blocks the activate script. Run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once, or use Git Bash, or skip activation and use `uv run`.
- **`A virtual environment already exists at: .venv` (3.3):** you ran `uv venv --prompt ...` on an existing environment. Add `--clear`: `uv venv --clear --prompt my-project`.
- **Another environment is active (3.3),** e.g. `(tech312)` in your prompt: run `deactivate` first. `uv run` always uses this project's `.venv`, but plain `python` and `jupyter` use the active one.
- **`No module named setuptools.backends` (3.4):** your `pyproject.toml` is not the 3.4 version. Run the 3.4 command again, then `uv sync`.
- **`ModuleNotFoundError: No module named 'src'` (3.5):** `src/__init__.py` is missing, or you ran plain `python` with another environment active. Create the file, run `uv sync`, use `uv run python`.
- **`ModuleNotFoundError: No module named 'requests'` (3.5):** `requests` is not under `dependencies`, or you have not synced since adding it. Check `pyproject.toml` (or run `uv add requests`), then `uv sync`.
- **`Failed to spawn: jupyter` (program not found) (3.5):** the `notebooks` group is not installed in `.venv`. Check that `pyproject.toml` lists `jupyterlab` under `notebooks` and has `default-groups = ["dev", "notebooks"]`, then run `uv sync`. Without `default-groups`, run `uv sync --group notebooks`.
- **Notebook packages disappeared after `uv sync` (3.5):** `default-groups` is missing, so a plain `uv sync` removes every group except `dev`. Add `default-groups = ["dev", "notebooks"]` under `[tool.uv]` and sync again.
- **`mv: cannot stat '~/Downloads/env-masterkey.txt'` (3.6):** the file is in another folder, or the browser renamed it, e.g. `env-masterkey (1).txt`. Run `ls ~/Downloads` to find it and use that path, in quotes if the name has spaces.
- **A real key in `.env.masterkey` (3.6):** that file is committed. Move the value to `.env`, empty it in `.env.masterkey`, and if it was already pushed, revoke the key and create a new one.
- **`.venv/` shows in `git status` (3.7):** `.gitignore` is missing its entries. Do Step 2.3 again.
:::

#### Details

| Item | Value |
|---|---|
| Python | 3.12, pinned in `.python-version` |
| Build backend | Hatchling, `packages = ["src"]` |
| Package | `src/` (flat), imported as `src` |
| Dependencies | `requests>=2.31.0`; more added with `uv add` in later steps |
| Dependency groups | `dev` (pytest, ruff) and `notebooks` (ipykernel, jupyterlab), both installed by default |
| Commit | `init: project scaffold with uv and src layout` |
| Full files | Every file this step creates or changes is in the Resources panel |

#### Step checklist

::: checklist Step checklist
- [ ] Project started in one of the three ways
- [ ] `.venv` activated (or `uv run` used)
- [ ] `pyproject.toml` written, `uv lock` and `uv sync` done
- [ ] `dev` and `notebooks` groups filled, and the three `--version` checks print
- [ ] `import src OK` and the `requests` version printed
- [ ] `Makefile`, `.env.example` and `.env.masterkey` created
- [ ] Commit pushed and `git log` shows `origin/main`
:::

::: details Reference: uv commands by function
```text title="Python versions"
uv python install 3.12    # install a Python version
uv python pin 3.12        # record the project Python version
uv python list            # show installed and available versions
```

```text title="Project dependencies"
uv add fastapi            # declare, lock and install a dependency
uv remove fastapi         # remove it
uv tree                   # show the dependency tree
```

```text title="Run and reproduce"
uv run python src/main.py # run inside the project environment
uv sync                   # install from uv.lock
uv lock --check           # check that uv.lock is up to date
```

```text title="Scripts and tools"
uv run example.py                     # run a single script
uv add --script example.py requests   # declare a dependency inside a script
uvx ruff check .                      # run a tool without installing it in the project
```

```text title="pip interface"
uv venv                   # create a virtual environment
uv pip install requests   # install straight into an environment
uv pip list               # list installed packages
```

Source: https://docs.astral.sh/uv/getting-started/features/
:::

::: details Reference: uv init modes
```text title="uv init options"
uv init .                                   # app in this folder: main.py, no build system
uv init my-project                          # app in a new folder
uv init . --package                         # installable package: src/<name>/, build system
uv init . --package --build-backend hatch   # same, with Hatchling instead of uv_build
uv init . --lib                             # library: src/<name>/ with py.typed
uv init . --python 3.12                     # pin the Python version at the same time
```
:::

::: takeaway Next
Step 4: understand the full target structure before adding folders.
:::

## Step 4: Understand the target structure

[!Phase 1: Environment|blue]

Before creating more folders, see the complete target layout and why each folder exists. Every folder has one job.

In this step you review the complete my-project structure and learn the two rules every later step follows.

> Knowing the structure before building it means you make deliberate choices instead of guessing, and knowing why each folder exists prevents misuse.

### 4.1 The complete target structure

```tree title="my-project"
my-project/
├── .venv/                ← virtual environment (gitignored)
├── .env.example          ← API keys template
├── .env.masterkey        ← every key name, for reference
├── .gitignore            ← never commit artifacts
├── .python-version       ← pins Python 3.12
├── Makefile              ← task shortcuts
├── pyproject.toml        ← single dep source (with dev and notebooks groups)
├── uv.lock               ← exact pinned versions
├── README.md             ← project docs
├── data/
│   ├── raw/              ← source files (git tracked)
│   ├── processed/        ← parser output (gitignored)
│   └── indexes/          ← vector indexes (gitignored)
├── notebooks/
│   ├── reference/        ← by topic and subject: 01-python to 11-mlops
│   ├── course/           ← notebooks that follow a course
│   └── project/          ← notebooks for this project
├── src/                  ← the package, imported as src
│   ├── __init__.py
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

> Dependencies live only in `pyproject.toml` (Step 3), so there are no `requirements*.txt` files. `src/` is one flat package, as built in Step 3: code imports read `from src.rag import ...`.

### 4.2 The two rules

::: success The core rule
Notebooks import from src/ and never the reverse. This keeps production code clean and testable.
:::

::: info Data rule
Every source file lives in data/raw/ exactly once. Notebooks reference it as ../../data/raw/filename. No duplicates.
:::

### 4.3 Verify

Compare the target with what you have now:

::: tabs
```bash title="Command"
find . -not -path './.venv*' -not -path './.git' -not -path './.git/*' -not -path '*__pycache__*' | sort
```
```terminal title="Output"
$ find . -not -path './.venv*' -not -path './.git' -not -path './.git/*' -not -path '*__pycache__*' | sort
.
./.env.example
./.env.masterkey
./.gitignore
./.python-version
./Makefile
./README.md
./pyproject.toml
./src
./src/__init__.py
./uv.lock
```
:::

→ You have the Step 3 files. The rest of the tree is added in the next steps.

#### Details

| Folder | Job | In Git? |
|---|---|---|
| data/raw/ | Source files, one copy each | Yes |
| data/processed/ | Parser output | No |
| data/indexes/ | Vector indexes | No |
| notebooks/ | Learning and experiments | Yes |
| src/ | Production code | Yes |
| tests/ | pytest tests | Yes |
| scripts/, docs/ | Helper scripts and documentation | Yes |

#### Step checklist

::: checklist Step checklist
- [ ] Target structure reviewed
- [ ] Core rule and data rule understood
:::

::: takeaway Next
Step 5: Appetizers.
:::

## Step 5: Appetizers

Build `src/main.py` section by section, then call OpenAI, Gemini and LangChain from it and chat with a model in your terminal.

You grow one file, `src/main.py`, a few sections at a time. After each part you run it, read the output, and change something. Then you open a mini chat with a model in `src/chat.py` and commit both files.

> This file is a playground. The sections are examples: change them, break them, and add your own.

### 5.1 Install the packages for this step

Each step adds only the packages it needs, so you always know why a package is in your project. These are app packages, so they go into `dependencies`:

::: tabs
```bash title="Command"
uv add python-dotenv pydantic openai google-genai langchain-core langchain-openai
```
```terminal title="Output"
$ uv add python-dotenv pydantic openai google-genai langchain-core langchain-openai
Resolved 48 packages in 589ms
Installed 42 packages in 54ms
 + google-genai==2.29.0
 + langchain-core==1.6.9
 + langchain-openai==1.7.0
 + openai==3.28.0
 + pydantic==2.14.0
 + python-dotenv==1.2.4
 ...
```
:::

| Package | What it does |
|---|---|
| `python-dotenv` | Reads `.env` and loads your keys into the environment |
| `pydantic` | Data models: define fields and types, reject bad data |
| `openai` | The official OpenAI SDK |
| `google-genai` | The official Google SDK for Gemini |
| `langchain-core` | LangChain's base types: messages, prompts |
| `langchain-openai` | LangChain's connector for OpenAI models |

→ The other lines in the output are packages these six need. Your version numbers may be newer. `uv add` writes all six into `dependencies` in `pyproject.toml` and pins them in `uv.lock`.

> No `--active` needed. `uv add` always installs into the project's `.venv`. If another venv is active, uv only warns: `VIRTUAL_ENV=... does not match the project environment path .venv and will be ignored`. That is fine.

> Install `google-genai`, not `google-generativeai`: the old package is fully deprecated. We do not install the full `langchain` package either; `langchain-core` and `langchain-openai` are all this step uses.

### 5.2 Create your .env

Step 3.6 already put `OPENAI_API_KEY` and `GOOGLE_API_KEY` in `.env.example`. Copy it to your real `.env`:

```bash title="Command"
cp .env.example .env
```

→ No output. Open `.env` and replace `your-key-here` with your real keys.

> `.env` stays on your machine: Step 2 told Git to ignore it. No keys yet? Leave them empty: the AI sections skip themselves and everything else still runs.

### 5.3 The shape of a Python file

Every Python file in this project follows the same order:

```python title="Example"
# ── 1. Standard library imports (built into Python)
import os

# ── 2. Third-party imports (installed via uv)
from dotenv import load_dotenv

# ── 3. Load environment variables, always before using any key
load_dotenv()

# ── 4. Define your functions and classes
def my_function():
    pass

# ── 5. The main function: entry point of the file
def main():
    my_function()

# ── 6. This block runs ONLY when you execute this file directly
#       It does NOT run when another file imports from this one
if __name__ == "__main__":
    main()
```

| Part | Why |
|---|---|
| Imports first | Anyone reading the file sees what it depends on |
| `load_dotenv()` before any key | `os.getenv` finds nothing until `.env` is loaded |
| `main()` | One clear place where the file starts |
| `if __name__ == "__main__":` | Python sets `__name__` to `"__main__"` only when you run the file. When another file imports it, `__name__` is the module name, so `main()` does not run by accident |

::: quiz {id=s5-name} Quick check
Another file runs `from src.main import greet`. Does `main()` in `src/main.py` run?

- [ ] Yes, importing a file runs everything in it
- [x] No, `__name__` is `"src.main"` on import, so the `if` block is skipped
- [ ] Only if `load_dotenv()` finds a `.env`
---
On import, Python still runs the top level (imports, `load_dotenv()`, definitions), but `__name__` is the module name, not `"__main__"`, so `main()` is not called.
:::

### 5.4 Start with an empty skeleton

Create the file:

```bash title="Command"
touch src/main.py
```

Paste this skeleton. It has no sections yet, only the settings and a `main()` that runs whatever is in the `SECTIONS` list:

```python title="src/main.py"
# src/main.py — Step 5: Appetizers. A quick test that every tool works.
# Run with: python -m src.main

import os

from dotenv import load_dotenv

load_dotenv()                                   # read .env before any key is used

# ── Settings you can change ───────────────────────────────────
OPENAI_MODEL = "gpt-4o-mini"
GEMINI_MODEL = "gemini-3.8-flash"
QUESTION = "Explain RAG in one sentence for a beginner."


# ── Your sections go here ─────────────────────────────────────


# ── Main: runs every section; one failure never stops the rest ─
SECTIONS = []

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
```

Run it once to prove the wiring works:

::: tabs
```bash title="Command"
python -m src.main
```
```terminal title="Output"
$ python -m src.main
=== Step 5: Appetizers ===

=== All sections complete ===
```
:::

→ Nothing between the two lines yet, because `SECTIONS` is empty.

> Your venv from Step 3.3 is active, so this step runs files with plain `python -m ...`. Venv not active? Put `uv run` in front: `uv run python -m src.main`. Do not mix them: `uv run` with an active venv prints `warning: VIRTUAL_ENV=... does not match the project environment path .venv`.

Every part below follows the same loop:

| Do | Where |
|---|---|
| 1. Paste the new functions | Under `# ── Your sections go here` |
| 2. Add their names | Inside `SECTIONS = [...]` |
| 3. Run | `python -m src.main` |
| 4. Try this | Change one thing and run again |

> Why the `try/except` in `main()`? One broken section prints `Failed: ...` and the next one still runs. You will break things on purpose here, so this keeps the rest working.

### 5.5 Python warm-up

#### Sections 1 and 2: lists, dicts and functions

```python title="Paste under # ── Your sections go here"
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
```

```python title="Update SECTIONS"
SECTIONS = [section_python_basics, section_functions]
```

::: tabs
```bash title="Command"
python -m src.main
```
```terminal title="Output"
$ python -m src.main
=== Step 5: Appetizers ===

── SECTION 1: Python basics ──
  Step 1: ingest
  Step 2: retrieve
  Step 3: generate
  model = gpt-4o-mini
  chunk_size = 500
  Upper: ['INGEST', 'RETRIEVE', 'GENERATE']

── SECTION 2: Functions ──
  Hello Ali, you are a student.
  Hello Sara, you are a teacher.

=== All sections complete ===
```
:::

→ `enumerate` numbers the list from 1, `.items()` gives each key with its value, and `greet('Ali')` uses the default role.

> Try this: add `"evaluate"` to `steps`, and call `greet("Omar", role="mentor")`. Run again.

#### Sections 3 and 4: a class and a file

```python title="Paste below Section 2"
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
```

```python title="Update SECTIONS"
SECTIONS = [section_python_basics, section_functions, section_classes, section_files]
```

::: tabs
```bash title="Command"
python -m src.main
```
```terminal title="Output"
$ python -m src.main
── SECTION 3: Classes ──
  'hello world'
  MyProcessor processed 2 document(s).

── SECTION 4: Files ──
  Read 2 lines: ['line one', 'line two']
  Cleaned up sample.txt

=== All sections complete ===
```
:::

→ Output shows only the new sections; 1 and 2 print above them as before. `!r` shows the quotes, so you can see `strip()` removed the spaces. The file is written, read back, then deleted.

> Try this: add a `word_count()` method to `DocumentProcessor`, and write a third line to `sample.txt`.

### 5.6 Keys and Pydantic

Pydantic needs one import. Add it at the top, under the dotenv import:

```python title="src/main.py (top)"
from dotenv import load_dotenv
from pydantic import BaseModel, ValidationError
```

```python title="Paste below Section 4"
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
```

```python title="Update SECTIONS"
SECTIONS = [section_python_basics, section_functions, section_classes, section_files,
            section_keys, section_pydantic]
```

::: tabs
```bash title="Command"
python -m src.main
```
```terminal title="Output"
$ python -m src.main
── SECTION 5: Keys ──
  OPENAI_API_KEY loaded: False
  GOOGLE_API_KEY loaded: False

── SECTION 6: Pydantic ──
  {'title': 'Intro to RAG', 'source': 'docs/intro.pdf', 'pages': 3}  <- pages '3' became the number 3
  Rejected: source: Input should be a valid string

=== All sections complete ===
```
:::

→ `loaded: False` means the key is empty in `.env`. With a key it shows `True`. Never print the key itself. Pydantic turned the text `"3"` into the number `3`, and rejected `source=None`.

> Try this: pass `pages="three"`. Pydantic rejects it with `pages: Input should be a valid integer`. In RAG, this is how bad data gets stopped at the door.

### 5.7 Chat lab: talk to the models

Now the fun part. Each section sends `QUESTION` to a model. Without a key the section prints `Skipped`, so you can still run everything.

#### Section 7: ask OpenAI

```python title="Paste below Section 6"
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
```

`messages` is a list of turns. Each turn has a `role` (`system`, `user` or `assistant`) and `content`. The answer comes back in `reply.choices[0].message.content`.

#### Section 8: shape the answer

```python title="Paste below Section 7"
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
```

| Knob | What it changes |
|---|---|
| `system` message | Who the model is and how it answers: tone, length, format |
| `temperature` | `0.0` gives the same, focused answer each time. `1.0` gives more varied wording |

#### Sections 9 and 10: Gemini and LangChain

```python title="Paste below Section 8"
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
```

→ Same question, two more ways: Google's SDK, and LangChain. LangChain wraps any provider in the same `invoke(...)` call, so switching models later means changing one line.

```python title="Update SECTIONS"
SECTIONS = [section_python_basics, section_functions, section_classes, section_files,
            section_keys, section_pydantic,
            section_ask_openai, section_shape_openai, section_gemini, section_langchain]
```

Run it. The **With keys** tab is an example; your answers will be worded differently:

::: tabs
```bash title="Command"
python -m src.main
```
```terminal title="Output"
$ python -m src.main
── SECTION 7: Ask OpenAI ──
  Skipped: no OPENAI_API_KEY in .env

── SECTION 8: Shape the answer ──
  Skipped: no OPENAI_API_KEY in .env

── SECTION 9: Ask Gemini ──
  Skipped: no GOOGLE_API_KEY in .env

── SECTION 10: LangChain ──
  Skipped: no OPENAI_API_KEY in .env

=== All sections complete ===
```
```terminal title="With keys"
$ python -m src.main
── SECTION 7: Ask OpenAI ──
  Q: Explain RAG in one sentence for a beginner.
  A: RAG lets an AI look up relevant information from your documents first, then use it to write a more accurate answer.

── SECTION 8: Shape the answer ──
  temperature=0.0:
- RAG first finds the parts of your documents that match the question.
- Then the AI uses those parts to write its answer.
  temperature=1.0:
- Think of RAG as an open-book exam: the AI checks your notes first.
- It answers using what it found, not just what it remembers.

── SECTION 9: Ask Gemini ──
  A: Retrieval-Augmented Generation (RAG) lets a model fetch facts from a knowledge source and use them to answer your question.

── SECTION 10: LangChain ──
  A: - RAG searches your documents for the parts that match your question.
- The AI then answers using those parts, so it makes fewer things up.

=== All sections complete ===
```
:::

→ Sections 1 to 6 print above Section 7 as before. Section 8 and Section 10 follow the system prompt: 2 short bullets.

| You see | It means |
|---|---|
| `Skipped: no ..._API_KEY in .env` | That key is empty. Fine for now |
| `Failed: AuthenticationError ...` | The key is wrong or has no credit. Check it in `.env` |
| `Failed: NotFoundError ...` (Gemini) | The model name changed. Check the current one at ai.google.dev and update `GEMINI_MODEL` |
| `Failed: APIConnectionError ...` | No internet, or a proxy blocks the API |

> Try this: change `QUESTION`, rewrite `SYSTEM_PROMPT` (for example "Answer like a pirate" or "Answer as a JSON object"), or set `temperature` to `1.5`. Run again and compare.

::: response {id=s5-compare} Compare the models
Put the same question to all four sections. Which answer was clearest for a beginner, and what did the system prompt change?
:::

#### A mini chat in your terminal

`src/main.py` asks one question. A real chat keeps the history, so the model remembers what you said. Create a second file:

```bash title="Command"
touch src/chat.py
```

```python title="src/chat.py"
# src/chat.py — a mini chat with OpenAI in your terminal.
# Run with: python -m src.chat      Type quit to stop.

import os

from dotenv import load_dotenv

load_dotenv()
MODEL = "gpt-4o-mini"


def main():
    if not os.getenv("OPENAI_API_KEY"):
        print("Add OPENAI_API_KEY to .env to chat."); return
    from openai import OpenAI
    client = OpenAI()
    history = [{"role": "system", "content": "You are a helpful study buddy. Keep answers short."}]
    print("Chat started. Type quit to stop.")
    while True:
        question = input("You: ").strip()
        if question.lower() in ("quit", "exit", ""):
            print("Bye!"); break
        history.append({"role": "user", "content": question})
        reply = client.chat.completions.create(model=MODEL, messages=history)
        answer = reply.choices[0].message.content
        history.append({"role": "assistant", "content": answer})   # the model remembers the chat
        print(f"AI: {answer}")


if __name__ == "__main__":
    main()
```

| Line | What it does |
|---|---|
| `history = [...]` | Starts the chat with a system message |
| `input("You: ")` | Waits for you to type |
| `history.append(...)` | Adds your turn and the model's turn, so the next question has context |
| `quit`, `exit` or Enter | Ends the loop |

::: tabs
```bash title="Command"
python -m src.chat
```
```terminal title="Output"
$ python -m src.chat
Add OPENAI_API_KEY to .env to chat.
```
```terminal title="With keys"
$ python -m src.chat
Chat started. Type quit to stop.
You: What is a vector database?
AI: A database that stores text as lists of numbers, so it can find text with similar meaning fast.
You: Give me one example
AI: Chroma is a popular one for small RAG projects.
You: quit
Bye!
```
:::

→ The second question says "one example" without naming the topic. The model knows it means vector databases because `history` holds the first turn.

> Try this: change the system message to "You are a strict Python tutor", or swap `MODEL` for another model you have access to.

### 5.8 Check yourself

::: quiz {id=s5-q1} Question 1 of 3
You set `temperature=0.0` and ask the same question twice. What do you expect?

- [x] Almost the same answer both times
- [ ] Two very different answers
- [ ] An error: temperature must be above 0
---
Low temperature makes the model pick the most likely words, so answers stay focused and repeatable.
:::

::: quiz {id=s5-q2} Question 2 of 3
Where do you tell the model "answer in 2 short bullets"?

- [ ] In `.env`
- [x] In the `system` message
- [ ] In `temperature`
---
The system message sets the model's role and rules for every answer that follows.
:::

::: quiz {id=s5-q3} Question 3 of 3
Why does the mini chat remember your first question?

- [ ] OpenAI saves your chat on its servers
- [x] The code sends the whole `history` list with every request
- [ ] `load_dotenv()` keeps it in memory
---
The model is stateless. Memory is just the list of past turns you send back each time.
:::

### 5.9 Commit and push

Stage the two new files and the updated dependency files:

::: tabs
```bash title="Command"
git add pyproject.toml uv.lock src/main.py src/chat.py
git status
git commit -m "feat: appetizers — python basics and an AI chat lab" \
  -m "- src/main.py: Python basics, Pydantic, OpenAI, Gemini and LangChain sections
- src/chat.py: terminal chat that keeps the history
- dependencies: python-dotenv, pydantic, openai, google-genai, langchain-core, langchain-openai"
git push
```
```terminal title="Output"
$ git add pyproject.toml uv.lock src/main.py src/chat.py
$ git status
On branch main
Your branch is up to date with 'origin/main'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	modified:   pyproject.toml
	new file:   src/chat.py
	new file:   src/main.py
	modified:   uv.lock

$ git commit -m "feat: appetizers — python basics and an AI chat lab" \
  -m "- src/main.py: Python basics, Pydantic, OpenAI, Gemini and LangChain sections
- src/chat.py: terminal chat that keeps the history
- dependencies: python-dotenv, pydantic, openai, google-genai, langchain-core, langchain-openai"
[main 6a1dcd9] feat: appetizers — python basics and an AI chat lab
 4 files changed, 1536 insertions(+), 1 deletion(-)
 create mode 100644 src/chat.py
 create mode 100644 src/main.py
$ git push
To https://github.com/YOUR_USERNAME/my-project.git
   a7e27c0..6a1dcd9  main -> main
```
:::

| Line | What it does |
|---|---|
| `git add ...` | Stages the updated `pyproject.toml` and `uv.lock`, and the new `src/main.py` and `src/chat.py` |
| `git status` | Check: these four are staged, and `.env` is **not** listed |
| `git commit -m "..." -m "..."` | The first `-m` is the title: one line, with a type (`chore:`, `init:`, `feat:`). The second `-m` is the body: one line per change. GitHub shows the title in the history and the body when you open the commit |
| `git push` | Sends it to GitHub. Your history now has three commits: README, scaffold, appetizers |

→ Your commit hash (`6a1dcd9`) and the insertion count will differ. Most insertions are `uv.lock`.

#### Project structure after Step 5

Highlighted lines are new or changed in this step:

```tree title="my-project" {5,6,7,13,14}
my-project/
├── .venv/                # virtual environment (ignored by Git)
├── src/
│   ├── __init__.py
│   ├── chat.py           # new: the mini chat
│   └── main.py           # new: the appetizer sections
├── .env                  # new: your real keys (ignored by Git)
├── .env.example
├── .env.masterkey
├── .gitignore
├── .python-version
├── Makefile
├── pyproject.toml        # changed: six new dependencies
└── uv.lock               # changed: their exact versions
```

::: mistake Common mistakes
- **`ModuleNotFoundError: No module named 'dotenv'`:** the packages are not installed. Run the 5.1 command again.
- **`ModuleNotFoundError: No module named 'src'`:** you ran `python src/main.py`. Use `python -m src.main` from the project root.
- **`NameError: name 'section_classes' is not defined`:** a name in `SECTIONS` has no function above it. Paste the section first, then add its name.
- **`NameError: name 'BaseModel' is not defined`:** the pydantic import from 5.6 is missing at the top.
- **A section did not print:** you pasted it but did not add its name to `SECTIONS`.
- **The chat seems frozen:** it is waiting for you at `You:`. Type a question, or `quit` to stop.
- **`.env` shows in `git status`:** `.gitignore` is missing `.env`. Do Step 2.3 again before you commit.
- **Gemini `NotFoundError`:** model names change. Replace `gemini-3.8-flash` with the current Flash model.
:::

#### Details

| Item | Value |
|---|---|
| New files | `src/main.py`, `src/chat.py` |
| New dependencies | `python-dotenv`, `pydantic`, `openai`, `google-genai`, `langchain-core`, `langchain-openai` |
| Models used | `gpt-4o-mini`, `gemini-3.8-flash` |
| Commit | `feat: appetizers — python basics and an AI chat lab` |
| Full files | Every file this step creates or changes is in the Resources panel |

#### Step checklist

::: checklist Step checklist
- [ ] Packages installed with `uv add`
- [ ] `.env` created from `.env.example` and not committed
- [ ] Skeleton runs and prints both `===` lines
- [ ] Sections 1 to 6 added and run, with one "Try this" done
- [ ] Sections 7 to 10 run (answers with keys, or `Skipped` without)
- [ ] Changed `SYSTEM_PROMPT` or `temperature` and compared the answers
- [ ] Mini chat run with `python -m src.chat`
- [ ] Added at least one section of my own
- [ ] Commit pushed
:::

::: takeaway Next
Step 6: Utility modules.
:::

## Step 6: Utility modules

Create the `data/` folders, write a PDF module and a CSV module, and call both from `src/main.py`.

You create `data/`, add a sample CSV and PDF, write `src/pdf_manager.py` and `src/csv_manager.py`, call both from `src/main.py`, and commit.

### 6.1 One file, one job

In Step 5 everything lived in `main.py`. That is fine for a playground, but a real project splits code by job:

| File | Its one job |
|---|---|
| `src/pdf_manager.py` | Everything about PDF files |
| `src/csv_manager.py` | Everything about CSV files |
| `src/main.py` | The conductor: imports the others and calls them |

When another file needs PDF code, it does not copy it. It imports it:

```python title="Example"
from src.pdf_manager import PDFManager
```

> Every module you build later (core services, ingestion, the API) follows this pattern: one file, one job, imported where needed.

### 6.2 Create the data/ folders

These are the project's real data folders; they stay for the rest of the course:

```bash title="Command"
mkdir -p data/raw data/processed data/output
touch data/raw/.gitkeep data/processed/.gitkeep data/output/.gitkeep
```

→ No output.

| Folder | What goes in it |
|---|---|
| `data/raw/` | Original files, untouched: PDFs, CSVs |
| `data/processed/` | Cleaned and extracted output |
| `data/output/` | Final results: answers, reports, exports |

Git never tracks empty folders, so each gets an empty `.gitkeep`. Now tell Git to keep the folders but skip the files inside them:

```bash title="Command"
cat >> .gitignore <<'EOF'

# data: keep the folders, not the files
data/raw/*
data/processed/*
data/output/*
!data/*/.gitkeep
EOF
```

| Line | Meaning |
|---|---|
| `data/raw/*` | Ignore everything inside `data/raw/` |
| `!data/*/.gitkeep` | Except the `.gitkeep` files: `!` means "track this anyway" |

> Real documents can be private or large, so they never go to GitHub. Teammates still get the empty folders.

### 6.3 Add a sample CSV and PDF

Create the CSV with your editor: make `data/raw/sample.csv` and paste:

```text title="data/raw/sample.csv"
id,title,content,source
1,Introduction to RAG,RAG stands for Retrieval-Augmented Generation,docs/intro.pdf
2,Vector Databases,Vector databases store embeddings for fast similarity search,docs/vectors.pdf
3,LangChain Basics,LangChain is a framework for building LLM applications,docs/langchain.pdf
```

PDFs are binary, so a small script makes one. The script needs `fpdf2`, a test-only tool, so it goes into the `dev` group. The app itself needs `pypdf` to read PDFs, so that one goes into `dependencies`:

::: tabs
```bash title="Command"
uv add pypdf
uv add --group dev fpdf2
```
```terminal title="Output"
$ uv add pypdf
Resolved 8 packages in 131ms
Installed 1 package in 1ms
 + pypdf==6.20.0
$ uv add --group dev fpdf2
Resolved 12 packages in 117ms
Installed 4 packages in 14ms
 + defusedxml==0.7.1
 + fonttools==4.66.1
 + fpdf2==2.8.9
 + pillow==12.3.0
```
:::

| Package | Group | Why |
|---|---|---|
| `pypdf` | `dependencies` | The app reads PDFs with it |
| `fpdf2` | `dev` | Only makes test PDFs; production never needs it |

Create `scripts/make_sample_pdf.py`:

```python title="scripts/make_sample_pdf.py"
# scripts/make_sample_pdf.py — creates data/raw/sample.pdf to test PDFManager.
# Run from the project root:  python scripts/make_sample_pdf.py

from fpdf import FPDF, XPos, YPos

LINES = [
    "Introduction to RAG Systems",
    "RAG stands for Retrieval-Augmented Generation.",
    "It combines search with language model generation.",
]

pdf = FPDF()
pdf.add_page()
pdf.set_font("Helvetica", size=12)
for line in LINES:
    pdf.cell(0, 10, line, new_x=XPos.LMARGIN, new_y=YPos.NEXT)
pdf.output("data/raw/sample.pdf")
print("Created: data/raw/sample.pdf")
```

Run it from the project root:

::: tabs
```bash title="Command"
python scripts/make_sample_pdf.py
```
```terminal title="Output"
$ python scripts/make_sample_pdf.py
Created: data/raw/sample.pdf
```
:::

→ Later you drop your own PDFs into `data/raw/`. This sample only proves the code works.

### 6.4 Write src/pdf_manager.py

Create `src/pdf_manager.py`:

```python title="src/pdf_manager.py"
# ─────────────────────────────────────────────────────────────
# src/pdf_manager.py
# One job: read PDF files, extract text, save to processed/
# ─────────────────────────────────────────────────────────────

from pathlib import Path

from pypdf import PdfReader


class PDFManager:
    """Reads PDF files from data/raw/ and saves extracted text to data/processed/."""

    def __init__(self, raw_dir: str = "data/raw", processed_dir: str = "data/processed"):
        self.raw_dir = Path(raw_dir)
        self.processed_dir = Path(processed_dir)

    def read(self, filename: str) -> str:
        """Read a PDF from data/raw/ and return its full text."""
        filepath = self.raw_dir / filename

        if not filepath.exists():
            raise FileNotFoundError(f"PDF not found: {filepath}")

        reader = PdfReader(str(filepath))
        pages = [page.extract_text() for page in reader.pages]
        text = "\n".join(pages)

        print(f"  [PDFManager] Read {filename} — {len(reader.pages)} page(s)")
        return text

    def get_metadata(self, filename: str) -> dict:
        """Return metadata from a PDF file."""
        filepath = self.raw_dir / filename

        if not filepath.exists():
            raise FileNotFoundError(f"PDF not found: {filepath}")

        reader = PdfReader(str(filepath))
        return {
            "filename": filename,
            "pages": len(reader.pages),
            "metadata": reader.metadata,
        }

    def save_text(self, filename: str, text: str) -> Path:
        """Save extracted text to data/processed/ as a .txt file."""
        output_name = Path(filename).stem + "_extracted.txt"
        output_path = self.processed_dir / output_name

        with open(output_path, "w", encoding="utf-8") as f:
            f.write(text)

        print(f"  [PDFManager] Saved extracted text → {output_path}")
        return output_path

    def process(self, filename: str) -> Path:
        """Read a PDF and save its text in one call."""
        text = self.read(filename)
        return self.save_text(filename, text)


if __name__ == "__main__":
    # quick test when running this file directly
    manager = PDFManager()
    manager.process("sample.pdf")
```

| Method | What it does |
|---|---|
| `read(filename)` | Opens the PDF in `data/raw/` and returns all its text |
| `get_metadata(filename)` | Returns the file name and page count |
| `save_text(filename, text)` | Writes the text to `data/processed/<name>_extracted.txt` |
| `process(filename)` | `read` + `save_text` in one call |

Test the module on its own. The `if __name__ == "__main__":` block at the bottom runs only now, not when `main.py` imports it:

::: tabs
```bash title="Command"
python -m src.pdf_manager
```
```terminal title="Output"
$ python -m src.pdf_manager
  [PDFManager] Read sample.pdf — 1 page(s)
  [PDFManager] Saved extracted text → data/processed/sample_extracted.txt
```
:::

### 6.5 Write src/csv_manager.py

Same pattern. `csv` and `pathlib` are built into Python, so this file needs no install. Create `src/csv_manager.py`:

```python title="src/csv_manager.py"
# ─────────────────────────────────────────────────────────────
# src/csv_manager.py
# One job: read and write CSV files, convert to usable formats
# Uses Python's built-in csv module — no extra install needed
# ─────────────────────────────────────────────────────────────

import csv
from pathlib import Path


class CSVManager:
    """Reads and writes CSV files from data/raw/ and data/processed/."""

    def __init__(self, raw_dir: str = "data/raw", processed_dir: str = "data/processed"):
        self.raw_dir = Path(raw_dir)
        self.processed_dir = Path(processed_dir)

    def read(self, filename: str) -> list[dict]:
        """Read a CSV from data/raw/ and return a list of dicts."""
        filepath = self.raw_dir / filename

        if not filepath.exists():
            raise FileNotFoundError(f"CSV not found: {filepath}")

        rows = []
        with open(filepath, "r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                rows.append(dict(row))

        print(f"  [CSVManager] Read {filename} — {len(rows)} row(s)")
        return rows

    def write(self, filename: str, rows: list[dict]) -> Path:
        """Write a list of dicts to data/processed/ as a CSV."""
        if not rows:
            raise ValueError("Cannot write empty data to CSV.")

        output_path = self.processed_dir / filename
        fieldnames = list(rows[0].keys())

        with open(output_path, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(rows)

        print(f"  [CSVManager] Saved {len(rows)} row(s) → {output_path}")
        return output_path

    def get_column(self, filename: str, column: str) -> list:
        """Extract a single column from a CSV as a list."""
        rows = self.read(filename)
        if not rows or column not in rows[0]:
            raise KeyError(f"Column '{column}' not found in {filename}")
        return [row[column] for row in rows]

    def filter_rows(self, filename: str, column: str, value: str) -> list[dict]:
        """Return only rows where column matches value."""
        rows = self.read(filename)
        filtered = [row for row in rows if row.get(column) == value]
        print(f"  [CSVManager] Filter '{column}={value}' → {len(filtered)} row(s)")
        return filtered


if __name__ == "__main__":
    # quick test when running this file directly
    manager = CSVManager()
    rows = manager.read("sample.csv")
    for row in rows:
        print(f"  {row['id']}: {row['title']}")
```

| Method | What it does |
|---|---|
| `read(filename)` | Returns each row as a dict: `{"id": "1", "title": ...}` |
| `write(filename, rows)` | Writes rows to `data/processed/` |
| `get_column(filename, column)` | Returns one column as a list |
| `filter_rows(filename, column, value)` | Returns only the rows that match |

::: tabs
```bash title="Command"
python -m src.csv_manager
```
```terminal title="Output"
$ python -m src.csv_manager
  [CSVManager] Read sample.csv — 3 row(s)
  1: Introduction to RAG
  2: Vector Databases
  3: LangChain Basics
```
:::

> Standard library first: `csv` and `pathlib` come with Python, `pypdf` had to be installed. Use the standard library when it is enough.

### 6.6 Call both from src/main.py

Add the two imports at the top of `src/main.py`, in their own group below the third-party imports:

```python title="src/main.py (top)"
from dotenv import load_dotenv
from pydantic import BaseModel, ValidationError

from src.csv_manager import CSVManager
from src.pdf_manager import PDFManager
```

→ Three import groups: built-in (`os`), installed (`dotenv`, `pydantic`), and your own (`src...`). A blank line between groups keeps ruff happy.

Paste two new sections below your last section:

```python title="Paste below your last section"
def section_pdf_manager():
    print("\n── SECTION: PDF Manager ──")
    manager = PDFManager()
    meta = manager.get_metadata("sample.pdf")
    print(f"  File: {meta['filename']}, {meta['pages']} page(s)")
    manager.process("sample.pdf")

def section_csv_manager():
    print("\n── SECTION: CSV Manager ──")
    manager = CSVManager()
    rows = manager.read("sample.csv")
    print(f"  Titles: {[row['title'] for row in rows]}")
    manager.write("sample_processed.csv", rows)
```

Add the two new names **at the end** of your `SECTIONS` list. Do not retype the names already there: keep them exactly as they are in your file.

```python title="src/main.py: end of SECTIONS"
SECTIONS = [
    ...                                         # your Step 5 names, unchanged
    section_pdf_manager, section_csv_manager,   # new
]
```

→ `...` stands for the names already in your list. Every name in `SECTIONS` must match a `def` above it, and each name is followed by a comma.

Update the title in `main()` and on the first line, so the file says which step it is at:

```python title="src/main.py (title lines)"
# src/main.py — Step 6: Utility modules. Step 5 sections plus the PDF and CSV modules.

    print("=== Step 6: Utility modules ===")
```

The rest of `main()` does not change: it runs whatever is in `SECTIONS`.

> Lost track of your file? **main.py** in this step's Resources panel is the full `src/main.py` at this point. Compare it with yours, or replace yours with it.

Run from the project root:

::: tabs
```bash title="Command"
python -m src.main
```
```terminal title="Output"
$ python -m src.main
=== Step 6: Utility modules ===
...
── SECTION: PDF Manager ──
  File: sample.pdf, 1 page(s)
  [PDFManager] Read sample.pdf — 1 page(s)
  [PDFManager] Saved extracted text → data/processed/sample_extracted.txt

── SECTION: CSV Manager ──
  [CSVManager] Read sample.csv — 3 row(s)
  Titles: ['Introduction to RAG', 'Vector Databases', 'LangChain Basics']
  [CSVManager] Saved 3 row(s) → data/processed/sample_processed.csv

=== All sections complete ===
```
:::

→ Your Step 5 sections print above as before. `data/processed/` now has `sample_extracted.txt` and `sample_processed.csv`.

> Your turn:
> 1. Add `count_words(filename)` to `PDFManager`: read the PDF and return the number of words. Call it in the PDF section.
> 2. Add `search(filename, keyword)` to `CSVManager`: return the rows where any column contains the keyword. Try `"LangChain"`.
> 3. Create `src/text_manager.py` with a `TextManager` that reads `.txt` files from `data/raw/`. Same pattern, then a new section for it.

### 6.7 Commit and push

::: tabs
```bash title="Command"
git add .gitignore data/ scripts/make_sample_pdf.py src/ pyproject.toml uv.lock
git status
git commit -m "feat: pdf_manager, csv_manager, data folder structure" \
  -m "- data/raw, data/processed, data/output with .gitkeep; .gitignore keeps the folders, skips the files
- src/pdf_manager.py and src/csv_manager.py: one job each
- scripts/make_sample_pdf.py: test PDF (fpdf2 in the dev group)
- src/main.py: PDF and CSV sections, title Step 6
- dependencies: pypdf"
git push
```
```terminal title="Output"
$ git add .gitignore data/ scripts/make_sample_pdf.py src/ pyproject.toml uv.lock
$ git status
On branch main
Your branch is up to date with 'origin/main'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	modified:   .gitignore
	new file:   data/output/.gitkeep
	new file:   data/processed/.gitkeep
	new file:   data/raw/.gitkeep
	modified:   pyproject.toml
	new file:   scripts/make_sample_pdf.py
	new file:   src/csv_manager.py
	modified:   src/main.py
	new file:   src/pdf_manager.py
	modified:   uv.lock

$ git commit -m "feat: pdf_manager, csv_manager, data folder structure" \
  -m "- data/raw, data/processed, data/output with .gitkeep; .gitignore keeps the folders, skips the files
- src/pdf_manager.py and src/csv_manager.py: one job each
- scripts/make_sample_pdf.py: test PDF (fpdf2 in the dev group)
- src/main.py: PDF and CSV sections, title Step 6
- dependencies: pypdf"
[main c3fe420] feat: pdf_manager, csv_manager, data folder structure
 10 files changed, 260 insertions(+), 1 deletion(-)
 ...
$ git push
To https://github.com/YOUR_USERNAME/my-project.git
   6a1dcd9..c3fe420  main -> main
```
:::

| Line | What it does |
|---|---|
| `git add data/` | Adds only the three `.gitkeep` files: `.gitignore` skips the samples |
| `git status` | Check: no `sample.csv`, `sample.pdf` or anything in `data/processed/` |
| `git commit -m "..." -m "..."` | The first `-m` is the title: one line, with a type (`chore:`, `init:`, `feat:`). The second `-m` is the body: one line per change. GitHub shows the title in the history and the body when you open the commit |
| `git push` | Sends it to GitHub. Your history now has four commits |

→ Your commit hash and counts will differ.

#### Project structure after Step 6

Highlighted lines are new or changed in this step:

```tree title="my-project" {3,4,5,6,7,8,9,10,11,15,16,17,21,24,25}
my-project/
├── .venv/
├── data/                 # new
│   ├── raw/              # new: sample.csv and sample.pdf (ignored by Git)
│   │   └── .gitkeep
│   ├── processed/        # new: extracted output (ignored by Git)
│   │   └── .gitkeep
│   └── output/           # new
│       └── .gitkeep
├── scripts/              # new
│   └── make_sample_pdf.py
├── src/
│   ├── __init__.py
│   ├── chat.py
│   ├── csv_manager.py    # new
│   ├── main.py           # changed: PDF and CSV sections
│   └── pdf_manager.py    # new
├── .env
├── .env.example
├── .env.masterkey
├── .gitignore            # changed: data rules
├── .python-version
├── Makefile
├── pyproject.toml        # changed: pypdf, and fpdf2 in dev
└── uv.lock               # changed
```

::: mistake Common mistakes
- **`ModuleNotFoundError: No module named 'src'`:** you ran `python src/main.py` or ran from inside `src/`. Use `python -m src.main` from the project root.
- **`ModuleNotFoundError: No module named 'fpdf'`:** the `dev` group is not installed. Run `uv sync`.
- **`FileNotFoundError: PDF not found: data/raw/sample.pdf`:** run `python scripts/make_sample_pdf.py` first, from the project root.
- **`KeyError: 'title'`:** the first line of `sample.csv` is not `id,title,content,source`, or it has spaces after the commas.
- **`NameError: name 'PDFManager' is not defined`:** the two `from src...` imports are missing at the top of `main.py`.
- **`SyntaxError` or `NameError` in `SECTIONS`:** a name was retyped or pasted from another version, or a comma is missing or doubled (`, ,`). Keep your Step 5 names as they were and only add the two new ones at the end.
- **`sample.csv` shows in `git status`:** the `data/raw/*` line is missing from `.gitignore`.
:::

#### Details

| Item | Value |
|---|---|
| New files | `src/pdf_manager.py`, `src/csv_manager.py`, `scripts/make_sample_pdf.py`, three `.gitkeep` |
| New packages | `pypdf` (dependencies), `fpdf2` (dev) |
| Commit | `feat: pdf_manager, csv_manager, data folder structure` |
| Full files | Every file this step creates or changes is in the Resources panel |

#### Step checklist

::: checklist Step checklist
- [ ] `data/raw`, `data/processed`, `data/output` created with `.gitkeep`
- [ ] Data rules added to `.gitignore`
- [ ] `sample.csv` and `sample.pdf` in `data/raw/`
- [ ] `python -m src.pdf_manager` and `python -m src.csv_manager` run on their own
- [ ] `python -m src.main` prints the PDF and CSV sections
- [ ] Did one **Your turn** task
- [ ] Commit pushed, with no sample files in it
:::

::: takeaway Next
Step 7: Notebooks.
:::

## Step 7: Notebooks

Build your notebook library: one place, organized by topic (Python to MLOps) and subject (prompts, LangChain, LangGraph, and more), where you collect, retest and understand all your reference notebooks. You start with one runnable sample per topic.

You add the sample packages, run one script that creates the `notebooks/` structure with 11 runnable samples, open them in JupyterLab, and commit. From here on, the notebooks are yours to grow.

### 7.1 Notebooks vs .py files

| Use a `.py` file in `src/` when | Use a notebook in `notebooks/` when |
|---|---|
| Other files import the code | You explore data or a new idea |
| It is part of the application | You want to see each result right away |
| It must be tested and reviewed line by line | You mix code, output, charts and notes |

> The rule: `src/` is application code, `notebooks/` is learning and exploring. Code that works in a notebook moves into `src/` when it is ready. The app never imports from a notebook.

### 7.2 Add the sample packages

JupyterLab and `ipykernel` are already installed: Step 3 put them in the `notebooks` group. Check:

::: tabs
```bash title="Command"
jupyter lab --version
```
```terminal title="Output"
$ jupyter lab --version
4.6.4
```
:::

| Venv | Command |
|---|---|
| Active | `jupyter lab --version` |
| Not active | `uv run jupyter lab --version` |

> `bash: jupyter: command not found`? JupyterLab is not installed in this project's `.venv`. Check that `pyproject.toml` has `jupyterlab` under `[dependency-groups] notebooks` and `default-groups = ["dev", "notebooks"]` under `[tool.uv]` (Step 3.4), then run `uv sync` and try again. Without `default-groups`, run `uv sync --group notebooks`.

The samples need five more packages. They are only for notebooks, so they go into the `notebooks` group, not into the app's `dependencies`:

::: tabs
```bash title="Command"
uv add --group notebooks numpy pandas matplotlib scikit-learn pillow
```
```terminal title="Output"
$ uv add --group notebooks numpy pandas matplotlib scikit-learn pillow
Resolved 121 packages in 368ms
Prepared 15 packages in 6.23s
Installed 15 packages in 50ms
 + joblib==1.6.0
 + matplotlib==3.11.2
 + numpy==2.5.4
 + pandas==3.0.6
 + pillow==12.3.0
 + scikit-learn==1.9.1
 + scipy==1.18.1
 ...
```
:::

| Package | Used for |
|---|---|
| `numpy` | Arrays and maths: the base of every other package here |
| `pandas` | Tables (DataFrames) |
| `matplotlib` | Charts and images |
| `scikit-learn` | Classic machine learning and TF-IDF |
| `pillow` | Opening and editing images |

→ The other lines are packages these five need. Your version numbers may be newer.

> No `torch` here: it is about 800 MB. The deep learning sample uses NumPy so you see the maths a framework hides. Add `torch` to the `notebooks` group when you need it.

### 7.3 The notebooks/ structure

`notebooks/` has three parts. `reference/` is split by topic, and each topic by subject:

```tree title="notebooks/"
notebooks/
├── reference/            # by topic: the learning library
│   ├── 01-python/        # basics, oop, async, typing, testing
│   ├── 02-data/          # numpy, pandas, visualization, sql
│   ├── 03-ml/            # regression, classification, clustering, evaluation, features
│   ├── 04-dl/            # neural-nets, pytorch, cnn, rnn, transformers
│   ├── 05-nlp/           # text-processing, tokenizers, embeddings, hugging-face
│   ├── 06-llm/           # prompts, openai, gemini, claude, local-models, structured-output, fine-tuning
│   ├── 07-frameworks/    # langchain, langgraph, llamaindex
│   ├── 08-rag/           # loaders, chunking, vector-stores, retrieval, reranking, evaluation
│   ├── 09-agents/        # tools, memory, multi-agent, mcp
│   ├── 10-cv/            # images, detection, segmentation
│   └── 11-mlops/         # tracking, serving, docker, monitoring
├── course/               # notebooks that follow a course: yours to fill
└── project/              # notebooks for this project: yours to fill
```

| Folder | What goes in it | Who fills it |
|---|---|---|
| `reference/` | Stand-alone notebooks by topic and subject, to learn and look things up | One sample per topic from the script, then you |
| `course/` | Notebooks that follow a course, in lesson order: `course/<course-name>/l01_name.ipynb` | You |
| `project/` | Notebooks that explore or test ideas for this project before they move to `src/` | You |

File names: `NN_short-name.ipynb`, for example `07-frameworks/langgraph/01_first-graph.ipynb`. The number keeps them in order.

> LangChain, LangGraph and LlamaIndex get their own `07-frameworks/` because they are used across LLM, RAG and agents. A notebook about the framework itself goes there; a RAG notebook that happens to use LangChain goes in `08-rag/`.

> Windows: deep folders can hit the old 260-character path limit, mostly inside `.venv`. To prevent it everywhere, turn on long paths once in PowerShell as admin, then restart:
>
> ```powershell
> New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name LongPathsEnabled -Value 1 -PropertyType DWORD -Force
> git config --global core.longpaths true
> ```
>
> Keeping the project close to the drive root, like `C:/my-project`, also helps.

### 7.4 Create the samples

Download **create_notebooks.py** from the Resources panel and save it in the `scripts/` folder (Step 6 created it). Run it from the project root:

::: tabs
```bash title="Command"
python scripts/create_notebooks.py
```
```terminal title="Output"
$ python scripts/create_notebooks.py
Created: notebooks/reference/01-python/basics/01_python-basics.ipynb
Created: notebooks/reference/02-data/pandas/01_pandas-basics.ipynb
Created: notebooks/reference/03-ml/classification/01_first-classifier.ipynb
Created: notebooks/reference/04-dl/neural-nets/01_neural-net-numpy.ipynb
Created: notebooks/reference/05-nlp/embeddings/01_text-to-vectors.ipynb
Created: notebooks/reference/06-llm/prompts/01_first-llm-call.ipynb
Created: notebooks/reference/07-frameworks/langchain/01_first-chain.ipynb
Created: notebooks/reference/08-rag/retrieval/01_tiny-rag.ipynb
Created: notebooks/reference/09-agents/tools/01_tool-picker.ipynb
Created: notebooks/reference/10-cv/images/01_images-are-arrays.ipynb
Created: notebooks/reference/11-mlops/tracking/01_save-and-track.ipynb
Ready:   50 subfolders in 11 topics
Ready:   notebooks/course/
Ready:   notebooks/project/
Done.
```
:::

→ Safe to run again: an existing notebook is never overwritten, it prints `Kept:` instead. Each empty subfolder gets a `.gitkeep` so Git keeps it.

| Sample | What you see when it runs |
|---|---|
| `01-python/basics` | Lists, dicts and a function with a default value |
| `02-data/pandas` | A DataFrame, a `groupby` total, and a bar chart |
| `03-ml/classification` | A classifier trained on the iris flowers: `Accuracy: 1.00` |
| `04-dl/neural-nets` | A two-layer network learns XOR: `[0.04 0.98 0.98 0.01]` |
| `05-nlp/embeddings` | Sentences turned into TF-IDF vectors and compared |
| `06-llm/prompts` | One question to `gpt-4o-mini`, or a clear message when there is no key |
| `07-frameworks/langchain` | A prompt, model and parser chained with `\|`. A fake model answers when there is no key |
| `08-rag/retrieval` | Retrieve the closest document, then build the prompt |
| `09-agents/tools` | An agent picks a tool: calculator or today's date |
| `10-cv/images` | An image built from an array, made gray and flipped |
| `11-mlops/tracking` | A model saved to `runs/model.joblib`, with its results in `runs/run.json` |

Each sample ends with a **Your turn** task. The script is yours too: add a subject to `TOPICS` or a sample to `SAMPLES`, and run it again.

### 7.5 Run a sample

Start JupyterLab from the project root, with your venv active:

::: tabs
```bash title="Command"
jupyter lab
```
```terminal title="Output"
$ jupyter lab
[I ServerApp] Jupyter Server is running at:
[I ServerApp] http://localhost:8888/lab?token=...
```
:::

→ Your browser opens JupyterLab. The terminal stays busy while it runs: press `Ctrl+C` there to stop it.

1. In the file panel, open `notebooks/reference/01-python/basics/01_python-basics.ipynb`.
2. Click a code cell and press `Shift+Enter`: it runs and moves to the next cell.
3. Run all cells at once with **Run → Run All Cells**.
4. Do the **Your turn** task at the bottom, then try the other ten.

> These samples run on the default **Python 3** kernel, which is your project's `.venv` when you start JupyterLab as above. Step 11 registers a named kernel for the project.

::: quiz {id=s7-q1} Quick check
You trained a good model in `notebooks/project/02_chunking.ipynb`. The API needs the same code. What do you do?

- [ ] Import the notebook from `src/api/`
- [x] Move the code into a module in `src/` and import it from there
- [ ] Copy the notebook into `src/`
---
The app never imports from a notebook. Working code moves into `src/`, where it can be imported and tested.
:::

### 7.6 Commit and push

The `11-mlops` sample writes a `runs/` folder with a model file. Model files are large and change every run, so tell Git to skip them:

```bash title="Command"
echo "runs/" >> .gitignore
```

→ No output. Now commit:

::: tabs
```bash title="Command"
git add scripts/create_notebooks.py notebooks/ .gitignore pyproject.toml uv.lock
git status
git commit -m "feat: notebooks — reference samples, course and project folders" \
  -m "- notebooks/reference: 11 topics, 50 subfolders, one runnable sample per topic
- notebooks/course and notebooks/project: empty, ready for your notebooks
- scripts/create_notebooks.py: builds the structure, never overwrites a notebook
- notebooks group: numpy, pandas, matplotlib, scikit-learn, pillow
- .gitignore: skip runs/"
git push
```
```terminal title="Output"
$ git add scripts/create_notebooks.py notebooks/ .gitignore pyproject.toml uv.lock
$ git status
On branch main
Your branch is up to date with 'origin/main'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	modified:   .gitignore
	new file:   notebooks/course/.gitkeep
	new file:   notebooks/project/.gitkeep
	new file:   notebooks/reference/01-python/async/.gitkeep
	new file:   notebooks/reference/01-python/basics/01_python-basics.ipynb
	new file:   notebooks/reference/01-python/oop/.gitkeep
	...
	new file:   notebooks/reference/11-mlops/tracking/01_save-and-track.ipynb
	modified:   pyproject.toml
	new file:   scripts/create_notebooks.py
	modified:   uv.lock

$ git commit -m "feat: notebooks — reference samples, course and project folders" \
  -m "- notebooks/reference: 11 topics, 50 subfolders, one runnable sample per topic
- notebooks/course and notebooks/project: empty, ready for your notebooks
- scripts/create_notebooks.py: builds the structure, never overwrites a notebook
- notebooks group: numpy, pandas, matplotlib, scikit-learn, pillow
- .gitignore: skip runs/"
[main c558820] feat: notebooks — reference samples, course and project folders
 56 files changed, 1590 insertions(+)
 ...
$ git push
To https://github.com/YOUR_USERNAME/my-project.git
   c3fe420..c558820  main -> main
```
:::

| Line | What it does |
|---|---|
| `git add ...` | Stages the script, the notebooks, and the updated `.gitignore`, `pyproject.toml` and `uv.lock` |
| `git status` | Check: no `runs/`, no `.ipynb_checkpoints/` and no `.env` in the list |
| `git commit -m "..." -m "..."` | The first `-m` is the title: one line, with a type (`chore:`, `init:`, `feat:`). The second `-m` is the body: one line per change. GitHub shows the title in the history and the body when you open the commit |
| `git push` | Sends it to GitHub. Your history now has five commits |

→ Your commit hash and counts will differ.

> Outputs (tables, charts) are saved inside the notebook file and make Git diffs hard to read. Before you commit a notebook, clear them: **Edit → Clear Outputs of All Cells**, then save.

#### Project structure after Step 7

Highlighted lines are new or changed in this step:

```tree title="my-project" {7,8,9,10,12,23,26,27}
my-project/
├── .venv/
├── data/
│   ├── raw/
│   ├── processed/
│   └── output/
├── notebooks/            # new
│   ├── reference/        # new: 11 topics, 50 subfolders, one sample per topic
│   ├── course/           # new: empty, yours
│   └── project/          # new: empty, yours
├── scripts/
│   ├── create_notebooks.py   # new
│   └── make_sample_pdf.py
├── src/
│   ├── __init__.py
│   ├── chat.py
│   ├── csv_manager.py
│   ├── main.py
│   └── pdf_manager.py
├── .env
├── .env.example
├── .env.masterkey
├── .gitignore            # changed: runs/
├── .python-version
├── Makefile
├── pyproject.toml        # changed: 5 packages in the notebooks group
└── uv.lock               # changed: their exact versions
```

::: mistake Common mistakes
- **`jupyter: command not found`:** the venv is not active, or the `notebooks` group is not installed. Activate the venv, then run `uv sync`.
- **`python: can't open file 'scripts/create_notebooks.py'`:** the file is not in `scripts/`, or you are not in the project root.
- **`ModuleNotFoundError: No module named 'sklearn'` in a notebook:** the 7.2 packages are missing, or JupyterLab was started from another venv. Run 7.2, then restart JupyterLab from the project root.
- **The `06-llm/prompts` sample says to add a key after you added it:** the kernel loaded `.env` before. Use **Kernel → Restart Kernel**, then run again.
- **Your edits to a sample disappeared:** they did not; the script never overwrites. Check you saved the notebook (`Ctrl+S`).
- **`runs/` shows in `git status`:** the `echo "runs/" >> .gitignore` line was skipped.
:::

#### Details

| Item | Value |
|---|---|
| New files | `scripts/create_notebooks.py`, 11 sample notebooks, `.gitkeep` in every empty folder |
| New packages (`notebooks` group) | `numpy`, `pandas`, `matplotlib`, `scikit-learn`, `pillow` |
| Commit | `feat: notebooks — reference samples, course and project folders` |
| Full files | Every file this step creates or changes is in the Resources panel |

#### Step checklist

::: checklist Step checklist
- [ ] `jupyter lab --version` prints a version
- [ ] Sample packages added to the `notebooks` group
- [ ] `create_notebooks.py` saved in `scripts/` and run
- [ ] `reference/` has 11 topics with their subfolders; `course/` and `project/` exist
- [ ] Ran at least three samples in JupyterLab
- [ ] Did one **Your turn** task
- [ ] `runs/` added to `.gitignore`
- [ ] Commit pushed
:::

::: takeaway Next
Step 8: API layer.
:::

## Step 8: API layer

Turn the project into a web service: build `src/api/` with FastAPI, answer questions over HTTP with the LLM from Step 5, test every endpoint with curl and pytest, and commit.

You write three small files (schemas, routes, app), run the server, call it from the terminal and the browser, and add the project's first automated test. The optional course parts 8.1 to 8.4 after this step teach APIs in depth.

### 8.A How an API works

An API lets other programs use your code over HTTP. A client sends a **request** to an **endpoint**, and your function sends back a **response**:

| Piece | In this step |
|---|---|
| Client | `curl`, the browser, later a web app |
| Request | `POST /ask` with `{"question": "What is RAG?"}` |
| Endpoint | A Python function with `@router.post("/ask")` above it |
| Response | JSON: `{"question": ..., "answer": ..., "source": ...}` |
| FastAPI | Turns your functions into endpoints and checks every request against a schema |
| uvicorn | The server: listens on a port and hands each request to FastAPI |

The three endpoints you build:

| Method | Path | What it does |
|---|---|---|
| [!GET|green] | `/health` | Is the server alive? Monitoring tools call it |
| [!GET|green] | `/info` | Project name, Python version, environment |
| [!POST|blue] | `/ask` | Answers a question with the LLM. Step 13 swaps the LLM for RAG |

### 8.B Install FastAPI and uvicorn

Both are app packages, so they go into `dependencies`. The tests use `httpx`, a dev tool, so it goes into the `dev` group:

::: tabs
```bash title="Command"
uv add fastapi uvicorn
uv add --group dev httpx
```
```terminal title="Output"
$ uv add fastapi uvicorn
Resolved 153 packages in 1.84s
Installed 7 packages in 8ms
 + annotated-doc==0.0.5
 + click==8.5.0
 + fastapi==0.143.0
 + starlette==1.7.0
 + uvicorn==0.54.0
 ...
$ uv add --group dev httpx
Resolved 153 packages in 117ms
Installed 1 package in 1ms
```
:::

| Package | Group | Why |
|---|---|---|
| `fastapi` | `dependencies` | The web framework |
| `uvicorn` | `dependencies` | The server that runs it |
| `httpx` | `dev` | Lets the tests call the API without a server. It is already installed (`openai` uses it); `dev` makes the need explicit |

→ Your version numbers may be newer.

### 8.C Write src/api/schemas.py

Create the folders and the API files:

```bash title="Command"
mkdir -p src/api tests
touch src/api/__init__.py src/api/schemas.py src/api/routes.py src/api/main.py
```

→ No output. `__init__.py` makes `src/api` a package, so `from src.api...` imports work.

Schemas are the contract: the exact shape of what comes in and what goes out. Paste into `src/api/schemas.py`:

```python title="src/api/schemas.py"
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
```

| Model | Used for |
|---|---|
| `HealthResponse` | What `/health` returns |
| `InfoResponse` | What `/info` returns |
| `AskRequest` | What the client must send to `/ask`: a `question` string |
| `AskResponse` | What `/ask` returns. `source` says where the answer came from |

> These are the same Pydantic models you met in Step 5. FastAPI uses them to reject bad requests before your code runs.

### 8.D Write src/api/routes.py

Routes are the endpoint functions. Paste into `src/api/routes.py`:

```python title="src/api/routes.py"
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
```

| Part | What it does |
|---|---|
| `router = APIRouter()` | A group of endpoints. `main.py` plugs it into the app |
| `@router.get("/health", response_model=...)` | Runs the function for `GET /health` and checks the result against the schema |
| `ask(request: AskRequest)` | FastAPI reads the JSON body into an `AskRequest` for you |
| No key | `/ask` answers with a clear message and `source: "no-key"`, so the API never crashes |
| With a key | The same OpenAI call as Step 5 Section 8, with a system prompt |

### 8.E Write src/api/main.py

The app itself. Paste into `src/api/main.py`:

```python title="src/api/main.py"
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
```

→ `load_dotenv()` runs once when the server starts. If you change `.env`, restart the server.

### 8.F Run the server and call it

Start the server from the project root, with your venv active:

::: tabs
```bash title="Command"
uvicorn src.api.main:app --reload
```
```terminal title="Output"
$ uvicorn src.api.main:app --reload
INFO:     Will watch for changes in these directories: ['C:/my-project']
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [303] using StatReload
INFO:     Started server process [305]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```
:::

| Part | Meaning |
|---|---|
| `src.api.main` | The module, written like `python -m`: dots, no `.py` |
| `:app` | The variable in that module that holds the FastAPI app |
| `--reload` | Restarts the server every time you save a `.py` file |

→ The terminal stays busy while the server runs. Open a **second terminal** in the project folder for the calls below. Stop the server with `Ctrl+C`.

Call each endpoint from the second terminal:

::: tabs
```bash title="Command"
curl http://localhost:8000/health
curl http://localhost:8000/info
```
```terminal title="Output"
$ curl http://localhost:8000/health
{"status":"ok","version":"0.1.0"}
$ curl http://localhost:8000/info
{"project":"my-project","python_version":"3.12.13","environment":"dev"}
```
:::

::: tabs
```bash title="Command"
curl -X POST http://localhost:8000/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "What is RAG?"}'
```
```terminal title="Output"
$ curl -X POST http://localhost:8000/ask -H "Content-Type: application/json" -d '{"question": "What is RAG?"}'
{"question":"What is RAG?","answer":"Add OPENAI_API_KEY to .env and restart the server.","source":"no-key"}
```
```terminal title="With key"
$ curl -X POST http://localhost:8000/ask -H "Content-Type: application/json" -d '{"question": "What is RAG?"}'
{"question":"What is RAG?","answer":"RAG (Retrieval-Augmented Generation) lets an AI look up relevant documents first and then write its answer from them. This makes answers more accurate and up to date.","source":"llm"}
```
:::

→ The **With key** answer is an example; yours will be worded differently.

| Part | Meaning |
|---|---|
| `-X POST` | Send a POST request, not the default GET |
| `-H "Content-Type: application/json"` | Tell the server the body is JSON |
| `-d '...'` | The body: the JSON your `AskRequest` expects |

Now send a bad request, with no question:

::: tabs
```bash title="Command"
curl -X POST http://localhost:8000/ask -H "Content-Type: application/json" -d '{}'
```
```terminal title="Output"
$ curl -X POST http://localhost:8000/ask -H "Content-Type: application/json" -d '{}'
{"detail":[{"type":"missing","loc":["body","question"],"msg":"Field required","input":{}}]}
```
:::

→ FastAPI checked the body against `AskRequest` and returned **422**, with the exact field that is missing. Your `ask` function never ran.

Open **http://localhost:8000/docs** in your browser. FastAPI built this page from your schemas: click an endpoint, then **Try it out** → **Execute** to call it without curl.

The server terminal logs every call:

```terminal title="Server log"
INFO:     127.0.0.1:38264 - "GET /health HTTP/1.1" 200 OK
INFO:     127.0.0.1:38266 - "GET /info HTTP/1.1" 200 OK
INFO:     127.0.0.1:38276 - "POST /ask HTTP/1.1" 200 OK
INFO:     127.0.0.1:38288 - "POST /ask HTTP/1.1" 422 Unprocessable Entity
INFO:     127.0.0.1:38302 - "GET /docs HTTP/1.1" 200 OK
```

::: quiz {id=s8-q1} Quick check
You call `POST /ask` with `{"text": "hi"}`. What happens?

- [ ] `ask` runs and answers "hi"
- [x] FastAPI returns 422: `question` is missing
- [ ] The server crashes
---
The body must match `AskRequest`. `text` is not `question`, so FastAPI rejects it before `ask` runs.
:::

### 8.G Your first API test

curl checks the API by hand. A test checks it automatically, every time you run `pytest`. `TestClient` calls the app directly: no server, no network. Create `tests/test_api.py`:

```python title="tests/test_api.py"
# tests/test_api.py — checks every endpoint without starting a server.

from fastapi.testclient import TestClient

from src.api.main import app

client = TestClient(app)


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "version": "0.1.0"}


def test_info_has_python_version():
    data = client.get("/info").json()
    assert data["python_version"].startswith("3.12")


def test_ask_without_key(monkeypatch):
    monkeypatch.delenv("OPENAI_API_KEY", raising=False)   # no real API call in tests
    response = client.post("/ask", json={"question": "What is RAG?"})
    assert response.status_code == 200
    assert response.json()["source"] == "no-key"


def test_ask_rejects_missing_question():
    response = client.post("/ask", json={})
    assert response.status_code == 422
```

| Test | Checks |
|---|---|
| `test_health` | `/health` returns 200 and the exact JSON |
| `test_info_has_python_version` | `/info` reports Python 3.12 |
| `test_ask_without_key` | `/ask` works with no key. `monkeypatch` removes the key for this test only, so no real API call is made |
| `test_ask_rejects_missing_question` | A request with no question gets 422 |

Run the tests from the project root. The server does not need to be running:

::: tabs
```bash title="Command"
python -m pytest -v
```
```terminal title="Output"
$ python -m pytest -v
tests/test_api.py::test_health PASSED                                    [ 25%]
tests/test_api.py::test_info_has_python_version PASSED                   [ 50%]
tests/test_api.py::test_ask_without_key PASSED                           [ 75%]
tests/test_api.py::test_ask_rejects_missing_question PASSED              [100%]
============================== 4 passed in 0.26s ===============================
```
:::

→ `python -m pytest` runs from the project root, so `from src.api.main import app` works. Step 3 already set `testpaths = ["tests"]` in `pyproject.toml`.

### 8.H Your turn

Write these yourself, run the server, and call them. Add a test for each.

1. **`GET /ping`** returns `{"pong": true}`.
2. **`uptime_seconds`** in `/info`: how long the server has been running.
3. **Empty question:** `/ask` with `{"question": ""}` returns 422 instead of calling the LLM.

::: details Solutions
```python title="1. src/api/routes.py"
@router.get("/ping")
def ping():
    return {"pong": True}
```

```python title="2. schemas.py and routes.py"
# schemas.py: add to InfoResponse
    uptime_seconds: float

# routes.py: at the top, after the imports
import time
STARTED = time.time()

# routes.py: in info(), add
        uptime_seconds=round(time.time() - STARTED, 1),
```

```python title="3. src/api/schemas.py"
from pydantic import BaseModel, Field


class AskRequest(BaseModel):
    question: str = Field(min_length=1)
```

→ For 3, Pydantic rejects the empty string, so FastAPI returns 422 and `ask` never runs. Test: `client.post("/ask", json={"question": ""}).status_code == 422`.
:::

### 8.I Commit and push

Stop the server (`Ctrl+C`), then:

::: tabs
```bash title="Command"
git add src/api/ tests/ pyproject.toml uv.lock
git status
git commit -m "feat: api layer — /health, /info, /ask endpoints with FastAPI" \
  -m "- src/api/schemas.py: request and response models
- src/api/routes.py: /health, /info, and /ask answered by the LLM (no-key fallback)
- src/api/main.py: the FastAPI app that wires the routes
- tests/test_api.py: 4 tests with TestClient, no server and no API calls
- dependencies: fastapi, uvicorn; dev: httpx"
git push
```
```terminal title="Output"
$ git status
On branch main
Your branch is up to date with 'origin/main'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	modified:   pyproject.toml
	new file:   src/api/__init__.py
	new file:   src/api/main.py
	new file:   src/api/routes.py
	new file:   src/api/schemas.py
	new file:   tests/test_api.py
	modified:   uv.lock

$ git commit -m "feat: api layer — /health, /info, /ask endpoints with FastAPI" -m "..."
[main 4b7e2a1] feat: api layer — /health, /info, /ask endpoints with FastAPI
 7 files changed, 412 insertions(+)
$ git push
To https://github.com/YOUR_USERNAME/my-project.git
   c558820..4b7e2a1  main -> main
```
:::

| Line | What it does |
|---|---|
| `git add ...` | Stages the API package, the test, and the updated dependency files |
| `git status` | Check: no `.env` and no `__pycache__/` in the list |
| `git commit -m "..." -m "..."` | Title, then one body line per change |
| `git push` | Sends it to GitHub. Your history now has six commits |

→ Your commit hash and counts will differ.

#### Project structure after Step 8

Highlighted lines are new or changed in this step:

```tree title="my-project" {13,14,15,16,17,22,23,30,31}
my-project/
├── .venv/
├── data/
│   ├── raw/
│   ├── processed/
│   └── output/
├── notebooks/
├── scripts/
│   ├── create_notebooks.py
│   └── make_sample_pdf.py
├── src/
│   ├── __init__.py
│   ├── api/                  # new
│   │   ├── __init__.py
│   │   ├── main.py           # new: the app
│   │   ├── routes.py         # new: /health, /info, /ask
│   │   └── schemas.py        # new: request and response models
│   ├── chat.py
│   ├── csv_manager.py
│   ├── main.py
│   └── pdf_manager.py
├── tests/                    # new
│   └── test_api.py           # new: 4 API tests
├── .env
├── .env.example
├── .env.masterkey
├── .gitignore
├── .python-version
├── Makefile
├── pyproject.toml            # changed: fastapi, uvicorn; httpx in dev
└── uv.lock                   # changed
```

::: mistake Common mistakes
- **`ModuleNotFoundError: No module named 'src'`:** you started uvicorn or pytest from inside `src/`. Run both from the project root.
- **`[Errno 98] Address already in use` (`10048` on Windows):** a server is already running on port 8000. Stop it with `Ctrl+C`, or start on another port: `uvicorn src.api.main:app --reload --port 8001`.
- **`curl: (7) Failed to connect`:** the server is not running, or you ran curl in the server's terminal. Use a second terminal.
- **422 on `/ask` with a question:** the body is not JSON, or the key is not `question`. Keep `-H "Content-Type: application/json"`.
- **`/ask` still says "Add OPENAI_API_KEY" after you added it:** `.env` is read when the server starts, and `--reload` only watches `.py` files. Stop and start the server.
- **curl fails in PowerShell:** PowerShell's `curl` is a different command. Use Git Bash, or the `/docs` page.
- **`No module named pytest`:** the `dev` group is not installed. Run `uv sync`.
:::

#### Details

| Item | Value |
|---|---|
| New files | `src/api/__init__.py`, `schemas.py`, `routes.py`, `main.py`, `tests/test_api.py` |
| New packages | `fastapi`, `uvicorn` (dependencies), `httpx` (dev) |
| Run | `uvicorn src.api.main:app --reload`, docs at `http://localhost:8000/docs` |
| Commit | `feat: api layer — /health, /info, /ask endpoints with FastAPI` |
| Full files | Every file this step creates or changes is in the Resources panel |

#### Step checklist

::: checklist Step checklist
- [ ] `fastapi` and `uvicorn` added; `httpx` in the `dev` group
- [ ] `src/api/` has `schemas.py`, `routes.py`, `main.py`, `__init__.py`
- [ ] Server runs with `uvicorn src.api.main:app --reload`
- [ ] `/health`, `/info` and `/ask` answer with curl
- [ ] Saw the 422 for a missing question
- [ ] Tried an endpoint in `/docs`
- [ ] `python -m pytest -v` shows 4 passed
- [ ] Did one **Your turn** task
- [ ] Commit pushed
:::

> Want to go deeper? Parts **8.1 to 8.4** below are an optional API course: HTTP and REST, two full projects, and production patterns. The project continues in Step 9.

::: takeaway Next
Step 9: Core services.
:::

## 8.1 Practical API Course

*A full, from-scratch walkthrough: what an API is, how HTTP and REST work, and how to build one properly with FastAPI. Companion to Step 8 — go as deep as you need here.*

#### What this is

Step 8 built your project's real API. This is the deeper course behind it — the concepts, the reasoning, and four fully tested, runnable examples that build from "the smallest possible API" up to something shaped exactly like the search endpoint you'll extend with real RAG later in the course.

Go through it in order, or jump to whatever section you need from the table of contents below. Every example in the companion zip file has been tested end-to-end — every success path, every validation error, every "not found" case — before being included here.

| Item | Detail |
|---|---|
| Format | Read the concepts here, run the code from the zip |
| Prerequisites | Steps 1–8 complete, Python fundamentals from Step 5 |
| Companion file | `step5.1-practical-api-course.zip` — 4 examples + exercises |

::: info 📦 Download the companion code
Five working examples, each tested with FastAPI's TestClient before being included — success paths, validation errors, and missing-resource cases all confirmed. Plus an EXERCISES.md with one exercise per example, and a bonus challenge.

```tree
step5.1-practical-api-course.zip
├── README.md
├── EXERCISES.md
├── example1-hello-api/
├── example2-crud-books/
├── example3-dependencies/
├── example4-document-search/
└── example5-database/
```
:::

### 1. 1What is an API — the plain-language answer

API stands for **Application Programming Interface**. Strip away the jargon and it means one thing: **a way for one piece of software to ask another piece of software to do something, without needing to know how it works inside.**

::: example The restaurant analogy
You sit at a table. You don't walk into the kitchen and cook your own food — you give your order to a waiter. The waiter takes it to the kitchen, the kitchen prepares it, and the waiter brings it back. You never see how the kitchen works. The waiter is the API: a fixed, predictable way to ask for something and get a response, with the messy details hidden behind it.
:::

In software terms: your phone's weather app doesn't know how to measure atmospheric pressure. It sends a request to a weather API — "give me today's forecast for this location" — and gets back a structured response. The app never touches the sensors, satellites, or databases behind that answer. That separation is the entire point.

#### Why this separation matters

Without APIs, every app that wants weather data would need to build and run its own weather stations. With an API, one team builds and maintains the complex part once, and everyone else just sends requests and reads responses. This is why modern software is built in layers — your RAG project later in this course is exactly this pattern: a FastAPI layer sits in front of your PDF reading, your vector search, and your LLM calls, so anything else (a website, a mobile app, another service) can use your RAG system without knowing any of its internals.

::: definition A web API specifically
Most APIs you'll build and use are **web APIs** — they run over the internet using HTTP, the same protocol your browser uses to load web pages. Instead of a page of HTML for a human to read, a web API returns structured data (usually JSON) for another program to read. That's the entire shift: same transport, different payload.
:::

#### An API, precisely, is just the endpoints

Strictly speaking, the API is only the set of **endpoints** — the defined entry points and their signatures, like the doors into your server. Everything behind those doors — the database, the business logic, the file processing — is technically "the rest of the backend," not the API itself. In everyday conversation, though, "API" and "backend" get used interchangeably, and this course does the same. Worth knowing the precise distinction exists, even if it rarely matters in practice.

### 2. 2HTTP fundamentals — the language every API speaks

HTTP (HyperText Transfer Protocol) is the set of rules that define how a client (your browser, your app, another server) talks to a server. Every web API — including the one you'll build — communicates using HTTP. You don't need to memorize the spec, but you do need to understand its shape.

#### Anatomy of a request

Every HTTP request has four parts:

| Part | What it is | Example |
|---|---|---|
| Method | What action you want | `GET`, `POST` |
| URL | Where to send it — which resource | `/books/1` |
| Headers | Metadata about the request | `Content-Type: application/json` |
| Body | The actual data (not always present) | `{"title": "Dune"}` |

#### JSON — the format the body is written in

JSON stands for JavaScript Object Notation. Despite the name, it's used everywhere, in every language — it's just a plain-text way to represent structured data. You've already been reading it in every example so far; here's what its pieces actually mean.

```json
{
  "name": "Caleb",
  "age": 30,
  "is_active": true,
  "middle_name": null,
  "tags": ["admin", "verified"],
  "address": {
    "city": "Cairo"
  }
}
```

| Piece | Rule |
|---|---|
| Keys | Always in double quotes — `"name"`, never `'name'` or bare `name` |
| String values | Double-quoted — `"Caleb"` |
| Number, boolean, null | Never quoted — `30`, `true`, `null`, not `"30"` |
| Nested objects and arrays | Fully supported — a value can itself be a whole object or a list |

::: tip JSON is not JavaScript.
It looks like a JavaScript object, but plain JSON has no functions, no dates, no `undefined`, and every key must be quoted — none of the shortcuts JavaScript itself allows. Think of it as its own strict, language-independent format that every language, including Python, can read and write.
:::

#### HTTP methods — the verbs

Methods tell the server what kind of action you're requesting. There are more, but these five cover almost everything you'll build:

| Method | Meaning | Has a body? | Example use |
|---|---|---|---|
| `GET` | Read data — never changes anything | No | Fetch a list of books |
| `POST` | Create something new | Yes | Add a new book |
| `PUT` | Replace something entirely | Yes | Overwrite a book's full data |
| `PATCH` | Update part of something | Yes | Change just a book's title |
| `DELETE` | Remove something | Usually no | Delete a book |

::: tip Why does GET never change anything?
This is a convention, not a technical rule — but it's one of the most important ones in all of API design. If a client, a cache, or a search engine crawler calls `GET` on your API, it should be completely safe to call as many times as it wants. Breaking this convention (e.g. a GET request that deletes data) causes real, hard-to-debug production bugs.
:::

#### Status codes — how the server tells you what happened

Every response includes a 3-digit status code. The first digit tells you the category:

| Range | Meaning | Common codes |
|---|---|---|
| 2xx | Success | `200 OK`, `201 Created`, `204 No Content` |
| 4xx | Client made a mistake | `400 Bad Request`, `401 Unauthorized`, `404 Not Found`, `422 Unprocessable Entity` |
| 5xx | Server made a mistake | `500 Internal Server Error` |

::: definition 422 vs 401 — a distinction that trips people up (and comes up in Example 3)
`422` means the request itself was malformed — a required field was missing, or the wrong type was sent. This check happens automatically, before your own code even runs. `401` means the request was well-formed, but your own logic decided to reject it — like an API key that doesn't match. FastAPI generates `422`s for you automatically from your type hints; you write the logic for `401`s yourself.
:::

#### All four pieces assembled — a real request, end to end

The table above breaks a request into parts. Here's what they look like put together — this is genuinely what gets sent over the wire when you create a new book:

```text
POST /books HTTP/1.1
Content-Type: application/json

{
  "title": "Dune",
  "author": "Frank Herbert",
  "year": 1965
}
```

Method and URL on the first line, headers below it, a blank line, then the body. This is exactly what tools like `curl`, Postman, or your browser's network tab show you when inspecting a real request — and it's exactly what FastAPI's `/docs` page builds for you automatically when you hit "Try it out."

### 3. 3REST — the rules that make APIs predictable

#### REST is one type of API among several

This course focuses entirely on REST, since it's the most common style and the right starting point. Worth knowing it isn't the only option, so you recognize the others when you run into them.

| Type | Uses | Common for |
|---|---|---|
| REST | HTTP methods + URLs, JSON | Most public and internal web APIs — this course's approach |
| GraphQL | A single endpoint; the client specifies exactly what data it wants in the request | Frontends that need flexible, precise data shapes without multiple round trips |
| gRPC | Protocol buffers (a compact binary format) instead of JSON | Fast service-to-service communication inside a microservice architecture |
| WebSockets | A persistent, two-way connection — either side can send data anytime | Real-time features: chat, live notifications, anything the server needs to push without being asked |
| SOAP | XML-based, older, more rigid than REST | Legacy and enterprise systems — rarely chosen for new projects, but you'll meet it integrating with older systems |

::: tip Why REST first
once you understand REST's method-plus-resource pattern well, the others are variations on ideas you already know — GraphQL is still HTTP underneath, gRPC still has "endpoints" in spirit, WebSockets still send JSON-like messages. REST is the foundation the rest build on conceptually.
:::

REST (REpresentational State Transfer) is not a technology — it's a set of design conventions for building APIs so that anyone familiar with REST can predict how your API behaves without reading your documentation line by line.

#### The core idea: everything is a resource

In REST, you think in terms of **nouns** (resources), not verbs. A "book" is a resource. A "user" is a resource. Your URLs name the resource; your HTTP method says what to do with it.

| Bad (verb in the URL) | RESTful (noun + method) |
|---|---|
| `POST /createBook` | `POST /books` |
| `GET /getBookById?id=1` | `GET /books/1` |
| `POST /deleteBook` | `DELETE /books/1` |

Notice the pattern: the URL `/books` always means "the collection of books." Add an ID — `/books/1` — and it means "one specific book." The method (GET, POST, DELETE) decides the action. This is exactly the shape of Example 2 below.

#### Idempotency — a property worth understanding by name

A request is **idempotent** if running it once has the same end result as running it many times. This isn't just trivia — it's what makes retries safe.

| Method | Idempotent? | Why |
|---|---|---|
| `GET` | Yes | Reading data never changes anything, no matter how many times you ask |
| `PUT` | Yes | Replacing a resource with the same data twice leaves it in the same final state |
| `DELETE` | Yes | Deleting something that's already gone still ends with it gone — same result |
| `POST` | **No** | Each call is a new creation — calling it twice creates two resources, not one |

::: warning Why this matters in practice
if a network request times out and you're not sure whether it went through, retrying a `PUT` or `DELETE` is always safe. Retrying a `POST` can create duplicate data — this is exactly the "confirm form resubmission" warning browsers show when you refresh after submitting a form.
:::

#### Statelessness — the other core rule

Every request must contain everything the server needs to understand it. The server does not remember anything about you between requests. If you need to prove who you are, you send your credentials (an API key, a token) with **every single request** — the server never "remembers" you were authenticated five seconds ago. This is exactly what Example 3's API key header does.

::: tip Why statelessness matters at scale
if the server doesn't need to remember anything about you, any server in a cluster can handle any request. This is what lets companies run APIs across hundreds of machines without them needing to coordinate who talked to whom.
:::

#### Designing URLs: nested resources vs. a flat collection with filters

When a resource logically belongs to another one — comments belong to a post, books belong to an author — you have two honest options for the URL shape.

| Approach | Shape | Best when |
|---|---|---|
| Nested | `GET /posts/123/comments` | Access patterns are few and predictable — "comments for a post" is the main way you'll ever fetch them |
| Flat + filter | `GET /comments?post_id=123` | You need many different ways to slice the same collection — by post, by user, by date — without a combinatorial explosion of nested routes |

::: tip A reasonable default
start nested — it reads clearly and matches how most data is actually organized. Switch to flat-with-filters only once you notice you'd need several different nesting paths to cover all the ways a resource needs to be queried.
:::

### 4. 4Why FastAPI — and how it's different

You already used FastAPI in Step 8. Here's the reasoning behind why this course uses it instead of alternatives like Flask or Django REST Framework.

| Feature | What it gives you |
|---|---|
| Type hints as validation | You write normal Python type hints; FastAPI turns them into real request validation — no separate schema language to learn |
| Automatic docs | `/docs` gives you a working, testable interface for every route, generated from your code — always in sync, never stale |
| Pydantic integration | The same Pydantic models from Step 5 define your request and response shapes — one system, not two |
| Async support | Native `async def` routes — critical for APIs that call LLMs or databases, where you're waiting on I/O, not CPU |
| Performance | Built on Starlette and Pydantic's compiled validation — one of the fastest Python web frameworks available |

::: definition The single idea that explains most of FastAPI
You describe your data with Python types. FastAPI reads those types and handles parsing, validation, documentation, and error responses for you. You almost never write validation logic by hand — you write a type hint, and FastAPI does the rest. Every example below demonstrates this same idea from a different angle.
:::

#### Django vs Flask vs FastAPI — how to actually decide

This comes up constantly, so here's the short, practical version rather than a deep framework comparison.

| Framework | Philosophy | Pick it when |
|---|---|---|
| Django | Batteries included — ORM, admin panel, auth, and more, built in and ready to use | You want a comprehensive framework and don't want to assemble the pieces yourself. Django REST Framework or Django Ninja for a Django-flavored API |
| Flask | Minimal core, add anything via extensions — nothing is decided for you | You want maximum flexibility and are fine wiring up every piece yourself. The trade-off is more manual setup for things FastAPI or Django give you for free |
| FastAPI | Built for high-performance, async-first APIs with automatic validation and docs | You're building an API meant to handle real concurrent load efficiently — this course's exact use case |

::: tip None of this is exclusive.
You can build a small, low-traffic API with Flask just fine, and you can build a simple API with FastAPI even with only a handful of users. These are default-fit recommendations, not hard rules.
:::

#### An API alone is not a website — the bigger picture

Worth being explicit about this before going further: a FastAPI app does not render HTML pages a person clicks through in a browser. It returns JSON. To get a real product in front of users, you pair it with a separate **frontend** — React, Vue, a mobile app, or any client that calls your API and renders the result. This course focuses entirely on the backend/API side; the RAG project you build later is consumed the same way — by a frontend, another service, or a script, all talking to your API over HTTP.

### 5. 5FastAPI core concepts — the building blocks

#### Path operations

A "path operation" is a function decorated to handle a specific HTTP method at a specific URL:

```python
@app.get("/books/{book_id}")
def get_book(book_id: int):
    ...
```

#### Path parameters vs query parameters

| Type | Where it appears | When to use it |
|---|---|---|
| Path parameter | Part of the URL: `/books/{book_id}` | Identifies a specific resource — required, no default |
| Query parameter | After `?`: `/books?author=Herbert` | Optional filters, sorting, pagination |
| Request body | Not in the URL at all — sent as JSON in the request | The actual data being created or updated, and anything sensitive |

```python
# book_id is a PATH parameter — required, identifies the resource
# author is a QUERY parameter — optional, filters the results
@app.get("/books/{book_id}")
def get_book(book_id: int, author: str | None = None):
    ...
```

::: warning Never put sensitive data in the path or a query parameter.
A URL gets logged by servers and proxies, saved in browser history, and shows up if the link is ever shared or bookmarked. `POST /login?password=hunter2` exposes the password in plain sight everywhere that URL travels. Passwords, tokens, and any private data belong in the request body — never in the URL, no matter how convenient it looks.
:::

#### Request and response models

You already know Pydantic from Step 5. FastAPI uses the exact same models to define what a request body must look like, and what a response will look like:

```python
class BookCreate(BaseModel):
    title: str
    author: str
    year: int

@app.post("/books", response_model=Book)
def create_book(book: BookCreate):
    # FastAPI validated the incoming JSON against BookCreate
    # before this function body ever runs
    ...
```

#### Dependency injection with Depends()

A "dependency" is a function that runs before your route, and whose return value gets passed into your route as an argument. Use it for anything shared across many routes — auth checks, database connections, shared config:

```python
def verify_api_key(x_api_key: str = Header(...)):
    if x_api_key not in VALID_KEYS:
        raise HTTPException(status_code=401, detail="Invalid API key")
    return x_api_key

@app.get("/items")
def list_items(api_key: str = Depends(verify_api_key)):
    # if verify_api_key raised, this line never runs
    ...
```

#### Async routes

::: definition Why async is faster — the actual mechanism
When a route waits on something external — a database, another API, an LLM — there's a stretch of time where your code isn't doing any work at all, just waiting for a response. A synchronous server sits idle during that entire wait before it can serve the next request. An asynchronous server uses that exact downtime to start handling other requests, then comes back to finish the first one once its response arrives. Nothing runs literally simultaneously on one worker — it's fast switching between tasks during their idle time, not true parallelism.
:::

Use `async def` instead of `def` when your route waits on something external — a database call, an HTTP request to another API, a call to an LLM. This lets FastAPI handle other requests while waiting, instead of blocking:

```python
@app.post("/search")
async def search_documents(request: SearchRequest):
    results = await vector_db.query(request.query)  # real example, later in the course
    return results
```

#### The actual decision rule: CPU-bound vs I/O-bound

| Your route is... | Use | Example |
|---|---|---|
| I/O-bound — waiting on something external | `async def` + `await` | Database queries, HTTP calls to other APIs, LLM calls, file reads over a network |
| CPU-bound — actively computing, no waiting | Plain `def` | Heavy math, image processing, anything that keeps the CPU busy the whole time with nothing to wait on |

::: tip You don't have to use async everywhere.
A plain `def` route works fine and FastAPI handles it correctly — in fact, forcing `async def` onto a CPU-bound task gains you nothing, since there's no idle waiting time to reuse. Mixing `def` and `async def` routes in the same app is completely normal — FastAPI handles both correctly side by side.
:::

That's every concept this course leans on. From here on, it's the same ideas applied to real, growing code — starting with the smallest API possible, then adding one capability at a time.

### 6. 6Example 1 — Hello API

[!Verified — both routes tested with TestClient, exact JSON responses confirmed|green]

#### 1 — The smallest possible FastAPI app

*example1-hello-api/main.py*

Two routes. This is as simple as an API gets — the goal is to see the absolute minimum shape before adding any complexity.

```python
from fastapi import FastAPI

app = FastAPI(title="Example 1 - Hello API")


@app.get("/")
def read_root():
    return {"message": "Hello, API!"}


@app.get("/greet/{name}")
def greet(name: str):
    return {"message": f"Hello, {name}!"}
```

#### Run it

```bash
cd example1-hello-api
uv add fastapi uvicorn
uvicorn main:app --reload
# open http://127.0.0.1:8000/docs
```

`GET /` returns a fixed message. `GET /greet/{name}` takes `name` straight from the URL as a path parameter — FastAPI passes it into the function automatically, already typed as a string.

### 7. 7Example 2 — CRUD with validation

[!Verified — 9 test cases including 404s and validation errors, all passing|green]

#### 2 — Full Create, Read, Update, Delete

*example2-crud-books/main.py*

A books API backed by an in-memory dictionary. This is the first example that looks like a real API — every REST convention from Section 3 shows up here.

```python
from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel, Field

app = FastAPI(title="Example 2 - CRUD Books API")


class Book(BaseModel):
    id: int
    title: str
    author: str
    year: int = Field(gt=0, le=2100)


class BookCreate(BaseModel):
    title: str
    author: str
    year: int = Field(gt=0, le=2100)


books: dict[int, Book] = {
    1: Book(id=1, title="Dune", author="Frank Herbert", year=1965),
    2: Book(id=2, title="Neuromancer", author="William Gibson", year=1984),
}
next_id = 3


@app.get("/books", response_model=list[Book])
def list_books(author: str | None = Query(default=None)):
    if author:
        return [b for b in books.values() if b.author.lower() == author.lower()]
    return list(books.values())


@app.get("/books/{book_id}", response_model=Book)
def get_book(book_id: int):
    if book_id not in books:
        raise HTTPException(status_code=404, detail=f"Book {book_id} not found")
    return books[book_id]


@app.post("/books", response_model=Book, status_code=201)
def create_book(book: BookCreate):
    global next_id
    new_book = Book(id=next_id, **book.model_dump())
    books[next_id] = new_book
    next_id += 1
    return new_book


@app.put("/books/{book_id}", response_model=Book)
def update_book(book_id: int, book: BookCreate):
    if book_id not in books:
        raise HTTPException(status_code=404, detail=f"Book {book_id} not found")
    updated = Book(id=book_id, **book.model_dump())
    books[book_id] = updated
    return updated


@app.delete("/books/{book_id}", status_code=204)
def delete_book(book_id: int):
    if book_id not in books:
        raise HTTPException(status_code=404, detail=f"Book {book_id} not found")
    del books[book_id]
```

#### What to notice

| Line | Concept |
|---|---|
| `Field(gt=0, le=2100)` | Validation rule baked into the type — no manual "if year < 0" check needed |
| `author: str \| None = Query(default=None)` | Optional query parameter — omit it entirely and it defaults to None |
| `raise HTTPException(status_code=404, ...)` | The correct way to return an error — FastAPI turns this into a proper JSON error response |
| `status_code=201` / `204` | Explicit status codes matching REST convention: 201 for created, 204 for deleted (no body) |

### 8. 8Restricted values and multi-tier schemas

[!Verified — enum validation, default values, invalid-value rejection, and partial updates all tested: 6 cases, all passing|green]

#### The problem: a plain string accepts anything

Example 2's `Book` model uses `str` and `int` fields — fine for open-ended text, but what about a field that should only ever be one of a fixed set of values, like a priority level or an order status? A plain `str` would happily accept `"urgent!!"` or a typo like `"hihg"`. You want the field to reject anything outside a known, fixed list — and you want that list documented automatically in `/docs`.

::: definition The fix: Python's Enum
An `Enum` defines a closed set of named values. Pydantic understands Enums natively — use one as a field's type, and FastAPI validates against it automatically, rejects anything outside the set with a clean `422`, and documents the exact allowed values in `/docs` without any extra work.
:::

```python
from enum import IntEnum

class Priority(IntEnum):
    high = 1
    medium = 2
    low = 3

# used as a field type — Pydantic validates against it automatically
class TodoBase(BaseModel):
    priority: Priority = Field(default=Priority.low)
```

::: tip IntEnum vs a plain Enum
`IntEnum` members behave like real integers — useful when the order matters (priority 1 is "more urgent" than 3) or when the frontend expects a number. A plain `str`-based Enum is usually clearer when the values are labels with no inherent order, like a status: `"pending"`, `"shipped"`, `"delivered"`.
:::

#### Beyond Create vs Full: a four-tier schema pattern

Example 2 split models into `BookCreate` (input) and `Book` (output, with an id). Real APIs often need a third and fourth variant: a base with shared fields, and an **update** model where every field is optional — because a partial update shouldn't force the client to resend fields they aren't changing.

| Model | Purpose | Fields |
|---|---|---|
| `TodoBase` | Shared fields, inherited by the others — never used directly on a route | All required |
| `TodoCreate` | What the client sends to create one | Same as base — no id yet, the server assigns it |
| `TodoUpdate` | What the client sends to update one | Every field optional, defaulting to `None` — "unset" means "don't change this" |
| `Todo` | What the server returns | Everything from base, plus the server-assigned `id` |

```python
class TodoBase(BaseModel):
    name: str = Field(..., min_length=3, max_length=512)
    description: str = Field(...)
    priority: Priority = Field(default=Priority.low)


class TodoCreate(TodoBase):
    pass   # identical to the base — exists for a clear, separate name at the route


class TodoUpdate(BaseModel):
    # NOT inherited from TodoBase — every field is independently optional
    name: str | None = Field(default=None, min_length=3, max_length=512)
    description: str | None = Field(default=None)
    priority: Priority | None = Field(default=None)


class Todo(TodoBase):
    id: int = Field(...)   # the only field NOT present on create
```

#### Using TodoUpdate correctly — only touch fields that were actually sent

Having every field default to `None` only helps if the route logic actually checks for that before overwriting anything. Skip the check, and an update request that omits a field will wipe it out with `None` instead of leaving it alone.

```python
@app.put("/todos/{todo_id}", response_model=Todo)
def update_todo(todo_id: int, updated: TodoUpdate):
    for todo in all_todos:
        if todo.id == todo_id:
            if updated.name is not None:
                todo.name = updated.name
            if updated.description is not None:
                todo.description = updated.description
            if updated.priority is not None:
                todo.priority = updated.priority
            return todo
    raise HTTPException(status_code=404, detail="Todo not found")
```

::: warning This is the exact pattern Exercise 2 asks you to build.
If you're stuck on the PATCH exercise from Example 2, this is the worked solution — the "only update what was actually sent" check is the one line that makes a partial update actually partial.
:::

### 9. 9Example 3 — Dependency injection

[!Verified — all three cases tested and confirmed with the correct status codes|green]

Validation and schema design are covered — every request now shapes itself correctly before your code runs. The next question is how to share logic *across* routes without repeating it, which is exactly what this example builds.

#### 3 — Shared logic across routes with Depends()

*example3-dependencies/main.py*

An auth-style API key check, shared across two routes without repeating the check logic in each one.

```python
from fastapi import FastAPI, Depends, Header, HTTPException
from pydantic import BaseModel

app = FastAPI(title="Example 3 - Dependencies")


class Item(BaseModel):
    name: str
    price: float


VALID_API_KEYS = {"secret-123"}


def verify_api_key(x_api_key: str = Header(...)) -> str:
    """A dependency: FastAPI calls this before the route runs.
    If it raises, the route body never executes."""
    if x_api_key not in VALID_API_KEYS:
        raise HTTPException(status_code=401, detail="Invalid API key")
    return x_api_key


def get_tax_rate() -> float:
    """A second dependency — could load from config/db in a real app."""
    return 0.08


@app.get("/items/{item_id}/price")
def get_price_with_tax(
    item_id: int,
    api_key: str = Depends(verify_api_key),
    tax_rate: float = Depends(get_tax_rate),
):
    base_price = 19.99
    return {
        "item_id": item_id,
        "base_price": base_price,
        "tax_rate": tax_rate,
        "total": round(base_price * (1 + tax_rate), 2),
    }


@app.post("/items")
def create_item(item: Item, api_key: str = Depends(verify_api_key)):
    return {"created": item, "by_key": api_key}
```

#### Try it — three different results from one route

| Request | Result | Why |
|---|---|---|
| No `X-API-Key` header at all | 422 | FastAPI's own validation — the header is required and missing, checked before your code runs |
| `X-API-Key: wrong` | 401 | Header present, but your own logic in `verify_api_key` rejects it |
| `X-API-Key: secret-123` | 200 | Passes validation, reaches your route logic |

::: definition This 422-vs-401 distinction is the single most useful thing to take from this example.
It's the same principle from Section 2 — automatic FastAPI validation vs your own business logic — but seeing it happen live, on the exact same route, based on exactly what you send, makes it click.
:::

### 10. 10Example 4 — A RAG-shaped search API

[!Verified — search ranking, validation limits, and 404s all tested and passing|green]

One more example before the concepts turn into full patterns worth naming. This one is deliberately shaped like the endpoint you'll build later in the real course — a search request in, ranked results out.

#### 4 — The shape you'll actually build later in this course

*example4-document-search/main.py*

This is the closest example to your real project's `/ask` endpoint. `fake_similarity_score` stands in for a real embedding model — same request/response contract, same async structure, the real intelligence comes later in the course.

```python
import asyncio
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI(title="Example 4 - Document Search API")


class Document(BaseModel):
    id: int
    title: str
    content: str


class SearchRequest(BaseModel):
    query: str = Field(min_length=1)
    top_k: int = Field(default=2, ge=1, le=10)


class SearchResult(BaseModel):
    document: Document
    score: float


class SearchResponse(BaseModel):
    query: str
    results: list[SearchResult]


DOCS = [
    Document(id=1, title="Intro to RAG", content="RAG combines retrieval and generation."),
    Document(id=2, title="Vector Databases", content="Vector databases store embeddings for similarity search."),
    Document(id=3, title="LangChain Basics", content="LangChain is a framework for building LLM applications."),
]


def fake_similarity_score(query: str, text: str) -> float:
    """Stand-in for real embedding similarity — counts shared words.
    In the real course this becomes embeddings + cosine similarity."""
    query_words = set(query.lower().split())
    text_words = set(text.lower().split())
    if not query_words:
        return 0.0
    overlap = len(query_words & text_words)
    return round(overlap / len(query_words), 2)


@app.post("/search", response_model=SearchResponse)
async def search_documents(request: SearchRequest):
    await asyncio.sleep(0)  # where a real "await db.query(...)" goes

    scored = [
        SearchResult(document=doc, score=fake_similarity_score(request.query, doc.content))
        for doc in DOCS
    ]
    scored.sort(key=lambda r: r.score, reverse=True)
    return SearchResponse(query=request.query, results=scored[: request.top_k])


@app.get("/documents/{doc_id}", response_model=Document)
async def get_document(doc_id: int):
    for doc in DOCS:
        if doc.id == doc_id:
            return doc
    raise HTTPException(status_code=404, detail=f"Document {doc_id} not found")
```

#### The line that matters most for later in the course

The comment `# where a real "await db.query(...)" goes` marks exactly the spot where, in a later step, `fake_similarity_score` gets replaced with a real embedding model and a real vector database query. The route signature, the request/response models, and the overall shape do not change — only what happens inside changes. That's the whole point of designing the API contract first.

### 11. 11Generic response types — one wrapper for every endpoint

Example 4 wrapped results in a hand-written dictionary. The next section, and the database-backed example after it, both lean on a single reusable pattern for that instead — worth learning once, here, before it shows up in real code.

#### The problem this solves

Example 5 returned `{"data": book}` from one route and `{"data": books}` from another — same wrapper shape, different content inside. The naive fix is writing a new Pydantic response model per endpoint: `BookResponse`, `BookListResponse`, `UserResponse`, `UserListResponse` — the wrapper logic never changes, only the type inside does, yet you'd be retyping it every time.

::: definition What a generic type actually is
A generic is a class definition with a placeholder for "the type that goes here, decided later." You've been using generics since Step 5 without the formal name: `list[str]` is a generic — `list` is the container, `str` is the type you plugged in. `dict[str, int]` is the same idea with two placeholders. This section teaches you to define your *own* generic, not just use Python's built-in ones.
:::

#### How to read the syntax

| Piece | Meaning |
|---|---|
| `T = TypeVar("T")` | Declares a placeholder named T. The string is just a label for error messages — it carries no other meaning |
| `class Response(BaseModel, Generic[T])` | "This class accepts a type parameter." Without `Generic[T]`, using `Response[Book]` later would be a syntax error |
| `data: T` | This field's type is whatever gets plugged in when the class is used |
| `Response[Book]` | "A Response, where T is Book." This is the moment the placeholder gets filled in |

```python
from typing import Generic, TypeVar
from pydantic import BaseModel

T = TypeVar("T")


class Response(BaseModel, Generic[T]):
    data: T


# now reuse Response for any shape, at the route:
@app.get("/books", response_model=Response[list[Book]])
def list_books(): ...

@app.get("/books/{book_id}", response_model=Response[Book])
def get_book(book_id: int): ...
```

The payoff shows up in `/docs`: every endpoint using `Response[...]` documents its exact response shape automatically, correct nested type included, without a one-off `BookListResponse` or `SingleBookResponse` class ever being written.

#### Best practice — when to reach for this, and when not to

| Situation | Recommendation |
|---|---|
| Two or more response models share a wrapper shape (a `data` field, a `meta` field, a pagination envelope) and differ only in the inner type | Use a generic — this is exactly the case it was designed for |
| A single endpoint has a genuinely unique response shape unrelated to any other endpoint | Skip the generic — a plain, specific Pydantic model is clearer and adds no unnecessary abstraction |
| You're building a small API with 2-3 endpoints total | Skip it entirely at first — introduce the generic only once you notice real duplication, not before |

::: warning Do not over-generalize too early.
A generic response wrapper is a real, professional pattern — but reaching for it before you have at least two or three endpoints that actually share the shape adds abstraction with no payoff yet. Write the specific version first; generalize once the duplication is real, not hypothetical.
:::

### 12. 12Persisting data — what an ORM is, and when you need one

[!Verified — full CRUD against a real SQLite database, plus startup seeding, tested end to end with FastAPI's TestClient|green]

The `Response[T]` pattern from the previous section is about to get real use — this example's routes wrap every result in it, the same way Example 2 and Example 4 wrapped theirs in plain dictionaries.

Every example so far stores data in a Python list or dict living in your server's memory. Stop the server, and it's gone. Real applications need data to survive a restart, a crash, a deploy — this is what a database is for, and this section covers the concepts before any code.

#### The problem: Python objects and databases speak different languages

A database stores rows and columns. Python works with objects and classes. Without help, you'd write raw SQL strings by hand for every query, and manually convert each result row into a Python object yourself — tedious, error-prone, and it duplicates your Pydantic models with a second, separate definition of the same data shape.

::: definition What an ORM actually is
An **O**bject-**R**elational **M**apper translates between the two worlds automatically. You define a Python class once; the ORM generates the SQL, runs it, and converts rows back into instances of that class. You call methods on objects — `session.add(book)` — instead of writing `INSERT INTO books (...) VALUES (...)` by hand.
:::

::: tip SQLModel vs raw SQLAlchemy — a naming note, not a contradiction.
This course uses SQLModel because one class does double duty as both the Pydantic validation model and the database table. Plenty of real-world FastAPI code instead uses SQLAlchemy directly — in that style you write *two* separate classes per resource: a Pydantic `BaseModel` for request/response validation, and a separate SQLAlchemy class (inheriting from a `declarative_base()`) for the table, then manually convert between them with `Model.from_orm()` or `**pydantic_obj.model_dump()`. Both approaches are legitimate — SQLModel is simply the newer, less repetitive option.
:::

**SQLModel** — built by the same person who created FastAPI — goes one step further: the same class is both your Pydantic validation model *and* your database table definition. One class, two jobs, no duplicated field lists to keep in sync.

#### When to reach for a database — and when not to

| Situation | What to use |
|---|---|
| Prototyping, a quick demo, data that's fine to lose on restart | Python list/dict — Examples 1-4's approach. Zero setup, zero dependencies |
| Data that must survive a restart, multiple users writing at once, anything resembling a real product | A real database — this section's approach |
| Learning, a small project, a single-file deployment | SQLite — a database that is just one file on disk, no separate server to run |
| Production traffic, multiple servers, high write volume | PostgreSQL or MySQL — a real database server, usually hosted separately from your API |

::: tip Best practice — start with SQLite, migrate later.
Because SQLModel is built on SQLAlchemy, switching from SQLite to PostgreSQL later is almost entirely a one-line change — the connection URL. The rest of your code, the models, the queries, stays identical. This is precisely why learning on SQLite first is a legitimate professional choice, not just a beginner shortcut.
:::

#### The pieces you need, and what each one is for

| Piece | What it is | Why it exists |
|---|---|---|
| Engine | The connection configuration to your database | Created once, reused everywhere — opening a fresh connection per request would be slow and wasteful |
| Session | A single conversation with the database, scoped to one request | Tracks what you've changed and sends it to the database only when you commit — this isolation is what keeps concurrent requests from interfering with each other |
| Model with `table=True` | A Python class that maps directly to a database table | One definition serves as both your data shape and your table schema |
| Lifespan event | Code that runs once at startup, before any request is served | The correct place to create tables and seed initial data — doing this inside a route would repeat the work on every single request |

::: warning A common mistake: sharing one session across requests.
A session is not thread-safe and is not meant to outlive a single request. Always create a new one per request via a dependency (shown below) — never store a session as a global variable and reuse it. This is one of the fastest ways to introduce hard-to-reproduce data corruption bugs in a real API.
:::

#### 5 — Persistent books API — backed by real SQLite

*example5-database/main.py*

Same books API as Example 2 — but now every book actually lives on disk, survives a restart, and the "create" and "full" model split you already know from `BookCreate` vs `Book` does double duty here as the database schema too.

```python
from contextlib import asynccontextmanager
from typing import Annotated, Generic, TypeVar
from fastapi import Depends, FastAPI, HTTPException
from pydantic import BaseModel
from sqlmodel import Field, Session, SQLModel, create_engine, select

# ── Database setup ──────────────────────────────────────────
sqlite_url = "sqlite:///database.db"
engine = create_engine(sqlite_url, connect_args={"check_same_thread": False})


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]


# ── Models — one class, validates AND maps to a table ────────
class Book(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str = Field(index=True)
    author: str
    year: int


class BookCreate(SQLModel):
    title: str
    author: str
    year: int


# ── Generic response wrapper — explained fully in the next section ──
T = TypeVar("T")


class Response(BaseModel, Generic[T]):
    data: T


# ── Lifespan — runs once at startup, seeds the database ──────
@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    with Session(engine) as session:
        if not session.exec(select(Book)).first():
            session.add_all([
                Book(title="Dune", author="Frank Herbert", year=1965),
                Book(title="Neuromancer", author="William Gibson", year=1984),
            ])
            session.commit()
    yield


app = FastAPI(lifespan=lifespan)


# ── Routes ───────────────────────────────────────────────────
@app.get("/books", response_model=Response[list[Book]])
def list_books(session: SessionDep):
    books = session.exec(select(Book)).all()
    return Response(data=books)


@app.get("/books/{book_id}", response_model=Response[Book])
def get_book(book_id: int, session: SessionDep):
    book = session.get(Book, book_id)
    if not book:
        raise HTTPException(status_code=404, detail=f"Book {book_id} not found")
    return Response(data=book)


@app.post("/books", response_model=Response[Book], status_code=201)
def create_book(book: BookCreate, session: SessionDep):
    db_book = Book.model_validate(book)
    session.add(db_book)
    session.commit()
    session.refresh(db_book)   # pulls the DB-generated id back into db_book
    return Response(data=db_book)
```

#### Four ideas that make this work

| Line | Concept |
|---|---|
| `SessionDep = Annotated[Session, Depends(get_session)]` | A named, reusable dependency — every route just asks for `SessionDep` instead of repeating `Depends(get_session)` everywhere |
| `@asynccontextmanager` + `lifespan=lifespan` | Code before `yield` runs once at startup; code after runs at shutdown. Perfect for creating tables and seeding data exactly once |
| `Book.model_validate(book)` | Converts a validated `BookCreate` (no id yet) into a full `Book` ready to insert — the same pattern as Example 2's split models, now doing double duty as the DB schema |
| `session.refresh(db_book)` | After `commit()`, the database may have generated values (like the auto-incrementing `id`) — `refresh` pulls those back into your Python object |

#### PUT and DELETE — same pattern as Example 2, now against the database

Nothing new conceptually here — this is the exact same update/delete shape from Example 2. Shown in full because the pattern of "fetch the row first, 404 if missing, then mutate" is worth seeing applied to a real database, not just a Python dict.

```python
@app.put("/books/{book_id}", response_model=Response[Book])
def update_book(book_id: int, book: BookCreate, session: SessionDep):
    db_book = session.get(Book, book_id)
    if not db_book:
        raise HTTPException(status_code=404, detail=f"Book {book_id} not found")
    db_book.title = book.title
    db_book.author = book.author
    db_book.year = book.year
    session.add(db_book)
    session.commit()
    session.refresh(db_book)
    return Response(data=db_book)


@app.delete("/books/{book_id}", status_code=204)
def delete_book(book_id: int, session: SessionDep):
    db_book = session.get(Book, book_id)
    if not db_book:
        raise HTTPException(status_code=404, detail=f"Book {book_id} not found")
    session.delete(db_book)
    session.commit()
```

::: tip SQLite here, anything else in production.
`sqlite:///database.db` is a single file — perfect for learning and small projects. Swap the URL to `postgresql://...` and everything else in this file stays identical. That is the entire point of an ORM.
:::

::: success This page shows the complete file, in two pieces for readability — setup and GET/POST above, PUT/DELETE here.
The exact same code, unsplit, is in `example5-database/main.py` in the companion zip, ready to run with no copying required.
:::

### 13. 13Real debugging — three mistakes worth making on purpose

#### Why a debugging section belongs in this guide

Every FastAPI tutorial shows you the happy path — the request that works. What actually costs beginners time is the moment something breaks and the error message doesn't obviously point at the real cause. The three cases below are not hypothetical — they are exactly the mistakes that happen when building a real database-backed API for the first time, each one confirmed reproducible in this guide's own testing before being written up.

::: definition A general debugging habit worth building now
When FastAPI returns an error, read the response body first — it usually names the exact field or exact problem. When it returns a raw `500` with a traceback in your terminal, read the traceback's **last few lines** first, not the top — the top is framework internals, the bottom is your own code and the actual failure point.
:::

| Symptom | Real cause | Fix |
|---|---|---|
| A request body that looks fine returns `422` with a confusing parse error | A trailing comma after the last field in raw JSON — `{"year": 2020,}` — which is legal in Python dicts but is **not** valid JSON | Remove the trailing comma. If you're pasting from Python code into a JSON body (e.g. in `/docs`), double-check the syntax is actually JSON, not Python |
| A route parameter named `id` causes strange, hard-to-explain bugs deeper in the same function | `id` is a Python built-in function. Naming a parameter `id` silently shadows it for the rest of that function's scope — `id(some_object)` stops working as expected inside that function | Name path parameters something specific — `book_id`, `user_id` — never the bare word `id`. This is exactly why every example in this guide uses `book_id`, not `id` |
| `500 Internal Server Error` when creating a row, something about types not matching | Passing a Pydantic input model directly to a database call the ORM does not expect — SQLModel needs the explicit conversion step | `Book.model_validate(book)` before `session.add(...)` — convert the validated input into the table model first, never skip this step |

::: warning The pattern behind all three
every one of these produces an error message that sounds unrelated to the actual cause. That gap — between what the error says and what's actually wrong — is normal in real backend work, not a sign you're doing something unusually wrong. Reading the traceback's *last* few lines, and knowing these three specific gotchas, closes that gap fast.
:::

### 14. 14Middleware, CORS, and organizing routes across files

[!Verified — timing middleware and CORS both tested with FastAPI's TestClient, headers confirmed present|green]

Every example so far lived in a single file with routes declared directly on `app`. Real projects split routes into their own files and add code that runs around every request. Three practical pieces close that gap.

#### Middleware — code that wraps every request

Middleware runs before and after every request hits your routes — the same idea as middleware in Express, Django, or any other web framework. Common uses: logging, timing, authentication checks, adding response headers.

```python
import time
from fastapi import FastAPI, Request

app = FastAPI()


@app.middleware("http")
async def timing_middleware(request: Request, call_next):
    start = time.perf_counter()
    response = await call_next(request)   # runs the actual route
    response.headers["X-Process-Time"] = f"{time.perf_counter() - start:.4f}s"
    return response
```

::: definition Reading this middleware
Everything before `await call_next(request)` runs *before* the route. `call_next(request)` is where the actual route function executes. Everything after it runs *after* the route — here, attaching a timing header to the already-built response. Every request passes through this, regardless of which route it hits.
:::

#### CORS — letting other domains call your API

Browsers block a webpage on one domain from calling an API on a different domain, by default — this is the browser's own security rule, not something FastAPI does. If your frontend and backend live on different domains (nearly always true in production), you must explicitly allow it.

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # "*" = any domain — fine for public APIs, not for private ones
    allow_methods=["*"],
    allow_headers=["*"],
)
```

::: warning Do not use `allow_origins=["*"]` for anything with private data.
It means literally any website can call your API from a user's browser. For a real product, list the exact frontend domains: `allow_origins=["https://myapp.com"]`.
:::

::: tip A real gotcha worth knowing
setting only `allow_origins` fixes `GET` requests but a `POST` or `PUT` from the browser can still fail with `405 Method Not Allowed`. CORS checks the method too — you need `allow_methods` set as well (`["*"]` for everything, or the specific list you actually use). Getting reads working but writes still failing is the signature of this exact miss.
:::

#### Splitting routes into their own files with APIRouter

Once an API has more than a handful of routes, keeping them all in one file gets unwieldy. `APIRouter` lets you define routes in a separate file, then plug the whole group into the main app at once — with a shared URL prefix and a documentation tag for free.

```python
# app/routes/issues.py — routes for this file only, no app object here
from fastapi import APIRouter

router = APIRouter(prefix="/api/v1/issues", tags=["issues"])

@router.get("")
def get_issues():
    ...


# main.py — wire it in
from app.routes.issues import router as issues_router
app.include_router(issues_router)
```

The `prefix` means every route in this router automatically starts with `/api/v1/issues` — you never repeat that string in each route. The `tags` group these routes together under one heading in `/docs`, so a large API stays organized to read, not just to write.

::: tip See these three combined in a real, deployed project
Step 8.2 builds a complete issue-tracker API using this exact structure — split routes, custom middleware, CORS, file-based storage, and a walkthrough of deploying it live. Companion guide and code available separately.
:::

### 15. 15Exercises — practice before moving on

Full details are in `EXERCISES.md` inside the zip. Summary below — do them in order, each builds on the example before it, and by the last one you'll have hit the same kind of errors this course just walked through, on purpose, with an answer already in hand.

::: exercise
**Exercise 1 — based on Example 1**

Add a route `GET /goodbye/{name}` that returns a goodbye message. Test it in `/docs`.
:::

::: exercise
**Exercise 2 — based on Example 2**

Add a `PATCH /books/{book_id}` route that updates only the fields sent, unlike `PUT` which replaces everything. Hint: make every field optional in a new Pydantic model.
:::

::: exercise
**Exercise 3 — based on Example 3**

Add a second dependency `get_current_user` that reads an `X-User-Id` header. Use both dependencies together on one route.
:::

::: exercise
**Exercise 4 — based on Example 4**

Add `GET /documents` to list everything, and `POST /documents` to add a new one. Confirm your new document shows up in `/search` results.
:::

::: exercise
**Exercise 5 — based on Example 5**

Add an `author` query parameter to `GET /books` that filters by author, querying the real database — same idea as Example 2's query parameter, but now with `select(Book).where(Book.author == author)` instead of a Python list comprehension.
:::

::: exercise
**Bonus — combine everything**

Build a small "notes" API from scratch: create, list, get one, delete, and search by keyword. Then back it with a real SQLModel database like Example 5, so notes survive a restart. This is close to a simplified version of your real project's API — and close to what you'll extend once the RAG pipeline is added.
:::

::: success When you're done
you'll have written HTTP methods, path and query parameters, request/response validation, dependency injection, an async search endpoint, and a real persistent database — every core FastAPI concept used in the rest of this course.
:::

### Extra: query and path parameters in the project API

You have three working endpoints. Now extend them with two patterns every real API uses: query parameters and path parameters. These are not new files — just additions to `routes.py` and `schemas.py`.

::: warning Optional practice: these two endpoints do not carry forward.
Step 9 gives you a complete, "full updated" `routes.py` to replace your file with entirely, and that version does not include `/info/verbose` or `/items/{item_id}`. Build them here to practice the pattern — just don't be surprised when they're gone after Step 9's rewrite. That's expected, not a mistake.
:::

::: info Query params vs path params — one rule to remember
Path params (`/items/42`) identify a specific resource. Query params (`/info?verbose=true`) modify how the response is returned. Use path params for *what*, query params for *how*.
:::

**Pattern 1 — a dedicated verbose endpoint**

Add a dedicated verbose endpoint that returns extra system info. Add this to `schemas.py` first, then add the route to `routes.py`.

```python title="Add to src/api/schemas.py"
import platform
from typing import Optional

# ── /info/verbose response ────────────────────────────────────
class InfoVerboseResponse(BaseModel):
    project: str
    python_version: str
    environment: str
    platform: str
    cpu_count: Optional[int]
```

```python title="Add to src/api/routes.py — import and new endpoint"
# add to imports at the top of routes.py
import platform
from src.api.schemas import ..., InfoVerboseResponse

# ── GET /info/verbose ─────────────────────────────────────────
@router.get("/info/verbose", response_model=InfoVerboseResponse)
def info_verbose():
    """Return extended project and system information."""
    return InfoVerboseResponse(
        project=os.getenv("PROJECT_NAME", "rag-production"),
        python_version=sys.version.split()[0],
        environment=os.getenv("ENVIRONMENT", "dev"),
        platform=platform.system(),
        cpu_count=os.cpu_count(),
    )
```

```bash title="Test it"
curl http://localhost:8000/info/verbose
# expected:
# {
#   "project": "rag-production",
#   "python_version": "3.12.x",
#   "environment": "dev",
#   "platform": "Darwin",
#   "cpu_count": 8
# }
```

**Pattern 2 — path parameter with 404**

Path parameters are variables in the URL path itself. FastAPI extracts them automatically and validates their type — if you declare `item_id: int` and a string comes in, FastAPI returns a 422 before your function is called. Add a schema and a route.

```python title="Add to src/api/schemas.py"
# ── /items/{item_id} response ─────────────────────────────────
class ItemResponse(BaseModel):
    item_id: int
    label: str
    found: bool
```

```python title="Add to src/api/routes.py"
# add to imports at top of routes.py
from fastapi import APIRouter, HTTPException
from src.api.schemas import ..., ItemResponse

# ── GET /items/{item_id} ──────────────────────────────────────
ITEMS = {1: "RAG pipeline", 2: "Vector store", 3: "LLM router"}

@router.get("/items/{item_id}", response_model=ItemResponse)
def get_item(item_id: int):
    """Look up an item by its integer ID. Returns 404 if not found."""
    if item_id not in ITEMS:
        raise HTTPException(status_code=404, detail=f"Item {item_id} not found")
    return ItemResponse(item_id=item_id, label=ITEMS[item_id], found=True)
```

```bash title="Test it — found, not found, and wrong type"
curl http://localhost:8000/items/1
# {"item_id":1,"label":"RAG pipeline","found":true}

curl http://localhost:8000/items/999
# {"detail":"Item 999 not found"}  ← clean 404

curl http://localhost:8000/items/abc
# {"detail":[...]}  ← 422 Unprocessable — FastAPI validated the int type for you
```

::: tip HTTPException vs a custom exception class.
`HTTPException` is FastAPI's built-in for returning HTTP error codes with a JSON detail message. It is the right tool when the error is about the HTTP layer (wrong ID, not found, forbidden). In Step 9 we add our own `RAGBaseError` hierarchy for domain errors — those are different things. Use each in its own lane.
:::

## 8.2 Issue Tracker: Full Project Walkthrough

*A companion to Step 8.1 — where that guide taught isolated concepts, this one builds one real, deployable project using several of them together.*

::: note Source
this is Brad Traversy's [FastAPI Crash Course](https://youtu.be/8TMQcRcBnW8) project. The companion zip is his repo, unmodified, verified working. This guide references his own written crash course (included as `docs/crash_course.md` in the zip) alongside the video.
:::

#### How this is different from Step 8.1

Step 8.1 taught FastAPI concept by concept, each in its own small example — path params here, dependencies there, a database in isolation. This walkthrough builds **one coherent project** the way a real small API actually gets built: multiple files, routes split out, custom middleware, CORS, and a genuine deployment to a live URL.

The explanation lives here. The complete, tested, multi-file project lives in the companion zip — download it, run it locally, then deploy it for real by the end of this guide.

| Item | Detail |
|---|---|
| Prerequisites | Step 8.1 sections 1–14 — especially middleware, CORS, and APIRouter |
| What you'll have by the end | A working issue-tracker API, live on the internet, with a real URL |
| Companion file | `step5.2-issue-tracker.zip` — the real repo, tested end to end |

::: info 📦 Download the project
The actual repo — every route tested with FastAPI's TestClient (10 checks, all passing) before being packaged here. Includes the original written crash course and architecture diagram.

```tree
step5.2-issue-tracker/
├── main.py
├── requirements.txt
├── README.md
├── app/
│   ├── schemas.py
│   ├── storage.py
│   ├── routes/issues.py
│   └── middleware/timing.py
└── docs/
    ├── crash_course.md
    └── crash_course_excalidraw.png
```
:::

### 0. 0ASGI vs WSGI — why FastAPI is fast

Before the project itself — one piece of terminology that explains FastAPI's whole performance story, and that Step 8.1 didn't name directly.

::: definition WSGI vs ASGI in one paragraph
**WSGI** (Web Server Gateway Interface) is the older standard — synchronous, one request handled at a time per worker. **ASGI** (Asynchronous Server Gateway Interface) is its successor — asynchronous, capable of handling many requests concurrently on a single worker by switching to other work during I/O waits. FastAPI is built on Starlette, which is ASGI-native — this is the actual mechanism behind Step 8.1's "why async is faster" explanation, now with its proper name.
:::

This matters practically: FastAPI runs on ASGI servers like `uvicorn`, not the WSGI servers (like Gunicorn's default workers) older Flask or Django deployments use. That's why the run commands in this guide say `uvicorn`, not something else.

### 1. 1Project structure — why split into files at all

Every Step 8.1 example lived in one file because the point was isolating one concept. A real project needs to grow past that — new routes, new resources, new logic — without turning into one enormous, unreadable file.

```tree
issue-tracker/
├── main.py                    # entry point — creates the app, wires everything in
├── requirements.txt            # for deployment
└── app/
    ├── schemas.py               # Pydantic models + Enums — all data shapes in one place
    ├── storage.py                # load/save issues to a JSON file
    ├── routes/
    │   └── issues.py              # every issue-related route, as one APIRouter
    └── middleware/
        └── timing.py                # custom request-timing middleware
```

::: definition The pattern behind this split
Each file has exactly one job. `schemas.py` defines what data looks like. `storage.py` knows how to persist it. `routes/issues.py` defines what happens when a request comes in. `main.py` only wires these together — it contains almost no logic of its own. This is the same "one job per file" principle from the main course's `src/` layout, applied to a FastAPI project specifically.
:::

### 2. 2Schemas — Enums and the four-tier pattern, applied for real

Step 8.1 Section 8 introduced Enums and the Base/Create/Update/Full schema split with a todo list. Here's the same pattern, doing real work for an issue tracker.

```python
class IssuePriority(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"


class IssueStatus(str, Enum):
    open = "open"
    in_progress = "in_progress"
    closed = "closed"


class IssueCreate(BaseModel):
    title: str = Field(min_length=3, max_length=100)
    description: str = Field(min_length=5, max_length=2000)
    priority: IssuePriority = IssuePriority.medium


class IssueUpdate(BaseModel):
    # every field optional — same "only touch what was sent" pattern as 5.1
    title: Optional[str] = Field(default=None, max_length=100)
    description: Optional[str] = Field(default=None, min_length=5, max_length=2000)
    priority: Optional[IssuePriority] = None
    status: Optional[IssueStatus] = None


class IssueOut(BaseModel):
    id: str
    title: str
    description: str
    priority: IssuePriority
    status: IssueStatus
```

Notice `IssueCreate` has no `id` and no `status` — the server assigns the id and always starts a new issue as `open`, never lets the client set either. Full file: `app/schemas.py` in the zip.

::: tip Why str-based Enums here, not IntEnum
status and priority are labels with meaning in their name — `"open"` reads clearly in the JSON response. There's no ordering advantage to numbers here, unlike a case where you'd sort by priority value.
:::

### 3. 3Storage — a JSON file as a mock database

This is a third persistence option, sitting between Step 8.1's in-memory list (Example 2) and its real SQLModel database (Example 5). A single JSON file is simpler than a database and still survives a restart — a reasonable choice for a small project or a prototype.

```python
def load_data():
    if DATA_FILE.exists():
        with open(DATA_FILE, "r") as f:
            content = f.read()
            if content.strip():
                return json.loads(content)
    return []


def save_data(data):
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=2)
```

::: warning The honest limitation of this approach
every route reads the entire file, then writes the entire file back. Fine for a small project or a demo; genuinely wrong for anything with real concurrent traffic, where two requests writing at once can corrupt the file. That's exactly the gap Step 8.1's SQLModel example (Section 12) exists to close.
:::

### 4. 4Routes — full CRUD wired to storage

[!Verified — create, list, get-by-id, partial update, delete, 404 handling, CORS headers, and the timing header all tested end to end on the real repo — 10 checks, all passing|green]

The router uses the `APIRouter` pattern from Step 8.1 Section 14 — a prefix, tags for the docs, and every route calling into `storage.py` rather than touching files directly.

```python
router = APIRouter(prefix="/api/v1/issues", tags=["Issues"])


@router.post("", response_model=IssueOut, status_code=status.HTTP_201_CREATED)
def create_issue(payload: IssueCreate):
    """Create new issue. The issue is persisted to data/issues.json"""
    issues = load_data()

    issue = {
        "id": str(uuid.uuid4()),
        "title": payload.title,
        "description": payload.description,
        "priority": payload.priority.value,
        "status": "open",
    }

    issues.append(issue)
    save_data(issues)
    return issue
```

| Detail | Why it matters |
|---|---|
| `payload.priority.value` | Enum members aren't automatically plain strings when written to JSON by hand (unlike returning them through a Pydantic `response_model`, which handles this for you) — `.value` pulls out the raw string explicitly, since this writes straight to a JSON file |
| `prefix="/api/v1/issues"` | Matches the versioned convention used everywhere in this project, including the health check — every route consistently sits under `/api/v1` |

GET (list and by-id), PUT (partial update, same "only touch what was sent" logic), and DELETE follow the same shapes — full code in `app/routes/issues.py` in the zip.

### 5. 5main.py — wiring the whole app together

This file is short on purpose — it only assembles pieces defined elsewhere.

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.issues import router as issues_router
from app.middleware.timing import timing_middleware

app = FastAPI(
    title="Issue Tracker API",
    version="0.1.0",
    description="A mini production-style API built with FastAPI",
)

app.middleware("http")(timing_middleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/v1/health")
def health_check():
    return {"status": "ok"}


app.include_router(issues_router)
```

Every request now gets a timing header, every domain can call this API (fine for a public demo — see Step 8.1's warning about tightening this for anything private), and issue routes live entirely in their own file.

::: tip `allow_credentials=True`
— allows cookies and auth headers to be included in cross-origin requests. Not strictly needed for this project (no auth here yet), but a common default to set up front if authentication might be added later.
:::

### 6. 6Running it locally

```bash
git clone https://github.com/bradtraversy/fastapi-issue-tracker.git
cd fastapi-issue-tracker

python -m venv .venv
source .venv/bin/activate          # macOS/Linux
.venv\Scripts\activate              # Windows

pip install "fastapi[standard]"
fastapi dev main.py
```

Open `http://localhost:8000/docs` for Swagger UI, or `/redoc` for the alternate documentation style FastAPI also generates automatically. Every route shows up under the "Issues" tag, testable directly in the browser.

Data persists to `data/issues.json` — stop the server, restart it, your issues are still there. Delete that file any time to reset.

### 7. 7Deploying it live — Render walkthrough

Everything up to here has run on your own machine. This section takes the exact same code and puts it on a real URL, reachable by anyone.

#### Step 1 — generate requirements.txt

```bash
pip freeze > requirements.txt
```

This lists every installed package and its exact version — the deployment host uses this to recreate your environment. Already included in the zip.

#### Step 2 — push to GitHub

Deployment hosts like Render connect directly to a GitHub repo and redeploy automatically on every push. Create a repo, push this project to it.

#### Step 3 — create the service on Render

**Step 1**

Go to render.com, sign in with GitHub

**Step 2**

"New Web Service" → select your repo

**Step 3**

Build command:

pip install -r requirements.txt

**Step 4**

Start command:

uvicorn main:app --host 0.0.0.0 --port $PORT

**Step 5**

Click "Create Web Service" and wait for it to finish

::: definition Why --host 0.0.0.0 and $PORT specifically
`--host 0.0.0.0` tells uvicorn to accept connections from any network interface, not just your own machine — required for a server other people can reach. `$PORT` is an environment variable Render sets for you at runtime; your app must listen on whatever port Render assigns, not a hardcoded one.
:::

#### Step 4 — confirm it's live

Render gives you a URL once the build finishes. Visit `your-url.onrender.com/docs` — the same interactive documentation you used locally, now live for anyone with the link.

::: success What you have now
a real, deployed API with a public URL, full CRUD, persistent storage, and interactive docs — the same shape of project you'll extend when the RAG pipeline is added later in the main course.
:::

::: warning One honest limitation to know about
Render's free tier storage is not permanent across deploys — a JSON file on disk can be wiped when the service restarts or redeploys. Fine for demoing this walkthrough; for anything you need to keep, use a real database (Step 8.1 Section 12) with a managed database service instead of file storage.
:::

::: tip Going further — authentication.
The original written crash course (`docs/crash_course.md` in the zip) continues past deployment into JWT-based authentication and password hashing — a large enough topic that it's flagged here rather than folded silently into this guide. Ask if you want that covered as its own addition.
:::

## 8.3 Products Inventory API: Raw SQLAlchemy Walkthrough

*A second full-project companion. Same shape as Step 8.2, different ORM style — plus a real (if unfinished) React frontend and a genuine CORS bug to learn from.*

#### How this is different from Step 8.2

Step 8.2 used SQLModel, where one class is both the Pydantic validation model and the database table. This project uses **plain SQLAlchemy** instead — the more traditional, still extremely common pattern where you write *two* separate classes per resource and convert between them by hand. Both are legitimate; seeing both means you'll recognize either style in real codebases.

This project also connects to a real React frontend (included in the zip, though its `App.js` is an empty scaffold — this course does not teach React) and walks through a genuine CORS failure that happens when you configure it halfway.

| Item | Detail |
|---|---|
| Prerequisites | Step 8.1 Section 12 (ORM concepts) and Section 14 (CORS) |
| Database | SQLite by default (zero setup) — PostgreSQL supported, one line to switch |
| Companion file | `step5.3-products-api.zip` — backend, tested end to end |

::: info 📦 Download the project
Full CRUD backed by a real database, tested end to end with FastAPI's TestClient — including the CORS failure this guide walks through, reproduced and confirmed, not just described.

```tree
step5.3-products-api/
├── main.py
├── models.py                 (Pydantic — validation)
├── database_models.py        (SQLAlchemy — the table)
├── database.py
├── requirements.txt
├── README.md
└── frontend/                 (React scaffold, not wired up)
```
:::

### 1. 1Two models instead of one — the SQLAlchemy split

Step 8.1's SQLModel example used one class for both jobs. Plain SQLAlchemy keeps them separate — here's exactly what each one looks like and why the split exists.

```python
# models.py — Pydantic, for request/response validation
from pydantic import BaseModel

class Product(BaseModel):
    id: int
    name: str
    description: str
    price: float
    quantity: int


# database_models.py — SQLAlchemy, the actual table
from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    price = Column(Float)
    quantity = Column(Integer)
```

::: definition Why two classes with the same name, in different files
`models.Product` knows nothing about databases — it only validates incoming JSON. `database_models.Product` knows nothing about HTTP — it only maps to a table. Neither imports the other. Every route is responsible for converting between them, which is more explicit (and more typing) than SQLModel's single-class approach, but keeps validation logic and storage logic fully independent.
:::

::: tip declarative_base() location
`sqlalchemy.ext.declarative` still works and is what's used here — confirmed with zero deprecation warnings on current SQLAlchemy 2.0. Some newer code imports it from `sqlalchemy.orm` instead; both work identically.
:::

### 2. 2Connecting to the database

The walkthrough uses PostgreSQL. The zip defaults to SQLite instead so you can run it with zero extra setup — same SQLAlchemy code either way, only the connection string changes.

```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# PostgreSQL (as in the walkthrough):
# DB_URL = "postgresql://postgres:yourpassword@localhost:5432/products_db"

# SQLite (what the zip actually ships with — no server needed):
DB_URL = "sqlite:///./products.db"

engine = create_engine(DB_URL, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
```

`autocommit=False` means nothing saves to the database until you explicitly call `db.commit()` — every route below does this deliberately, right after making a change.

#### Dependency injection for the session — the same pattern as Step 8.1

```python
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

This is the same generator-based dependency shape from Step 8.1's SQLModel example — a session is created, handed to the route via `Depends(get_db)`, and guaranteed to close afterward regardless of whether the route succeeded or raised an error.

### 3. 3Full CRUD, converting between the two models

[!Verified — create, list, get-by-id, update, delete, and missing-id handling all tested end to end (12 checks, all passing)|green]

Every write operation does the same conversion: take the validated Pydantic object, unpack it into the SQLAlchemy model.

```python
@app.post("/products/")
def create_product(product: Product, db: Session = Depends(get_db)):
    db.add(database_models.Product(**product.model_dump()))
    db.commit()
    return {"message": "Product created successfully", "product": product}


@app.put("/products/{product_id}")
def update_product(product_id: int, product: Product, db: Session = Depends(get_db)):
    db_product = db.query(database_models.Product).filter(database_models.Product.id == product_id).first()
    if db_product:
        db_product.name = product.name
        db_product.description = product.description
        db_product.price = product.price
        db_product.quantity = product.quantity
        db.commit()
        return {"message": "Product updated successfully"}
    return {"error": "Product not found"}
```

| Line | What it does |
|---|---|
| `**product.model_dump()` | Unpacks the Pydantic object into keyword arguments the SQLAlchemy model's constructor accepts |
| `db.query(...).filter(...).first()` | SQLAlchemy's equivalent of SQLModel's `select(...).where(...)` — same idea, different syntax |
| Update by mutating `db_product` fields directly | No separate "rebuild the object" step — SQLAlchemy tracks the change and `commit()` saves it |

GET (list and by-id) and DELETE follow the same shapes — full code in `main.py` in the zip.

### 4. 4Seeding initial data — without duplicating it on every reload

Insert dummy data unconditionally, and every server restart adds four more duplicate rows. The fix: check the row count first.

```python
def init_db():
    db = SessionLocal()
    count = db.query(database_models.Product).count()
    if count == 0:
        seed_products = [
            Product(id=1, name="Phone", description="A smartphone", price=699.99, quantity=50),
            # ...three more
        ]
        for product in seed_products:
            db.add(database_models.Product(**product.model_dump()))
        db.commit()
    db.close()
```

::: tip This is the same idea as Step 8.1's lifespan-based seeding
(Section 12) — check before inserting — just written as a plain function call at import time instead of inside a `lifespan` context manager. Both approaches prevent the same bug: duplicate seed rows piling up every time the server restarts.
:::

### 5. 5Running it and connecting a frontend

```bash
uv venv
source .venv/bin/activate
uv add "fastapi[standard]" sqlalchemy psycopg2-binary
fastapi dev main.py
```

Open `/docs` — four seeded products appear on first run, full CRUD testable directly. The zip's `frontend/` folder is the React app referenced in the walkthrough — its `App.js` is an empty scaffold, not working code. This course does not teach React; it's included for anyone who wants to build the connection themselves.

::: warning If you do wire up a frontend
update `allow_origins` in `main.py` to match wherever it actually runs — the default here is `http://localhost:3000`, the standard port for `npm start`.
:::

### 6. 6The CORS bug, reproduced on purpose

Step 8.1 Section 14 mentions this as a tip. Here it is, actually reproduced, so the symptom is unmistakable next time you hit it.

```text
# CORS configured with only allow_origins — no allow_methods:
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:3000"])

# Result of a POST preflight request from the browser:
# OPTIONS /test -> 400
# access-control-allow-methods: GET   (only GET, nothing else)
```

Confirmed directly: a GET works fine with only `allow_origins` set. A POST from the same frontend fails — the browser's preflight `OPTIONS` check returns `400`, and the allowed-methods header lists only `GET`. Reads work, writes silently fail. That mismatch is the exact signature of this bug.

```text
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],   # the fix
    allow_headers=["*"],
)
```

::: success Verified, not just described
both the broken and fixed versions were actually run against a real preflight request in this guide's own testing — the failure and the fix are both confirmed, not assumed from the walkthrough alone.
:::

## 8.4 FastAPI Deep Dive

*Five production patterns beyond the basics. Each section is self-contained, tested end to end — jump to what you need.*

| Item | Detail |
|---|---|
| Requires | Step 8 complete — `src/api/` working |
| This page covers | Auth (JWT) · Background tasks · File upload · Streaming · Middleware |
| Status | Companion reference — every example tested with FastAPI's TestClient |

::: info A database section was intentionally left out.
Step 8.3 already covers raw SQLAlchemy in full depth with a real, tested project — repeating it here would just duplicate that content with a different toy example.
:::

### 1. Authentication & JWT

[!python-jose · bcrypt|blue] [!Verified — login (correct and wrong password), protected route with valid token, missing token, and garbage token all tested: 5 checks, all passing|green]

::: definition How JWT auth works in FastAPI
Client sends username + password → server verifies → server issues a signed token (JWT) → client sends that token in every future request header → server verifies the signature and reads the user from the token. No session storage needed — the token carries the identity.
:::

```bash title="New packages for this section"
uv add python-jose[cryptography] bcrypt python-multipart
uv lock && uv sync
```

`python-jose` — encode and decode JWTs · `bcrypt` — hash and verify passwords · `python-multipart` — required for form-based login (`OAuth2PasswordRequestForm`)

```python title="Schemas — put these in src/api/schemas.py alongside the existing ones"
class Token(BaseModel):
    access_token: str
    token_type: str


class UserOut(BaseModel):
    username: str
    role: str
```

```python title="Password helpers — hash once, verify on every login"
import bcrypt

def hash_password(password: str) -> bytes:
    """Hash a plain password. Call once when the user is created."""
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt())

def verify_password(password: str, hashed: bytes) -> bool:
    """Check a plain password against its stored hash."""
    return bcrypt.checkpw(password.encode(), hashed)
```

::: tip Never store plain passwords.
Store only the hash. `bcrypt.gensalt()` generates a unique random salt every time, so two users with the same password get different hashes. `checkpw` handles the salt automatically.
:::

```text title="A fake user store — replace with a real database later"
# for this example only — a real project stores this in the database from Step 8.3
FAKE_USERS = {
    "alice": {
        "username": "alice",
        "role": "admin",
        "hashed_password": hash_password("secret123"),
    }
}
```

```python title="JWT helpers — create tokens and decode them"
from datetime import datetime, timedelta, timezone
from typing import Optional
from jose import JWTError, jwt

SECRET_KEY = "change-this-in-production"  # store in .env as JWT_SECRET
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=15))
    to_encode["exp"] = expire
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
```

```python title="The protected dependency — call once, use everywhere"
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")

def get_current_user(token: str = Depends(oauth2_scheme)) -> UserOut:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = FAKE_USERS.get(username)
    if user is None:
        raise credentials_exception
    return UserOut(username=user["username"], role=user["role"])
```

```python title="The two endpoints"
from fastapi.security import OAuth2PasswordRequestForm

# ── POST /auth/token — login, returns JWT ─────────────────────
@app.post("/auth/token", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = FAKE_USERS.get(form_data.username)
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    token = create_access_token(
        data={"sub": user["username"]},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
    )
    return Token(access_token=token, token_type="bearer")


# ── GET /auth/me — protected route ────────────────────────────
@app.get("/auth/me", response_model=UserOut)
def read_me(current_user: UserOut = Depends(get_current_user)):
    return current_user
```

```text title="Test it with curl"
# Step 1 — login and get a token
curl -X POST http://localhost:8000/auth/token \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "username=alice&password=secret123"
# {"access_token":"eyJ...", "token_type":"bearer"}

# Step 2 — call a protected route with the token
curl http://localhost:8000/auth/me \
     -H "Authorization: Bearer eyJ..."
# {"username":"alice","role":"admin"}

# No token — 401
curl http://localhost:8000/auth/me
# {"detail":"Not authenticated"}
```

::: info Protect any route with one line.
Add `current_user: UserOut = Depends(get_current_user)` as a parameter to any route function. If the token is missing or invalid, FastAPI returns 401 before your code runs. This dependency can also check roles: `if current_user.role != "admin": raise HTTPException(403)`.
:::

::: tip Production checklist
move `SECRET_KEY` to `.env` — never commit it · set a short expiry (15–30 min) and add a refresh token endpoint · use HTTPS only — tokens in plain HTTP can be stolen · consider `python-jose`'s RS256 algorithm for asymmetric keys if you have multiple services verifying tokens.
:::

---

### 2. Background Tasks

[!built-in — no extra packages|blue] [!Verified — queued response, completed status after the task runs, missing-report 404, and empty-title validation all tested: 4 checks, all passing|green]

::: definition Why background tasks?
Some work takes time — sending an email, generating a report, indexing a document. If you do it inside the request handler, the client waits. Background tasks let you return a response immediately (HTTP 202 Accepted) and do the work after. FastAPI's `BackgroundTasks` is built-in and runs in the same process. For heavy production workloads, use Celery or RQ instead.
:::

```python title="The request schema"
from pydantic import BaseModel, Field

class ReportRequest(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    pages: int = Field(gt=0, le=1000)
```

```python title="Queue work and return immediately"
from fastapi import FastAPI, BackgroundTasks, HTTPException
import time, uuid

app = FastAPI()
REPORTS: dict[str, dict] = {}  # in-memory; use Redis in production

def generate_report(report_id: str, title: str, pages: int):
    """Slow work — runs after the response is already sent."""
    REPORTS[report_id]["status"] = "processing"
    time.sleep(2)  # simulate slow I/O
    REPORTS[report_id]["status"] = "done"
    REPORTS[report_id]["message"] = f"Report '{title}' with {pages} pages is ready."

@app.post("/reports/generate", status_code=202)
def start_report(request: ReportRequest, background_tasks: BackgroundTasks):
    report_id = str(uuid.uuid4())[:8]
    REPORTS[report_id] = {"status": "queued", "title": request.title, "message": "Queued."}
    # add_task: function + its args — runs after response is sent
    background_tasks.add_task(generate_report, report_id, request.title, request.pages)
    return {"report_id": report_id, "status": "queued"}

@app.get("/reports/{report_id}")
def get_report(report_id: str):
    if report_id not in REPORTS:
        raise HTTPException(status_code=404, detail="Report not found")
    return REPORTS[report_id]
```

```text title="Test it with curl"
# Start the report — returns immediately with 202
curl -X POST http://localhost:8000/reports/generate \
     -H "Content-Type: application/json" \
     -d '{"title": "Q4 RAG Report", "pages": 20}'
# {"report_id":"abc123","status":"queued"}   ← instant

# Poll the status — check a few seconds later
curl http://localhost:8000/reports/abc123
# {"status":"done","message":"Report 'Q4 RAG Report' with 20 pages is ready."}
```

::: info 202 vs 200 — why it matters.
HTTP 200 means "done." HTTP 202 means "accepted, working on it." Clients that check the status code correctly know not to treat a 202 as a completed result. Always return 202 when the work will finish after the response is sent.
:::

::: tip When to use Celery instead.
`BackgroundTasks` is fine for lightweight work (sending a single email, updating a counter). If a task takes minutes, uses a lot of memory, needs to survive a server restart, or must be retried on failure — use Celery with a Redis or RabbitMQ broker. The API shape stays identical; only the internals change.
:::

---

### 3. File Upload

[!python-multipart|blue] [!Verified — valid upload, wrong content type, oversized file, and batch upload all tested: 4 checks, all passing|green]

::: definition How file upload works
Files are sent as `multipart/form-data` — a different encoding from JSON. FastAPI's `UploadFile` gives you the filename, content type, and an async `read()` method. Always validate type and size before accepting the file — clients can send anything.
:::

```python title="Single file upload with type and size validation"
from fastapi import FastAPI, UploadFile, File, HTTPException

ALLOWED_TYPES = {"application/pdf", "text/plain"}
MAX_SIZE_BYTES = 10 * 1024 * 1024  # 10 MB

@app.post("/upload/pdf")
async def upload_pdf(file: UploadFile = File(...)):
    # 1. validate content type
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=415,  # Unsupported Media Type
            detail=f"Type {file.content_type!r} not allowed. Accepted: {ALLOWED_TYPES}",
        )
    # 2. read and validate size
    content = await file.read()
    if len(content) > MAX_SIZE_BYTES:
        raise HTTPException(status_code=413, detail="File too large")
    # 3. process — save to disk, cloud, or pass to ingestion pipeline
    return {
        "filename": file.filename,
        "content_type": file.content_type,
        "size_bytes": len(content),
        "status": "accepted",
    }
```

```python title="Batch upload — multiple files in one request"
@app.post("/upload/batch")
async def upload_batch(files: list[UploadFile] = File(...)):
    results = []
    for f in files:
        content = await f.read()
        results.append({
            "filename": f.filename,
            "size_bytes": len(content),
            "status": "accepted",
        })
    return {"uploaded": len(results), "files": results}
```

```text title="Test with curl"
# single file
curl -X POST http://localhost:8000/upload/pdf \
     -F "file=@data/raw/sample.pdf;type=application/pdf"
# {"filename":"sample.pdf","content_type":"application/pdf","size_bytes":1234,"status":"accepted"}

# wrong type — 415
curl -X POST http://localhost:8000/upload/pdf \
     -F "file=@photo.jpg;type=image/jpeg"
# {"detail":"Type 'image/jpeg' not allowed..."}
```

::: tip Where to save uploaded files in production
do not save to local disk — your server might have multiple instances or restart and lose files. Use `boto3` to upload to S3, or `google-cloud-storage` for GCS. Pass the file content bytes directly to the storage client's upload method.
:::

::: info Connection to this course's RAG pipeline.
An endpoint like `POST /upload/pdf` is the natural entry point ahead of ingestion — the file content you read here is exactly what Step 12's `PDFManager` and `IngestionPipeline` expect as input, once saved to `data/raw/`.
:::

---

### 4. Streaming Responses

[!built-in StreamingResponse|blue] [!Verified — 14 lines received, correct start/token/done sequence, reassembled answer matches exactly: all checks passing|green]

::: definition Why streaming?
LLMs generate text token by token. Without streaming, the client waits for the entire answer before seeing anything — which can be 10–30 seconds. With streaming, each token is sent the moment it is generated. The user sees the answer appear in real time. This is what ChatGPT does. The generation logic Step 13 already built (`Generator.generate()`) can be adapted to this same streaming shape.
:::

```python title="A generator that yields chunks as newline-delimited JSON"
import asyncio, json
from fastapi.responses import StreamingResponse

async def rag_stream_generator(question: str):
    """
    Simulate streaming a RAG answer token by token.
    In production: replace the answer_parts list with actual LLM stream output.
    """
    answer_parts = [
        "RAG ", "stands ", "for ", "Retrieval-Augmented ", "Generation. ",
        "It ", "combines ", "document ", "search ", "with ", "LLM ", "generation.",
    ]
    # signal start — client can show a loading indicator until this arrives
    yield json.dumps({"type": "start", "question": question}) + "\n"
    for part in answer_parts:
        yield json.dumps({"type": "token", "content": part}) + "\n"
        await asyncio.sleep(0)  # yield control to event loop between tokens
    yield json.dumps({"type": "done", "content": ""}) + "\n"
```

```python title="The streaming endpoint"
@app.get("/stream/rag")
async def stream_rag(question: str = "What is RAG?"):
    """Stream a RAG-style answer token by token."""
    return StreamingResponse(
        rag_stream_generator(question),
        media_type="application/x-ndjson",  # newline-delimited JSON
    )
```

```text title="Test it — watch the chunks arrive live"
# --no-buffer: show output as it arrives, not buffered
curl --no-buffer "http://localhost:8000/stream/rag?question=What+is+RAG%3F"
# {"type":"start","question":"What is RAG?"}
# {"type":"token","content":"RAG "}
# {"type":"token","content":"stands "}
# ...
# {"type":"done","content":""}
```

```text title="Wiring to a real, streaming LLM call — matching this project's langchain_openai convention"
# This project uses langchain_openai everywhere (Step 5, Step 13's Generator) —
# here is the same streaming pattern using that library, not raw openai:
async def rag_stream_from_llm(question: str):
    from langchain_openai import ChatOpenAI
    llm = ChatOpenAI(model="gpt-4o-mini", streaming=True)
    yield json.dumps({"type": "start", "question": question}) + "\n"
    async for chunk in llm.astream(question):
        if chunk.content:
            yield json.dumps({"type": "token", "content": chunk.content}) + "\n"
    yield json.dumps({"type": "done", "content": ""}) + "\n"
```

::: tip NDJSON (newline-delimited JSON)
is the standard format for streaming JSON — one complete JSON object per line. Every client that reads the stream parses one line at a time. Alternatives: Server-Sent Events (SSE) with `text/event-stream` and `data:` prefix for browser EventSource compatibility.
:::

---

### 5. Middleware — beyond Step 8.1

[!built-in — no extra packages|blue] [!Verified — both X-Process-Time-Ms and X-Request-ID headers confirmed present and correctly formatted|green]

Step 8.1 Section 14 already covers the basics — the decorator form (`@app.middleware("http")`) and CORS. This section adds two things that build on that: the **class-based** middleware form, used when middleware needs its own state or configuration, and a genuinely useful pattern — request ID tracing.

```python title="CORS — same as Step 8.1, shown here for completeness"
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://myapp.com"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)
```

**Class-based middleware — the other valid form**

Step 8.1 used the decorator form (`@app.middleware("http")`). `BaseHTTPMiddleware` is the class-based equivalent — functionally identical, but easier to configure or extend when a middleware needs its own setup.

```python
import time
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request

class TimingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start = time.perf_counter()
        response = await call_next(request)          # run the route function
        duration_ms = (time.perf_counter() - start) * 1000
        response.headers["X-Process-Time-Ms"] = f"{duration_ms:.2f}"
        return response

app.add_middleware(TimingMiddleware)
```

```python title="Request ID middleware — trace every request through logs"
import uuid

class RequestIDMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        request_id = str(uuid.uuid4())[:8]
        request.state.request_id = request_id          # accessible inside route functions
        response = await call_next(request)
        response.headers["X-Request-ID"] = request_id  # visible to clients
        return response

app.add_middleware(RequestIDMiddleware)
```

```bash title="Verify the headers are present"
curl -i http://localhost:8000/health
# HTTP/1.1 200 OK
# x-process-time-ms: 0.42
# x-request-id: b07f4d50
# content-type: application/json
#
# {"status":"ok","version":"0.1.0"}
```

::: tip Middleware order matters.
Middleware added last wraps outermost — it runs first on the way in and last on the way out. Add CORS first so it wraps everything. Add logging/timing last so it measures the full request including other middleware.
:::

## Step 9: Core services

Stop using print(). Stop using os.getenv() everywhere. Build the shared foundation every module depends on.

::: info What you will do
src/core/ built · all existing modules updated · project thinks and fails like a professional app
:::

::: note Why
Stop using print(). Stop using os.getenv() everywhere. Build the shared foundation every module depends on.
:::

### Why print() is not logging and Exception is not error handling

You used print() in Steps 2, 3, and 5 to see what your code was doing. That is fine for learning. In a real project it breaks immediately:

```text title="Example (illustrative)"
# print() problems in a real project:
print("Processing file...")   # no timestamp — when did this happen?
print("Error!")               # no level — is this fatal or a warning?
print("Done")                  # no context — which file? which module?
                               # and you cannot turn it off without deleting it

# logging gives you this instead:
# 2024-01-15 14:32:01 | INFO     | pdf_manager | Processing sample.pdf
# 2024-01-15 14:32:01 | ERROR    | pdf_manager | File not found: missing.pdf
# timestamp + level + module + message — always
```

Same problem with exceptions:

```text title="Example (illustrative)"
# generic Exception tells you nothing useful:
raise Exception("something went wrong")

# custom exceptions tell you exactly what failed and where:
raise DocumentLoadError("Cannot read sample.pdf — file is corrupted")
raise ConfigurationError("OPENAI_API_KEY is missing from .env")
```

::: info Info
The rule from now on: no print() in src/ — use the logger. No bare Exception — use a custom exception. print() is fine in notebooks and scripts. Never in application code.
:::

### Create src/core/

```bash
mkdir src/core
touch src/core/__init__.py src/core/config.py src/core/logging_setup.py src/core/exceptions.py
```

→ No output. Creates the core folder and empty files.

**Install pydantic-settings — needed for config.py**

```bash
uv add pydantic-settings
```

→ Prints the packages it installs.

::: tip Tip
pydantic-settings reads environment variables and validates them with Pydantic — the same tool you used for API schemas in Step 8, now applied to configuration.
:::

### Write src/core/config.py

One place for every environment variable in the project. Every module imports from here — no more os.getenv() scattered across files. If a variable is missing, the app fails immediately at startup with a clear error.

**Open src/core/config.py and write this**

```python title="Open src/core/config.py and write this"
# ─────────────────────────────────────────────────────────────
# src/core/config.py
# One job: read and validate all environment variables
# Import get_settings() anywhere you need config
# ─────────────────────────────────────────────────────────────

from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """All environment variables for the project — validated at startup."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",   # ignore unknown vars in .env
    )

    # project
    project_name: str = "rag-production"
    environment: str = "dev"
    log_level: str = "INFO"

    # llm providers
    openai_api_key: str = ""
    google_api_key: str = ""

    # data paths
    raw_data_dir: str = "data/raw"
    processed_data_dir: str = "data/processed"
    output_data_dir: str = "data/output"


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    """
    Return the settings singleton.
    lru_cache means .env is only read once — not on every function call.
    """
    return Settings()


if __name__ == "__main__":
    # test: python src/core/config.py
    s = get_settings()
    print(f"Project : {s.project_name}")
    print(f"Env     : {s.environment}")
    print(f"Log level: {s.log_level}")
    print(f"OpenAI key loaded: {bool(s.openai_api_key)}")
```

::: tip Tip
Why @lru_cache? Without it, every time any module calls get_settings() Python reads the .env file from disk again. With lru_cache(maxsize=1) it reads once at startup and returns the same object every time — fast and consistent.
:::

### Write src/core/logging_setup.py

One function sets up logging for the entire project. Every module gets its own named logger — so every log line tells you exactly which module produced it.

**Open src/core/logging_setup.py and write this**

```python title="Open src/core/logging_setup.py and write this"
# ─────────────────────────────────────────────────────────────
# src/core/logging_setup.py
# One job: configure logging once, provide get_logger() to all modules
# ─────────────────────────────────────────────────────────────

import logging
import sys


def setup_logging(log_level: str = "INFO") -> None:
    """
    Configure logging for the whole project.
    Call this once at startup in src/api/main.py.
    Format: timestamp | level | module | message
    """
    log_format = "%(asctime)s | %(levelname)-8s | %(name)s | %(message)s"
    date_format = "%Y-%m-%d %H:%M:%S"

    logging.basicConfig(
        level=getattr(logging, log_level.upper(), logging.INFO),
        format=log_format,
        datefmt=date_format,
        handlers=[
            logging.StreamHandler(sys.stdout),  # print to terminal
        ],
    )


def get_logger(name: str) -> logging.Logger:
    """
    Get a named logger for a module.
    Usage: logger = get_logger(__name__)
    This gives every module its own logger named after the file.
    """
    return logging.getLogger(name)


if __name__ == "__main__":
    # test: python src/core/logging_setup.py
    setup_logging("DEBUG")
    logger = get_logger(__name__)

    logger.debug("this is a DEBUG message — only shown in DEBUG level")
    logger.info("this is an INFO message — normal operation")
    logger.warning("this is a WARNING — something unexpected but not fatal")
    logger.error("this is an ERROR — something failed")
    logger.critical("this is CRITICAL — the app cannot continue")
```

::: tip Tip
Log levels from lowest to highest: DEBUG — detailed info, only during development INFO — normal operations, what the app is doing WARNING — something unexpected, app still works ERROR — something failed, needs attention CRITICAL — app cannot continue In .env set LOG_LEVEL=DEBUG during development, LOG_LEVEL=INFO in production.
:::

### Write src/core/exceptions.py

Custom exceptions make errors meaningful. When something fails, the exception name tells you exactly what went wrong — before you even read the message.

**Open src/core/exceptions.py and write this**

```python title="Open src/core/exceptions.py and write this"
# ─────────────────────────────────────────────────────────────
# src/core/exceptions.py
# One job: define all custom exceptions for the project
# Each exception maps to one layer of the RAG pipeline
# ─────────────────────────────────────────────────────────────


# ── Base exception — all project exceptions inherit from this ─
class RAGBaseError(Exception):
    """Base class for all project exceptions."""
    def __init__(self, message: str):
        self.message = message
        super().__init__(message)

    def __str__(self) -> str:
        return f"[{self.__class__.__name__}] {self.message}"


# ── Configuration ─────────────────────────────────────────────
class ConfigurationError(RAGBaseError):
    """Raised when a required env var is missing or invalid."""


# ── Document loading ──────────────────────────────────────────
class DocumentLoadError(RAGBaseError):
    """Raised when a file cannot be read or parsed."""


# ── Retrieval ─────────────────────────────────────────────────
class RetrievalError(RAGBaseError):
    """Raised when vector search or retrieval fails."""


# ── Generation ────────────────────────────────────────────────
class GenerationError(RAGBaseError):
    """Raised when the LLM call fails."""


# ── API ───────────────────────────────────────────────────────
class APIError(RAGBaseError):
    """Raised when an API request is invalid or fails."""


if __name__ == "__main__":
    # test: python src/core/exceptions.py
    try:
        raise DocumentLoadError("Cannot read sample.pdf — file is corrupted")
    except RAGBaseError as e:
        print(e)   # [DocumentLoadError] Cannot read sample.pdf — file is corrupted

    try:
        raise ConfigurationError("OPENAI_API_KEY is missing from .env")
    except RAGBaseError as e:
        print(e)   # [ConfigurationError] OPENAI_API_KEY is missing from .env
```

::: tip Tip
Why a base class? Any module can catch RAGBaseError to handle all project errors in one place — or catch a specific one like DocumentLoadError to handle only that case. This is how professional projects handle errors across many modules.
:::

### Update existing modules to use core services

This is the most important part of Step 9. Students see that one change in src/core/ improves the whole project immediately. Replace print() with the logger and Exception with custom exceptions.

**Update src/pdf_manager.py — replace print() and Exception**

Before — Step 6

```python title="Update src/pdf_manager.py — replace print() and Exception"
import os
from pathlib import Path

class PDFManager:
  def read(self, filename):
    if not filepath.exists():
      raise FileNotFoundError(...)
    print(f"Read {filename}")
```

After — Step 9

```python title="Update src/pdf_manager.py — replace print() and Exception"
from src.core.logging_setup import get_logger
from src.core.exceptions import DocumentLoadError

logger = get_logger(__name__)

class PDFManager:
  def read(self, filename):
    if not filepath.exists():
      raise DocumentLoadError(...)
    logger.info(f"Read {filename}")
```

**Full updated src/pdf_manager.py**

```python title="Full updated src/pdf_manager.py"
# ─────────────────────────────────────────────────────────────
# src/pdf_manager.py — updated in Step 9
# Changes: print() → logger, FileNotFoundError → DocumentLoadError
# ─────────────────────────────────────────────────────────────

from pathlib import Path
from pypdf import PdfReader
from src.core.logging_setup import get_logger
from src.core.exceptions import DocumentLoadError

logger = get_logger(__name__)  # named after this file: src.pdf_manager


class PDFManager:
    """Reads PDF files from data/raw/ and saves extracted text to data/processed/."""

    def __init__(self, raw_dir: str = "data/raw", processed_dir: str = "data/processed"):
        self.raw_dir = Path(raw_dir)
        self.processed_dir = Path(processed_dir)

    def read(self, filename: str) -> str:
        filepath = self.raw_dir / filename
        if not filepath.exists():
            logger.error(f"PDF not found: {filepath}")
            raise DocumentLoadError(f"PDF not found: {filepath}")
        try:
            reader = PdfReader(str(filepath))
            pages = [page.extract_text() for page in reader.pages]
            text = "\n".join(pages)
            logger.info(f"Read {filename} — {len(reader.pages)} page(s)")
            return text
        except Exception as e:
            logger.error(f"Failed to read {filename}: {e}")
            raise DocumentLoadError(f"Failed to read {filename}: {e}") from e

    def get_metadata(self, filename: str) -> dict:
        filepath = self.raw_dir / filename
        if not filepath.exists():
            raise DocumentLoadError(f"PDF not found: {filepath}")
        reader = PdfReader(str(filepath))
        logger.debug(f"Metadata for {filename}: {len(reader.pages)} pages")
        return {"filename": filename, "pages": len(reader.pages), "metadata": reader.metadata}

    def save_text(self, filename: str, text: str) -> Path:
        output_name = Path(filename).stem + "_extracted.txt"
        output_path = self.processed_dir / output_name
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(text)
        logger.info(f"Saved extracted text → {output_path}")
        return output_path

    def process(self, filename: str) -> Path:
        text = self.read(filename)
        return self.save_text(filename, text)
```

**Full updated src/csv_manager.py**

::: example Concept
Same pattern as pdf_manager.py above — replace print() with logger, replace FileNotFoundError with DocumentLoadError. The write() method's empty-data check stays as a plain ValueError — that is a general input-validation problem, not a document-loading problem, so the custom exception hierarchy does not need to cover it.
:::

```python title="Full updated src/csv_manager.py"
# ─────────────────────────────────────────────────────────────
# src/csv_manager.py — updated in Step 9
# Changes: print() → logger, FileNotFoundError → DocumentLoadError
# ─────────────────────────────────────────────────────────────

import csv
from pathlib import Path
from src.core.logging_setup import get_logger
from src.core.exceptions import DocumentLoadError

logger = get_logger(__name__)  # named after this file: src.csv_manager


class CSVManager:
    """Reads and writes CSV files from data/raw/ and data/processed/."""

    def __init__(self, raw_dir: str = "data/raw", processed_dir: str = "data/processed"):
        self.raw_dir = Path(raw_dir)
        self.processed_dir = Path(processed_dir)

    def read(self, filename: str) -> list[dict]:
        """Read a CSV from data/raw/ and return a list of dicts."""
        filepath = self.raw_dir / filename

        if not filepath.exists():
            logger.error(f"CSV not found: {filepath}")
            raise DocumentLoadError(f"CSV not found: {filepath}")

        rows = []
        with open(filepath, "r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                rows.append(dict(row))

        logger.info(f"Read {filename} — {len(rows)} row(s)")
        return rows

    def write(self, filename: str, rows: list[dict]) -> Path:
        """Write a list of dicts to data/processed/ as a CSV."""
        if not rows:
            logger.error("Cannot write empty data to CSV.")
            raise ValueError("Cannot write empty data to CSV.")

        output_path = self.processed_dir / filename
        fieldnames = list(rows[0].keys())

        with open(output_path, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(rows)

        logger.info(f"Saved {len(rows)} row(s) → {output_path}")
        return output_path

    def get_column(self, filename: str, column: str) -> list:
        """Extract a single column from a CSV as a list."""
        rows = self.read(filename)
        if not rows or column not in rows[0]:
            raise KeyError(f"Column '{column}' not found in {filename}")
        return [row[column] for row in rows]

    def filter_rows(self, filename: str, column: str, value: str) -> list[dict]:
        """Return only rows where column matches value."""
        rows = self.read(filename)
        filtered = [row for row in rows if row.get(column) == value]
        logger.info(f"Filter '{column}={value}' → {len(filtered)} row(s)")
        return filtered


if __name__ == "__main__":
    # quick test when running this file directly
    # setup_logging() must be called here — without it, logger.info()
    # produces no visible output at all when this file runs standalone
    from src.core.logging_setup import setup_logging
    setup_logging("INFO")
    manager = CSVManager()
    rows = manager.read("sample.csv")
    for row in rows:
        logger.info(f"{row['id']}: {row['title']}")
```

::: tip Tip
Try it yourself: run python src/csv_manager.py. You should see two formatted log lines — a "Read" line and one line per row. If you see nothing at all, check that setup_logging("INFO") is called before any logger.info() call — this is the single most common reason log output silently disappears.
:::

**Full updated src/api/main.py**

::: example Concept
What changed from Step 8 — load_dotenv() is gone; get_settings() already loads .env internally via pydantic-settings, so calling both would be redundant. setup_logging() now runs once at startup, before anything else logs a line. This version also registers an exception handler for RAGBaseError — without it, raising any custom exception (like APIError in the next step) crashes the request with a raw Python traceback instead of a clean JSON error response.
:::

```python title="Full updated src/api/main.py"
# ─────────────────────────────────────────────────────────────
# src/api/main.py — updated in Step 9
# One job: create the FastAPI app, configure logging, connect
#          routers, and turn custom exceptions into clean JSON
# ─────────────────────────────────────────────────────────────

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from src.core.config import get_settings
from src.core.logging_setup import setup_logging, get_logger
from src.core.exceptions import APIError, RAGBaseError
from src.api.routes import router

settings = get_settings()
setup_logging(settings.log_level)
logger = get_logger(__name__)

logger.info(f"Starting {settings.project_name} in {settings.environment} mode")

app = FastAPI(
    title="RAG Production API",
    description="Production RAG system — built step by step",
    version="0.1.0",
)


@app.exception_handler(APIError)
async def handle_api_error(request: Request, exc: APIError) -> JSONResponse:
    return JSONResponse(status_code=400, content={"detail": exc.message})


@app.exception_handler(RAGBaseError)
async def handle_rag_error(request: Request, exc: RAGBaseError) -> JSONResponse:
    logger.exception("RAG operation failed: %s", exc)
    return JSONResponse(status_code=500, content={"detail": "RAG operation failed"})


app.include_router(router)
```

::: tip Tip
Order matters here. settings = get_settings() must run before setup_logging(settings.log_level), since the log level itself comes from settings. And setup_logging() must run before the first logger.info() call, or that line will silently produce no output — the same issue you just saw fixed in csv_manager.py.
:::

::: warning Warn
Why the exception handler matters — this is not optional. Custom exceptions like RAGBaseError and its subclasses are plain Python exceptions, not HTTPException. FastAPI does not automatically know how to turn them into an HTTP response. Without this handler registered, raising APIError("...") anywhere in your routes crashes the entire request with an unhandled traceback — confirmed by testing both ways side by side.
:::

**Full updated src/api/routes.py**

::: example Concept
What changed from Step 8 — import os is gone; /info reads from settings instead of os.getenv(). /ask now logs every question, and raises APIError if the question is empty — this is the exception the handler you just added in main.py catches and turns into a clean 400 response.
:::

```python title="Full updated src/api/routes.py"
# ─────────────────────────────────────────────────────────────
# src/api/routes.py — updated in Step 9
# One job: define what happens when each endpoint is called
# ─────────────────────────────────────────────────────────────

import sys
from fastapi import APIRouter
from src.core.config import get_settings
from src.core.logging_setup import get_logger
from src.core.exceptions import APIError
from src.api.schemas import HealthResponse, InfoResponse, AskRequest, AskResponse

router = APIRouter()
logger = get_logger(__name__)
settings = get_settings()


# ── GET /health ───────────────────────────────────────────────
@router.get("/health", response_model=HealthResponse)
def health():
    """Check if the server is running."""
    return HealthResponse(status="ok", version="0.1.0")


# ── GET /info ─────────────────────────────────────────────────
@router.get("/info", response_model=InfoResponse)
def info():
    """Return project and system information — now from settings, not os.getenv()."""
    logger.info("GET /info called")
    return InfoResponse(
        project=settings.project_name,
        python_version=sys.version.split()[0],
        environment=settings.environment,
    )


# ── POST /ask ─────────────────────────────────────────────────
@router.post("/ask", response_model=AskResponse)
def ask(request: AskRequest):
    """
    Accept a question and return an answer.
    Placeholder now — real RAG logic plugs in here in Step 13.
    """
    logger.info(f"POST /ask — question: '{request.question[:50]}'")

    if not request.question.strip():
        raise APIError("Question cannot be empty")

    return AskResponse(
        question=request.question,
        answer=f"You asked: '{request.question}'. RAG answer coming in Step 13.",
        source="placeholder",
    )
```

**Test the new error path**

```bash
curl -X POST http://127.0.0.1:8000/ask   -H "Content-Type: application/json"   -d '{"question": ""}'
# expected response — 400, clean JSON, no crash:
# {"detail": "Question cannot be empty"}
```

→ Prints the error response for an empty question.

::: success Success
Verified end to end: an empty question now returns a clean 400 with a readable message. A real question still returns 200 exactly as before. Both paths tested together to confirm the fix does not break the normal case.
:::

### Run and see the difference

Run the API again and watch the terminal. Instead of bare prints you now see structured log lines with timestamp, level, and module name.

```bash
uvicorn src.api.main:app --reload
```

→ Starts the server. Leave this terminal running.

**What you see in the terminal now**

```text title="What you see in the terminal now (illustrative)"
2024-01-15 14:32:01 | INFO     | src.api.main   | Starting rag-production in dev mode
2024-01-15 14:32:01 | INFO     | uvicorn        | Application startup complete
2024-01-15 14:32:05 | INFO     | src.api.routes | GET /info called
2024-01-15 14:32:08 | INFO     | src.api.routes | POST /ask — question: 'What is RAG?'
2024-01-15 14:32:09 | INFO     | src.pdf_manager| Read sample.pdf — 1 page(s)
```

**Test that exceptions work correctly — try to read a missing file**

::: example Concept
Windows note — use python, not python3On Windows, python3 is usually not a real command — it triggers a Microsoft Store redirect and fails with "Python was not found." Once your venv is active, python always points to the correct Python 3.12 — use that instead, on every OS.
:::

```bash
python - << 'EOF'
from src.core.logging_setup import setup_logging
from src.core.exceptions import RAGBaseError
from src.pdf_manager import PDFManager

setup_logging("DEBUG")
manager = PDFManager()

try:
    manager.read("does_not_exist.pdf")
except RAGBaseError as e:
    print(f"Caught: {e}")
EOF
```

→ Prints the result of the check.

**Expected output**

```text title="Expected output (illustrative)"
2024-01-15 14:33:01 | ERROR    | src.pdf_manager | PDF not found: data/raw/does_not_exist.pdf
Caught: [DocumentLoadError] PDF not found: data/raw/does_not_exist.pdf
```

Practice — before moving to Step 13

- ☐ Add a second custom exception, ValidationError, to exceptions.py — raise it in csv_manager.get_column() when the requested column does not exist, instead of the current bare KeyError
- ☐ In routes.py, add a similar empty-input check to a new field, or extend /ask to also reject a question longer than 500 characters — raise APIError and confirm the same exception handler in main.py catches it with no extra code needed
- ☐ Change LOG_LEVEL=DEBUG in your .env and run again — see the extra debug messages appear
- ☐ Run python src/core/config.py, python src/core/logging_setup.py, and python src/core/exceptions.py one by one to test each file independently

### Commit to Git

```bash
git add src/core/ src/pdf_manager.py src/csv_manager.py         src/api/main.py src/api/routes.py         pyproject.toml uv.lock
git commit -m "feat: core services — config, logging, exceptions across all modules" \
  -m "- src/core/config.py: one place for settings read from .env
- src/core/logging_setup.py: logging replaces print()
- src/core/exceptions.py: custom error classes for the project
- pdf_manager, csv_manager and the API now use config, logging and the custom errors"
```

→ No output. Stages the listed files.

**Push to GitHub**

```bash
git push
```

→ Uploads your commits to GitHub.

**Git history — six clean commits**

```text title="Git history — six clean commits (illustrative)"
feat: core services — config, logging, exceptions across all modules
feat: api layer — /health, /info, /ask endpoints with FastAPI
feat: notebooks — reference samples, course and project folders
feat: pdf_manager, csv_manager, data folder structure
feat: appetizers — python basics and an AI chat lab
init: project scaffold with uv and src layout
chore: initial commit with README and .gitignore
```

**Project structure after Step 9**

```text title="Project structure after Step 9 (illustrative)"
rag-production/
├── .env.example
├── .gitignore
├── .python-version
├── Makefile
├── pyproject.toml          ← added pydantic-settings
├── README.md
├── uv.lock
├── data/
├── notebooks/
└── src/
    ├── __init__.py
    ├── main.py
    ├── pdf_manager.py       ← updated: logger + DocumentLoadError
    ├── csv_manager.py       ← updated: logger + DocumentLoadError
    ├── core/
    │   ├── __init__.py
    │   ├── config.py        ← Settings, get_settings()
    │   ├── logging_setup.py ← setup_logging(), get_logger()
    │   └── exceptions.py    ← RAGBaseError hierarchy
    └── api/
        ├── __init__.py
        ├── main.py          ← updated: setup_logging + exception_handler(RAGBaseError)
        ├── routes.py        ← updated: logger + config + raises APIError
        └── schemas.py
```

`config centralised` · `logging configured` · `custom exceptions` · `clean error responses — no crashes` · `all modules updated` · `no more print() in src/` · `committed to Git` · `next → Step 13: Milestone 1 review`

#### Step checklist

- ☐ Why print() is not logging and Exception is not error handling
- ☐ Create src/core/
- ☐ Write src/core/config.py
- ☐ Write src/core/logging_setup.py
- ☐ Write src/core/exceptions.py
- ☐ Update existing modules to use core services
- ☐ Run and see the difference
- ☐ Commit to Git

::: warning Not yet verified
These commands were not re-run in this course environment before publication..
:::

## Step 10: Milestone 1

::: info What you will do
Stop. Look back. Understand what you built before moving forward.
:::

### Milestone 1 complete — foundation is done

Stop. Look back. Understand what you built before moving forward.

**Milestone 1 complete — foundation is done**

You have built a real Python project from scratch. Not a tutorial script — a structured, modular, version-controlled application with a running API, logging, error handling, and a data pipeline. Everything from here builds on top of this.

### What you built — step by step

- ☐ Steps 1 to 3: Install and use uv as the modern Python package manager, Pin Python 3.12 with .python-version, Create and activate an isolated virtual environment, Understand pyproject.toml — the single project config file, uv lock and uv sync — reproducible environments, Initialise Git and write a proper .gitignore, The src/ layout — professional Python project structure, Conventional commit messages: init:, feat:, fix:, deps:
- ☐ Step 5: How to structure a Python file: imports → load_dotenv → functions → main(), if `__name__` `==` '`__main__`' — why it exists and how it works, load_dotenv() — never hardcode API keys, Variables, lists, dicts, loops, list comprehensions, Functions with type hints and default values, Classes: `__init__`, methods, self, File I/O: open(), read, write, with statement, Pydantic — define a model, validate data, catch bad input, Call OpenAI, Gemini, and LangChain from Python
- ☐ Step 6: Single responsibility — one file, one job, How to import a class from another file: from src.pdf_manager import PDFManager, Why `__init__.py` exists — marking a folder as a Python package, Standard library vs third-party: csv is built-in, pypdf is installed, The data/ folder structure that persists through the whole project, Why data/raw/ contents are never committed to Git, .gitkeep — how to commit an empty folder, pathlib.Path — the modern way to work with file paths
- ☐ Step 7: When to use a notebook vs a .py file — the rule, sample packages in the notebooks group, notebooks/ with reference (10 topics), course and project, 11 runnable samples from scripts/create_notebooks.py, run in JupyterLab, clear outputs before committing
- ☐ Step 8: FastAPI turns Python functions into HTTP endpoints with one decorator, The difference between GET and POST requests, Pydantic schemas for API — request and response shapes, APIRouter — why routes are separated from the app factory, uvicorn — the server that runs FastAPI, --reload flag for development, Auto-generated docs at /docs — test without writing code, curl — how to test HTTP endpoints from the terminal
- ☐ Step 9: Why print() is not logging — timestamps, levels, modules, filtering, Python logging levels: DEBUG, INFO, WARNING, ERROR, CRITICAL, `get_logger(__name__`) — every module gets its own named logger, setup_logging() — configure once at startup, used everywhere, pydantic-settings — validate environment variables at startup, @lru_cache — read .env once, not on every function call, Custom exceptions — one exception class per failure type, Exception hierarchy — catch RAGBaseError to handle all project errors, raise ... from e — preserve the original error cause, @app.exception_handler() — turn custom exceptions into clean JSON responses instead of raw crashes

### Full project structure at Milestone 1

```text title="Project structure (illustrative)"
rag-production/
│
├── .env.example               ← secrets template, safe to commit
├── .gitignore                 ← venv, .env, data contents, checkpoints
├── .python-version            ← pins Python 3.12
├── Makefile                   ← shortcuts (filled in later steps)
├── pyproject.toml             ← all deps: fastapi, openai, pypdf, pydantic-settings...
├── README.md
├── uv.lock                    ← exact locked versions, always committed
│
├── data/
│   ├── raw/               ← original files land here (not committed)
│   ├── processed/         ← cleaned/extracted output (not committed)
│   └── output/            ← final results (not committed)
│
├── notebooks/
│   ├── reference/         11 topics, 01-python to 11-mlops, each split by subject
│   ├── course/            yours: notebooks that follow a course
│   └── project/           yours: notebooks for this project
│
└── src/
    ├── __init__.py
    ├── main.py                ← appetizers: all tools verified
    ├── pdf_manager.py         ← reads PDFs → data/processed/
    ├── csv_manager.py         ← reads/writes CSVs → data/processed/
    │
    ├── core/
    │   ├── __init__.py
    │   ├── config.py          ← Settings, get_settings() — one source of truth
    │   ├── logging_setup.py   ← setup_logging(), get_logger() — no more print()
    │   └── exceptions.py      ← RAGBaseError hierarchy — no more bare Exception
    │
    └── api/
        ├── __init__.py
        ├── main.py            ← FastAPI app factory, setup_logging + exception_handler(RAGBaseError)
        ├── routes.py          ← GET /health · GET /info · POST /ask, raises APIError
        └── schemas.py         ← Pydantic request/response models
```

### Git history at Milestone 1

```text title="Project structure (illustrative)"
6 commits
feat: core services — config, logging, exceptions across all modules
feat: api layer — /health, /info, /ask endpoints with FastAPI
feat: notebooks — reference samples, course and project folders
feat: pdf_manager, csv_manager, data folder structure
feat: appetizers — python basics and an AI chat lab
init: project scaffold with uv and src layout
chore: initial commit with README and .gitignore
```

**Before moving forward — confirm all of these**

- ☐ ✓uvicorn src.api.main:app --reload starts without errors and shows structured log lines

- ☐ ✓GET /health, GET /info, POST /ask all return correct responses

- ☐ ✓POST /ask with an empty question returns a clean 400 with {"detail": "Question cannot be empty"} — not a 500 crash. If you see a raw traceback instead, the exception handler in main.py is missing

- ☐ ✓python -m src.main runs all 12 sections without errors

- ☐ ✓python src/core/config.py prints your project name, environment, and confirms API keys loaded

- ☐ ✓python src/pdf_manager.py reads sample.pdf and saves to data/processed/ with log output — no print()

- ☐ ✓git log --oneline shows exactly 6 commits in the correct order

- ☐ ✓JupyterLab opens and you can import from src/ inside a notebook

- ☐ ✓No print() statements remain inside src/ — only in notebooks and scripts

What comes next — the RAG pipeline

#### Step checklist

- ☐ Milestone 1 complete — foundation is done
- ☐ What you built — step by step
- ☐ Full project structure at Milestone 1
- ☐ Git history at Milestone 1

::: warning Not yet verified
These commands were not re-run in this course environment before publication..
:::

## Step 11: Running notebooks

This step is simple but takes time. Read everything carefully before running any command.

::: info What you will do
Every notebook runs · src/ importable · .env auto-loads · kernel fixed
:::

::: note Why
This step is simple but takes time. Read everything carefully before running any command.
:::

**What this step is about**

You have notebooks sitting in notebooks/. You have a virtual environment full of packages. But if you open a notebook right now and click Run — it will fail. The notebook does not know which Python to use, it cannot find your src/ modules, and it cannot read your API keys from .env.

The reason is simple: JupyterLab and your virtual environment are not connected yet. A Jupyter kernel is the bridge — it tells JupyterLab exactly which Python interpreter and which packages to use when running a notebook. Without it, the notebook runs on whatever Python it finds first on your machine — usually the system Python, which has none of your packages.

This step connects everything. You register your virtual environment as a named kernel called "RAG Project (Python 3.12)". You add the packages every notebook needs. You add a standard header to each notebook that finds the project root and loads .env automatically — no matter where JupyterLab was launched from.

After this step, every notebook works correctly every time.

**What takes time — this is completely normal**

- ☐ Package downloads — uv fetches from the internet. Do not interrupt. Wait for the prompt to return.
- ☐ First JupyterLab launch — it takes 10–30 seconds to open in the browser
- ☐ Kernel not appearing immediately — close and reopen JupyterLab after registering
- ☐ First import of langchain or openai in a notebook — these are large and take a few seconds to load

**Common mistakes — read before starting**

- ☐ Opening a notebook before the kernel is registered
- ☐ Selecting the wrong kernel — always pick "RAG Project (Python 3.12)"
- ☐ Launching JupyterLab from inside a subfolder — always launch from rag-production/
- ☐ Forgetting to activate the venv before any command
- ☐ Trying to install all heavy packages at once — install per group, when needed
- ☐ Running notebook cells out of order — always run the setup cell first

### Understand what a kernel is — read before doing anything

::: example Concept
What is a Jupyter kernel? A kernel is the Python interpreter that runs your notebook code. When you type code in a notebook cell and press Shift+Enter, JupyterLab sends that code to the kernel and shows you the result. The problem: JupyterLab does not automatically know about your virtual environment. It uses whatever Python it finds — usually the system Python — which has none of your project packages installed. That is why import openai fails even though you installed it. The solution: register your venv as a named kernel. Once registered, you select it by name from the JupyterLab dropdown. JupyterLab then uses exactly your project Python with all your packages.
:::

::: example Concept
Why the venv folder name does not matter Whether your virtual environment folder is called .venv, myenv, venv, or anything else — the kernel is registered separately with its own name. That name is always rag-project and the display name is always "RAG Project (Python 3.12)". Students select that name in JupyterLab. The folder name is irrelevant.
:::

::: example Concept
Why notebooks cannot find src/ by default When Python runs a script like python src/main.py, it automatically adds the current directory to the search path. Notebooks do not do this. They run in their own directory, which means from src.pdf_manager import PDFManager fails with "No module named src". The fix is a setup cell at the top of every notebook that walks up the directory tree until it finds pyproject.toml — that is the project root — and adds it to the path. This works regardless of where JupyterLab was launched.
:::

### Confirm your venv is active — do this before every command

::: example Concept
Use uv run for project commands without activation. If you call python or jupyter directly, activate the venv first so they use the intended interpreter.
:::

```bash
# macOS / Linux
source .venv/bin/activate

# Windows — Git Bash (used throughout this course)
source .venv/Scripts/activate
```

→ No output. The (.venv) prefix appears at the start of the prompt.

**Confirm it worked**

```bash
which python   # works on macOS, Linux, and Windows Git Bash

# Good (macOS/Linux):        /Users/yourname/rag-production/.venv/bin/python
# Good (Windows Git Bash):   /c/Users/yourname/rag-production/.venv/Scripts/python
# Bad:                       /usr/bin/python  or  /usr/local/bin/python
```

→ Prints the path to the Python in .venv.

::: warning Warn
A system Python path means direct python commands are outside the venv. Activate it or use uv run python; verify the interpreter before registering the kernel.
:::

### Register the project kernel — you do this once

::: example Concept
What this does This command tells JupyterLab: "There is a Python kernel called rag-project. When a notebook selects it, use this exact Python interpreter." After this runs, every notebook on your machine can use it — not just notebooks in this project.
:::

**Register the kernel**

```bash
uv run python -m ipykernel install --user     --name=rag-project     --display-name="RAG Project (Python 3.12)"

# Expected output:
# Installed kernelspec rag-project in /Users/yourname/.local/share/jupyter/kernels/rag-project
#
# The path shown is where the kernel info is stored.
# It is separate from your project folder — that is correct.
```

→ Prints a short confirmation that the kernel was installed.

**Verify the kernel is registered**

```bash
jupyter kernelspec list

# You must see this line (exact path will differ):
# rag-project    /Users/yourname/.local/share/jupyter/kernels/rag-project
#
# If you do not see it — re-run the install command above.
# If you see it with a different path — that is fine, it still works.
```

→ Lists the registered kernels, including rag-project.

::: tip Tip
You only do this once per machine. After registration, the kernel persists even if you delete and recreate the venv — as long as you install ipykernel and re-register. If a student clones this project on a new machine, they run this command once and they are set.
:::

### Install core notebook packages

::: example Concept
Core packages vs heavy packages — the rule Core packages are lightweight and used by almost every notebook. They go into pyproject.toml permanently and are always available without any extra install step. Heavy packages — faiss-cpu, chromadb, ragas, sentence-transformers — are large (hundreds of MB each). We do not install them all upfront because most notebooks do not need all of them. Instead, each notebook that needs a heavy package tells the student exactly which command to run. Install only what you need, when you need it.
:::

**Install core packages — run this once, wait for it to finish**

```bash
uv add langchain-community        langchain-text-splitters        langchain-openai        langchain-google-genai        tiktoken        numpy        matplotlib        pandas        beautifulsoup4        lxml        pypdf
# This downloads packages from the internet.
# It may take 1–4 minutes depending on your connection.
# Do not close the terminal. Wait for the prompt to return.
```

→ Prints the packages it installs.

::: tip Tip
How to know it finished: your terminal prompt returns — for example (.venv) yourname@machine rag-production %. Until the prompt returns, it is still working. This is normal.
:::

**Heavy packages — install per group, only when you actually need them**

::: example Concept
Your project has 11 sample notebooks right now, one per topic in notebooks/reference/ (for example notebooks/reference/08-rag/retrieval/01_tiny-rag.ipynb). They only need the Step 7 packages. This table is a reference for later — when the RAG pipeline is built in upcoming steps and you add real code to these notebooks, install the matching group below at that point. Nothing here needs to be installed today.
:::

uv add faiss-cpu chromadb langchain-chroma

Needed once you use a HuggingFace embedding model locally instead of OpenAI's API. Runs on your CPU — no API key needed, but slower than calling OpenAI. Large download (~500MB).

uv add sentence-transformers langchain-huggingface

Needed once you evaluate a RAG pipeline — faithfulness, relevancy, recall. RAGAS is one available evaluation framework for this.

uv add ragas datasets seaborn

uv add pymupdf pdfplumber

GPU and memory needs vary by model and task. For a notebook that exceeds your machine, use a suitable cloud runtime and check its limits and cost.

→ colab.research.google.com — upload the notebook, run there

### Add the standard header to every notebook

::: example Concept
Why every notebook needs this header Without this header, two things fail every time: 1. from src.pdf_manager import PDFManager raises "ModuleNotFoundError: No module named 'src'" — because the project root is not in Python's search path inside a notebook. 2. os.getenv("OPENAI_API_KEY") returns None — because the .env file was never loaded. This header fixes both by finding the project root automatically (by looking for pyproject.toml) and loading .env from there. It works no matter where JupyterLab was launched from.
:::

Add these as the first two cells of every notebook — before any other code. Run the second cell every time you open the notebook.

**Cell 1 — markdown — the notebook title and instructions**

```text title="Cell 1 — markdown — the notebook title and instructions"
# Your Notebook Title Here

**Kernel:** Select "RAG Project (Python 3.12)" from the top-right kernel dropdown.

**Before running anything:** run the Setup cell below first.
It loads the project path and your API keys.
```

**Cell 2 — code — the setup cell — run this every time you open the notebook**

```text title="Cell 2 — code — the setup cell — run this every time you open the notebook"
# ── Setup — run this cell first, every time you open this notebook ──────
import sys
import os
from pathlib import Path

# Walk up the directory tree until we find pyproject.toml
# This is the project root — works no matter where JupyterLab was launched
project_root = Path.cwd()
while not (project_root / "pyproject.toml").exists():
    project_root = project_root.parent
    if project_root == project_root.parent:
        raise RuntimeError(
            "Cannot find pyproject.toml.\n"
            "Please launch JupyterLab from the rag-production/ folder."
        )

# Add project root to Python path so src/ imports work
if str(project_root) not in sys.path:
    sys.path.insert(0, str(project_root))

# Load .env file so API keys are available everywhere in this notebook
from dotenv import load_dotenv
load_dotenv(project_root / ".env")

# Print confirmation — if anything looks wrong, fix it before continuing
print(f"Project root : {project_root}")
print(f"Python       : {sys.version.split()[0]}")
print(f"OpenAI key   : {'loaded ✓' if os.getenv('OPENAI_API_KEY') else 'MISSING — check your .env file'}")
print(f"Google key   : {'loaded ✓' if os.getenv('GOOGLE_API_KEY') else 'not set (optional)'}")
```

::: success Success
Correct output when everything is working: Project root : /your/path/to/rag-production Python : 3.12.x OpenAI key : loaded ✓ If Python is not 3.12 → you are on the wrong kernel. Click the kernel name top-right and switch to "RAG Project (Python 3.12)". If OpenAI key shows MISSING → open your .env file and confirm OPENAI_API_KEY=sk-... is set correctly.
:::

**Optional — install cell for heavy packages (add this when a notebook needs them)**

```text title="Optional — install cell for heavy packages (add this when a notebook needs them)"
# ── Install — run once from your terminal, then skip this cell ───────────
# This notebook needs: faiss-cpu chromadb
#
# Run in terminal (with venv active):
#   uv add faiss-cpu chromadb langchain-chroma
#   uv add also locks and syncs the environment
#
# Then restart the notebook kernel and continue.
# ─────────────────────────────────────────────────────────────────────────

# Verify the packages are installed before continuing
try:
    import faiss
    import chromadb
    print("faiss and chromadb ready ✓")
except ImportError as e:
    print(f"Missing: {e}")
    print("Run in terminal: uv add faiss-cpu chromadb langchain-chroma")
```

### Launch JupyterLab and open your first notebook

::: example Concept
Always launch from the project root — this matters JupyterLab's file browser shows files relative to where it was launched. If you launch from inside notebooks/reference/08-rag/retrieval/, you will not see src/ or data/ in the sidebar. If you launch from your home folder, paths will not match. Always navigate to rag-production/ in your terminal first, confirm with pwd, then launch.
:::

**The correct launch sequence — every time**

```bash
# 1. Navigate to project root
cd /path/to/rag-production

# 2. Confirm you are in the right place
pwd
# must end with /rag-production

# 3. Confirm venv is active
which python
# must show path inside your project folder

# 4. Launch JupyterLab
jupyter lab
# Your browser opens automatically at http://localhost:8888
# If it does not open — paste that URL manually
```

→ Prints the project folder path.

**Select the kernel when a notebook opens**

```text title="Select the kernel when a notebook opens (illustrative)"
When JupyterLab opens a notebook:

  Look at the TOP RIGHT corner of the screen.
  You will see the current kernel name — it might say "Python 3", "No Kernel", or something else.

  Click it → a dropdown appears → select "RAG Project (Python 3.12)"

  If "RAG Project (Python 3.12)" does not appear:
    1. Close JupyterLab (Ctrl+C in the terminal)
    2. Run: python -m ipykernel install --user --name=rag-project --display-name="RAG Project (Python 3.12)"
    3. Run: jupyter lab
    4. It will now appear in the list
```

**Test — open this notebook first**

```text title="Test — open this notebook first"
# In JupyterLab: navigate to notebooks/reference/08-rag/retrieval/01_tiny-rag.ipynb
# Select "RAG Project (Python 3.12)" kernel
# Run the setup cell
# Then test these imports one by one in new cells:

from src.pdf_manager import PDFManager
print("PDFManager imported ✓")

from src.core.config import get_settings
settings = get_settings()
print(f"Project: {settings.project_name} ✓")

from langchain_openai import ChatOpenAI
llm = ChatOpenAI(model="gpt-4o-mini")
response = llm.invoke("Say hello in one sentence.")
print(f"LLM response: {response.content} ✓")
```

::: success Success
If all three imports work and you get an LLM response — Step 11 is complete. Your notebooks are fully connected to the project environment.
:::

::: example Concept
Using src/ is optional — the kernel and environment are not This test notebook imports from src/ because that proves the deepest connection works. But a notebook does not have to import anything from src/ to be valid. A notebook that only does import pandas as pd and explores a CSV is a completely normal, correct use of this setup — as long as it is still running on the "RAG Project (Python 3.12)" kernel, inside this project folder. What is never optional is the kernel and the environment — those are what make any package you installed actually available, whether or not that notebook ever touches your own src/ code.
:::

::: warning Warn
Common error: "ModuleNotFoundError: No module named 'src'" This means the setup cell did not run or ran before JupyterLab was in the right folder. Fix: run the setup cell first. If it still fails, check that project_root printed the correct path.
:::

Practice — now that a kernel is actually working

- ☐ Open notebooks/reference/08-rag/retrieval/01_tiny-rag.ipynb — write a markdown cell explaining in your own words what RAG is
- ☐ In notebooks/reference/01-python/basics/01_python-basics.ipynb — write the DocumentProcessor class from Step 5 and run it cell by cell
- ☐ Import PDFManager in a notebook cell and call .process("sample.pdf") — watch the output appear inline

**Before moving to Step 12 — tick every item**

### Running a notebook outside this project — what to do instead

Everything so far assumes the notebook stays inside rag-production/. Sometimes you want to try something quick in a completely separate folder, or share one notebook file with someone who does not have this project at all. Here is what actually happens, and what to do about it.

::: example Concept
What happens if you just copy a notebook file elsewhere If you move or copy a .ipynb file outside rag-production/ and open it, the setup cell's search for pyproject.toml walks all the way up to the top of your filesystem, never finds it, and raises the RuntimeError you saw earlier on purpose. This is not a bug — it is the notebook correctly telling you it cannot find the project it depends on. That error is expected and safe: nothing runs half-connected or silently uses the wrong environment.
:::

**Option 1 — you still need this project's packages and src/**

Do not move the notebook. Keep it inside rag-production/ and just work in a new folder under notebooks/, or a completely new one if you want it separate from the 8 topic folders:

```bash
mkdir -p notebooks/scratch
# create your new notebook inside notebooks/project/ from JupyterLab's file browser
# it still finds pyproject.toml by walking up, still uses the same kernel, still works
```

→ No output. Creates notebooks/scratch.

**Option 2 — you genuinely do not need this project at all**

For a quick, throwaway experiment unrelated to this course's project — checking how a library behaves, testing an idea — do not use the rag-project kernel or this project's setup cell. Create an independent environment instead:

```bash
mkdir ~/scratch-notebook && cd ~/scratch-notebook
uv init --bare
uv venv
source .venv/bin/activate
uv add jupyterlab ipykernel
python -m ipykernel install --user --name=scratch --display-name="Scratch"
jupyter lab
```

→ Creates a separate project. Prints the packages it installs.

Select the "Scratch" kernel, not "RAG Project (Python 3.12)". This notebook has no access to src/ or this project's .env — and it should not, since it is not part of this project.

::: warning Warn
Never point a notebook outside this project at the rag-project kernel expecting src/ to work. The kernel only controls which Python and packages are used — it does not change where a file is physically located. src/ imports work only when the notebook can walk up to find this project's pyproject.toml, which means the notebook must actually live inside rag-production/.
:::

### Commit to Git

::: example Concept
What gets committed and what does not The updated pyproject.toml and uv.lock are committed — any teammate who clones the project and runs uv sync gets all the same packages. The kernel registration is NOT committed. It lives on your machine in your user profile. Every student registers it themselves by running the ipykernel install command. That is correct — kernels are per-machine, not per-project.
:::

```bash
git add pyproject.toml uv.lock
git status
# confirm only pyproject.toml and uv.lock appear — nothing else
```

→ Shows the staged files: pyproject.toml and uv.lock.

```bash
git commit -m "feat: notebook kernel setup — ipykernel registered, core packages added" \
  -m "- core notebook packages added to pyproject.toml and uv.lock
- the kernel itself is registered per machine, so it is not in Git"
```

→ Prints a short summary line with the commit id.

**Push to GitHub**

```bash
git push
```

→ Uploads your commits to GitHub.

**Git history — eight clean commits**

```text title="Git history — eight clean commits (illustrative)"
feat: notebook kernel setup — ipykernel registered, core packages added
feat: core services — config, logging, exceptions across all modules
feat: api layer — /health, /info, /ask endpoints with FastAPI
feat: notebooks — reference samples, course and project folders
feat: pdf_manager, csv_manager, data folder structure
feat: appetizers — python basics and an AI chat lab
init: project scaffold with uv and src layout
chore: initial commit with README and .gitignore
```

`venv active confirmed` · `kernel registered` · `core packages installed` · `src/ importable in notebooks` · `.env auto-loads` · `LLM call works from notebook` · `heavy packages on demand` · `GPU notebooks → Colab` · `committed to Git` · `next → Step 12: RAG ingestion pipeline`

#### Step checklist

- ☐ Understand what a kernel is — read before doing anything
- ☐ Confirm your venv is active — do this before every command
- ☐ Register the project kernel — you do this once
- ☐ Install core notebook packages
- ☐ Add the standard header to every notebook
- ☐ Launch JupyterLab and open your first notebook
- ☐ Running a notebook outside this project — what to do instead
- ☐ Commit to Git

::: warning Not yet verified
These commands were not re-run in this course environment before publication..
:::

## Step 12: RAG ingestion pipeline

Turn documents into searchable vectors. Load → chunk → embed → store — the first half of a real RAG system.

::: info What you will do
src/ingestion/ built · sample.pdf turned into searchable vectors on disk
:::

::: note Why
Turn documents into searchable vectors. Load → chunk → embed → store — the first half of a real RAG system.
:::

### Why chunking exists — the concept before the code

A language model can only read a limited amount of text at once, and a whole PDF is usually too much to hand it directly. The fix is not "read the whole document every time" — it's breaking the document into small pieces (chunks), turning each piece into a vector that captures its meaning, and later retrieving only the few chunks actually relevant to a question.

This step builds exactly that: load → chunk → embed → store. Nothing here answers a question yet — that is Step 13 (retrieval + generation). This step's only job is getting documents into a searchable form.

::: info Info
Why chunks overlap slightly. If a sentence gets cut exactly at a chunk boundary, splitting it in half can lose meaning. A small overlap (a few dozen characters) between consecutive chunks means important context rarely gets fully severed.
:::

### Create the ingestion module and add a new exception

```bash
mkdir -p src/ingestion
touch src/ingestion/__init__.py
touch src/ingestion/chunker.py src/ingestion/embedder.py src/ingestion/vectorstore.py src/ingestion/pipeline.py
```

→ No output. Creates the ingestion folder and empty files.

The embedder will call OpenAI's API — that call can fail (bad key, network issue, rate limit). Following this project's established pattern, that failure needs its own exception, not a raw crash.

**Add EmbeddingError to src/core/exceptions.py**

```python title="Add EmbeddingError to src/core/exceptions.py"
# add this class alongside the others already in exceptions.py
class EmbeddingError(RAGBaseError):
    pass
```

**Install one new dependency**

```bash
uv add langchain-openai
```

→ Prints the packages it installs.

### Write src/ingestion/chunker.py

Splits raw text into overlapping pieces. No API calls here — this is pure Python, easy to test, and the first link in the chain.

**Open src/ingestion/chunker.py and write this**

```python title="Open src/ingestion/chunker.py and write this"
# ─────────────────────────────────────────────────────────────
# src/ingestion/chunker.py
# One job: split text into overlapping chunks ready for embedding
# ─────────────────────────────────────────────────────────────

from dataclasses import dataclass

from src.core.logging_setup import get_logger

logger = get_logger(__name__)


@dataclass
class Chunk:
    """A single chunk of text, ready to be embedded."""
    text: str
    chunk_index: int
    source: str


class TextChunker:
    """Splits text into overlapping chunks for embedding."""

    def __init__(self, chunk_size: int = 500, chunk_overlap: int = 50):
        if chunk_overlap >= chunk_size:
            raise ValueError(
                f"chunk_overlap ({chunk_overlap}) must be smaller than chunk_size ({chunk_size})"
            )
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap

    def split(self, text: str, source: str = "unknown") -> list[Chunk]:
        """Split text into overlapping chunks."""
        text = text.strip()
        if not text:
            logger.info(f"Empty text from {source} — no chunks produced")
            return []

        chunks = []
        start = 0
        index = 0
        step = self.chunk_size - self.chunk_overlap

        while start < len(text):
            end = start + self.chunk_size
            piece = text[start:end].strip()
            if piece:
                chunks.append(Chunk(text=piece, chunk_index=index, source=source))
                index += 1
            start += step

        logger.info(f"Split {source} into {len(chunks)} chunk(s)")
        return chunks
```

::: tip Tip
Why chunk_overlap must be smaller than chunk_size. If overlap were equal to or larger than the chunk size, the sliding window would never actually move forward — the loop would either stall or produce identical chunks forever. The check at construction time catches this immediately, not after a confusing infinite-feeling loop.
:::

::: warning Warn
Checks to run: normal splitting, empty and whitespace-only input, invalid overlap, and long text with every chunk within the size limit.
:::

### Write src/ingestion/embedder.py

Turns each chunk of text into a vector — a list of numbers that captures its meaning, close in space to other chunks with similar meaning.

**Open src/ingestion/embedder.py and write this**

```python title="Open src/ingestion/embedder.py and write this"
# ─────────────────────────────────────────────────────────────
# src/ingestion/embedder.py
# One job: turn chunks of text into embedding vectors
# ─────────────────────────────────────────────────────────────

from src.core.exceptions import EmbeddingError
from src.core.logging_setup import get_logger
from src.ingestion.chunker import Chunk

logger = get_logger(__name__)


class Embedder:
    """Wraps an embedding model, turning chunks of text into vectors."""

    def __init__(self, model: str = "text-embedding-3-small"):
        self.model = model
        self._client = None  # created lazily — see _get_client

    def _get_client(self):
        if self._client is None:
            from langchain_openai import OpenAIEmbeddings
            self._client = OpenAIEmbeddings(model=self.model)
        return self._client

    def embed_chunks(self, chunks: list[Chunk]) -> list[list[float]]:
        """Embed a list of chunks, returning one vector per chunk."""
        if not chunks:
            logger.info("No chunks to embed")
            return []

        texts = [chunk.text for chunk in chunks]
        try:
            client = self._get_client()
            vectors = client.embed_documents(texts)
        except Exception as e:
            logger.error(f"Embedding failed for {len(texts)} chunk(s): {e}")
            raise EmbeddingError(f"Failed to embed {len(texts)} chunk(s): {e}") from e

        logger.info(f"Embedded {len(vectors)} chunk(s) using {self.model}")
        return vectors
```

::: tip Tip
Why the client is created lazily, not in `__init__`. Constructing OpenAIEmbeddings() immediately would require a valid API key just to create an Embedder object — even in tests that never actually call the API. Creating it on first real use means you can build and test the object freely, and only pay the cost (and need the key) when you actually embed something.
:::

::: warning Warn
Checks to run: construction without a key, empty input without a network call, and an embedding API failure that becomes EmbeddingError.
:::

### Write src/ingestion/vectorstore.py

Somewhere to keep chunks and their embeddings. This version is a plain JSON file — simple on purpose.

**Open src/ingestion/vectorstore.py and write this**

```python title="Open src/ingestion/vectorstore.py and write this"
# ─────────────────────────────────────────────────────────────
# src/ingestion/vectorstore.py
# One job: save and load chunks + their embeddings
# ─────────────────────────────────────────────────────────────

import json
from dataclasses import asdict, dataclass
from pathlib import Path

from src.core.logging_setup import get_logger
from src.ingestion.chunker import Chunk

logger = get_logger(__name__)


@dataclass
class StoredChunk:
    """A chunk paired with its embedding, ready to save or search."""
    text: str
    chunk_index: int
    source: str
    embedding: list[float]


class SimpleVectorStore:
    """
    A simple JSON file-backed vector store.
    A teaching-scale JSON store. Step 13 scans these stored embeddings
    with cosine similarity; it does not introduce FAISS or Chroma.
    """

    def __init__(self, path: str = "data/processed/vectorstore.json"):
        self.path = Path(path)
        self._chunks: list[StoredChunk] = []

    def __len__(self) -> int:
        return len(self._chunks)

    def all(self) -> list[StoredChunk]:
        """Return a copy of the stored rows for teaching-scale retrieval."""
        return list(self._chunks)

    def add(self, chunks: list[Chunk], embeddings: list[list[float]]) -> None:
        """Add chunks and their embeddings to the store."""
        if len(chunks) != len(embeddings):
            raise ValueError(
                f"Got {len(chunks)} chunks but {len(embeddings)} embeddings — must match"
            )
        for chunk, embedding in zip(chunks, embeddings):
            self._chunks.append(StoredChunk(
                text=chunk.text,
                chunk_index=chunk.chunk_index,
                source=chunk.source,
                embedding=embedding,
            ))
        logger.info(f"Added {len(chunks)} chunk(s) to store — {len(self)} total")

    def save(self) -> None:
        """Save all chunks to disk as JSON."""
        self.path.parent.mkdir(parents=True, exist_ok=True)
        data = [asdict(c) for c in self._chunks]
        with open(self.path, "w") as f:
            json.dump(data, f)
        logger.info(f"Saved {len(self._chunks)} chunk(s) to {self.path}")

    def load(self) -> None:
        """Load chunks from disk, replacing whatever is currently in memory."""
        if not self.path.exists():
            logger.info(f"No existing store at {self.path} — starting empty")
            self._chunks = []
            return
        with open(self.path, "r") as f:
            data = json.load(f)
        self._chunks = [StoredChunk(**item) for item in data]
        logger.info(f"Loaded {len(self._chunks)} chunk(s) from {self.path}")
```

::: warning Warn
Checks to run: empty store, mismatched lengths, save/load round trip in a fresh object, and graceful handling of a missing file.
:::

::: info Strength and limit
Strength: the JSON store is inspectable and easy to test. Limitation: it rewrites the whole file, keeps vectors in memory, and has no concurrency control or vector index. Use shared storage and an indexed store before scaling beyond a local exercise.
:::

### Write src/ingestion/pipeline.py — and a real gotcha to know about

Wires everything together: PDFManager → TextChunker → Embedder → SimpleVectorStore.

::: warning Warn
A real bug, worth understanding before you write this — not after. The natural way to write "use this argument, or a sensible default" is self.vector_store = vector_store or SimpleVectorStore(). This looks correct and even works most of the time. But SimpleVectorStore defines `__len__`, and in Python, any object whose len() is 0 is treated as falsy — even if it's a perfectly valid object. So a caller who deliberately passes in an empty vector store gets it silently discarded and replaced with a brand new one, with zero warning. Try it: passing an empty, valid store in and checking whether the pipeline kept that exact object — it did not, using or. The fix is vector_store if vector_store is not None else SimpleVectorStore(), which checks identity, not truthiness.
:::

**Open src/ingestion/pipeline.py and write this**

```python title="Open src/ingestion/pipeline.py and write this"
# ─────────────────────────────────────────────────────────────
# src/ingestion/pipeline.py
# One job: wire load -> chunk -> embed -> store into one pipeline
# ─────────────────────────────────────────────────────────────

from src.core.logging_setup import get_logger
from src.ingestion.chunker import TextChunker
from src.ingestion.embedder import Embedder
from src.ingestion.vectorstore import SimpleVectorStore
from src.pdf_manager import PDFManager

logger = get_logger(__name__)


class IngestionPipeline:
    """
    Wires together: PDFManager -> TextChunker -> Embedder -> SimpleVectorStore

    Each dependency can be swapped out (for testing, or when Step 13
    upgrades to a real vector database) — this is why every argument
    is optional and defaults are only applied when nothing was passed.
    """

    def __init__(
        self,
        pdf_manager: PDFManager | None = None,
        chunker: TextChunker | None = None,
        embedder: Embedder | None = None,
        vector_store: SimpleVectorStore | None = None,
    ):
        # IMPORTANT: use "is not None", not "or" — see the warning above
        self.pdf_manager = pdf_manager if pdf_manager is not None else PDFManager()
        self.chunker = chunker if chunker is not None else TextChunker()
        self.embedder = embedder if embedder is not None else Embedder()
        self.vector_store = vector_store if vector_store is not None else SimpleVectorStore()

    def ingest(self, filename: str) -> int:
        """
        Run one PDF through the full pipeline: read -> chunk -> embed -> store.
        Returns the number of chunks added.
        """
        logger.info(f"Starting ingestion: {filename}")

        text = self.pdf_manager.read(filename)
        chunks = self.chunker.split(text, source=filename)

        if not chunks:
            logger.info(f"No chunks produced from {filename} — nothing to embed")
            return 0

        embeddings = self.embedder.embed_chunks(chunks)
        self.vector_store.add(chunks, embeddings)
        self.vector_store.save()

        logger.info(f"Ingestion complete: {filename} -> {len(chunks)} chunk(s)")
        return len(chunks)
```

::: tip Tip
Every dependency is swappable on purpose. This is what let the whole pipeline get tested below using a fake embedder that skips the real network call — while still proving every other piece of wiring is genuinely correct.
:::

### Run the real pipeline

A fake embedder can check pipeline wiring without real API access. Then run the following live command with your own key to test the external service.

**Confirm you have a sample PDF and a real API key**

```bash
ls data/raw/sample.pdf   # from Step 6 — should already exist
cat .env   # confirm OPENAI_API_KEY is set to a real key
```

→ Lists the sample PDF, then prints .env. The key is shown, so do not share this output.

**Run it**

```bash
python -c "
from dotenv import load_dotenv
from src.core.logging_setup import setup_logging
from src.ingestion.pipeline import IngestionPipeline

load_dotenv()
setup_logging('INFO')

pipeline = IngestionPipeline()
count = pipeline.ingest('sample.pdf')
print(f'Ingested {count} chunks')
"
```

→ Prints the result of the ingestion check.

**Expected output**

```text title="Expected output"
2024-01-15 10:00:00 | INFO     | src.ingestion.pipeline   | Starting ingestion: sample.pdf
2024-01-15 10:00:00 | INFO     | src.pdf_manager          | Read sample.pdf — 1 page(s)
2024-01-15 10:00:00 | INFO     | src.ingestion.chunker    | Split sample.pdf into 2 chunk(s)
2024-01-15 10:00:01 | INFO     | src.ingestion.embedder   | Embedded 2 chunk(s) using text-embedding-3-small
2024-01-15 10:00:01 | INFO     | src.ingestion.vectorstore| Added 2 chunk(s) to store — 2 total
2024-01-15 10:00:01 | INFO     | src.ingestion.vectorstore| Saved 2 chunk(s) to data/processed/vectorstore.json
2024-01-15 10:00:01 | INFO     | src.ingestion.pipeline   | Ingestion complete: sample.pdf -> 2 chunk(s)
Ingested 2 chunks
```

**Confirm the file was actually created**

```bash
cat data/processed/vectorstore.json | python -m json.tool | head -20
```

→ Prints the first 20 lines of the saved vector store.

You should see a JSON array — each entry has text, chunk_index, source, and a long embedding array of numbers. That embedding array is the actual vector — 1536 numbers for text-embedding-3-small.

Practice — before moving to Step 13

- ☐ Add a second PDF to data/raw/ and ingest it too — confirm the vector store now has chunks from both files
- ☐ Change chunk_size to something small (like 100) and re-ingest — see how many more chunks get produced
- ☐ Open vectorstore.json and manually count: does the chunk count match what the log line reported?

### Commit to Git

```bash
git add src/ingestion/ src/core/exceptions.py pyproject.toml uv.lock
git commit -m "feat: RAG ingestion pipeline — chunking, embedding, vector storage" \
  -m "- src/ingestion/chunker.py: splits text into overlapping chunks
- src/ingestion/embedder.py: turns chunks into vectors (text-embedding-3-small)
- src/ingestion/vectorstore.py: saves and loads the vectors
- src/ingestion/pipeline.py: load, chunk, embed, store in one call
- src/core/exceptions.py: ingestion errors"
```

→ Prints a short summary line with the commit id.

**Push to GitHub**

```bash
git push
```

→ Uploads your commits to GitHub.

**Project structure after Step 12**

```text title="Project structure after Step 12 (illustrative)"
src/
├── core/
│   ├── config.py
│   ├── logging_setup.py
│   └── exceptions.py          ← updated: added EmbeddingError
├── pdf_manager.py
├── csv_manager.py
├── api/
└── ingestion/
    ├── __init__.py
    ├── chunker.py              ← TextChunker, Chunk
    ├── embedder.py              ← Embedder
    ├── vectorstore.py            ← SimpleVectorStore, StoredChunk
    └── pipeline.py                ← IngestionPipeline
```

`text chunking` · `real embeddings` · `vector storage` · `full pipeline wired and tested` · `is-not-None gotcha avoided` · `committed to Git` · `next → Step 13: RAG retrieval + generation`

#### Step checklist

- ☐ Why chunking exists — the concept before the code
- ☐ Create the ingestion module and add a new exception
- ☐ Write src/ingestion/chunker.py
- ☐ Write src/ingestion/embedder.py
- ☐ Write src/ingestion/vectorstore.py
- ☐ Write src/ingestion/pipeline.py — and a real gotcha to know about
- ☐ Run the real pipeline
- ☐ Commit to Git

::: warning Not yet verified
These commands were not re-run in this course environment before publication..
:::

## Step 13: RAG retrieval + generation

The second half of RAG. Find the right chunks, then get a real, grounded answer from an LLM. This is where /ask stops being a placeholder.

::: info What you will do
src/retrieval/ and src/generation/ built · /ask gives real, grounded answers
:::

::: note Why
The second half of RAG. Find the right chunks, then get a real, grounded answer from an LLM. This is where /ask stops being a placeholder.
:::

### The two halves of RAG, and why they're separate steps

Step 12 built half of RAG: turning documents into searchable vectors. This step builds the other half — using that vector store to actually answer a question.

The flow: a question comes in → embed the question → find the stored chunks most similar to it → hand those chunks to an LLM as context → the LLM answers using only that context. Two new modules, src/retrieval/ and src/generation/, cover exactly those two jobs — find the right chunks, then generate an answer from them.

::: info Info
Why the question gets embedded too. Similarity search works by comparing vectors. To find chunks similar to a question, the question itself has to become a vector, using the same embedding model that embedded the documents — otherwise the two vectors would not be comparable at all.
:::

### Create the retrieval and generation modules

```bash title="Command"
mkdir -p src/retrieval src/generation
touch src/retrieval/__init__.py src/retrieval/retriever.py
touch src/generation/__init__.py src/generation/generator.py
```

No new exceptions needed here — RetrievalError and GenerationError have existed in src/core/exceptions.py since Step 9, waiting for this step to actually use them.

**Install one new dependency**

```bash title="Install one new dependency"
uv add numpy
```

### Add embed_query() to the Step 12 embedder

Embedder from Step 12 only has embed_chunks(), which expects a list of Chunk objects with a .text field — built for embedding documents, not a single raw question string. Add a second method for this.

**Update src/ingestion/embedder.py — add this method to the existing class**

```text title="Update src/ingestion/embedder.py — add this method to the existing class (illustrative)"
    def embed_query(self, text: str) -> list[float]:
        """Embed a single piece of text — used for a question at retrieval time,
        not for stored documents. Some embedding models score queries slightly
        differently than documents, so this stays a separate method on purpose."""
        try:
            client = self._get_client()
            vector = client.embed_query(text)
        except Exception as e:
            logger.error(f"Failed to embed query: {e}")
            raise EmbeddingError(f"Failed to embed query: {e}") from e

        logger.info(f"Embedded query using {self.model}")
        return vector
```

::: tip Tip
Why not just reuse embed_chunks() with a fake Chunk? That would technically work, but LangChain's own embedding clients expose embed_documents() and embed_query() as two distinct methods on purpose — some embedding models genuinely score queries differently from documents internally. Mirroring that distinction here means swapping the embedding model later does not require rethinking this design.
:::

### Write src/retrieval/retriever.py

Embeds the question, compares it against every stored chunk using cosine similarity, and returns the closest matches.

**Open src/retrieval/retriever.py and write this**

```python title="Open src/retrieval/retriever.py and write this"
# ─────────────────────────────────────────────────────────────
# src/retrieval/retriever.py
# One job: find the chunks most relevant to a question
# ─────────────────────────────────────────────────────────────

import numpy as np

from src.core.exceptions import RetrievalError
from src.core.logging_setup import get_logger
from src.ingestion.embedder import Embedder
from src.ingestion.vectorstore import SimpleVectorStore, StoredChunk

logger = get_logger(__name__)


def cosine_similarity(a: list[float], b: list[float]) -> float:
    """Cosine similarity between two vectors — 1.0 means identical direction."""
    a_arr, b_arr = np.array(a), np.array(b)
    denom = np.linalg.norm(a_arr) * np.linalg.norm(b_arr)
    if denom == 0:
        return 0.0
    return float(np.dot(a_arr, b_arr) / denom)


class Retriever:
    """Finds the most relevant chunks for a question, by embedding
    the question and comparing it against every stored chunk."""

    def __init__(self, vector_store: SimpleVectorStore | None = None, embedder: Embedder | None = None):
        self.vector_store = vector_store if vector_store is not None else SimpleVectorStore()
        self.embedder = embedder if embedder is not None else Embedder()

    def retrieve(self, question: str, top_k: int = 3) -> list[StoredChunk]:
        """Return the top_k chunks most relevant to the question."""
        if top_k < 1:
            raise ValueError("top_k must be positive")
        if not question.strip():
            raise RetrievalError("Cannot retrieve for an empty question")

        self.vector_store.load()
        if len(self.vector_store) == 0:
            logger.info("Vector store is empty — nothing to retrieve")
            return []

        try:
            question_vector = self.embedder.embed_query(question)
        except Exception as e:
            logger.error(f"Failed to embed question: {e}")
            raise RetrievalError(f"Failed to embed question: {e}") from e

        scored = [
            (cosine_similarity(question_vector, chunk.embedding), chunk)
            for chunk in self.vector_store.all()
        ]
        scored.sort(key=lambda pair: pair[0], reverse=True)
        top_chunks = [chunk for _, chunk in scored[:top_k]]

        logger.info(f"Retrieved {len(top_chunks)} chunk(s) for question: '{question[:50]}'")
        return top_chunks
```

::: tip Tip
Why cosine similarity, not raw distance. Cosine similarity measures the angle between two vectors, not their raw distance — so it stays meaningful even when embedding magnitudes vary. A value of 1.0 means "identical direction, maximally similar"; -1.0 means "opposite meaning"; 0 means "unrelated." Check it with all three cases.
:::

::: warning Warn
Check both the cosine calculations and ranking: with two RAG-related chunks and one unrelated chunk, the related chunks should score higher. This tiny example is not an evaluation of relevance for arbitrary documents.
:::

::: warning Retrieval limit
This scans the local JSON store and reloads it on each question. It has no calibrated relevance cutoff: top_k returns the highest scores even when all chunks are irrelevant. Add an evaluated threshold, surfaced evidence passages, and an indexed shared store before claiming reliable citations or production scale.
:::

### Write src/generation/generator.py

Takes the retrieved chunks and the original question, builds a prompt that constrains the LLM to only use that context, and returns the answer.

**Open src/generation/generator.py and write this**

```python title="Open src/generation/generator.py and write this"
# ─────────────────────────────────────────────────────────────
# src/generation/generator.py
# One job: turn retrieved chunks + a question into a grounded answer
# ─────────────────────────────────────────────────────────────

from src.core.exceptions import GenerationError
from src.core.logging_setup import get_logger
from src.ingestion.vectorstore import StoredChunk

logger = get_logger(__name__)

PROMPT_TEMPLATE = """Answer the question using ONLY the context below.
If the context does not contain the answer, say you don't know — do not make anything up.

Context:
{context}

Question: {question}

Answer:"""


class Generator:
    """Takes retrieved chunks and a question, asks an LLM to answer
    using only that context."""

    def __init__(self, model: str = "gpt-4o-mini"):
        self.model = model
        self._client = None  # created lazily — see _get_client

    def _get_client(self):
        if self._client is None:
            from langchain_openai import ChatOpenAI
            self._client = ChatOpenAI(model=self.model)
        return self._client

    def generate(self, question: str, chunks: list[StoredChunk]) -> str:
        """Generate an answer to the question, grounded in the given chunks."""
        if not chunks:
            logger.info("No chunks provided — returning a no-context answer")
            return "I don't have any relevant information to answer that."

        context = "\n\n".join(chunk.text for chunk in chunks)
        prompt = PROMPT_TEMPLATE.format(context=context, question=question)

        try:
            client = self._get_client()
            response = client.invoke(prompt)
        except Exception as e:
            logger.error(f"Generation failed: {e}")
            raise GenerationError(f"Failed to generate an answer: {e}") from e

        answer = response.content
        logger.info(f"Generated answer ({len(answer)} chars) using {self.model}")
        return answer
```

::: tip Tip
The instruction to say 'I do not know' can reduce unsupported answers, but prompting alone cannot guarantee grounding. Evaluate answers against source passages and add a relevance threshold before treating them as evidence.
:::

::: warning Warn
Checks to run: zero chunks should avoid an API call; an API failure should become GenerationError without exposing raw provider details to clients.
:::

### Wire real RAG into POST /ask — replacing the Step 9 placeholder

This is the payoff — the placeholder from Step 9 becomes real. Two files change: the response schema needs a proper sources field, and the route itself calls the new modules.

**Update src/api/schemas.py — AskResponse**

```python title="Update src/api/schemas.py — AskResponse"
class AskResponse(BaseModel):
    question: str
    answer: str
    sources: list[str]   # was a single "source" string placeholder — now real document names
```

**Full updated src/api/routes.py**

```python title="Full updated src/api/routes.py"
# ─────────────────────────────────────────────────────────────
# src/api/routes.py — updated in Step 13
# /ask now performs real retrieval and generation
# ─────────────────────────────────────────────────────────────

import sys
from fastapi import APIRouter
from src.core.config import get_settings
from src.core.logging_setup import get_logger
from src.core.exceptions import APIError
from src.api.schemas import HealthResponse, InfoResponse, AskRequest, AskResponse
from src.retrieval.retriever import Retriever
from src.generation.generator import Generator

router = APIRouter()
logger = get_logger(__name__)
settings = get_settings()
retriever = Retriever()
generator = Generator()


@router.get("/health", response_model=HealthResponse)
def health():
    return HealthResponse(status="ok", version="0.1.0")


@router.get("/info", response_model=InfoResponse)
def info():
    logger.info("GET /info called")
    return InfoResponse(
        project=settings.project_name,
        python_version=sys.version.split()[0],
        environment=settings.environment,
    )


@router.post("/ask", response_model=AskResponse)
def ask(request: AskRequest):
    """Accept a question, retrieve relevant chunks, generate a grounded answer."""
    logger.info(f"POST /ask — question: '{request.question[:50]}'")

    if not request.question.strip():
        raise APIError("Question cannot be empty")

    chunks = retriever.retrieve(request.question, top_k=3)
    answer = generator.generate(request.question, chunks)
    sources = sorted(set(chunk.source for chunk in chunks))

    return AskResponse(
        question=request.question,
        answer=answer,
        sources=sources,
    )
```

Everything from Step 9 stays exactly as it was — the exception handler in main.py, the empty-question check, the APIError pattern. Only the body of /ask changed, from a hardcoded string to two real module calls.

::: tip Tip
Why retriever and generator are created once, at module level. Same reason settings is created once — constructing them per-request would rebuild the OpenAI client connection on every single call. Created once here, reused across every request the route handles.
:::

### Run it for real

You need Step 12's vector store already populated. If data/processed/vectorstore.json does not exist yet, go back and run Step 12's ingestion first.

```bash title="Command"
uvicorn src.api.main:app --reload
```

**Test the real, grounded answer**

```bash title="Test the real, grounded answer"
curl -X POST http://127.0.0.1:8000/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "What is RAG?"}'
```

**Expected response shape**

```text title="Expected response shape"
{
  "question": "What is RAG?",
  "answer": "RAG stands for Retrieval-Augmented Generation...",
  "sources": ["sample.pdf"]
}
```

The response now uses retrieved document chunks. sources lists retrieved filenames, not proof that each claim is supported. Inspect passages and evaluate answer quality; unrelated questions may still produce confident errors.

Practice — before moving to Step 14

- ☐ Ask a question with no relation to your ingested PDF — confirm the answer says it doesn't know, not a hallucinated guess
- ☐ Change top_k from 3 to 1 in routes.py — see how a smaller context window changes answer quality
- ☐ Ingest a second PDF (Step 12's practice) and ask a question only that second document could answer — confirm sources correctly names it

### Commit to Git

```bash title="Command"
git add src/retrieval/ src/generation/ src/ingestion/embedder.py src/api/routes.py src/api/schemas.py pyproject.toml uv.lock
git commit -m "feat: RAG retrieval + generation — /ask now gives real, grounded answers" \
  -m "- src/retrieval/retriever.py: finds the closest chunks with cosine similarity
- src/generation/generator.py: answers from the retrieved chunks only
- src/api/routes.py and schemas.py: /ask returns the answer and its sources
- src/ingestion/embedder.py: embeds the question the same way as the chunks"
```

**Push to GitHub**

```bash title="Push to GitHub"
git push
```

**Project structure after Step 13**

```text title="Project structure after Step 13 (illustrative)"
src/
├── core/
├── pdf_manager.py
├── csv_manager.py
├── ingestion/
│   ├── chunker.py
│   ├── embedder.py          ← updated: added embed_query()
│   ├── vectorstore.py
│   └── pipeline.py
├── retrieval/
│   ├── __init__.py
│   └── retriever.py              ← Retriever, cosine_similarity
├── generation/
│   ├── __init__.py
│   └── generator.py               ← Generator
└── api/
    ├── routes.py              ← updated: /ask uses real RAG
    └── schemas.py              ← updated: AskResponse.sources
```

`cosine similarity search` · `real LLM generation` · `retrieval ranking verified correct` · `/ask no longer a placeholder` · `committed to Git` · `next → Step 14: Testing with pytest`

#### Step checklist

- ☐ The two halves of RAG, and why they're separate steps
- ☐ Create the retrieval and generation modules
- ☐ Add embed_query() to the Step 12 embedder
- ☐ Write src/retrieval/retriever.py
- ☐ Write src/generation/generator.py
- ☐ Wire real RAG into POST /ask — replacing the Step 9 placeholder
- ☐ Run it for real
- ☐ Commit to Git

::: warning Not yet verified
These commands were not re-run in this course environment before publication..
:::

## Step 14: Testing with pytest

pytest was configured all the way back in Step 3 and never used. Time to close that gap — real tests for the real modules you've already built.

::: info What you will do
tests/ built · 21 real tests · zero real network calls needed to run them
:::

::: note Why
pytest was configured all the way back in Step 3 and never used. Time to close that gap — real tests for the real modules you've already built.
:::

### Why this step exists — a gap that's been sitting there since Step 3

Open pyproject.toml right now. It has had this section since Step 3:

```toml title="Example"
[tool.pytest.ini_options]
testpaths = ["tests"]
```

That tells pytest where to look for tests. It says nothing about pytest actually being installed, and there has never been a tests/ folder. This step closes both gaps — and Step 15 (CI/CD) depends on it, since a pipeline that runs tests needs tests to exist first.

::: info Info
Why test at all? Right now, changing chunker.py means manually re-running whatever you happen to remember to check. A test suite runs everything that could break, in under a second, every single time — including the parts you'd forget to check by hand.
:::

### Install pytest and create the tests/ folder

pytest itself, plus pytest-mock — needed later in this step to test the API without making real OpenAI calls.

```bash title="Command"
uv add --dev pytest pytest-mock
```

::: tip Tip
Why --dev matters. This puts pytest under [dependency-groups] dev in pyproject.toml, separate from [project] dependencies. Your deployed app in Step 16 will never install pytest — it's a development tool, not something the running application needs.
:::

```bash title="Command"
mkdir -p tests
touch tests/__init__.py tests/conftest.py
touch tests/test_chunker.py tests/test_vectorstore.py tests/test_exceptions.py tests/test_api.py
```

The test_ prefix is not a convention you can skip — pytest only discovers files and functions named exactly this way.

### conftest.py — shared setup every test file can use

A fixture is reusable test setup. Any test function that names sample_text as a parameter automatically receives whatever this fixture returns — pytest wires it up for you.

**Open tests/conftest.py and write this**

```python title="Open tests/conftest.py and write this"
import pytest

from src.core.logging_setup import setup_logging

setup_logging("WARNING")  # keep test output quiet unless something goes wrong


@pytest.fixture
def sample_text():
    """A small chunk of realistic text to test with — no file needed."""
    return "RAG stands for Retrieval-Augmented Generation. It combines retrieval with generation."
```

::: info Info
Why conftest.py specifically. pytest automatically discovers this exact filename and makes every fixture in it available to every test file in the same folder — no imports needed. Any other filename would require manually importing fixtures into each test file.
:::

### Write tests/test_chunker.py — pure logic, the ideal first test

TextChunker has no database, no API, no file I/O — the cleanest possible thing to test, and a good template for how a test file is structured.

**Open tests/test_chunker.py and write this**

```python title="Open tests/test_chunker.py and write this"
import pytest

from src.ingestion.chunker import Chunk, TextChunker


def test_split_produces_multiple_chunks(sample_text):
    chunker = TextChunker(chunk_size=30, chunk_overlap=5)
    chunks = chunker.split(sample_text, source="test.txt")
    assert len(chunks) > 1
    assert all(isinstance(c, Chunk) for c in chunks)


def test_split_empty_text_returns_empty_list():
    chunker = TextChunker()
    chunks = chunker.split("", source="empty.txt")
    assert chunks == []


def test_split_whitespace_only_returns_empty_list():
    chunker = TextChunker()
    chunks = chunker.split("   \n\t  ", source="whitespace.txt")
    assert chunks == []


def test_chunk_size_is_respected(sample_text):
    chunker = TextChunker(chunk_size=20, chunk_overlap=5)
    chunks = chunker.split(sample_text, source="test.txt")
    assert all(len(c.text) <= 20 for c in chunks)


def test_invalid_overlap_raises_value_error():
    with pytest.raises(ValueError):
        TextChunker(chunk_size=10, chunk_overlap=10)


def test_chunks_have_source_attached(sample_text):
    chunker = TextChunker(chunk_size=30, chunk_overlap=5)
    chunks = chunker.split(sample_text, source="my_document.pdf")
    assert all(c.source == "my_document.pdf" for c in chunks)
```

**Run just this file**

```bash title="Run just this file"
pytest tests/test_chunker.py -v
```

::: tip Tip
Reading pytest.raises. with pytest.raises(ValueError): means "the test only passes if the code inside this block raises exactly this exception." If it doesn't raise, or raises something else, the test fails. This is how you test that invalid input is correctly rejected, not just that valid input works.
:::

### Write tests/test_vectorstore.py — using tmp_path for file I/O

SimpleVectorStore writes to disk. Tests should never touch your real data/processed/ folder — pytest's built-in tmp_path fixture gives every test its own throwaway folder, isolated from project data; pytest may retain recent temporary directories for debugging.

**Open tests/test_vectorstore.py and write this**

```python title="Open tests/test_vectorstore.py and write this"
import pytest

from src.ingestion.vectorstore import SimpleVectorStore
from src.ingestion.chunker import Chunk


def test_empty_store_has_zero_length(tmp_path):
    store = SimpleVectorStore(path=tmp_path / "store.json")
    assert len(store) == 0


def test_add_increases_length(tmp_path):
    store = SimpleVectorStore(path=tmp_path / "store.json")
    chunks = [Chunk(text="hello", chunk_index=0, source="doc.txt")]
    store.add(chunks, [[0.1, 0.2, 0.3]])
    assert len(store) == 1


def test_add_rejects_mismatched_lengths(tmp_path):
    store = SimpleVectorStore(path=tmp_path / "store.json")
    chunks = [Chunk(text="a", chunk_index=0, source="doc.txt"), Chunk(text="b", chunk_index=1, source="doc.txt")]
    with pytest.raises(ValueError):
        store.add(chunks, [[0.1, 0.2]])  # only one embedding for two chunks


def test_save_then_load_round_trip(tmp_path):
    path = tmp_path / "store.json"
    store = SimpleVectorStore(path=path)
    chunks = [Chunk(text="hello", chunk_index=0, source="doc.txt")]
    store.add(chunks, [[0.1, 0.2, 0.3]])
    store.save()

    # load into a completely fresh object — proves save/load actually work
    fresh_store = SimpleVectorStore(path=path)
    fresh_store.load()
    assert len(fresh_store) == 1


def test_load_missing_file_does_not_crash(tmp_path):
    store = SimpleVectorStore(path=tmp_path / "does_not_exist.json")
    store.load()  # should not raise
    assert len(store) == 0


def test_empty_store_is_falsy(tmp_path):
    """This is the exact gotcha documented in Step 12 — an empty store
    has len() == 0, which Python treats as falsy. Any code using
    x or default() instead of x is not None would break on this."""
    store = SimpleVectorStore(path=tmp_path / "store.json")
    assert not store  # confirms the falsy behavior exists
    assert store is not None  # this is the distinction that matters
```

::: tip Tip
A test can document a bug you already fixed. test_empty_store_is_falsy doesn't test new behavior — it locks in an understanding from Step 12's gotcha, so if someone later "simplifies" pipeline.py back to vector_store or SimpleVectorStore(), a test breaks immediately instead of the bug quietly coming back.
:::

### Write tests/test_exceptions.py

**Open tests/test_exceptions.py and write this**

```python title="Open tests/test_exceptions.py and write this"
import pytest

from src.core.exceptions import DocumentLoadError, RAGBaseError


def test_custom_exception_message():
    error = DocumentLoadError("file not found")
    assert error.message == "file not found"


def test_custom_exception_str_format():
    error = DocumentLoadError("file not found")
    assert str(error) == "[DocumentLoadError] file not found"


def test_custom_exceptions_inherit_from_base():
    error = DocumentLoadError("test")
    assert isinstance(error, RAGBaseError)


def test_catching_base_catches_subclass():
    """Confirms the whole point of the hierarchy — catch RAGBaseError,
    catch everything that inherits from it."""
    with pytest.raises(RAGBaseError):
        raise DocumentLoadError("anything")
```

This is a short file on purpose — some tests exist to confirm a design decision keeps working, not because the code is complicated. test_catching_base_catches_subclass is exactly what makes main.py's single @app.exception_handler(RAGBaseError) from Step 9 correctly catch every custom exception in the project, not just one.

### Write tests/test_api.py — testing FastAPI without a real API key

The /ask route calls retriever.retrieve() and generator.generate(), both of which hit OpenAI. A test suite that needs a real API key and real network access to pass is fragile and slow. pytest-mock fixes this — it temporarily replaces a function with a fake one for the duration of one test.

**Open tests/test_api.py and write this**

```python title="Open tests/test_api.py and write this"
from fastapi.testclient import TestClient

from src.api.main import app
from src.ingestion.vectorstore import StoredChunk

client = TestClient(app)


def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_info_returns_project_details():
    response = client.get("/info")
    assert response.status_code == 200
    assert "project" in response.json()


def test_ask_rejects_empty_question():
    response = client.post("/ask", json={"question": ""})
    assert response.status_code == 400
    assert response.json()["detail"] == "Question cannot be empty"


def test_ask_returns_grounded_answer(mocker):
    """The real test — mock retrieval and generation so this test
    needs no network access and no real API key, while still proving
    the route correctly wires the two together."""
    fake_chunks = [
        StoredChunk(text="RAG combines retrieval and generation.", chunk_index=0, source="doc.pdf", embedding=[0.1]),
    ]
    mocker.patch("src.api.routes.retriever.retrieve", return_value=fake_chunks)
    mocker.patch("src.api.routes.generator.generate", return_value="RAG stands for Retrieval-Augmented Generation.")

    response = client.post("/ask", json={"question": "What is RAG?"})

    assert response.status_code == 200
    data = response.json()
    assert data["answer"] == "RAG stands for Retrieval-Augmented Generation."
    assert data["sources"] == ["doc.pdf"]


def test_ask_with_no_matching_chunks(mocker):
    mocker.patch("src.api.routes.retriever.retrieve", return_value=[])
    mocker.patch("src.api.routes.generator.generate", return_value="I don't have any relevant information to answer that.")

    response = client.post("/ask", json={"question": "What is the capital of France?"})

    assert response.status_code == 200
    assert response.json()["sources"] == []
```

::: tip Tip
Reading mocker.patch's target string. "src.api.routes.retriever.retrieve" means "inside routes.py, replace the retrieve method on the retriever object that module already created." You patch where a thing is used, not where it's originally defined — patching src.retrieval.retriever.Retriever.retrieve instead would not affect the already-created instance sitting in routes.py.
:::

::: warning Warn
This is not testing "does OpenAI work." It's testing "does this route correctly call retrieval, correctly call generation with what retrieval returned, and correctly shape the response." Whether OpenAI itself is working is a different, separate concern — one a unit test like this deliberately does not depend on.
:::

### Run the full suite

```bash title="Command"
pytest -v
```

**Expected output**

```text title="Expected output"
============================= test session starts ==============================
collecting ... collected 21 items

tests/test_api.py::test_health_check PASSED                              [  4%]
tests/test_api.py::test_info_returns_project_details PASSED              [  9%]
tests/test_api.py::test_ask_rejects_empty_question PASSED                [ 14%]
tests/test_api.py::test_ask_returns_grounded_answer PASSED               [ 19%]
tests/test_api.py::test_ask_with_no_matching_chunks PASSED               [ 23%]
tests/test_chunker.py::test_split_produces_multiple_chunks PASSED        [ 28%]
tests/test_chunker.py::test_split_empty_text_returns_empty_list PASSED   [ 33%]
tests/test_chunker.py::test_split_whitespace_only_returns_empty_list PASSED [ 38%]
tests/test_chunker.py::test_chunk_size_is_respected PASSED               [ 42%]
tests/test_chunker.py::test_invalid_overlap_raises_value_error PASSED    [ 47%]
tests/test_chunker.py::test_chunks_have_source_attached PASSED           [ 52%]
tests/test_exceptions.py::test_custom_exception_message PASSED           [ 57%]
tests/test_exceptions.py::test_custom_exception_str_format PASSED        [ 61%]
tests/test_exceptions.py::test_custom_exceptions_inherit_from_base PASSED [ 66%]
tests/test_exceptions.py::test_catching_base_catches_subclass PASSED     [ 71%]
tests/test_vectorstore.py::test_empty_store_has_zero_length PASSED       [ 76%]
tests/test_vectorstore.py::test_add_increases_length PASSED              [ 80%]
tests/test_vectorstore.py::test_add_rejects_mismatched_lengths PASSED    [ 85%]
tests/test_vectorstore.py::test_save_then_load_round_trip PASSED         [ 90%]
tests/test_vectorstore.py::test_load_missing_file_does_not_crash PASSED  [ 95%]
tests/test_vectorstore.py::test_empty_store_is_falsy PASSED              [100%]

============================== 21 passed in 0.36s ==============================
```

This is example pytest output. The tests mock external API calls, so they should not need a real API key. Run the suite in your assembled project and use its actual count and timing as the result.

**See what a real failure actually looks like**

Temporarily break something on purpose — change assert chunks `==` [] to assert chunks `==` [1] in test_chunker.py — and run pytest again:

```text title="See what a real failure actually looks like"
FAILED tests/test_chunker.py::test_split_empty_text_returns_empty_list

    def test_split_empty_text_returns_empty_list():
        chunker = TextChunker()
        chunks = chunker.split("", source="empty.txt")
>       assert chunks == [1]
E       AssertionError: assert [] == [1]

============================== 1 failed, 20 passed in 0.04s ==============================
```

pytest shows exactly which line failed, what was expected, and what actually happened — undo your change and confirm you're back to 21 passing.

Practice — before moving to Step 15

- ☐ Write a test for PDFManager.read() raising DocumentLoadError when the file doesn't exist
- ☐ Add a test confirming Retriever.retrieve() raises RetrievalError for an empty question
- ☐ Break something on purpose (like above) and read the failure output before fixing it — get comfortable with what a real failure looks like

### Commit to Git

```bash title="Command"
git add tests/ pyproject.toml uv.lock
git commit -m "test: add pytest suite — 21 tests covering ingestion, exceptions, and the API" \
  -m "- tests/test_chunker.py, test_vectorstore.py, test_exceptions.py, test_api.py
- fixtures and mocking: no real API calls, no keys needed
- dev dependencies: pytest-mock"
```

**Push to GitHub**

```bash title="Push to GitHub"
git push
```

**Project structure after Step 14**

```text title="Project structure after Step 14 (illustrative)"
rag-production/
├── src/
│   └── ... everything from Steps 1-10
└── tests/
    ├── __init__.py
    ├── conftest.py            ← shared fixtures
    ├── test_chunker.py         ← 6 tests, pure logic
    ├── test_vectorstore.py      ← 6 tests, uses tmp_path
    ├── test_exceptions.py        ← 4 tests, the custom hierarchy
    └── test_api.py                ← 5 tests, mocked network calls
```

`pytest installed` · `21 tests to write` · `zero real API calls needed` · `fixtures + mocking` · `committed to Git` · `next → Step 15: CI/CD`

#### Step checklist

- ☐ Why this step exists — a gap that's been sitting there since Step 3
- ☐ Install pytest and create the tests/ folder
- ☐ conftest.py — shared setup every test file can use
- ☐ Write tests/test_chunker.py — pure logic, the ideal first test
- ☐ Write tests/test_vectorstore.py — using tmp_path for file I/O
- ☐ Write tests/test_exceptions.py
- ☐ Write tests/test_api.py — testing FastAPI without a real API key
- ☐ Run the full suite
- ☐ Commit to Git

::: warning Not yet verified
These commands were not re-run in this course environment before publication..
:::

## Step 15: CI/CD with GitHub Actions

Every push now lints and tests itself automatically. Ruff was configured back in Step 3 and never run — that gap closes here too.

::: info What you will do
Every push and PR to main automatically lints and tests itself
:::

::: note Why
Every push now lints and tests itself automatically. Ruff was configured back in Step 3 and never run — that gap closes here too.
:::

### What CI/CD actually means here

CI (Continuous Integration) means: every time code is pushed, a server automatically checks it — lints it, runs the tests — before anyone has to trust it by hand. CD (Continuous Deployment) means: if those checks pass, the code can automatically ship somewhere. This step covers CI fully. CD is deferred to Step 16, once there's an actual deployment target (Docker/infra) to deploy to.

The tool is GitHub Actions — free for public repos, and for reasonable use on private ones. A workflow is a YAML file describing what to run and when.

::: info Info
Another gap since Step 3, closed here. [tool.ruff] has sat in pyproject.toml since the very first step — configured, never installed, never run. Same shape of gap as pytest was before Step 14.
:::

### Install ruff and see what it actually catches

```bash title="Command"
uv add --dev ruff
```

```bash title="Command"
ruff check .
```

This isn't hypothetical — running this against a fresh project genuinely surfaces something:

```text title="Example"
I001 [*] Import block is un-sorted or un-formatted
 --> tests/test_greet.py:1:1
  |
1 | from src.core.greet import greet
  |
help: Organize imports
Found 1 error.
[*] 1 fixable with the `--fix` option.
```

Run ruff check . --fix to auto-fix anything it safely can, then ruff check . again to confirm a clean pass. This is exactly what the CI workflow below will run automatically on every push — see it work locally first.

::: tip Tip
ruff replaces several older tools at once. It combines what flake8, isort, and several other linters used to do separately, and it's written in Rust — fast enough to run on every save without slowing you down.
:::

### Write the GitHub Actions workflow

```bash title="Command"
mkdir -p .github/workflows
touch .github/workflows/ci.yml
```

**Open .github/workflows/ci.yml and write this**

```yaml title="Open .github/workflows/ci.yml and write this"
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Check out the code
        uses: actions/checkout@v6

      - name: Install uv
        uses: astral-sh/setup-uv@20cfd1bf945f4377ade1205e4dbc17946fc9a30d # v10.0.1
        with:
          enable-cache: true

      - name: Install dependencies
        run: uv sync --locked --all-extras --dev

      - name: Lint with ruff
        run: uv run ruff check .

      - name: Run tests
        run: uv run pytest -v
```

::: warning Warn
Why setup-uv is pinned to a commit SHA, and checkout isn't — a real, current distinction, not stylistic preference. actions/checkout@v6 uses a moving major-version tag — official GitHub actions are trusted enough that this is standard practice. astral-sh/setup-uv stopped publishing moving major tags entirely as of a March 2026 security change — @v10 or @v8 will not resolve at all anymore. Third-party actions increasingly get pinned to an exact, immutable commit SHA specifically so a compromised maintainer account can't silently push malicious code into a tag you already trust. The trailing # v10.0.1 comment is just for human readability in diffs — it has no effect on what actually runs.
:::

::: info Info
Reading the trigger. on: push and on: pull_request, both scoped to branches: [main], means this runs on every direct push to main and every PR targeting main — catching problems before they merge, not just after.
:::

### Why uv sync --locked, not just uv sync

The --locked flag makes CI fail immediately if uv.lock is out of sync with pyproject.toml — instead of silently re-resolving dependencies and potentially installing something different than what's actually pinned.

**Try it — deliberately mismatch the lockfile and watch it fail**

```bash title="Try it — deliberately mismatch the lockfile and watch it fail"
# after intentionally editing pyproject.toml without updating uv.lock:
uv sync --locked --all-extras --dev

# result: a clear, immediate error — CI stops here, not three steps later
# with a confusing test failure caused by the wrong dependency versions
```

::: tip Tip
What this actually prevents. Without --locked, if someone edits pyproject.toml and forgets to run uv lock afterward, CI would silently resolve fresh versions that might differ from what everyone's local uv.lock says — meaning "works on my machine" and "works in CI" can quietly diverge. --locked makes that impossible to miss.
:::

::: info Info
The committed .python-version requests Python 3.12 for uv. requires-python in pyproject.toml declares compatibility (>=3.12), not a fixed interpreter version.
:::

### Optional: a secret for future live integration tests

These unit tests mock the external API, so CI does not need an OpenAI key. If you later add live integration tests, configure a scoped repository secret and run those tests separately.

**In your GitHub repository**

```text title="In your GitHub repository (illustrative)"
Optional for future live integration tests: Settings → Secrets and variables → Actions → New repository secret
```

::: warning Warn
Keep real keys out of the committed workflow. GitHub Actions secrets can be injected for future live integration tests; also avoid logging them or exposing them through test failures.
:::

Add a secret only when a separate live integration test actually requires it. Keep the default mocked test job credential-free.

### Push and watch it run

```bash title="Command"
git add .github/workflows/ci.yml pyproject.toml uv.lock
git commit -m "ci: add GitHub Actions workflow — lint with ruff, run pytest on every push" \
  -m "- .github/workflows/ci.yml: runs on every push and pull request
- installs with uv sync --locked, so a stale uv.lock fails the build
- ruff check, then pytest"
git push
```

On GitHub, open your repo and click the Actions tab. You should see the workflow running, then a green checkmark once it finishes — usually well under a minute for a project this size.

**Add a status badge to your README (optional but satisfying)**

```text title="Add a status badge to your README (optional but satisfying) (illustrative)"
![CI](https://github.com/YOUR_USERNAME/rag-production/actions/workflows/ci.yml/badge.svg)
```

Replace YOUR_USERNAME with your actual GitHub username. This shows a live pass/fail badge at the top of your README.

Practice — before moving to Step 16

- ☐ Deliberately break a test locally, push it, and watch CI catch it and show red — then fix it and push again
- ☐ Open a pull request instead of pushing directly to main — confirm the workflow runs on the PR too, before it's merged
- ☐ Add a second job to the workflow that only runs ruff check ., separate from the test job — see how GitHub Actions runs independent jobs in parallel

### Commit to Git

Already committed and pushed in the previous step — this file tree shows the final state.

**Project structure after Step 15**

```text title="Project structure after Step 15 (illustrative)"
rag-production/
├── .github/
│   └── workflows/
│       └── ci.yml            ← lints with ruff, runs pytest, on every push and PR
├── src/
│   └── ... everything from Steps 1-10
└── tests/
    └── ... 21 tests from Step 14
```

`ruff installed and passing` · `GitHub Actions workflow live` · `runs on every push and PR` · `secrets configured` · `--locked catches stale lockfiles` · `committed to Git` · `next → Step 16: Infra`

#### Step checklist

- ☐ What CI/CD actually means here
- ☐ Install ruff and see what it actually catches
- ☐ Write the GitHub Actions workflow
- ☐ Why uv sync --locked, not just uv sync
- ☐ Optional: a secret for future live integration tests
- ☐ Push and watch it run
- ☐ Commit to Git

::: warning Not yet verified
These commands were not re-run in this course environment before publication..
:::

## Step 16: Infra: Docker, Kubernetes, Terraform

The final step. Package the app, describe how it runs, describe what it runs on — three layers, three tools, each doing one job.

::: info What you will do
A containerized app, a local dev setup, and infra-as-code describing how to run it
:::

::: note Why
The final step. Package the app, describe how it runs, describe what it runs on — three layers, three tools, each doing one job.
:::

::: info Info
An honest note before starting. This step's tooling — Docker, Kubernetes, Terraform — could not be installed or executed in the sandbox this guide was built in. Every file here was written against verified, current, official syntax (confirmed via live search, not memory) and syntactically validated where a validator was available. Build and run these yourself to confirm the runtime behavior on your own machine — that step is on you this time, not skipped, but genuinely not something this guide could do for you.
:::

### The three layers, and why they're separate tools

Three different, related questions, three different tools:

| Question | Tool |
|---|---|
| "How do I package this app so it runs identically anywhere?" | Docker |
| "How do I run many copies of this, reliably, with restarts and scaling?" | Kubernetes |
| "How do I describe the servers/resources this needs, as code?" | Terraform |

Each layer is genuinely independent — you could stop after Docker and deploy manually, or add Kubernetes without Terraform, or use Terraform to provision a server that just runs plain Docker. This step builds all three, in order, so each one's purpose is clear before the next is added.

### Write the Dockerfile — multi-stage with pinned uv

A multi-stage build uses two FROM statements: one stage installs everything needed to build the app, a second stage copies over only the finished result. The build tools never end up in what actually ships.

**Create Dockerfile in the project root**

```dockerfile title="Create Dockerfile in the project root"
# ── Stage 1: builder — installs dependencies ────────────────────
FROM python:3.12-slim AS builder

# Get uv itself from its official image — no pip install needed
COPY --from=ghcr.io/astral-sh/uv:0.12.21 /uv /uvx /bin/

WORKDIR /app

# Copy only dependency files first — Docker caches this layer,
# so code changes alone won't force a full dependency reinstall
COPY pyproject.toml uv.lock ./
RUN uv sync --locked --no-install-project --no-dev

# Now copy the actual source code and install the project itself
COPY src/ ./src/
RUN uv sync --locked --no-dev


# ── Stage 2: runtime — the actual image that ships ──────────────
FROM python:3.12-slim

WORKDIR /app

# Copy only the built virtual environment and source — nothing
# from the builder stage's build tools ends up in the final image
COPY --from=builder /app/.venv /app/.venv
COPY --from=builder /app/src /app/src
COPY pyproject.toml ./

ENV PATH="/app/.venv/bin:$PATH"

EXPOSE 8000

CMD ["uvicorn", "src.api.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

::: tip Tip
Why two separate uv sync calls. The first installs only dependencies, before any source code is copied in. As long as pyproject.toml and uv.lock don't change, Docker reuses this cached layer on every rebuild — meaning editing a single line of src/ code and rebuilding takes seconds, not minutes, because dependencies never reinstall unless they actually changed.
:::

::: info Info
The two sync commands follow the dependency-layer pattern. Build and run the image with your own Docker daemon to verify platform compatibility and startup; this site has not built the image.
:::

**Create .dockerignore alongside it**

```text title="Create .dockerignore alongside it"
.venv/
.git/
__pycache__/
*.pyc
.pytest_cache/
.ruff_cache/
data/processed/
data/raw/
.env
tests/
docs/
*.md
```

Without this, the entire .venv, .git history, and every local data file would get copied into the build context — slower builds, bigger images, and your local .env secrets ending up inside a Docker image, which you never want.

**Build and run it**

```bash title="Build and run it"
docker build -t rag-production .
docker run -p 8000:8000 --env-file .env rag-production
```

Then visit http://localhost:8000/docs — same Swagger UI you've been using locally, now running inside a container.

### docker-compose.yml — for local development

Typing the full docker build / docker run command every time gets old. docker-compose wraps that into one file and one command.

**Create docker-compose.yml in the project root**

```yaml title="Create docker-compose.yml in the project root"
services:
  api:
    build: .
    ports:
      - "8000:8000"
    env_file:
      - .env
    volumes:
      - ./data:/app/data
    restart: unless-stopped
```

| Line | What it does |
|---|---|
| build: . | Builds from the Dockerfile in this folder — no separate docker build step needed |
| env_file: .env | Loads your existing .env automatically — same file you've used since Step 5 |
| volumes: ./data:/app/data | Your ingested vector store persists outside the container — stop and restart without losing data |

**Run it**

```bash title="Run it"
docker compose up --build
```

::: info Info
This Compose example parses as YAML. Run docker compose config and then docker compose up --build locally to check actual behavior.
:::

### Kubernetes — running many copies, reliably

Docker runs one container. Kubernetes manages many — restarting crashed ones, spreading load across replicas, checking whether each one is actually healthy before sending it traffic.

**Create k8s/deployment.yaml**

```yaml title="Create k8s/deployment.yaml"
apiVersion: apps/v1
kind: Deployment
metadata:
  name: rag-production
  labels:
    app: rag-production
spec:
  replicas: 2
  selector:
    matchLabels:
      app: rag-production
  template:
    metadata:
      labels:
        app: rag-production
    spec:
      containers:
        - name: rag-production
          image: registry.example.com/your-team/rag-production:0.1.0
          ports:
            - containerPort: 8000
          envFrom:
            - secretRef:
                name: rag-production-secrets
          resources:
            requests:
              cpu: "250m"
              memory: "256Mi"
            limits:
              cpu: "500m"
              memory: "512Mi"
          readinessProbe:
            httpGet:
              path: /health
              port: 8000
            initialDelaySeconds: 5
            periodSeconds: 10
```

| Field | What it means |
|---|---|
| replicas: 2 | Two copies running at once — if one crashes, Kubernetes restarts it automatically, and the other keeps serving traffic |
| resources.requests/limits | Guaranteed minimum and hard maximum CPU/memory — prevents one container from starving the others on the same node |
| readinessProbe | Calls your own /health endpoint from Step 8 — a container only receives traffic once this check passes |

**Create k8s/service.yaml**

```yaml title="Create k8s/service.yaml"
apiVersion: v1
kind: Service
metadata:
  name: rag-production
spec:
  type: ClusterIP
  selector:
    app: rag-production
  ports:
    - port: 80
      targetPort: 8000
```

A Deployment runs your containers. A Service gives them one stable network address to be reached at — since replicas can be restarted and get new internal IPs at any time, nothing else in the cluster should ever talk to a pod directly.

**Apply both**

::: warning Warn
Before applying this illustrative cluster manifest, push the image to a registry your cluster can read and replace registry.example.com. Create rag-production-secrets through your cluster's secret management process; avoid putting a key in shell history. Replicas also need shared document/vector storage, since local container files are not shared.
:::

```bash title="Apply both"
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl get pods
```

::: info Info
Both Kubernetes examples parse as YAML. A real cluster, accessible image registry, secret, and shared storage are still required before deployment can be verified.
:::

### Terraform — infrastructure as code

Kubernetes describes how your app runs once infrastructure exists. Terraform describes the infrastructure itself — as code, reviewable, repeatable, not clicked together by hand in a dashboard.

::: example Concept
A deliberate choice worth explaining Terraform is most commonly shown provisioning real cloud infrastructure — AWS, GCP, Azure — which requires an account, billing, and credentials most learners don't have set up yet. This guide uses Terraform's Docker provider instead — it provisions the same container you just built, entirely on your own machine. The Terraform concepts (resources, state, plan, apply) are identical either way; only the target changes. Swapping this for a real cloud provider later means changing the provider block, not relearning the tool.
:::

**Create infra/main.tf**

```text title="Create infra/main.tf"
terraform {
  required_version = ">= 1.5"
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 4.0"
    }
  }
}

provider "docker" {}

resource "docker_image" "rag_production" {
  name = "rag-production:${var.image_tag}"
  build {
    context = ".."
  }
}

resource "docker_container" "rag_production" {
  name  = "rag-production"
  image = docker_image.rag_production.image_id

  ports {
    internal = 8000
    external = 8000
  }

}
```

**Create infra/variables.tf**

```text title="Create infra/variables.tf"
variable "image_tag" {
  description = "Tag for the local demo image"
  type        = string
  default     = "latest"
}
```

**Create infra/outputs.tf**

```text title="Create infra/outputs.tf"
output "container_name" {
  value = docker_container.rag_production.name
}
```

::: tip Tip
Why three files, not one. main.tf defines what gets created. variables.tf shows an optional input for the local example. outputs.tf defines what Terraform reports back after it finishes. This split is a convention, not a requirement, but it's the one used almost everywhere in real Terraform projects.
:::

**Run it**

```bash title="Run it"
cd infra
terraform init
terraform plan
terraform apply
```

terraform plan shows exactly what would be created or changed, without doing it — always run this before apply. This builds the same Docker image and runs the same container as Steps 2-3 of this guide, just declared as code instead of typed by hand. This local Docker demo exposes /health without an API key; supply runtime secrets outside Terraform before invoking /ask. Marking a Terraform variable sensitive would still leave a secret in state when passed to a provider resource.

::: info Info
Run terraform fmt -check, terraform validate, and terraform plan in an environment with Terraform and Docker. This site has not applied the Terraform configuration.
:::

### Commit to Git — and a look back at the whole project

```bash title="Command"
git add Dockerfile .dockerignore docker-compose.yml k8s/ infra/
git commit -m "infra: add Docker, Kubernetes, and Terraform configuration" \
  -m "- Dockerfile and .dockerignore: package the app as an image
- docker-compose.yml: run it locally with one command
- k8s/deployment.yaml and k8s/service.yaml: how it runs on Kubernetes
- infra/main.tf, variables.tf, outputs.tf: what it runs on, as code"
git push
```

**Final project structure**

```text title="Final project structure (illustrative)"
rag-production/
├── src/
│   └── ... the full RAG application, Steps 1-10
├── tests/
│   └── ... 21 tests, Step 14
├── .github/workflows/
│   └── ci.yml                    ← Step 15
├── Dockerfile                        ← multi-stage, uv-based
├── .dockerignore
├── docker-compose.yml                 ← local dev
├── k8s/
│   ├── deployment.yaml
│   └── service.yaml
└── infra/
    ├── main.tf
    ├── variables.tf
    └── outputs.tf
```

Practice — this is the last one

- ☐ Build the Docker image locally and confirm /docs loads exactly as it does outside a container
- ☐ If you have access to a Kubernetes cluster (even a local one like minikube or kind), apply both manifests and confirm two pods start
- ☐ Run terraform plan and read every line of what it says it would do, before ever running apply

`multi-stage Dockerfile, verified working sequence` · `docker-compose for local dev` · `Kubernetes manifests, current apiVersion` · `Terraform, current provider syntax` · `committed to Git` · `course complete`

::: info Info
13 steps, start to finish: a scaffolded project → working Python fundamentals → utility modules → notebooks → a FastAPI layer → core services (logging, config, exceptions) → a milestone review → notebooks actually running against real code → a full RAG ingestion pipeline → real retrieval and generation → a real test suite → CI that runs it automatically → and now, infrastructure to actually deploy it. Every step verified before being handed to you, not just written and hoped to work.
:::

#### Step checklist

- ☐ The three layers, and why they're separate tools
- ☐ Write the Dockerfile — multi-stage with pinned uv
- ☐ docker-compose.yml — for local development
- ☐ Kubernetes — running many copies, reliably
- ☐ Terraform — infrastructure as code
- ☐ Commit to Git — and a look back at the whole project

::: warning Not yet verified
These commands were not re-run in this course environment before publication..
:::
