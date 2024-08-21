import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import getTodo from '../getTodo';

const AddTodo = ({ todos, setTodos }) => {
  const [todoName, setTodoName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const navigate = useNavigate();

  function addTodo() {
    axios.post(`${window.location.origin}/addTodo`, {
      name: todoName,
      status: "todo",
      expiryDate: new Date(expiryDate), // Ensure the date is in ISO format
      userId: localStorage.getItem("id")
    })
    .then(getTodo)
    .then((res) => setTodos(res.data))
    .catch((err) => console.log(err));
  }

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (!id) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-lg min-w-72">
      <h2 className="text-xl font-semibold mb-4">Add a New Todo</h2>
      <div className="flex flex-col space-y-4 max-w-md">
        <input
          type="text"
          required
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
          placeholder="Enter todo name"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          value={expiryDate}
          required
          onChange={(e) => setExpiryDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]} // Set min date to today
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTodo}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!todoName && !expiryDate}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddTodo;
