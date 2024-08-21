import axios from 'axios';

const getTodo = () => {
  return axios.get(`${window.location.origin}/todos`, {
    params: {
      userId: localStorage.getItem("id"),
    }
  });
};
export default getTodo;