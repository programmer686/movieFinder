let watchlist = document.getElementById("watchList")
let id = JSON.parse(window.localStorage.getItem("movieObject")) || []

    
 function handleLoading(){
    id.map(id => {
        fetch(`https://www.omdbapi.com/?i=${id}&plot=short&apikey=95ff048`).then(jsoned => jsoned.json()).then(data => {
        watchlist.innerHTML +=`
                    <div class="movie--card save--movie" >
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
                   <footer></footer>`
    })
    })
 }




    
/*

working code... sorta of
for (let i = 0; i < data.length; i++) {
        console.log(data[i])
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
    
            <span></span>`}} */