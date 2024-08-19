import Login from "./components/Login/Login.jsx";
import Signup from "./components/signup/Signup.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Signup />} path="/"/>
          <Route element={<Login />}  path="/login"/>
          <Route element={<NotFound />}  path="/*"/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
