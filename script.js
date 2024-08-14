const apiKey = '2af1edb13a77fd00b9c35e1a61bdbdd4';
let currentPage = 1;

async function fetchMovies(page = 1) {
    const apiUrl = https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page};
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayMovies(data.results);
        updatePagination(data.page, data.total_pages);
    } catch (error) {
        console.error('Error fetching movies:', error);
        document.querySelector('.content-list').innerHTML = '<p>Unable to load movies. Please try again later.</p>';
    }
}

function displayMovies(movies) {
    const movieList = document.querySelector('.content-list');
    movieList.innerHTML = '';

    if (movies.length === 0) {
        movieList.innerHTML = '<p>No movies found.</p>';
        return;
    }

    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');

        const posterPath = movie.poster_path ? https://image.tmdb.org/t/p/w300${movie.poster_path} : 'path/to/fallback-image.jpg';
        movieItem.innerHTML = 
            <img src="${posterPath}" alt="${movie.title}">
            <h3>${movie.title}</h3>
        ;

        movieList.appendChild(movieItem);
    });
}

function updatePagination(currentPage, totalPages) {
    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = '';

    if (currentPage > 1) {
        const prevLink = document.createElement('a');
        prevLink.href = '#';
        prevLink.innerText = 'Previous';
        prevLink.addEventListener('click', () => {
            fetchMovies(currentPage - 1);
            currentPage--;
        });
        pagination.appendChild(prevLink);
    }

    if (currentPage < totalPages) {
        const nextLink = document.createElement('a');
        nextLink.href = '#';
        nextLink.innerText = 'Next';
        nextLink.addEventListener('click', () => {
            fetchMovies(currentPage + 1); // Increment the page number
            currentPage++;
        });
        pagination.appendChild(nextLink);
    }
}

document.addEventListener('DOMContentLoaded', () => fetchMovies(currentPage));
