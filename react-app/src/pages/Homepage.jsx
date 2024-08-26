import {useState, useEffect} from 'react'
import { useAuth } from '../providers/AuthContext';

export const Homepage = () => {

  const {authToken} = useAuth();

  const [item, setItem] = useState([]);

  console.log(authToken, 'auth')
  const getItems = async() => {

    try {
        const response = await fetch("http://127.0.0.1:8000/items/api/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + String(authToken.access)
          }
        });
        if(!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        console.log(response, 'resposne in homepage')
        console.log(data, 'items')
        setItem(data)
    } catch(e){
      console.error(e)
    }
  }


  
  useEffect(() => {
    getItems()
  }, [])


  return (
    <div>
      This is Homepage

      <ul>
        {item.map((item, key) => (
          <>
            <li key={key}>{item.name}</li>
            <li>{item.body}</li>
          </>
        ))}
      </ul>
    </div>
  )
}

