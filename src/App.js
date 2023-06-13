import React from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import styled from 'styled-components'
import Login from './Login/Login'
import Register from './Login/Register'
import Chatroom from './chatroom/Chatroom'

function App() {
  return (
    <Background>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/Register' element={<Register/>}/>
          <Route path='/Chatroom' element={<Chatroom/>}/>
        </Routes>
      </BrowserRouter>
    </Background>
  );
}

const Background = styled.div`
  overflow: hidden;
  height: 100%;
`


export default App;
