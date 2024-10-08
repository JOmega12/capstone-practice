// import React from 'react'

import { createContext, useContext, useEffect, useState  } from "react";
import { jwtDecode } from "jwt-decode";


// I BUILT THIS TO GET THE CONCEPT ON HOW TOKENS WORK AND HOW TO LOGIN FROM THE BACKEND
export const AuthContext = createContext(undefined);

// eslint-disable-next-line react/prop-types
export function AuthProvider({children}) {
    
    const [authToken, setAuthToken]= useState(()=>localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null);
    const [user, setUser] = useState(() => localStorage.getItem('authToken') ? jwtDecode(localStorage.getItem('authToken')) : null);

    const [loading, setLoading] = useState(true);




    const loginUser = async(username,password) => {

        // !abstract this code block -----
        const response = await fetch('http://localhost:8000/users/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        })
        // console.log(response, 'response')
        let data = await response.json()
        // *we return await response.json() in the abstracted code
        // !-------------------------------
        // *then we make a function refetch.then(setItem)
        // console.log('data:', data)

        if(response.status === 200){
            setAuthToken(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem("authToken", JSON.stringify(data))
        } else {
            alert("Something went wrong in the Context")
        }
    }   

    const registerUser = async(username, password) => {
        // !abstract this code block -----

        // this is the api code block
        const response = await fetch("http://localhost:8000/users/register/", {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        })
        // !-------------------------------

        const data = await response.json();
        
        if(response.status === 201){
            setAuthToken(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem("authToken", JSON.stringify(data))
        } else {
            alert("Something went wrong in the Context")
        }
    }
    const logoutUser = () => {
        console.log(`You've been logged out`)
        setAuthToken(null)
        setUser(null)
        localStorage.removeItem("authToken")
        // once logged out it goes back to login 
        // check your coffee code for logout instructions
    }

    const updateToken = async() => {
        console.log('updateToken!')
        const response = await fetch('http://localhost:8000/users/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"refresh": authToken?.refresh})
        })
        // console.log(response, 'response')
        let data = await response.json()
        // console.log(data)

        if(response.status === 200) {
            setAuthToken(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem("authToken", JSON.stringify(data))
        } else {
            logoutUser()
        }

        // this check is loading is true
        if(loading){
            setLoading(false);
        }
    }

    useEffect(() => {
        if(loading) {
            updateToken();
        }

        let fourMinutes = 1000 * 60 * 4
        let interval = setInterval(() => {
            if(authToken) {
                updateToken()
            }
        }, fourMinutes);
        return () => clearInterval(interval)
    }, [authToken, loading])
    

    return(
        <AuthContext.Provider value={{
            user,
            authToken,
            loginUser,
            logoutUser,
            registerUser,

        }}>
            {loading ? null : children}
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
