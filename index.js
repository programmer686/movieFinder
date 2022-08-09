let search = document.getElementById("search").addEventListener("change", (event) => {searchVal = event.target.value})
let result = document.getElementById("results")
let mywatchList  = document.getElementById("saved")
const switched = document.getElementById("switch")
let card = document.getElementById("card")

 let searchVal = ""
 let watchListSaved = ""
 
let display = true
mywatchList.style.display = "none"
 function handleSwtich() {
    display ? display = false : display = true
    if (display) {
        mywatchList.style.display = "none"
        card.style.display = "flex"
        display ? switched.textContent = "My Watchlist" : switched.textContent = "Search"
    } else {
        card.style.display = "none"
        result.style.display = "none"
        mywatchList.style.display = "flex"
        display ? switched.textContent = "My Watchlist" : switched.textContent = "Search"
    }}

 function handleClick() {
    handleChange()
 }

 function handleSave() {
    console.log("hello world")
 }

 let save = true
 let movieObject = []
 function handleChange() {
            fetch(`https://www.omdbapi.com/?s=${searchVal}&plot=short&apikey=95ff048`).then(jsoned => jsoned.json()).then(({Search}) => {
                Search.map(item =>{
                    fetch(`https://www.omdbapi.com/?i=${item.imdbID}&plot=short&apikey=95ff048`).then(jsoned => jsoned.json()).then(data => {
                    if (save){
                    movieObject = {
                        "ID": data.imdbID,
                        "Title": data.Title,
                        "Poster": data.Poster,
                        "Genre": data.Genre,
                        "Runtime": data.Runtime,
                        "Plot": data.Plot
                    }
                    window.localStorage.setItem("movieObject", JSON.stringify(movieObject))}
                    

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
                                    <button class="add--to--list" onclick=handleSave()>+</button>
                                </div>
                                <p class="movie--plot">${data.Plot}</p>
                                 <span></span>
                            </div>
                        </div>
                   </div>
                   
                   <span></span> 
                   <footer></footer>
                   `
                    })
                  
                     search=""
                 searchVal=""
                   
                })}).catch((error) => {result.innerHTML = `<h1 class="error"><span>Error!</span> Either the movie you are looking for can be found, or you spelled it wrong</h1>`})    
            }
 

        