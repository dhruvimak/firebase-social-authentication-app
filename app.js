const express = require('express');
const app = express();
const path = require('path');


const port = process.env.PORT || 8080;
app.use(express.static(__dirname + '/dist'));

app.get('/*', (req, res) => res.sendFile(path.join(_dirname+'/dist/index.html'));

app.listen(port, () => console.log('Example app listening on port 8080!'))