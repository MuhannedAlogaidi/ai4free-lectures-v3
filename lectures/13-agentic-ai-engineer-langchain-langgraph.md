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

### Conclusion

**Why LangChain exists.** LangChain emerged from the growing need to integrate large language models into all kinds of applications. As LLMs became more capable, developers wanted to use them for more than simple text generation, and LangChain gives them a framework that simplifies and standardizes that integration.

![Why LangChain? The use cases it supports and the systems it connects to](assets/images/lc12-slide-01.png "Why LangChain? The use cases it supports and the systems it connects to")

**One framework for many tasks.** Imagine a chatbot that has to pull real-time data from various sources, summarize documents and generate synthetic data for testing. LangChain provides the tools and integrations for all of these within a single framework, so you can focus on the solution instead of the complexity of connecting many systems.

![One chatbot pulling real-time data, summarizing documents and generating synthetic data](assets/images/lc12-slide-02.png "One chatbot pulling real-time data, summarizing documents and generating synthetic data")

**Providers come as separate packages.** LLMs are the base of LangChain: the engines that let an application understand and generate human-like text. Provider integrations are split into lightweight packages, maintained together by the LangChain team and the integration developers. Besides `langchain`, you install the package for your provider, such as `langchain-openai` or `langchain-anthropic`. The list keeps growing, so install the ones you develop with; this course uses OpenAI.

![SDKs for Python, JavaScript and TypeScript; this course uses Python](assets/images/lc12-slide-03.png "SDKs for Python, JavaScript and TypeScript; this course uses Python")

![LLMs from many providers, connected through LangChain](assets/images/lc12-slide-04.png "LLMs from many providers, connected through LangChain")

**invoke works the same for every model.** You don't need to learn each provider's SDK. `invoke` is the primary method for talking to a chat model: it takes a list of messages as input and returns messages as output. Still check the documentation to see whether the advanced features you need work the same way across all the models you might use.

![invoke() sends messages into the LLM and returns messages out](assets/images/lc12-slide-05.png "invoke() sends messages into the LLM and returns messages out")

**Messages are the unit of communication.** Chat tools such as ChatGPT have two roles: the user (you) and the assistant. LangChain turns these into a unified message format that works across all chat models, so the provider's own format doesn't matter. You pass your text as a `HumanMessage` and receive an `AIMessage` back. For simplicity you can leave out the `HumanMessage` object and LangChain converts plain text for you. A `SystemMessage` passes instructions to the model, and a `ToolMessage` is used for function calling.

![The user and assistant roles](assets/images/lc12-slide-06.png "The user and assistant roles")

![A user and assistant exchange in ChatGPT](assets/images/lc12-slide-07.png "A user and assistant exchange in ChatGPT")

![Each role and its LangChain message class](assets/images/lc12-slide-08.png "Each role and its LangChain message class")

**The basic components.** Knowing LangChain's basic components (LLMs, message schemas and prompt templates) is what lets you use its full potential to build AI applications.

*Source: transcript of the lesson video "Introduction to LangChain" (Udacity, Agentic AI Engineer with LangChain and LangGraph, Course 1).*
