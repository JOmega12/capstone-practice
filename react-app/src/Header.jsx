import { Link } from "react-router-dom"
import { useAuth } from "./providers/AuthContext"


export const Header = () => {
  const {user} = useAuth();
  return (
    <div>
        <Link to="/">Home</Link>
        <span> | </span>
        <Link to="/login">Login</Link>

        {user && <p>Hello {user.username}</p>}
    </div>
  )
}
