import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './config/firebase.js';

const app = express();
const port = 8000;

// Enable CORS for all routes
app.use(cors());
app.use(bodyParser.json());

const myShops = [
    {
        shopId: 100,
        shopName: "Adidas",
        shopType: "Fashion",
        shopLoc: { lat: 100, lon: 150 },
        shopStatus: true
    },

    {
        shopId: 200,
        shopName: "Rolex",
        shopType: "Watch",
        shopLoc: { lat: 150, lon: 190 },
        shopStatus: false
    },
    {
        shopId: 300,
        shopName: "Nike",
        shopType: "Clothes",
        shopLoc: { lat: 130, lon: 290 },
        shopStatus: true
    }];

// GET: http://localhost:xxxx/api/shops
app.get('/api/shops', async (req, res) => {
    try {
        // คำสั่ง: สำหรับการอ่านหรือดึงข้อมูลจาก Documents ที่จัดเก็บภายใน Collection
        const snapshot = await db
            .collection("shops_it_70109")
            .orderBy("shopName", "desc")
            .get();

        const shops = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        res.json(shops);
    } catch (error) {
        res.status(500).json(
            {
                message: "FAILED: การอ่านข้อมูล shops มีปัญหากรุณาตรวจสอบ",
                error: error.message
            }
        );
    }
});

// http://localhost:8000/
app.get('/', (req, res) => {
    res.send('<h1>Web Programming in 2/2569.</h1>');
});

// Route สำหรับการ Read ข้อมูลจากฐานข้อมูลด้วย id
// GET : http://localhos:xxxx/api/shops/1
app.get('/api/shops/:id', async (req, res) => {
    try {
        const doc = await db
            .collection("shops_it_70109")
            .doc(req.params.id)
            .get();

        res.json(
            {
                id: doc.id,
                ...doc.data()
            }
        );
    } catch (error) {
        res.status(500).json(
            {
                message: "FAILED: การอ่านข้อมูล shops ด้วยรหัสร้านค้า (shopId) มีปัญหา กรุณาตรวจสอบ",
                error: error.message
            }
        );
    }
});

app.get('/shops{/:shopId}', (req, res) => {
    const { shopId } = req.params;

    res.set('Content-type', 'application/json');

    if (isNaN(shopId)) {
        res.send(myShops);
    } else {
        const shopItem = myShops.filter(
            shop => { return shop.shopId === Number(shopId) }
        );
        res.send(shopItem[0]);
    }

    // let myText = '';
    // myText += '<h1>Shop infromation:</h1><hr/>';
    // myText += `<b>Shop ID:</b> ${myShops.shopId}<hr/>`;
    // myText += `<b>Shop Name:</b> ${myShops.shopName}<hr/>`;
    // myText += `<b>Shop Type:</b> ${myShops.shopType}<hr/>`;
    // myText += `<b>Shop Location (Lat, Lon):</b>${myShops.shopLoc.lat}, ${myShops.shopLoc.lon}<hr/>`;
    // myText += `<b>Shop Status:</b> ${myShops.shopStatus}<hr/>`;

    res.set('Content-type', 'text/html');
    res.send(myText);
});

app.listen(port, () => {
    console.log(`App listening on port ${port}...`);
});

