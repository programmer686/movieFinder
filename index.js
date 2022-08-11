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
        result.style.display = "flex"
        switched.textContent = "My Watchlist" 
        
    } else {
        card.style.display = "none"
        result.style.display = "none"
        mywatchList.style.display = "flex"
         switched.textContent ="Search"
    }}

 

 

 
 let movieObject = []
 let wannawatch = []
 function handleChange() {
    let save = false
    window.localStorage.clear()
    movieObject = []
    result.innerHTML = ""
            fetch(`https://www.omdbapi.com/?s=${searchVal}&plot=short&apikey=95ff048`).then(jsoned => jsoned.json()).then(({Search}) => {
                Search.map(item =>{
                    fetch(`https://www.omdbapi.com/?i=${item.imdbID}&plot=short&apikey=95ff048`).then(jsoned => jsoned.json()).then(data => { 
                        console.log(data)
                   /* function handleSave() {
                            console.log("HandleSave is working")
                              movieObject.push({
                                 "ID": data.imdbID,
                                 "Title": data.Title,
                                 "Poster": data.Poster,
                                 "Genre": data.Genre,
                                 "Runtime": data.Runtime,
                                 "Plot": data.Plot
                             })
                             window.localStorage.setItem("movieObject", JSON.stringify(movieObject))*/
                             
                       
                            
                    result.innerHTML +=`
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
                                    <button id="movieSave" class="add--to--list" >+</button>
                                </div>
                                <p class="movie--plot">${data.Plot}</p>
                                 <span></span>
                            </div>
                        </div>
                   </div>
                   
                   <span></span> 
                   <footer></footer>
                   `
                   wannawatch.push(data.imdbID)

                   document.getElementById("movieSave").addEventListener("click", () => {
                   
                    window.localStorage.setItem("movieObject", JSON.stringify(wannawatch))
                   })
                   
                   
                   
                    
                    

                    

                  /*  movieObject.push({
                        "ID": data.imdbID,
                        "Title": data.Title,
                        "Poster": data.Poster,
                        "Genre": data.Genre,
                        "Runtime": data.Runtime,
                        "Plot": data.Plot
                    })
                    window.localStorage.setItem("movieObject", JSON.stringify(movieObject))*/
                       
               
                  
                   })
                   
                })}).catch((error) => {result.innerHTML = `<h1 class="error"><span>Error!</span> Either the movie you are looking for can be found, or you spelled it wrong</h1>`})    
            
            }
            

           /**/