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
