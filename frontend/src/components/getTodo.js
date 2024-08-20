import axios from 'axios';

const getTodo = () => {
  return axios.get("http://localhost:4000/todos", {
    params: {
      userId: localStorage.getItem("id")
    }
  });
};
export default getTodo;