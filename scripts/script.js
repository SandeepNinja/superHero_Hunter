console.log("I am script");
const ts = timeStamp;
var searchMovieList = [];
var favoritesList = [];

var apiUrl = "https://gateway.marvel.com:443/v1/public/";
var hash = CryptoJS.MD5(ts + privateKey + pulicKey).toString();

var searchDiaplay = document.getElementsByClassName("searchContainer");

// update the search result
async function updateSearchResult(searchName) {
  const response = await fetch(
    `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${pulicKey}&hash=${hash}&nameStartsWith=${searchName}`
  );
  const result = await response.json();
  // console.log(result.data.results);
  const searchResults = result.data.results;
  var ul = document.getElementById("searchResultListContainer");
  ul.innerHTML = "";
  searchResults.forEach((element) => {
    var btnUse = "addFavourites";
    console.log("btnUseOuter: ", btnUse);
    favoritesList.map((item) => {
      if (item.id === element.id) {
        console.log("I am checking");
        btnUse = "removeFromFavourites";
        console.log("btnUse: ", btnUse);
      }
    });

    var li = document.createElement("li");
    li.id = `list-${element.id}`;
    li.innerHTML = `
            <span id= info-${element.id}>
            <img src="${element.thumbnail.path}.${element.thumbnail.extension}" />
            <div>${element.name}</div></span>
            <button id=${element.id} class="${btnUse}">${btnUse}</button>
    `;
    ul.appendChild(li);
    searchMovieList.push(element);
    console.log(searchMovieList);
    // info action
    var info = document.getElementById(`info-${element.id}`);
    info.addEventListener("click", () => {
      infoContainer(element);
    });
    // favorite button action
    var favBtn = document.getElementById(element.id);
    favBtn.addEventListener("click", () => {
      if (btnUse === "addFavourites") {
        addFavourites(element);
        updateSearchResult(searchName);
      } else {
        removeFromFavouritesHome(element.id);
        updateSearchResult(searchName);
      }
    });
  });
}

// input box
var inputValue = document.getElementById("searchInput");

// search button click function
var inputEnter = document.getElementById("searchInput");
inputEnter.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    console.log("searchBtn click");
    console.log("input: ", inputValue.value);
    if (inputValue.value.length > 2) {
      updateSearchResult(inputValue.value);
    }
  }
});

var searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", () => {
  console.log("searchBtn click");
  console.log("input: ", inputValue.value);
  if (inputValue.value.length > 2) {
    updateSearchResult(inputValue.value);
  }
});

// add favourites
function addFavourites(element) {
  favoritesList.push(element);
  console.log(favoritesList);
}

// HomePage
var homePage = document.getElementById("HomePage");
homePage.addEventListener("click", () => {
  var section = document.getElementsByTagName("section");
  for (i = 0; i < section.length; i++) {
    section[i].style.display = "block";
  }
  searchDiaplay[0].style.display = "flex";
  var ul = document.getElementById("searchResultListContainer");
  ul.innerHTML = "";
  // to remove infoPage
  var secInfo = document.getElementsByClassName("infoSectionCumContainer");
  if (secInfo.length !== 0) {
    secInfo[0].remove();
  }
});

// favorite page
var favoritesPage = document.getElementById("favPage");
favoritesPage.addEventListener("click", displayFavorites);
favoritesPage.addEventListener("click", () => {
  searchDiaplay[0].style.display = "none";

  // to remove infoPage
  var secInfo = document.getElementsByClassName("infoSectionCumContainer");
  if (secInfo.length !== 0) {
    // console.log("secinfoLen: ", secInfo);
    secInfo[0].remove();
  }
});

// favorites page function
function displayFavorites() {
  // var displ  ayInfo = document.getElementsByClassName(infoSectionCumContainer);

  console.log("I am favorite page");
  var searchResult = document.getElementsByClassName("searchResult");
  searchResult[0].style.display = "block";
  var ul = document.getElementById("searchResultListContainer");
  ul.innerHTML = "";
  favoritesList.forEach((element) => {
    var li = document.createElement("li");
    li.id = `list-${element.id}`;
    li.innerHTML = `
              <span id= info-${element.id}>
            <img src="${element.thumbnail.path}.${element.thumbnail.extension}" />
            <div>${element.name}</div></span>
            <button id=${element.id} class="removeFromFavourites">Remove favorite</button>
      `;
    ul.appendChild(li);
    // info action
    var info = document.getElementById(`info-${element.id}`);
    info.addEventListener("click", () => {
      infoContainer(element);
    });

    // favorite button action
    var favBtn = document.getElementById(element.id);
    favBtn.addEventListener("click", () => {
      removeFromFavourites(element.id);
    });
  });
}

// remove from favorites function
function removeFromFavourites(id) {
  var newFavoriteList = favoritesList.filter((item) => {
    return item.id != id;
  });
  favoritesList = newFavoriteList;
  displayFavorites();
}

function removeFromFavouritesHome(id) {
  var newFavoriteList = favoritesList.filter((item) => {
    return item.id != id;
  });
  favoritesList = newFavoriteList;
}

// info page
function infoContainer(element) {
  console.log("I am a info container");
  var section = document.getElementsByTagName("section");
  for (i = 0; i < section.length; i++) {
    section[i].style.display = "none";
  }

  var main = document.getElementsByTagName("main");
  infoSection = document.createElement("section");
  infoSection.className = "infoSectionCumContainer";

  // btn command
  var btnUse = "addFavourites";
  favoritesList.map((item) => {
    if (item.id === element.id) {
      btnUse = "removeFromFavourites";
    }
  });
  infoSection.innerHTML = `
   <div class="infoContainer">
        <div class="topInfo">${element.name}</div>
        <div class="middleInfo">
          <div class="leftInfo">
            <img src="${element.thumbnail.path}.${element.thumbnail.extension}" height="150px" width="150px"  />
          </div>
          <div class="rightInfo">
            <div>Id : ${element.id}</div>
            <div>description : ${element.description}</div>
            <div>slmdvls</div>
          </div>
        </div>
        
        <div class="infoFavoriteBtn"><button id="infoPage-${element.id}" >${btnUse} lhlkblblb</button></div>
        </div>
        `;
  main[0].appendChild(infoSection);
  // favorite button action
  var infoBtn = document.getElementById(`infoPage-${element.id}`);

  infoBtn.addEventListener("click", () => {
    // console.log("info btn clicked");
    if (btnUse === "addFavourites") {
      addFavourites(element);
      infoContainer(element);
    } else {
      removeFromFavouritesHome(element.id);
      infoContainer(element);
    }
  });
}
