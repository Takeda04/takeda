import {films} from './films.js'
const form = document.querySelector('.form')
const filmArea = document.querySelector('.film-area')
const searchBtn = document.querySelector('.searchBtn')
const elSelect = document.querySelector('.select')
let val
let date , hour ,year;

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
            <p class="title">${film.title}</p>
            <img class="filmImg" src="${film.poster}" alt="Maket">
            <div class="date">${hour} | ${year}</div>
            <div class="genres">${film.genres.join(' , ')}</div>
            <div class="id">${film.id}</div>
            <button class="times btn-danger rounded">Delete</button>
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
   if(set === 'All'){
    getFilms(films)
   }
   imei.forEach((item) => {
    if(set  === item){
        filmArea.innerHTML = ''
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

filmArea.addEventListener('click', e =>{
    let target = e.target
    if(target.tagName === 'BUTTON'){
        let id = target.parentElement.children[4].textContent
        films.forEach((item) =>{
            if(item.id === id){
                target.parentElement.remove()
            }
        })
    }
})