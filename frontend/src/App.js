import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Admin from './components/Admin';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

function App() {
  return (
    <>
    <div className="App">
      <h1>Welcome to the Authentication App</h1>
      <p>Please register or login to continue.</p>
    </div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
