import React  from 'react';
import './App.css';
import Header from './component/Header/Header';
import Main from './component/Main/Main';
import Footer from './component/Footer/Footer';
import { useRef } from "react"

function App() {

  
  return (
    <div className="App">

      <div className='header'><Header /></div>
      <div className='main'><Main/></div>
      <div className='footer'><Footer/></div>
      
    </div>
  );
}

export default App;

