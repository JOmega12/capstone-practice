import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";



export const ItemContext = createContext(undefined);



// eslint-disable-next-line react/prop-types
export const ItemProvider = ({children}) => {

    const {authToken, logoutUser} = useAuth();


    const [item, setItem] = useState([]);
    

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
            if(response.statusText === 'Unauthorized') {
              logoutUser()
            }

            const data = await response.json();
            console.log(response, 'resposne in homepage')
            console.log(data, 'items')
            return data;
        } catch(e){
          console.log(e)
          return null
        }
      }

    
    const fetchData = async() => {
        const data = await getItems();
        if(data){
            setItem(data)
        }
    }


    useEffect(() => {
      fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const createItem = async(name, body) => {
      try {
        const response = await fetch("http://127.0.0.1:8000/items/api/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + String(authToken.access)
          },
          body: JSON.stringify({name, body})
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json();
        await fetchData();
        return data
      } catch(e) {
        console.log(e)
        return null
      }


    }
    
    return(
        <ItemContext.Provider value={{
            item, setItem, createItem
        }}>
            {children}
        </ItemContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useItem = () => {
    const context = useContext(ItemContext);
    if(!context){
        throw new Error("Please use useAuth hook")
    }

    return context;
}