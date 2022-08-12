let search = document
  .getElementById("search")
  .addEventListener("change", (event) => {
    searchVal = event.target.value;
  });
let result = document.getElementById("results");
let watchlist = document.getElementById("watchList");
const switched = document.getElementById("switch");
let card = document.getElementById("card");

let searchVal = "";
let watchListSaved = "";
let display = true;
watchlist.style.display = "none";
function handleSwtich() {
  display ? (display = false) : (display = true);
  if (display) {
    watchlist.style.display = "none";
    card.style.display = "flex";
    result.style.display = "flex";
    switched.textContent = "My Watchlist";
  } else {
    card.style.display = "none";
    result.style.display = "none";
    watchlist.style.display = "flex";
    switched.textContent = "Search";
  }
}

function testing(id) {
  handleLoading(id);
}

let movieObject = [];
let wannawatch = [];

function handleChange() {
  movieObject = [];
  result.innerHTML = "";
  fetch(`https://www.omdbapi.com/?s=${searchVal}&plot=short&apikey=95ff048`)
    .then((jsoned) => jsoned.json())
    .then(({ Search }) => {
      Search.map((item) => {
        fetch(
          `https://www.omdbapi.com/?i=${item.imdbID}&plot=short&apikey=95ff048`
        )
          .then((jsoned) => jsoned.json())
          .then((data) => {
            let id = data.imdbID;
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
                                    <button id="movieSave" onclick="testing('${id}')" class="add--to--list" >+</button>
                                </div>
                                <p class="movie--plot">${data.Plot}</p>
                                 <span></span>
                            </div>
                        </div>
                   </div>
                   
                   <span></span> 
                   <footer></footer>
                   `;
          });
      });
    })
    .catch((error) => {
      result.innerHTML = `<h1 class="error"><span>Error!</span> Either the movie you are looking for can be found, or you spelled it wrong</h1>`;
    });
}

function handleLoading(id) {
  fetch(`https://www.omdbapi.com/?i=${id}&plot=short&apikey=95ff048`)
    .then((jsoned) => jsoned.json())
    .then((data) => {
      watchlist.innerHTML += `
                    <div class="movie--card save--movie" >
                        <div class="movie--body save--movie--body">
                            <div class="controlImg">
                                <img class="movie--poster" src=${data.Poster} />
                            </div>
                            <div class="info--container saved--info--container">
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
                   
                   <span></span> 
                   <footer></footer>`;
    });
}

           
