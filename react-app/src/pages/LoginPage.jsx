
import {useContext} from 'react'
import { AuthContext } from '../providers/authContext'

export const LoginPage = () => {


    const {loginUser} = useContext(AuthContext)
  return (
    <div>
      <form onSubmit={(e) => loginUser(e)}>
        <input type="text" name="username" id="" placeholder='Enter Username' />
        <input type="text" name="password" id="" placeholder='Enter Password' />
        <input type="submit" />

      </form>
    </div>
  )
}

