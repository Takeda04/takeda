import {films} from './films.js'
let form = document.querySelector('.form')
let filmArea = document.querySelector('.film-area')
let searchBtn = document.querySelector('.searchBtn')
let input = document.querySelector('.serachPanel')
let elSelect = document.querySelector('.select')
let val
let date , hour ,year

function timer(time) {
    date = new Date(time)
    hour = date.toLocaleTimeString('en-US')
    year = date.toLocaleDateString('en-US')    
}

getFilms(films)

function getFilms(films) {
    films.forEach(film => {
        timer(film.release_date)
        filmArea.innerHTML += `
        <div class="card">
            <h3 class="title w-100 h-50 m-1 fs-5 d-flex align-items-end">${film.title}</h3>
            <img class="filmImg" src="${film.poster}" alt="Maket">
            <div class="date">${hour} | ${year}</div>
            <div class="genres">${film.genres.join(' , ')}</div>
        </div>
        `
    })
}

searchBtn.addEventListener('click', ()=>{
    val = document.querySelector('.serachPanel').value
    searchPanel(val.toLowerCase())
    form.reset();
})


function searchPanel(val){
    let newFilms = []

    films.filter(item => {
        let name = item.title.toLowerCase()
        if(name.includes(val)){
            newFilms.push(item)
            filmArea.innerHTML = ''
            getFilms(newFilms)
        }
    })
}

let imei = [];
function renderGenres(){

    films.forEach((film) =>{
        film.genres.forEach((genre) =>{
           imei.push(genre)
        })
    })
}
renderGenres();



elSelect.addEventListener('change', (evt) => {
   evt.preventDefault();
   let set = evt.target.value;
   imei.forEach((item) => {
    if(set  === item){
        console.log(item)
        filterFilms(item)
    }
   })
})

function filterFilms(name){
    let filterFil = []
    films.filter(item => {
        if(item.genres.includes(name)){
            filterFil.push(item)
            filmArea.innerHTML = ''
            getFilms(filterFil)
        }
    })
}