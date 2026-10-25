[!Draft|amber] Udacity Agentic AI Nanodegree.

## Introduction

Unlocking Advanced AI: Prompting for LLM Reasoning and Planning

Are you ready to unlock the advanced capabilities of Large Language Models (LLMs) and elevate your interaction with artificial intelligence? This learning path is designed to equip you with powerful prompting techniques essential for building sophisticated AI agents. Mastering these skills allows you to guide LLMs through complex, multi-step tasks, improving the accuracy, relevance, and utility of their outputs for real-world applications.

Large Language Models have created a new computing paradigm largely based on how we write prompts. This learning journey is focused on how advanced prompting techniques enable AI applications to become AI agents. By the end of the journey, you'll understand the mechanics and possess the skills to apply prompting techniques to agentic AI systems.

The Need for Agentic AI: Debugging Complex Code

Imagine you're tasked with building an automated system to help developers debug complex code. Simply feeding the buggy code and the error message into a standard LLM often results in generic suggestions that miss the specific context of the larger project. The LLM might suggest superficial fixes or even introduce new bugs.

How can you create an AI assistant that acts more like an experienced senior developer – one that can break down the problem, hypothesize potential causes, decide which parts of the code to inspect, integrate information from different files, update tests, and even learn from its failures? This requires moving beyond single-shot prompts to build a system capable of multi-step reasoning, planning, and execution – precisely the prompting techniques we'll master.

::: quiz {id=intro-q1} Quiz Question
Why is a single, simple prompt often insufficient for guiding an LLM through a complex or multi-step task?

- [ ] Because LLMs fundamentally lack the ability to handle more than one instruction at a time.
- [x] Because complex tasks require a sequence of reasoning, planning, and actions that a single prompt cannot adequately structure or guide.
- [ ] Because advanced prompting is a theoretical concept that has no practical application in current AI systems.
- [ ] Because single prompts are only useful for generating creative text, not for solving logical problems.
- [ ] Other.
:::

::: response {id=free-response-1} Free Response
Think about a complex, multi-step project you've recently worked on, either personally or professionally. This could be anything from planning a detailed event, to troubleshooting a tricky problem at home or work, or even tackling a challenging creative endeavor.

1. Briefly describe the project and list 3-4 distinct steps you had to take to move it forward.
2. Now, imagine you were trying to get a standard AI assistant (like a basic chatbot) to complete the entire project for you using only a single request or prompt.
3. Based on your experience with AI, at which specific step do you predict the AI would most likely fail, misunderstand, or give a generic, unhelpful response? Why do you think that particular step would be the breaking point for a single-prompt approach?
:::

Throughout this course, you'll explore:

* The world of AI Agents, understanding their core components and how they reason, plan, and interact with their digital environments.
* The art and science of advanced prompting techniques, mastering how to instruct LLMs with precision and nuance.
* Crafting specialized personas using role-based prompting to make AI outputs more targeted and contextually relevant.
* Unlocking problem-solving abilities using Chain-of-Thought (CoT) to guide the LLM's reasoning process and ReAct (Reason + Act) to enable LLMs to use tools and take actions.
* The process of prompt instruction refinement, learning to systematically analyze and adjust your prompts for optimal performance.
* Building multi-step agentic workflows by chaining prompts together, allowing AI to tackle more complex tasks.
* Prompt Chaining & Feedback Loops: Building robust, multi-step workflows that allow an AI to tackle complex tasks and even improve its own work based on feedback.

End of Course Project: Agentsville Trip Planner

At the end of the course, you'll attempt to build the "Agentsville Trip Planner Assistant" project, a smart agent that can take a complex request and see it through to completion. This is your opportunity to see just how powerful prompting can be in agentic AI. You will apply all of the individual skills you learned to create a truly capable system.

## Knowledge Check: Are You Ready?

🧠 Let's do a quick check to ensure you're comfortable with the foundational concepts.

::: quiz {id=ready-q1} Question 1 of 4
In the context of interacting with a Large Language Model (LLM), what is a 'prompt'?

- [ ] A software library used to connect to the LLM.
- [x] The input text or instructions provided to the LLM to guide its response.
- [ ] The underlying algorithm the LLM uses for generation.
- [ ] The error message returned by the LLM if it fails.
:::

::: quiz {id=ready-q2} Question 2 of 4
Which of the following best describes a Large Language Model (LLM)?

- [ ] A type of advanced spell-checker integrated into word processors.
- [ ] A hardware accelerator used for speeding up natural language processing tasks.
- [ ] A relational database specifically designed for storing and retrieving textual information.
- [x] A machine learning model trained on vast amounts of text data to understand, summarize, generate, and predict content.
:::

::: quiz {id=ready-q3} Question 3 of 4
What is the primary purpose of a Python dictionary?

- [ ] To store an ordered sequence of items.
- [x] To store key-value pairs.
- [ ] To perform mathematical calculations.
- [ ] To define reusable blocks of code.
:::

::: quiz {id=ready-q4} Question 4 of 4
In a Jupyter Notebook, how do you typically execute a code cell and see its output?

- [ ] By typing 'execute' at the end of the cell.
- [ ] By right-clicking the cell and selecting 'Compile.'
- [ ] It executes automatically as you type.
- [x] By selecting the cell and pressing Shift + Enter (or using a 'Run' button in the interface).
:::

We want to wish you the very best of luck! You're about to start a journey to harness the incredible power of Large Language Models. Get ready to move beyond basic interactions and learn how to architect and guide AI.

By the end of this journey, you will have acquired the skills to:

* Explain AI systems that utilize LLMs for sophisticated reasoning and planning capabilities.
* Master a range of advanced prompting strategies to elicit precise behavior and information from LLMs.
* Systematically optimize and refine your prompts, transforming general AI responses into highly specific and useful outputs.
* Construct multi-step AI workflows that can handle complex, real-world challenges.
* Implement mechanisms for validation and iterative improvement, leading to more reliable AI agents.
* Ultimately, transform generic Large Language Models into specialized, powerful tools tailored to solve intricate problems across various domains.

This course will both challenge you and equip you with the cutting-edge skills needed to innovate in the rapidly evolving field of artificial intelligence. We're excited to see what you'll learn and, eventually, what you'll build. Good luck!

## The Role of Prompting in Agentic AI with Python and OpenAI

Learn what AI Agents are and how they work. Understand the critical role prompting plays in guiding them to reason, plan, and act to achieve goals.

### Introduction

AI agent is an intelligent system that can **perceive its environment, make decisions, and take actions to achieve a goal**.

Key points:

- unlike a basic LLM that mainly generates text, an agent can **reason, plan, and act**
- agents can work **with you or on your behalf**
- they're useful for **multi-step tasks** that need planning or outside information
- modern agents usually include:
  - an **LLM** as the "brain"
  - **tools** like APIs or search
  - **instructions** that guide behavior
  - **memory** for context and past interactions
  - an **orchestration/runtime layer** that manages tool use and execution

The big idea: agents help bridge the gap between "answering questions" and actually **getting things done** in the real world.

▶ Video: [What Is An AI Agent? (YouTube)](https://youtube.com/watch?v=D3B5qPSPB1E)

### What Is An AI Agent?

So, what exactly is an AI Agent? At its core, **an agent is an intelligent system capable of perceiving its environment, making decisions, and taking actions to achieve specific goals**. Key characteristics include autonomy, adaptability, and interaction with its surroundings.

While traditional AI systems might simply compute or follow static rules, agents are designed for autonomy, adaptability, and interaction with their surroundings. They take the power of generative AI, particularly Large Language Models (or LLMs), a step further.

Instead of merely assisting you, agents can work alongside you or independently on your behalf. They can handle a range of tasks, from simple responses to more complicated, multistep assignments. AI Agents move beyond static rules or simple generation to **reasoning, planning, and acting** towards a goal using tools. They give LLMs the capability to reason, plan, and act in an environment– like your computer, the internet, or the physical world–to achieve a goal.

> An agent decides on actions, potentially using external tools, and observes the results to inform its next steps.

### Components of an AI Agent

The foundation of a modern AI agent typically involves several key components:

1. **Large Language Model (LLM)**: This serves as the "brain" of the agent, providing the ability to understand, reason, and act. LLMs process and generate language, enabling the agent's cognitive functions.
2. **Tools:** These are external functions, APIs, or resources that the agent can access and utilize to interact with its environment and enhance its capabilities. Tools allow agents to perform specific tasks beyond text generation, such as searching the web, querying databases, making calculations, or controlling external systems.
3. **Instructions:** Explicit guidelines, often provided through a system prompt, define how the agent should behave and guide its actions.
4. **Memory:** Agents can possess various forms of memory, including short-term memory (context from the current conversation) and long-term memory (from past historical interactions), enabling them to learn from past experiences and maintain context.
5. **Runtime/Orchestration Layer:** This environment allows the agent or LLM to control its execution flow, decide when to use tools, and process observations. In fact, the orchestration layer is what actually runs the tools on the LLM's behalf, since by itself it only generates text.

::: quiz {id=agent-components-q1} Question 1 of 2
**Scenario:** You are designing an AI assistant to help users with financial questions. A user asks:

> "Based on my current checking account balance, can I afford to buy the new 'X-1' laptop that was just released?"

A standard LLM cannot answer this question directly because it doesn't have access to the user's private, real-time bank information.

**Question:** To solve this problem, which component would an **AI Agent** need to use to find the user's current account balance?

- [ ] A more powerful Large Language Model (LLM).
- [ ] A more detailed set of Instructions in the system prompt.
- [x] A Tool, such as a `get_account_balance` API function.
- [ ] Memory to remember the user's previous transactions.
:::

### Why Build with Agents?

While powerful, standalone LLMs often fall short when faced with complex, broader tasks requiring multiple steps, planning, and sophisticated reasoning. These tasks often demand accessing external, real-time information or tools outside the LLM's training data.

Agents bridge this gap by integrating LLM reasoning with tools and planning capabilities. They enable the execution of workflows and allow actions in the "real world," whether digital or physical via APIs, to complete tasks.

![Standalone LLMs struggle with complex multi-step tasks, planning and real-time information; agents bridge the gap by integrating LLM reasoning with tools and planning, executing workflows and acting through APIs.](assets/images/l07-agents-bridge-the-gap.png "Standalone LLMs vs agents")

::: tip The Critical Role of Prompting
The LLM is the brain of most of our systems, but how do we instruct this brain to perform complex reasoning and make intelligent decisions, especially when interacting with tools and the environment? This is where effective prompting becomes important.
:::

### What is Prompting?

Prompting is essentially the means by which LLMs are programmed or guided. A prompt is a set of instructions provided to an LLM that customizes, enhances, or refines its capabilities. For agents, these instructions (including system prompts, user requests, and tool descriptions) are components. Thus, LLMs provide the raw reasoning power, but prompting is the method by which we "program" the LLM.

### Real-World Use Case: Processing A Refund

Prompting is how we **guide or program** an LLM inside an agentic system.

Main idea:

- the LLM provides the raw reasoning power
- the **prompt** gives it instructions that shape what it does
- in agents, that includes **system prompts, user requests, and tool descriptions**
- good prompting helps the agent break a complex task into smaller steps and decide what to do next

The refund example shows this well: instead of following a fixed script, the agent uses prompting to reason through steps like checking purchase history, comparing against refund policy, assessing the reason, and choosing the next action.

![A customer asks support for a refund; the agent verifies purchase history, checks against policy, assesses the reason, and decides the next steps.](assets/images/l07-refund-use-case.png "Real-World Use Case: Processing A Refund")

A compelling real-world example of an AI agent in action is a customer support agent designed to handle complex requests, like processing a refund.

When a customer submits a request, such as asking for a refund for a specific product, this serves as the initial prompt or input to the agentic system.

* Instead of following a rigid script, the agent uses reasoning and planning capabilities, often powered by an LLM, to break down the complex request into simpler, manageable tasks.

For a refund request, this might involve:

1. Identifying the need to verify the customer's purchase history.
2. Checking the product details against the company's refund policy.
3. Assessing the reason for the request.
4. Deciding on the appropriate next step based on the findings.

This process of breaking down a complex problem into sequential sub-problems is a key aspect of planning and can be guided by prompting techniques.

::: quiz {id=prompting-q2} Question 2 of 2
What is the primary purpose of prompting in relation to LLMs?

- [x] Prompting is a method to guide LLMs by providing structured instructions to perform tasks.
- [ ] Prompting serves only to set up a conversation, not to develop reasoning.
- [ ] Prompting is purely about providing data inputs without any guidance.
- [ ] Prompting involves solely static templates with no dynamic responses.
:::

## Exercise: Organize Your Workspace

### Exercise: Organize Your Workspace Kick‑Off

In this hands‑on exercise, you will refine a series of prompts to guide the LLM in creating—and explaining—a practical one‑hour plan to organize your personal work area. We guided a Large Language Model through a series of prompt refinements to create a practical plan for organizing a personal workspace. Let's walk through how each change to the prompt affected the AI's response.

**The Challenge: Getting Your Personal Workspace Organized, Intelligently**

Imagine this: your workspace is crying out for organization. You know an LLM can help generate a plan, but a simple request like "organize my workspace" might yield a plan that's too generic, doesn't fit your actual needs, ignores your time constraints, or lacks professional insight. How do you move from a basic, one-size-fits-all suggestion to a tailored, actionable strategy that truly works for *you* and your specific situation? Let's transform a general AI assistant into a focused, insightful planner.

**Your Mission: Sculpting AI Output with Precision Prompts**

In this exercise, you'll step into the role of a prompt engineer. You'll start with a very basic request to an LLM and witness its initial, perhaps underwhelming, attempt to create a workspace organization plan. Then, by applying the principles of effective prompting, you will iteratively refine your instructions. You will:

1. **Assign a Professional Persona:** See how giving the LLM a role changes its tone, suggestions, and the perceived expertise of its advice.
2. **Introduce Concrete Constraints:** Challenge the LLM to work within realistic limits, like time and budget, forcing it to prioritize and make trade-offs.
3. **Request Step-by-Step Reasoning:** Ask the LLM to "show its work," making its decision-making process transparent and revealing how it interprets your refined prompts.

::: info Start Workspace
Open the Udacity workspace for this exercise from the course page. Workspaces shut down **after 30 minutes of inactivity**, and any running processes are stopped. A workspace may take up to 5 minutes to start.
:::

### Instructions

Follow these step-by-step instructions to complete the exercise in the workspace above:

1. **Navigate to the Notebook in the file explorer and open it in the editor:** `/workspace/introduction-to-prompting-for-llm-reasoning-and-planning/starter/introduction-to-prompting-for-llm-reasoning-and-planning.ipynb`
2. **Initial Setup & API Key:**
   - Add your API key from the cloud resources tab above.
3. **Part 1: Generic Prompt**
   - Locate the section "1. Generic Prompt".
   - Run the code cell that defines `plain_system_prompt` and `user_prompt`, then calls `get_completion` to get the `baseline_response`.
   - Observe the output displayed. Review the "Observations" questions in the notebook to guide your analysis of the model's initial plan.
4. **Part 2: Add a Professional Role**
   - Go to the section "2. Add a Professional Role".
   - You will find a `TODO` item: `role_system_prompt = "***********"`.
   - **Your Task:** Modify this line to assign a professional role to the LLM. For example, change it to: `role_system_prompt = "You are an expert professional organizer and productivity coach."` (Feel free to try a slightly different professional persona if you like!)
   - Run this cell to define the new system prompt and get `role_response`.
   - Observe the output, comparing it to the baseline. Note any changes in terminology, detail, or professionalism, as prompted by the "Observations" section.
5. **Part 3: Introduce Concrete Constraints**
   - Proceed to "3. Introduce Concrete Constraints".
   - Find the `TODO`: `constraints_system_prompt = f"{role_system_prompt}. ***********."`
   - **Your Task:** Add specific constraints to the system prompt. For instance, append a sentence like: `constraints_system_prompt = f"{role_system_prompt}. The plan must be achievable in one hour and require no purchases, using only existing household items."` (You can adjust the time or add other constraints like a small budget, e.g., "a budget of $20 for essential supplies.")
   - Run the cell to get `constraints_response`.
   - Analyze how the model adapted its plan to meet these new constraints, using the "Observations" as a guide.
6. **Part 4: Request Step-by-Step Reasoning**
   - Navigate to "4. Request Step-by-Step Reasoning".
   - Locate the `TODO`: `reasoning_system_prompt = (f"{constraints_system_prompt}. *********** before presenting the final checklist.")`
   - **Your Task:** Modify the prompt to explicitly ask the LLM to explain its reasoning. For example, change it to: `reasoning_system_prompt = (f"{constraints_system_prompt}. Explain your reasoning for each step of the plan in a thoughtful way before presenting the final checklist.")`
   - Run the cell to obtain `reasoning_response`.
   - Examine the model's explanation. Does its reasoning seem logical? How did the constraints influence its decisions?
7. **Part 5: Reflection & Transfer**
   - Move to "5. Reflection & Transfer".
   - In the markdown cell provided, type your thoughts on which prompt tweak had the most significant impact and why.
   - For the `TODO` item "List two other situations where the same prompt-refinement pattern could help", replace the `***********` with your ideas. For example:
     - "Generating a workout plan tailored to specific fitness goals and available equipment."
     - "Creating a personalized travel itinerary for a short trip with a limited budget."
8. **Bonus: Apply What You've Learned**
   - If you have time and feel adventurous, tackle the "Bonus" section.
   - **Your Task:** Define your own `custom_system_prompt` and `user_prompt` for a new scenario (e.g., organizing digital files, planning a small event).
   - Uncomment the lines `print("Sending custom prompt...")`, `custom_response = ...`, `print("Response received!\n")`, and `display_responses(...)`.
   - Run your custom prompt and see the results!

#### 1. The Baseline: A Generic Prompt

First, we established a baseline by providing the LLM with a generic role and a simple request.

- **System Prompt:** `You are a helpful assistant.`
- **User Prompt:** `Give me a simple plan to declutter and organize my workspace.`

The model's response was a standard, all-encompassing 10-step plan. It covered everything from setting a goal to clearing the space, sorting items, and maintaining the organized space at the end. While helpful, this plan is not tailored to any specific person's needs.

#### 2. Adding a Professional Role

Next, we refined the prompt by assigning a professional persona. The goal was to see if this would affect the expertise and tone of the response.

Here is the code we used to change the role:

```python
role_system_prompt = "You are a certified professional organizer."
```

As the author noted when comparing the two outputs, the change can be subtle: "On the left, you are a helpful assistant. On the right, you are a certified professional organizer. Now, these actually don't look too different. They both say: 'Certainly, here's a simple step-by-step plan...' and actually, they both have 'set a goal' as a very first step.". However, the new response did introduce more professional-sounding steps like "Gather Supplies" and "Create Zones," indicating a shift in the model's approach based on its new role.

#### 3. Introducing Concrete Constraints

The most significant change occurred when we introduced specific, real-world constraints. This is where the power of prompt refinement becomes clear, as it forces the model to move from a generic template to a truly customized plan.

We updated the prompt with the following code:

```python
constraints_system_prompt = f""" {role_system_prompt}. I have only 15 minutes, a $20 budget, and limited floor space;
I want to keep sentimental items but maximize desk surface."""
```

This caused a dramatic shift in the output. As the instructor points out in the video walkthrough, "the new response seems to be a little more compact. It only has five points and now we have a number of minutes for each point. If you add these numbers together, it actually is 15 minutes.".

The model's plan now directly addressed the user's specific needs:

- **Time:** It provided a 15-minute, timed plan.
- **Priorities:** There is a step dedicated to "Focus on Sentimental Items."
- **Budget:** A "Budget Tip" at the end suggests using items already at home to stay within the $20 limit.

This step-by-step refinement shows how we can program an LLM through clear instructions. By adding a role and, more importantly, specific constraints, we guided the AI to produce a far more useful and personalized plan.

## Exercise: Model Selection

In the "Organize Your Workspace" exercise, you saw how refining a prompt dramatically changes an AI's output. Now, we'll explore another critical variable: the AI model itself. The choice of which Large Language Model to use as the "brain" for your agent is a key decision with significant trade-offs.

#### Comparing Model Outputs

In this short exercise, you will re-run the final, most-refined prompt from the "Organize Your Workspace" exercise using the different models available in our environment. Your goal is to observe the differences in output quality, style, and response time.

::: warning
Please do not upload sensitive information to workspaces.
:::

::: info Workspace
Open the Udacity workspace for this exercise from the course page (folder: `/workspace/introduction-to-prompting-for-llm-reasoning-and-planning/solution`).
:::

**Instructions:**

1. Return to your completed `introduction-to-prompting-for-llm-reasoning-and-planning.ipynb` notebook from the previous exercise or use the `model_selection.ipynb` file in the workspace .
2. Locate the cell where the model is defined:

```python
MODEL = OpenAIModel.GPT_41_NANO
```

3. Change `GPT_41_NANO` to `GPT_41_MINI` and re-run the final cell of the exercise (the one using the `constraints_system_prompt`).
4. Observe the new response. Is it longer or shorter? More or less detailed?
5. Now, change the model to `GPT_4O_MINI` and run the cell one last time.
6. Compare all three responses. Which one did you find most helpful? Was there a noticeable difference in how quickly each model responded?

### Choosing the Right Model for the Job

Different models produce different results. This brings us to a decision point when creating any AI application: choosing the right model is not always about picking the most powerful one. It's an engineering trade-off between three factors: **capability, cost, and latency (speed)**.

- **Capability:** Larger, more advanced models (like OpenAI's GPT-4 series) are generally better at handling nuance, complex reasoning, and following intricate instructions. Smaller models are still very capable but may require more explicit and carefully structured prompts to achieve the same quality.
- **Cost:** In a production environment, you pay for every token the model processes (both in your prompt and in its response). For an application handling thousands of requests a day, the cost difference between a large model and a smaller, more efficient model can be enormous.
- **Latency:** This is the time it takes for the user to get a response. For interactive applications like chatbots or assistants, low latency is critical for a good user experience. Smaller models are almost always faster.

Throughout this course you will be able to choose between different OpenAI models, which allow you to balance performance, speed, and cost. Specifically, we'll recommend using different versions of `gpt-4o` and the newer `gpt-4.1` models. In general, the newer `gpt-4.1` family will offer better performance per dollar spent on coding and instruction following tasks; also, sometimes older models are deprecated in favor of the newer ones, so it's important to keep your configurations up-to-date. If in doubt, a great place to start for the exercises in this course is either `gpt-4.1-mini` or `gpt-4.1-nano`.

```python
# Brief descriptions of gpt-4o and gpt-4.1 models

class OpenAIModel(str, Enum):
        # GPT‑4o ("Omni") – flagship multimodal model released May 13, 2024.
        # Handles text, audio, images, and video with native voice/vision support;
        # ~128 K token context window.
        GPT_4O = "gpt-4o"

        # GPT‑4o‑mini – smaller, cost-effective variant released July 18, 2024.
        # Multimodal like GPT‑4o, same context window, optimized for affordability.
        GPT_4O_MINI = "gpt-4o-mini"

        # GPT‑4.1 – developer-focused flagship released April 14, 2025.
        # Massive 1 M token context window; excels at coding, reasoning, instruction-following.
        GPT_41 = "gpt-4.1"

        # GPT‑4.1‑mini – compact variant in the 4.1 family.
        # Same 1 M context, much lower latency and cost; matches or outperforms GPT‑4o on many benchmarks.
        GPT_41_MINI = "gpt-4.1-mini"

        # GPT‑4.1‑nano – smallest, fastest 4.1 variant.
        # 1 M token context, highly efficient and cost-effective for lightweight tasks.
        GPT_41_NANO = "gpt-4.1-nano"
```

#### Prompting and Efficiency

This is where prompt techniques become powerful. **Prompting for planning and reasoning allows you to use cheaper, faster models.**

Think about it this way: you can try to solve a complex problem by giving a vague instruction to a very large, expensive model (like OpenAI o3) and hoping it correctly infers all the necessary steps. This approach is slow and costly to run for every user request.

The alternative is what this course teaches: you, the engineer, use prompting techniques like **Chain-of-Thought** and **Prompt Chaining** to explicitly break the problem down into a series of logical steps. Because each individual step is simpler and more focused, you can often use a smaller, faster, and much cheaper model (like GPT-4.1 mini) to successfully execute each one.

You are essentially trading a small amount of your own development effort—designing a good agentic workflow—for gains in speed and cost-efficiency in production. As you continue through this course, keep this trade-off in mind. Our goal is to build AI agents that are not just smart, but also practical and efficient.

::: quiz {id=model-selection-q1} Quiz Question
Your team is building a new AI-powered customer support chatbot for an e-commerce website. The agent is designed with a clear, multi-step prompt chain: it first identifies the user's product category, then retrieves FAQs for that category, and finally, drafts an answer based on the retrieved information.

The chatbot needs to handle thousands of common customer questions per day, and user experience (getting a fast answer) is a top priority.

**Question:** Which model selection strategy is best for this solution?

- [ ] Choose the largest, most capable model available so every answer is as nuanced and detailed as possible, even if it's more expensive and slower.
- [x] Start with a smaller, faster model (like GPT-4o-mini). Since the task is broken down into clear steps (identify, retrieve, draft), this model is likely capable enough. This approach prioritizes low latency for the user and keeps operational costs down.
- [ ] Choose the absolute smallest and cheapest model possible to minimize costs, even if the prompts needs to be made extremely complex to get acceptable answers.
- [ ] Model selection doesn't matter as long as the prompt engineering is good enough.
:::

You've acquired some powerful tools in your toolkit and advanced your understanding of the role of prompting in agentic AI:

- **Strategic Prompt Design:** Prompting is more than just asking a question; it's about crafting instructions that guide the LLM towards a specific, desired output.
- **Eliciting Transparency:** You've seen how to ask an LLM to "show its work," making its reasoning clearer and often improving the coherence of its output.
- **Iterative Refinement:** Most importantly, you've practiced the core engineering skill of starting with a basic idea and systematically refining your approach (in this case, your prompts) to achieve a significantly better outcome.

These are hands-on abilities that put you in the driver's seat when interacting with AI. You've seen firsthand how a few well-chosen words can dramatically alter an AI's behavior and the usefulness of its output. We encourage you to continue learning these effective techniques!

## Role-Based Prompting

A **role-based prompting**: giving the model a specific identity so its responses match a desired **tone, perspective, and style**.

Main points:

- without a role, the model may give a generic answer
- with a role, you guide it to respond like a specific kind of expert or persona
- the role is usually defined in the prompt, often in the system message
- this helps make outputs more **targeted, consistent, and appropriate** for the task

The core idea is: you’re not just asking for content — you’re also shaping **how** the agent should behave.

▶ Video: [Role-Based Prompting (YouTube)](https://youtube.com/watch?v=3rKSFF1Oy7Y)

### Role-Based Prompting: Crafting Specialized AI Personas for Agents

Have you ever interacted with a chatbot and thought, "This is cool, but it's a bit... plain?" Or maybe it’s close to what you want, but the style is not quite right—too formal, or not formal enough; too upbeat, or not upbeat enough. Let's learn how to apply role-based prompting techniques to produce specialized LLM outputs for different tasks.

For instance, if we ask an LLM to "Tell me about cats…", we might get a generic response like:

- "*Cats are common pets. They are known for being playful and independent.*"

However, we might be looking for a more stylized literary response:

- "*As popular pets, cats are celebrated for their playful antics and self-reliant nature.*"

Or, we might even want a Pirate response!

- "*Ar, cats be beloved mates, prized fer their cheeky antics and self-reliant spirit, yar!*"

Large Language Models are incredible at generating and editing text. They're trained on loads of data and are fantastic at general tasks. But sometimes, you need more than just a general response. You need an expert, a creative writer, a data analyst, or even a historical figure! How do we get these powerful models to act like specialized professionals or adopt a specific voice? That's where Role-Based Prompting, also known as Agent Personas, comes in.

#### Role-Based Prompting

Let's unlock the power of assigning roles to your LLMs. We'll cover the fundamentals:

- **Overview:** A deep dive into what role-based prompting is and why it's a game-changer.
- **Creation:** How to craft effective prompts that bring your chosen persona to life.
- **Evaluation:** Strategies for evaluating how well your AI is staying in character.
- **Applications:** Real-world examples across different domains, from healthcare to travel planning, coding, and creative tasks.

At its core, role-based prompting is about giving your LLM a specific identity or "persona" to inhabit. Think of it like casting an actor for a play. You don't just give them the lines; you give them character background, motivation, and direction on how to deliver those lines. For an LLM, this character background and direction are provided in the prompt, typically within the system message or the initial part of a user prompt. The goal is to get the model to produce outputs that are specialized and consistent with the traits of that defined role.

> A Persona (or Role) defines how an agent should behave—its personality, tone, and perspective.

Why is this so effective? LLMs are trained on diverse sets of data. While they have broad knowledge, they also have specific knowledge, and they need guidance to use a specific tone, style, or focus needed for certain tasks. Assigning a role helps shape the model's behavior and output style by directing its response based on the user input and the defined role. It's a key strategy for getting more targeted and precise results from your LLMs. Without a role, the output may be less targeted and precise, with the LLM potentially choosing any of several styles: formal, enthusiastic, casual, or humorous. By specifying a role, you also specify the style of your output.

![Assigning a Role Shapes the Model's Output](assets/images/l07-role-shapes-output.png "Assigning a role shapes the model's output")

::: quiz {id=role-based-q1} Quiz Question
You are using an AI to help draft a marketing announcement for a new enterprise software product aimed at chief financial officers (CFOs). You ask the AI, "Draft an announcement for our new accounting software."

The AI returns a factually correct draft, but the tone is very casual and uses a lot of emojis, which is not appropriate for the target audience.

What is the most direct way to solve this problem?

- [x] Add a specific Role to the prompt, such as "You are a professional B2B marketing writer specializing in content for an executive financial audience."
- [ ] Add more facts about the software's features to the prompt.
- [ ] Ask the AI to "be more professional."
- [ ] Ask the AI to write the announcement in the style of a pirate.
:::

#### Terms

- **Role-Based Prompting (Agent Personas):** A technique to guide a Large Language Model by giving it a specific identity or "persona" to inhabit, which helps produce outputs that are specialized and consistent with the traits of that defined role.
- **Role (or Persona):** A specific identity or character background provided to an LLM in a prompt to shape its behavior and output style.
- **Prompt:** The instructions provided to an LLM to guide its response. For role-based prompting, the prompt provides the character background and direction on how to deliver its lines.

### Crafting a Good Role-Based Prompt

Crafting a good role-based prompt is not just about saying "Act like a pirate!" (though you can do that too!). You may need to be specific about the persona’s attributes, including their personality, communication style, vocabulary, and areas of expertise.

While there are no hard and fast rules in the ever-changing landscape of LLMs, the components of a role-based prompt may include:

- **[Role]:** The persona the LLM should adopt (e.g., "Act as a pirate").
- **[Task]:** The specific instruction or question (e.g., "Perform the calculation: 1+1?").
- **[Output Format]:** How the response should be structured (e.g., "A sentence in Markdown.").
- **[Examples]:** Sample input/output pairs (e.g., "Q: 1+3? / A: Tis *4*, yar!").
- **[Context]:** Additional information needed for the task (e.g., current date, if asking for the date).

Not all successful prompts contain all these components, and they don't necessarily appear in the same order. For instance, a complete prompt might be:

```text
Act like a pirate! #[Role]
Perform the calculation: 1 + 1? #[Task]
Output a sentence in Markdown. #[Output Format]
Here’s an example: Q: 1 + 3? / A: Tis 4, yar!" #[Example]
```

- In this example, we haven’t included additional context, but we would include any extra information the LLM needs that wouldn't have been in its training data.
- If you construct such a role-based prompt, you might get an answer like: `Ahoy! That be simple reckonin’, matey! Tis, 2, yar!` This gets the calculation and tone correct. However, it seems to have missed the constraint to respond using only one sentence. We can certainly adjust our prompt to make it clearer to use ONLY-ONE-SENTENCE, which will likely work.

There’s a bigger point here, though. As we’re building AI Agents, we’ll want to know whether they are performing according to the criteria we have set for them. So if it’s important to only have a single sentence here, then it will need to be something we measure.

## Evaluating Agent Personas

You've crafted your perfect persona prompt. Now, **how do you know if the LLM is actually doing a good job of following the role and other specifications you’ve set for it?**

**How to tell whether a persona prompt is actually working.**

Main points:

- define what “good” looks like first: accuracy, tone, format, role adherence, etc.
- create **ground truth** examples with test inputs and ideal outputs
- compare the agent’s responses against those examples
- for structured outputs, use direct checks and standard metrics
- for open-ended text, you can use **LLM-as-a-judge**, but you still need to validate the judge
- also inspect **traces** — the raw inputs and outputs — because automated scoring can miss issues

It also highlights other checks like **persona consistency**, **robustness**, and simple monitoring metrics such as response length or cost. The big takeaway: treat agent evaluation like software testing — measure, inspect, refine, repeat.

▶ Video: [Evaluating Agent Personas (YouTube)](https://youtube.com/watch?v=nADQNL5ogh4)

### Evaluation is key!

It's similar to a director assessing an actor's performance during rehearsals. You need to test the AI's responses to see if they are consistent with your expectations. For instance, is the tone/format correct, or is the answer even accurate?

### Ground Truth Evaluations

The most straightforward, effective, and reliable way is to create a ground truth set for scoring future outputs.

1. Start by defining the task and identifying the criteria for success. What does "good" output look like? Does it require factual accuracy, specific formatting, or a particular tone?
2. Based on this, develop a set of test inputs and the ideal outputs – your ground truth.
3. When your AI Agent generates a response, compare it to the ground truth.
   - For structured data like JSON, use checks to ensure the agent adheres to the expected format and values. Start with traditional Machine Learning evaluation metrics such as completeness, accuracy, precision, and recall.
   - For textual responses or even images, which are more freeform, you may employ another LLM as a judge (LLM-as-a-judge), feeding it both the agent's output and the ground truth and asking it to score the agent based on your provided criteria. Note, in this case, you will need to evaluate the evaluator!
4. In all these cases, it’s important to continue to view the raw inputs and outputs of your models, sometimes called traces. This will give you a better understanding of what is actually going on and help you catch errors your evaluation pipeline may miss.

### Other Evaluation Types

Other evaluation methods not always based on a ground truth dataset are also important:

- **Consistency & Persona Adherence:** Is the agent staying within its defined role? This is essential, for instance, in the case of a Customer Support agent. If the agent is supposed to be a hospital assistant, does it stay within that role, even if asked about non-medical topics? A mock conversation can be passed to the Agent and the output can be evaluated by another LLM.
- **Robustness Testing:** Assess resilience against adversarial attacks. This is critical if the agent handles sensitive information or could cause harm.
- **Simple Metrics:** Easy-to-implement measures like median response length are good for evaluating and monitoring language models for improved usability and cost efficiency.

In all these cases, track performance as you develop your algorithms as well as in production over time, where the model is exposed to a constant stream of real-world data. This way, you can improve and refine your agent. This evaluation often leads to an iterative refinement process. You adjust the prompt based on the AI's performance, clarifying instructions or adding more examples until the output aligns better with your expectations. Treat LLM applications like software development where testing and feedback are crucial for improvement.

### Terms

- **Ground Truth Evaluations:** A method of evaluation where you create a set of test inputs and their corresponding ideal outputs (the ground truth) to score an agent's responses against.
- **LLM-as-a-judge:** An evaluation technique where another LLM is used as a "judge" to score an agent's output against the ground truth based on your provided criteria.
- **Traces:** The raw inputs and outputs of a model for a given interaction, which are important to view to understand the model's behavior and catch potential errors.
- **Consistency & Persona Adherence:** An evaluation method that assesses whether an agent is staying within its defined role, even when asked about non-medical or other out-of-scope topics.
- **Robustness Testing:** The process of assessing an agent's resilience against adversarial attacks, which is critical for agents that handle sensitive information.

## Apply Role-Based Prompts to Different Domains

### Applying Role-Based Prompts to Different Domains

Let’s explore how to apply this technique with concrete examples across three different domains: coding, data analysis, and creative writing. For each, we'll look at a complete prompt, breaking down how the role, task, format/tone specifications, and included examples work together to guide the AI agent

> **Try it in Udacity AI!**
> Open the Udacity AI interface in the top right corner of the classroom (dialog icon) and try some of these role-based prompts!

**1. Senior Python Developer**

Imagine we need a Python function that calculates the Fibonacci sequence using memoization. We want robust, well-structured code.

**System Prompt (Role):**

```text
You are a Senior Python Developer specializing in efficient algorithms and clean code practices. You write robust, well-documented Python code.  Include type hints for the function signature and return value.  Ensure the code is clean, readable, and follows standard Python conventions (PEP 8).
```

This sets an expectation for quality and style. When working with an LLM’s API, we’ll normally specify a system prompt for general instructions. If using an LLM app like ChatGPT, you typically combine system and user prompts.

**User Prompt (Task & Examples):**

```text
Write a Python function called fibonacci_memoized that takes an integer n as input and returns the n-th Fibonacci number using memoization. The function should handle edge cases like n=0 and n=1.
```

```text
Example:
Q: Write a Python function called reverse_string that takes a string s as input and returns the reversed version of the string.
A: ... (example code would follow)
```

Here the task is clearly defined. Examples provide concrete input/output pairs. This detailed instruction enables agents to create code snippets.

**2. Marketing Data Analyst**

Suppose we have sales data and need a summary of trends and marketing recommendations.

**System Prompt (Role):**

```text
You are a Marketing Data Analyst with extensive experience in consumer product sales. Your goal is to analyze data and provide actionable insights and strategic recommendations for marketing campaigns.
```

This prompts the AI to interpret data through a marketing lens, focusing on aspects relevant to campaigns.

**User Prompt (Task, Data & Example Format):**

```text
Analyze the provided sales data for the 'EcoWidget' product category over the last 12 months. Identify key sales trends, customer demographics (if available in data), and geographical performance variations. Based on this analysis, provide a concise summary of findings (using bullet points) and strategic recommendations for optimizing our next marketing campaign.
SALES DATA: [paste the 12 months of EcoWidget sales data here]
Example of a key finding format:
  Finding: [Describe trend or insight, e.g., "Sales in Region X increased by 15% in Q3."]
Example of a recommendation format:  
  Recommendation: [Suggest an action, e.g., "Increase marketing spend in Region X in Q4 targeting demographic Y."]
```

The task is clearly stated, including the provision of data. The output is structured like a business report with bullet points and actionable insights. We could even provide an example format for the entire document.

**3. Fantasy Author**

Suppose we want the opening scene of a fantasy novel.

**System Prompt (Role):**

```text
You are a Fantasy Author, known for crafting futuristic, atmospheric worlds and flawed characters. Your writing is characterized by stark prose, a focus on realism within the fantasy setting, and a sense of underlying hope. 
```

![Creative Writing Example (System Prompt)](assets/images/l07-creative-system-prompt.png "Creative writing example: the system prompt")

**User Prompt (Task & Details):**

```text
Write the opening line (approximately 30 words) of a new fantasy story. The scene should focus on the protagonist, Zeb, a cynical mercenary, as he stumbles upon a hidden, ancient magical artifact in the ruins beneath a dried-up lake.  
   - Use a third-person perspective.  
   - Emphasize sensory details (dusty stones, dim light).  
   - Hint at the potential danger or unsettling nature of the artifact.
```

Here we provide the task and details like perspective, sensory focus, and foreshadowing.

- Example Output: "Dust swirled in the dim light filtering through cracks in the dead lakebed above as Zeb navigated the ruins. His boot nudged something smooth amidst the rubble—an obsidian shard, radiating a silence colder than stone." Is this a story you would continue reading? If not, you could refine the prompt to get an opening line you do like!

![Creative Writing Example (Output)](assets/images/l07-creative-output.png "Creative writing example: the output")

Applying role-based prompting, combined with clear task definitions, specific format and tone requirements, and well-chosen examples enhances your ability to guide AI agents across domains. This layered approach provides the structure and context for the AI to understand intent and produce outputs that are tailored to your specific needs.

### Conclusion

- **One pattern, any domain:** the same building blocks (role, task, format and tone, examples) work for code, data analysis and creative writing.
- **The role sets the standard:** a Senior Python Developer brings clean, typed, PEP 8 code; a Marketing Data Analyst brings findings and recommendations; a Fantasy Author brings voice and atmosphere.
- **The user prompt does the rest:** a clear task, the data or details it needs, and an example of the expected output.
- **Iterate:** if the output is not what you want, refine the prompt and try again, then check the result against the criteria you set in "Evaluating Agent Personas".

### Summary: Role-Based Prompting

#### Quick Review

| Component | What it does |
|---|---|
| **Role** | Defines the character or specialization for the LLM |
| **Task** | Details the specific task or request posed to the LLM |
| **Output Format** | Describes how the output format should appear to meet expectations |
| **Examples** | Provides context or examples to clarify task requirements |

#### Takeaway

Excellent work completing "Role-Based Prompting"! You have learned the foundational concepts of how to shape and guide an LLM's behavior by giving it a specific persona. This is a critical first step in building more advanced and effective AI agents.

You acquired the following skills:

- You can now define what role-based prompting is and explain why it is a key strategy for creating more targeted and precise AI responses.
- You can identify the essential components of a well-structured prompt, including Role, Task, Context, Output Format, and Examples.
- You can describe several methods for evaluating how well an agent is adhering to its assigned persona, such as using ground truth datasets and consistency checks.
- You can recognize how creating specialized personas is applied across different professional domains, from software development to marketing analysis.

This is the foundation you'll build upon to create your own AI agents. Great job!

## Implementing Role-Based Prompting with Python

### From Actor to Expert: Implementing AI Personas in Python

Have you ever asked an AI for expert advice, only to receive a generic, textbook-style answer? It might be factually correct, but it lacks the insight, tone, and perspective of a true professional. What's the difference between an AI that can simply *recite* information about a topic versus one that can *embody* the expertise of a professional in that field?

The difference lies in how we instruct it. Role-based prompting is a powerful technique for dramatically improving the quality, relevance, and safety of an AI's output in professional contexts.

Let's look at a practical example.

#### Analyzing a Suspicious Email

Imagine we have a potentially malicious email and we want an AI to analyze it.

**The Suspicious Email Text:**

```text
From: SecureBank Support <support-update@secure-bank-net.com>
Subject: Urgent: Your Account Requires Immediate Verification

Dear Valued Customer,
We have detected unusual activity on your account. For your security, you must verify your identity immediately by clicking here: http://secure-bank-net.com/verify-now
Failure to do so within 24 hours will result in account suspension.
Thank you,
SecureBank Team
```

#### Attempt 1: The Generic Assistant

First, let's ask a generic assistant for help without giving it a specific role.

```python
# The generic system prompt
system_prompt_generic = "You are a helpful assistant."

# The user's request with the email data
user_prompt = f"""
Please analyze the following email and tell me if it's safe:
---
{suspicious_email_text}
---
"""

# Calling the model
response = get_completion(system_prompt_generic, user_prompt)
print(response)
```

#### Likely Output:

The model would likely (and correctly) identify this as a phishing attempt. The response would be helpful but generic, something like: *"This email looks like a phishing scam. You shouldn't click the link. It creates a sense of urgency and has a suspicious sender address."*

This is okay, but it lacks professional rigor.

#### Attempt 2: The Cybersecurity Analyst Persona

Now, let's give the AI a proper role with specific instructions on its expertise, tone, and task.

```python
# The detailed, role-based system prompt
system_prompt_analyst = """
You are a senior Cybersecurity Analyst providing a formal threat assessment. Your tone is objective, cautious, and precise.

When analyzing a potential phishing email, do the following:
1.  State your overall assessment clearly (e.g., "High-Confidence Phishing Attempt").
2.  Do not speculate or use casual language.
3.  List the specific red flags you've identified as a bulleted list. For each flag, provide a brief explanation.
4.  Conclude with a clear, actionable recommendation for the end-user.
"""

# We use the same user_prompt as before
response = get_completion(system_prompt_analyst, user_prompt)
print(response)
```

#### Likely Output:

Notice the difference. The output is no longer just a helpful tip; it's a professional analysis.

---

**Assessment:** High-Confidence Phishing Attempt.

**Red Flags Identified:**

- **Sender Address Spoofing:** The sender email `support-update@secure-bank-net.com` uses a subdomain (`support-update`) and a slightly altered domain to impersonate a legitimate entity. Financial institutions rarely use such domains for official communication.
- **Urgency and Threats:** The subject line and body use language designed to create panic ("Urgent," "Immediate Verification," "Failure to do so...will result in account suspension") to rush the user into making a mistake.
- **Suspicious Hyperlink:** The hyperlink text "clicking here" masks the true destination URL, a common tactic to hide a malicious link.

**Recommendation:**

**Do not click any links or reply to this email.** Delete it immediately. If you are concerned about your account, please navigate directly to your bank's official website by typing the address in your browser or use their official mobile app to check your account status.

---

By defining a professional persona and a clear set of instructions, we guided the AI to produce a response that is not only more helpful but also more structured, trustworthy, and safe.

You'll apply this same principle of iterative prompt refinement, practicing how to control an AI's persona down to the details of its personality, expertise, and tone.

::: quiz {id=role-python-q1} Quiz Question
You are writing a Python script to make an AI act as a witty pirate. You have the `system_prompt` string defined:

```python
system_prompt = "You are a witty pirate who speaks in pirate slang."
```

Below is a snippet of Python code that constructs the `messages` list to be sent to the LLM.

```python
user_content = "What is the treasure of Skeleton Island?"

# How should the 'messages' list be constructed?
messages = [
    # --- CHOOSE THE CORRECT OPTION TO GO HERE ---
    
    {"role": "user", "content": user_content}
]
```

**Question:** Which option correctly implements the role-based prompt?

- [x] `{"role": "system", "content": system_prompt}`
- [ ] `{"role": "assistant", "content": system_prompt}`
- [ ] `{"system_prompt": system_prompt}`
- [ ] `{"role": "user", "content": system_prompt}`
:::

## Exercise: Historical Figure Persona

::: warning
Please do not upload sensitive information to workspaces.
:::

::: info Workspace
Open the Udacity workspace for this exercise from the course page (folder: `/workspace/lesson-1-role-based-prompting/exercises/starter`).
:::

### Exercise Introduction: Bringing History to Life with AI Personas

You've learned that giving an AI a specific role can significantly shape its responses. Now, you'll put that into practice in a creative way: by instructing an AI to adopt the persona of a famous historical figure for an interactive Q&A.

**The Challenge: Crafting a Believable Historical Character**

Imagine you want to "interview" Albert Einstein. A simple request to an AI might give you facts about Einstein, or perhaps a very superficial impersonation. But how do you get the AI to respond with a voice that truly *feels* like the historical figure – capturing their likely personality, manner of speaking, contemporary knowledge, and even their characteristic way of explaining ideas?

**Your Mission: Becoming an AI Character Director**

In this exercise you'll act as a director, guiding the AI step-by-step to embody Albert Einstein. You will:

1. Start with basic prompts and observe the AI's initial attempts.
2. Systematically add layers of detail to your prompts, defining **persona-specific attributes** like personality and areas of knowledge.
3. Specify **tone and stylistic elements** to refine the character's voice.
4. Conduct a mock Q&A to test how well the AI maintains the persona.

---

#### Instructions

Follow these steps to complete the exercise in your Udacity classroom workspace:

1. **Open the Notebook:** Launch the "Lesson 1: Role-Based Prompting (Agent Personas) - Historical Figure Interviewer" exercise notebook.
2. **Initial Setup:**
   - Add your API key to the notebook.
3. **Step 1: Plain Prompt**
   - Find the section "1. Plain Prompt".
   - Run the code cell that sends a `control_system_prompt` ("You are a helpful assistant.") and asks the `user_prompt` ("Can you tell me about relativity?").
   - Observe this initial, non-role-playing response. This is your control.
4. **Step 2: Baseline Historical Figure Prompt**
   - Go to section "2. Baseline Historical Figure Prompt".
   - You'll see a `TODO`: `baseline_system_prompt = "**********."`
   - **Your Task:** Change this line to give the AI the basic role of Albert Einstein. For example: `baseline_system_prompt = "You are Albert Einstein."`
   - Run this cell. The same `user_prompt` about relativity will be used.
   - Review the AI's first attempt at portraying Einstein. Use the "Observations" questions in the notebook to guide your thoughts.
5. **Step 3: Define Persona-Specific Attributes**
   - Move to section "3. Define Persona-Specific Attributes".
   - You will find several `TODO` items within the `persona_system_prompt` string, marked with `**********`.
   - **Your Task:** Fill in these attributes for Albert Einstein.
   - Run the cell.
   - Compare this response to the previous one. Note differences based on the "Observations" prompts.
6. **Step 4: Add Tone and Style Specifications**
   - Proceed to section "4. Add Tone and Style Specifications".
   - Find the `TODO` items in the `tone_system_prompt` string.
   - **Your Task:** Add specific details about Einstein's tone and conversational style.
   - Run this cell.
   - Observe how these specifications refine the AI's portrayal.
7. **Step 5: Q&A Session Format**
   - Navigate to section "5. Q&A Session Format".
   - Find the `TODO` in the `user_prompt` for three questions.
   - **Your Task:** Write three questions to ask "Albert Einstein," keeping in mind the 1950 context.
   - Run the cell.
   - Analyze "Einstein's" answers for consistency, historical appropriateness, and depth.
8. **Step 6: Reflection & Transfer**
   - Go to section "6. Reflection & Transfer".
   - In the markdown cell, find the `TODO` and type your thoughts on which prompt refinement you felt was most effective in creating an authentic persona and why.

### Solution: Walkthrough of Creating the Einstein Persona

This is the solution for the "Historical Figure Persona" exercise, where we crafted prompts to instruct an AI to convincingly adopt the persona of a historical figure.

Let's walk through the solution together.

::: warning
Please do not upload sensitive information to workspaces.
:::

#### 1. Trying a Baseline Historical Figure Prompt

Now, let's try a baseline historical figure prompt. This is where we're going to say, "Hey, why don't you pretend to be Albert Einstein?".

The system prompt for this is very simple:

```python
baseline_system_prompt = "Pretend you're Albert Einstein and answer my questions about your work and life."
```

When we look at the response, on the surface, it seems like it contains the same information as a generic prompt, but the tone and the framing of the response is different. It’s a good first step, but the persona is still thin.

#### 2. Defining Persona-Specific Attributes

So now let's define some persona-specific attributes. Our system prompt is going to start with the baseline prompt from before, and then we're going to add bullet points that ask the AI to adopt these persona characteristics.

```python
# From the solution notebook
persona_system_prompt = """
Pretend you're Albert Einstein...
Adopt these persona characteristics:
- Personality: Curious, humble yet confident, with a sense of wonder.
- Speech style: Use analogies and thought experiments...
- Historical context: Answer as if you are Einstein speaking in 1950...
"""
```

With these new instructions, let's look at the response when we again ask, "Can you tell me about relativity?" If we read the first paragraph, it says: "Ah yes, relativity—a most interesting and I dare say delightful topic... what if they are not absolute at all?" And so that's interesting. We see the response takes on a very different tone than it did before.

#### 3. Adding Tone and Style Specifications

So, let's add some extra specifications for tone and style. We're going to take the prompt from before and just add some more bullet points.

```python
# From the solution notebook, adding to the previous prompt

"Additionally, adhere to these tone and style specifications:
- Tone and style: Speak in a warm, grandfatherly manner... Occasionally make self-deprecating jokes about your hair."
```

Let's see how exactly these new specifications changed the response. If we look at the end of the new output, it says: "And of course, I often joke that I'm merely a humble observer trying to understand the tune of the universe, though I must admit my hair has become quite the wild conductor's wig over the years." Well, there you go. The LLM managed to fit the hair comment in there in the last sentence.

This step-by-step process shows how we can guide the AI to a more specific and believable output. Great work!

### Summary

Fantastic work learning Role-Based Prompting! You've put in the effort and taken a significant step in learning how to guide AI with more precision and creativity.
Through this hands-on experience, you have gained valuable abilities:

* Persona Construction: You can now break down a character into specific attributes—personality, expertise, historical context—that an AI can use to shape its responses.
* Voice Direction: You've practiced instructing an AI on its communication style, including its tone, specific phrasing, and conversational flow.
* Contextual Control: You understand how to provide situational or historical boundaries to make an AI persona more believable and prevent out-of-character statements.
* Iterative Prompt Development: You've experienced the process of starting with a simple role and systematically adding layers of detail to achieve a more specific and convincing outcome.
* Output Evaluation: You've developed an eye for assessing AI-generated text for consistency and authenticity.

Creating believable AI personas is a skill that requires careful thought and precise instruction. You've now seen how you can move beyond simple Q&A and guide an AI to adopt a distinct role.

## Chain-of-Thought and ReACT Prompting

LLMs are fluent text generators, but they struggle with complex problems such as multi-step logic, intricate coding, or anything that needs outside information. They lack proprietary or real-time data, and they are passive: they only respond to input. Two techniques push them toward agentic problem-solving: **Chain-of-Thought (CoT)** and **ReAct** (Reason + Act).

### Why basic LLMs fail

A prompt goes in and an answer comes out of trained knowledge. The video compares this to a brilliant but isolated scholar. They can summarize history, but can't tell you the fastest route across town right now, because they have no live data and can't check a map. Real-world tasks need multiple steps and interaction beyond the model's stored weights.

### Chain-of-Thought

A prompting strategy that makes the model write out intermediate reasoning steps before the final answer.

- **Zero-shot CoT:** add "Let's think step by step" to the prompt.
- **Few-shot CoT:** include examples that show a problem, its step-by-step reasoning and the answer.
- **Example:** to grade a student's math solution, have the model solve it first, then compare its answer with the student's.

### Why it helps

- **Better accuracy** on arithmetic, logic and symbolic reasoning, with fewer errors and fewer hallucinations, like showing your work in math.
- **Interpretability:** you can see how the model reached its answer, which helps debugging and trust. It turns a black box into something you can inspect.

### What's next

ReAct, which adds tool use so the model can act on the outside world, not just reason.

::: takeaway
Guiding how an LLM thinks, step by step and later with tools, turns it from a text generator into a problem-solver.
:::

### Chain-of-Thought and ReAct Prompting: Keys to LLM Reasoning

We all know Large Language Models (LLMs) are fantastic tools for generating and editing text. But if you've tried to get them to solve really complex problems—like multi-step logic puzzles, intricate coding tasks, or tasks requiring external information—you might have hit a wall. This section focuses on developing effective chain-of-thought reasoning and ReAct prompting techniques to improve LLM output quality for technical tasks. We'll cover designing these prompts, iterative reasoning, debugging outputs, the benefits of multi-step reasoning, and applying these to problems.

LLMs, despite being trained on vast data, have limitations: they often lack access to proprietary or real-time information, and fundamentally, they are passive, waiting for your input. This is where we move beyond simple input-output to something more powerful, something more agentic.

We'll examine two powerful techniques that help LLMs tackle complexity: **Chain-of-Thought (CoT)** and **ReAct (Reason + Act)**. Think of these as ways to guide the LLM's thinking process, turning it from a simple text generator into a more capable problem-solver.

We'll explore:

- Why complex tasks are hard for basic LLMs.
- The Chain-of-Thought prompting technique.
- The ReAct framework (Reason + Act).
- How these methods are essential for building more capable AI systems, including AI agents. This is for users of AI tools who want to up their game.

Popular AI chatbots like ChatGPT, Google Gemini, and Claude are built on LLMs. You give them an input (a prompt), and they generate an output based on their training data. This is great for tasks like drafting emails. But, LLMs struggle with real-world problem solving that requires multiple steps and interaction.

Think of it like asking a brilliant, but isolated scholar a question that requires not just deep knowledge but also real-time interaction with the world. Ask them for a summary of history, and they'll nail it. Ask them for the fastest way to get across a city in another country right now, factoring in traffic, and they'll likely fail because they don't have access to live traffic data or the ability to check a map app. Similarly, asking an LLM to solve a complex task without guiding its steps or giving it access to tools is like asking that scholar for a real-time traffic report.

::: quiz {id=cot-react-q1} Quiz Question
You are prompting an AI to solve a classic logic puzzle. The puzzle is:

> "You have three boxes. One is labeled 'APPLES', one is labeled 'ORANGES', and one is labeled 'APPLES AND ORANGES'. You know that **every single label is on the wrong box.** You are allowed to pick only one fruit from one box (without looking inside) to figure out the correct labels for all three. Which box should you pick from?"

To solve this, the AI needs to reason through the problem internally. It doesn't need an external tool, but it does need a logical plan.

**Question:** What is the **first critical reasoning step** the AI must take, which a Chain-of-Thought prompt would help it deduce?

- [ ] Assume the labels might be correct and ask for clarification.
- [ ] Pick a fruit from the 'APPLES' box first, because it seems like the simplest choice.
- [x] Reason that the box labeled 'APPLES AND ORANGES' must contain either only apples or only oranges.
- [ ] Generate a list of all possible combinations of labels and boxes.
:::

#### Terms

- **Chain-of-Thought (CoT):** A powerful prompting technique that helps Large Language Models (LLMs) tackle complexity by guiding their thinking process, turning them from simple text generators into more capable problem-solvers.
- **ReAct (Reason + Act):** A framework that, alongside Chain-of-Thought, is a powerful technique to help LLMs handle complex tasks that require multiple steps or interaction with external information.

### Chain-of-Thought Prompting

Chain-of-Thought (CoT) is a prompting strategy that encourages the LLM to generate a sequence of intermediate reasoning steps before providing the final answer. Instead of just asking for the answer, you guide the model to think in steps.

**Types of CoT:**

- **Zero-shot CoT:** The simplest form. Include instructions like `Let's think step by step` in your prompt.
- **Few-shot CoT:** More complex. Provide examples in the prompt showing the problem, the step-by-step reasoning, and the final answer. For instance, if you want the model to evaluate a student's math solution, instead of just asking if it's correct, you can tell the model:

```text
Is ‘3 + 1 = 4’ correct? Work out your own solution step by step then compare it to mine.
```

- This explicit instruction to perform intermediate steps helps the model reason and often leads to a more accurate assessment.

**Benefits of Chain-of-Thought Prompting:**

- **Improved Performance:** CoT significantly boosts LLM effectiveness on reasoning tasks (arithmetic, commonsense, symbolic reasoning), reducing errors and hallucinations. By breaking down the problem, the model is less likely to make mistakes.
- **Interpretability & Trust:** It makes the LLM's reasoning process transparent. You can see the steps the model took, which is invaluable for understanding how it solved the problem, important for debugging and building trust. It moves the LLM's process from a "static black box" to an inspectable one.
- Various advanced CoT variants exist, such as Self-Consistency Prompting, which samples multiple CoT paths and chooses the most frequent answer

::: response {id=cot-coffee-prompt} Free Response
Imagine you are building a "Helpful Home AI" assistant. A user gives it the following problem:

> "My coffee machine has power, but when I press the brew button, nothing happens. No water is being pulled from the reservoir."

A standard prompt might give a generic or disorganized answer. Your goal is to use the Chain-of-Thought technique to guide the AI to produce a logical, step-by-step troubleshooting guide. In the space below, write a complete **Chain-of-Thought prompt** that solves this problem.

Your prompt should instruct the AI to:

1. Think step-by-step to diagnose the issue.
2. Start with the simplest and most common potential problems first.
3. Generate a numbered list of troubleshooting steps for the user to follow.
:::

::: details Things to think about
A well-structured prompt for this task would look something like this:

> You are a helpful home appliance troubleshooting assistant. A user has a problem with their coffee machine.
>
> Think step by step to create a logical troubleshooting guide. Start with the most common and simplest solutions first, then move to more complex ones. Formulate your final response as a numbered list of questions or checks for the user.
>
> Here is the user's problem: "My coffee machine has power, but when I press the brew button, nothing happens. No water is being pulled from the reservoir."
>
> Let's think step by step.
>
> 1. The machine has power, but the pump isn't engaging.
> 2. The most common issue is that the machine doesn't detect the water reservoir correctly.
> 3. The next most common issue is a blockage or air lock in the water line.
> 4. A less common issue is a clogged needle where the coffee pod sits.
> 5. Finally, it could be a pump failure, which is a mechanical fault.
>
> Based on this reasoning, I will create a guide for the user.

*(This example demonstrates a prompt that encourages the AI to reason internally before generating the final, user-facing list of steps.)*
:::

📚Research Papers on CoT:

- [https://arxiv.org/abs/2205.11916](https://arxiv.org/abs/2205.11916)
- [https://arxiv.org/abs/2201.11903](https://arxiv.org/abs/2201.11903)

## 11.1 ReACT Prompting

### Introducing ReAct (Reason + Act) Prompting

CoT is great for internal reasoning, but what if the task requires getting new information or interacting with the outside world? That's where ReAct comes in. ReAct stands for Reason + Act. It's a prompting technique that synergizes reasoning and acting in LLMs by interleaving thought steps with action steps.

The core of ReAct is its iterative loop: Thought, Action, Observation.

1. **Thought:** The model internally reasons and plans the next specific step required to progress towards the overall task goal. It analyzes the situation, figures out necessary steps, and decides on an action.
2. **Action:** Based on its plan, the model specifies using an external tool (like web search, calculator, API) with provided parameters. An orchestrator program then executes this tool. Tools are functions or services the agent can invoke.
3. **Observation:** The model receives the results or feedback from the executed action (e.g., search results, calculator answer, confirmation of an email sent). This new information feeds into the next Thought. This observation, sometimes referred to as information from the "environment" if it's from the outside world like a weather report, then feeds back into the model's next Thought, allowing it to refine its plan or take subsequent actions.

This cycle repeats until the agent specifies an action to return the final result. Each step is normally recorded in the message history of the chat.

### Designing ReAct Prompts

Designing ReAct prompts involves structuring the interaction to elicit this specific sequence.

1. You explicitly instruct the model to output `Thought:`, `Action:` (often requiring a specific format like JSON that your system can parse to call the tool), and then feed the `Observation:` back to it after the tool executes. All messages to and from the LLM are stored in the message history, so the LLM will base the next thought on all previous thoughts, actions, and observations. The orchestrator handles calling the LLM, storing the message list, and calling the tool specified in the action step. The LLM, via the orchestrator, triggers the end of the loop by calling a certain tool, for instance, one for providing the final answer.
2. **Example Interaction:**
   - **System Prompt:** "You are a helpful assistant with access to the tool get_weather and final_answer. Respond with Thought:
   - **User Prompt:** "What is the weather today?"
   - **Assistant:** Thought: I need to get the weather Action: get_weather
   - **User (from the tool call):** Observation: Sunny and 30 degrees
   - **Assistant:** Thought: I will return the final weather of Sunny and 30 Action: final_answer("sunny and 30")

In this case, the ReAct agent goes through the loop twice. The first time it calls `get_weather`. The second time it returns the result using `final_answer`, signaling loop termination. Getting the LLM to respond in exactly this order and format is about prompt engineering, namely clear instructions and examples in the system prompt.

### ReAct Agents in Action

ReAct has shown impressive results across various tasks, particularly those requiring interaction with dynamic environments or accessing up-to-date information. Examples include:

- **Question Answering and Fact Verification:** Using a tool like a Wikipedia API, a ReAct agent can search for information (Action), read search results (Observation), and use that to reason (Thought) and answer questions, overcoming issues like hallucination.
- **Interactive Decision Making:** In environments like text-based games or web navigation, ReAct agents can reason about goals, take actions (move, click), and observe the environment's response, allowing them to plan and adapt effectively.

### Examples

Let's take a look at some ReACT prompt examples

#### Financial Analyst Agent

This prompt not only tells the AI its role but also explicitly teaches it the `THINK/ACT` cycle and what tools it has available.

**Scenario:** An AI assistant for a financial analyst needs to gather data about stocks and news.

**The ReAct System Prompt:**

```text
You are a diligent financial analyst assistant. You will help users by gathering and comparing stock information and recent news.

To do this, you will use a step-by-step reasoning process. At each step, you will respond with a single `THINK/ACT` message in the following format:

THINK: First, you will reason about the user's request and figure out the next logical step to take. You will formulate a plan to gather the necessary information. After you have all the information, you will reason about how to construct the final answer.

ACT: Based on your thought process, you will call ONE of the available tools to take the next step. If you have gathered all the necessary information and are ready to provide the final answer, use the `final_answer` tool.

---
## Available Tools

Here are the tools you can use:

1.  **get_stock_quote(ticker: str)**
    * Use this to get the latest stock information for a given ticker symbol.
    * Example: `get_stock_quote(ticker="$MC")`

2.  **search_financial_news(company_name: str)**
    * Use this to search for recent financial news articles about a specific company.
    * Example: `search_financial_news(company_name="MegaCorp")`

3.  **final_answer(summary: str)**
    * Use this tool ONLY when you have all the information needed to respond to the user's request.
    * Example: `final_answer(summary="MegaCorp's P/E ratio is 25.4.")`

---
## Example Interaction

Here is an example of how you should respond.

**User:** Compare the current P/E ratio of MegaCorp ($MC) to its main competitor, Innovate Inc ($II). Is there any recent news that might affect MegaCorp's stock price?

**AI Assistant:**
THINK: I need to answer two questions: one about P/E ratios and one about news. I will start by getting the P/E ratio for the first stock, MegaCorp.
ACT: get_stock_quote(ticker="$MC")

**(After this, the system would provide an `OBSERVATION` with the result of the tool call, and the AI would continue with its next `THINK/ACT` step.)**
```

This detailed prompt serves as a blueprint for an agent. It clearly defines its persona, the reasoning process it must follow, the tools it can use, and a clear example of how to begin its task.

> **Hey! That's a lot of text in my code!**
>
> ReACT (and agent) prompts are often long. It's not unusual for them to contain paragraphs of text and multiple parts.

#### Life Sciences Research Assistant

**Scenario:** An AI research assistant helps a scientist find and analyze information about clinical trials. The agent needs to search for relevant trials and then extract specific details from the results.

**The ReAct System Prompt:**

```text
You are an AI research assistant specializing in clinical trial data. Your goal is to help scientists find and understand information about ongoing and completed trials.

You must use a step-by-step reasoning process. For each step, you will respond with a single `THINK/ACT` message in the following format:

THINK: You will first reason about the user's research query. Break down the request into a logical sequence of steps to find the information. After you have gathered all the necessary data, you will reason about how to synthesize it into a clear and concise summary.

ACT: Based on your thought process, you will call ONE of the available tools. When you have all the information needed to fully answer the user's query, you must use the `final_answer` tool.

---
## Available Tools

1.  **search_clinical_trials(search_query: str)**
    * Use this tool to search a clinical trial database for trials matching a query (e.g., a protein target, a drug name). This returns a list of trial IDs and their phases.
    * Example: `search_clinical_trials(search_query="EGFR target")`

2.  **get_trial_details(trial_id: str)**
    * Use this tool to get detailed information about a single trial using its specific trial ID. This includes information like the trial's primary endpoint.
    * Example: `get_trial_details(trial_id="NCT12345")`

3.  **final_answer(summary: str)**
    * Use this tool ONLY when you have gathered all the information needed to respond to the user's request.
    * Example: `final_answer(summary="Trial NCT12345 is a Phase 2 trial.")`

---
## Example Interaction

Here is an example of how you should respond to a user's request.

**User:** Find recent clinical trials for drugs that target the EGFR protein. For any Phase 3 trials you find, what were their primary endpoints?

**AI Assistant:**
THINK: The user wants to find Phase 3 trials for drugs targeting EGFR and their primary endpoints. My first step is to search for all trials related to the EGFR target to see what is available.
ACT: search_clinical_trials(search_query="EGFR target")

**(System provides an `OBSERVATION` with a list of trials, e.g., "[('NCT12345', 'Phase 2'), ('NCT67890', 'Phase 3')]". The AI would then continue its reasoning to get the details for the Phase 3 trial.)**
```

This example shows how a complex research query can be broken down into a logical sequence of actions using the ReAct framework.

## 11.2 Quiz: Chain-of-Thought and ReAct

::: quiz {id=l112-1} Question 1 of 4
An AI project manager assistant is given the following problem:

> "Our product launch is behind schedule because the user interface (UI) design is delayed. Create a plan to get us back on track."

To solve this, the AI needs to generate a multi-step recovery plan. It cannot just give generic advice; it must analyze the situation and create a sequence of concrete actions.

**Question:**

How do the concepts of **Agentic AI**, **ReAct/CoT Prompts**, and **Reasoning/Planning** all work together to produce this plan?

- [ ] The agent's Plan is to use a ReAct/CoT Prompt to Reason about the problem.
- [ ] Reasoning and Planning are advanced types of AI Agents that are activated by prompts.
- [x] The AI Agent uses a ReAct/CoT Prompt to structure its Reasoning (e.g., 'The UI is a bottleneck') and then generate a Plan (a sequence of recovery steps).
- [ ] A ReAct/CoT Prompt is a type of Plan that tells the AI Agent what to do.
:::

::: quiz {id=l112-2-1} Question 2 of 4
Match the prompting techniques with their descriptions:

**Encourages multi-step reasoning**

- [ ] Few-shot CoT
- [ ] Agent-based prompting
- [x] Chain-of-Thought prompting
- [ ] ReAct prompting
- [ ] Direct querying
- [ ] Information retrieval
- [ ] Zero-shot CoT
:::

::: quiz {id=l112-2-2} Question 2 of 4
Match the prompting techniques with their descriptions:

**Combines reasoning with external actions**

- [ ] Few-shot CoT
- [ ] Agent-based prompting
- [ ] Chain-of-Thought prompting
- [x] ReAct prompting
- [ ] Direct querying
- [ ] Information retrieval
- [ ] Zero-shot CoT
:::

::: quiz {id=l112-2-3} Question 2 of 4
Match the prompting techniques with their descriptions:

**Utilizes examples to showcase problem-solving steps**

- [x] Few-shot CoT
- [ ] Agent-based prompting
- [ ] Chain-of-Thought prompting
- [ ] ReAct prompting
- [ ] Direct querying
- [ ] Information retrieval
- [ ] Zero-shot CoT
:::

::: quiz {id=l112-2-4} Question 2 of 4
Match the prompting techniques with their descriptions:

**Instructs model to think without prior examples**

- [ ] Few-shot CoT
- [ ] Agent-based prompting
- [ ] Chain-of-Thought prompting
- [ ] ReAct prompting
- [ ] Direct querying
- [ ] Information retrieval
- [x] Zero-shot CoT
:::

::: quiz {id=l112-3} Question 3 of 4
What are some key benefits of using Chain-of-Thought (CoT) prompting in large language models?

- [ ] CoT prompting eliminates the need for supervision in reasoning tasks.
- [x] CoT prompting improves model's reasoning capabilities, leading to fewer errors.
- [x] CoT prompting increases transparency, allowing users to inspect reasoning processes.
- [ ] CoT prompting allows for automation in generating examples and solutions.
:::

::: quiz {id=l112-4} Question 4 of 4
Which of the following statements accurately describe key aspects of ReAct prompting?

- [ ] ReAct only focuses on internal reasoning without any external actions.
- [x] ReAct incorporates a cycle of Thought, Action, and Observation.
- [x] ReAct allows models to retrieve new information from external tools when required.
- [x] ReAct prompts facilitate learning from past actions and adapting strategies.
:::

## 11.3 Summary / Congratulations!

### 🏆 Congratulations on Powering Up AI with Reasoning and Action! 🏆

Excellent work completing Chain-of-Thought (CoT) and ReAct Prompting! You've invested your time and effort in learning some advanced methods for interacting with Large Language Models.

You've gained some very valuable skills:

- **Structured Reasoning with CoT:** You can now craft prompts that encourage LLMs to break down complicated problems into manageable steps, showing their work and improving the accuracy of their outputs.
- **Implementing the ReAct Pattern:** You have a working knowledge of the THINK-ACT-OBSERVE loop and how to design system prompts that define available tools and guide an LLM to use them for dynamic information gathering and problem-solving.

Working with CoT and ReAct requires careful thought and well-structured prompts. You learned to make AI not just generate text, but to perform more methodical reasoning.

## Chain-of-Thought and ReACT Prompting with Python

## 12.1 Chain-of-Thought and ReACT Prompting with Python

### Introduction

The lecture’s main goal is to show the difference between AI that analyzes the information you provide and an AI agent that can gather more information using tools.

![Implementing reasoning and planning: understanding CoT, ReAct and Python](assets/images/l07-implementing-reasoning-planning.png "Implementing Reasoning & Planning: understanding CoT, ReAct and Python")

#### 1. All data upfront

You give the AI the patient’s symptoms, history, lab results, and vitals in one prompt. It analyzes that information and produces an answer.

The lecture uses a Chain-of-Thought (CoT) prompt to encourage structured analysis. However, if information is missing, this workflow can only identify the gap or suggest what is needed—it does not retrieve it automatically.

#### 2. ReAct: reasoning connected to actions

A ReAct agent receives the task and a set of available tools. It can assess the information, request a tool, receive the result, and decide what to do next.

In the example:

1. The agent receives “persistent cough and fatigue.”
2. It requests a CBC test through a tool.
3. The application executes the tool and returns the result.
4. The agent uses that result to choose its next action: request a chest X-ray.

The lecture stops before the X-ray result, so no final diagnosis is established.

#### 3. Where reasoning, planning, and Python fit

- **Reasoning:** Interpret the available information and identify gaps.
- **Planning:** Choose the next useful action.
- **Python:** Execute the requested tool and return its result to the model.

The key lesson is that ReAct creates a feedback loop: assess → act → observe → reassess. The agent can update its next step as new information arrives, instead of relying entirely on a single prepared prompt.

### Implementing Reasoning and Planning in Python

What's the best way to get a great answer from an AI? A common assumption is that you should just give it more data—the more context, the better the response. But what if the best way is to teach the AI how to *find and process* information for itself?

**Scenario:** A patient presents with a persistent cough and fatigue. Our goal is to determine the likely cause.

#### Approach 1: The "All Data Upfront" CoT Method

One way to solve this is to give the AI a single, large prompt containing all the information we have about the patient and ask it to reason through the data.

```python
system_prompt_cot = """
You are a diagnostic physician. Think step by step, correlating the symptoms with the provided patient data to form a differential diagnosis. Explain your reasoning.
"""

user_prompt_with_data = """
A patient presents with a persistent cough and fatigue.

Here is their patient chart:
- Age: 45
- History: Non-smoker, works indoors as an accountant. No recent travel.
- Lab Results: White blood cell count is slightly elevated.
- Vitals: Temperature is normal.

Based on all this information, what is the likely diagnosis?
"""

# response = get_completion(system_prompt_cot, user_prompt_with_data)
# print(response)
```

This is a **Chain-of-Thought** approach. We provide all the context and ask the model to "think step by step" to connect the dots. It's powerful, but it has a key limitation: it's static. What if we didn't have the lab results yet? We wouldn't be able to run the prompt.

---

#### Approach 2: The Agentic ReAct Method

A more dynamic and powerful approach is to build an agent that can decide what information it needs and then go get it using tools. This is the **ReAct** framework in action.

Instead of one big prompt, we give the agent a role and access to tools.

**Available Tools:**

- `order_lab_test(test_name: str)`
- `check_patient_history(record_id: str)`
- `final_answer(diagnosis: str, reasoning: str)`

Now, watch how the interaction unfolds turn-by-turn:

**Interaction Turn 1**

- **User:** "A patient presents with a persistent cough and fatigue."
- **AI Assistant Response:**

```text
THINK: The symptoms 'cough' and 'fatigue' are non-specific. I need more information to form a hypothesis. I will start by ordering a standard blood panel (CBC) to check for signs of infection or other abnormalities.
ACT: order_lab_test(test_name="CBC")
```

The system runs the `order_lab_test` tool and provides the result back to the agent.

**Interaction Turn 2**

- **System Observation:** `RESULTS: White blood cell count elevated.`
- **AI Assistant Response:**

```text
THINK: The elevated white blood cell count suggests an underlying infection is likely. Given the respiratory symptom (cough), I should now investigate the lungs. I will order a chest X-ray.
ACT: order_lab_test(test_name="Chest X-Ray")
```

Notice the difference. The ReAct agent is not passively analyzing a data file. It is actively participating in a diagnostic *process*, deciding what information is relevant at each step.

![Reasoning and planning: from a single prompt to a tool-using agent](assets/images/l07-reasoning-planning.png "Reasoning & Planning: from a single prompt to a tool-using agent")

## 12.2 Crafting ReACT Prompts in Python

### How to Craft the ReAct System Prompt

When using the ReACT technique, you'll need to create a comprehensive system prompt that teaches an AI agent how to use the ReAct framework. This is the most important part of building a ReAct agent, as this single prompt sets the rules, defines the tools, and teaches the AI how to "think."

Let's break down how to build such a prompt.

**Scenario:** We need an AI agent to help a logistics coordinator track a delayed shipment.

A good ReAct system prompt has four key parts:

1. **The Role and Goal:** Who is the agent? What is its purpose?
2. **The `THINK/ACT` Instruction:** How must the agent format its reasoning and actions?
3. **The Tool Definitions:** What tools can the agent use, and how do they work?
4. **A Complete Example:** A full example of a multi-turn interaction.

Let's build the prompt piece by piece.

#### 1. Define the Role and Goal

We start by telling the agent its identity and overall mission.

```text
You are a Supply Chain Logistics Coordinator. Your goal is to diagnose shipment delays by gathering information from different systems.
```

#### 2. Explain the THINK/ACT Cycle

Next, we give it explicit instructions on how to structure its response. This is the core of the ReAct framework.

```text
You must use a step-by-step reasoning process. For each step, respond with a single THINK/ACT message.

THINK: First, you will reason about the problem and determine the next logical action to take.
ACT: Based on your thought process, you will call ONE of the available tools.
```

#### 3. Define the Available Tools

You must clearly list every tool the agent can use. For each tool, you must provide its name, its parameters, a short description, and an example of its input (`ACT`) and output (`OBSERVE`).

```text
---
## Available Tools

1.  **get_shipment_status(tracking_id: str)**
    * Use this to get the last known location and status of a shipment.
    * Example Input: `ACT: get_shipment_status(tracking_id="XYZ123")`
    * Example Output: `OBSERVE: {"status": "Delayed", "location": "Chicago Rail Yard"}`

2.  **check_facility_alerts(facility_name: str)**
    * Use this to check for operational alerts (e.g., weather delays, closures) at a specific facility.
    * Example Input: `ACT: check_facility_alerts(facility_name="Chicago Rail Yard")`
    * Example Output: `OBSERVE: {"alert": "Severe Weather Alert: All operations suspended."}`

3.  **final_answer(summary: str)**
    * Use this tool ONLY when you have diagnosed the problem and can provide a complete summary.
    * Example Input: `ACT: final_answer(summary="Shipment XYZ123 is delayed in Chicago due to a severe weather-related closure at the rail yard.")`
```

#### 4. Provide a Complete Example Interaction

Finally, you put it all together by showing the agent a complete, multi-step example of how to use these components to solve a problem. This few-shot example is often the most effective way for the agent to learn the pattern.

```text
---
## Example

**User:** Find out why shipment XYZ123 is delayed.

**AI Assistant:**
THINK: I need to find out why shipment XYZ123 is delayed. My first step is to get the current status and location of the shipment using the `get_shipment_status` tool.
ACT: get_shipment_status(tracking_id="XYZ123")

**(System provides `OBSERVE: {"status": "Delayed", "location": "Chicago Rail Yard"}` and the AI continues...)**
```

When you combine all four of these parts, you get a system prompt that gives the AI everything it needs to begin its task.

## 12.3 Exercise: COT Prompting

### Exercise: Demand-Spike Detective, Part I

#### The Problem

In this exercise, You'll act as a Retail Demand Analyst and your mission is to figure out why a specific product had a sudden, unexpected sales spike. To do this, you will provide the AI with several different datasets at once: sales figures, promotion schedules, weather reports, and even competitor pricing data.

Your challenge will be to craft a Chain-of-Thought prompt that effectively guides the LLM to sift through all this information, identify the correct sales spike, and form a logical hypothesis about its cause. This will test the limits of the CoT approach and set the stage for our next exercise, where we'll explore a more dynamic method.

#### Prerequisites

To complete this exercise, you will need:

- Access to the Udacity workspace environment.
- Your Vocareum OpenAI API key.
- A basic understanding of Python and how to run cells in a Jupyter Notebook.

#### Instructions

Follow these step-by-step instructions to complete the exercise in the workspace below.

1. **Open the Notebook:** In the file explorer, navigate to the correct notebook for this exercise and open it: `/workspace/chain-of-thought-and-react-prompting/exercises/concept1-chain-of-thoughts/starter/lesson-2-chain-of-thought-and-react-prompting-part-i.ipynb`
2. **Initial Setup & API Key:**
   - Run the first few cells to import the necessary libraries and helper functions.
   - In the cell for the OpenAI client setup, add your API key where indicated by the `TODO`.
3. **Review the Data:**
   - Run the cells under the "A Closer Look at the Data" section.
   - Take a moment to familiarize yourself with the four different data sources (`sales_df`, `promotions_df`, `weather_df`, `competitor_pricing_df`). Manually look through the data and the plots to see if you can spot the sales spike and any potential causes yourself. This will help you evaluate the AI's performance later.
4. **Craft a Simple CoT Prompt:**
   - Navigate to the section "2. Crafting a Simple CoT Prompt".
   - You will find a `TODO` item within the `system_prompt_explicit_cot` variable.
   - **Your Task:** Modify this line to create your first CoT prompt. Your prompt should instruct the AI to act as a "meticulous Retail Demand Analyst" and to "Think step by step" to analyze the provided data and hypothesize the causes for any sales spikes.
5. **Craft a More Developed CoT Prompt:**
   - Proceed to the section "3. Crafting a More Developed CoT Prompt". Here, we want to guide the AI more explicitly and ask for a structured output.
   - Find the `TODO` for the `user_prompt_developed_cot` variable.
   - **Your Task:** Write a more detailed user prompt that gives the AI a specific sequence of steps to follow in its analysis. Your instructions should ask it to:
     - Find all sales spikes for each product.
     - For each spike, identify the date, the sales increase, and the possible causes by looking at all the different data sources.
     - Start its response with the structured analysis and conclude by identifying the single largest spike in a specific JSON format (the format is provided in the notebook).
6. **Run and Reflect:**
   - Execute the final cells to send your developed prompt to the AI and parse the response.
   - Review the AI's final analysis and the structured JSON output. Did it correctly identify the spike for "Product 5" on January 12th? How good was its reasoning?

#### Shutting Down Your Workspace

Shutting down your workspace may take a minute. You won't be able to reload your workspace during this time.

### Notebook Walkthrough

In this hands-on exercise, you will guide an LLM to explain an unexpected sales spike.

**Outline:**

- Setup
- Understand sales data, promotional calendars, etc.
- Craft a Simple CoT prompt
- Craft a More Developed CoT Prompt

#### 1. Setup

First, let's set up our environment. Here we're going to import the `lesson_2_lib` file. It has some helper classes and helper functions that we're going to use throughout this notebook. It also has our synthetic sales data, synthetic promotion data, weather data, et cetera. The file is in this session's Resources.

```python
# Import necessary libraries
# No changes needed in this cell

import os

import pandas as pd
from IPython.display import Markdown, display
from lesson_2_lib import (
    # Helpers
    OpenAIModels,
    display_responses,
    # Synthetic data
    get_competitor_pricing_data,
    get_completion,
    get_promotions_data,
    get_sales_data,
    get_weather_data,
)
from openai import OpenAI

MODEL = OpenAIModels.GPT_41_NANO
```

Moving on, we're going to set up OpenAI to use the Vocareum API endpoint.

```python
# If using the Vocareum API endpoint
# No changes needed in this cell
# TODO: Fill in the missing parts marked with **********

client = OpenAI(
    base_url="https://openai.vocareum.com/v1",
    # Uncomment one of the following
    # api_key="*********",  # <--- TODO: Fill in your Vocareum API key here
    # api_key=os.getenv(
    #     "OPENAI_API_KEY"
    # ),  # <-- Alternately, set as an environment variable (more secure)
)

# If using OpenAI's API endpoint
# client = OpenAI()
```

#### 2. Understand sales data, promotional calendars, etc.

Working with AI agents is still a data problem at its core. The first steps are always to understand the business goals (explain the cause for the spike), and then also understand the underlying data.

We have this function called `get_sales_data`. What it returns is a list of dictionaries, and the dictionaries have keys for the date, the product ID, name, quantity, and revenue.

::: tabs
```python title="Code"
# View the data
get_sales_data()[:3]
```
```text title="Output"
[{'date': datetime.date(2024, 1, 10),
  'product_id': 'P001',
  'product_name': 'Product 1',
  'quantity': 255,
  'revenue': 15547.35},
 {'date': datetime.date(2024, 1, 10),
  'product_id': 'P002',
  'product_name': 'Product 2',
  'quantity': 65,
  'revenue': 2297.1},
 {'date': datetime.date(2024, 1, 10),
  'product_id': 'P003',
  'product_name': 'Product 3',
  'quantity': 90,
  'revenue': 7301.7}]
```
:::

What we're going to do is load the sales data, load the promotions data, all of them have the same structure, and we're going to convert them into pandas data frames.

```python
# Load the simulated data
# No changes needed in this cell

pd.set_option("display.max_columns", None)
pd.set_option("display.max_rows", None)
pd.set_option("display.width", None)
pd.set_option("display.max_colwidth", None)

sales_data = get_sales_data()
sales_df = pd.DataFrame(sales_data)

promotions_data = get_promotions_data()
promotions_df = pd.DataFrame(promotions_data)

weather_data = get_weather_data()
weather_df = pd.DataFrame(weather_data)

competitor_pricing_data = get_competitor_pricing_data()
competitor_pricing_df = pd.DataFrame(competitor_pricing_data)
```

Here's the first pandas data frame. This is a list of products, the amount we've sold on each day, and the revenue.

```python
# Show the sales data
# No changes needed in this cell

sales_df = sales_df.sort_values(by=["product_id", "date"]).reset_index(drop=True)
sales_df
```

|  | date | product_id | product_name | quantity | revenue |
|---|---|---|---|---|---|
| 0 | 2024-01-10 | P001 | Product 1 | 255 | 15547.35 |
| 1 | 2024-01-11 | P001 | Product 1 | 235 | 14327.95 |
| 2 | 2024-01-12 | P001 | Product 1 | 310 | 18900.70 |
| 3 | 2024-01-13 | P001 | Product 1 | 302 | 18412.94 |
| 4 | 2024-01-14 | P001 | Product 1 | 305 | 18595.85 |
| 5 | 2024-01-15 | P001 | Product 1 | 301 | 18351.97 |
| 6 | 2024-01-16 | P001 | Product 1 | 226 | 13779.22 |
| 7 | 2024-01-10 | P002 | Product 2 | 65 | 2297.10 |
| 8 | 2024-01-11 | P002 | Product 2 | 86 | 3039.24 |
| 9 | 2024-01-12 | P002 | Product 2 | 80 | 2827.20 |
| 10 | 2024-01-13 | P002 | Product 2 | 68 | 2403.12 |
| 11 | 2024-01-14 | P002 | Product 2 | 84 | 2968.56 |
| 12 | 2024-01-15 | P002 | Product 2 | 73 | 2579.82 |
| 13 | 2024-01-16 | P002 | Product 2 | 80 | 2827.20 |
| 14 | 2024-01-10 | P003 | Product 3 | 90 | 7301.70 |
| 15 | 2024-01-11 | P003 | Product 3 | 79 | 6409.27 |
| 16 | 2024-01-12 | P003 | Product 3 | 108 | 8762.04 |
| 17 | 2024-01-13 | P003 | Product 3 | 96 | 7788.48 |
| 18 | 2024-01-14 | P003 | Product 3 | 99 | 8031.87 |
| 19 | 2024-01-15 | P003 | Product 3 | 89 | 7220.57 |
| 20 | 2024-01-16 | P003 | Product 3 | 83 | 6733.79 |
| 21 | 2024-01-10 | P004 | Product 4 | 171 | 8296.92 |
| 22 | 2024-01-11 | P004 | Product 4 | 145 | 7035.40 |
| 23 | 2024-01-12 | P004 | Product 4 | 143 | 6938.36 |
| 24 | 2024-01-13 | P004 | Product 4 | 130 | 6307.60 |
| 25 | 2024-01-14 | P004 | Product 4 | 167 | 8102.84 |
| 26 | 2024-01-15 | P004 | Product 4 | 126 | 6113.52 |
| 27 | 2024-01-16 | P004 | Product 4 | 175 | 8491.00 |
| 28 | 2024-01-10 | P005 | Product 5 | 96 | 2587.20 |
| 29 | 2024-01-11 | P005 | Product 5 | 114 | 3072.30 |
| 30 | 2024-01-12 | P005 | Product 5 | 342 | 9216.90 |
| 31 | 2024-01-13 | P005 | Product 5 | 103 | 2775.85 |
| 32 | 2024-01-14 | P005 | Product 5 | 104 | 2802.80 |
| 33 | 2024-01-15 | P005 | Product 5 | 100 | 2695.00 |
| 34 | 2024-01-16 | P005 | Product 5 | 125 | 3368.75 |

Here's a list of our promotions. We just have two of them, the weekend special, and the flash sale.

```python
# Show the promotions data
# No changes needed in this cell

promotions_df
```

|  | promotion_id | name | discount | products | start_date | end_date |
|---|---|---|---|---|---|---|
| 0 | PROMO001 | Weekend Special | 10% off | [P002] | 2024-01-12 | 2024-01-14 |
| 1 | PROMO002 | Flash Sale | 15% off | [P001, P003, P005] | 2024-01-15 | 2024-01-16 |

Here's the weather data for the dates in question. We have for each of the dates, the temperature, and also the weather conditions.

```python
# Show the weather data
# No changes needed in this cell

weather_df.head()
```

|  | date | temperature | conditions |
|---|---|---|---|
| 0 | 2024-01-10 | {'fahrenheit': 23.4, 'celsius': -4.8} | {'main': 'Clear', 'precipitation': 'None', 'precipitation_amount': 0, 'special_event': None} |
| 1 | 2024-01-11 | {'fahrenheit': 39.3, 'celsius': 4.1} | {'main': 'Clear', 'precipitation': 'None', 'precipitation_amount': 0, 'special_event': None} |
| 2 | 2024-01-12 | {'fahrenheit': 41.1, 'celsius': 5.1} | {'main': 'Heavy Rain', 'precipitation': 'Heavy Rain', 'precipitation_amount': 2.7, 'special_event': 'Flood Warning'} |
| 3 | 2024-01-13 | {'fahrenheit': 27.2, 'celsius': -2.6} | {'main': 'Clear', 'precipitation': 'None', 'precipitation_amount': 0, 'special_event': None} |
| 4 | 2024-01-14 | {'fahrenheit': 22.9, 'celsius': -5.1} | {'main': 'Clear', 'precipitation': 'None', 'precipitation_amount': 0, 'special_event': None} |

Next, we have the competitor pricing. For each of the dates, we have the competitors comparable products, we have whether or not the competitors had sales, and also the prices for each of the competitors.

```python
# Show the competitor pricing data
# No changes needed in this cell

competitor_pricing_df
```

|  | product | date | our_price | competitor_sales | competitor_a_price | competitor_b_price | competitor_c_price |
|---|---|---|---|---|---|---|---|
| 0 | Product 1 | 2024-01-10 | 60.97 | {} | 56.88 | 62.23 | 51.80 |
| 1 | Product 1 | 2024-01-11 | 60.97 | {} | 59.65 | 72.47 | 72.50 |
| 2 | Product 1 | 2024-01-12 | 60.97 | {'CompetitorB': {'original_price': 69.24, 'sale_price': 50.55, 'discount_percentage': 27}, 'CompetitorC': {'original_price': 49.92, 'sale_price': 39.44, 'discount_percentage': 21}} | 65.40 | 50.55 | 39.44 |
| 3 | Product 1 | 2024-01-13 | 60.97 | {} | 72.13 | 57.54 | 51.10 |
| 4 | Product 1 | 2024-01-14 | 60.97 | {} | 72.36 | 70.04 | 61.04 |
| 5 | Product 1 | 2024-01-15 | 60.97 | {} | 68.52 | 59.63 | 73.03 |
| 6 | Product 1 | 2024-01-16 | 60.97 | {'CompetitorA': {'original_price': 53.84, 'sale_price': 44.69, 'discount_percentage': 17}} | 44.69 | 57.69 | 70.51 |
| 7 | Product 2 | 2024-01-10 | 35.34 | {} | 34.57 | 42.01 | 42.02 |
| 8 | Product 2 | 2024-01-11 | 35.34 | {'CompetitorB': {'original_price': 40.13, 'sale_price': 29.29, 'discount_percentage': 27}, 'CompetitorC': {'original_price': 28.93, 'sale_price': 22.85, 'discount_percentage': 21}} | 37.91 | 29.29 | 22.85 |
| 9 | Product 2 | 2024-01-12 | 35.34 | {} | 41.81 | 33.35 | 29.62 |
| 10 | Product 2 | 2024-01-13 | 35.34 | {} | 41.94 | 40.60 | 35.38 |
| 11 | Product 2 | 2024-01-14 | 35.34 | {} | 39.71 | 34.56 | 42.33 |
| 12 | Product 2 | 2024-01-15 | 35.34 | {'CompetitorA': {'original_price': 31.21, 'sale_price': 25.9, 'discount_percentage': 17}} | 25.90 | 33.44 | 40.87 |
| 13 | Product 2 | 2024-01-16 | 35.34 | {} | 33.86 | 28.92 | 41.03 |
| 14 | Product 3 | 2024-01-10 | 81.13 | {'CompetitorB': {'original_price': 92.14, 'sale_price': 67.26, 'discount_percentage': 27}, 'CompetitorC': {'original_price': 66.42, 'sale_price': 52.47, 'discount_percentage': 21}} | 87.02 | 67.26 | 52.47 |
| 15 | Product 3 | 2024-01-11 | 81.13 | {} | 95.98 | 76.56 | 68.00 |
| 16 | Product 3 | 2024-01-12 | 81.13 | {} | 96.29 | 93.20 | 81.22 |
| 17 | Product 3 | 2024-01-13 | 81.13 | {} | 91.17 | 79.35 | 97.18 |
| 18 | Product 3 | 2024-01-14 | 81.13 | {'CompetitorA': {'original_price': 71.64, 'sale_price': 59.46, 'discount_percentage': 17}} | 59.46 | 76.76 | 93.83 |
| 19 | Product 3 | 2024-01-15 | 81.13 | {} | 77.73 | 66.39 | 94.19 |
| 20 | Product 3 | 2024-01-16 | 81.13 | {'CompetitorA': {'original_price': 80.32, 'sale_price': 63.45, 'discount_percentage': 21}} | 63.45 | 87.76 | 81.93 |
| 21 | Product 4 | 2024-01-10 | 48.52 | {} | 57.40 | 45.79 | 40.67 |
| 22 | Product 4 | 2024-01-11 | 48.52 | {} | 57.59 | 55.74 | 48.58 |
| 23 | Product 4 | 2024-01-12 | 48.52 | {} | 54.52 | 47.45 | 58.12 |
| 24 | Product 4 | 2024-01-13 | 48.52 | {'CompetitorA': {'original_price': 42.85, 'sale_price': 35.57, 'discount_percentage': 17}} | 35.57 | 45.91 | 56.11 |
| 25 | Product 4 | 2024-01-14 | 48.52 | {} | 46.49 | 39.70 | 56.33 |
| 26 | Product 4 | 2024-01-15 | 48.52 | {'CompetitorA': {'original_price': 48.04, 'sale_price': 37.95, 'discount_percentage': 21}} | 37.95 | 52.48 | 49.00 |
| 27 | Product 4 | 2024-01-16 | 48.52 | {'CompetitorB': {'original_price': 50.93, 'sale_price': 45.84, 'discount_percentage': 10}, 'CompetitorC': {'original_price': 51.01, 'sale_price': 40.3, 'discount_percentage': 21}} | 41.82 | 45.84 | 40.30 |
| 28 | Product 5 | 2024-01-10 | 26.95 | {} | 31.99 | 30.96 | 26.98 |
| 29 | Product 5 | 2024-01-11 | 26.95 | {} | 30.29 | 26.36 | 32.28 |
| 30 | Product 5 | 2024-01-12 | 26.95 | {'CompetitorA': {'original_price': 23.8, 'sale_price': 19.75, 'discount_percentage': 17}} | 19.75 | 25.50 | 31.17 |
| 31 | Product 5 | 2024-01-13 | 26.95 | {} | 25.82 | 22.05 | 31.29 |
| 32 | Product 5 | 2024-01-14 | 26.95 | {'CompetitorA': {'original_price': 26.68, 'sale_price': 21.08, 'discount_percentage': 21}} | 21.08 | 29.15 | 27.21 |
| 33 | Product 5 | 2024-01-15 | 26.95 | {'CompetitorB': {'original_price': 28.29, 'sale_price': 25.46, 'discount_percentage': 10}, 'CompetitorC': {'original_price': 28.33, 'sale_price': 22.38, 'discount_percentage': 21}} | 23.23 | 25.46 | 22.38 |
| 34 | Product 5 | 2024-01-16 | 26.95 | {'CompetitorA': {'original_price': 27.28, 'sale_price': 24.01, 'discount_percentage': 12}, 'CompetitorB': {'original_price': 24.9, 'sale_price': 19.42, 'discount_percentage': 22}, 'CompetitorC': {'original_price': 30.56, 'sale_price': 23.53, 'discount_percentage': 23}} | 24.01 | 19.42 | 23.53 |

Next, we're going to graph our data. Graphing your data is a key step in exploratory data analysis. Here, we look at the sales data for each product. We look at the weather data. Lastly, we're going to plot the competitor pricing data.

```python
# Graph the sales data
# No changes needed in this cell

import matplotlib.pyplot as plt

plt.figure(figsize=(6, 4))
for product_id, product_data in sales_df.groupby("product_id"):
    product_data.sort_values(by="date", inplace=True)
    plt.plot(product_data["date"], product_data["quantity"], label=product_id)
plt.xlabel("Date")
plt.ylabel("Quantity")
plt.title("Sales Data for Each Product")
plt.xticks(rotation=45)
plt.ylim(0, sales_df["quantity"].max() + 10)
plt.legend()
plt.show()

# Plot the weather data

weather_df["temperature_c"] = weather_df["temperature"].apply(lambda x: x["celsius"])


plt.figure(figsize=(6, 4))
plt.plot(weather_df["date"], weather_df["temperature_c"])

# For each day, add the value of "main" in text
for i, row in weather_df.iterrows():
    # Add a transparent background to the text
    plt.text(
        row["date"],
        row["temperature_c"],
        row["conditions"]["main"],
        backgroundcolor="white",
    )


plt.xlabel("Date")
plt.xticks(rotation=45)
plt.ylabel("Temperature")
plt.title("Weather Data for Each Day")
plt.show()

# Plot the competitor pricing data

plt.figure(figsize=(6, 4))
for product in competitor_pricing_df["product"].unique():
    for competitor in ["a", "b", "c"]:
        plt.plot(
            competitor_pricing_df[competitor_pricing_df["product"] == product]["date"],
            competitor_pricing_df[competitor_pricing_df["product"] == product][
                f"competitor_{competitor}_price"
            ],
            label=f"{product} - competitor {competitor.upper()}",
            color=f"C{product[-1]}",
        )
plt.xlabel("Date")
plt.xticks(rotation=45)
plt.ylabel("Price")
plt.ylim(0, competitor_pricing_df.filter(like="price").max().max() + 10)
plt.title("Competitor Prices for Each Product")
# Put the legend outside the plot
plt.legend(loc="upper left", bbox_to_anchor=(1, 1))
plt.show()
```

![Sales data for each product](assets/images/l07-cot-sales-plot.png "Sales Data for Each Product")

Here we see the sales data for each of the five products. Most clearly, you see that product 5 has a spike on January 12th.

![Weather data for each day](assets/images/l07-cot-weather-plot.png "Weather Data for Each Day")

Here's the weather data for each of the days. You'll notice that the temperature is fluctuating between below freezing and above freezing. There's also heavy rain on the 12th.

![Competitor prices for each product](assets/images/l07-cot-competitor-plot.png "Competitor Prices for Each Product")

Here we see each of the five products for each of the three competitors in all of their prices. You'll see there are some wild fluctuations here. If we look at product 5, we see a price drop of about 50% for one of the competitors on the 12th.

#### Reflect on the sales data

Reflection:

* Sales spike for Product 5 on January 12th
* The "Weekend Special" promotion which started on January 12th, but that was for Product 2. Still, it may have had an indirect effect on Product 5.
* Weather was fluctuating between below freezing and above freezing. On the 12th in particular, there was heavy rain.
* As for Competitor pricing, we see that Product 5's price for one competitor dropped on January 12th, which may have led to more overall consumer interest in that product or may have coincided with an ad campaign.

In practice, a human would look at all these factors and more to determine the cause of the sales spike by digging deeper.

Let's see if we can get this far with a CoT prompt, which should at least find the sales spike and provide some reasons similar to what we've observed as human beings.

#### 3. Craft a simple CoT prompt

Let's start with a simple CoT prompt. We won't tell the model to which steps to follow. We also won't use any tools in this example.

::: warning
Note: Many modern LLMs may not need an explicit "think in steps" phrase in order to think in steps before providing an answer, as this behavior can be included in training process. Consider running your prompts with and without asking for CoT explicitly. In fact, multiple runs may yield different results, so it's worth simply re-running the same prompts more than once.
:::

::: tabs
```python title="Code"
# TODO: Fill in the part marked with ********** with a phrase such as "Think step by step."
# Feel free to try variations!

system_prompt_explicit_cot = """
You are a meticulous Retail Demand Analyst.
Your task is to analyze provided sales data and promotion schedules to identify and explain significant sales spikes for specific SKUs.

Think step by step.
"""

system_prompt_no_explicit_cot = """
You are a meticulous Retail Demand Analyst.
Your task is to analyze provided sales data and promotion schedules to identify and explain significant sales spikes for specific SKUs.
"""

user_prompt_analyze = f"""
Analyze the data provided below and hypothesize causes for any observed sales spikes.

Sales Data:
{sales_data}

Promotions Calendar:
{promotions_data}

Weather Data:
{weather_data}

Competitor Pricing Data:
{competitor_pricing_data}
"""

print(f"Sending prompt to {MODEL} model...")
explicit_cot_response_1 = get_completion(
    system_prompt=system_prompt_explicit_cot, user_prompt=user_prompt_analyze,
    model=MODEL,
    client=client
)
no_explicit_cot_response_2 = get_completion(
    system_prompt=system_prompt_no_explicit_cot, user_prompt=user_prompt_analyze,
    model=MODEL,
    client=client
)
print("Response received!\n")

# We compare the explicit CoT and non-ex
display_responses(
    {
        "system_prompt": system_prompt_explicit_cot,
        "user_prompt": user_prompt_analyze,
        "response": explicit_cot_response_1,
    },
    {
        "system_prompt": system_prompt_no_explicit_cot,
        "user_prompt": user_prompt_analyze,
        "response": no_explicit_cot_response_2,
    },
)
```
```text title="Output"
Sending prompt to OpenAIModels.GPT_41_NANO model...
Response received!
```
:::

::: details Response with explicit CoT
Let's analyze the data systematically to identify and hypothesize causes for sales spikes, considering all relevant factors.

---

### 1. **Identifying Sales Spikes**
- **Product 1**:
  - Significant increase in sales quantity on Jan 12 (310 units) compared to previous days (~226-302 units).
  - Revenue also peaks on Jan 12 (~18,900), higher than previous days.
- **Product 2**:
  - Notable spike on Jan 12 (80 units) and Jan 15 (73 units), with the highest recorded on Jan 12.
  - Revenue peaks correspondingly.
- **Product 3**:
  - Increased sales on Jan 12 (108 units) and Jan 14 (99 units).
- **Product 4**:
  - Elevated sales on Jan 12 (143 units) and Jan 14 (167 units).
- **Product 5**:
  - Massive increase on Jan 12 (342 units), the highest during the period.

---

### 2. **Correlation with Promotions**
- **Promotion Periods**:
  - **Weekend Special**: Jan 12-14 (10% off on Product 002)
  - **Flash Sale**: Jan 15-16 (15% off on Products 001, 003, 005)

**Key observations**:
- The **sales spike on Jan 12** coincides with the **Weekend Special** promotion for Product 2 and the beginning of promotions for other products.
- The **peak on Jan 12** for multiple SKUs (Product 1, 2, 3, 4, 5) aligns strongly with the **Weekend Special**.
- The **further increase on Jan 15-16** coincides with the **Flash Sale**.

### 3. **Promotion Impact**:
- **Product 1**:
  - Price remains stable at 60.97, but sales increase significantly on Jan 12 and Jan 14.
  - On Jan 12, competitors offer discounts on Product 1 (e.g., Competitor B at 50.55, a significant discount from their original).
  - The **start of the Flash Sale** on Jan 15 likely contributed to sustained high sales.
- **Product 2**:
  - Price stable at 35.34.
  - On Jan 12, competitor discounts (e.g., Competitor B at 29.29, a 27% discount) are notable.
  - The **promotion for Product 2** (Weekend Special) and competitor discounts seem to have driven the spike.
- **Product 3**:
  - Consistent price (~81.13), with discounts from competitors (e.g., Competitor B at 67.26 on Jan 12).
  - The **Flash Sale** on Jan 15-16 including Product 3 likely boosted sales.
- **Product 4**:
  - Price steady at 48.52.
  - Competitor discounts (e.g., Competitor A at 35.57 on Jan 13) during Jan 13-14 coincide with increased sales.
- **Product 5**:
  - Price stable at 26.95.
  - Significant spike on Jan 12 (342 units). Competitor discounts (e.g., Competitor A at 19.75 on Jan 12) during the same period reinforce the effect of promotional activity.

---

### 4. **Weather and External Factors**
- **Heavy rain and flood warning on Jan 12** could have impacted foot traffic or delivery, but sales still spiked. This suggests the promotional activity and pricing were strong enough to mitigate weather effects or that sales were driven by online channels or pre-planned promotions.

### 5. **Pricing and Competition Analysis**
- On Jan 12, competitors are offering notable discounts on all products, especially Product 2 and Product 3.
- Our prices remained stable, indicating that the sales increase was likely driven by:
  - **Price competitiveness** due to competitor discounts.
  - **Promotional marketing efforts** (Weekend Special and Flash Sale).
  - **Consumer perception** of better value during promotional events.

---

### **Hypotheses for Sales Spikes:**

| Date | Cause/Hypothesis |
|---------|--------------|
| **Jan 12** | - The culmination of **Weekend Special** (Jan 12-14) for Product 2 and the beginning of promotional activity for other SKUs.
- Competitor discounts (up to 27%) on key products increased consumer interest.
- High sales volume driven by promotional awareness and competitive pricing.
- Despite adverse weather (heavy rain), promotions likely played a decisive role. |
| **Jan 15-16** | - The **Flash Sale** (15% off on Products 001, 003, 005) boosted sales further.
- Competitor discounts and consumer anticipation of deals increased purchase activity.
- The higher discounts from competitors on Jan 15 (e.g., Competitor A at 25.9 on Product 2) made our fixed prices attractive, spurring demand. |

---

### **Conclusion:**
The primary drivers of sales spikes during this period are:
- **Promotional events** (Weekend Special and Flash Sale), which increased customer incentives.
- **Competitor discounting** during these periods, making our stable pricing more attractive.
- **Product availability and consumer response** to perceived value during promotional windows.

Weather conditions appear to have had minimal impact on the overall sales increase, likely due to the strength of promotional offers and pricing strategies.

---

**Recommendation:**  
Monitor upcoming promotional calendars and competitor pricing trends closely. Consider aligning promotional efforts with competitor discounts to maximize sales impact, especially during adverse weather periods or special events.
:::

::: details Response without explicit CoT
Based on the provided sales data, promotion schedules, weather conditions, and competitor pricing, the following analysis and hypotheses explain the observed sales spikes:

---

### **1. Notable Sales Spikes on Specific Dates**

- **January 12, 2024:**
  - **Observation:** Significant increase in sales for Product 1 (310 units), Product 3 (108 units), and especially Product 5 (342 units).
  - **Likely Cause:**  
    - The **"Weekend Special"** promotion (10% off on Product 002) runs from Jan 12–14, possibly creating increased overall store traffic and inventory movement, although it directly affects Product 2.
    - **Product 5** experienced a notable spike (342 units), likely driven by **the "Flash Sale"** starting Jan 15, but the large volume on Jan 12 suggests early stock clearance or anticipation of the upcoming promotion.
    - **Weather:** Heavy rain and flood warnings on Jan 12 might have driven customers to shop more during inclement weather, possibly through online channels or at physical stores with better shelter.
    - **Competitive Pricing:** On Jan 12, Product 1's price remains stable, but competitors offer discounts on similar products, which might have pushed customers to purchase before competitor discounts or due to perceived urgency.

- **January 15–16, 2024:**
  - **Observation:** Elevated sales volumes across all products, coinciding with the **"Flash Sale"** (Jan 15–16).
  - **Likely Cause:**  
    - The **"Flash Sale"** offers 15% off on Products 1, 3, and 5, directly incentivizing increased purchases.  
    - On Jan 15, Product 1 and Product 3 see noticeable sales increases, aligning with the promotion period.
    - Product 5's sales spike on Jan 16 (342 units), likely driven by the promotion and aggressive competitor discounts.
  - **Pricing Impact:**  
    - For Product 1, competitor discounts (e.g., CompetitorA's sale price dropping to $44.69) may have spurred customers to buy during the promotion window.
    - Product 3 and 5 also experience discounts via competitors, which could have amplified the effect.

---

### **2. Promotion Effectiveness and Correlation with Sales**

- **Promotion Timing & Sales:**
  - The **"Weekend Special"** (Jan 12–14) correlates with increased sales on Jan 12, particularly for Product 5.
  - The **"Flash Sale"** (Jan 15–16) coincides with the highest sales for Products 1, 3, and 5, confirming that the promotion effectively stimulated demand.
  
- **Promotion Impact on Product 5:**
  - The most dramatic surge occurs on Jan 16, with 342 units sold, aligning precisely with the end of the flash sale.
  - The promotion likely created a sense of urgency, especially given competitor discounts on similar products.

- **Promotion Impact on Product 1 & 3:**
  - Notable increases on Jan 15–16, matching the promotion dates, indicating high responsiveness to discounts.

---

### **3. Weather Conditions & External Factors**

- **Heavy Rain & Flood Warning (Jan 12):**
  - Despite adverse weather, sales spiked, possibly because:
    - Customers preferred shopping during bad weather to avoid outdoor exposure.
    - Online shopping may have increased, especially for high-demand or promotional products.
  - This suggests weather did not inhibit demand; instead, it possibly shifted shopping behavior.

### **4. Competitor Pricing & Market Dynamics**

- **Price Competition:**
  - On Jan 12, competitors offered discounts on Products 1, 3, and 5, with sale prices significantly lower than our regular prices.
  - During Jan 15–16, CompetitorA's sale price for Product 1 dropped to $44.69, close to our promotional price, likely intensifying consumer urgency.
  - Similarly, for Product 3 and 5, competitors’ discounts amplified the attractiveness of our promotions.

- **Pricing Strategy Effectiveness:**
  - Our consistent pricing ($60.97 for Product 1, $81.13 for Product 3, $26.95 for Product 5) during the promotion periods suggests reliance on discounts and promotions rather than price reductions alone.

---

### **5. Summary of Hypotheses for Sales Spikes**

| Date(s) | Primary Cause(s) | Supporting Evidence |
|---|---|---|
| **Jan 12** | - Impact of "Weekend Special" promotion
- Inclement weather leading to increased shopping | Promotion on Product 2 (though direct impact on other products), heavy rain, flood warning, surge in Product 5 sales | 
| **Jan 15–16** | - Launch of "Flash Sale" offering 15% off on key products
- Competitive market discounts
- Urgency created by promotion | Peak sales for Products 1, 3, 5; competitor prices dropping; promotion coincides with highest demand |

---

### **Conclusion:**

The observed sales spikes are primarily driven by well-timed promotional activities, notably the "Weekend Special" and "Flash Sale," which successfully increased demand, especially when combined with competitive pricing strategies. Weather conditions, while adverse, did not suppress sales; instead, they possibly enhanced online shopping or store visits during inclement days. Competitive discounting appears to have played a role in amplifying the effectiveness of our promotions, leading to significant sales volume increases on targeted dates.

---

**Recommendations for Future Analysis:**

- Continuously monitor competitor pricing and promotions to anticipate market shifts.
- Leverage weather forecasts to optimize promotional timing.
- Consider targeted promotions during adverse weather to maximize demand.
- Analyze customer feedback and purchase channels to better understand behavior during weather and promotional periods.
:::

#### Observation

- What were the differences between including CoT and not including CoT explicitly in the prompt?

#### 4. Craft a More Developed CoT Prompt

Let's add more to our CoT prompt. Let's ask the model to follow a specific set of steps in an **instructions section**. This may help us not only get final answers that align with our needs, but it will also help us constrain the output to a more specific format.

Finally, we'd like to the model to identify the single largest spike and hypothesize its causes, using the following output format:

```text
STRUCTURED ANALYSIS:
[Structured Analysis]

LARGEST SPIKE:
​```json
{
    "date": "YYYY-MM-DD",
    "amount_before_increase": "X.XX",
    "amount_after_increase": "X.XX",
    "percentage_increase": "X.XX%",
    "causes": [
        "Cause 1",
        "Cause 2",
        "Cause 3"
    ]
}
​```
```

::: tabs
```python title="Code"
# Let's add some more components to our CoT Prompt
# TODO: Replace parts marked with a **********

system_prompt_cot = """
You are a meticulous Retail Demand Analyst.
Your task is to analyze provided sales data and promotion schedules to identify and explain significant sales spikes for specific SKUs.

Think in steps.
"""

user_prompt_analyze = f"""
## INSTRUCTIONS:

Analyze the data provided below and hypothesize causes for any observed sales spikes.

Instructions:
* Find all sales spikes for each product
* For each product, identify the following:
    * Date of the sales spike
    * Amount of the sales spike and percentage increase
    * Possible causes of the sales spike according to the provided
        * sales data
        * promotion schedule
        * weather conditions
        * competitor pricing data
* Start with your analysis
* Conclude with the single largest spike according to the percentage increase with a short explanation for it.

--

## OUTPUT FORMAT:

STRUCTURED ANALYSIS:
[Structured Analysis]

LARGEST SPIKE:
​```json
{{
    "date": "YYYY-MM-DD",
    "amount_before_increase": "X.XX",
    "amount_after_increase": "X.XX",
    "percentage_increase": "X.XX%",
    "causes": [
        "Cause 1",
        "Cause 2",
        "Cause 3"
    ]
}}
​```

---

## CONTEXT

Sales Data:
{sales_data}

Promotions Calendar:
{promotions_data}

Weather Data:
{weather_data}

Competitor Pricing Data:
{competitor_pricing_data}
"""

print(f"Sending prompt to {MODEL} model...")
cot_response = get_completion(system_prompt=system_prompt_cot, user_prompt=user_prompt_analyze,
                              model=MODEL, client=client)
print("Response received!\n")


def parse_analysis_and_largest_spike(response):
    import json

    if "```json" not in response:
        print()
        print(response)
        raise RuntimeError(
            " ❌ No LARGEST SPIKE found in response. Looking for: \n\n```json"
        )

    analysis = response.split("```json")[0].strip()
    json_str = response.split("```json")[1].split("```")[0].strip()
    return analysis, json.loads(json_str)


analysis, largest_spike = parse_analysis_and_largest_spike(cot_response)

display(Markdown(analysis))
```
```text title="Output"
Sending prompt to OpenAIModels.GPT_41_NANO model...
Response received!
```
:::

::: details Structured analysis (model output)
**STRUCTURED ANALYSIS:**

**1. Product 1 (P001):**
- **Sales data highlights:**
  - Jan 10: 255 units
  - Jan 11: 235 units (~7.8% decrease from Jan 10)
  - Jan 12: 310 units (~31.9% increase from Jan 11)
  - Jan 13: 302 units (~2.6% decrease)
  - Jan 14: 305 units (~1% increase)
  - Jan 15: 301 units (~1.3% decrease)
  - Jan 16: 226 units (~25.2% decrease from Jan 15)
- **Sales spike:**
  - **Date:** Jan 12, 2024
  - **Amount before:** 235 units (Jan 11)
  - **Amount after:** 310 units (Jan 12)
  - **Increase:** 75 units
  - **Percentage increase:** (75/235) * 100 ≈ **31.9%**

- **Possible causes:**
  - **Promotion:** No explicit promotion scheduled for P001 during these dates.
  - **Weather:** No significant weather event on Jan 12.
  - **Pricing:** Price remained consistent at 60.97 USD.
  - **Competitor pricing:** On Jan 12, competitor B offered a significantly discounted price (sale at 50.55 USD vs. our 60.97 USD). This could have increased consumer interest, but since our price remained unchanged, the spike likely correlates more with general demand or early signals of upcoming promotion.

---

**2. Product 2 (P002):**
- **Sales data highlights:**
  - Jan 10: 65 units
  - Jan 11: 86 units (~32.3% increase)
  - Jan 12: 80 units (~7% decrease)
  - Jan 13: 68 units (~15% decrease)
  - Jan 14: 84 units (~23.5% increase)
  - Jan 15: 73 units (~13% decrease)
  - Jan 16: 80 units (stable)
- **Sales spike:**
  - **Date:** Jan 11, 2024
  - **Amount before:** 65 units
  - **Amount after:** 86 units
  - **Increase:** 21 units
  - **Percentage increase:** (21/65) * 100 ≈ **32.3%**

- **Possible causes:**
  - **Promotion:** No promotion scheduled for P002 during these dates.
  - **Weather:** Clear weather, no impact.
  - **Pricing:** Our price stable at 35.34 USD.
  - **Competitor pricing:** On Jan 11, competitors B and C offered sales with notable discounts (e.g., B at 29.29 USD, C at 22.85 USD), likely increasing demand. Our product's sales surged possibly due to heightened consumer interest driven by competitor discounts.

---

**3. Product 3 (P003):**
- **Sales data highlights:**
  - Jan 10: 90 units
  - Jan 11: 79 units (~12.2% decrease)
  - Jan 12: 108 units (~36.7% increase)
  - Jan 13: 96 units (~11.1% decrease)
  - Jan 14: 99 units (~3.1% increase)
  - Jan 15: 89 units (~10% decrease)
  - Jan 16: 83 units (~6.7% decrease)
- **Sales spike:**
  - **Date:** Jan 12, 2024
  - **Amount before:** 79 units
  - **Amount after:** 108 units
  - **Increase:** 29 units
  - **Percentage increase:** (29/79) * 100 ≈ **36.7%**

- **Possible causes:**
  - **Promotion:** No scheduled promotion for P003.
  - **Weather:** Clear weather.
  - **Pricing:** Stable at 81.13 USD.
  - **Competitor activity:** On Jan 12, competitors' sale prices for similar items (e.g., competitor B at 39.44 USD, competitor C at 39.44 USD) were significantly lower than our standard price, possibly drawing buyers' attention and increasing sales.

---

**4. Product 4 (P004):**
- **Sales data highlights:**
  - Jan 10: 171 units
  - Jan 11: 145 units (~15% decrease)
  - Jan 12: 143 units (~1.4% decrease)
  - Jan 13: 130 units (~9.1% decrease)
  - Jan 14: 167 units (~28.5% increase from Jan 13)
  - Jan 15: 126 units (~24.6% decrease)
  - Jan 16: 175 units (~39.7% increase from Jan 15)
- **Largest spike:**
  - **Date:** Jan 16, 2024
  - **Amount before:** 126 units (Jan 15)
  - **Amount after:** 175 units
  - **Increase:** 49 units
  - **Percentage increase:** (49/126) * 100 ≈ **38.9%**

- **Possible causes:**
  - **Promotion:** No direct promotion for P004.
  - **Weather:** Clear weather.
  - **Pricing:** Consistent at 48.52 USD.
  - **Competitor activity:** On Jan 16, competitors' sale prices for similar items (e.g., B at 45.84 USD, C at 40.3 USD) were lower or comparable, possibly stimulating demand. The significant increase might also be due to increased consumer interest or stock replenishment cycles.

---

**5. Product 5 (P005):**
- **Sales data highlights:**
  - Jan 10: 96 units
  - Jan 11: 114 units (~18.8% increase)
  - Jan 12: 342 units (~200% increase from Jan 11)
  - Jan 13: 103 units (~69.9% decrease)
  - Jan 14: 104 units (~1% increase)
  - Jan 15: 100 units (~3.8% decrease)
  - Jan 16: 125 units (~25% increase)
- **Largest spike:**
  - **Date:** Jan 12, 2024
  - **Amount before:** 114 units
  - **Amount after:** 342 units
  - **Increase:** 228 units
  - **Percentage increase:** (228/114) * 100 ≈ **200%**

- **Possible causes:**
  - **Promotion:** No direct promotion for P005 during these dates.
  - **Weather:** Clear weather.
  - **Pricing:** Stable at 26.95 USD.
  - **Competitor activity:** On Jan 12, competitors' sale prices for similar items were notably lower (e.g., B at 25.5 USD, C at 31.17 USD, with some discounts), likely prompting a surge in demand.
  - **Additional insight:** The spike on Jan 12 for P005 is the most significant percentage increase across all products, coinciding with increased competitor discounts and possibly consumer stockpiling or viral product popularity.

---

### **Summary of key spikes:**

| Product | Date       | % Increase  | Approx. Units Increase | Major Potential Cause                                    |
|-----------|------------|--------------|------------------------|----------------------------------------------------------|
| P001      | 2024-01-12 | 31.9%        | 75                     | Competitor discounts, no direct promotion               |
| P002      | 2024-01-11 | 32.3%        | 21                     | Competitor B & C discounting                            |
| P003      | 2024-01-12 | 36.7%        | 29                     | Competitor price cuts                                   |
| P004      | 2024-01-16 | 38.9%        | 49                     | Competitor discounts, consumer demand surge            |
| P005      | 2024-01-12 | 200%        | 228                    | Significant competitor discounts, possible stockpiling |

**The largest spike is for Product 5 on January 12, 2024, with a 200% increase in units sold, driven likely by aggressive competitor pricing and consumer response to discounted offers.**

---

**LARGEST SPIKE:**
:::

::: tabs
```python title="Code"
# Show the largest spike
# No changes needed in this cell

from pprint import pprint

pprint(largest_spike)
```
```text title="Output"
{'amount_after_increase': '342 units',
 'amount_before_increase': '114 units',
 'causes': ['Significant competitor discounts on similar products (e.g., sale '
            'prices below our standard price)',
            'Consumer stockpiling or increased demand due to perceived better '
            'deals',
            'Lack of direct promotional activity but external market factors '
            'driving sales'],
 'date': '2024-01-12',
 'percentage_increase': '200%'}
```
:::

#### Observation

- Did the model follow your instructions?
- How was the description of the highest spike by percentage?

#### Summary

🎉 Congratulations! 🎉 You've learned how to apply Chain-of-Thought to retail analytics!

Through this exercise, you've seen how to:

- 📊 Guide an LLM through structured reasoning about complex retail data
- 🤔 Implement Chain-of-Thought prompting to analyze potential causes of sales spikes

Keep up the good work! 💯

### Solution: Walkthrough of the Demand-Spike Detective Part 1

In this exercise, we guided an LLM to act as a retail demand analyst and explain an unexpected sales spike. This solution demonstrates how we can use a Chain-of-Thought prompt to have the AI reason through multiple data sources.

This video walks through a **Chain-of-Thought prompting solution** for analyzing a sales spike.

Main points:
- the task is to explain an unusual spike in product demand using multiple data sources
- adding **“Think step by step”** helps the model reason more systematically
- a more detailed prompt works even better by telling the model exactly what to find and how to format the answer
- the model identifies the biggest spike, estimates the increase, and connects it to likely causes like weather, promotions, and competitor pricing

The key takeaway is that CoT prompting improves reasoning, but **structured instructions** make the output more reliable and easier to use.

Navigate to [/lesson-2-chain-of-thought-and-react-prompting/exercises/concept1-chain-of-thoughts/solution/lesson-2-chain-of-thought-and-react-prompting-part-i.ipynb](https://github.com/udacity/cd14526-Effective-Prompting-AgenticAIC1-exercises/blob/main/lesson-2-chain-of-thought-and-react-prompting/exercises/concept1-chain-of-thoughts/solution/lesson-2-chain-of-thought-and-react-prompting-part-i.ipynb) in the workspace below to run a solution to the "Chain of Thought" exercise.

#### 1. Understanding the Data

The first step in the exercise was to explore the provided data. A human analyst would notice a few key things:

- **The Spike:** The data clearly shows a significant sales spike for Product 5 on January 12th.
- **Potential Causes:** On that same day, there was heavy rain and a competitor dropped their price for the same product by about 50%. A promotion for a different product ("Product 2") also started on that day, which might have had a minor, indirect effect.

Our goal is to see if a Chain-of-Thought prompt can guide the LLM to a similar conclusion.

#### 2. Crafting and Comparing CoT Prompts

The exercise first had you compare two system prompts. The only difference was the addition of the magic phrase, "Think step by step."

**System Prompt without explicit CoT:**

```text
You are a meticulous retail demand analyst. Your task is to analyze provided sales data and promotion schedules to identify and explain significant sales spikes.
```

**System Prompt with explicit CoT:**

```text
You are a meticulous retail demand analyst. Your task is to analyze provided sales data and promotion schedules to identify and explain significant sales spikes. Think step by step.
```

Adding "Think step by step" encourages the model to break down its reasoning process, often leading to a more structured and logical analysis, similar to the one we noted from looking at the data manually.

#### 3. Developing a More Structured Prompt

To get a more reliable and parseable output, the next step was to create a more developed prompt. Instead of just asking the AI to think step-by-step, we gave it a specific set of instructions and a required output format.

The detailed user prompt looked like this:

> First, find all sales spikes for each product. Then, for each product, identify the following:
>
> - the date of the sales spike,
> - the amount of the sales spike and percentage increase,
> - possible causes of the sales spike according to the provided data (sales data, promotions, weather conditions, and competitor pricing).
>
> Start with your analysis, then conclude with a single largest spike...

This prompt guides the AI much more explicitly. It then successfully identifies the largest spike and presents it in the requested JSON format:

```json
{
  "date": "2024-01-12",
  "amount_before_increase": "114",
  "amount_after_increase": "342",
  "percentage_increase": "200.0%",
  "causes": [
    "Activation of the Weekend Special promotion for Product 2, which may have indirectly influenced sales of other products.",
    "Heavy competitor discounts on Product 5, boosting category interest.",
    "Heavy rain and a flood warning on the same day, which could have driven more online shopping activity."
  ]
}
```

#### Reflection

The model did a great job following the complex instructions and identifying the correct spike and its potential causes. It's worth noting that its math for the percentage increase was correct in this instance (a 200% increase from 114 to 342), but as a general rule, LLMs are not always perfectly reliable for precise mathematical calculations. This highlights a limitation that we will address in the next exercise with the ReAct framework.

## 12.4 Exercise: ReACT Prompting

### Exercise: Demand-Spike Detective, Part II (The ReAct Agent)

In this exercise, you will transform our Retail Demand Analyst from a CoT-based reasoner into a true ReAct agent. Your challenge will be to build the core components of this agent:

1. A comprehensive ReAct system prompt that teaches the agent how to think, act, and use its tools.
2. The orchestration loop in Python that allows the agent to interact with its tools and environment over multiple steps to solve the problem.

You will see firsthand how this approach creates a more flexible, reliable, and powerful AI system.

#### Prerequisites

To complete this exercise, you will need:

- Access to the Udacity workspace environment.
- Your Vocareum OpenAI API key.

#### Instructions

Follow these step-by-step instructions to complete the exercise in the workspace provided.

1. **Open the Notebook:** In the file explorer, navigate to the correct notebook for this exercise and open it: `/workspace/chain-of-thought-and-react-prompting/exercises/concept2-react-prompting/starter/lesson-2-chain-of-thought-and-react-prompting-part-ii.ipynb`
2. **Initial Setup & API Key:**
   - Run the first few cells to import libraries and load the data.
   - In the cell for the OpenAI client setup, add your API key where indicated by the `TODO`.
3. **Create the ReAct System Prompt:**
   - Navigate to the section "2. Create a ReACT prompt that can call tools". This is your main task.
   - Find the `TODO` inside the `react_system_prompt` string.
   - **Your Task:** Following the structure we demonstrated with the Logistics Coordinator example, complete this system prompt. You must include:
     - **Role and Instructions:** Define the agent's role and explain the `THINK/ACT` cycle it must follow.
     - **Tool Definitions:** Clearly define the four available tools: `calculator`, `get_sales_data`, `call_weather_api`, and `final_answer`. For each tool, include a description and an example of its input and output.
     - **An Example Interaction:** Provide a complete, multi-turn example showing how the agent should reason, act, and use observations to solve a simple problem.
4. **Implement the Tool-Calling Logic:**
   - Proceed to the section "3. Tool Calling Parsing and Calling".
   - The notebook provides a `safe_eval` function to prevent security issues. Your first task is in the `calculator` function.
   - **Your Task:** Inside the `calculator` function, complete the `TODO` by calling the `safe_eval` function and making sure the result is returned as a float.
   - The rest of this section provides the `get_observation_message` function, which uses regular expressions to parse the `ACT:` from the AI's response and call the correct Python tool function. Review this code to understand how the orchestration layer works, but no other changes are needed here.
5. **Create the ReAct Loop:**
   - Navigate to "4. Create the ReACT Loop". This is where the agent comes to life.
   - Find the `TODO` items inside the `while True:` loop.
   - **Your Task:** Complete the logic for the loop. This involves:
     - Calling the `get_completion` function to get the `react_response` from the AI.
     - Calling the `get_observation_message` function to parse the `react_response` and get the `observation_message`.
     - Appending the assistant's response and the user's observation to the `messages` list to maintain the conversation history.
6. **Run and Reflect:**
   - Execute the loop and observe the turn-by-turn output. Watch how the agent first calls `get_sales_data`, then uses the `calculator` to find the spike, then calls the `call_weather_api` for that specific date, and finally uses `final_answer`.
   - Compare this dynamic process to the single-prompt CoT approach from the previous exercise.

### Notebook Walkthrough

In this hands-on exercise, you will guide an LLM to explain an unexpected sales spike.

**Outline:**

- Setup
- Create a ReACT prompt that can call tools
- Tool Calling Parsing and Calling
- Create the ReACT Loop
- Reflect

#### 1. Setup

First, let's start by setting up our notebook, and this is going to be identical to Part 1. First, we're going to import necessary libraries. Here, notably, we have `lesson_2_lib` (Part II version, in this session's Resources).

```python
# Import necessary libraries
# No changes needed in this cell

import os

import pandas as pd
from IPython.display import Markdown, display
from lesson_2_lib import (
    # Helpers
    OpenAIModels,
    print_in_box,
    # Synthetic data
    get_competitor_pricing_data,
    get_completion,
    get_promotions_data,
    get_sales_data,
    get_weather_data,
    call_weather_api
)
from openai import OpenAI

MODEL = OpenAIModels.GPT_41_NANO
```

Next, we're going to set up OpenAI to use the Vocareum API endpoint.

```python
# If using the Vocareum API endpoint
# No changes needed in this cell
# TODO: Fill in the missing parts marked with **********

client = OpenAI(
    base_url="https://openai.vocareum.com/v1",
    # Uncomment one of the following
    # api_key="*********",  # <--- TODO: Fill in your Vocareum API key here
    # api_key=os.getenv(
    #     "OPENAI_API_KEY"
    # ),  # <-- Alternately, set as an environment variable
)

# If using OpenAI's API endpoint
# client = OpenAI()
```

Next, we're going to load all of our data. We're actually not going to need these data frames, but sometimes it's good to have them handy. The main thing we're going to use is `get_sales_data`.

```python
# Load the simulated data
# No changes needed in this cell

pd.set_option("display.max_columns", None)
pd.set_option("display.max_rows", None)
pd.set_option("display.width", None)
pd.set_option("display.max_colwidth", None)

sales_data = get_sales_data()
sales_df = pd.DataFrame(sales_data)

promotions_data = get_promotions_data()
promotions_df = pd.DataFrame(promotions_data)

weather_data = get_weather_data()
weather_df = pd.DataFrame(weather_data)

competitor_pricing_data = get_competitor_pricing_data()
competitor_pricing_df = pd.DataFrame(competitor_pricing_data)
```

#### 2. Create a ReACT prompt that can call tools

While it is often convenient to throw all of the data into the prompt for the model to figure it out, sometimes the entire dataset is too large or too complex for the model to handle. In this case, we may want our model to be able to decide when to call a tool with what parameters.

When requesting the usage of a tool, the model will return a special output, signaling the orchestrator to call the tool (e.g. `tool_call: weather_api`). The orchestrator will then call the tool and put the result in the message history for the model to use.

Let's create a prompt that will have the model follow the ReACT pattern of Think, Act, Observe, and then repeat until it has a final answer.

For this exercise we will use the following tools:

#### Available Tools
* `calculator(expression: str)`: Perform an arithmetic calculation
    - Example:
        - Input: `ACT: calculator(expression="(10 + 20) / 2.0")`
        - Output: `OBSERVE: 15.0`
* `get_sales_data()`: Get the sales data
    - Example:
        - Input: `ACT: get_sales_data()`
        - Output: `OBSERVE: {"date": "2024-01-10", "product_id": "P001", "product_name": "Product 1", "quantity": 255, "revenue": 15547.35}`
* `call_weather_api(date: str)`: Get weather data for a specific date. Call this for the date of each spike.
    - Example:
        - Input: `ACT: call_weather_api(date="2024-01-10")`
        - Output: `OBSERVE: {"date": "2024-01-10", "weather": "Sunny", "temperature": 72}`

* `final_answer(amount_after_spike: str, causes: list[str], date: str, percentage_spike: str)`: Return the final answer
    - Example:
        - Input: `ACT: final_answer(amount_after_spike="32", causes=["Competitor X offering a 29 discount boosting category interest", ...], date="2020-06-12", percentage_spike="20.00%")`
        - Output: `OBSERVE: {"amount_after_spike": "32", "causes": ["Competitor X offering a 29 discount boosting category interest", ...], "date": "2020-06-12", "percentage_spike": "20.00%"}`

Here are the available tools we want it to use. There's a calculator. We want a function that's called `get_sales_data`. We have `call_weather_api`, which is a function that will get you the weather for a specific date. Then to provide the final answer, we have a `final_answer` tool.

Let's create the ReACT prompt that we will run for a single step. After we run it, it should conclude with a tool call. It starts off, you are a meticulous Retail Demand Analyst. We've added instructions now so it says, you will use step-by-step reasoning. There's a THINKING part, and then there's an ACTING part. Now it goes into more detail. You will always respond with a single THINK/ACT message in the following format. It says, THINK: then carry out any reasoning needed, and after that, conclusion about what next tool call to take. Then ACT: tool to use and arguments. Then it says, as soon as you know the final answer, call the `final_answer` tool in an ACT message.

Here are the available tools. We copied and pasted what we had above in the description. Notably, we have the function, the data type, and example inputs and outputs. For a long, complicated prompt, it's good to include an example of how it will be used, and it goes back and forth between the user message and the assistant messages.

Here we have a task. Respond to the query, what was the weather one week ago? Today is January 17th. The assistant message then goes through the think phase and then the act phase. When it's thinking, it says, I need to calculate the date one week ago. If today is the 17th, then seven days ago, it was the 10th. I can call the `call_weather_api` to get the weather for the 10th. If I have the weather data, I can return the `final_answer`. The tool call needed is `call_weather_api` for January 10th. Now it says ACT, and it formats it as a function call, `call_weather_api(date="2024-01-10")`. That's what the LLM is expected to respond with.

Our Python code, our "orchestrator", will read that `call_weather_api` line, will parse it, will run a function, and then it will say, OBSERVE and print the verbatim result of the `call_weather_api` function. Now it's the assistant's turn again. It's going to THINK, and it says, I have the weather data for the 10th. I can return the final answer now. The tool call needed is `final_answer`, so ACT `final_answer`, the weather on January 10th was sunny. The final answer tool call is read by our Python code, and our Python code now responds the weather on January 10th was sunny.

::: tabs
```python title="Code"
# First, let's create a ReACT prompt that will run for a single step.
# It should conclude with asking for a tool call.
# TODO: Replace parts marked with a **********


react_system_prompt = """
You are a meticulous Retail Demand Analyst that can solve any TASK in a multi-step process using tool calls and reasoning.

## Instructions:
- You will use step-by-step reasoning by
    - THINKING the next steps to take to complete the task and what next tool call to take to get one step closer to the final answer
    - ACTING on the single next tool call to take
- You will always respond with a single THINK/ACT message of the following format:
    THINK:
    [Carry out any reasoning needed to solve the problem not requiring a tool call]
    [Conclusion about what next tool call to take based on what data is needed and what tools are available]
    ACT:
    [Tool to use and arguments]
- As soon as you know the final answer, call the `final_answer` tool in an `ACT` message.
- ALWAYS provide a tool call, after ACT:, else you will fail.

## Available Tools
* `calculator(expression: str)`: Perform an arithmetic calculation
    - Example:
        - Input: `ACT: calculator(expression="(10 + 20) / 2.0")`
        - Output: `OBSERVE: 15.0`
* `get_sales_data()`: Get the sales data
    - Example:
        - Input: `ACT: get_sales_data()`
        - Output: `OBSERVE: {"date": "2024-01-10", "product_id": "P001", "product_name": "Product 1", "quantity": 255, "revenue": 15547.35}`
* `call_weather_api(date: str)`: Get weather data for a specific date. Call this for the date of each spike.
    - Example:
        - Input: `ACT: call_weather_api(date="2024-01-10")`
        - Output: `OBSERVE: {"date": "2024-01-10", "weather": "Sunny", "temperature": 72}`

* `final_answer(amount_after_spike: str, causes: list[str], date: str, percentage_spike: str)`: Return the final answer
    - Example:
        - Input: `ACT: final_answer(amount_after_spike="32", causes=["Competitor X offering a 29 discount boosting category interest", ...], date="2020-06-12", percentage_spike="20.00%")`
        - Output: `OBSERVE: {"amount_after_spike": "32", "causes": ["Competitor X offering a 29 discount boosting category interest", ...], "date": "2020-06-12", "percentage_spike": "20.00%"}`

You will not use any other tools.

Example:

​```
--USER MESSAGE--
TASK:
Respond to the query "What was the weather one week ago?". Today is 2024-01-17.

--ASSISTANT MESSAGE--
THINK:
* I need to calculate the date one week ago from 2024-01-17.
* If today is 2024-01-17, then 7 days ago is 2024-01-10.
* I can call the `call_weather_api` tool to get the weather data for 2024-01-10.
* After that, if I have the weather data, I can return the final answer using the `final_answer` tool.
* Tool call needed: Call the `call_weather_api` tool for 2024-01-10.
ACT:
call_weather_api(date="2024-01-10")

--USER MESSAGE--
OBSERVE:
{"date": "2024-01-10", "weather": "Sunny"}

--ASSISTANT MESSAGE--
THINK:
* I have the weather data for 2024-01-10.
* I can return the final answer using the `final_answer` tool.
* Tool call needed: Call the `final_answer` tool with the weather data.
ACT:
final_answer("The weather on 2024-01-10 was sunny.")

--USER MESSAGE--
OBSERVE:
The weather on 2024-01-10 was sunny.
​```
"""

user_prompt_analyze = """
TASK: Find the single largest sales spike according to the percentage increase with a short explanation for it
based on factors such as weather.
"""

print(f"Sending prompt to {MODEL} model...")

messages = []
messages.append({"role": "system", "content": react_system_prompt})
messages.append({"role": "user", "content": user_prompt_analyze})

react_response = get_completion(messages=messages, model=MODEL, client=client)

messages.append({"role": "assistant", "content": react_response})
print("Response received!\n")


for message in messages:
    if message["role"] == "system":
        continue
    print_in_box(message["content"], title=f"{message['role'].capitalize()}")

assert "ACT:" in messages[-1]["content"], (
    " ❌ No ACT message found in response. Looking for: \n\n ACT:"
)
```
```text title="Output"
Sending prompt to OpenAIModels.GPT_41_NANO model...
Response received!


╔═════════════════════════════════════════════[ User ]═════════════════════════════════════════════╗
║ TASK: Find the single largest sales spike according to the percentage increase with a short      ║
║ explanation for it                                                                               ║
║ based on factors such as weather.                                                                ║
╚══════════════════════════════════════════════════════════════════════════════════════════════════╝

╔══════════════════════════════════════════[ Assistant ]═══════════════════════════════════════════╗
║ THINK:                                                                                           ║
║ * I need to identify the largest sales spike by percentage increase.                             ║
║ * To do that, I should first retrieve the sales data to see the sales figures and identify the   ║
║ spike.                                                                                           ║
║ * Once I find the date with the largest percentage increase, I should check the weather data for ║
║ that date to see if weather may have contributed.                                                ║
║ * I will retrieve the sales data first, then determine the date with the maximum spike.          ║
║ * After that, I will call the weather API for that date.                                         ║
║ * Based on the data, I can formulate a short explanation for the spike related to weather        ║
║ factors.                                                                                         ║
║ * Tool call needed: Get sales data.                                                              ║
║ ACT:                                                                                             ║
║ get_sales_data()                                                                                 ║
╚══════════════════════════════════════════════════════════════════════════════════════════════════╝
```
:::

At the end, an `assert` statement checks to see if an ACT message is in the end of the content. If we run it, it says this: find the single largest sales spike. It will think, first, I need to gather the sales data. After I have the sales data, I will analyze percentage increases. Once identified, I will check the data that spike. To understand the cause of the spike, I will need to get the weather data. Then I will compile a short explanation based on the weather and other relevant factors. The tool call needed is `get_sales_data`. Then it says ACT, `get_sales_data()`.

#### 3. Tool Calling Parsing and Calling

Awesome! Let's now work on our functions that will parse the text following the `ACT:` part of the response and call a pre-defined function.

Let's move on to tool calling parsing and calling. The first part is working on the calculator function. The biggest part is this `safe_eval` function, which essentially will take a string. Rather than using Python `eval`, which can be dangerous to run because then arbitrary code can be executed, this will actually take a string that only allows addition, subtraction, multiplication, division, and negatives and also numbers, and it will return the result. If it contains other types of objects, it will return a runtime error. This is how we run it. We return, we're going to make it a float of `safe_eval` of expression.

```python
# Let's work on our calculator function!
# TODO: Replace parts marked with a **********

import re

import ast
import operator


def safe_eval(expr):
    """
    Evaluate a mathematical expression safely.

    We normally don't want to use eval() because it can execute arbitrary code, unless we are in a
    properly sandboxed environment. This function is a safe alternative for evaluating mathematical
    expressions.
    """
    operators = {
        ast.Add: operator.add,
        ast.Sub: operator.sub,
        ast.Mult: operator.mul,
        ast.Div: operator.truediv,
        ast.USub: operator.neg,
    }

    def eval_node(node):
        if isinstance(node, ast.Constant):
            return node.value
        elif isinstance(node, ast.BinOp):
            return operators[type(node.op)](eval_node(node.left), eval_node(node.right))
        elif isinstance(node, ast.UnaryOp):
            return operators[type(node.op)](eval_node(node.operand))
        elif isinstance(node, ast.Expr):
            return eval_node(node.value)
        else:
            raise TypeError(f"Unsupported type: {type(node)}")

    result = eval_node(ast.parse(expr, mode="eval").body)

    if isinstance(result, float):
        return round(result, 2)
    elif isinstance(result, int):
        return result
    else:
        raise RuntimeError(f"Unsupported result type: {type(result)}")


def calculator(expression: str) -> float:
    """
    Evaluate a mathematical expression safely.
    """
    return float(safe_eval(expression))


assert (actual := calculator("10 + 10")) == 20.0, f" ❌ Expected 20.0, got {actual}"
```

Next, we move on to the `get_observation_message`. This is going to take a Think/Act response, run the tool call, and then return the observation message. This function uses regular expressions to parse the act string. Here we see the sales data, regular expression, weather, checking, calculator, and final answer.

Here are the different tool calls for the sales data. We're going to search for the sales data regular expression. We're going to filter it for Product 5, just to make this example a bit simpler, and then print the sales data after observe. Next, the `call_weather_api`, we will do the same thing, and then `call_weather_api` of the date, and then do observe weather data here. Calculator is very similar, use a regular expression, get the expression and return, observe calculator of the expression. Then the final answer, we're going to use a regular expression to parse the amount after spike, causes, date and percentage spike, and then now return this along observe string.

In all other cases, we're going to say, observe invalid tool call or tool not supported. This will actually give the model a chance in its next THINK/ACT step to correct itself in case it tried making an invalid tool call. Here are the test cases that show some of the inputs that the model might provide for us, and then what we expect to see coming out of our `get_observation_message` function.

```python
def get_observation_message(response: str) -> str:
    """
    Take a THINK/ACT response, run the tool call, and return the observation message.

    Args:
        response (str): The THINK/ACT response.

    Returns:
        str: The observation message.

    Uses regular expressions to match the tool call and run the corresponding tool.

    If the response is invalid, return an error message as a string that the agent can understand.
    """
    from ast import literal_eval

    observation_message = None

    SALES_DATA_REGEX = r"ACT:\nget_sales_data\(\)"
    WEATHER_REGEX = r"ACT:\ncall_weather_api\(date=\"(.*)\"\)"
    CALCULATOR_REGEX = r"ACT:\ncalculator\(expression=\"(.*)\"\)"
    FINAL_ANSWER_REGEX = r"ACT:\nfinal_answer\(amount_after_spike=\"(.*)\", causes=(.*), date=\"(.*)\", percentage_spike=\"(.*)\"\)"

    # TOOL 1: get_sales_data
    if re.search(SALES_DATA_REGEX, response):
        sales_data = get_sales_data(products=["P005"])
        # filter sales data to Product 5
        sales_data = [
            item for item in sales_data if item["product_name"] == "Product 5"
        ]
        observation_message = f"OBSERVE:\n{sales_data}"

    # TOOL 2: call_weather_api
    elif re.search(WEATHER_REGEX, response):
        date = re.search(WEATHER_REGEX, response).groups()[0]
        weather_data = call_weather_api(date)
        observation_message = f"OBSERVE:\n{weather_data}"

    # TOOL 3: calculator
    elif re.search(CALCULATOR_REGEX, response):
        expression = re.search(CALCULATOR_REGEX, response).groups()[0]
        observation_message = f"OBSERVE:\n{calculator(expression)}"

    # TOOL 4: final_answer
    elif re.search(FINAL_ANSWER_REGEX, response):
        amount_after_spike, causes, date, percentage_spike = re.search(
            FINAL_ANSWER_REGEX,
            response,
        ).groups()
        causes = literal_eval(causes)
        observation_message = f"OBSERVE:\namount_after_spike: {amount_after_spike}\ndate: {date}\npercentage_spike: {percentage_spike}\ncauses: {causes}"

    # Error
    else:
        observation_message = "OBSERVE:\nInvalid tool call or tool not supported."

    return observation_message


# Test cases
assert (
    actual := get_observation_message("""
THINK:
[thinking here]
ACT:
get_sales_data()
""")
) == (expected := "OBSERVE:\n" + str(get_sales_data(products=["P005"]))), (
    f"{actual} != {expected}"
)

assert (
    actual := get_observation_message("""
THINK:
[thinking here]
ACT:
call_weather_api(date="2024-01-12")
""")
) == (expected := "OBSERVE:\n" + str(call_weather_api("2024-01-12"))), (
    f"{actual} != {expected}"
)

assert (
    actual := get_observation_message("""
THINK:
[thinking here]
ACT:
final_answer(amount_after_spike="10", causes=["cause1", "cause2"], date="2024-01-12", percentage_spike="10%")
""")
) == (
    expected
    := "OBSERVE:\namount_after_spike: 10\ndate: 2024-01-12\npercentage_spike: 10%\ncauses: ['cause1', 'cause2']"
), f"{actual} != {expected}"

assert (
    actual := get_observation_message("""
THINK:
[thinking here]
ACT:
calculator(expression="10 + 10")
""")
) == (expected := "OBSERVE:\n20.0"), f"{actual} != {expected}"

assert (
    actual := get_observation_message("""
THINK:
[thinking here]
ACT:
invalid_tool()
""")
) == (expected := "OBSERVE:\nInvalid tool call or tool not supported."), (
    f"{actual} != {expected}"
)

assert (
    actual := get_observation_message("""
THINK:
[thinking here]
ACT_TYPO:
get_sales_data()
""")
) == (expected := "OBSERVE:\nInvalid tool call or tool not supported."), (
    f"{actual} != {expected}"
)
```

#### 4. Create the ReACT Loop

Now we're ready to put it all together! We will now use the ReACT prompt we created in the previous section to call a (simulated) weather API tool. This will run in a loop for a maximum number of iterations until the `final_answer` tool is called.

Let's take the react prompt from before and put it in a loop. At the core of it will be a list of messages to which we will append the Think/Act messages from the LLM and the observation messages we make calling the tool calls at the LLM requests. We start with the blank list of messages, then we add the react system prompt, which describes to the LLM how react works. After that, we're going to put our task which, in this case, is finding the sales spikes.

Next, we have a step counter, `num_react_steps`. The purpose of this counter is to prevent the LLM from getting stuck in an endless loop and driving up costs. Here's the main loop. We're going to take the existing messages, run the `get_completion` function, and then get the react response. This react response, then we're going to run through `get_observation_message`, get the observation message, the result of the tool call. The react response is the assistant message, and the observation message is the user message. Let's append these to the message history.

Now, if the react response happens to have contained the phrase final answer, we're going to say the LLM told us to end, so we're going to end. Otherwise, we're going to increment the number of react steps. If that happens to be more than the maximum we've set, we're going to also break and say, hey, there's an error.

```python
# Let's make the ReACT loop!
# TODO: Replace instances of ********** where specified

messages = []
messages.append({"role": "system", "content": react_system_prompt})
messages.append({"role": "user", "content": user_prompt_analyze})


for message in messages:
    if message["role"] == "system":
        continue
    print_in_box(message["content"], title=f"{message['role'].capitalize()}")

num_react_steps = 0

observation_message = None
while True:

    react_response = get_completion(messages=messages, model=MODEL, client=client)
    observation_message = get_observation_message(react_response)

    messages.append({"role": "assistant", "content": react_response})
    
    print_in_box(
        react_response, title=f"Assistant (Think + Act). Step {num_react_steps + 1}"
    )

    messages.append({"role": "user", "content": observation_message})

    if "ACT:\nfinal_answer" in react_response:
        print_in_box(observation_message, title="FINAL ANSWER")
        break

    print_in_box(
        observation_message, title=f"User (Observe). Step {num_react_steps + 1}"
    )

    num_react_steps += 1
    if num_react_steps > 10:
        print("ERROR: Max number of React steps exceeded. Breaking.")
        break

assert "date: 2024-01-12" in observation_message, "ReACT Loop did not find the spike date"
assert "percentage_spike: 200" in observation_message, "ReACT Loop did not find the spike percentage increase"
```

::: details Output: the ReACT loop run
```text

╔═════════════════════════════════════════════[ User ]═════════════════════════════════════════════╗
║ TASK: Find the single largest sales spike according to the percentage increase with a short      ║
║ explanation for it                                                                               ║
║ based on factors such as weather.                                                                ║
╚══════════════════════════════════════════════════════════════════════════════════════════════════╝

╔═══════════════════════════════[ Assistant (Think + Act). Step 1 ]════════════════════════════════╗
║ THINK:                                                                                           ║
║ * I need to identify the sales data to find the largest percentage increase.                     ║
║ * I will first get the sales data and analyze it to find the spike with the highest percentage   ║
║ increase.                                                                                        ║
║ * Once I identify the largest spike, I will note the date.                                       ║
║ * To provide a short explanation, I should also examine the weather data for that date to see if ║
║ weather conditions might have contributed.                                                       ║
║ * Next steps: retrieve sales data, analyze for the largest percentage spike, then get weather    ║
║ data for that date.                                                                              ║
║ * Tool call needed: get_sales_data().                                                            ║
║ ACT:                                                                                             ║
║ get_sales_data()                                                                                 ║
╚══════════════════════════════════════════════════════════════════════════════════════════════════╝

╔════════════════════════════════════[ User (Observe). Step 1 ]════════════════════════════════════╗
║ OBSERVE:                                                                                         ║
║ [{'date': datetime.date(2024, 1, 10), 'product_id': 'P005', 'product_name': 'Product 5',         ║
║ 'quantity': 96, 'revenue': 2587.2}, {'date': datetime.date(2024, 1, 11), 'product_id': 'P005',   ║
║ 'product_name': 'Product 5', 'quantity': 114, 'revenue': 3072.3}, {'date': datetime.date(2024,   ║
║ 1, 12), 'product_id': 'P005', 'product_name': 'Product 5', 'quantity': 342, 'revenue': 9216.9},  ║
║ {'date': datetime.date(2024, 1, 13), 'product_id': 'P005', 'product_name': 'Product 5',          ║
║ 'quantity': 103, 'revenue': 2775.85}, {'date': datetime.date(2024, 1, 14), 'product_id': 'P005', ║
║ 'product_name': 'Product 5', 'quantity': 104, 'revenue': 2802.8}, {'date': datetime.date(2024,   ║
║ 1, 15), 'product_id': 'P005', 'product_name': 'Product 5', 'quantity': 100, 'revenue': 2695.0},  ║
║ {'date': datetime.date(2024, 1, 16), 'product_id': 'P005', 'product_name': 'Product 5',          ║
║ 'quantity': 125, 'revenue': 3368.75}]                                                            ║
╚══════════════════════════════════════════════════════════════════════════════════════════════════╝

╔═══════════════════════════════[ Assistant (Think + Act). Step 2 ]════════════════════════════════╗
║ THINK:                                                                                           ║
║ * I have sales data from January 10 to January 16, 2024.                                         ║
║ * To find the largest percentage increase, I need to compare each day's sales with the previous  ║
║ day's sales.                                                                                     ║
║ * I'll calculate the percentage change in revenue for each day compared to the previous day.     ║
║ * The largest percentage increase will be identified, and I will note that date.                 ║
║ * Then, I will call the weather API for that date to see if weather could have been a factor.    ║
║ * Next step: calculate percentage change in revenue day-over-day.                                ║
║ * Tool call: calculator to compute percentage change for each day.                               ║
║ ACT:                                                                                             ║
║ calculator(expression="(9216.9 - 3072.3) / 3072.3 * 100")                                        ║
╚══════════════════════════════════════════════════════════════════════════════════════════════════╝

╔════════════════════════════════════[ User (Observe). Step 2 ]════════════════════════════════════╗
║ OBSERVE:                                                                                         ║
║ 200.0                                                                                            ║
╚══════════════════════════════════════════════════════════════════════════════════════════════════╝

╔═══════════════════════════════[ Assistant (Think + Act). Step 3 ]════════════════════════════════╗
║ THINK:                                                                                           ║
║ * The calculation shows a 200% increase in revenue from January 11 to January 12.                ║
║ * I need to verify if this is the largest percentage increase by comparing it with other day-to- ║
║ day changes.                                                                                     ║
║ * Since the previous calculation resulted in 200%, I will quickly check other significant day-   ║
║ to-day changes.                                                                                  ║
║ * The next step is to calculate the percentage change from January 10 to January 11 to compare.  ║
║ * Tool call: calculator for January 10 to 11 change.                                             ║
║ ACT:                                                                                             ║
║ calculator(expression="(3072.3 - 2587.2) / 2587.2 * 100")                                        ║
╚══════════════════════════════════════════════════════════════════════════════════════════════════╝

╔════════════════════════════════════[ User (Observe). Step 3 ]════════════════════════════════════╗
║ OBSERVE:                                                                                         ║
║ 18.75                                                                                            ║
╚══════════════════════════════════════════════════════════════════════════════════════════════════╝

╔═══════════════════════════════[ Assistant (Think + Act). Step 4 ]════════════════════════════════╗
║ THINK:                                                                                           ║
║ * The percentage increase from January 10 to January 11 is approximately 18.75%, which is less   ║
║ than the 200% increase from January 11 to January 12.                                            ║
║ * The largest percentage spike identified so far is on January 12 with 200%.                     ║
║ * I now need to verify the weather for January 12 to assess if weather contributed to this       ║
║ spike.                                                                                           ║
║ * Next step: call the weather API for January 12.                                                ║
║ * Tool call: call_weather_api(date="2024-01-12").                                                ║
║ ACT:                                                                                             ║
║ call_weather_api(date="2024-01-12")                                                              ║
╚══════════════════════════════════════════════════════════════════════════════════════════════════╝

╔════════════════════════════════════[ User (Observe). Step 4 ]════════════════════════════════════╗
║ OBSERVE:                                                                                         ║
║ {'date': '2024-01-12', 'temperature': {'fahrenheit': 41.1, 'celsius': 5.1}, 'conditions':        ║
║ {'main': 'Heavy Rain', 'precipitation': 'Heavy Rain', 'precipitation_amount': 2.7,               ║
║ 'special_event': 'Flood Warning'}}                                                               ║
╚══════════════════════════════════════════════════════════════════════════════════════════════════╝

╔═══════════════════════════════[ Assistant (Think + Act). Step 5 ]════════════════════════════════╗
║ THINK:                                                                                           ║
║ * The weather on January 12 was characterized by heavy rain and a flood warning.                 ║
║ * This weather condition could have significantly influenced the sales spike, possibly due to    ║
║ increased demand for products related to weather safety or changes in consumer behavior.         ║
║ * To provide a short explanation, I will mention the heavy rain and flood warning as             ║
║ contributing factors.                                                                            ║
║ * I will now prepare the final answer including the date, percentage increase, and weather-      ║
║ related explanation.                                                                             ║
║ * Tool call: final_answer with all relevant details.                                             ║
║ ACT:                                                                                             ║
║ final_answer(amount_after_spike="9216.9", causes=["Heavy rain and flood warning on 2024-01-12    ║
║ likely contributed to increased sales"], date="2024-01-12", percentage_spike="200.00%")          ║
╚══════════════════════════════════════════════════════════════════════════════════════════════════╝

╔═════════════════════════════════════════[ FINAL ANSWER ]═════════════════════════════════════════╗
║ OBSERVE:                                                                                         ║
║ amount_after_spike: 9216.9                                                                       ║
║ date: 2024-01-12                                                                                 ║
║ percentage_spike: 200.00%                                                                        ║
║ causes: ['Heavy rain and flood warning on 2024-01-12 likely contributed to increased sales']     ║
╚══════════════════════════════════════════════════════════════════════════════════════════════════╝
```
:::

Now, let's take a look at the message history. We've omitted the system prompt just to save space, but we see the user prompt first. Find the single largest sale spike. Here's the first THINK/ACT step. Think, I need to identify the sales data. I will get the sales data, etc. Act, get sales data. Now we have the first observed step, which will run the get sales data tool and paste it into the message.

Think and Act Step 2, it says, now I have sales data for several days, I need to calculate the percentage increase, etc. Calculate percentage increases between consecutive days using the calculator tool. This is going to give us 200, and so it's interesting that the model already knew the dates on which the largest increase occurred. Now it's using the calculator to get an accurate answer, which is pretty good because sometimes LLMs are terrible at math.

Next, we have Think/Act Step 3. Now I need to investigate the weather act, `call_weather_api`, for January 12. Observe Step 3, it calls the weather API, and it says, date, January 12th; temperature, Fahrenheit 41 degrees, Celsius five; conditions, heavy rain. Think + Act Step 4, it says, the weather on the 12th was characterized by heavy rain and flood warning. Next step, call the final answer tool. Final answer, causes heavy rain and flood warning; date, January 12th; percentage spike, 200%.

#### 5. Reflection

Great work! Let's take a chance to think about what we've seen so far.

- In what cases does using a single CoT prompt call work better than using a ReACT prompt and loop, and vice-versa?
- Suppose you wanted to see if the LLM actually needed the calculator in the ReACT example. How would you modify the ReACT prompt to try it without the calculator? (Try it!)

#### Summary

🎉 Congratulations! 🎉 You've successfully built a functional ReACT agent capable of using tools!

Through this process, you've learned how to:

✍️ Craft a ReACT prompt specifically designed to leverage external tools.
⚙️ Parse the Large Language Model's output to identify tool calls and execute them effectively.
🔄 Implement the fundamental ReACT loop, enabling iterative thought, action, and observation.

Keep exploring and building powerful agents! 💯

### Solution: Walkthrough of the ReAct Detective

Now we're going to focus on ReAct prompting. We'll start by creating a ReAct prompt that can call tools, then we'll work on parsing the tool calls, and finally, we'll create the ReAct loop to see it all in action.

::: info Start Workspace
Workspaces will shut down after 30 minutes of inactivity. Any running processes will be stopped.

Workspaces may take up to 5 minutes to start.
:::

#### 1. Crafting the ReAct System Prompt

The first and most important step is to create the ReAct prompt. After we run this prompt for a single step, it should conclude with the AI asking to call a tool. It starts off, "You are a meticulous retail demand analyst," and then provides detailed instructions on how the agent must behave.

A ReAct prompt needs to explain the THINK/ACT cycle clearly.

- **THINK:** Carry out any reasoning needed and conclude with what tool call to take next.
- **ACT:** Specify the tool to use and its arguments.

The prompt must also define the available tools, including their function, an example of how to call them, and the kind of observation they will return. For a long, complicated prompt like this, it's also good to include an example of how it will be used, showing a full interaction between the user, the assistant, and the observations.

Here is the core of the system prompt you created in the exercise:

```python
react_system_prompt = """
You are a meticulous Retail Demand Analyst that can solve any TASK in a multi-step process...

## Instructions:
- You will use step-by-step reasoning by THINKING... and ACTING...
- You will always respond with a single THINK/ACT message...
- As soon as you know the final answer, call the `final_answer` tool...

## Available Tools
* `calculator(expression: str)`: ...
* `get_sales_data()`: ...
* `call_weather_api(date: str)`: ...
* `final_answer(...)`: ...

## Example:
...
"""
```

When we first run this prompt with the user's task, the AI correctly lays out its plan and decides on its first action:

```text
THINK:

First, I need to gather the sales data...
After I have the sales data, I will analyze the percentage increases...
Tool call needed: get_sales_data() to retrieve the sales data.
ACT:
get_sales_data()
```

The full ReACT Prompt:

```python
react_system_prompt = """
You are a meticulous Retail Demand Analyst that can solve any TASK in a multi-step process using tool calls and reasoning.

## Instructions:
- You will use step-by-step reasoning by
    - THINKING the next steps to take to complete the task and what next tool call to take to get one step closer to the final answer
    - ACTING on the single next tool call to take
- You will always respond with a single THINK/ACT message of the following format:
    THINK:
    **********
    ACT:
    **********
- As soon as you know the final answer, call the `final_answer` tool in an `ACT` message.
- **********

## Available Tools
**********

You will not use any other tools.

Example:

--USER MESSAGE--
TASK:
Respond to the query "What was the weather one week ago?". Today is 2024-01-17.

--ASSISTANT MESSAGE--
THINK:

* I need to calculate the date one week ago from 2024-01-17.
* If today is 2024-01-17, then 7 days ago is 2024-01-10.
* I can call the `call_weather_api` tool to get the weather data for 2024-01-10.
* After that, if I have the weather data, I can return the final answer using the `final_answer` tool.
* Tool call needed: Call the `call_weather_api` tool for 2024-01-10.
ACT:
call_weather_api(date="2024-01-10")

--USER MESSAGE--
OBSERVE:
{"date": "2024-01-10", "weather": "Sunny"}

--ASSISTANT MESSAGE--
THINK:
ACT:
final_answer("The weather on 2024-01-10 was sunny.")

--USER MESSAGE--
OBSERVE:
The weather on 2024-01-10 was sunny.
"""
```

#### 2. Parsing and Calling the Tools

Next, we need the Python code that acts as the "orchestrator." This code takes the `ACT:` response from the AI, parses it, and calls the corresponding tool function.

One key part of this is the `calculator` function. Rather than using Python's built-in `eval()`—which can be dangerous because it can execute arbitrary code—we use a `safe_eval` function that only allows basic math operations.

The `get_observation_message` function is the core of our orchestrator. It uses regular expressions to parse the `ACT:` string and call the correct tool, whether it's `get_sales_data`, `call_weather_api`, or `calculator`. If the tool call is invalid, it returns an error message that the agent can use to correct itself in the next step.

#### 3. Creating the ReAct Loop

Now it's time to see our agentic workflow in action! We put the ReAct prompt and the tool-calling logic into a loop. At the core is a messages list where we append the THINK/ACT messages from the AI and the OBSERVE messages from our tool calls to maintain the history of the conversation.

Let's look at the message history.

- **Step 1:** The AI thinks, "I need to identify the sales data," and its action is `get_sales_data()`. The system runs the tool and returns the sales data as an observation.
- **Step 2:** The AI sees the data and thinks, "Now I have sales data for several days. I need to calculate the percentage increase." Its action is `calculator(expression="((9216.9 - 3072.3) / 3072.3) * 100")`. It's interesting that the model knew which dates to use for the calculation and now uses the calculator tool to get an accurate answer. The system returns the observation "200.0".
- **Step 3:** The AI sees the 200% increase and thinks, "Now I need to investigate the weather." Its action is `call_weather_api(date="2024-01-12")`.
- **Step 4:** The AI sees the weather was "Heavy Rain" and thinks, "The weather on January 12 was characterized by heavy rain... Next step: call the final_answer tool." Its final action provides all the details.

That's it! Give yourself a hand for building your first agentic workflow. Keep exploring and building powerful agents!

## Prompt Instruction Refinement

LLMs such as ChatGPT, Google Gemini and Claude understand and generate human-like language well, but their output is not always what you expect. **Prompt instruction refinement** means adjusting your instructions to get more precise and relevant output. Better prompts lead to better results across a wide range of tasks. The goal of this lesson is LLM prompt optimization: moving from basic interaction to sophisticated control over LLM behavior.

### What this lesson covers

- The components of a prompt.
- Strategies for systematically adjusting instructions to get more targeted results.
- How to evaluate the differences between prompt versions.
- Best practices and common pitfalls.
- A practical example comparing several prompt versions on coding tasks.

### Components of a prompt

An effective prompt is more than a question. It is usually built from five elements:

| Component | What it does |
|---|---|
| **Role** | Gives the AI a persona that shapes its output and style. It isn't just about making it fun: a role can improve performance on many tasks. |
| **Task** | The core intent. For complex tasks, give a detailed task with clear goals. |
| **Output format** | How the response is structured: JSON, CSV, markdown or a custom format. Crucial for usable results, especially when you parse them with normal code. |
| **Examples** | One-shot or many-shot input/output pairs. The AI learns specific patterns from them or mimics the behavior you want. |
| **Context** | Background the AI needs: data to process, references to rely on, or a description of the agent's working environment. |

::: tip
Label the sections of the prompt with phrases such as `Output format:` or `Example:` to make each part clear.
:::

### Example: a pirate ship agent

The prompt sets up an agent that answers only questions about a ship. The chat starts with the prompt components (role, task, output format, example, context); only the example section is clearly labeled. Then we try the agent with three questions:

| Question | Agent's answer |
|---|---|
| What's the date? | "Me knows not." |
| What's the ship's name? | "She be called the Neptune's Fury. A right terror over the waves." |
| How old is the ship? | "She be old enough to have seen horrors ye wouldn't believe, yet spry enough to outrun any Navy dog." |

### What the example shows

- The answers may be the behavior we want, but the agent cannot give the ship's age, because the age is **not in the context**.
- The model did not invent an age, which is good.
- If we need the age, or anything beyond the ship's name, we have to **refine the prompt** and add that information to the context.

::: takeaway
A prompt is built from role, task, output format, examples and context. When the output is missing something, check which component is missing it, then refine that part of the prompt.
:::

### Prompt Instruction Refinement: Optimizing LLM Outputs

Prompt instruction refinement is about evaluating and refining prompt instructions to produce more precise LLM outputs.

LLMs are fantastic at understanding and generating human-like language. However, sometimes their outputs aren't quite what you expected. This is where the "art and science" of tailoring your prompts comes in. Prompt engineering is essential to effectively interact with AI systems and optimize their performance. Better prompts lead to improved results.

We’ll explore:

- Analyzing the components of a prompt.
- Strategies for systematically adjusting these instructions for more targeted results.
- How to evaluate the differences between prompt versions.
- Best practices for adjusting prompts.
- Common pitfalls to avoid.
- Comparing multiple prompt versions on coding tasks. This is all about LLM Prompt Optimization, empowering you to move from basic interaction to sophisticated control over LLM behavior.

#### Prompt Components Revisited

An effective prompt for an LLM is typically composed of several key elements:

- **Role:** Assigning a specific role or persona (e.g., "Act as a pirate").
- **Task:** The core intent, defining the goal (e.g., "Respond only to questions about your ship."). For complex tasks, provide clear, detailed goals.
- **Output Format:** Specifies how the AI should structure its response (e.g., JSON, CSV, "A sentence in Markdown.").
- **Examples:** (1-shot or many-shot examples) Show the AI desired input-output pairs (e.g., "Q: What is 1+1 / A: Me knows not!").
- **Context:** Background information relevant to the task (e.g., "Ship name: Neptune’s Fury").

Let's consider an agent set up to respond only to questions about a ship: `"Act as a pirate. Respond only to questions about your ship. Output sentences in Markdown. Example, Q: What is 1 + 1 / A: Me knows not! Your ship’s name: Neptune’s Fury."`

- If we ask for the date, it responds: "Me knows not!"
- If we ask for the ship's name: "She be called the Neptune’s Fury, a right terror o' the waves!"
- If we ask how old the ship is: "Arr, she be old enough t' have seen horrors ye wouldn't believe, yet spry enough t' outrun any Navy dog!"

This behavior might be what we want. However, if we actually know the ship's age and want the LLM to use it, we need to include that age in the context. The model, thankfully, didn't invent an age, but we need to adjust the prompt if we want it to know more than just the name.

## Best Practices

Each component of a prompt controls a different part of the output. Knowing which component does what lets you change the right thing when the result is not what you want.

### How each component affects the output

| Change the... | What changes in the output |
|---|---|
| **Role** | The persona, tone, style and perspective. It shapes the language used and the lens through which the information is presented. |
| **Task** | The core action the LLM performs, plus its requirements and limits. A different task gives a fundamentally different type of output. |
| **Output format** | The structure and presentation: how the information is organized and delivered, without necessarily changing the content itself. |
| **Examples** | The style, structure, level of detail and quality. Adding or changing examples helps the model understand nuanced requirements and follow the patterns shown. |
| **Context** | The background information, data or scope. It sets the factual basis the LLM uses for its answer. |

### Why change one thing at a time

Think of tuning a complex instrument: a small adjustment to a string or a valve can change the sound drastically. In the same way, a minor wording change, adding or removing a constraint, or a different persona can change the LLM's response a lot.

Making **one or a few targeted changes at a time** shows you which parts of the prompt influence the output, and how. This matters because LLMs are not magical systems: they don't understand your implicit intent and rely entirely on the instructions you provide.

### Worked example: a food recommendation

The starting prompt:

| Component | Value |
|---|---|
| **Role** | A cheerful food blogger |
| **Task** | Recommend a unique local dish, under 75 words, focus on taste, do not name any specific restaurants |
| **Output format** | A single paragraph with a hook |
| **Context** | Target audience: first-time visitors to New Orleans looking for unique fusion flavors |

**Result:** the AI recommends **Yakamein**, opening with the hook "Ready for a taste adventure?". It follows the prompt and matches the style of a cheerful food blogger.

Now change one component at a time:

::: steps
- **Role:** change it to a high-dining food critic and connoisseur, and compare the response with the food blogger's.
- **Task:** tighten the constraint to 15 words or less. The response gets even shorter.
- **Output format:** ask for JSON with the fields `dish title` and `description`. The model returns that format, which is useful when you want to parse the JSON later.
- **Examples:** change the examples to all capital letters, without adding any instruction about caps. Only the start of the output is capitalized, not the whole response.
- **Context:** left as an exercise. It works the same way: change it and compare the results.
:::

### Why the caps example only half worked

Updating the examples alone was not enough to make the whole output capitals, and it shouldn't be. The prompt never said to use caps, and it never said not to. The model was still following the instructions it had. If you want all caps, say so explicitly in the instructions, and don't rely on examples alone.

::: important
The components are not fully independent. The **task**, the **examples** and the **output format** can all affect how the output is formatted, so be careful when you change any one of them.
:::

::: takeaway
Change one component at a time and examine the result. This turns prompt engineering into a more scientific process: you learn what each part of the prompt controls, and you stay specific and explicit about what you want.
:::

### Systematically Adjusting Prompt Components

Modifying each prompt component affects the LLM's output:

- **Role:** Changes the persona, tone, style, and perspective (e.g., "helpful assistant" vs. "skeptical historian").
- **Task:** Alters the core action and its constraints (e.g., "summarize this text" vs. "translate this text" or "write a poem under 50 words").
- **Output Format:** Dictates the response's structure (e.g., bullet points vs. paragraph, JSON vs. plain text).
- **Examples:** Refines the output's style, structure, detail, and quality by showing desired patterns.
- **Context:** Modifies the background information and scope used (e.g., providing a different article to summarize).

Think of it like tuning an instrument; small adjustments can drastically change the sound. Minor wording changes or specifying a different persona can significantly alter an LLM's response. These models rely entirely on the explicit instructions you provide. A systematic approach, making one or a few targeted changes at a time, helps you understand how prompt aspects influence output.

### Exploring Prompt Differences with an Example

Let’s consider a task: recommend a unique local dish in New Orleans for first-time visitors seeking unique fusion flavors. The response should be under 75 words, focus on taste, not name specific restaurants, be a single paragraph with a hook.

#### 1. Modifying the Role

- **Role:** 'Cheerful food blogger'
  - **Output:** "Ready for a taste adventure found only in New Orleans? You have to try Yakamein! Picture this: a wonderfully savory, beefy noodle soup that marries soulful Creole spices with a salty, …" (Responds correctly and matches the style).
- **Role:** 'High-Dining Food Critic and Connoisseur'
  - **Output:** "Ready to taste New Orleans beyond gumbo? Seek out Yakamein, the city's soulful answer to noodle soup. Often called "Old Sober," this unique fusion features savory, rich beef broth swimming with tender noodles, Creole spices, and …" (Style changes to be more sophisticated).

#### 2. Modifying the Task (Constraint)

- Let's update the constraint to make the response even shorter: 15 words or less.
- **Output (with 'Cheerful food blogger' role):** "Spice lover? Taste explosive Viet-Cajun crawfish – garlicky, buttery, fiery fusion magic awaits!"

#### 3. Modifying the Output Format

- Suppose we want JSON to separate the dish title and description.
- **Format:** JSON of the format `{"dish_title": ..., "description": ...}`
- **Output:**

```json
{ "dish_title": "NOLA's Secret Soup: Yakamein!", "description": "Forget gumbo for a sec and try Yakamein! This soulful noodle soup boasts a rich, spicy beef broth swimming with noodles and savory surprises. It's a unique Creole-Asian flavor adventure you won't forget! Comfort food with a NOLA twist." }
```

This is useful for parsing.

#### 4. Modifying the Examples

- Let’s say we want the output in ALL CAPITAL LETTERS. We could add this constraint in the instructions, but let's try just updating the examples provided.
- If an example is given in ALL CAPS: The model might start its response in ALL CAPS but not continue it entirely.
- **Output (with 'Cheerful food blogger' role and all-caps example):** "READY FOR A FLAVOR EXPLOSION unlike any other? Dive headfirst into amazing Viet-Cajun Crawfish! Picture perfectly boiled crawfish …"
- **Observation:** Just updating the example was not enough to get the whole output in capital letters. This shows the importance of being specific and explicit in instructions. The model was still following instructions; it wasn't told not to use mixed case after starting with capitals.

The process of modifying one component at a time and examining results allows a more scientific approach to prompt engineering. Components are not always independent (e.g., both task and output format can affect formatting).

### Prompt Refinement Best Practices

- **Write Clear and Detailed Instructions:** Be precise and descriptive. Don't assume the model reads your mind.
- **Use Roles or Personas:** Helps adopt the desired tone and style.
- **Break Down Complex Tasks:** Divide into smaller, simpler stages. Asking the model to "think in steps" (Chain of Thought) can be helpful.
- **Specify Output Format and Constraints:** Clearly state structure (JSON, bullet points) and limitations (word count, language).
- **Include Few-Shot Examples:** Input-output examples are often extremely helpful.
- **Provide Relevant Context:** Give the model information needed for accuracy, especially for factual tasks.
- **Optimize Tool Descriptions (for Agents):** Ensure tool descriptions and input/output formats are clear for the LLM to make correct decisions. These go into the context.

Following these practices is like providing a clear recipe; it reduces misinterpretation.

### Common Pitfalls in Prompting

- **Ambiguity:** Unclear instructions lead to unpredictable results. Future models still won’t know about instructions you didn’t write.
- **Insufficient Context:** Expecting the LLM to know unprovided information leads to errors or hallucinations.
- **Too Much Context or Competing Instructions:** Overwhelming with irrelevant info or conflicting instructions degrades performance. Balance is key.
- **Poor Tool Descriptions (in Agents):** LLM won't know how/when to use tools correctly.
- **Expecting Magical Understanding:** These are probabilistic systems, not omniscient. Precision is required.
- **Bias and Factuality Issues:** LLMs can hallucinate and reflect training data biases. Validate outputs for critical tasks.
- **Adversarial Prompting Risks:** Prompts can be exploited for injection, leaking, or jailbreaking. Expect unintended uses.

Overcoming these pitfalls is iterative: write, test, analyze errors, and refine. The way you instruct one LLM might differ from another, even from the same company.

### Example: Marketing Social Media Post

Let's refine a prompt for generating a social media post for a new "EverGreen" reusable coffee cup.

- **Initial Task:** "Write a social media post about the new "EverGreen" reusable coffee cup."
- **Initial Output:** "Check out the new EverGreen reusable coffee cup! It's great for your coffee on the go."
- **Manual Evaluation:** Too brief, lacks engagement, no benefit highlights or call to action.

#### Refinement Step 1: Add Context

- **Context:** "The "EverGreen" reusable coffee cup is durable, eco-friendly, and keeps drinks hot for hours. It helps users reduce waste and enjoy their coffee anywhere."
- **Output:** "New EverGreen reusable coffee cup is here! It's durable and eco-friendly. Keep your coffee hot for hours and help the planet by reducing waste."
- **Manual Evaluation:** Better, includes benefits and eco-friendly value. Tone is still dry, no strong call to action.

#### Refinement Step 2: Add Role and Constraints

- **Role:** "You are a friendly and enthusiastic social media manager for a sustainable lifestyle brand."
- **Constraints:** "Keep it positive and encouraging. Include a call to action to buy now or learn more on our website. Use emojis to keep it visually engaging."
- **Final Output:** "Hey eco-coffee lovers! ✨ Meet the new EverGreen cup! Made from recycled materials, it's super durable & keeps your brew hot for 6 hours. Sip sustainably and reduce waste with every use! 🌎 Shop now: [link]"
- **Evaluation:** Much better! The iterative process of modifying components based on evaluating previous outputs is fundamental.

### Best Practices for Prompt Refinement

The more clarity and guidance you provide, the less room there is for an LLM to provide its own interpretation of an instructions, which can lead to undesired outputs.

- **Write Clear and Detailed Instructions:** The more precise and descriptive your instructions, the better the model will understand your intent. Don't assume the model can read your mind; tell it everything you want it to do.
- **Use Roles or Personas:** Assigning a specific role can help the model adopt the desired tone and style for the task.
- **Break Down Complex Tasks:** If a task is too complex, break it into smaller, simpler stages. Avoiding overly convoluted requests can help. In fact, asking the model to think about the problem before providing the final answer can be useful. If you ask it to "think in steps," it's called Chain-of-Thought, and you can even suggest the steps it should take.
- **Specify Output Format and Constraints:** Clearly state how you want the output structured (e.g., JSON, bullet points) and any limitations, like word count or phrases to include.
- **Include Few-Shot Examples:** Providing input-output examples is often extremely helpful for guiding the model's response style, format, and task execution.
- **Provide Relevant Context:** Give the model the information it needs to perform the task accurately, especially for factual information or tasks requiring specific knowledge.
- **Optimize Tool Descriptions:** If your prompt is part of an agentic system using tools, spend significant time making sure the tool descriptions and their input/output formats are clear. This helps the LLM make correct decisions about when and how to use them.

Without a common recipe, the bakers will likely create bread in all different ways. You'll get different sorts of bread, and they might all be delicious, but not exactly what you need for your purposes.

#### Common Pitfalls to Avoid

Overcoming these pitfalls requires careful consideration and testing. It's an iterative process: you write a prompt, test it, analyze the output to understand why it failed, and then refine your prompt to mitigate the issue.

- **Ambiguity:** This is perhaps the most common pitfall. If your instructions are unclear or open to multiple interpretations, the LLM might choose one you didn't intend. Better models of the future still won't know about the instructions you didn't write down.
- **Insufficient Context:** Expecting the LLM to know information it hasn't been given is a guaranteed way to get incorrect or hallucinated outputs. Remember, it doesn't have access to your personal files or real-time private data.
- **Too Much Context or Competing Instructions:** While context is good, overwhelming the model with irrelevant information or giving conflicting instructions can degrade performance. Finding the right balance is key.
- **Poor Tool Descriptions:** As mentioned before, poorly described tools mean the LLM won't know how or when to use them correctly.
- **Expecting Magical Understanding:** Don't trust the hype. These are not omniscient systems that understand your underlying intent perfectly. They are probabilistic systems that rely heavily on your explicit instructions. Prompting requires precision.
- **Bias and Factuality Issues:** LLMs can generate incorrect information and reflect biases present in their training data. Always validate their output, especially for critical tasks.
- **Adversarial Prompting Risks:** Be aware that prompts can be exploited for prompt injection, leaking, or jailbreaking. Always expect a model to be used in unintended ways.

#### Example: Refining a Social Media Post

Let's consider the task of generating a social media post for the new "EverGreen" reusable coffee cup.

- **Initial Prompt:** "Write a social media post about the new Evergreen reusable coffee cup."
- **Initial Output:** The output is generic and too brief. It lacks engagement and doesn't highlight benefits or encourage action.
- **Add Context:** We refine the task by providing context, such as the product's benefits and the company's eco-friendly values.
- **New Output:** The response is better, as it includes benefits and connects with the target audience's values. However, the tone is still a bit dry, and it lacks a strong call to action.
- **Add Role and Constraints:** We assign a role ("a friendly and enthusiastic social media manager") and add a constraint to include a call to action.
- **Final Output:** The final output is much better than what we started with. The tone is engaging, it highlights benefits, and it includes a clear call to action. All we did was adjust our prompt.

This iterative process—where each step involves modifying components like context, task, and role—is fundamental to prompt engineering. It showcases how different prompt elements work together to shape the final response.

### Key Points from the Video

#### The bakers' recipe

- Following best practices is like giving a recipe to a group of bakers who are all making bread.
- The more clarity and guidance you give, the less room the LLM has for its own interpretation. That interpretation is not necessarily incorrect, but it can still be undesired.
- Without a common recipe, every baker makes bread differently. They might all be delicious, just not what you need, for example if you plan on having a sourdough party.

#### Best practices

| Practice | Key point |
|---|---|
| **Clear, detailed instructions** | The more precise and descriptive, the better the model understands your intent. It can't read your mind: tell it everything you want it to do. |
| **Roles or personas** | A specific role helps the model adopt the desired tone and style. |
| **Break down complex tasks** | Split a complex task into smaller, simpler stages. This relates to prompt chaining, but even within a single prompt, avoid overly convoluted requests. Asking the model to think in steps before the final answer is Chain-of-Thought, and you can even suggest the steps. |
| **Output format and constraints** | State the structure (JSON, bullet points) and the limits (word count, phrases to include). |
| **Few-shot examples** | Input-output examples guide the response style, format or task execution. |
| **Relevant context** | Give the information the task needs, especially for factual information or specific knowledge. |
| **Tool descriptions** | In agentic systems, spend significant time making tool descriptions and input/output formats clear so the LLM decides correctly. These descriptions eventually go into the context. |

#### Pitfalls

| Pitfall | Key point |
|---|---|
| **Ambiguity** | The most common pitfall. Unclear instructions, vague terms or missing constraints let the LLM pick an interpretation you didn't intend, so results are unpredictable. Better future models still won't know instructions you didn't write down. |
| **Insufficient context** | Expecting knowledge it wasn't given guarantees incorrect or hallucinated output. It has no access to your personal files or real-time private data. |
| **Too much context or competing instructions** | Too much irrelevant information or conflicting instructions degrade performance. Balance is key. Future models should sift irrelevant data better, but competing instructions will still be impossible to handle. |
| **Poor tool descriptions** | The LLM won't know how or when to use the tools correctly. |
| **Expecting magical understanding** | Don't trust the hype. LLMs are probabilistic systems, not omniscient, and rely heavily on explicit instructions. Prompting requires precision. |
| **Bias and factuality** | LLMs can generate incorrect information and reflect training-data biases. Relying on output without validation, especially for critical tasks, is a pitfall. |
| **Adversarial prompting** | Outside basic refinement, but prompts can be exploited for prompt injection, leaking or jailbreaking. Always expect unintended uses. |

#### Overcoming pitfalls is iterative

::: steps
- Write a prompt.
- Test it, and you will likely hit one of the pitfalls.
- Analyze why the output failed, using error analysis.
- Refine the prompt to mitigate the issue.
:::

- It is a continuous process of learning how your specific LLM responds to different types of instructions.
- Instructions that work for one LLM (say, from Anthropic) may need to be very different for another (say, from OpenAI), or even for different models from the same company.

#### Marketing example: the EverGreen cup post

AI agents are increasingly used in marketing for campaign generation, personalized outreach, promotional content and automated data analysis for insights.

| Step | What changed | Result |
|---|---|---|
| **1. Initial task** | "Write a social media post about the new EverGreen reusable coffee cup." | Generic. Reviewed manually as a social media marketing expert: too brief, no engagement, no benefits, no call to action. |
| **2. Add context** | The product's benefits and the company's values. Refining the task also sets a clear goal: highlight benefits. | Better: includes benefits and the audience's eco-consciousness. Tone still dry, no strong call to action. |
| **3. Add role and constraint** | A role gives a persona and tone that suit marketing. A constraint guarantees the key marketing element: the call to action. | Much better than the start, and only the prompt was adjusted. |

Each step modifies a component (context, task, role), showing how the prompt elements work together to shape the final response.

::: takeaway
- A prompt is built from role, task, output format, examples and context.
- Adjusting these components systematically changes the output, and small changes can have big effects.
- Examine the output differences between prompt variations to drive iterative refinement.
- Best practices help you avoid pitfalls such as ambiguity and insufficient context.
- Start simple, test, and refine based on the results. Like software engineering, this iterative development is how you build effective LLM applications, from simple tasks to complex agentic systems.
:::

## Quiz

::: match {id=l132-match} Quiz Question
Match the strategies used for optimizing LLM prompts with their respective descriptions.

heads: Prompt Optimization Strategies | Optimization Strategy
- Modifying role to change tone and perspective. => Adjust Role
- Providing specific examples to guide the model's output style. => Use Examples
- Clarifying output structure to achieve consistent formatting. => Define Output Format
- Streamlining tasks into simpler steps to enhance engagement. => Break Down Tasks
:::

## Summary

### 🏆 Congratulations on Mastering Prompt Instruction Refinement! 🏆

You've dedicated your time and focus to learning a truly important skill: how to systematically refine your instructions to get dramatically better results from Large Language Models.

You have gained practical abilities in:

- **Systematic Prompt Analysis:** You can now look at a prompt, identify its different parts (Role, Task, Context, Examples, Output Format), and pinpoint areas that need improvement.
- **Iterative Prompt Development:** You've practiced the core technique of making targeted changes, testing, and building upon your prompts to steadily enhance the AI's output. This includes:
  - **Assigning Roles** for specialized behavior.
  - **Enriching Context** to give the AI the knowledge and rules it needs.
  - **Clarifying Tasks** to remove doubt about the AI's objective.
  - **Controlling Output Formats** for structured and useful information.
  - **Guiding with Examples** (Few-Shot Prompting) to demonstrate desired responses.
- **Troubleshooting AI Outputs:** By understanding prompt components, you're better equipped to figure out *why* an AI might not be giving you the response you want and *how* to fix it by adjusting the prompt.

This practice of analyzing, refining, and testing is something you can apply to any task where you're working with AI. Keep this iterative mindset!

## Applying Prompt Instruction Refinement with Python

## Prompt Instruction Refinement

### From Vague Ideas to Precise Instructions

When an AI gives you a response that isn't quite right, what's your first instinct? Many people assume they just need to add more words or make the prompt longer. But is a longer prompt always a better prompt?

The key isn't just adding more detail; it's adding the right kind of detail in a structured way. Let's see this in action.

**Scenario:** We need an AI to categorize incoming customer support emails for an automated ticketing system.

#### Attempt 1: The Vague Prompt

Let's start with a simple, vague prompt and see what we get.

```python
# The customer's email
customer_email = """
Hi, I'm writing because I was charged twice for my last order (Order #8675309).
I thought my subscription was paused. Can you please look into this and reverse the extra charge?
Thanks,
Alex
"""

# The vague system and user prompts
system_prompt_vague = "You are a helpful assistant."
user_prompt_vague = f"Please categorize the following email:\n\n{customer_email}"

# Let's see the likely response
# response = get_completion(system_prompt_vague, user_prompt_vague)
# print(response)
```

**Likely Output:** `This email appears to be a billing issue related to a double charge on an order.`

This response is correct, but it's not very useful for an automated system. A downstream program can't easily parse this sentence to create a support ticket, assign it to the right department, or set its priority. We need more structure.

#### Attempt 2: The Refined, Structured Prompt

Now, let's refine our instructions.

- We will add a specific Role,
- clear Task instructions
- with Context (definitions of the categories),
- and a required Output Format (JSON).

```python
system_prompt_refined = """
You are an expert customer support agent responsible for categorizing incoming emails for a ticketing system.

Your task is to analyze the user's email and provide a structured JSON output.

## Email Categories:
- **Billing:** For issues related to charges, subscriptions, or refunds.
- **Technical Support:** For problems with product functionality or bugs.
- **General Inquiry:** For questions that do not fit the other categories.

## Output Format:
You must respond with a single JSON object containing the following keys:
- `category`: (string) One of "Billing", "Technical Support", or "General Inquiry".
- `summary`: (string) A one-sentence summary of the user's issue.
- `urgency`: (string) "High", "Medium", or "Low".
- `customer_id`: (string) Extract the order number or customer ID if available, otherwise "N/A".
"""

user_prompt_refined = f"Please analyze and categorize this email:\n\n{customer_email}"

# response = get_completion(system_prompt_refined, user_prompt_refined)
# print(response)
```

**Likely Output:**

```json
{
  "category": "Billing",
  "summary": "The customer was charged twice for order #8675309 and is requesting a refund for the extra charge.",
  "urgency": "High",
  "customer_id": "8675309"
}
```

By refining our prompt with structured instructions, we transformed the AI's output from a simple sentence into a reliable, machine-readable JSON object. This is the power of prompt instruction refinement.

## Exercise

### Exercise Introduction: Crafting Precise Prompts for Dietary Analysis

In this exercise, you'll put the principles of **Prompt Instruction Refinement** into practice. You've learned that the way you structure your instructions to an LLM greatly influences the quality, accuracy, and usefulness of its responses. Now, you'll apply that knowledge to a practical task: getting an LLM to accurately analyze recipes against a list of dietary restrictions.

**The Challenge: From Basic Classification to Detailed Analysis**

Imagine you give an LLM a recipe and a list of dietary needs. You ask it to tell you if the recipe fits each need. With a simple prompt, the LLM might give you a quick "yes," "no," or "maybe" for each. But is that enough?

- What if an ingredient is ambiguous (like "broth" – is it vegetable or chicken?)?
- How does it handle "optional" ingredients that could violate a restriction?
- Will it explain *why* a recipe doesn't meet a certain need, and pinpoint the problem ingredient(s)?
- Can you get the output in a consistent, structured format that includes these explanations?

How do you refine an initial, basic prompt step-by-step to turn the LLM into a more careful and informative dietary analyst, producing results you can better understand and trust?

**Your Mission: Becoming a Prompt Refinement Specialist**

In this exercise you will take an initial prompt designed for recipe and dietary analysis and iteratively improve it. You will:

1. Evaluate an initial, simple prompt and identify its shortcomings.
2. Analyze the different **components of the prompt** (like Role, Task definition, Context, Output Format, and Examples).
3. Methodically **refine the prompt** by adding clarity, providing necessary context (like definitions for dietary restrictions), specifying a more detailed output structure, and guiding the LLM on how to handle uncertainties.
4. Test your refined prompts with different recipes to see the improvement in the LLM's analysis.

::: info Start Workspace
Workspaces will shut down **after 30 minutes of inactivity**. Any running processes will be stopped. Workspaces may take up to 5 minutes to start.
:::

### Instructions

Follow these steps within the "Lesson 3: Prompt Instruction Refinement - Matching Recipes to Dietary Restrictions" Jupyter Notebook:

1. **Open the Notebook:** Launch the exercise notebook from your Udacity classroom.
2. **Initial Setup:**
   - Add your API Key
3. **Review Sample Data:**
   - Load `sample_recipes` and `dietary_restrictions`. Familiarize yourself with this data as it will be used for testing your prompts.
4. **Initial Prompt and Evaluation:**
   - Examine the `initial_prompt` and the `format_prompt` function (using Jinja2 for templating).
   - Test the `initial_prompt` with the "Classic Spaghetti Bolognese" recipe.
   - **Your Task:** Observe the `initial_response`. Note its structure and the classifications it provides. Is it giving explanations? How does it handle something like "kosher"?
5. **Prompt Component Analysis:**
   - Read through the "Prompt Component Analysis" and "Initial Analysis of Problems" sections in the notebook. This guides you to think about what's lacking in the `initial_prompt`.
6. **Prompt Refinement Iteration 1:**
   - This cell contains your first `TODO`. You need to complete the definitions for various dietary restrictions and provide clear guidelines for the classification logic.
   - **Your Task:** Fill in the `**********` placeholders.
   - After filling in the `TODOs`, test `refined_prompt_1` with the same spaghetti recipe.
   - **Your Task:** Observe the `Iteration 1 response`. Notice how the output now includes explanations and critical ingredients due to your improved prompt.
7. **Prompt Refinement Iteration 2:**
   - This cell contains your second `TODO`. You'll add more guidance on handling common ambiguities in recipes and complete an example within the prompt.
   - **Your Task:** Fill in the `**********` placeholders in the "Handling ambiguities" section.
   - After filling in the `TODOs`, test `refined_prompt_2` with the "Vegetable Stir Fry" recipe.
   - **Your Task:** Analyze the `Iteration 2 response`. Does the LLM handle ambiguities (like "soy sauce" for gluten-free, or "sesame seeds" for nut-free) more thoughtfully now?
8. **Testing with Multiple Recipes:**
   - Test your `refined_prompt_2` with the "Chocolate Chip Cookies" recipe.
   - **Your Task:** Observe the response. Check if the classifications and explanations are consistent and accurate for this different type of recipe (e.g., how it handles "butter" for dairy-free/vegan, "all-purpose flour" for gluten-free, and "chopped nuts (optional)" for nut-free).

### Solution: Walkthrough of Prompt Refinement

This is the solution walkthrough for our exercise on prompt instruction refinement, where we guided an LLM to match recipes to dietary restrictions. Let's go through the steps we took to improve the prompt.

The goal: refine a prompt that tells an LLM to read a recipe and a list of dietary restrictions, then classify each restriction as **satisfied**, **not satisfied** or **undeterminable** from the information given.

The notebook follows these steps:

::: steps
- Setup
- Sample recipes and dietary restrictions
- Initial prompt and evaluation
- Prompt component analysis
- Iteration on the prompt components
- Test on another recipe and compare the results
:::

#### 1. Setup

- Import the needed libraries, notably **OpenAI**, plus **Jinja2** for templating.
- Set up OpenAI to use the **Vocareum** endpoint.
- Helper functions: an Enum that lists the OpenAI models (the exercise uses **GPT-4.1 nano**), and `get_completion`, a thin wrapper around OpenAI's `chat.completions`.

#### 2. Sample recipes and dietary restrictions

| Recipes | Dietary restrictions |
|---|---|
| Spaghetti Bolognese, Vegetable Stir Fry, Chocolate Chip Cookies (dessert) | Vegetarian, vegan, gluten-free, dairy-free, nut-free, egg-free, low sodium, keto, paleo, kosher |

#### 3. Initial prompt and evaluation

The initial prompt is about as plain as you can get:

- Analyze the recipe and decide whether it satisfies each dietary restriction in the list.
- Classify each one as satisfied, not satisfied or undeterminable, based on the recipe information.
- Then the recipe, its ingredients and instructions, and the restrictions to check. In Jinja, double curly braces `{{ }}` insert the variables.
- Finally: "Please provide your response in JSON format."

The `format_prompt` function turns the ingredients into a bulleted list, the instructions into a numbered list and the restrictions into a list, then uses Jinja to fill in the template.

**Result for Spaghetti Bolognese:**

| Restriction | Result | Why |
|---|---|---|
| Vegetarian | Not satisfied | Contains meat |
| Vegan | Not satisfied | Contains meat |
| Gluten-free | Not satisfied | Spaghetti |
| Dairy-free | Not satisfied | Cheese |
| Nut-free | Satisfied | |
| Egg-free | Satisfied | |
| Low sodium | Not satisfied | |
| Keto | Not satisfied | |
| Paleo | Not satisfied | |
| Kosher | Undeterminable | |

The "Why" column is the walkthrough's own explanation; the model itself gave no reasons. The results look good and may well be correct, but a **labeled dataset** would be needed to truly evaluate them.

#### 4. Prompt component analysis

Recall the components of a prompt: role, task, output format, examples and context. Looking at the response, there are four problems to fix:

| Problem | Fix |
|---|---|
| 1. No explanation for the classifications | Update the **output format** to include explanations |
| 2. Ingredients may be misinterpreted | Add more detail about ingredients to the **context** |
| 3. Unclear handling of ambiguities | |
| 4. No explanation for undeterminable items | |

#### 1. The Initial Prompt and Evaluation

First, we started with a very plain initial prompt. We asked the model to analyze a recipe and determine if it satisfied a list of dietary restrictions, providing the response in JSON format.

When we tested this with the "Classic Spaghetti Bolognese" recipe, the results looked pretty good on the surface. It correctly identified that the recipe was not vegetarian, vegan, gluten-free, or dairy-free. However, as noted in the walkthrough, there were clear areas for improvement:

- A lack of explanation for why a recipe was classified a certain way.
- The potential for the AI to misinterpret ingredients.
- Unclear handling of ambiguities in recipes.
- No explanation for "undeterminable" items.

Essentially, we got an answer, but we didn't get the reasoning behind it, which is crucial for building trust and understanding.

#### Refinement Iteration 1: definitions, rules and explanations

The refined prompt adds:

- **Context:** a section that defines each restriction (what vegetarian means, what vegan means, and so on).
- **Classification rules:**
  - **Satisfied** only if you are certain.
  - **Not satisfied** if any ingredient clearly violates it.
  - **Undeterminable** if you lack sufficient information.
  - For each one, briefly explain your reasoning and identify the specific ingredients.
- **Output format:** for each dietary restriction, an object with:
  - `classification`: satisfied, not satisfied or undeterminable
  - `explanation`: the reasoning for the classification
  - `critical_ingredients`: the ingredients that determine the classification

**Result (Spaghetti Bolognese):** Vegetarian is *not satisfied*. The explanation: it contains ground beef, which is meat and violates the vegetarian restriction. The critical ingredient is ground beef. Instead of a black box, the AI now gives a justified response.

**Analysis of iteration 1:** significant improvements:

- Clear definitions for each dietary restriction.
- Guidelines for deciding classifications.
- Explanations and critical ingredients requested.
- A more detailed output format.

#### Refinement Iteration 2: ambiguities and an example

One more refinement adds two things:

- **Handling ambiguities:**
  - Vegetable oil or an unspecified oil is treated as plant-based unless otherwise noted.
  - Broth or stock matches the recipe's main protein unless otherwise specified.
- **An example analysis:** a simple recipe (basic pancakes: flour, sugar, baking powder, etc.) with example classifications and explanations.

#### Testing on new recipes

**Vegetable Stir Fry:**

- **Vegetarian:** satisfied. It has no meat, poultry, fish or seafood, so there are no critical ingredients.
- **Vegan:** *not satisfied*. The model says it contains soy sauce and possibly other ingredients with animal-derived additives, and calls tofu "animal derived, but acceptable for vegans".

::: warning
This vegan result is wrong: tofu is not animal-derived, and soy sauce, tofu, rice vinegar and sesame oil are generally vegan, just as water is. The model clearly needs more work.
:::

**Chocolate Chip Cookies:**

| Restriction | Result |
|---|---|
| Vegetarian | Satisfied |
| Vegan | Not satisfied |
| Gluten-free | Not satisfied |
| Dairy-free | Not satisfied |
| Nut-free | Undeterminable: chopped nuts are optional, so it depends on whether nuts are used |

The nut-free answer is a good example of handling an optional ingredient correctly.

#### Initial vs. final prompt

| Aspect | Initial prompt | Final prompt |
|---|---|---|
| **Role** | None | Dietary consultant |
| **Context** | Minimal | Detailed definitions of dietary restrictions (definitions of certain ingredients could be added too) |
| **Task** | Analyze and classify | Also give reasoning and identify critical ingredients |
| **Output format** | JSON | Still JSON, with more structure and more fields |
| **Examples** | None | Included |

| Response | Initial | Final |
|---|---|---|
| **Format** | Simple key-value pairs | Structured, with subfields |
| **Accuracy** | Not measured: this needs a ground-truth set | Not measured |
| **Transparency** | No explanation | Explanations |
| **Ambiguity** | Inconsistent, because handling wasn't specified | Clearer and more reproducible once specified |

#### 2. First Refinement: Adding Context and a Structured Output

To address these issues, we refined the prompt. The most important changes we made were:

1. **Adding Context:** We added a section that clearly defined what each dietary restriction means (e.g., "Vegetarian: No meat, poultry, or fish.").
2. **Improving the Output Format:** We updated the instructions to ask for a more detailed JSON object for each restriction, including `classification`, `explanation`, and `critical_ingredients`.

Here is the key addition to the prompt that specified the new output format:

```text
# From the solution notebook
... for each dietary restriction, an object with the following properties:
- Classification, which is either satisfied, not satisfied, or undeterminable.
- Explanation, so a reasoning for this classification.
- And then the critical ingredients. These are the ones that determine the classification.
```

When we ran this refined prompt, the results were much better. For the vegetarian category, the AI now responded:

> "Vegetarian: not satisfied. And so the explanation is: contains ground beef, which is meat, violating vegetarian restrictions. And the critical ingredient is ground beef."

This is great! Rather than being a complete black box, we have a more justified response for the AI.

#### 3. Second Refinement: Handling Ambiguity and Adding an Example

To make the prompt even more robust, we made one final refinement. We added a section on "Handling ambiguities" (e.g., "consider 'vegetable oil' to be plant-based") and a complete few-shot example showing how to analyze a recipe for "Basic Pancakes."

When we tested this final, highly refined prompt with new recipes, we saw even more nuanced results. For the "Vegetable Stir Fry," the model correctly identified it as vegetarian but flagged it as "not satisfied" for vegan, noting that some soy sauces can contain animal-derived additives. While its reasoning about tofu was a bit flawed—a good reminder that models aren't perfect—it demonstrated a more careful thought process. For the "Chocolate Chip Cookies," it correctly identified that the "nut-free" status was "undeterminable" because the nuts were listed as an optional ingredient—an accurate observation.

#### Final Comparison

Let's take a moment to compare our initial prompt to our final one. In terms of the core components:

- **Role:** We went from `none` specified to a `dietary consultant`.
- **Context:** We went from minimal to including detailed definitions for restrictions and rules for handling ambiguity.
- **Task:** We went from a simple "analyze and classify" to asking for detailed reasoning and the identification of critical ingredients.
- **Output Format:** We started with simple JSON and ended with a much more structured and detailed JSON object.
- **Examples:** We went from `none` to including a helpful few-shot example.

This iterative process shows how you can systematically refine a prompt to get a dramatically more transparent, accurate, and useful response from an AI. Excellent work!

## Summary

### Summary: Prompt Instruction Refinement

#### 🏆 Congratulations on Mastering Prompt Instruction Refinement! 🏆

You've dedicated your time and focus to learning a truly important skill: how to systematically refine your instructions to get dramatically better results from Large Language Models.

You have gained practical abilities in:

- **Systematic Prompt Analysis:** You can now look at a prompt, identify its different parts (Role, Task, Context, Examples, Output Format), and pinpoint areas that need improvement.
- **Iterative Prompt Development:** You've practiced the core technique of making targeted changes, testing, and building upon your prompts to steadily enhance the AI's output. This includes:
  - **Assigning Roles** for specialized behavior.
  - **Enriching Context** to give the AI the knowledge and rules it needs.
  - **Clarifying Tasks** to remove doubt about the AI's objective.
  - **Controlling Output Formats** for structured and useful information.
  - **Guiding with Examples** (Few-Shot Prompting) to demonstrate desired responses.
- **Troubleshooting AI Outputs:** By understanding prompt components, you're better equipped to figure out *why* an AI might not be giving you the response you want and *how* to fix it by adjusting the prompt.

This practice of analyzing, refining, and testing is something you can apply to any task where you're working with AI. Keep this iterative mindset!

## Chaining Prompts for Agentic Reasoning

### **Chaining Prompts for Agentic Reasoning**

While Large Language Models (LLMs) are popular, their limitations appear in complex, multi-stage operations, especially those needing access to data not in their training set, like a weather forecast. This is where AI Agents come in. An agent uses an LLM as its "brain" to reason, plan, and act in an environment, often using external tools. We'll develop a multi-step prompt chaining workflow with intermediate validation.

Recall the common components of an AI Agent:

1. **Large Language Model (LLM):** The "brain" for understanding, reasoning, acting.
2. **Tools:** External functions, APIs for interaction and enhanced capabilities.
3. **Instructions:** Guidelines (system prompts) defining behavior and goals.
4. **Memory:** Short-term (context) & Long-term (history) for learning and consistency.
5. **Runtime/Orchestration Layer:** Manages execution flow, tool usage, observation processing.

To achieve complex goals, agents break tasks down and execute them step-by-step, assessing progress. Let's explore a technique to accomplish this called: **Prompt Chaining**.

We’ll cover:

- **Sequential Prompting:** Using it for multi-step reasoning.
- **Task Chaining:** Connecting prompts by feeding one step's output to the next's input.
- **Gate Checks:** Using programmatic validation between steps for quality control.
- **Implementing Gate Checks:** Writing code for automatic verification.
- **Examples:** A prompt chain for a multi-part coding assignment (outline, code generation, validation, refinement).

### Complicated Tasks Need To Be Broken Down

Traditional LLMs are optimized for single-task input-output. Asking a non-baker friend to bake a multi-layered cake with "Bake the cake" wouldn't work. You'd give step-by-step instructions. LLMs are similar. **A single, massive prompt for a complex task often leads to confusion and missed details**. They perform best when guided. Asking an LLM to manage multiple dependencies, execute actions, and verify outcomes all at once can lead to errors.

### Sequential Prompting

Sequential Prompting, or multi-step reasoning, is breaking down a complex task into a series of smaller, manageable sub-tasks (Task 1, Task 2, Task 3). Each sub-task is handled by its own prompt. This is fundamental to agentic workflows.

Instead of: "Research AI agents, summarize the key concepts, and write a LinkedIn post about them.", break it down:

1. **Prompt 1:** "Research key concepts of AI agents." (Get response)
2. **Prompt 2:** "Summarize the output from the previous step." (Get response)
3. **Prompt 3:** "Draft a LinkedIn post based on the summary from the previous step."

You can do this with chatbots like ChatGPT by including a large document, extracting information, then summarizing, then drafting a post, all in the same chat history. This mirrors human problem-solving, allowing focus on one goal at a time, improving accuracy. It also allows individual prompt iteration and improvement. Learning this is a game-changer!

### Conclusion

The video applies these ideas to a common task: a chain that generates a Python script to read a CSV, process the data and write the results to a new file. The chain has three steps: generate an outline, generate the code, and refine the code if it fails a check (detailed in 15.2).

- **Why a chain:** one prompt that reads a CSV, processes the data and writes a new file is hard to get right. An agent splits it into steps, and each prompt does one job: the outline prompt *only* breaks the task into logical steps, and the code prompt *only* turns that outline into code.
- **Gate Check 2 is the crucial one.** Generated code is not trusted until it passes a syntax check, done programmatically (`ast` or a linter) and **without running the code**.
- **The feedback loop:** a failed check sends the code *and* the error messages back to the LLM for correction, then the same check runs again. Retries are capped, for example **3 times**, after which the workflow gives up.
- **Extending the pattern:** the same chain can add steps that run tests on the generated code, do further processing, or call external tools.

::: takeaway
Break the task into steps, link them with prompt chaining, and put a gate check between steps that verifies format, content or logic. Prompt chaining plus intermediate validation is what turns LLM calls into reliable agent workflows.
:::

## Prompt Chaining

### **Prompt Chaining**

Once we have good individual prompts, we need to programmatically call an LLM with them in succession. **Prompt chaining** connects the inputs and outputs of prompts programmatically. The output of one LLM call becomes input for the next, running in code or via an orchestrator. This builds sophisticated, scalable workflows.

For our LinkedIn post:

1. API call 1 `(Research): Prompt: "Research key concepts of AI agents."` **->** `RESPONSE_1`
2. API call 2 `(Summarize): Prompt: "Summarize the following key concepts: {RESPONSE_1}"` **->** `RESPONSE_2`
3. API call 3 `(Draft Post): Prompt: "Draft a LinkedIn post based on this summary: {RESPONSE_2}"` **->** `FINAL_RESPONSE`

### Chaining Tasks Is Essential for Agents

Consider asking: "What time is my dental appointment tomorrow?"

- **Hard-coded workflow:**
  1. LLM determines if calendar data is needed: Prompt: "Will this query require fetching calendar data? QUERY: What time is my dental appointment tomorrow?" -> Output: "Yes."
  2. If "Yes," orchestrator calls get_calendar().
  3. LLM uses calendar data to respond: Prompt: "{get_calendar_output}" -> Output: "Your dental appointment is at 9am."
- **AI Agent (ReAct framework):** The LLM itself is the decision-maker.
  1. User: "What time is my dental appointment tomorrow?"
  2. LLM: THOUGHT: I need to call get_calendar. ACTION: get_calendar(“tomorrow”)
  3. Orchestrator runs get_calendar(), gets "9am".
  4. LLM: OBSERVATION: {“9am”}
  5. LLM: THOUGHT: It is at 9am. Return the final answer. ACTION: final_answer("9am")
     Prompt chaining links these actions.

However, prompt chaining by itself is not reliable enough. LLMs can hallucinate, produce incorrect formats, or fail instructions. An error in an early step can derail the entire process (domino effect). Simply chaining prompts isn't enough for reliable systems. **We need intermediate validation.**

### Conclusion

What the video adds to the text above:

- **Why code, not a chat window:** sequential prompts work by hand in a browser, but putting an agent into production needs the prompts called in code (or by an orchestrator). That makes the workflow repeatable and scalable, and lets it reach far beyond what a single prompt can do.
- **The chain builds on itself:** each call's text result is placed inside the next prompt, so every step works from the previous one and the workflow moves step by step toward the final goal.
- **Who decides the sequence:**

| | Hard-coded workflow | ReAct agent |
|---|---|---|
| **Who decides the steps** | The programmer, in advance | The LLM, choosing the actions and tools for the goal |
| **Calendar example** | A question about an appointment always triggers a calendar fetch, then the LLM answers from the data | The LLM thinks and acts to get tomorrow's calendar; the orchestrator parses that request, fetches the data and returns it as an **Observation** message; in the next loop the LLM sees "9:00 AM" there and returns the final answer |

- In both cases, **prompt chaining is what links the actions into one coherent process**.


## Output Validation: Gate Checks

### Output Validation: Gate Checks

**Gate checks** are programmatic validations placed between steps in a prompt chain. They act as quality control points, ensuring an output meets criteria before being passed on.

- If checks pass: Continue.
- If a check fails: The system can trigger an error and halt, retry the step, or retry the step including the reason for failure in the prompt (to make errors less likely on retry).

**Example**

For a research task, check output formatting and verify quoted text exists in source documents.

- `output = call_llm(prompt_step1, "{SOURCES}")`
- Gate checks for: Formatting, Quoted text exists in source document
  - If YES: Continue to next step...
  - If NO: Raise error, Retry, OR Retry with failed gate check results

Gate checks ensure each "brick" of your LLM workflow is solid. They can be implemented using standard programming code (e.g., Python) or even other LLM-powered checks (for harmful/biased text). They rein in the stochastic and unpredictable behavior of LLMs. A failed check might cause the program to fail (useful for sensitive data) or trigger a retry.

**Types of Gate Checks:**

1. **Format Checks:** Structure (JSON, XML), length, required fields. Libraries like Pydantic or LLM offerings with structured outputs can help.
2. **Content Checks:** Keywords, phrases, topics, relevancy. Regex, semantic embeddings, or other LLMs can be used.
3. **Logic Checks:** Numerical/logical sense. If generating code: does it compile? Does it import restricted libraries? Are extracted numeric values reasonable?

**A Gate Check in Pseudo Code:**

```text
output = call_llm(prompt_step1)
if validate_output(output):
  next_input = process(output)
  call_llm(prompt_step2, next_input)
else:
  handle_error(output)
```

This adds reliability and control, important for AI agents, especially those interacting with external systems.

### Use Case: Data Analysis Script Generation

Task: Create a Python script to read a CSV, calculate the average of a column, and write results to a new CSV.

**Step 1: Generate the Outline**

- **Prompt:** "You are a helpful programming assistant. I need a Python script to read a CSV, calculate the average of a column, and write the results to a new CSV. Please provide a simple step-by-step outline for this script."
- **Expected Output:** A numbered or bulleted list of high-level steps.
- **Gate Check 1 (Optional but good):** Programmatic check for list format and key phrases like "read," "process," "write."

**Step 2: Generate the Code**

- **Prompt:** "Based on the following outline, please write the Python code for the script. Ensure you use standard libraries like 'csv' and 'statistics'. Outline: [Insert Outline from Step 1 Output Here]"
- **Expected Output:** Python code.
- **Gate Check 2: Validate Code Syntax.**
  - **Implementation:** Use Python's ast module or a linter (flake8, pylint) to check the generated code string for syntax errors without running it.
  - **Result:** If syntax check fails, stop or proceed to a refinement step.

**Step 3: Refine the Code (If Gate Check 2 Failed)**

- **Prompt:** "The following Python code, which you generated based on the outline, contains syntax errors: [Insert Code from Step 2 Here]. Error feedback: [Insert Error Messages from Gate Check 2 Here]. Please correct the code based on this feedback."
- **Expected Output:** Corrected Python code.
- **Retry Gate Check 2 (Syntax Validation).** If it passes, move on. If it fails again, we can give up or loop for a maximum number of iterations (feedback loop).

**The Complete Chain:**

1. **Prompt 1:** Create Outline -> Gate Check 1 (Formatting)
2. **Prompt 2:** Write Code -> Gate Check 2 (Check syntax)
3. **(If fail) Prompt 3:** Refinement -> Gate Check 2 (Check syntax)
   - If Gate Check 2 passes -> Completed!
   - If Gate Check 2 fails after retries -> Failed.

This chain combines sequential prompting, programmatic validation, and optional iterative feedback for a more reliable outcome.

**Recap:**

- Break complex tasks into smaller steps.
- Sequential prompting guides LLMs through these steps.
- Prompt chaining programmatically links steps.
- Intermediate validation (gate checks) is crucial for reliability (verifying format, content, logic).
  This enables robust workflows, forming the backbone of many AI agent actions (e.g., health records processing, content generation, claim triage, code generation/debugging). Mastering these is critical for developing reliable AI agents.

### Conclusion

What the video adds to the text above:

- **The domino effect, concretely:** if the LinkedIn research step misstates a key concept, the summary carries the error forward and the final post is flawed. A mistake that is harmless in a chat breaks an automated chain.
- **When gate checks fit:** cases where it is relatively easy to tell that the LLM is off. They can validate a step's **input** as well as its output.
- **The two checks in the example:** a formatting check, so the output can be parsed, and a loop over every quoted string in the response that searches for it in the sources, which guards against hallucinated quotes.
- **Fail or retry:** halting is the safer choice with sensitive data such as financial or health records. Retrying is "rolling the dice again"; adding the failure reason to the retry prompt makes the same error less likely.
- **Tools per check type:**

| Check | What it asks | Tools |
|---|---|---|
| **Format** | Right structure, length, all required fields? | Pydantic; **instructor** (retries automatically); structured outputs that strictly enforce a format |
| **Content** | Expected keywords or topics present, unwanted ones absent, output relevant to the input? | Regular expressions, semantic embeddings, another LLM |
| **Logic** | Numbers in a reasonable range? Code compiles and passes basic tests? No restricted imports (security)? | Standard code, test runs |

- **How it runs in code:** call the LLM API, pass the output to a validation function (which may call its own LLM), then proceed to the next step or handle the error. This keeps flawed output from one step out of the next, which matters most when an agent works with external tools or systems.

::: tip
Think of the chain as building with bricks: check that each one clicks firmly into place before adding the next, because a wobbly brick can bring the structure down later.
:::

## Quiz

::: match {id=l153-match} Question 1 of 3
Match each component of prompt chaining to its appropriate description:

heads: Components of Prompt Chaining | Component of Prompt Chaining
- Breaking complex tasks into smaller steps and organizing them sequentially. => Sequential Prompting
- Connecting outputs from one task to be used as inputs for the next task in a series. => Task Chaining
- Procedure for ensuring each task's output meets specified criteria before proceeding further. => Gate Checks
- The system in charge of managing the order and execution of tasks and prompts. => Runtime/Orchestration Layer
extra: Memory | Tools | Instructions
:::

::: quiz {id=l153-q2} Question 2 of 3
What components are important for effectively chaining prompts in AI agents?

- [x] Memory allows AI agents to learn and maintain consistency across tasks.
- [ ] Prompt chaining works without any need for validation between prompts.
- [ ] Orchestration of tasks does not play a significant role in execution flow.
- [x] Tools provide external functions and APIs for enhanced capabilities in AI agents.
- [x] Sequential Prompting helps break down complex tasks into smaller subtasks.
:::

::: quiz {id=l153-q3} Question 3 of 3
Which of the following statements about gate checks in AI workflows are true?

- [x] Content checks can be used to validate keyword relevance and topic adherence.
- [x] Logic checks verify that outputs make numerical and logical sense.
- [ ] Re-training the model with existing data is a necessary step in every AI workflow.
- [x] Implementing gate checks helps ensure quality control in an AI workflow.
:::

## Summary

### Summary

#### Understanding Prompt Chains

Congratulations on completing Chaining Prompts for Agentic Reasoning! You've dedicated effort to understanding how to structure more complex AI interactions, which is a foundational skill for building capable agents.

You have acquired key foundational knowledge in this area:

- **Task Decomposition:** You understand why complex problems should be broken down into a sequence of smaller, more focused sub-tasks for an LLM to handle effectively.
- **Prompt Chaining:** Prompt chaining is the technique where the output of one AI instruction programmatically becomes the input for the next, creating a processing pipeline.
- **Output Validation:** You know the critical role of "gate checks" for validating the output of each step in a chain to ensure reliability and prevent errors from moving down the line.
- **Stage-Specific Prompting:** You can recognize the importance of using distinct, specialized prompts for each part of a larger task to improve the accuracy of the AI's performance at each step.

This is the foundation you need for implementing a prompt chains. Great work!
