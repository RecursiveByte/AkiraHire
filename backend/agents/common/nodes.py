from langchain_core.messages import SystemMessage


def chatbot_node(
    state,
    llm,
    system_prompt,
):
    messages = [
        SystemMessage(content=system_prompt),
        *state["messages"],
    ]

    response = llm.invoke(messages)

    return {
        "messages": [response],
    }