const { waitUntilSymbol } = ("next/dist/server/web/spec-compliant/fetch-event");
 // window.localStorage.clear()
let search = document
  .getElementById("search")
  .addEventListener("change", (event) => {
    searchVal = event.target.value;
});
let searchBtn = document.getElementById("searchBtn")
let result = document.getElementById("results");
let watchlist = document.getElementById("watchList");
const switched = document.getElementById("switch");
let card = document.getElementById("card");



function handleEnter(ele) {
  if(event.key === "Enter"){
      handleChange()
  }
}


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

// what i had origianlly
let storingInfo =  []
function storingData(id, name) {
  storingInfo.unshift([name, id])
  window.localStorage.setItem("movieData", storingInfo)
  handleLoading();
}
function handleChange() {
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
                                    <p class="info--separators">|</p>
                                    <p class="movie--duration">${data.Runtime}</p>
                                    <p class="info--separators">|</p>
                                    <p class="movie--rating">${data.imdbRating}</p><p class="star"> ⭐ </p>
                                    <p class="info--separators">|</p>
                                    <button id="movieSave" onclick="storingData('${id}', '${data.Title}')" class="add--to--list" >+</button>
                                </div>
                                <p class="movie--plot">${data.Plot}</p>
                                 <span></span>
                            </div>
                        </div>
                   </div>
                    <span></span> 
                   `;
          });
      });
    })
    .catch((error) => {
      result.innerHTML = `<h1 class="error"><span>Error!!! Something Went wrong</span></h1>`;
    });
}

function handleLoading(){
  watchlist.innerHTML = ""
  for (let i in storingInfo) {
    fetch(`https://www.omdbapi.com/?i=${storingInfo[i][1]}&plot=short&apikey=95ff048`)
    .then((jsoned) => jsoned.json())
    .then((data) => {
      console.log(data)
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
                                    <p class="info--separators">|</p>
                                    <p class="movie--duration">${data.Runtime}</p>
                                    <p class="info--separators">|</p>
                                    <p class="movie--rating">${data.imdbRating}</p><p class="star">⭐</p>
                                </div>
                                <p class="movie--plot">${data.Plot}</p>
                                 <span></span>
                            </div>
                        </div>
                   </div>
                   <span></span> `;  })
  }}


  handleLoading()