const express = require('express')
const port = process.env.PORT || 3043
const path = require('path');
require('dotenv/config')

const app = express()


app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, function(){
	console.log("Running on " + port)
});