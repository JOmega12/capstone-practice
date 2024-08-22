// import React from 'react'

import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export function AuthProvider({children}) {
    
    // const [authToken, setAuthToken]= useState(null);
    // const [user, setUser] = useState(null);

    const loginUser = async(e) => {
        e.preventDefault();
        console.log(e.target.username.value, 'value')
        // const response = await fetch('http://127.0.0.1:8000/users/token/', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({'username':e.target.username.value, 'password': e.target.password.value})
        // })
        // let data = await response.json()
        // console.log('data:', data)
    }   

    let contextData = {
        loginUser: loginUser,

    }

    return(
        <AuthContext.Provider value={{contextData}}>
            {children}
        </AuthContext.Provider>
    )
}
