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
            mapData = goclone(resData);

            console.log('theData.Countries');
            console.log(theData.Countries);

            setGlobalData(resData);
            setCountriesData(resData);



            google.charts.setOnLoadCallback(drawRegionsMap);

        })
};

setTimeout(() => {
    getCovidData();
}, 2000);

let theData;
let mapData;

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
const regionsMap = document.querySelector('#regions_div');
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
    regionsMap.style.display = 'block';
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



google.charts.load('current', {
    'packages': ['geochart'],
    // Note: you will need to get a mapsApiKey for your project.
    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
    'mapsApiKey': 'AIzaSyAhX_FESZBAVBIRSAf0oLKvRVZvfz9KNW0'
});



function drawRegionsMap() {
    let countries = [
        ['Country', 'TotalConfirmed']
    ];
    let newData = [];

    mapData.Countries.forEach((item) => {

        switch (item.Country) {
            case "United States of America":
                item.Country = "United States";
                newData = [item.Country, item.TotalConfirmed];
                countries.push(newData);
                break;
            case "Russian Federation":
                item.Country = "RU";
                newData = [item.Country, item.TotalConfirmed];
                countries.push(newData);
                break;
            case "Venezuela (Bolivarian Republic)":
                item.Country = "Venezuela";
                newData = [item.Country, item.TotalConfirmed];
                countries.push(newData);
                break;
            case "Congo (Brazzaville)":
                item.Country = "CG";
                newData = [item.Country, item.TotalConfirmed];
                countries.push(newData);
                break;
            case "Congo (Kinshasa)":
                item.Country = "CD";
                newData = [item.Country, item.TotalConfirmed];
                countries.push(newData);
                break;
            case "Côte d'Ivoire":
                item.Country = "CI";
                newData = [item.Country, item.TotalConfirmed];
                countries.push(newData);
                break;
            case "Iran, Islamic Republic of":
                item.Country = "Iran";
                newData = [item.Country, item.TotalConfirmed];
                countries.push(newData);
                break;
            default:
                newData = [item.Country, item.TotalConfirmed];
                countries.push(newData);
        }
    });

    console.log('API call completed!');
    console.log(countries);

    let data = google.visualization.arrayToDataTable(countries);
    let options = {
        colorAxis: {colors: ['#FF0000', '#8B0000']}
    };
    let chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    chart.draw(data, options);
}


// clone function for creating a clone of an object and not refferencing to the original one

function goclone(source) {
    if (Object.prototype.toString.call(source) === '[object Array]') {
        var clone = [];
        for (var i = 0; i < source.length; i++) {
            clone[i] = goclone(source[i]);
        }
        return clone;
    } else if (typeof (source) == "object") {
        var clone = {};
        for (var prop in source) {
            if (source.hasOwnProperty(prop)) {
                clone[prop] = goclone(source[prop]);
            }
        }
        return clone;
    } else {
        return source;
    }
}
