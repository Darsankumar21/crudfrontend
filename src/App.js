import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        if (!apiUrl) {
          throw new Error("API URL is not defined in environment variables");
        }
        console.log('Fetching users from:', apiUrl);
        const response = await axios.get(`${apiUrl}/`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      if (!apiUrl) {
        throw new Error("API URL is not defined in environment variables");
      }
      console.log('Submitting to:', apiUrl);
      await axios.post(`${apiUrl}/`, { username });
      setUsers([...users, { username }]);
      setUsername("");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>User Management App</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />
          <button type="submit">Add User</button>
        </form>
        <div>
          <h2>User List</h2>
          <ul>
            {users.map((user, index) => (
              <li key={index}>{user.username}</li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default App;
