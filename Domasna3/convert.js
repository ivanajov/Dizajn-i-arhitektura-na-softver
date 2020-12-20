function xlsxToJSON() {
    let array = [];
    let XLSX = require('xlsx');
    let workbook = XLSX.readFile('apteki.xlsx');
    let sheet_name_list = workbook.SheetNames;
    sheet_name_list.forEach(function(y) {
        let worksheet = workbook.Sheets[y];
        let headers = {};
        let data = [];
        for(z in worksheet) {
            if(z[0] === '!') continue;
            let tt = 0;
            for (let i = 0; i < z.length; i++) {
                if (!isNaN(z[i])) {
                    tt = i;
                    break;
                }
            };
            let col = z.substring(0,tt);
            let row = parseInt(z.substring(tt));
            let value = worksheet[z].v;

            if(row == 1 && value) {
                headers[col] = value;
                continue;
            }

            if(!data[row]) data[row]={};
            data[row][headers[col]] = value;
        }
        data.shift();
        data.shift();
        array.push(data);
    });
    array = array[0];
    array.forEach(pharmacy => {
        let opstini = ["Аеродром", "Бутел", "Гази Баба", "Ѓорче Петров", "Карпош", "Кисела Вода", "Сарај", "Центар", "Чаир", "Шуто Оризари"];
        if (opstini.indexOf(pharmacy.Opstina) != -1)
            pharmacy.Opstina = "Скопје";
    });
    return array;
}

module.exports = { xlsxToJSON };