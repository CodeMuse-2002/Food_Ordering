import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { getItemList, updateItem } from "../services/item"

function Updateinfo(){
    const [item_name, setItemName] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");

    const [item, setItem]=useState([])
    const navigate=useNavigate();
  
    async function onLoad()
    {
        const food_item_id = sessionStorage['food_item_id']
        const result=await getItemList(food_item_id) 
        if(result['status']=='success')
        {
            console.log('here')
            setItem(result.data[0]);
        }
        else{
            alert(result.error)
        }
    }

    useEffect(() => {
        onLoad();
    }, []);

  
    async function onUpdate() {
        if(type.length==0)
        {
            alert('Enter the type of food');  
        }
        else{
            const food_item_id=sessionStorage['food_item_id']
        const result = await updateItem(food_item_id,item_name,quantity,price,description);
        if(result.status=='success')
        {
            alert('item updated')
            navigate("/ListItems")
        }else{
            alert(result.error)
    }
        }
  }

    return (
        <div className="row">
            <div className="col-3"></div>
                <div className="col">
                    <h2>Update Items</h2>
                    <div>
                        <label htmlFor="">Item Name</label>
                        <input className="form-control mb-3" onChange={(e)=>setItemName(e.target.value)} type="text" defaultValue={item.item_name}/>
                    </div>
                    <div>
                        <label htmlFor="">Price</label>
                        <input className="form-control mb-3" onChange={(e)=>setPrice(e.target.value)} type="text" defaultValue={item.price}/>
                    </div>
                    <div>
                        <label htmlFor="">Description</label>
                        <input className="form-control mb-3" onChange={(e)=>setDescription(e.target.value)} type="text" defaultValue={item.description}/>
                    </div>
                    <div>
                        <label htmlFor="">Quantity</label>
                        <input className="form-control mb-3" onChange={(e)=>setQuantity(e.target.value)} type="text" defaultValue={item.quantity}/>
                    </div>
                    <div>
                        <label htmlFor="">Type</label>
                        <div><input type="radio" name="type" id="type" value="Veg" onChange={(e)=>setType(e.target.value)} className="mb-3"/> Veg</div>
                        <div><input type="radio" name="type" id="type" value="Non-Veg" onChange={(e)=>setType(e.target.value)} className="mb-3"/> Non-Veg</div>
                    </div>
                    <button className="btn btn-primary form-control" onClick={onUpdate}>Update Item</button>
                </div>
            <div className="col-3"></div>
        </div>
    )
}

export default Updateinfo