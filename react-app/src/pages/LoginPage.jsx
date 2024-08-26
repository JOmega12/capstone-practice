
import { useState } from 'react';
import { useAuth } from '../providers/AuthContext'
// import { AuthContext } from '../providers/authContext'

export const LoginPage = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {loginUser} = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(username, password);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" value={username} onChange={(e)=> setUsername(e.target.value)} id="" placeholder='Enter Username' />
        <input type="text" name="password" value={password} onChange={(e)=> setPassword(e.target.value)} id="" placeholder='Enter Password' />
        <input type="submit" />

      </form>
    </div>
  )
}

