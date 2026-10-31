## Introduction

This course introduces the fundamentals of LangChain and agentic AI. It covers how to build LLM-based applications, develop prompts for structured outputs, and understand the core concepts of AI agents and their design patterns.

### Detailed Outline

#### Creating a Simple LangChain application

This module focuses on producing LLM-based applications using LangChain, including chat history and prompt templates.

#### Structured Outputs

This module teaches how to develop prompts and code that produce structured, machine-readable outputs like JSON for downstream processing.

#### LangChain Structured Outputs

This module focuses on defining and utilizing output parsers within LangChain to generate structured outputs.

#### Multi-Step Workflows in LangChain

This module covers building multi-step workflows using LangChain and LCEL.

#### From LLM Calls to Agents

This module aims to help students understand the range of agentic design choices and the tradeoffs between autonomy and reliability.

#### Agentic Design Patterns

This module focuses on evaluating the role of agentic frameworks in AI systems and determining their applicability in solving real-world problems.

#### Extending Agents with Tools

This module explains how LLM-based agents use external tools to expand their capabilities and interact with real-world systems.

#### Functions as Tools in LangChain

This module focuses on implementing functions as tools within LangChain applications.

#### MCP

This module introduces the concept of MCP (Model Context Protocol) and its servers and tools.

#### MCP with LangChain

This module focuses on implementing MCP adapters for tools within LangChain applications.

#### Agentic Workflows with LangGraph

This module covers utilizing LangGraph to implement design patterns for agentic workflows.

#### Agent State Management

This module focuses on understanding state management techniques for tracking agent context and progress across interactions.

#### LangGraph State Management

This module teaches how to apply state management techniques to track agent context and progress across interactions using LangGraph.

#### Agent Memory

This module explains how agent memory supports consistency across multiple interactions.

#### LangGraph Agent Memory

This module focuses on building agents that use memory to ensure continuity and consistency across interactions using LangGraph.

### Project: Report-Building Agent

In this project, you will design and implement a LangChain and LangGraph-powered autonomous AI Document Assistant for DocDacity, a SaaS company. This assistant will receive user queries about uploaded financial and healthcare documents, retrieve relevant content through simulated lookups, perform calculations, summarize results, track conversation history across multiple user sessions, and log the workflow and all tool usage for compliance.

## Introduction to LangChain

::: video {id=lc12} Introduction to LangChain
transcript: assets/transcripts/lc12-intro-langchain.srt.txt
chapters:
- 00:00 Why LangChain exists
- 00:35 Use cases and integrations
- 01:03 One framework for many tasks
- 01:30 Python SDKs and LLM providers
- 02:25 invoke: one way to call any model
- 02:52 Messages as the unit of communication
- 03:53 Summary
:::

### From the video

**Why LangChain exists** [!00:00|gray]

LangChain emerged from the growing need to integrate large language models into all kinds of applications. As LLMs became more capable, developers wanted to use them for more than simple text generation, and LangChain gives them a framework that simplifies and standardizes that integration.

**What you can build, and what it connects to** [!00:35|gray]

LangChain supports a wide range of use cases, and what sets it apart is its abstractions for integrating with many systems. That makes it a versatile choice for building sophisticated AI applications.

![Why LangChain? Use cases on the left, the systems LangChain connects to on the right](assets/images/lc12-slide-01.png "Why LangChain? Use cases on the left, the systems LangChain connects to on the right")

- Use cases: chatbots, retrieval-augmented generation, document summarization, agents.
- Systems it integrates with: cloud storage services, web scraping tools, vector databases.

**One framework for many tasks** [!01:03|gray]

Imagine a chatbot that has to pull real-time data from various sources, summarize documents and generate synthetic data for testing. LangChain provides the tools and integrations for all of these within a single framework, so you focus on the solution instead of the complexity of connecting many systems.

![Why LangChain? One chatbot, three tasks](assets/images/lc12-slide-02.png "Why LangChain? One chatbot, three tasks")

- The chatbot (“How can I help you?”) draws on: real-time data, summarize documents, synthetic data.

**SDKs for three languages** [!01:30|gray]

LangChain provides SDKs for Python, JavaScript and TypeScript. This lesson focuses on the Python libraries.

![Basic components: Python, JavaScript (JS) and TypeScript (TS); this course uses Python](assets/images/lc12-slide-03.png "Basic components: Python, JavaScript (JS) and TypeScript (TS); this course uses Python")

**Models and their providers** [!01:40|gray]

LLMs are the base of LangChain: the engines that let applications understand and generate human-like text. LangChain supports many LLM providers, so you can choose the model that fits your needs. Provider integrations are split into lightweight packages, maintained together by the LangChain team and the integration developers: besides `langchain`, you install `langchain-openai` or `langchain-anthropic` for those APIs. The list keeps growing, so install the ones you develop with; this course uses OpenAI.

![Models: LLMs enable applications to understand human-like text](assets/images/lc12-slide-04.png "Models: LLMs enable applications to understand human-like text")

- “LLMs enable applications to understand human-like text.”
- Shown: LangChain, OpenAI, Anthropic.

**invoke: one way to call any model** [!02:25|gray]

With LangChain you don't need to learn each provider's SDK. `invoke` is the primary method for talking to a chat model: it takes a list of messages as input and returns a list of messages as output. Still check the documentation to see whether the advanced features you need work the same across all the models you might use.

![Models: invoke(), into the LLM and out of the LLM](assets/images/lc12-slide-05.png "Models: invoke(), into the LLM and out of the LLM")

- Into the LLM: “User: Hello!”, “Assistant: Hi!”, “User: What day is it today?”
- Out of the LLM: the same conversation plus the new reply, “Assistant: It’s Friday.”

**Messages: the user and the assistant** [!02:52|gray]

Chat tools powered by an LLM, such as ChatGPT, have two roles: the user (you) and the assistant (ChatGPT, for instance).

![Messages: the User and the ChatGPT Assistant](assets/images/lc12-slide-06.png "Messages: the User and the ChatGPT Assistant")

![A user asks ChatGPT “What is langchain” and the assistant answers](assets/images/lc12-slide-07.png "A user asks ChatGPT “What is langchain” and the assistant answers")

**Messages in LangChain** [!03:06|gray]

LangChain makes messages the unit of communication with models. Its unified message format works across all chat models, so the provider's own format doesn't matter. You pass your text as the content of a `HumanMessage` and receive an `AIMessage` back. For simplicity you can leave out the `HumanMessage` object and LangChain converts plain text for you; you can even leave out the `invoke` method. Other message types are `SystemMessage`, to pass instructions to the model, and `ToolMessage`, for function calling.

![Messages: each role and its LangChain class](assets/images/lc12-slide-08.png "Messages: each role and its LangChain class")

- **System**, `SystemMessage`: tells the chat model how to behave and gives additional context. Not supported by all chat model providers.
- **User**, `HumanMessage`: input from a user interacting with the model, usually text or other interactive input.
- **Assistant**, `AIMessage`: a response from the model, which can include text or a request to invoke tools.
- **Tool**, `ToolMessage`: passes the result of a tool invocation back to the model after external data or processing has been retrieved. Used with chat models that support tool calling.

**The basic components** [!03:53|gray]

LangChain is a powerful framework for integrating LLMs into applications, and its range of use cases and integrations makes it valuable for building sophisticated AI solutions. Knowing its basic components (LLMs, message schemas and prompt templates) is what lets you use its full potential.

*Source: transcript of the lesson video "Introduction to LangChain" (Udacity, Agentic AI Engineer with LangChain and LangGraph, Course 1).*

LangChain is a **framework for building applications powered by large language models (LLMs)**. It simplifies LLM integration, making it easier to develop AI-driven solutions like **chatbots, retrieval-augmented generation (RAG) systems, document summarization tools, and autonomous agents**.

### Why Use LangChain?

LangChain provides **abstractions** that connect LLMs with various tools, including:

- **Cloud storage services** for managing data.
- **Web scraping tools** for fetching real-time information.
- **Vector databases** for efficient search and retrieval.

This flexibility allows developers to focus on **building AI solutions** rather than handling complex integrations.

### Core Components

LangChain supports multiple programming languages, including **Python, JavaScript, and TypeScript**. This lesson focuses on the **Python libraries**.

#### Models

- LangChain supports **multiple LLM providers**, such as OpenAI and Anthropic.
- Uses **lightweight integration packages** like langchain-openai or langchain-anthropic.
- Simplifies model interaction with the invoke() method, handling messages efficiently.

#### Messages

LangChain standardizes communication with models through message objects:

- **HumanMessage** – Represents user input.
- **AIMessage** – Represents model responses.
- **SystemMessage** – Provides additional instructions.
- **ToolMessage** – Used for function calling.

Example:

```python
llm.invoke([HumanMessage(content="What’s the capital of Brazil?")])
```

For convenience, LangChain automatically converts text inputs into the correct format.

### Final Thoughts

LangChain provides a **powerful and flexible** foundation for **LLM-based applications**. Its structured approach simplifies **model interactions, message handling, and system integration**, allowing developers to **build AI solutions efficiently**. Understanding **LLMs, messages, and workflows** is key to making the most of LangChain’s capabilities.

::: quiz {id=lc12-q1} Quiz Question
What is the primary purpose of LangChain as a framework in the development of AI-driven applications?

- [ ] To build websites with ease.
- [x] To simplify building applications powered by large language models (LLMs).
- [ ] To increase the efficiency of cloud storage services.
- [ ] To create sophisticated image processing systems.
:::
