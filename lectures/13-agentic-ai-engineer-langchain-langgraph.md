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
