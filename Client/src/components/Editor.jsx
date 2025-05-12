import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { io } from "socket.io-client";

const SAVE_INTERVAL_MS = 2000;

// Function to get the current line number based on the index
const Editor = ({ username }) => {
  const [socket, setSocket] = useState(null);
  const editorRef = useRef(null);
  const userListRef = useRef(null);
  const bannerRef = useRef(null);
  const quillRef = useRef(null); // <-- Store the Quill instance


  // Function to handle the socket connection
  useEffect(() => {
    const s = io("https://wasserstoff-task1.onrender.com");
    setSocket(s);
    return () => s.disconnect();
  }, []);

  useEffect(() => {
    if (!socket || !editorRef.current || quillRef.current) return;

    const quill = new Quill(editorRef.current, { theme: "snow" });
    quill.disable();
    quill.setText("Loading...");
    quillRef.current = quill; // <-- Save it to ref so it persists

    socket.emit("join", username);
  
    // Listen for the "user-list" event to update the user list
   socket.on("update-user-list", (users) => {
  if (userListRef.current) {
    const uppercasedUsers = users.map((user) => user.toUpperCase());
    userListRef.current.innerHTML = `<span class="text-sm">${uppercasedUsers.join(", ")}</span>`;
  }
});

    // Listen for the "load-document" event to load the document
    socket.once("load-document", (document) => {
      quill.setContents(document);
      quill.enable();

      quill.on("text-change", (delta, oldDelta, source) => {
        if (source !== "user") return;
        const index = quill.getSelection()?.index || 0;
        socket.emit("send-changes", { delta, user: username, index });
      });
      

      // Listen for changes from other users
      socket.on("receive-changes", ({ delta, user, index }) => {
        if (user !== username) {
          quill.updateContents(delta);
          highlightChange(user, index, delta);
        }
      });
      
      // Listen for the "save-document" event to save the document
      const interval = setInterval(() => {
        socket.emit("save-document", quill.getContents());
      }, SAVE_INTERVAL_MS);

      return () => clearInterval(interval);
    });
   

    //
    function highlightChange(user, index, delta) {
      if (user !== username && bannerRef.current && quillRef.current) {
        const color = getRandomColor();
        const length = delta.ops.reduce((acc, op) => acc + (op.insert?.length || 0), 0);
        quill.formatText(index, length || 1, { background: color });
        setTimeout(() => {
          quill.formatText(index, length || 1, { background: false });
        }, 1500);
        if (!bannerRef.current.classList.contains("hidden")) {
          bannerRef.current.classList.add("hidden");
        }
        bannerRef.current.textContent = `${user} is editing line ${getLineNumber(index)}`;
        bannerRef.current.style.backgroundColor = color;
        bannerRef.current.classList.remove("hidden");
        setTimeout(() => bannerRef.current.classList.add("hidden"), 2000);
      }
    }
     

    // Function to get the line number based on the index
    function getLineNumber(index) {
      const text = quill.getText(0, index);
      return text.split("\n").length;
    }
    
    // Function to generate a random color
    function getRandomColor() {
      return `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`;
    }
  }, [socket, username]);

  return (
    <div className="flex flex-col w-screen h-screen p-4 bg-gray-100 relative">
      <div className="mb-2 p-2 text-sm text-gray-600">
        Logged in as: <span className="font-semibold">{username}</span>
      </div>
      <div className="mb-2 p-2 bg-gray-50 rounded shadow">
        <div className="text-xs font-bold mb-1">Online Users:</div>
        <div ref={userListRef} className="space-y-1" />
      </div>
      <div
        ref={editorRef}
        className="flex-1 bg-white rounded shadow overflow-y-auto p-2"
      />
      <div
        ref={bannerRef}
        className="hidden absolute top-2 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded text-white text-xs font-medium shadow-md z-10"
      />
    </div>
  );
};


export default Editor;
