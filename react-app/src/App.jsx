// import { useState } from 'react'

import { Header } from "./Header"
import {Homepage} from "./pages/Homepage"
import {LoginPage} from "./pages/LoginPage"
import {Routes, Route} from 'react-router-dom'
import { AuthProvider } from "./providers/AuthContext"



function App() {
  // const [count, setCount] = useState(0)

  return (
    <div>
      <AuthProvider>
        <Header/>
        <Routes>
          <Route path="/" element={<Homepage />}/>
          <Route path="/login" element={<LoginPage />}/>
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App
