[!Draft|amber] Agentic AI by Andrew Ng, DeepLearning.AI.

## Introduction

Agentic AI represents a new way of building software that leverages LLMs to complete some or all of the steps in complex tasks. Instead of generating single responses to prompts, agentic workflows enable AI to plan multi-step processes, execute them iteratively, and improve outputs through reflection and tool use. This course teaches you to build these sophisticated AI systems from the ground up.

You’ll master four design patterns that power agentic AI systems:

- Reflection: AI critiques its own work and iterates to improve quality—like code review, but automated.
- Tool Use: Connect AI to databases, APIs, and external services so it can actually perform actions, not just generate text.
- Planning: Break complex tasks into executable steps that AI can follow and adapt when things don’t go as expected.
- Multi-Agent: Coordinate multiple specialized AI systems to handle different parts of a complex workflow.

The course emphasizes practical implementation using Python, building each pattern from first principles before exploring frameworks, giving you the flexibility to customize AI workflows for your specific needs. You’ll learn to deconstruct business processes into agentic workflows, identifying where human-like iteration and tool interaction can automate complex tasks. Critical evaluation skills are woven throughout—you’ll build robust testing frameworks, conduct systematic error analysis, and optimize systems for production deployment.

What you'll learn

- Build agentic design patterns: reflection, tool use, planning, and multi-agent workflows
- Integrate AI with external tools: databases, APIs, web search, and code execution
- Evaluate and optimize AI systems: performance metrics, error analysis, and production deployment

## Module 1: Introduction to Agentic Workflows

#### Table of contents

| # | Section | What it covers |
|---|---|---|
| 1 | Welcome! | Hype versus real value, and why evals and error analysis matter |
| 2 | What is agentic AI? | Direct generation versus agentic workflows, and the research agent |
| 3 | Degrees of autonomy | Agent versus agentic, and less, semi and highly autonomous agents |
| 4 | Benefits of agentic AI | Better performance, parallelization, and modularity |
| 5 | Agentic AI applications | Invoice processing, customer email, customer service, computer use |
| 6 | Task decomposition | Breaking tasks into steps, and the building blocks you have |
| 7 | Evaluating agentic AI (evals) | Objective evals, LLM as a judge, traces and error analysis |
| 8 | Agentic design patterns | Reflection, tool use, planning, and multi-agent collaboration |
| 9 | Optional: Set up your local environment | Python, virtual environment, and requirements.txt for the labs |
| 10 | Module 1 quiz | 10 questions, 8/10 to pass |

### Welcome!

This course teaches best practices for building agentic AI applications: systems where an LLM works through a task in multiple steps instead of answering in a single response.

#### Key terms

| Term | Meaning |
|---|---|
| Agentic AI | The term Andrew Ng coined for building software where LLMs complete some or all of the steps in complex tasks |
| Agentic workflows | LLM applications that complete a task in multiple steps instead of a single response |
| LLM-based applications | Software built on top of large language models |
| Customer support agents | Agentic apps that handle real customer requests |
| Deep research | Agentic apps that research a topic and write insightful reports |
| Evals | Systematic evaluations that measure how well an agentic system performs |
| Error analysis | Finding where and why the system fails, to decide what to fix next |
| Disciplined development process | Building driven by evals and error analysis, not guesswork |

#### Hype versus real value

Andrew Ng coined the term **agentic** to describe a fast-growing trend in how people build LLM-based applications. Marketers then adopted the word as a label for almost everything, which pushed the hype very high.

Setting the hype aside, the number of truly valuable agentic applications has also grown quickly, even if not as fast as the hype.

#### Where agentic workflows are used today

- **Customer support agents** that handle real customer requests
- **Deep research** that produces insightful research reports
- **Legal document processing** for tricky, detailed documents
- **Healthcare support** that reviews patient input and suggests possible diagnoses

On many of Andrew's teams, a lot of projects would be impossible without agentic workflows. That makes building them one of the most valuable skills in AI today.

#### What separates effective builders

::: quote Andrew Ng
One of the biggest differences I've seen between people that really know how to build agentic workflows compared to people that are less effective at it is the ability to drive a disciplined development process, specifically one focused on evals and error analysis.
:::

This course covers what that process means and how to apply it, opening up both job opportunities and the ability to build strong software yourself.

::: takeaway
Ignore the hype, focus on real applications, and build with a disciplined process: **evals + error analysis**.
:::

Next: what agentic workflows actually are.

### What is agentic AI?

An **agentic AI workflow** is a process where an LLM-based app executes multiple steps to complete a task. It takes longer than a single prompt, but delivers a much better work product.

#### Key terms

| Term | Meaning |
|---|---|
| Direct generation (zero-shot) | A non-agentic workflow: prompting an LLM once and getting the whole output in one go |
| Agentic AI workflow | A process where an LLM-based app executes multiple steps to complete a task |
| Iterative process | Think, research, draft, review, revise, and repeat |
| Web search API | An API the workflow calls with LLM-chosen search terms to get relevant web pages |
| Reflection | An LLM reviews a draft and decides what needs revision or more research |
| Human in the loop | A step where the LLM can request human review, for example of key facts |
| Task decomposition | Breaking a complex task into smaller steps the workflow executes one at a time |
| Research agent | The course's running example: an agent that researches a topic and writes a report |
| Editor agent | An agent that reviews a draft for coherence |
| Autonomy | How much the agent decides on its own. Covered in the next video |

#### Direct generation versus an agentic workflow

::: compare
**Direct generation:** "Write an essay on topic X." The LLM writes from the first word to the last word in one go, without ever using backspace. People don't do their best writing this way, and neither do LLMs, although LLMs do surprisingly well despite the constraint.
---
**Agentic workflow:** Write an outline, decide if web research is needed, search and download pages, write a first draft, read it to find what needs revision or more research, then revise. Like a person who thinks, researches, revises, and thinks again.
:::

![Non-agentic (zero-shot) versus agentic workflow](assets/images/l08-zero-shot-vs-agentic.png "Zero-shot writes start to finish in one go. An agentic workflow loops through thinking, research and revision.")

#### The essay workflow, step by step

![Essay-writing example as an agentic workflow](assets/images/l08-agentic-workflow-essay.png "Each step uses an LLM. Two steps add a tool: web search, and a request for human review.")

Each box is a separate step. Some use an LLM, some call a tool, and one can involve a person. How you design the workflow decides which steps exist.

#### The key skill: task decomposition

One of the main skills this course teaches is taking a complex task, like writing an essay, and breaking it into smaller steps that an agentic workflow executes one at a time.

::: quote Andrew Ng
Knowing how to decompose the task into steps and how to build the components to execute the individual steps well turns out to be a tricky but important skill.
:::

#### Running example: the research agent

You build a research agent alongside the course. Example topic: *How do I build a new rocket company to compete with SpaceX?*

::: steps
1. Plan what research to do.
2. Call a web search engine and download web pages.
3. Synthesize and rank the findings.
4. Draft an outline.
5. Have an editor agent review the draft for coherence.
6. Generate a comprehensive markdown report: intro, background, findings, and so on.
:::

By finding multiple sources and thinking deeply about them, the agent produces a much more thoughtful report than a single prompt to an LLM.

Andrew has built specialized research agents for legal compliance documents, healthcare, and business product research. The ideas from this example carry over to many other applications, including your own custom research agents.

::: takeaway
Agentic workflows trade speed for quality: multiple steps, tools, and reflection beat a single prompt. The core skill is **decomposing a task into steps** and building each step well.
:::

Next: how autonomous agentic workflows can be, and a framework for judging how easy or hard an application will be to build.

### Degrees of autonomy

Agents can be autonomous to different degrees. Instead of asking "is this a true agent?", ask **how agentic** a system is.

#### Key terms

| Term | Meaning |
|---|---|
| Agent versus agentic | "Agent" is binary: it is one or it isn't. "Agentic" is an adjective: systems can be agentic to different degrees |
| Autonomy | How many decisions the LLM makes, rather than the programmer deciding in advance |
| Deterministic sequence | A fixed series of steps hard-coded by the engineer |
| Hard-coded tool use | The engineer decides which tools are called and when |
| Tool | Software that carries out an action, such as a web search API call, web fetch, or PDF-to-text conversion |
| arXiv | A website of research papers the LLM can choose to search |
| Less autonomous agent | All steps predetermined, all tool use hard-coded, autonomy only in text generation |
| Semi-autonomous agent | Can make some decisions and choose tools, but tools are predefined |
| Highly autonomous agent | Makes many decisions on its own, including the sequence of steps, and can create new tools on the fly |

#### Why "agentic" instead of "agent"

A few years ago, the AI community argued about what counts as an agent: one paper would claim "I built an agent", and others would reply that it wasn't a true agent. Andrew found this debate unnecessary, so he started using **agentic** as an adjective instead of a binary label. He presented it in a talk on agentic reasoning, then in his newsletter, *The Batch*, and on social media.

::: quote Andrew Ng
Rather than arguing over which work to include or exclude as being a true agent, we can acknowledge that there are different degrees to which systems can be agentic.
:::

![Agentic reasoning talk and the "It's agentic!" post](assets/images/l08-agentic-not-agent.png "Sequoia Ascent, March 2024, and X (Twitter) post, June 2024")

This moved the conversation past "what is a true agent" and back to actually building these systems.

#### Diagram color key

The course uses the same colors in every workflow diagram:

| Color | Meaning |
|---|---|
| Red | User input: a user query, or an input document |
| Gray | A call to an LLM |
| Green | Other software carrying out an action, such as a web search API call or code that fetches a website |

#### Less versus more autonomous: the black holes essay

![Less and more autonomous versions of the same research agent](assets/images/l08-degrees-of-autonomy.png "Top: a fixed sequence chosen by the programmer. Bottom: the LLM chooses tools and steps.")

::: compare
**Less autonomous:** An LLM writes web search queries. The code then always calls web search, fetches pages, and has the LLM write the essay. A fully deterministic sequence of steps, decided by the programmer. This works okay.
---
**More autonomous:** The LLM chooses whether to search the web, recent news, or arXiv. It decides how many pages to fetch and whether to convert a PDF to text. It writes a draft, decides whether to reflect and improve, and may go back to fetch more pages. The LLM, not the engineer, decides the sequence of steps.
:::

#### The autonomy spectrum

![Degrees of agenticness: less, semi and highly autonomous](assets/images/l08-agenticness-spectrum.png "Agentic AI can be less or more autonomous")

Tool use, where the LLM calls functions like web search, is covered in depth in Module 3.

#### Where the value is today

- **Less autonomous end:** tons of very valuable applications are being built for businesses today.
- **Highly autonomous end:** applications exist too, but they are less easily controllable, more unpredictable, and still an area of active research.

This course teaches you to build applications anywhere on this spectrum.

::: takeaway
Don't debate whether something is a "true agent". Decide **how much autonomy** the task needs: more autonomy means more flexibility, but less control and predictability.
:::

Next: the benefits of agentic workflows, and why they make possible things earlier LLM-based applications could not do.

### Benefits of agentic AI

The biggest benefit of agentic workflows is that they let you do many tasks effectively that were previously not possible. Two more benefits come with them: **parallelism** for speed, and **modularity** to combine the best components from many places.

#### Key terms

| Term | Meaning |
|---|---|
| HumanEval | A coding benchmark that tests how well LLMs write code to carry out given tasks |
| pass@k | The metric HumanEval reports: whether generated code passes the tests |
| GPT-3.5 / GPT-4 | Two OpenAI model generations. GPT-3.5 powered the first public version of ChatGPT |
| Non-agentic workflow | Asking the model to write the code directly, in one go |
| Reflection | The model reviews its own code and improves it. One of the agentic techniques in the benchmark |
| Parallelization | Running independent steps, like searches and page downloads, at the same time |
| Modularity | Building the workflow from components you can add, update, or swap out |
| Web search engines for LLMs | Google (through an API), Bing, DuckDuckGo, Tavily, You.com, and others |
| LLM provider | The company serving a model. Different steps can use different models and providers |

#### Benefit 1: Much better performance

Andrew's team compared LLMs on the HumanEval coding benchmark:

| Model | Non-agentic | Inside an agentic workflow |
|---|---|---|
| GPT-3.5 | 48% | About 75% to 95% |
| GPT-4 | 67% | About 80% to 95% |

![HumanEval: non-agentic versus agentic systems](assets/images/l08-humaneval-benchmark.png "Agentic techniques include reflection, tool use, planning and multi-agent systems")

::: important
The jump from GPT-3.5 to GPT-4 is huge, but **wrapping GPT-3.5 in an agentic workflow beats it**. An agentic workflow on the previous model generation outperforms the next generation used directly.
:::

Even with today's best LLMs, an agentic workflow still gives much better performance.

#### Benefit 2: Faster than humans through parallelization

For the black holes essay:

::: steps
1. Three LLMs run in parallel, each generating web search terms.
2. Each search returns its top 3 results to fetch.
3. All 9 web pages download in parallel.
4. An LLM reads them all and writes the essay.
:::

![Parallelization for speed](assets/images/l08-parallelization.png "3 parallel searches, then 9 parallel web page downloads")

::: compare
**A human researcher** reads the 9 web pages one at a time, in sequence.
---
**An agentic workflow** downloads all 9 at once, then processes them.
:::

Agentic workflows take longer than direct generation, but compared with a person doing the same task, parallelization can make them much faster.

#### Benefit 3: Modular, so you can add or swap components

When building agentic workflows, Andrew often looks at the individual components and adds or swaps them out:

- **Swap the web search engine:** there are many search engines designed for LLMs, such as Google (through an API), Bing, DuckDuckGo, Tavily, and You.com.
- **Add a new tool:** replace one of the web searches with a news search engine, to find the latest breakthroughs in black hole science.
- **Swap the LLM:** try different models and different LLM providers, and use whichever gives the best result for each step.

![Modular: add or swap out components](assets/images/l08-modular-components.png "Red boxes mark the swapped components: a new web search engine, a news search, and a different LLM")

::: takeaway
Agentic workflows give **much better performance**, run **faster than humans** through parallelization, and are **modular**, so you can add or update tools and swap out models.
:::

Next: a range of agentic AI applications people are already building.

### Agentic AI applications

Four applications, from easiest to hardest, show what people are building today and what makes an agentic task easy or hard.

#### Key terms

| Term | Meaning |
|---|---|
| PDF-to-text API | A tool that converts a PDF into formatted text, such as markdown, for the LLM to read |
| Required fields | The specific pieces of information the workflow must extract from a document |
| Update database tool | A tool the LLM calls to save extracted data as a database record |
| Orders database query | A tool the LLM calls to look up a customer's order |
| Request review tool | A tool that puts an LLM draft into a queue for a human to approve before it is sent |
| Customer order inquiry agent | An agent that answers questions about a specific order, following a clear process |
| Customer service agent | An agent that answers any customer question, so it must plan its own steps |
| Computer use | An agent operating a web browser: reading pages, clicking elements, and filling in fields |
| Modality | A type of input: text, sound, vision |
| Multimodal input | Input that includes sound, images, or video, not only text |

#### 1. Invoice processing (easier)

Finance departments read invoices, find who must be paid by when, and record it in a database so payment goes out on time. The workflow extracts 4 required fields: **biller**, **biller address**, **amount due**, and **due date**.

::: steps
1. Input the invoice PDF.
2. Call a PDF-to-text API to convert it to formatted text, such as markdown.
3. The LLM checks whether it is actually an invoice, or another document to ignore.
4. If it is an invoice, the LLM extracts the required fields.
5. The LLM calls the update database tool to save them.
:::

![Invoice processing workflow](assets/images/l08-invoice-workflow.png "Example invoice from TechFlow Solutions LLC: $3,000.00 due August 20, 2025")

There is a **clear process**: identify the required fields, then record them in the database. Tasks with a clear process tend to be easier, because they lead to a reliable step-by-step implementation.

#### 2. Responding to a customer order email (a little harder)

A customer writes that she ordered a blue KitchenPro blender (Order #8847) but received a red toaster.

::: steps
1. **Extract key information:** the LLM verifies the order details and the customer's name.
2. **Find relevant customer records:** if the email is about an order, the LLM calls the orders database query tool.
3. **Draft a response for human review:** the LLM drafts a reply and calls the request review tool, so a person approves it before it is sent.
:::

![Responding to a customer email](assets/images/l08-customer-email-workflow.png "LLM, orders database query, LLM, request review, then a human")

Customer order inquiry agents like this are being built and deployed in many businesses today.

#### 3. General customer service agent (more challenging)

Now the agent must answer **any** customer question, so the required steps are **not known ahead of time**. The LLM-based application has to decide the steps itself.

| Customer asks | Steps the agent must plan |
|---|---|
| "Do you have any black jeans or blue jeans?" | 1. Check inventory for black jeans. 2. Check inventory for blue jeans. 3. Respond to the customer |
| "I'd like to return the beach towel I bought" | 1. Verify the customer bought it. 2. Check return policies, for example within 30 days and unused. 3. If return is allowed: issue a return packing slip and set the database record to "return pending" |

![More challenging: customer service agent](assets/images/l08-customer-service-agent.png "Required steps not known ahead of time")

The course covers recent approaches to this type of problem.

#### 4. Visual computer use (difficult)

Computer use agents operate a web browser to complete a task. In the demo (ChatGPT Agent Mode, OpenAI), Andrew asks an agent to check seat availability on two United Airlines flights from San Francisco to Washington DC (DCA):

- It navigates the United website on its own, clicking page elements and filling in text fields.
- It reasons over the page content to decide its next action.
- When it has trouble on the United site, it switches to Google Flights, finds matching flights, and returns to United.
- It confirms that seats are available.

::: warning
Computer use is cutting-edge research and **not yet reliable enough for mission-critical applications**. Agents often struggle with web browsers: a slow-loading page can confuse them, and many pages are still beyond their ability to parse accurately.
:::

#### What tasks is agentic AI suited to?

| Easier | Harder |
|---|---|
| Clear, step-by-step process | Steps not known ahead of time |
| Standard procedures to follow | Plan or solve as you go |
| Text assets only | Multimodal input (sound, vision) |

- **Standard procedures** make implementation easier, even though codifying a procedure into an agent can be a lot of work.
- **Text is easier** because LLMs grew up processing text. Other modalities are doable but harder.
- **Planning as you go** is harder, more unpredictable, and less reliable.

::: takeaway
Start with tasks that have a clear process and text-only input. The key skill when building any of these is to look at a complex workflow and identify the **individual steps**.
:::

Next: task decomposition, how to break a complex task like a research report or customer replies into discrete steps.

### Task decomposition: Identifying the steps in a workflow

People and businesses do a lot of useful work. Task decomposition is how you break that work into **discrete steps** an agentic workflow can follow.

#### Key terms

| Term | Meaning |
|---|---|
| Task decomposition | Breaking a complex task into discrete steps, each simple enough to implement |
| Direct generation | Prompting an LLM once for the whole output. For deep topics it stays surface level |
| Disjointed output | Text whose start, middle, and end are not consistent with each other |
| Building blocks | The models and tools you combine to build a workflow |
| Large multimodal model | A model that processes images or audio as well as text |
| API | A tool for web search, real-time data such as weather, sending email, checking a calendar |
| Information retrieval | Tools that pull data from a database, or use RAG |
| RAG (Retrieval Augmented Generation) | Looking up a large text database to find the most relevant text for the LLM |
| Code execution | A tool that lets an LLM write code and run it, from a basic calculator to data analysis |
| Human in the loop | Adding a person to a step the LLM and tools cannot do reliably on their own |

#### The core question for every step

::: important
For each step, ask: **can an LLM, a short piece of code, a function call, or a tool do this?** If the answer is no, ask how you as a human would do it, and break the step down further, or add a human in the loop.
:::

#### Example 1: Writing an essay

Direct generation covers only surface-level points and obvious facts. So think about how a human writes an essay, and decompose it:

![Decomposing essay writing](assets/images/l08-decompose-essay.png "Step 3, write the essay, is decomposed into draft, consider revision, and revise")

1. **3 steps:** write an outline, search the web, write the essay. Each step is doable: an LLM can write a decent outline, generate search terms, and write from search results.
2. **Still not good enough:** when Andrew built this, the essays felt disjointed. The start of the article didn't match the middle or the end.
3. **5 steps:** decompose "write the essay" further into write a first draft, consider what parts need revision, and revise the draft. Reading over a draft and critiquing it is another step LLMs are decent at.

| Direct generation | 3-step workflow | 5-step workflow |
|---|---|---|
| 1. Write an essay on topic X | 1. Write an essay outline on topic X | 1. Write an essay outline on topic X |
| | 2. Search web | 2. Search web |
| | 3. Write the essay | 3. Write the first draft |
| | | 4. Consider what parts need revision |
| | | 5. Revise your draft |
| Not good enough | Still not good enough | Richer process |

Depending on the results, you can keep modifying the process further.

#### Example 2: Responding to a customer order email

| Step | Building block |
|---|---|
| 1. Extract key information: who sent it, what they ordered, the order number | LLM |
| 2. Find relevant customer records: what was ordered, when it shipped | LLM + orders database query |
| 3. Write and send the response | LLM + send email API |

![Decomposing the customer email task](assets/images/l08-decompose-customer-email.png "Each step is an LLM, alone or with one tool")

#### Example 3: Extracting information from an invoice

After the PDF invoice is converted to text:

1. **Find the required information:** biller name, address, due date, amount due. An LLM can do this.
2. **Check and save it as a new database entry:** an LLM calls a function to update the database.

![Decomposing invoice extraction](assets/images/l08-decompose-invoice.png "Two steps: LLM, then LLM + update database")

#### What building blocks do you have?

| Building block | Examples | Use cases |
|---|---|---|
| Models | LLMs (or large multimodal models) | Text generation, tool use, information extraction |
| Models | Other AI models | PDF-to-text, text-to-speech, image analysis |
| Tools | APIs | Web search, real-time data, send email, check calendar |
| Tools | Information retrieval | Databases, Retrieval Augmented Generation (RAG) |
| Tools | Code execution | Basic calculator, data analysis |

Much of building an agentic workflow is looking at the work a person or business does, then working out how to **sequence these building blocks** to carry it out. The better you know the available blocks, the more workflows you can envision. The most important tools are covered in detail in a later module.

#### Tips for task decomposition

![Tips for task decomposition](assets/images/l08-decomposition-tips.png "Can an LLM, a tool, or both complete each step? If not, break it down further or add human-in-the-loop")

You rarely get it right first time. You build an initial decomposition, then keep iterating until the workflow reaches the performance you want. To drive that improvement, you need to **evaluate** the workflow.

::: takeaway
Decompose the task into steps, check each step against your building blocks (LLM, tool, or both), and decompose further where the answer is "no". Then iterate, guided by evals.
:::

Next: evaluations (evals), and how they drive improvement of your workflows.

### Evaluating agentic AI (evals)

One of the biggest predictors of whether a team builds agentic workflows well is whether it can drive a **disciplined evaluation process**. This is a quick overview. Module 4 goes much deeper.

#### Key terms

| Term | Meaning |
|---|---|
| Eval | An evaluation that measures how often a specific error happens, or how good the output is |
| Objective eval | A clear yes/no criterion, such as "was a competitor mentioned?", checked with code |
| Subjective eval | A quality criterion that is hard to check with code, such as "how good is this essay?" |
| LLM as a judge | Prompting a second LLM to score or judge the output |
| End-to-end eval | Measures the output quality of the entire agent |
| Component-level eval | Measures the output quality of a single step in the workflow |
| Traces | The intermediate outputs of every step in the workflow |
| Error analysis | Reading through traces to find where the system falls short and what to improve |

#### Build first, then look for low-quality outputs

It is very hard to know in advance what will go wrong. So don't try to build evals before the system exists. **Build it first, read its outputs, and look manually for things you wish it did better.**

Example: the customer order agent turns out to mention competitors, which most businesses want to avoid because it creates awkward situations:

> "I'm glad you shopped with us – we're much better than our competitor CompCo!"
>
> "Sure, we'll issue a refund. Unlike RivalCo, we make returns easy."

![Look for low-quality outputs](assets/images/l08-evals-low-quality-outputs.png "A problem that is hard to anticipate before building the workflow")

#### Objective evals: check with code

If your business treats competitor mentions as an error, add an eval to track how often it happens. With a list of competitor names (CompCo, RivalCo, The Other Co, ...), code can count mentions as a fraction of all responses:

```python title="Count competitor mentions"
if (competitor in response):
    num_competitor_mentions += 1
```

![Add an evaluation to track the error](assets/images/l08-evals-track-error.png "Objective error: use code to check for occurrences")

A competitor is either mentioned or not, so this is an **objective** metric. As you fix the problem, the count should drop.

#### Subjective evals: LLM as a judge

LLMs output free text, so some criteria are subjective and can't be scored black and white with code. A common technique is to use a second LLM as a judge:

```text title="Judge prompt"
Assign the following essay a quality score between 1 and 5, where 5 is the best: {essay}
```

`{essay}` is a placeholder where the generated essay is pasted in.

| Research topic | LLM-assigned score |
|---|---|
| Black holes | 3 |
| Robotic harvesting | 4 |

As you improve the research agent, these scores should go up over time.

![Using LLM as a judge](assets/images/l08-evals-llm-as-judge.png "A judge LLM scores each essay the research agent writes")

::: mistake
LLMs are **not that good at 1 to 5 scale ratings**. Andrew rarely uses this technique himself. Module 4 covers better ways to get accurate scores from an LLM, though some people use 1 to 5 as an initial cut.
:::

#### Preview: types of evals and error analysis

- **Code (objective) or LLM-as-judge (subjective):** two ways to evaluate.
- **End-to-end and component-level:** two major types of evals, each useful for driving different parts of development.
- **Traces and error analysis:** read the intermediate outputs of every single step to spot opportunities for improvement.

Evals and error analysis are a key skill, covered in much more depth in Module 4.

::: takeaway
Don't guess what will go wrong. **Build, read the outputs, then add evals**: code for objective errors, LLM-as-judge for subjective quality. Read traces to find where to improve.
:::

Next: the most important design patterns for building agentic workflows.

### Agentic design patterns

Agentic workflows are built by sequencing building blocks. **Design patterns** are proven ways to combine those blocks into more complex workflows. The four key patterns:

::: cards
- **1. Reflection**: the LLM examines its own output, or external feedback, and improves it.
- **2. Tool use**: the LLM calls functions to search, compute, fetch data, or take actions.
- **3. Planning**: the LLM decides the sequence of steps itself.
- **4. Multi-agent collaboration**: several specialized agents work together on one task.
:::

Most of these get their own in-depth module later in the course.

#### Key terms

| Term | Meaning |
|---|---|
| Design pattern | A reusable way to combine building blocks into an agentic workflow |
| Critique / critic agent | An LLM prompted to review output, for example code, and give constructive criticism |
| Persona | A role an LLM is prompted to take on, such as coder or critic |
| Unit test | A small automated test that checks a piece of code, used as external feedback |
| Code execution tool | Lets the LLM write and run code, for example to compute compound interest |
| HuggingGPT | A research paper where an LLM plans a sequence of AI model calls to complete a task |
| ChatDev | A software framework by Chen Qian and collaborators where agents act as a virtual software company |
| Multiagent debate | Several agents discussing a problem, shown to improve factuality and reasoning |
| MMLU | A benchmark of knowledge and reasoning questions across many subjects |

#### 1. Reflection

::: steps
1. Ask the LLM: "Please write code for {task}". It returns `def do_task(x): ...`
2. Paste that code into a new prompt: "Here's code intended for {task}. Check the code carefully for correctness, style and efficiency, and give constructive criticism for how to improve it."
3. The same LLM may point out problems, for example a bug on line 5.
4. Feed the critique back and ask for a fix: you get `do_task_v2`.
5. With tool use, run the code or unit tests. Feed the errors back: you get `do_task_v3`.
:::

![Reflection with a coder agent and a critic agent](assets/images/l08-pattern-reflection.png "The coder improves its code from v1 to v3 using the critic's feedback")

The critic can also be a **separate critic agent**: an LLM prompted with "your role is to critique code". Two simulated agents, each an LLM with a persona, go back and forth to reach a better output. This foreshadows multi-agent workflows.

::: info
Reflection isn't magic and won't make everything work 100% of the time, but it can give a nice bump in performance. Module 2 covers it in depth.
:::

#### 2. Tool use

Tools are functions the LLM can call to get work done. The LLM **decides which tools to use**, which lets it get a lot more done.

- **Web search tool:** "What is the best coffee maker according to reviewers?" The LLM searches the internet for a much better answer.
- **Code execution tool:** "If I invest $100 at compound 7% interest for 12 years, what do I have at the end?" The LLM writes and runs code:

```python title="Compound interest"
principal = 100
interest_rate = 0.07
years = 12
value = principal * (1 + interest_rate) ** years
```

| Analysis | Information gathering | Productivity | Images |
|---|---|---|---|
| Code execution | Web search | Email | Image generation |
| Wolfram Alpha | Wikipedia | Calendar | Image captioning |
| Bearly Code Interpreter | Database access | Messaging | OCR |

![Tool use: web search and code execution](assets/images/l08-pattern-tool-use.png "Tool categories: analysis, information gathering, productivity, images")

#### 3. Planning

Instead of the developer hard-coding the steps, **the LLM decides the sequence of actions**, here a sequence of API calls to AI models. Example adapted from *HuggingGPT* (Shen et al., 2023):

> Request: Please generate an image where a girl is reading a book, and her pose is the same as the boy in the image example.jpg, then please describe the new image with your voice.

| Step | Task | Model |
|---|---|---|
| 1 | Pose determination: find the boy's pose | openpose |
| 2 | Pose-to-image: generate a girl in that pose | google/vit |
| 3 | Image-to-text: describe the new image | vit-gpt2 |
| 4 | Text-to-speech: say the description aloud | fastspeech |

![Planning: the LLM chains four AI models](assets/images/l08-pattern-planning.png "From example.jpg to a spoken description: a girl is sitting on a bed reading a book")

::: warning
Planning agents are harder to control and more experimental today, but they can give really delightful results.
:::

#### 4. Multi-agent collaboration

Like a manager hiring a team, you can create several agents, each specialized in a role, and have them work together.

- **ChatDev:** agents act as CEO, programmer, tester, designer, and so on, collaborating like a virtual software company to complete software development tasks.
- **Marketing brochure:** a researcher agent does online research, a marketer agent writes the text, and an editor agent polishes it.

Research shows multi-agent workflows give better outcomes on many complex tasks:

| Task | Single agent | Multi-agent |
|---|---|---|
| Biographies | 66.0% | **73.8%** |
| MMLU | 63.9% | **71.1%** |
| Chess move | 29.3% | **45.2%** |

*Source: "Improving Factuality and Reasoning in Language Models through Multiagent Debate", Du et al., 2023.*

![Multi-agentic workflows: ChatDev and multiagent debate](assets/images/l08-pattern-multi-agent.png "ChatDev's virtual software company, and multiagent debate results")

Multi-agent workflows are harder to control, because you don't always know in advance what the agents will do. They are covered later in the course.

::: takeaway
Combine building blocks with four design patterns: **reflection, tool use, planning, and multi-agent collaboration**. Then use evals to measure and keep improving your system.
:::

Next module: a deep dive into reflection, a surprisingly simple technique that can give your system a very nice performance bump.

### 🧩 Optional: Set up your local environment for the ungraded labs

If you’d like to try the ungraded labs on your own machine, follow these steps:

💡 Note: When you download an ungraded lab to run locally, don’t forget to also download all the files it depends on (such as helper scripts, config files, or data files).

To do this, open the lesson that contains the coding files you want to download. Once in the lesson, see the Jupyter Notebook embedded in the platform, go to the top menu and select File and then click Open. From there, you can download the notebook and any related files to your local machine.

1. Make sure you have Python 3.10+ installed.
2. (Recommended) Create and activate a virtual environment:

```bash
python -m venv venv
source venv/bin/activate     # On Windows: venv\Scripts\activate
```

3. Create a new file named requirements.txt and copy the code provided at the end of this section.
4. Install all required libraries:

```bash
pip install -r requirements.txt
```

5. (Optional) Link this environment to your IDE or Jupyter notebook:

```bash
python -m ipykernel install --user --name=venv
```

After that, you’ll be ready to explore the ungraded labs locally 🚀

📄 Content for requirements.txt

```txt title="requirements.txt"
# === Agent + LLM Tools ===
aisuite==0.1.11
anthropic
docstring-parser
markdown
mistralai
openai
qrcode
tavily-python>=0.7.12
textstat
vertexai

# === Web Framework + API ===
fastapi
pydantic
pydantic[email]
python-dotenv
python-multipart
requests
sqlalchemy
uvicorn

# === Notebook Experience ===
ipywidgets
jupyter_server
nbclassic
notebook

# === Data Analysis / Display (Optional Enhancements) ===
duckdb
matplotlib
pandas
seaborn
tabulate
tinydb

# === Machine Learning / NLP (Optional Enhancements) ===
jinja2
psycopg2-binary
scikit-learn
Wikipedia
```

### Module 1 quiz

You must earn 8/10 points to pass.

::: quiz {id=m1-q1} Question 1 of 10
Which of the following best describes an agentic AI workflow?

- [ ] A system where an LLM writes content from start to finish in one go without any revisions or additional steps
- [ ] An automated process that only works for simple, repetitive tasks that don't require decision-making
- [x] A process where an LLM-based app executes multiple steps to complete a task, such as planning, researching, drafting, and revising
- [ ] A workflow that requires constant human oversight and manual approval at every step.
---
Agentic AI workflows break complex tasks into smaller steps that are executed iteratively, similar to how humans approach complex work with thinking, research, and revision.
:::

::: quiz {id=m1-q2} Question 2 of 10
The following describes the four steps of an agentic AI workflow that performs competitor analysis for a new product launch. Which step would require the LLM to have access to a tool in order to complete?

- [ ] Strategic Recommendations - LLM suggests how to position and launch the product.
- [ ] Market Position Evaluation - LLM organizes the research into strengths, weaknesses, opportunities, and threats.
- [ ] Product Comparison - LLM compares what different competitors offer and how much they charge.
- [x] Market Research - LLM collects information about competitors, their product offerings, and current market information.
---
This step requires web search tools to find real-time information about competitors and markets that the LLM doesn't already know.
:::

::: quiz {id=m1-q3} Question 3 of 10
Why can agentic workflows achieve better performance than non-agentic approaches in AI applications?

- [ ] Agentic workflows rely on direct generation to produce immediate results without any additional processing.
- [x] Agentic workflows enable iterative improvement through reflection and revision, often delivering gains larger than upgrading to newer model generations.
- [ ] Agentic workflows work by eliminating parallelism to ensure tasks are completed in strict sequential order.
- [ ] Agentic workflows improve performance by using only the most advanced models available for every task.
---
GPT-3.5 in an agentic workflow can outperform GPT-4 in non-agentic mode, with reflection and revision being key to this improvement.
:::

::: quiz {id=m1-q4} Question 4 of 10
Which of the following tasks would NOT require an agentic AI workflow to implement effectively?

- [ ] Processing customer service inquiries that require checking inventory across multiple product categories and verifying return policies.
- [ ] Writing a magazine article on recent developments in electric vehicle batteries by researching current breakthroughs and industry trends.
- [x] Writing a product description for a new smartphone based on a list of technical specifications.
- [ ] Analyzing expense reports to categorize expenses, verify receipts against company policy, and flag items for manager approval.
---
This is a straightforward text generation task that can be completed effectively with direct generation from an LLM without needing multiple steps or tool use.
:::

::: quiz {id=m1-q5} Question 5 of 10
Which of the following conditions makes an agentic AI workflow harder to implement reliably?

- [ ] The workflow includes human review before final outputs are delivered.
- [ ] The task follows a clear step-by-step process that the business already uses.
- [x] The required steps to complete the task are not known ahead of time and must be planned dynamically.
- [ ] The workflow processes text-only inputs like emails or documents.
---
When steps aren't predetermined, the agent must plan and solve as it goes, which tends to be harder, more unpredictable, and less reliable.
:::

::: quiz {id=m1-q6} Question 6 of 10
When decomposing a complex task into steps for an agentic workflow, what is the key question to ask about each individual step?

- [ ] Whether the step produces a measurable output for evaluation purposes.
- [ ] Whether the step requires the most advanced AI model available.
- [ ] Whether the step can be completed faster than a human would take.
- [x] Whether the step can be implemented using either an LLM or available tools like APIs and function calls.
---
The lessons emphasize this as the key question, 'can this step be implemented with either an LLM or with one of the tools such as an API or a function call that I have access to?'.
:::

::: quiz {id=m1-q7} Question 7 of 10
What does "modularity" in agentic workflows allow developers to do?

- [ ] Run multiple tests with different inputs to check workflow performance.
- [ ] Use different LLMs for different steps of the same workflow.
- [ ] Process multiple web pages simultaneously instead of one at a time.
- [x] Replace one RAG system with a different document retrieval system without modifying other parts of the workflow.
---
This demonstrates modularity's core advantage - the ability to swap out individual components (like changing from one retrieval system to another) while keeping the rest of the workflow unchanged.
:::

::: quiz {id=m1-q8} Question 8 of 10
According to the task decomposition approach, what should you do if a step in your planned workflow cannot be implemented with either an LLM or available tools?

- [ ] Redesign the entire workflow to avoid that particular step.
- [ ] Skip that step and proceed with the remaining workflow components.
- [x] Break that step down into smaller sub-steps that can each be handled by an LLM or available tools.
- [ ] Use the most powerful LLM available and hope it can handle the complex step.
---
The lessons emphasize this approach 'how would I as a human do this step? And is it possible to decompose this further or break this down into even smaller steps that then maybe is more amenable to implementation?'.
:::

::: quiz {id=m1-q9} Question 9 of 10
Why is a disciplined evaluation and error analysis process important when developing agentic workflows?

- [ ] It automates the debugging process so workflows can self-correct without human intervention.
- [x] It enables developers to identify specific problems and make targeted improvements through iterative refinement.
- [ ] It generates performance reports that demonstrate the workflow's capabilities to stakeholders.
- [ ] It provides comprehensive data logs that satisfy regulatory compliance requirements.
---
Evaluation and error analysis are diagnostic tools for human developers. They identify specific issues, such as competitor mentions or low-quality steps found in the traces, so you can make targeted improvements and keep iterating. They don't automatically fix workflow problems.
:::

::: quiz {id=m1-q10} Question 10 of 10
An agentic workflow for code generation works as follows. First, an LLM writes Python code for a given task. Then, the system runs the code to check for errors. If errors are found, the error messages are fed back to the LLM with instructions to fix the problems. The LLM then generates an improved version of the code. This process repeats until the code runs successfully. Which agentic design pattern is primarily being used in this workflow?

- [x] Reflection
- [ ] Planning
- [ ] Multi-agent collaboration
- [ ] Tool use
---
This workflow uses a single LLM that critiques and improves its own work, using external feedback (the error messages from running the code) to generate a better version. That is the reflection pattern. It is not multi-agent collaboration, because no multiple specialized agents work together on different aspects of the task.
:::
