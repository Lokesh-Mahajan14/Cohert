import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Login from './pages/Login'
import Message from './pages/Message'
import ChatBox from "./pages/ChatBox"
import Connection from './pages/Connection'
import Discover from './pages/Discover'
import Profile from "./pages/Profile"
import CreatePost from './pages/CreatePost'
import Feed from './pages/Feed'
import {useUser} from '@clerk/clerk-react'
import Layout from './pages/Layout'
import {Toaster} from 'react-hot-toast'

function App() {
  const {user}=useUser()
  return (
    <>
      <Toaster/>
        <Routes>
        <Route path='/' element={!user ? <Login/>:<Layout/>}>
          <Route index element={<Feed/>}/>
          <Route path='messages' element={<Message/>}/>
          <Route path='message/:userId' element={<ChatBox/>}/>
          <Route path='connections' element={<Connection/>}/>
          <Route path='discover' element={<Discover/>}/>
          <Route path='profile' element={<Profile/>}/>
          <Route path='profile/:profileId' element={<Profile/>}/>
          <Route path='create-post' element={<CreatePost/>}/>
        </Route>
        </Routes>
       
    </>
  )
}

export default App