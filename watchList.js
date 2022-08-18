let watchlist = document.getElementById("watchList");
let data = JSON.parse(window.localStorage.getItem("movieData"));
function nothingSaved() {
  watchlist.innerHTML = `
  <div class="no--saved--container">
    <h1 class="no--movie--text">You dont have any movies saved yet!</h1>
    <h1 class="no--movie--text">Go find some</h1>
    <h1 class="camera">🎥</h1>
</div>`;
}
nothingSaved();
let removeAll = document.getElementById("switch--watchlist--delete").addEventListener("click", () => {
  window.localStorage.clear()
  nothingSaved();
})
let displayVal = false
function handleDisplayWatchlist() {
  displayVal ? displayVal = false : displayVal = true
  displayVal ? menuLinks.style.display = "flex" : menuLinks.style.display = "none"
}
let menuLinks = document.getElementById("hamburger-menu")
let toggleControl = document.getElementById("toggleMenu")
if (data.length == 0) {
  watchlist.innerHTML = `
  <div class="no--saved--container">
    <h1 class="no--movie--text">You dont have any movies saved yet!</h1>
    <h1 class="no--movie--text">Go find some</h1>
    <h1 class="camera">🎥</h1>
</div>`;
} else {
  handleLoading();
  function removeOne(id) {
    
    for (let i in data) {
      if (data[i][1] === id) {
        let index = data.indexOf(data[i]);
        data.splice(index, 1);
        window.localStorage.setItem("movieData", JSON.stringify(data));
      }
    }
    document.getElementById(id).remove()
  }

  
  function handleLoading() {
    watchlist.innerHTML = "";
    for (let i in data) {
      fetch(
        `https://www.omdbapi.com/?i=${data[i][1]}&plot=short&apikey=95ff048`
      )
        .then((jsoned) => jsoned.json())
        .then((info) => {
          watchlist.innerHTML += `
                      <div id='${info.imdbID}' class="movie--card save--movie" >
                          <div class="movie--body save--movie--body">
                              <div class="controlImg">
                                  <img class="movie--poster" src=${info.Poster} onerror="this.onerror=null;this.src='movieErrorImage.webp'/>
                              </div>
                              <div class="info--container saved--info--container">
                                  <h1 class="movie--title">${info.Title}</h1>
                                  <div class="genreRuntime--container">
                                      <p class="movie--genre">${info.Genre}</p>
                                      <p class="info--separators">|</p>
                                      <p class="movie--duration">${info.Runtime}</p>
                                      <p class="info--separators">|</p>
                                      <p class="movie--rating">${info.imdbRating}</p><p class="star">⭐</p>
                                      <button class="remove--btn" onclick="removeOne('${info.imdbID}')"><span class="minus"></span></button>
                                  </div>
                                  <p class="movie--plot">${info.Plot}</p>
                                   <span></span>
                              </div>
                          </div>
                     </div>
                     <span></span> `;
        });

      //  document.getElementById("remove--btn").addEventListener("click", () => remove(info.Title))})
    }
  }
}