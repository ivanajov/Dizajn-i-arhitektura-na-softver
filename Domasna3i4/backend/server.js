const express = require('express'),
app = express(),
port = 5000,
bodyParser = require('body-parser'),
cors = require('cors');
path = require('path'),
db = require('./models/index.js');

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), () => console.log('Server listening on port ' + port));

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../")));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, "../index.html"));
});

app.get('/apteki', (req, res) => {
    db.Apteka.findAll()
    .then(apteki => apteki.map(apt => apt.dataValues))
    .then(data => {
        res.send(data);
    });
});
