import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';
import AddTodo from '../AddTodo/AddTodo';
import getTodo from '../getTodo';

const Todo = () => {
  const [todos, setTodos] = useState(null);
  const [loading, setLoading] = useState(true);

  async function changeStatus(todo, status) {
    setLoading(true);
    try {
      await axios.post("http://localhost:4000/todo/changeStatus", {
        todoId: todo._id,
        status: status
      });
      const updatedTodos = await getTodo();
      setTodos(updatedTodos.data);
    } catch (err) {
      console.error("Error changing status:", err);
    } finally {
      setLoading(false); // Ensure this is always called
    }
  }

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true); // Set loading true before fetching todos
      try {
        const res = await getTodo();
        setTodos(res.data);
      } catch (err) {
        console.error("Error fetching todos:", err);
      } finally {
        setLoading(false); // Ensure loading is set to false after fetching
      }
    };

    fetchTodos();
  }, []);

  return (
    <div className="p-4 max-w-screen-lg mx-auto">
      <AddTodo todos={todos} setTodos={setTodos} />

      {loading ? (
        <Loading height={350} />
      ) : todos?.length > 0 ? (
        <div className="mt-4 space-y-4">
          {todos.map((todo, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg shadow-md flex items-center justify-between bg-white">
              <div className="flex flex-col">
                <div className="text-lg font-semibold">{todo.name}</div>
                {todo.status !== "expired" && (
                  <div className="text-sm text-gray-500">{new Date(todo.expiryDate).toLocaleString()}</div>
                )}
              </div>
              <div className="flex space-x-2">
                {todo.status === "todo" ? (
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => changeStatus(todo, "progress")}
                    disabled={loading} // Disable button when loading
                  >
                    Start
                  </button>
                ) : todo.status === "progress" ? (
                  <button
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    onClick={() => changeStatus(todo, "completed")}
                    disabled={loading} // Disable button when loading
                  >
                    Mark as Complete
                  </button>
                ) : (
                  <button
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    disabled
                  >
                    {todo.status}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4 text-center text-gray-500">Todos Not Found</div>
      )}
    </div>
  );
};

export default Todo;
