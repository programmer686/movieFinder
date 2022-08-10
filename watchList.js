let watchlist = document.getElementById("watchList")
let data = JSON.parse(window.localStorage.getItem("movieObject")) || []

function handleLoad(){
    for (let i = 0; i < data.length; i++) {
        watchlist.innerHTML += `
                <div class="movie--card" >
                    <div class="movie--body">
                        <div class="controlImg">
                            <img class="movie--poster" src=${data[i].Poster} />
                        </div>
                        <div class="info--container">
                            <h1 class="movie--title">${data[i].Title}</h1>
                            <div class="genreRuntime--container">
                                <p class="movie--genre">${data[i].Genre}</p>
                                <p class="movie--duration">${data[i].Runtime}</p>
                                <button onclick="handleSave()"></button>
                            </div>
                            <p class="movie--plot">${data[i].Plot}</p>
                            <span></span>
                        </div>
                    </div>
            </div>
    
            <span></span>`
        
      
    }}

function handleLoading() {
    setTimeout(handleLoad, 8000)
}



    
