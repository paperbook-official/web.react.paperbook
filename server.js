const express = require('express');
const path = require('path');
const favicon = require('express-favicon');

const app = express();
const port = process.env.PORT || 3000;

app.use(favicon(__dirname + '/build/favicon.ico'));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port);
