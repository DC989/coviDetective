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
            setGlobalData(resData);
            setCountriesData(resData);
        })
};

setTimeout(() => {
    getCovidData();
}, 2000);

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

    currentDate.textContent = currentDay + '.' + currentMonth + '.' + currentYear;

    if (currentHours.length < 2) {
        currentHours = '0' + currentHours;
    }

    if (currentMinutes.length < 2) {
        currentMinutes = '0' + currentMinutes;
    }

    if (currentSeconds.length < 2) {
        currentSeconds = '0' + currentSeconds;
    }

    currentTime.textContent = currentHours + ':' + currentMinutes + ':' + currentSeconds;

    totalConfirmed.textContent = data.Global.TotalConfirmed;
    newConfirmed.textContent = data.Global.NewConfirmed;
    totalRecovered.textContent = data.Global.TotalRecovered;
    newRecovered.textContent = data.Global.NewRecovered;
    totalDeaths.textContent = data.Global.TotalDeaths;
    newDeaths.textContent = data.Global.NewDeaths;

    globalData.style.display = 'block';
}

const countriesData = document.querySelector('.countries-table');
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
}

new Tablesort(document.getElementById('main-table'));
