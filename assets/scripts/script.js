const getCovidData = () => {
    fetch('https://api.covid19api.com/summary')
        .then(res => {
            console.log(res);
            return res.json();
        })
        .then(resData => {
            console.log(resData);
            console.log(resData.Countries[0].Country);

            loaderIcon.style.display = 'none';

            theData = resData;

            setGlobalData(resData);
            setCountriesData(resData);
        })
};

setTimeout(() => {
    getCovidData();
}, 2000);

let theData;

const loaderIcon = document.querySelector('.loader');
const globalData = document.querySelector('.global-data');
const currentDate = document.querySelector('[data-current-date]');
const currentTime = document.querySelector('[data-current-time]');
const totalConfirmed = document.querySelector('[data-total-confirmed]');
const newConfirmed = document.querySelector('[data-new-confirmed]');
const totalRecovered = document.querySelector('[data-total-recovered]');
const newRecovered = document.querySelector('[data-new-recovered]');
const totalDeaths = document.querySelector('[data-total-deaths]');
const newDeaths = document.querySelector('[data-new-deaths]');

function setGlobalData(data) {
    const currentDay = new Date().getDate();
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    let currentHours = new Date().getHours();
    currentHours = currentHours.toString();

    let currentMinutes = new Date().getMinutes();
    currentMinutes = currentMinutes.toString();

    let currentSeconds = new Date().getSeconds();
    currentSeconds = currentSeconds.toString();

    currentDate.innerHTML = `<strong>${currentDay + '.' + currentMonth + '.' + currentYear}</strong>`;

    if (currentHours.length < 2) {
        currentHours = '0' + currentHours;
    }

    if (currentMinutes.length < 2) {
        currentMinutes = '0' + currentMinutes;
    }

    if (currentSeconds.length < 2) {
        currentSeconds = '0' + currentSeconds;
    }

    currentTime.innerHTML = `<strong>${currentHours + ':' + currentMinutes + ':' + currentSeconds}</strong>`;

    totalConfirmed.innerHTML = `<strong>${data.Global.TotalConfirmed}</strong>`;
    newConfirmed.innerHTML = `<strong>${data.Global.NewConfirmed}</strong>`;
    totalRecovered.innerHTML = `<strong>${data.Global.TotalRecovered}</strong>`;
    newRecovered.innerHTML = `<strong>${data.Global.NewRecovered}</strong>`;;
    totalDeaths.innerHTML = `<strong>${data.Global.TotalDeaths}</strong>`;;
    newDeaths.innerHTML = `<strong>${data.Global.NewDeaths}</strong>`;;

    globalData.style.display = 'block';
}

const countriesData = document.querySelector('.countries-table');
const inputFilter = document.querySelector('#search-country');
const countriesTable = document.querySelector('[data-countries-rows]');

function setCountriesData(data) {
    data.Countries.forEach((item) => {
        let countryCode = item.CountryCode.toLowerCase();

        countriesTable.innerHTML +=
            `
            <tr>
            <td>
                <span class="flag-icon flag-icon-${countryCode}" style="margin-right:10px;"></span>
                ${item.Country}
            </td>
            <td>${item.TotalConfirmed}</td>
            <td>${item.NewConfirmed}</td>
            <td>${item.TotalRecovered}</td>
            <td>${item.NewRecovered}</td>
            <td>${item.TotalDeaths}</td>
            <td>${item.NewDeaths}</td>
            </tr>
        `;
    });

    countriesData.style.display = 'block';
    inputFilter.style.display = 'block';
}

new Tablesort(document.getElementById('main-table'));







inputFilter.addEventListener('input', filterCountries);

function filterCountries() {
    let input = inputFilter.value;
    let newData = [];

    theData.Countries.forEach((item) => {
        let countryName = item.Country.toLowerCase();

        if (countryName.indexOf(input) > -1) {
            newData.push(item);
        }
    });

    if (newData.length != 0) {
        console.log(newData);

        countriesTable.innerHTML = '';
        
        for (let i = 0; i < newData.length; i++) {
            let countryCode = newData[i].CountryCode.toLowerCase();

            countriesTable.innerHTML +=
                `
                    <tr>
                    <td>
                        <span class="flag-icon flag-icon-${countryCode}" style="margin-right:10px;"></span>
                        ${newData[i].Country}
                    </td>
                    <td>${newData[i].TotalConfirmed}</td>
                    <td>${newData[i].NewConfirmed}</td>
                    <td>${newData[i].TotalRecovered}</td>
                    <td>${newData[i].NewRecovered}</td>
                    <td>${newData[i].TotalDeaths}</td>
                    <td>${newData[i].NewDeaths}</td>
                    </tr>
                    `;
        }
    } else {
        countriesTable.innerHTML = '';
    }
}
