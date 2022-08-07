let search = document.getElementById("search").addEventListener("change", (event) => {searchVal = event.target.value})
let result = document.getElementById("results")
let mywatchList  = document.getElementById("watchlist")
const switched = document.getElementById("switched")
let card = document.getElementById("card")

 let searchVal = ""
 let watchListSaved = ""
 
 function handleClick() {
    handleChange()
 }
 
 
 function handleChange() {
            fetch(`https://www.omdbapi.com/?s=${searchVal}&plot=short&apikey=95ff048`).then(jsoned => jsoned.json()).then(({Search}) => {
                Search.map(item =>{
                    fetch(`https://www.omdbapi.com/?i=${item.imdbID}&plot=short&apikey=95ff048`).then(jsoned => jsoned.json()).then(data => {
    
                    result.innerHTML += `
                    <div class="movie--card" >
                        <div class="movie--body">
                            <div class="controlImg">
                                <img class="movie--poster" src=${data.Poster} />
                            </div>
                            <div class="info--container">
                                <h1 class="movie--title">${data.Title}</h1>
                                <div class="genreRuntime--container">
                                    <p class="movie--genre">${data.Genre}</p>
                                    <p class="movie--duration">${data.Runtime}</p>
                                </div>
                                <p class="movie--plot">${data.Plot}</p>
                                 <span></span>
                            </div>
                        </div>
                   </div>
                   
                   <span></span> `
             
                    })
                    
                     search=""
                 searchVal=""
                 console.log(watchListSaved)
                   
                })}).catch((error) => {result.innerHTML = `<h1 class="error"><span>Error!</span> Either the movie you are looking for can be found, or you spelled it wrong</h1>`})    
            }
 
 
 
        