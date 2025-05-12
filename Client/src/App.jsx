import React, { useState } from "react";
import Editor from "./components/Editor";
import "./App.css"; 

const App = () => {
  const [username, setUsername] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#989ca0] flex items-center justify-center px-4">
      {!submitted ? (      // Show the form if not submitted *)
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm bg-white p-8 rounded-2xl space-y-6 border border-gray-200"
        >
          <h1 className="text-2xl font-semibold text-gray-800 text-center tracking-tight">
            Join the Editor
          </h1>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-2 mt-6 text-sm bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 rounded-md transition-colors"
          >
            Enter
          </button>
        </form>
      ) : (   //Show the editor if submitted 
        <Editor  username={username}  />
      )}
    </div>
  );
};

export default App;
