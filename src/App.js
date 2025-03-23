import React from 'react'
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import LoginPage from './components/LoginPage'
import SignUpPage from './components/SignUpPage'
import HomePage from './components/HomePage'
import PostCreationPage from './components/PostCreationPage'
const App = () => {
  return (
    <BrowserRouter >
        <Routes>
            <Route path='/' element={<LoginPage/>}/>
            <Route path='/signup' element={<SignUpPage/>}/>
            <Route path='/home' element={<HomePage/>}/>
            <Route path='/postCreation'element={<PostCreationPage/>}/>
        </Routes>
    </BrowserRouter>
 
  )
}

export default App
