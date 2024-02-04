import "./App.css";
import InventoryApp from "./components/inventoryApp/InventoryApp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <div className="App">
        <InventoryApp />
      </div>
    </>
  );
}

export default App;
