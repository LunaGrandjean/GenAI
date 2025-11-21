# GenAI LLM-Project

This project leverages a local LLM (LLaMA 3 via [Ollama](https://ollama.com)) and FAISS to build a searchable knowledge base from the Griffith College Prospectus 2025. It includes a full-stack application with a Node.js backend, a React frontend, and a PostgreSQL database.

---

## Features

- Local LLM question answering using LLaMA 3 and Ollama  
- FAISS-based vector search for efficient information retrieval  
- Cleaned and processed Griffith College Prospectus 2025  
- Secure user authentication and conversation saving  
- PostgreSQL integration for structured data storage  
- Modern React frontend interface  

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/LunaGrandjean/LLM-Project.git
cd LLM-Project
```

---

### 2. Start Ollama with LLaMA 3

Ensure that **Ollama** is installed and running on your system.

Pull the LLaMA 3 model if you haven’t already:

```bash
ollama pull llama3
```

You can test it with:

```bash
ollama run llama3
```

Keep Ollama running in the background during the project.

---

### 3. Build the FAISS Vectorstore

From the project root directory:

```bash
python build_vectorstore.py
```

This script will:
- Load the cleaned Griffith College prospectus  
- Generate text embeddings  
- Build a FAISS vectorstore for fast semantic search  

A `vectorDb` folder will be created. Move it into the `llm-service` directory.

---

### 4. Start the LLM Service

```bash
cd griffith-ai-app/llm-service
python llm-service.py
```

This launches a **Flask** app that exposes a `/query` endpoint to handle communication between the backend and the local LLM.

---

### 5. Configure and Start the Backend (PostgreSQL)

The backend is built with **Node.js (Express)** and uses **PostgreSQL** for persistent data storage.

#### Create the database
Make sure PostgreSQL is installed and running, then create a database:

```sql
CREATE DATABASE griffith_ai;
```

#### Set up your `.env` file
In `griffith-ai-app/backend/.env`:

```bash
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/griffith_ai
PORT=8000
REACT_APP_API_BASE=http://localhost:5000
JWT_SECRET=your_secure_secret
```

#### Start the backend
```bash
cd griffith-ai-app/backend
node server.js
```

If everything is configured correctly, you should see:
```
Connecting to PostgreSQL...
Connected to PostgreSQL
Server running on port 8000
```

The backend handles:
- User registration and login (JWT authentication)
- Conversation and message storage in PostgreSQL
- Communication with the LLM Flask service

---

### 6. Start the Frontend

```bash
cd griffith-ai-app/frontend
npm install
npm start
```

The frontend will run on [http://localhost:3000](http://localhost:3000).

---

## Database Structure

The PostgreSQL database uses three main tables:

### **users**
| Column     | Type        | Description                     |
|-------------|-------------|---------------------------------|
| id          | SERIAL PK   | Unique user ID                  |
| email       | VARCHAR     | User’s email address            |
| password    | VARCHAR     | Hashed password                 |
| created_at  | TIMESTAMP   | Account creation date           |

### **conversations**
| Column        | Type        | Description                            |
|----------------|-------------|----------------------------------------|
| id             | SERIAL PK   | Unique conversation ID                 |
| username       | VARCHAR     | Linked user identifier                 |
| title          | VARCHAR     | Conversation title                     |
| updated_at     | TIMESTAMP   | Last updated timestamp                 |

### **messages**
| Column          | Type        | Description                            |
|------------------|-------------|----------------------------------------|
| id               | SERIAL PK   | Unique message ID                      |
| conversation_id  | INTEGER FK  | Linked conversation ID                 |
| sender           | VARCHAR     | "user" or "ai"                         |
| text             | TEXT        | Message content                        |
| created_at       | TIMESTAMP   | Message creation date                  |

---

## Usage

Once the frontend is running:

1. Register or log in.
2. Ask a question about Griffith College.
3. Example:  
   _“What postgraduate courses are available in Computing?”_

Your question is sent to the backend, which queries the LLM service.  
The response and conversation history are then saved in PostgreSQL.

---

## Troubleshooting

- Ensure **Ollama** and **PostgreSQL** are running.  
- Check that your `.env` file credentials match your local database setup.  
- If the backend fails to connect, verify your PostgreSQL username, password, and port.  
- Re-run `build_vectorstore.py` if your FAISS index becomes outdated.  

---

## Project Authors

- **Luna Grandjean**
- **Anna Bordachar**
- **Mathilde Maudet**  
- **Sereine Tawamba**
