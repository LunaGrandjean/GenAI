const express = require("express");
const router = express.Router();
const axios = require("axios");

// ROUTE: POST /query
// Purpose: Handle querying the LLM and saving/continuing the conversation
router.post("/query", async (req, res) => {
  const pool = req.app.get("pool");
  const { question, username, conversationId } = req.body;

  try {
    // --- Query the LLM API ---
    const response = await axios.post("http://127.0.0.1:5000/query", { question });
    const answer = response.data.answer;
    const sources = response.data.sources || [];

    let conversation_id;

    if (conversationId) {
      // --- Continue existing conversation ---
      const convo = await pool.query("SELECT id FROM conversations WHERE id = $1", [conversationId]);
      if (convo.rows.length === 0) {
        return res.status(404).json({ message: "Conversation not found" });
      }

      conversation_id = conversationId;
    } else {
      // --- Create new conversation ---
      const newConvo = await pool.query(
        "INSERT INTO conversations (username, title) VALUES ($1, $2) RETURNING id",
        [username, question.slice(0, 50)]
      );
      conversation_id = newConvo.rows[0].id;
    }

    // --- Save both user and AI messages ---
    await pool.query(
      "INSERT INTO messages (conversation_id, sender, text) VALUES ($1, $2, $3), ($1, $4, $5)",
      [conversation_id, "user", question, "ai", answer]
    );

    res.json({
      answer,
      conversationId: conversation_id,
      sources,
    });
  } catch (err) {
    console.error("LLM query error:", err.message);
    res.status(500).json({ message: "LLM query failed" });
  }
});

// ROUTE: GET /conversations
// Purpose: Get all conversations of a specific user
router.get("/conversations", async (req, res) => {
  const pool = req.app.get("pool");
  const { userId } = req.query;

  try {
    const conversations = await pool.query(
      "SELECT * FROM conversations WHERE username = $1 ORDER BY updated_at DESC",
      [userId]
    );
    res.json(conversations.rows);
  } catch (err) {
    console.error("Fetch conversations error:", err.message);
    res.status(500).json({ message: "Failed to fetch conversations" });
  }
});

// ROUTE: DELETE /conversations/:id
// Purpose: Delete a conversation by ID
router.delete("/conversations/:id", async (req, res) => {
  const pool = req.app.get("pool");
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM messages WHERE conversation_id = $1", [id]);
    await pool.query("DELETE FROM conversations WHERE id = $1", [id]);
    res.json({ message: "Conversation deleted" });
  } catch (err) {
    console.error("Delete conversation error:", err.message);
    res.status(500).json({ message: "Failed to delete conversation" });
  }
});

// ROUTE: PUT /conversations/:id
// Purpose: Rename an existing conversation
router.put("/conversations/:id", async (req, res) => {
  const pool = req.app.get("pool");
  const { id } = req.params;
  const { title } = req.body;

  try {
    const updated = await pool.query(
      "UPDATE conversations SET title = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *",
      [title, id]
    );
    res.json(updated.rows[0]);
  } catch (err) {
    console.error("Rename conversation error:", err.message);
    res.status(500).json({ message: "Failed to rename conversation" });
  }
});

module.exports = router;
