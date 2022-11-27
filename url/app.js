// <------------user----------->
const elMovies = document.querySelector('.movies');
const elMovieTemplate = document.querySelector('.movies__template').content;


const elFilterSelect = document.querySelector('.movies__filter-select');
const elFilterInput = document.querySelector('.movies__filter-input');
const elFilterButton = document.querySelector('.movies__filter-button');

async function main() {
// let totalPages = 0;
const postsData = await getData();
let type = 'movie';
let search = 'panda';
let page = 1;
let rows = 10;

function displayList(arrData, rowPerPage, page) {
    const postsEl = document.querySelector('.posts');
    postsEl.innerHTML = "";
    page--;

    const start = rowPerPage * page;
    const end = start + rowPerPage;
    const paginatedData = arrData.slice(start, end);

    paginatedData.forEach((el) => {
        const postEl = document.createElement('div');
        postEl.classList.add("post");
        postEl.innerText = `${el.title}`;
        postsEl.appendChild(postEl);
    })
}
getData()
function displayPagination(arrData, rowPerPage) {
    const paginationEl = document.querySelector('pagination');
    const pagesCount = Math.ceil(arrData.length / rowPerPage);
    const ulEl = document.createElement("ul");
    ulEl.classList.add('pagination__list');
    for(let i = 0; i < pagesCount; i++) {
        const liEl = displayPaginationBtn(i + 1);
        ulEl.appendChild(liEl)
    }
       paginationEl.appendChild(ulEl)
}
function displayPaginationBtn(page) {
    const liEl = document.createElement("li");
    liEl.classList.add('pagination__item')
    liEl.innerText = page
    if( currentPage == page) liEl.classList.add('pagination__item__active');

    liEl.addEventListener('click', () => {
        currentPage = page;
        displayList(postsData, rows, currentPage)

        let currentItemLi = document.querySelector('li.pagination');
        currentItemLi.classList.remove('pagination__item__active');

        liEl.classList.add('pagination__item__active');

    })
    return liEl;
}
displayList(postsData, rows, currentPage);
displayPagination(postsData, rows);

// <---------------movies------------------->
document.getElementById('getMovies').addEventListener('click', getMovies);

elFilterSelect.addEventListener('change', (e) => {
    type = e.target.value;

    elMovies.textContent = null;

    getMovies();
});

elFilterButton.addEventListener('click', () => {
    search = elFilterInput.value;

    elMovies.textContent = null;

    getMovies();

    elFilterInput.value = null;
});

function getMovies() {
    fetch(`https://www.omdbapi.com/?apikey=7e789dc5&s=${search}&type=${type}&page=${page}`)
        .then((res) => res.json())
        .then(data => {
            const movieFragment = document.createDocumentFragment();

            totalPages = Math.ceil(data.totalResults / 10);

            data.Search.forEach(movie => {
                const elMovieItemTemplate = elMovieTemplate.cloneNode(true);

                elMovieItemTemplate.querySelector('.movies__item-title').textContent = movie.Title;
                elMovieItemTemplate.querySelector('.movies__item-image').setAttribute('src', movie.Poster);

                movieFragment.appendChild(elMovieItemTemplate);
            });

            elMovies.appendChild(movieFragment);
        });
}
main();
}

// <---------------/movies------------------->

