import { useState,useEffect } from 'react';
import { loadItems,deleteItem, addInCart,getCartItems } from '../services/item';
import { useNavigate } from 'react-router-dom';

function Itemtable(){
    const [items,setItems] = useState([])
    const [cart,setCart] = useState([]);
    const navigate=useNavigate();
    const onLoadItem = async()=>
    {
        const result = await loadItems()
        if(result['status']=='success')
            {
                //alert("Items loaded");
                setItems(result.data);
            }
        else{
                alert("Items not present");
            } 
    }

    const onUpdate = async(food_item_id)=>{
        sessionStorage['food_item_id']=food_item_id;
        navigate('/updateItems');
    }

    useEffect(()=>{
        onLoadItem();

        return()=>
        {
            console.log("Object dismounted");
        }
    },[])


    async function onDelete(id)
    {
        const result = await deleteItem(id)
        if(result.status=='success')
        {
            alert('Item deleted successfully');
            window.location.reload(false);
        }
        else
        {
            alert('Some error in delete');
        }
    }

    async function addToCart(id)
    {
        const result = await addInCart(id)
        if(result.status=='success')
        {
            alert('Item added to cart successfully');
            loadCart();
        }
        else{
            alert('Some error has occurred');
        }
    }

    async function loadCart()
    {
        const result = await getCartItems();
            if(result.status=='success')
            {
                setCart(result.data);
            }
            else{
                alert('Some error has occurred loading Cart')
            }
    }
    return(      
        <div className="container">
            <div className="row justify-content-md-center">
            <div className="col-2"></div>
                <div className="col">
                    <h2>Items table</h2>
                    <div className='table-responsive'>
                        <table className="table-bordered">
                            <thead className="bg-primary">
                                <th>Sr No</th>
                                <th>Item Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Action</th>
                            </thead>
                            {items.map((item,index)=>{
                                return (
                                    <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item['item_name']}</td>
                                    <td>{item['quantity']}</td>
                                    <td>{item['price']}</td>
                                    <td>{item['description']}</td>
                                    <td>
                                        <button className='btn btn-success' onClick={()=>onUpdate(item['food_item_id'])}>Update</button>
                                        <button className='btn btn-danger' onClick={()=>onDelete(item['food_item_id'])}>Delete</button>
                                        <button className='btn btn-warning' onClick={()=>addToCart(item['food_item_id'])}>Add To Cart</button>
                                    </td>   
                                    </tr>     
                                )
                            })}
                        </table>
                    </div>
                </div>
            <div className="col-2"></div>
        </div>
        <br/><br/>
        {cart.length!=0 && (
            <div className='row justify-content-md-center'>
            <div className='col-3'></div>
                 <div className='col'>
                     <h2 className='heading'>Cart</h2>
                     <div className='table-responsive'>
                     <table className='table-bordered'>
                         <thead>
                             <tr>
                             <th>Food Item</th>
                             <th>Quantity</th>
                             <th>Price</th>
                             <th>Order Date</th>
                             <th>Remove From Cart</th>
                             </tr>
                         </thead>
                         {cart.map((item)=>{
                            return (
                                <tr>
                                    <td>{item['item_name']}</td>
                                    <td>{item['quantity']}</td>
                                    <td>{item['price']}</td>
                                    <td>{item['order_date']}</td>
                                    <td>
                                    <button className='btn btn-danger' onClick={()=>onDelete(item['food_item_id'])}>Delete</button>
                                    </td>
                                </tr>
                            )
                         })}
                     </table>
                     </div>
                 </div>
            <div className='col-3'></div>                    
         </div>
        )}
        </div>
    )
}

export default Itemtable