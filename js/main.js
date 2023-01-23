let originHeader = document.getElementById('top-header')
console.log(originHeader)

function mockHeader(event){
    console.log(event)
    let originHeader = event.target
    console.log(originHeader)
    if (originHeader.innerHTML[1] === 'e' ){
        originHeader.innerHTML = 'together :)';
    } else {
        originHeader.innerHTML = "Let's go"
    }
}

originHeader.addEventListener('click', mockHeader); 

let secondCard = document.getElementById('cityDisplay')
console.log(secondCard)


let navyBar = document.getElementById('navybar')

function navyBarE(e){
    let navyBar = e.target
    if (navyBar.innerHTML[0] === 'W'){
        navyBar.innerHTML = 'and only you <3'
    } else {
        navyBar.innerHTML = 'Weathering With You'
    }
}

navyBar.addEventListener('click', navyBarE)



let form = document.getElementById('cityForm')

form.addEventListener('submit', handleCitySubmit)

async function handleCitySubmit(event){
    event.preventDefault();
    const cityName = event.target.cityName.value
    const cityData = await getCityData(cityName)
    await buildCityCard(cityData)
    event.target.cityName.value = ''
}



async function getCityData(cityName){
    let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${secretkey}`)

    let data = await res.json();
    return data
}

async function buildCityCard(cityObj){
    console.log(cityObj)

    let card = document.createElement('div')
    card.className = 'card text-white bg-dark mb-3'

    let cardInfo = document.createElement('div');
    cardInfo.className = 'card-general'

    let cityTitle = document.createElement('h3')
    cityTitle.className = 'text-center mt-2'
    cityTitle.innerHTML = cityObj.name


    let cityHigh = document.createElement('p')
    cityHigh.className = 'card-info-h'
    var temph = ((cityObj.main.temp_max-273.15)*1.8)+32
    cityHigh.innerHTML = (`City High: ${Math.trunc(temph)}`);

    let cityLow = document.createElement('p')
    cityLow.className = 'card-info-l'
    cityLow.innerHTML = (`City Low: ${Math.trunc(((cityObj.main.temp_min - 273.15)*1.8)+32)}`)


    let cityCurrent = document.createElement('p')
    cityCurrent.className = 'card-info-c'
    cityCurrent.innerHTML =(`Currently: ${Math.trunc(((cityObj.main.temp - 273.15)*1.8)+32)}`)

    let cityFeelsLike = document.createElement('p')
    cityFeelsLike.className = 'card-info-f'
    cityFeelsLike.innerHTML =(`Feels Like: ${Math.trunc(((cityObj.main.feels_like - 273.15)*1.8)+32)}`)



    cardInfo.append(cityTitle)
    cardInfo.append(cityHigh)
    cardInfo.append(cityLow)
    cardInfo.append(cityCurrent)
    cardInfo.append(cityFeelsLike)


    card.append(cardInfo)
    console.log(card)

    let col = document.createElement('div')
    col.className = 'col-12 col-md-3 col-log-3 my-3'

    col.append(card)

    let display = document.getElementById('cityDisplay')
    display.append(col)

}


