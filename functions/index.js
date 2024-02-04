const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors')({ origin: true });

admin.initializeApp();

const db = admin.firestore();
const inventoryCollection = 'inventory';

const app = express(); 

app.use(cors); 

app.post('/createInventory', async (req, res) => {
    try {
        const newData = req.body;
        const docRef = await db.collection(inventoryCollection).add(newData);
        res.status(201).json({ id: docRef.id });
    } catch (error) {
        res.status(500).send('Error creating inventory: ' + error.message);
    }
});

app.post('/updateInventory', async (req, res) => {
    try {
        const { id, newData } = req.body;
        await db.collection(inventoryCollection).doc(id).update(newData);
        res.status(200).send('Inventory updated successfully');
    } catch (error) {
        res.status(500).send('Error updating inventory: ' + error.message);
    }
});

app.get('/getInventory', async (req, res) => {
    try {
        const snapshot = await db.collection(inventoryCollection).get();
        const inventory = [];
        snapshot.forEach(doc => {
            inventory.push({ id: doc.id, ...doc.data() });
        });
        res.status(200).json(inventory);
    } catch (error) {
        res.status(500).send('Error getting inventory: ' + error.message);
    }
});

app.post('/deleteInventory', async (req, res) => {
    try {
        const { id } = req.body;
        await db.collection(inventoryCollection).doc(id).delete();
        res.status(200).send('Inventory deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting inventory: ' + error.message);
    }
});

exports.api = functions.https.onRequest(app);
