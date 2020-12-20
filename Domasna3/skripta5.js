let pharmacyStorage = [];

function addPharmacies(grad) {
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

    const http = new XMLHttpRequest();
    let url = "/apteki";
    http.open("GET", url);
    http.send();

    let apteki = document.createElement('ul');

    http.onreadystatechange = function (event) {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(http.response);
            response = response.filter(element => element.Opstina == grad.children[0].textContent);

            response.forEach(element => {
                let apteka = document.createElement('li');
                apteka.innerHTML = '<p></p> <span style="font-size: 15px";> Зачувај </span>';
                let check = document.createElement('img');
                check.src = "check.png";
                check.style = "max-width: 20px; margin: 5px; position: relative; top: 11px;";

                if (checkExists(element.Ime)) {
                    apteka.children[1].textContent = "Зачувано";
                    apteka.children[1].append(check);
                }

                apteka.children[1].onmouseover = function () {
                    this.style.cursor = "pointer";
                }

                apteka.children[1].onclick = function() {
                    if (!checkExists(element.Ime)) {
                        pharmacyStorage.push({ ime: element.Ime, adresa: element.Adresa });
                        this.textContent = "Зачувано";
                        this.append(check);
                        localStorage.setItem('apteki', JSON.stringify(pharmacyStorage));
                    }
                }

                console.log(element);
                apteka.children[0].textContent = element.Ime;
                apteki.append(apteka);
            });
            
            grad.children[1].append(apteki);

        }
    }
}

function createCities() {
    let cities = ["Скопје", "Битола", "Велес", "Охрид", "Прилеп", "Кичево", "Гевгелија"];

    cities.forEach(city => {
        let grad = document.createElement('div');
        grad.className = "grad";
        grad.innerHTML = `
            <p class="grad-ime">${city}</p>
            <ul></ul>
        `;
        
        grad.children[0].onclick = function() {
            if (grad.children[1].children.length == 0) {
                apteki = addPharmacies(this.parentNode);
                console.log(this.className);
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