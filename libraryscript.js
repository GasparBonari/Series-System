'use strict';

let btnAddSeries = document.querySelector(".btn-primary");

let seriesForm = document.querySelector("#seriesForm");


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


function displayGenre(series, genreToFilter)
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

displayGenre(listSeries, "Drama");
displayGenre(listSeries, "Comedy");
displayGenre(listSeries, "Horror");  



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

    let thisSeries = listSeries.find(e => e.genre = type);

    thisSeries.film.push(series);

    console.log(listSeries);


   tableBody.innerHTML = "";



    // let addingSeriestoList = new Series(series, type);

    // let displayList = new Display();


    if(series == "")
    {
        alert("Fill up everything");
    }
    // else
    // {
    //     displayList.add(addingSeriestoList);
    // }
})


// DELETE SERIES FROM THE LIST

let btnDelete = document.querySelectorAll(".btn1");

for(let i of btnDelete)
{
    i.addEventListener("click", function(e)
    {
        let item = e.target;

        item.previousSibling.remove();

        item.remove();
    })
}