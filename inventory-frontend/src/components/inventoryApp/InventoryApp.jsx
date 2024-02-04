import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./inventoryApp.css"
import { toast } from 'react-toastify';

const InventoryApp = () => {
  const [inventory, setInventory] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: 0 });

  useEffect(() => {
    getInventory();
  }, []);

  const getInventory = async () => {
    try {
      const response = await axios.get('http://localhost:5001/inventory-ad073/us-central1/api/getInventory');
      setInventory(response.data);
    } catch (error) {
      console.error('Error fetching inventory:', error.message);
      toast.error("Error Fetching Inventory");
    }
  };

  const createItem = async () => {
    try {
      await axios.post('http://localhost:5001/inventory-ad073/us-central1/api/createInventory', newItem);
      getInventory();
      setNewItem({ name: '', quantity: 0 });
      toast.success("Inventory Item added");
    } catch (error) {
      console.error('Error creating inventory item:', error.message);
      toast.error("Error creating inventory item");
    }
  };

  const updateItem = async (id, newData) => {
    try {
      await axios.post('http://localhost:5001/inventory-ad073/us-central1/api/updateInventory', { id, newData });
      getInventory();
      toast.success("Inventory Item updated");
    } catch (error) {
      console.error('Error updating inventory item:', error.message);
      toast.error("Error updating inventory item");
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.post('http://localhost:5001/inventory-ad073/us-central1/api/deleteInventory', { id });
      getInventory();
      toast.success("Inventory Item deleted");
    } catch (error) {
      console.error('Error deleting inventory item:', error.message);
      toast.error("Error deleting inventory item");

    }
  };

  return (
    <div className='inventory'>
      <h1>Tanui Industries Inventory App</h1>
      <div>
        <h2>Inventory List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>
                  <button onClick={() => updateItem(item.id, { quantity: item.quantity + 1 })}>Increment</button>
                  <button onClick={() => updateItem(item.id, { quantity: item.quantity - 1 })}>Decrement</button>
                  <button onClick={() => deleteItem(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Create New Item</h2>
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value, 10) })}
        />
        <button onClick={createItem}>Create</button>
      </div>
    </div>
  );
};

export default InventoryApp;
