'use strict';

let btnAddSeries = document.querySelector(".btn-primary");
let btnSearch = document.querySelector(".btn-outline-success");

let seriesForm = document.querySelector("#seriesForm");
let search = document.querySelector("#searchTxt");


let listSeries = 
[
    {film: ['Breaking Bad', 'Better Call Saul', 'Game of Thrones', 'Ozark', 'Peaky Blinders', 'Stranger Things', 
            'Sex Eductaion', '13 Reasons Why', 'Skins', 'One of Us Is Lying'], genre: "Drama"},

    {film: ['Servant', 'Penny Dreadful', 'Them', 'The Haunting of Bly Manor', 'Sweet Home', 'The Haunting of Hill House',
             'Haunted', 'True Blood', 'The Midnight Club'], genre: "Horror"},

    {film: ['Rick and Morty', 'The Office US', 'The Office UK', 'Friends', 'Seinfeld', 'The Simpsons', 'The Good Place',
             'Two and a Half Men'], genre: "Comedy"}
]


class Series
{
    constructor(series, type)
    {
        this.series = series;
        this.type = type;
    }
}


class Display
{
    tableBody = document.getElementById('tableBody');

    add(libraryOfSeries) 
    {
        let uiString = `<tr class="series">
                            <td class="series-name">${libraryOfSeries.series}</td>
                            <td class="table-dark">${libraryOfSeries.type}</td>
                            <button class="btn1 btn-primary">Delete</button>
                        </tr>`;
        tableBody.innerHTML += uiString;
    }
}


function displaySeries(series, genreToFilter)
{
    let filterSeries = series.find(item => item.genre === genreToFilter);

    for(let i of filterSeries.film)
    {
        let currentSeries = new Series(i, filterSeries.genre);

        let display = new Display;

        display.add(currentSeries)
    }
}


// calling the function display

function updateUI()
{
    displaySeries(listSeries, "Drama");
    displaySeries(listSeries, "Comedy");
    displaySeries(listSeries, "Horror");
}
updateUI();



seriesForm.addEventListener("submit", function(e)
{
    e.preventDefault();

    let series = document.querySelector("#seriesName").value;
    let horror = document.querySelector("#horror");
    let comedy = document.querySelector("#comedy");
    let drama = document.querySelector("#drama");
    let type;


    if(horror.checked)
    {
        type = horror.value;
    }
    else if(comedy.checked)
    {
        type = comedy.value;
    }
    else if(drama.checked)
    {
        type = drama.value;
    }

    let thisSeries = listSeries.find(e => e.genre == type);

    thisSeries.film.unshift(series);


    // updating UI
    tableBody.innerHTML = "";
    updateUI();

    
    if(series == "")
    {
        alert("Fill up the form");
    }
})


// DELETE SERIES FROM THE LIST

tableBody.addEventListener("click", function(e)
{
    let item = e.target.closest(".btn1");

    item.previousSibling.remove();

    item.remove();
})


// SEARCH

search.addEventListener("input", function(e)
{
    e.preventDefault();

    let see = search.value;

    listSeries.forEach(e =>  {

        let yes = e.film.includes(see);

        e.toggle("hide", !yes);
    })

























    // let serie1 = listSeries.find(e => e.genre == "Drama");
    // let serie2 = listSeries.find(e => e.genre == "Horror");
    // let serie3 = listSeries.find(e => e.genre == "Comedy");

    // let series = [...serie1.film, ...serie2.film, ...serie3.film];



    // let finalSearch = [];
    // let searchCorrect;

    // search.value[0] == search.value[0].toUpperCase() ? searchCorrect = search.value.toUpperCase() : searchCorrect = search.value.toLowerCase();

    // let result = searchCorrect.split(" ");

    // let result = search.value.toLowerCase().split(" ");

    // for(let i of result)
    // {
    //     finalSearch.push(i[0].toUpperCase() + i.slice(1));
    // }

    // search = finalSearch.join(" ");

    // console.log(search)


    // for(let i of series)
    // {
    //     if(search  == i)
    //     {
    //         let browser = new Series(i, "type");

    //         let display = new Display;

    //         tableBody.innerHTML = "";

    //         display.add(browser);
    //     }
    // }
})