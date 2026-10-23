## Introduction

### **Implementing an Agentic Workflow in Python**

Welcome! Having explored the concepts behind AI agents and agentic workflows, it's natural to ask: how can one actually *build* these intelligent agents in practice?  We'll look at establishing coding foundations and setting up basic structures for individual agents. The goal is to understand how foundational agent components can be constructed using Python. Think of this as examining the creation of versatile building blocks.

There are different paths you can take:

- A common approach involves using existing agent frameworks, which offer many pre-built components and abstractions.
- Another path is to build the core logic more from scratch, perhaps using Python and a preferred LLM model directly.

This latter approach, while potentially more intensive, offers deep insights and maximum control over the process, allowing you to see exactly how agents can work together.  The choice of approach often depends on the project's goals, timelines, and the desired level of customization and understanding. Learning the 'from scratch' principles can be helpful for understanding what's happening inside more complex tools.

### Constructing agentic systems using Python

Building dependable systems usually involves several major components, with a focus on crafting the core logic.

1. **LLM Models - The Engine**: Central to any agent is its access to Large Language Models. These are the engines providing the core intelligence. A flexible system design might allow for different LLMs to be connected or swapped, making sure of adaptability as new models emerge.
2. **Agent Logic & Prompting - Custom Implementation**: An important layer is the 'agent logic' itself. This is where Python code would define how an agent behaves. This includes crafting effective prompts to communicate with LLMs and implementing the distinct capabilities envisioned for different types of agents.
3. **Workflow Orchestration** - Connecting Agents: With individual agents defined, a system needs to manage how they work together. 'Workflow orchestration' logic, also implemented in Python, would handle the sequence of operations, the flow of information between agents, and the overall execution of multi-agent processes.
   While various tools can provide these pieces, understanding how to conceptually structure these components in Python offers deep insight into their functionality.

::: quiz {id=aw1-q1} Quiz Question
What is a primary benefit of building agentic systems from scratch using Python?

- [ ] The primary focus of agentic systems is only on the LLM models.
- [ ] Workflow orchestration solely involves connecting agents without any custom logic.
- [ ] Utilizing existing agent frameworks is the best way to understand agent behavior.
- [x] Building agents from scratch in Python provides deep insights into their functioning.
:::

### Conclusion

**Two ways to build an agentic workflow.** When you set out to create an agentic workflow, you can start from an existing agent framework, with its prebuilt components and abstractions, or build the core logic yourself in Python on top of an LLM.

![Approaches to Building Agentic Workflows](assets/images/aw01-approaches.png "Approaches to building agentic workflows: existing frameworks vs. Python + LLM custom builds")

- Building the foundations yourself is a highly educational experience: you see how the components interact, without the abstractions of larger tools hiding them.
- This does not make frameworks less useful. They are immensely valuable for rapid development and for production systems. Understanding the mechanics underneath them is an extra asset, not a replacement.

**Choosing between the two approaches** depends on the project's goals, its timelines and how much customization and understanding you need. The more control you want, the further you move from existing frameworks toward a custom build.

![Choice of Approach](assets/images/aw01-choice-of-approach.png "The choice depends on project goals, timelines and the desired level of customization")

**The three components work as steps.** First the LLM provides the intelligence, then Python agent logic and prompts define how each agent behaves, and finally workflow orchestration connects the agents and runs the sequence. Keeping the LLM swappable lets the system adapt as new models appear.

![Key Components in a Python-Based Agentic System](assets/images/aw01-key-components.png "Step 1 LLM models, Step 2 agent logic and prompting, Step 3 workflow orchestration")

**How to structure the code.** A design that separates concerns keeps the system modular and clear, using standard Python features:

1. **Agent library** (`agent_definitions.py`): the agents are defined as classes. These are reusable blueprints.
2. **Agent instantiation** (`workflow_script.py`): the workflow script imports these classes and creates specific instances, each one configured for its own role or task.
3. **Workflow implementation** (also in `workflow_script.py`): the logic of the workflow itself, meaning the sequence of tasks, how data is passed between the agent instances, and how they collaborate toward the overall goal.

![High-Level Design for Python-Based Agents](assets/images/aw01-high-level-design.png "Agent library, then agent instantiation logic, then workflow implementation logic")

Separating agent definitions, instantiation and workflow logic gives a robust and scalable foundation. Understanding these layers is the key to building any of the agent types and workflow patterns that follow.

*Source: transcript and slides of the lesson video "Agentic Workflow Implementation" (Udacity, Agentic Workflows course).*

## Constructing Agentic Systems with Python

How can you structure Python code to build agentic components? A design that mirrors a logical separation of concerns can promote modularity and clarity, using standard Python features.

1. **Agent Library/Module:** One common practice is to create a dedicated Python module (e.g., a file named agent_definitions.py). This file would house the class definitions for various types of agents. These classes serve as the blueprints defining the agents' attributes and methods, assuming familiarity with Python's object-oriented programming concepts.
2. **Agent Instantiation Logic:** Separately, in a script that drives the workflow, one would import these agent classes. Here, specific *instances* (objects) of these agent classes would be created and configured. This is where each agent could be customized to its specific role or task.
3. **Workflow Implementation Logic:** Finally, the logic for the actual workflow would be implemented. This involves defining the sequence of tasks, how data is passed between the instantiated agents, and how these agents collaborate to achieve the overall goal of the system.

This structured design—separating agent definitions (typically as classes), instantiation logic (creating objects), and workflow implementation—provides a scalable foundation for developing  agentic systems in Python.

::: quiz {id=aw2-q1} Quiz Question
How should Python code be structured to build agentic components effectively?

- [ ] Python code should be structured in a linear fashion without considering modularity.
- [ ] Code should be written in a single script without any modularization.
- [ ] The workflow implementation logic should be in the same module as agent definitions.
- [x] The structure of Python code separates concerns into agent definitions, instantiation logic, and workflow implementation.
:::

Let's look at a simple scenario: an agentic workflow that first fetches some data (like a user profile) and then processes that data (perhaps to extract key information).

**Agent Library/Module (e.g., `agent_definitions.py`)**

This file will house the class definitions for our various types of agents. These classes act as blueprints.

```python title="workflow_agents/agent_definitions.py"
# workflow_agents/agent_definitions.py

class Agent:
    """
    A base class for our agents.
    While not strictly necessary for simple cases,
    it can be useful for defining common interfaces or utilities.
    """
    def __init__(self, name):
        self.name = name
        print(f"Agent '{self.name}' initialized.")

    def execute(self, data=None):
        """
        A generic method to execute the agent's task.
        Specific agents will override this.
        """
        raise NotImplementedError("Each agent must implement the 'execute' method.")

class DataFetchingAgent(Agent):
    """
    An agent specialized in fetching data.
    For this example, it will simulate fetching user data.
    """
    def __init__(self, name, data_source):
        super().__init__(name)
        self.data_source = data_source
        print(f"DataFetchingAgent will fetch from: {self.data_source}")

    def execute(self, user_id):
        """
        Simulates fetching data for a given user_id.
        In a real scenario, this might involve an API call or database query.
        """
        print(f"'{self.name}' is fetching data for user_id: {user_id} from {self.data_source}...")
        # Simulate data fetching
        if user_id == "123":
            return {"user_id": "123", "name": "Alice Wonderland", "occupation": "Dreamer"}
        else:
            return {"user_id": user_id, "error": "User not found"}

class DataProcessingAgent(Agent):
    """
    An agent specialized in processing data.
    For this example, it will extract key information from the fetched data.
    """
    def __init__(self, name, fields_to_extract=None):
        super().__init__(name)
        self.fields_to_extract = fields_to_extract if fields_to_extract else ["name", "occupation"]
        print(f"DataProcessingAgent will extract fields: {self.fields_to_extract}")

    def execute(self, fetched_data):
        """
        Processes the fetched data to extract specified fields.
        """
        print(f"'{self.name}' is processing data: {fetched_data}")
        if "error" in fetched_data:
            return {"processed_info": None, "error": fetched_data["error"]}

        processed_info = {}
        for field in self.fields_to_extract:
            processed_info[field] = fetched_data.get(field, "N/A")

        return {"processed_info": processed_info, "original_data_keys": list(fetched_data.keys())}
```

`agent_definitions.py`**:**

- We have a base `Agent` class with an `__init__` method to give each agent a name and an `execute` method that specific agents must implement.
- `DataFetchingAgent` inherits from `Agent`. Its `execute` method simulates fetching data for a user.
- `DataProcessingAgent` also inherits from `Agent`. Its `execute` method takes the data fetched by the previous agent and extracts specific fields.
- These classes serve as the blueprints defining the agents' attributes and methods.

---

**Agent Instantiation and Workflow Implementation Logic (e.g., `main_workflow.py`)**

This script will import the agent classes, create specific instances (objects) of them, and then define the actual workflow by coordinating these instances.

```python title="main_workflow.py"
# main_workflow.py

# Import agent classes from our library
from workflow_agents.agent_definitions import DataFetchingAgent, DataProcessingAgent

def run_user_data_workflow(user_id_to_process):
    """
    This function implements the agentic workflow.
    """
    print(f"\n--- Starting User Data Workflow for User ID: {user_id_to_process} ---")

    # === 2. Agent Instantiation Logic ===
    # Create specific instances (objects) of agent classes and configure them.
    # Each agent can be customized for its specific role or task.
    fetcher = DataFetchingAgent(name="UserProfileFetcher", data_source="MainUserDatabase")
    processor = DataProcessingAgent(name="UserInfoExtractor", fields_to_extract=["name", "occupation", "user_id"])

    print("--- Agents Instantiated ---")

    # === 3. Workflow Implementation Logic ===
    # Define the sequence of tasks and how data is passed between agents.

    # Step 1: Fetch user data
    print("\nStep 1: Fetching Data...")
    fetched_user_data = fetcher.execute(user_id=user_id_to_process)
    print(f"Fetcher Output: {fetched_user_data}")

    if "error" in fetched_user_data and fetched_user_data["error"]:
        print(f"Workflow stopped due to error in fetching: {fetched_user_data['error']}")
        return {"status": "Error", "details": fetched_user_data['error']}

    # Step 2: Process fetched data
    print("\nStep 2: Processing Data...")
    processed_data_report = processor.execute(fetched_data=fetched_user_data)
    print(f"Processor Output: {processed_data_report}")

    print("--- Workflow Completed ---")
    return {"status": "Success", "data": processed_data_report}

if __name__ == "__main__":
    # Example 1: Successful run
    result1 = run_user_data_workflow("123")
    print(f"\nFinal Result for User 123: {result1}\n")

    # Example 2: User not found
    result2 = run_user_data_workflow("456")
    print(f"Final Result for User 456: {result2}")
```

`main_workflow.py`**:**

- **Import:** It first imports the agent classes defined in `workflow_agents.agent_definitions`.
- **Agent Instantiation Logic:**
  - Inside `run_user_data_workflow`, we create instances: `fetcher = DataFetchingAgent(...)` and `processor = DataProcessingAgent(...)`.
  - Each instance is configured upon creation (e.g., `data_source` for the fetcher, `fields_to_extract` for the processor). This is where each agent could be customized to its specific role or task.
- **Workflow Implementation Logic:**
  - The workflow is defined by the sequence of calls:
    1. `fetcher.execute()` is called first.
    2. Its output, `fetched_user_data`, is then passed as input to `processor.execute()`.
  - This demonstrates defining the sequence of tasks and how data is passed between the instantiated agents.
  - Basic error handling is included to show how a workflow might react if a step fails.
- The `if __name__ == "__main__":` block shows how to trigger the workflow with different inputs.

**To make this run, you would structure your files like this:**

```tree
your_project_directory/
├── workflow_agents/
│   ├── __init__.py  # This can be an empty file
│   └── agent_definitions.py
└── main_workflow.py
```

Then, from `your_project_directory`, you would run `python main_workflow.py`.

## Quiz: Implementing Agentic Workflows with Python

::: match {id=aw3-match} Quiz Question
Match the Python workflows components with their definitions.

heads: Python Components for Agentic Workflows | Python Workflows Elements
- Module containing agent class definitions => Agent Library/Module
- Logic for creating and configuring agent instances => Agent Instantiation Logic
- Script implementing the sequence of agent tasks and data flow => Workflow Implementation Logic
extra: Data Validation | Input Processing | Error Handling Logic
:::

## Demo: Sequential Agentic Workflow in Python

::: video {id=aw4-demo} Demo: Sequential Agentic Workflow in Python
transcript: assets/transcripts/aw4-demo.srt
chapters:
- 00:00 Agents at the heart of the workflow
- 00:08 Defining agents as Python classes
- 00:53 Research, summarizer and fact-checker agents
- 01:13 Knowledge as attributes, actions as functions
- 01:41 Running the agents step by step
:::

The script in the workspace below will walk you through a simple, sequential agentic workflow designed for information processing:

1. **Pythonic Agent Definitions (Your "Agent Library"):**
   - You'll see a base `Agent` class. Think of this as the blueprint for any agent in our system.
   - Then, you'll see specialized agents like `ResearchAgent`, `FactCheckerAgent`, and `SummarizerAgent`. Each of these inherits from the base `Agent` and has its own specific `run` method to perform its unique task. This is a direct application of creating **custom agent logic** for different responsibilities.
2. **Bringing Agents to Life (Instantiation):**
   - The code creates instances of these classes: `researcher = ResearchAgent(...)`, `fact_checker = FactCheckerAgent(...)`, and so on. This is exactly the **agent instantiation logic** we covered – creating actual worker objects from our class blueprints.
3. **Orchestrating the Workflow in Code:**
   - This is where you'll see the **workflow implementation logic** in action. The script doesn't use a complex framework; instead, it orchestrates the agents in a clear, sequential pipeline:
     - The `researcher` runs first on an initial query.
     - Its output becomes the input for the `fact_checker`.
     - The `fact_checker`'s output (specifically, the validated text) is then passed to the `summarizer`.
   - This step-by-step processing, where the output of one agent feeds into the next, is a fundamental way to orchestrate a simple workflow and demonstrates how **data flows and is transformed** through the system by each agent.
4. **Modularity in Action:**
   - Notice how each agent (`ResearchAgent`, `FactCheckerAgent`, `SummarizerAgent`) is a self-contained component. The `ResearchAgent` doesn't need to know how the `SummarizerAgent` works, only what kind of input it expects (implicitly, from the flow). This **modularity** is a key principle we discussed for building manageable and scalable agentic systems.

Focus on:

- How Python classes provide a natural way to define different types of agents.
- How simple method calls can chain these agents together to form a processing pipeline.
- How information is passed and potentially transformed from one agent to the next.
- How this relatively simple Python structure still embodies the core idea of an agentic workflow: multiple agents collaborating by performing specialized tasks in a coordinated sequence.

::: info Start Workspace
Workspaces will shut down **after 30 minutes of inactivity**. Any running processes will be stopped. Workspaces may take up to 5 minutes to start.
:::

### Conclusion

**Agents are the heart of the workflow.** To implement an agentic workflow, you start with the agents themselves. An agent is a piece of code that can execute work: it has access to knowledge, it has a persona, and it may be able to execute a task or return a piece of information.

**Each type of agent is a class.** In the demo script, the agents are defined as a class, and then there is a class for each type of agent: one that does research, one that summarizes, and one that fact checks. Once you have these types, you can start matching them to the different agentic workflows you want to build.

**Knowledge as attributes, actions as functions.** Like any other class, each agent keeps its knowledge as attributes and has functions that run the agent. Every agent is a little different, and some have a function and no attributes at all. How you define your agent is up to you.

**How you use the agents defines the workflow.** What makes this an agentic workflow is not how the agents are written, but how they are used. Here, three agents are defined, and execution runs each of them step by step.

*Source: transcript of the lesson video "Demo: Sequential Agentic Workflow in Python" (Udacity, Agentic Workflows course).*

## Exercise: Fact Checker Agent

In this challenge, you're going to **Enhance the FactCheckerAgent**, giving it a sharper eye. Your mission, is to modify its internal logic so it not only passes on text but also identifies and flags suspicious keywords.

**Instructions: Let's Upgrade Your FactCheckerAgent!**

You'll be working with the `FactCheckerAgent` class definition from demo on the previous page.

1. **Locate the `FactCheckerAgent` Class:**
   - Open the Python script from our "Implementing an Agentic Workflow in Python" demonstration in your editor.
   - Find the `FactCheckerAgent` class definition. It should look similar to the starter code provided for this exercise.
2. **Identify the `suspicious_keywords`:**
   - Notice the class attribute: `suspicious_keywords = ["error", "uncertain", "debated"]`. This is the list of words your agent needs to look for.
3. **Modify the `run(self, text: str) -> Dict:` Method:**
   - Find the `TODO` comment: `# TODO: Check if any suspicious keywords are in the text` and the line `flags = [] # Replace this with real logic`.
   - Your task is to replace `flags = []` with logic that populates this list.
   - **Here's how you can approach it:**
     - Initialize an empty list called `found_flags` (or you can just use the existing `flags` variable after re-initializing it to empty).
     - Iterate through each `keyword` in `self.suspicious_keywords`.
     - For each `keyword`, check if it is present in the input `text`.
       - **Hint:** For case-insensitive matching, it's good practice to convert the input `text` to lowercase before checking (e.g., `text.lower()`). You only need to do this once before your loop.
       - Use the `in` operator to check for substring presence (e.g., `if keyword in text_lower:`).
     - If a `keyword` is found in the `text`, append that `keyword` to your `found_flags` list.
     - After checking all keywords, make sure the `flags` variable in the `return` statement's dictionary holds your `found_flags` list.
   - **Your modified logic section might look something like this:**

```python
# (Inside the run method of FactCheckerAgent)
print(f"✓ {self.name} fact checking...")
time.sleep(0.5)
text_lower = text.lower() # Convert text to lowercase once for efficiency
found_flags = []
for keyword in self.suspicious_keywords:
    if keyword in text_lower:
        found_flags.append(keyword)
# The 'flags' variable in the return dictionary will now use your 'found_flags'
return {
    "text": text,
    "accuracy": "high",        # Simulated
    "verified_claims": 3,    # Simulated
    "flags": found_flags     # Your new logic!
}
```

4. **Test Your Enhanced Agent (Important!):**
   - To see your changes in action, you'll want to test if your agent correctly identifies the flags. You can either:
     - **Modify the full demo:** Change the initial `query` in the main part of the demo script to something that, after simulated research, would likely contain suspicious keywords. For example, if the `ResearchAgent` returned text like "Research results for 'New Drug Efficacy': Found 3 key points, though its long-term effects are debated and somewhat uncertain, with a potential error in early trials.", your `FactCheckerAgent` should pick up "debated", "uncertain", and "error".
     - **Or, add a quick standalone test for just the `FactCheckerAgent`:** Temporarily add these lines at the end of your script to quickly test its behavior with different inputs:

```python
if __name__ == "__main__":
    # ... (existing main demo code from the demonstration) ...
    print("\n=== TESTING ENHANCED FactCheckerAgent ===")
    test_fact_checker = FactCheckerAgent("Test Enhanced FactChecker")
    text1 = "This report is clear and all facts are confirmed."
    result1 = test_fact_checker.run(text1)
    print(f"Input: '{text1}'\nOutput Flags: {result1['flags']}\n") # Expected: []
    text2 = "The findings suggest a positive trend, but the outcome is still debated and uncertain due to limited data."
    result2 = test_fact_checker.run(text2)
    print(f"Input: '{text2}'\nOutput Flags: {result2['flags']}\n") # Expected: ['debated', 'uncertain']
    text3 = "An error was found in the preliminary report, making some conclusions uncertain."
    result3 = test_fact_checker.run(text3)
    print(f"Input: '{text3}'\nOutput Flags: {result3['flags']}\n") # Expected: ['error', 'uncertain']
```

5. **Run and Observe:**
   - Save your modified Python script.
   - Run it from the terminal: `python your_demo_script_name.py`
   - Examine the output from the `FactCheckerAgent` (either in the full pipeline or your standalone test). Does the `flags` list correctly show the suspicious keywords it found?

::: info Start Workspace
Workspaces will shut down **after 30 minutes of inactivity**. Any running processes will be stopped. Workspaces may take up to 5 minutes to start.
:::

## Solution: Fact Checker Agent

::: video {id=aw6-solution} Solution: Fact Checker Agent
transcript: assets/transcripts/aw6-solution.srt
chapters:
- 00:00 Many ways to code agentic workflows
- 00:22 New protocols: MCP and A2A
- 00:49 Agents as Python classes
- 01:18 Specific agents and their inputs
- 01:46 Agent capabilities as functions
- 02:09 The solution: adding flags
- 02:46 Running the demo with flags
:::

In this exercise, you explored an existing agent's code and gave it a new capability: the ability to spot and flag suspicious keywords.

Let's walk through the solution in the workspace below.

::: walkthrough {id=aw6-wt} The Upgraded `FactCheckerAgent`
```python
class FactCheckerAgent(Agent):
    """Agent that verifies information and flags suspicious content"""

    suspicious_keywords = ["error", "uncertain", "debated"] # Our list of keywords to watch for

    def run(self, text: str) -> Dict:
        print(f"✓ {self.name} fact checking...")
        time.sleep(0.5) # Simulate work

        # Identify suspicious keywords in the text
        # This is the core logic you were asked to implement!
        flags = [kw for kw in self.suspicious_keywords if kw in text.lower()]

        return {
            "text": text,
            "accuracy": "high",         # Simulated value
            "verified_claims": 3,     # Simulated value
            "flags": flags            # Your new, dynamic list of flags!
        }
```
@step lines=12 at=02:09
The heart of this solution to the exercise lies in this single, elegant line of Python:

`flags = [kw for kw in self.suspicious_keywords if kw in text.lower()]`

This is a **list comprehension**, a concise way to create lists in Python. Let's unpack it:
@step lines=4,12
`for kw in self.suspicious_keywords`: It loops through each `kw` (keyword) in our predefined `suspicious_keywords` list (i.e., "error", "uncertain", "debated").
@step lines=12
`if kw in text.lower()`: For each keyword, it checks if that keyword exists within the input `text`. Critically, `text.lower()` converts the input text to lowercase first. This makes our search **case-insensitive**, so it would find "Error", "error", or "ERROR". This is a good practice for such checks.
@step lines=12
`kw ...`: If the keyword *is* found in the lowercase text, that `kw` (the keyword itself) is included in the new list being created.
@step lines=14-19 at=02:32
**The Result:** The `flags` variable will now be a list containing only those suspicious keywords that were actually found in the input `text`. If no keywords are found, `flags` will correctly be an empty list, just as the exercise required.
:::

::: info Start Workspace
Workspaces will shut down **after 30 minutes of inactivity**. Any running processes will be stopped. Workspaces may take up to 5 minutes to start.
:::

### Conclusion

**There are many ways to code an agentic workflow.** New research keeps bringing new coding patterns for implementing agentic workflows, and new protocols such as MCP and A2A are being defined to describe what agents are and how agents communicate with each other. This lesson does not go into those protocols; it looks at a more general implementation.

**Agents are classes in Python.** In general, agents are defined as classes. The base agent class typically holds a call to an LLM. More specific agents are also defined as classes: they may take an agent as an input parameter, or they may run the code of the base agent class internally, in which case they receive different input parameters.

**Capabilities are functions.** Inside the agent class, functions execute the different capabilities of the agents. This workflow has three agents: a research agent, a summarizer agent, and a fact checker agent, the one you were asked to enhance.

**The solution adds flags to the fact checker.** The exercise is solved by changing the function inside the fact checker agent: flags are defined inside the function and returned from it, which adds the new capability to the agent. When you run the demo with all the agents included, the output now shows the information collected in the flags.

*Source: transcript of the lesson video "Solution: Fact Checker Agent" (Udacity, Agentic Workflows course).*

## Summary

### 🏆 Congratulations on Conquering Agentic Workflow Implementation in Python! 🏆

You've completed "Implementing an Agentic Workflow in Python," and that's a fantastic milestone! You bridged the gap between theoretical agent design and tangible Python implementation.

Through these activities, you've gained and reinforced several valuable skills for building agentic systems:

- **Python Class-Based Agent Definition:** You've seen and practiced how to define agents as Python classes, encapsulating their properties and behaviors (like the `run` method).
- **Implementing Custom Agent Logic:** You directly coded the internal logic of an agent to perform a specific data processing task (keyword searching and flagging).
- **Modular Component Thinking:** This lesson reinforced that agents are modular building blocks. You saw how you could improve one agent (the `FactCheckerAgent`) within a larger (simulated) workflow.

You've now got a much clearer understanding of how the conceptual building blocks of an agentic workflow—like individual agents with specialized tasks and the way they connect—can be translated into actual Python code.

Fantastic work, and keep that coding momentum going!
