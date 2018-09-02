const express = require('express');
const app = express();
const path = require('path');


const port = process.env.PORT || 4200;
app.use(express.static(__dirname + '/dist'));
app.listen(port, () => console.log('Example app listening on port 4200!'))

app.get('/*', (req, res) => res.sendFile(path.join(_dirname+'/dist/index.html')));

