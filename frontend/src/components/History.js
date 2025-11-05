import { useState, useEffect } from 'react';
import axios from 'axios';

function History({ username }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/history/${username}`)
      .then(res => setHistory(res.data))
      .catch(err => console.error(err));
  }, [username]);

  return (
    <div>
      <h2>Conversation History</h2>
      {history.map((item, idx) => (
        <div key={idx}>
          <p><strong>You:</strong> {item.question}</p>
          <p><strong>AI:</strong> {item.answer}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default History;
