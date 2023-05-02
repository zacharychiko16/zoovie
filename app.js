const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=539565c7581c473ffa0b2f312a86eb8a&page=1";
const SEARCH_URL =
  "https://api.themoviedb.org/3/search/movie?api_key=539565c7581c473ffa0b2f312a86eb8a&query=";
const IMAGE_PATH = "https://image.tmdb.org/t/p/w1280/";

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");
const filterSelect = document.getElementById("filter");

let movies = []; // declare movies array to store data from API

getMovies(API_URL);
async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  movies = data.results; // store data in movies array
  displayMovies(movies);
}

function displayMovies(movies) {
  main.innerHTML = "";
  for (let i = 0; i < movies.length; i++) {
    const { title, poster_path, vote_average, overview } = movies[i];
    const moviesElement = document.createElement("div");
    moviesElement.classList.add("movie");
    moviesElement.innerHTML = `
        <img src="${IMAGE_PATH + poster_path}" alt="${title}" />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassesByRating(
            vote_average
          )}"> ${vote_average}</span>
          <div class="overview">
            <h3>Overview</h3>
            ${overview} 
          </div>
        </div>`;

    main.appendChild(moviesElement);
  }
}

filterSelect.addEventListener("change", () => {
  const selectedOption = filterSelect.value;
  let sortedMovies;

  if (selectedOption === "By Release Date ") {
    sortedMovies = sortMoviesByDate(movies);
  } else if (selectedOption === "By Rating") {
    sortedMovies = sortMoviesByRating(movies);
  } else {
    // Handle Default case here
    sortedMovies = movies;
  }

  displayMovies(sortedMovies);
});

function sortMoviesByDate(movies) {
  return movies.sort(
    (a, b) => new Date(b.release_date) - new Date(a.release_date)
  );
}

function sortMoviesByRating(movies) {
  return movies.sort((a, b) => b.vote_average - a.vote_average);
}

function getClassesByRating(rating) {
  if (rating >= 8) {
    return "green";
  } else if (rating >= 5) {
    return "orange";
  } else {
    return;
  }
}
function searchMovie(e){
    e.preventDefault();
     const searchValue = search.value;
    if (searchValue && searchValue !== "") {
      getMovies(SEARCH_URL+searchValue);
      searchValue = "";
    } else {
      window.location.reload();
    }
  };

