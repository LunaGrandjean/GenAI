from flask import Flask, request, jsonify
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings.ollama import OllamaEmbeddings
from langchain_community.llms import Ollama

app = Flask(__name__)

# Load FAISS and LLM
embeddings = OllamaEmbeddings(base_url="http://localhost:11434", model="llama3")

vectorstore = FAISS.load_local("vectorDb", embeddings, allow_dangerous_deserialization=True)
retriever = vectorstore.as_retriever(search_kwargs={"k": 8})  # Retrieve 8 most relevant chunks
llm = Ollama(base_url="http://localhost:11434", model="llama3.2:3b")

@app.route("/query", methods=["POST"])
def query():
    # Receive the user input
    data = request.get_json()
    user_question = data.get("question")

    if not user_question:
        return jsonify({"answer": "No question provided."}), 400

    try:
        # Retrieve relevant document chunks
        docs = retriever.get_relevant_documents(user_question)
        retrieved_chunks = [doc.page_content for doc in docs]

        # Build the system prompt
        system_prompt = """
            You are Griffith AI, an assistant who responds only with information provided by the official Griffith College 2025 document.
            If the answer is not in these documents, reply: "I'm not sure about this answer."
            Be clear, professional, and structure your answers appropriately.
        """.strip()

        # Construct the final prompt to send to the LLM
        final_prompt = f"{system_prompt}\n\nQuestion: {user_question}\n\nContent:\n" + "\n\n".join(retrieved_chunks)

        print("Prompt sent to LLM:\n", final_prompt)

        # Generate a response from the LLM
        response = llm.invoke(final_prompt)

        # Return the generated answer along with retrieved sources
        return jsonify({
            "answer": response,
            "sources": retrieved_chunks
        })

    except Exception as e:
        print("Error:", e)
        return jsonify({"answer": "Something went wrong processing your question."}), 500

if __name__ == "__main__":
    app.run(port=5000)
