import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {

  const navigate = useNavigate()

  useEffect(() => {
     navigate('/login')
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
