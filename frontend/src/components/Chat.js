import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown"; // Allows rendering of Markdown text
import Sidebar from "./Sidebar"; // Sidebar component for conversations

function Chat({ username }) {
  // State hooks to manage chat state
  const [messages, setMessages] = useState([]); // Messages in the current conversation
  const [question, setQuestion] = useState(""); // User input
  const [loading, setLoading] = useState(false); // Loading state when awaiting LLM response
  const [conversations, setConversations] = useState([]); // List of all conversations
  const [activeConversationId, setActiveConversationId] = useState(null); // Currently active conversation

  /* ─────────── Load user's conversation list when component mounts ─────────── */
  useEffect(() => {
    (async () => {
      const res = await axios.get(
        "http://localhost:8000/api/chat/conversations",
        { params: { userId: username } }
      );
      setConversations(res.data); // Set retrieved conversations
    })();
  }, [username]);

  /* ─────────── Handle sending a question ─────────── */
  const handleSend = async () => {
    if (!question.trim()) return; // Prevent empty submissions

    const userMsg = { sender: "user", text: question };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages); // Show user's message instantly
    setQuestion(""); // Clear input
    setLoading(true); // Show loading state

    try {
      // Send the question to the backend
      const res = await axios.post("http://localhost:8000/api/chat/query", {
        username,
        question,
        conversationId: activeConversationId,
      });

      const aiMsg = { sender: "ai", text: res.data.answer };
      const newMessages = [...updatedMessages, aiMsg];
      setMessages(newMessages); // Display AI's response

      if (!activeConversationId && res.data.conversationId) {
        // If it's a new conversation
        setActiveConversationId(res.data.conversationId);
        setConversations((prev) => [
          {
            _id: res.data.conversationId,
            title: question.slice(0, 50), // Use the first 50 chars as title
            messages: newMessages,
          },
          ...prev,
        ]);
      } else {
        // Update existing conversation
        setConversations((prev) =>
          prev.map((c) =>
            c._id === res.data.conversationId
              ? { ...c, messages: newMessages }
              : c
          )
        );
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: " Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  /* ─────────── Handle pressing Enter to send ─────────── */
  const handleEnter = (e) => {
    if (e.key === "Enter") handleSend();
  };

  /* ─────────── Sidebar helper functions ─────────── */
  // Load a selected conversation
  const handleSelectConversation = (conv) => {
    if (!conv || !conv.messages) return;
    setMessages(conv.messages);
    setActiveConversationId(conv._id);
  };

  // Start a new conversation
  const handleNewConversation = () => {
    setMessages([]);
    setActiveConversationId(null);
  };

  // Delete a conversation
  const handleDeleteConversation = async (id) => {
    await axios.delete(`http://localhost:8000/api/chat/conversations/${id}`);
    setConversations((prev) => prev.filter((c) => c._id !== id));
    if (activeConversationId === id) handleNewConversation(); // Reset if current conv deleted
  };

  // Rename a conversation
  const handleRenameConversation = async (id, newTitle) => {
    const res = await axios.put(
      `http://localhost:8000/api/chat/conversations/${id}`,
      { title: newTitle }
    );
    setConversations((prev) =>
      prev.map((c) => (c._id === id ? { ...c, title: res.data.title } : c))
    );
  };

  /* ─────────── Render ─────────── */
  return (
    <div className="main-layout">
      {/* Sidebar component */}
      <Sidebar
        userId={username}
        conversations={conversations}
        onSelectConversation={handleSelectConversation}
        onNewConversation={handleNewConversation}
        onDeleteConversation={handleDeleteConversation}
        onRenameConversation={handleRenameConversation}
      />

      <main className="chat-main">
        <h2>Ask something about Griffith College</h2>

        {/* Input area for questions */}
        <div className="input-area">
          <input
            type="text"
            placeholder="Type your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleEnter}
          />
          <button onClick={handleSend}>➤</button>
        </div>

        {/* Messages area */}
        <div className="chat-container">
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.sender}`}>
              {msg.sender === "ai" ? (
                <ReactMarkdown>{msg.text}</ReactMarkdown> // Render AI message with Markdown
              ) : (
                msg.text // Render user message as plain text
              )}
            </div>
          ))}
          {/* Show loading indicator when waiting for AI response */}
          {loading && <div className="message ai"> Thinking...</div>}
        </div>
      </main>
    </div>
  );
}

export default Chat;
