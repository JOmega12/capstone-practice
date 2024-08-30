import { createContext, useContext } from "react";



export const ItemContext = createContext(undefined);


// eslint-disable-next-line react/prop-types
export const ItemProvider = ({children}) => {

    
    return(
        <ItemContext.Provider value={{
            
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