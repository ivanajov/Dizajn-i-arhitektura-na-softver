let pharmacyStorage = [];

function createPharmacy(element) {
    let apteka = document.createElement('div');
    apteka.className = "zacuvana-apteka";
    apteka.innerHTML = `<a>${element.ime}</a>`;

    let info = document.createElement('p');
    info.className = "apteka-info";

    info.innerHTML = `
        Адреса: ${element.adresa}
        <br />
        Работно време: пон-саб од 08:00 до 22:00
        <br />
    `;

    apteka.children[0].onclick = function() {
        let x = document.createElement('img');
        x.src = "red-x.png";
        x.style = "max-width: 20px;";
        console.log(this.textContent);
        if (apteka.children.length == 1) {
            apteka.append(info);
            apteka.append(x);

            x.onclick = function () {
                for (let i = 0; i < pharmacyStorage.length; i++) {
                    if (pharmacyStorage[i].ime == element.ime) {
                        pharmacyStorage.splice(i, 1);
                        localStorage.setItem('apteki', JSON.stringify(pharmacyStorage));
                        break;
                    }
                }
                apteka.remove();
            }
        } else {
            while (apteka.children.length != 1) {
                apteka.lastChild.remove();
            }
        }
    }

    return apteka;
}

window.addEventListener('load', () => {
    let aptekiString = localStorage.getItem('apteki');
    if (aptekiString)
        pharmacyStorage = JSON.parse(aptekiString);

    pharmacyStorage.forEach(element => {
        let apteka = createPharmacy(element);
        document.querySelector('#zacuvani-apteki').append(apteka);
    })
    
})