var pastCity = []
var d = new Date();

var day = d.getDate();
var month = d.getMonth() + 1;
var year = d.getFullYear();

var lastSearched = JSON.parse(localStorage.getItem("cities"));

lastSearched.forEach(element => {
    $("#searchHistory").prepend(`
    <ul>
    <li>${element}</li>
    </ul>`)
});

function forecast(city) {
    var key = "8d009b070f041e7a5383ba293d41ec25"

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key;

    $("#city-name").text(city + " " + month + "/" + day + "/" + year)

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        $("tbody").append(`
        <tr>
        <td>${response.main.temp} Kelvin</td>
        <td>${response.main.humidity} %</td>
        <td>${response.wind.speed} m/s</td>
        <td>${response.weather[0].description}</td>
        </tr>`)
    })
}

function fiveDay(city) {
    var key = "8d009b070f041e7a5383ba293d41ec25"

    var query = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + ",us&appid=" + key;

    $.ajax({
        url: query,
        method: "GET"
    }).then(function (response) {
        var temp = $(response.list[0].main.temp);
        console.log(response)
        $("#dayOne").append(`
            <h3>${month}/${day}/${year}</h3>
            <p>${response.list[0].main.temp} Kelvin</p>
            <p>${response.list[0].main.humidity} %</p>
            <p>${response.list[0].wind.speed} m/s</p>
            <p>${response.list[0].weather[0].description}</p>
        `)

        $("#dayTwo").append(`
            <h3>${month}/${day + 1}/${year}</h3>
            <p>${response.list[1].main.temp} Kelvin</p>
            <p>${response.list[1].main.humidity} %</p>
            <p>${response.list[1].wind.speed} m/s</p>
            <p>${response.list[1].weather[0].description}</p>
        `)

        $("#dayThree").append(`
            <h3>${month}/${day + 2}/${year}</h3>
            <p>${response.list[2].main.temp} Kelvin</p>
            <p>${response.list[2].main.humidity} %</p>
            <p>${response.list[2].wind.speed} m/s</p>
            <p>${response.list[2].weather[0].description}</p>
        `)

        $("#dayFour").append(`
            <h3>${month}/${day + 3}/${year}</h3>
            <p>${response.list[3].main.temp} Kelvin</p>
            <p>${response.list[3].main.humidity} %</p>
            <p>${response.list[3].wind.speed} m/s</p>
            <p>${response.list[3].weather[0].description}</p>
        `)

        $("#dayFive").append(`
            <h3>${month}/${day + 4}/${year}</h3>
            <p>${response.list[4].main.temp} Kelvin</p>
            <p>${response.list[4].main.humidity} %</p>
            <p>${response.list[4].wind.speed} m/s</p>
            <p>${response.list[4].weather[0].description}</p>
        `)
    })
}


$("#searchBtn").on("click", function () {
    event.preventDefault();
    $("tbody").empty();
    // Clear forecast
    var city = $("#userInput").val();

    $("#searchHistory").prepend(`
    <ul>
    <li>${city}</li>
    <ul>`);

    pastCity.push(city);

    localStorage.setItem("cities", JSON.stringify(pastCity))

    forecast(city);
    fiveDay(city);
})

