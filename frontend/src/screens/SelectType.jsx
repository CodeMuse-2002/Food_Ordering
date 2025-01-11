import { Link,useNavigate } from 'react-router-dom';
import { useState } from "react";
function SelectType(){

    const [type,setType] = useState('');
    const navigate = useNavigate();
    
    const onSelectListItems = ()=>{
        sessionStorage['type']=type;
        navigate("/listItems");
    }


    return (
        <div className="row">
            <div className="col-3"></div>
                <div className="col">
                    <h2>Online Food Court</h2>
                    <div>
                        <div><input
                        onChange={(e)=>setType(e.target.value)} 
                        type="radio" name="type" id="type" value="Veg"  className="mb-3"/> Veg</div>
                        <div><input
                        onChange={(e)=>setType(e.target.value)}
                        type="radio" name="type" id="type" value="Non-Veg"  className="mb-3"/> Non-Veg</div>
                        <div>
                            <button className="btn btn-primary" onClick={onSelectListItems}>List Items</button>
                            <Link to="/addItems" className="btn btn-primary mx-5">Add Items</Link>
                        </div>
                    </div>
                </div>
            <div className="col-3"></div>
        </div>
    )
}

export default SelectType