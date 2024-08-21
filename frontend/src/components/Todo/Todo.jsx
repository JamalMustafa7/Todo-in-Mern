import React, { useEffect, useState,useCallback } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';
import AddTodo from '../AddTodo/AddTodo';
import getTodo from '../getTodo';
import { useNavigate } from 'react-router-dom';
const Todo = () => {
  const [todos, setTodos] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate()
  async function changeStatus(todo,status)
  {
    setLoading(true)
    try{
      await axios.post("http://localhost:4000/todo/changeStatus", {
        todoId: todo._id,
        status: status
      });
      const updatedTodos = await getTodo();
      setLoading(false)
      setTodos(updatedTodos.data);
      checkExpired()
    }
    catch(err)
    {
      console.log(err)
    }
  }
    const checkExpired = async () => {
      setLoading(true);
      if (todos) {
        // Use forEach correctly with async/await
        const updatePromises = todos.map(async (todo) => {
          if (Date.now() >= new Date(todo.expiryDate).getTime() && todo.status !== "expired") {
            return axios.post("http://localhost:4000/todo/changeStatus", {
              todoId:todo._id,
              status: "expired"
            });
          }
          return null;
        }).filter(promise => promise !== null);
  
        try {
          await Promise.all(updatePromises);
          const updatedTodos = await getTodo();
          setTodos(updatedTodos.data);
        } catch (err) {
          console.log("Error updating todos:", err);
        } finally {
          setLoading(false);
        }
      }
    };
  useEffect(() => {
    getTodo()
      .then((res) => setTodos(res.data))
      .catch((err) => console.log("err"))
      .finally(() => setLoading(false));
      checkExpired()
  }, []);

  
  return (
    <div className="p-4 max-w-5xl min-w-80 mx-auto">
      <button
              className={`mb-3 p-2 text-white rounded-lg focus:outline-none bg-blue-500 hover:bg-blue-600'} transition-colors duration-300`}
              onClick={()=>{
                localStorage.removeItem("id")
                navigate("/login")
              }}
            >
              Logout
        </button>
      <AddTodo todos={todos} setTodos={setTodos} />
      {loading ? (
        <Loading height={350} />
      ) : todos?.length > 0 ? (
        <div className="mt-4 space-y-4">
          {todos.slice().reverse().map((todo, index) => {
           return  <div key={index} className="p-4 border border-gray-200 rounded-lg shadow-md flex items-center justify-between bg-white">
              <div className="flex flex-col">
                <div className="text-lg font-semibold">{todo.name}</div>
                {todo.status !== "expired" && (
                  <div className="text-sm text-gray-500">Expiration Date: {new Date(todo.expiryDate).toLocaleDateString()}</div>
                )}
              </div>
              <div className="flex space-x-2">
                {todo.status === "todo" ? (
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={()=>changeStatus(todo,"progress")}>
                    Start
                  </button>
                ) : todo.status === "progress" ? (
                  <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600" onClick={()=>changeStatus(todo,"Completed")}>
                    Mark as Complete
                  </button>
                ) : (
                  <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600" disabled>
                    {todo.status}
                  </button>
                )}
              </div>
            </div>}
          )}
        </div>
      ) : (
        <div className="mt-4 text-center text-gray-500">Todos Not Found</div>
      )}

      
    </div>
  );
};

export default Todo;
