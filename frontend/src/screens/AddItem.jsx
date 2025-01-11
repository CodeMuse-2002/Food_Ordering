import {useState } from "react";
import { addItem } from "../services/item";
import { useNavigate } from "react-router-dom";
function AddItem(){
    const [ item_name,setItemName ] = useState('');
    const [ price,setPrice ] = useState('');
    const [ quantity,setQuantity ] = useState('');
    const [ description,setDescription ] = useState('');
    const [ type,setType ] = useState('');

    const navigate = useNavigate();

    const onAddItem = async()=>{
        const result = await addItem(item_name,quantity,price,description,type);
        if(result['status']=='success')
        {
            alert("item added");
            navigate("/");
        }
        else
        {
            alert('Some problem occurred');
        }
    }


    return (
        <div className="row">
            <div className="col-3"></div>
                <div className="col">
                    <h2>Add Items</h2>
                    <div>
                        <label htmlFor="">Item Name</label>
                        <input 
                        onChange={(e)=>setItemName(e.target.value)}
                        className="form-control mb-3" type="text"/>
                    </div>
                    <div>
                        <label htmlFor="">Price</label>
                        <input 
                        onChange={(e)=>setPrice(e.target.value)}
                        className="form-control mb-3" type="text"/>
                    </div>
                    <div>
                        <label htmlFor="">Quantity</label>
                        <input 
                        onChange={(e)=>setQuantity(e.target.value)}
                        className="form-control mb-3" type="text"/>
                    </div>
                    <div>
                        <label htmlFor="">Description</label>
                        <input 
                        onChange={(e)=>setDescription(e.target.value)}
                        className="form-control mb-3" type="text"/>
                    </div>
                    <div>
                        <label htmlFor="">Type</label>
                        <div><input type="radio" name="type" id="type" value="Veg" 
                        onChange={(e)=>setType(e.target.value)}
                        className="mb-3"/> Veg</div>
                        <div><input type="radio" name="type" id="type" value="Non-Veg" 
                        onChange={(e)=>setType(e.target.value)}
                        className="mb-3"/> Non-Veg</div>
                    </div>
                    <button className="btn btn-primary form-control" 
                    onClick={onAddItem}
                    >Add Item</button>
                </div>
            <div className="col-3"></div>
        </div>
    )
}

export default AddItem