let pharmacyStorage = [];

// Kreira element koj gi sodrzi informaciite na zacuvana apteka
function createPharmacy(element) {
    let apteka = document.createElement('div');
    apteka.className = "zacuvana-apteka";
    apteka.innerHTML = `<a>${element.Ime}</a>`;

    let info = document.createElement('p');
    info.className = "apteka-info";

    info.innerHTML = `
        Адреса: ${element.Adresa}
        <br />
        Работно време: пон-саб од 08:00 до 22:00
        <br />
        Број за контакт: 0${element.TelBroj}
        <br />
        Рејтинг: ${element.Rating}
        <br />
    `;

    apteka.children[0].onclick = function() {
        let x = document.createElement('img');
        x.src = "assets/icons/red-x.png";
        x.style = "max-width: 20px;";

        let navbtn = document.createElement('span');
        navbtn.innerHTML = 'Навигација';
        navbtn.id = "navbtn";

        navbtn.onclick = () => {
            localStorage.setItem("odbranaApteka", JSON.stringify(element));
            window.location.href = "/navigacija.html";    
        }

        navbtn.onmouseenter = function() {
            this.style.fontSize = "22px";
            this.style.cursor = "pointer";
        }

        navbtn.onmouseleave = function() {
            this.style.fontSize = "20px";
            this.style.cursor = "";
        }

        if (apteka.children.length == 1) {
            apteka.append(info);
            apteka.append(x);
            apteka.append(navbtn);  

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
    
    // Gi izminuva site zacuvani apteki vo localStorage i za sekoja kreira element so informacii
    pharmacyStorage.forEach(element => {
        let apteka = createPharmacy(element);
        document.querySelector('#zacuvani-apteki').append(apteka);
    })
    
})
