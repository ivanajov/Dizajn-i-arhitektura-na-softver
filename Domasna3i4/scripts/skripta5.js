let pharmacyStorage = [];

// Gi lista aptekite za odbraniot grad
async function addPharmacies(grad) {
    function checkExists(apteka) {
        let found = false;
        for (pharmacy of pharmacyStorage) {
            if (pharmacy.ime == apteka) {
                found = true;
                break;
            }
        }
        return found;
    }

    let skOpstini = ['Аеродром', 'Бутел', 'Гази Баба', 'Ѓорче Петров', 'Карпош', 'Кисела Вода', 'Сарај', 'Центар', 'Чаир', 'Шуто Оризари'];
    let apteki = document.createElement('ul');

    // Pravi GET povik do lokalen server taka sto kje gi dobie informaciite za site zacuvani apteki
    let response = await fetch('/apteki');
    response = await response.json();

    // Gi filtrira dobienite apteki spored odbraniot grad
    response = response.filter(element => {
        if (skOpstini.indexOf(element.Opstina) != -1)
            element.Opstina = 'Скопје';
        return element.Opstina == grad.children[0].textContent;
    });

    // Gi izminuva site apteki i pravi li elementi za sekoja, zaedno so kopcinja za zacuvuvanje i navigacija
    response.forEach(element => {
        let apteka = document.createElement('li');
        apteka.innerHTML = `<p></p> <span style="font-size: 15px; color: white;"> Зачувај </span> 
        <br /> 
        <span style="font-size: 15px; color: aquamarine; font-weight: bold;"> Навигација </span>`;
        let check = document.createElement('img');
        check.src = "assets/icons/check.png";
        check.style = "max-width: 20px; margin: 5px; position: relative; top: 11px;";

        if (checkExists(element.Ime)) {
            apteka.children[1].textContent = "Зачувано";
            apteka.children[1].append(check);
        }

        apteka.children[1].onmouseover = function() {
            this.style.cursor = "pointer";
        }

        apteka.children[3].onmouseover = function() {
            this.style.cursor = "pointer";
        }

        apteka.children[3].addEventListener('mouseenter', function() {
            this.style.fontSize = '16px';
        });

        apteka.children[3].addEventListener('mouseleave', function() {
            this.style.fontSize = '15px';
        });

        apteka.children[3].onclick = function() {
            localStorage.setItem("odbranaApteka", JSON.stringify(element));
            window.location.href = "/navigacija.html";
        }

        // Zacuvuva apteka vo localStorage
        apteka.children[1].onclick = function () {
            if (!checkExists(element.Ime)) {
                const { Ime, Adresa, TelBroj, Rating, lon, lat } = element;
                pharmacyStorage.push({
                    Ime,
                    Adresa,
                    TelBroj,
                    Rating,
                    lon,
                    lat
                });
                this.textContent = "Зачувано";
                this.append(check);
                localStorage.setItem('apteki', JSON.stringify(pharmacyStorage));
            }
        }
        apteka.children[0].textContent = element.Ime;
        apteki.append(apteka);
    });
    grad.children[1].append(apteki)
}

// Gi lista gradovite
function createCities() {
    let cities = ["Скопје", "Битола", "Велес", "Охрид", "Прилеп", "Кичево", "Гевгелија"];

    cities.forEach(city => {
        let grad = document.createElement('div');
        grad.className = "grad";
        grad.innerHTML = `
            <p class="grad-ime">${city}</p>
            <ul></ul>
        `;

        grad.onmouseover = function() {
            this.style.cursor = "pointer";
        }

        // Gi lista aptekite za izbraniot grad
        grad.children[0].onclick = function () {
            if (grad.children[1].children.length == 0) {
                apteki = addPharmacies(this.parentNode);
            }
        }

        document.querySelector('main').append(grad);
    });
}

window.addEventListener('load', function () {
    let aptekiString = localStorage.getItem('apteki');
    if (aptekiString)
        pharmacyStorage = JSON.parse(aptekiString);
    createCities();
});