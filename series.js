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
        let uiString = `<tr class="series" id="${libraryOfSeries.series}">
                            <td class="table-dark color">${libraryOfSeries.series}</td>
                            <td>${libraryOfSeries.type}</td>
                            <button class="btn1 btn-outline-danger hidden" id="${libraryOfSeries.series}">Delete</button>
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


// CALLING THE FUNTION DISPLAY

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


// SHOW DELETE BUTTON WHEN CLICK

document.querySelector(".table").addEventListener("click", function(e)
{
    let item = e.target.closest(".color");
    let btn = e.target.parentElement.nextSibling;

    if(item == null) return;

    if(item.parentElement.id == btn.id)
    {
        btn.classList.toggle("hidden");
    }
})


// DELETE ELEMENT FROM LIST

tableBody.addEventListener("click", function(e)
{
    let item = e.target.closest(".btn1");

    if(!item) return;

    item.previousSibling.remove();

    item.remove();

    console.log(listSeries)
})


// SEARCH

search.addEventListener("input", function(e)
{
    e.preventDefault();

    let word = search.value;

    listSeries.forEach(e => 
    {
        e.film.forEach(name =>
            {
                const match = name.toLowerCase().includes(word.toLowerCase());
                const tr = document.getElementById(name);

                tr.style.display = match ? "" : 'none';
            })
    })
})


// STYLE

function changingColors(e)
{
    let changeColor = e.target.closest(".color");

    if(changeColor == null)return;

    changeColor.style.color = this; // this because we call .bind() in order to set an argument in addEventListener()
}

tableBody.addEventListener("mouseover", changingColors.bind("darkgreen"));
tableBody.addEventListener("mouseout", changingColors.bind("white"));


// NAV STICK

let nav = document.querySelector(".navbar");
let zone = document.querySelector("#seriesForm");

function stickynav(entries)
{
  let [entry] = entries;

  if(!entry.isIntersecting)
  {
    nav.classList.add("sticky-top");
  }
  else
  {
    nav.classList.remove("sticky-top");
  }
}

let navObserver = new IntersectionObserver(stickynav, 
{
    root:null,
    threshold: 0.7
})

navObserver.observe(zone);