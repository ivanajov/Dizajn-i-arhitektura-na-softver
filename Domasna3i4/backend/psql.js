const db = require('./models/index.js');
const fs = require('fs');

const apteki = JSON.parse(fs.readFileSync('apteki.json'));

for (let apteka of apteki) {
    db.Apteka.findOrCreate({
            where: {
                id: parseInt(apteka.id),
                Ime: apteka.Ime,
                Adresa: apteka.Adresa,
                Opstina: apteka.Opstina,
                TelBroj: parseInt(apteka.TelBroj),
                Rating: parseFloat(apteka.Rating),
                lat: apteka.lat,
                lon: apteka.lon
            }
        })
        .then(([aptekaObj, created]) => {
            console.log(aptekaObj, created);
        })
};