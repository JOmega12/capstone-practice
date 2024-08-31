// import {useState, useEffect} from 'react'
// import { useAuth } from '../providers/AuthContext';
// import { useState } from 'react';
import { Register } from './RegisterPage';
import { useItem } from '../providers/ItemContext';
import { CreateItem } from './CreateItem';

export const Homepage = () => {

  const {item} = useItem()
  // const {authToken} = useAuth();

  // const [item, setItem] = useState([]);

  // console.log(authToken, 'auth')

  // const getItems = async() => {

  //   try {
  //       const response = await fetch("http://127.0.0.1:8000/items/api/", {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Authorization": "Bearer " + String(authToken.access)
  //         }
  //       });
  //       if(!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`)
  //       }
  //       const data = await response.json()
  //       console.log(response, 'resposne in homepage')
  //       console.log(data, 'items')
  //       setItem(data)
  //   } catch(e){
  //     console.error(e)
  //   }
  // }


  
  // useEffect(() => {
  //   getItems()
  // }, [])


  return (
    <div>
      This is Homepage

      <ul>
        {item.map((item, key) => (
          <>
            <h2 key={key}>{item.name}</h2>
            <li>body: {item.body}</li>
            <li>created: {item.created}</li>
          </>
        ))}
      </ul>


      <div>
        <h2>Register here</h2>
        <Register />
      </div>

      <div>
        <h2>Create Item here</h2>
        <CreateItem />
      </div>
    </div>
  )
}

