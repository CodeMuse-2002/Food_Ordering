import SelectType from "./screens/SelectType";
import { Routes,Route } from "react-router-dom"
import Itemtable from "./screens/Itemtable";
import AddItem from "./screens/AddItem";
import Updateinfo from "./screens/Updateinfo";

function App() {
  return (
    <div className="container-fluid">
      <Routes>
      <Route path="/" element={<SelectType/>} />
      <Route path="/listItems" element={<Itemtable/>} />
      <Route path="/addItems" element={<AddItem/>} />
      <Route path="/updateItems" element={<Updateinfo/>}/>
    </Routes>
    </div>
  );
}

export default App;
