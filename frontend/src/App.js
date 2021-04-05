import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react'

function App() {
  const [msg, setMsg] = useState(0);

  useEffect(() => {
    fetch('/api/hello').then(res => res.json()).then(data => {
      setMsg(data.message);
    });
  }, []);


  return (
    <div className="App">
      <header className="App-header">
       <p> The Message is {msg} </p>
      </header>
    </div>
  );
}

export default App;
