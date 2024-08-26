// import React from 'react'

import { createContext, useContext, useState  } from "react";
import { jwtDecode } from "jwt-decode";


export const AuthContext = createContext(undefined);

// eslint-disable-next-line react/prop-types
export function AuthProvider({children}) {
    
    const [authToken, setAuthToken]= useState(null);
    const [user, setUser] = useState(null);
    const loginUser = async(username,password) => {
        const response = await fetch('http://localhost:8000/users/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        })
        console.log(response, 'response')
        let data = await response.json()
        // console.log('data:', data)

        if(response.status === 200){
            setAuthToken(data)
            setUser(jwtDecode(data.access))
        } else {
            alert("Something went wrong in the Context")
        }
    }   


    return(
        <AuthContext.Provider value={{
            user,
            loginUser,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth =() => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("Please use useAuth hook")
    }

    return context;
}
