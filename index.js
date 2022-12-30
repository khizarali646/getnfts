require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const {getNFTs} = require("./getnfts");
const port = process.env.PORT || 3001;
const app = express();
app.use(bodyParser.json());



app.post("/getnfts", async (req, res) => {
    const { ownerAddress } = req.body;
    try {
        const nftList = await getNFTs({ ownerAddress : ownerAddress });
        res.send(nftList);
    } catch (e) {
        console.log(e);
        res.send(e.message);
    }
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});