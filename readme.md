# 📝 Real-Time Collaborative Editor

A real-time collaborative rich-text editor built with **ReactJS**, **TailwindCSS**, **Socket.IO**, and **Quill.js**. This editor allows multiple users to edit the same document simultaneously with live updates, user identification, and activity tracking—all in a clean and responsive interface.

---

## 🚀 Features

- 🧑‍🤝‍🧑 **Multi-User Real-Time Editing**  
  Edits made by one user are instantly synchronized across all connected clients via WebSockets.

- 🔄 **Live Synchronization**  
  Changes propagate in real-time using efficient WebSocket communication.

- 🧑 **User Identification**  
  Each user enters a unique name/ID when joining, shown to all collaborators.

- ✍️ **Live Edit Tracking**  
  Visual indicators for who is typing, where their cursor is, or what was changed.

- 💻 **Rich Text Editing**  
  Formatting support like bold, italic, underline, headers, bullet lists, and more via Quill.js.

- 🌐 **Responsive Design**  
  Styled with TailwindCSS for modern and mobile-friendly UI.

- 🧩 **Modular & Lightweight**  
  Can run locally without a database. Perfect for demos or personal use.

---

## 🛠️ Tech Stack

- **Frontend:** ReactJS, Quill.js, TailwindCSS  
- **Backend:** Node.js, Express, Socket.IO  
- **Communication:** WebSockets (via Socket.IO)

---

## 📦 Installation & Setup Guide

### 🔁 Clone the Repository

```bash
git clone https://github.com/your-username/realtime-collab-editor.git
cd realtime-collab-editor
```

### 🖥️ Start the Project Locally

#### 1. Install Dependencies

Navigate to the project directory and install dependencies for both the frontend and backend:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

#### 2. Start the Backend Server

Run the backend server:

```bash
cd backend
npm start
```

The backend server will start on `http://localhost:5000` (or the port specified in your configuration).

#### 3. Start the Frontend Development Server

Run the frontend development server:

```bash
cd ../frontend
npm start
```

The frontend will start on `http://localhost:3000` by default.

---

### 🌟 Access the Application

Once both servers are running, open your browser and navigate to `http://localhost:3000` to use the application.
