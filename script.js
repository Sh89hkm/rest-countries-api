// Fetch data from REST Countries API
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Display country information dynamically
function displayCountries(countries) {
    const countryContainer = document.getElementById('country-container');
    countryContainer.innerHTML = '';
    const detailContainer = document.getElementById('detail-div');
    detailContainer.innerHTML = '';
    const searchContainer = document.getElementById('searchContainerID');
    countries.forEach(country => {
        const countryBox = document.createElement('div');
        countryBox.classList.add('country-box');
        countryBox.innerHTML = `
            <img src="${country.flags.png}" alt="${country.name.common} flag">
            <div class="detail">
                <h2>${country.name.common}</h2>
                <p><span>Population:</span> ${country.population}</p>
                <p><span>Region:</span> ${country.region}</p>
                <p><span>Capital:</span> ${country.capital}</p>
            </div>
        `;
        countryContainer.appendChild(countryBox);
        countryBox.addEventListener('click', function (e) {
            e.preventDefault();
            searchContainer.innerHTML = '';
            searchContainer.innerHTML = `
                    <div class="backBox">
                        <a id="backLink" href="index.html">
                            <i id="backIcon" class="fa-regular fa-arrow-left"></i>
                            <span id="backText">Back</span>
                        </a>
                    </div>
                `;
            countryBox.innerHTML = '';
            countryContainer.innerHTML = '';
            detailContainer.innerHTML = `
                    <img id="detail-Img" src="${country.flags.png}"/>
                    <div id="countryData">
                        <h2>${country.name.official}</h2>
                        <div class="info">
                            <div class="info-1">
                                <p><strong>Native Name:</strong> ${country.name.nativeName[Object.keys(country.languages)[0]].common}</p>
                                <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                                <p><strong>Region:</strong> ${country.region}</span></p>
                                <p><strong>Sub Region:</strong> ${country.subregion}</p>
                                <p><strong>Capital:</strong> ${country.capital}</p>
                            </div>
                            <div class="info-2">
                                <p><strong>Top Level Domain:</strong> ${country.tld}</p>
                                <p><strong>Currencies:</strong> ${Object.values(country.currencies).map((item) => item.name).join(", ")}</p>
                                <p><strong>Languages:</strong> ${Object.values(country.languages).join(", ")}</p>
                            </div>
                        </div>
                        <p id="borders"><strong>Border Countries:</strong> ${country.borders ? country.borders.join(", ") : "None"}</p>
                    </div>
            `;
        })
    });
}

// Implement search functionality
function searchCountries(query, countries) {
    return countries.filter(country =>
        country.name.common.toLowerCase().includes(query.toLowerCase())
    );
}

// Implement filter by region
function filterByRegion(region, countries) {
    if (region === '') {
        return countries;
    } else {
        return countries.filter(country =>
            country.region.toLowerCase() === region.toLowerCase()
        );
    }
}

// Toggle color scheme
function toggleColor() {
    document.body.classList.toggle('dark-mode');
    document.getElementById('country-container').classList.toggle('dark-mode');
    let textElm = document.getElementById('themeText');
    let themeTxt = textElm.innerText;
    let icon = document.getElementById('themeIcon');
    if (themeTxt === "Dark Mode") {
        textElm.innerText = "Light Mode";
        icon.className="fa-regular fa-sun-bright";
    } else {
        textElm.innerText = "Dark Mode";
        icon.className="fa-regular fa-moon";
    }
}

// Event listeners
document.getElementById('toggle-color').addEventListener('click', () => {
    toggleColor();
});

document.getElementById('search-input').addEventListener('input', () => {
    const searchQuery = document.getElementById('search-input').value.trim();
    const filteredCountries = searchCountries(searchQuery, allCountries);
    displayCountries(filteredCountries);
});

document.getElementById('region-select').addEventListener('change', () => {
    const selectedRegion = document.getElementById('region-select').value;
    const filteredCountries = filterByRegion(selectedRegion, allCountries);
    displayCountries(filteredCountries);
});

// Initialization
(async () => {
    const apiUrl = 'https://restcountries.com/v3.1/all';
    const countriesData = await fetchData(apiUrl);
    window.allCountries = countriesData; // Store all countries globally
    displayCountries(countriesData);
})();
