import { useState } from "react"
import { useItem } from "../providers/ItemContext";

export const CreateItem = () => {
    
    const {createItem} = useItem();

    const [name, setName] = useState("");
    const [itemBody, setItemBody] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();

        createItem({name, body: itemBody});
    }
    return(
        <>
            <h2>Add Item</h2>
            <form action="" onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="name"/>
                <input type="text" value={itemBody} onChange={(e) => setItemBody(e.target.value)} placeholder="bodyName"/>
                <input type="submit" />
            </form>
        </>
    )
}
