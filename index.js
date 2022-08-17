const { waitUntilSymbol } = "next/dist/server/web/spec-compliant/fetch-event";
let search = document
  .getElementById("search")
  .addEventListener("change", (event) => {
    searchVal = event.target.value;
  });
let menuLinks = document.getElementById("hamburger-menu")
let toggleControl = document.getElementById("toggleMenu")
let searchBtn = document.getElementById("searchBtn");
let result = document.getElementById("results");
let card = document.getElementById("card");
let avaliableData = JSON.parse(window.localStorage.getItem("movieData"));


let searchVal = "";
let storingInfo = JSON.parse(window.localStorage.getItem("movieData")) || [];
function storingData(id, name) {
  storingInfo.unshift([name, id]);
  window.localStorage.setItem("movieData", JSON.stringify(storingInfo));
  document.getElementById(id).remove()
}
let displayVal = false
function handleDisplay() {
  displayVal ? displayVal = false : displayVal = true
  displayVal ? menuLinks.style.display = "flex" : menuLinks.style.display = "none"
}


card.style.height = "75vh"

function movieRender(movie) {
  result.innerHTML += `
  <div class="movie--card" id='${movie.imdbID}' >
      <div class="movie--body">
          <div class="controlImg">
              <img class="movie--poster" src=${movie.Poster}   onerror="this.onerror=null;this.src='movieErrorImage.webp';">
          </div>
          <div class="info--container">
              <h1 class="movie--title">${movie.Title}</h1>
              <div class="genreRuntime--container">
                  <p class="movie--genre">${movie.Genre}</p>
                  <p class="info--separators">|</p>
                  <p class="movie--duration">${movie.Runtime}</p>
                  <p class="info--separators">|</p>
                  <p class="movie--rating">${
                    movie.imdbRating
                  }</p><p class="star"> ⭐ </p>
                  <p class="info--separators">|</p>
                  ${
                    savedOrNo
                      ? `<p class="added">Added</p>`
                      : `<button onclick="storingData('${movie.imdbID}', '${movie.Title}')" class="add--to--list" >+</button>`
                  }
              </div>
              <p class="movie--plot">${movie.Plot}</p>
          </div>
         
      </div>
      <span class="bottom--border"></span>
 </div>`
 
}

function clearInput() {
  document.getElementById("search").value = ""
}

let savedOrNo = false;
function handleChange() {
  card.style.height = "auto"
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
            for (let i in avaliableData) {
              if (avaliableData[i][1] !== data.imdbID) {
                savedOrNo = false;
              } else if (avaliableData[i][1] === data.imdbID) {
                savedOrNo = true;
                break;
              }
            }

            clearInput();
            movieRender(data);
          });
      });
    })
    .catch((error) => {
      result.innerHTML = `<h1 class="error"><span>Error!!! Something Went wrong</span></h1>`;
    });
}

function handleEnter(event) {
  if (event.key === "Enter") {
    event.preventDefault()
    handleChange();
  }
}