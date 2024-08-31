import { createContext, useContext, useState } from "react";



export const ItemContext = createContext(undefined);



// eslint-disable-next-line react/prop-types
export const ItemProvider = ({children}) => {

    const [item, setItem] = useState([]);
    
    return(
        <ItemContext.Provider value={{
            item, setItem
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