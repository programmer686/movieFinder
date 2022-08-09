let watchlist = document.getElementById("watchList")




let data = JSON.parse(window.localStorage.getItem("movieObject")) || []
console.log(data.Title)
    watchlist.innerHTML = `
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
                            <button onclick="handleSave()"></button>
                        </div>
                        <p class="movie--plot">${data.Plot}</p>
                        <span></span>
                    </div>
                </div>
        </div>

        <span></span> 


    `
