import { Link } from "react-router-dom"
import { useAuth } from "./providers/AuthContext"


export const Header = () => {
  const {user, logoutUser} = useAuth();
  return (
    <div>
        <Link to="/">Home</Link>
        <span> | </span>
        {user ? 
          (<>
            <button onClick={logoutUser}>Logout</button>
          </>
          ):(
          <Link to="/login">Login</Link>
            
          )
          }

        {user && <p>Hello {user.username}</p>}
    </div>
  )
}
