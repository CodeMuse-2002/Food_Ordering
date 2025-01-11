import axios from 'axios';

export async function addItem(item_name,quantity,price,description,type)
{
    try{
        const url = "http://localhost:4000/item/addItem";

        const body = {
            item_name,
            price,
            quantity,
            description,
            type,
        }

        const response = await axios.post(url,body,{});
        return response.data;
    }catch(ex){
        return {status:"error",error:ex}
    }
}

export async function loadItems()
{
    try{
        const url = 'http://localhost:4000/item/getItems';
        const type=sessionStorage['type'];

        const body = {
            type,
        }
        const response = await axios.post(url,body,{});
        return response.data;
    }catch(ex)
    {
        return {status : "error", error : ex }
    }
} 

export async function getItemList(food_item_id)
{
    try{
        const url = "http://localhost:4000/item/getItemList";
        const id = food_item_id;

        const response = await axios.get(url,{headers:{id,},})
        return response.data;
    }catch(ex)
    {
        return {status : "error", error : ex }
    }
}

export async function updateItem(food_item_id,item_name,quantity,price,description)
{
    try{
        const url = "http://localhost:4000/item/updateItem";
        const body={
            food_item_id,
            item_name,
            quantity,
            price,
            description,
        }

        const response = await axios.put(url,body,{});
        return response.data;
    }
    catch(ex)
    {
        return {status : "error", error : ex }
    }
}

export async function deleteItem(id)
{
    try
    {
        const url = `http://localhost:4000/item/deleteItem/${id}`;
        const response = await axios.delete(url,{});
        return response.data;
    }catch(ex)
    {
        return { status : "error" , error : ex }
    }
}

export async function addInCart(id)
{
    try{
        const url = `http://localhost:4000/item/addToCart/${id}`;
        const response = await axios.post(url,{},{});
        return response.data;
    }catch(ex)
    {
        return { status : "error" , error : ex }
    }
}

export async function getCartItems()
{
    try{
        const url = 'http://localhost:4000/item/getCartItems'
        const response = await axios.get(url,{},{})
        return response.data;
    }catch(ex){
        return {status : "error" , error : ex }
    }
}