const express = require('express');

const app = express();


const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + '/dist/orangetalents'));

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/dist/orangetalents/index.html');
})

app.listen(PORT, () => {
    console.log(__dirname+'/dist/orangetalents/index.html');
})