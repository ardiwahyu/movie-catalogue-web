import ApiServices from './api-services.js';
import './component/list-movie.js';
import pagination from './component/pagination.js';

function main() {
    const movieListElement = document.querySelector("list-movie");
    const overlay = document.querySelector(".overlay");
    let pageNow, totalPage, search, queryActive, typeActive, filterActive;

    const getContent = async (type = "movie", filter = "popular", page = 1) => {
        overlay.classList.add("show");
        search = false;
        typeActive = type;
        filterActive = filter;
        try {
            const result = await ApiServices.getContent(type, filter, page);
            pageNow = result.page;
            totalPage = result.total_pages;
            renderResult(result.results, type);
        } catch (message) {
            console.log(message);
        }
    }

    const searchContent = async (type, query, page = 1) => {
        overlay.classList.add("show");
        search = true;
        typeActive = type;
        queryActive = query;
        try {
            const result = await ApiServices.searchContent(type, query, page);
            pageNow = result.page;
            totalPage = result.total_pages;
            renderResult(result.results, type);
        } catch (message) {
            console.log(message);
        }
    }

    const setButtonPagination = () => {

        const next = document.querySelector("#next");
        const prev = document.querySelector("#previous");
        const number = document.querySelector(".pagination-item").querySelectorAll(".number-item");

        next.addEventListener("click", function () {
            if (pageNow < totalPage) {
                if (search) {
                    searchContent(typeActive, queryActive, pageNow + 1);
                } else {
                    getContent(typeActive, filterActive, pageNow + 1);
                }
            }
        });

        prev.addEventListener("click", function () {
            if (pageNow > 1) {
                if (search) {
                    searchContent(typeActive, queryActive, pageNow - 1);
                } else {
                    getContent(typeActive, filterActive, pageNow - 1);
                }
            }
        });

        for (let i = 0; i < number.length; i++) {
            number[i].addEventListener("click", function () {
                const page = number[i].querySelector("a");
                if (search) {
                    searchContent(typeActive, queryActive, `${page.innerText}`);
                } else {
                    getContent(typeActive, filterActive, `${page.innerText}`);
                }
            })
        }
    }

    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    const renderResult = (result, type) => {
        overlay.classList.remove("show");
        movieListElement.type = type;
        movieListElement.items = result;
        pagination(pageNow, totalPage);
        setButtonPagination();
        topFunction();
    }

    document.addEventListener("DOMContentLoaded", () => {
        const activeSelector = document.querySelector("#active-selector");
        const movie = document.querySelector("#movie");
        const tv = document.querySelector("#tv");
        const dropdown = document.querySelector("#navbarDropdown");
        const terpopuler = document.querySelector("#terpopuler");
        const nowPlaying = document.querySelector("#now-playing");
        const form = document.querySelector("#form-search");
        const input = document.querySelector("#input-search");

        movie.addEventListener("click", function () {
            movie.classList.add("active");
            tv.classList.remove("active");
            activeSelector.innerHTML = `Movie ${dropdown.innerHTML}`;
            if (`${dropdown.innerText}` == "Popular ") {
                getContent("movie", "popular");
            } else {
                getContent("movie", "now_playing");
            }
        })

        tv.addEventListener("click", function () {
            movie.classList.remove("active");
            tv.classList.add("active");
            activeSelector.innerHTML = `TV ${dropdown.innerHTML}`;
            if (`${dropdown.innerText}` == "Popular ") {
                getContent("tv", "popular");
            } else {
                getContent("tv", "on_the_air");
            }
        })

        terpopuler.addEventListener("click", function () {
            dropdown.innerHTML = "Popular";
            if (movie.classList.contains("active")) {
                activeSelector.innerHTML = `Movie ${dropdown.innerHTML}`;
                getContent("movie", "popular");
            } else {
                activeSelector.innerHTML = `TV ${dropdown.innerHTML}`;
                getContent("tv", "popular");
            }
        })

        nowPlaying.addEventListener("click", function () {
            dropdown.innerHTML = "Now Playing";
            if (movie.classList.contains("active")) {
                activeSelector.innerHTML = `Movie ${dropdown.innerHTML}`;
                getContent("movie", "now_playing");
            } else {
                activeSelector.innerHTML = `TV ${dropdown.innerHTML}`;
                getContent("tv", "on_the_air");
            }
        })

        form.addEventListener("submit", function () {
            queryActive = `${input.value}`;
            if (movie.classList.contains("active")) {
                activeSelector.innerHTML = `Movie search: ${input.value}`;
                searchContent("movie", `${input.value}`);
            } else {
                activeSelector.innerHTML = `TV search: ${input.value}`;
                searchContent("tv", `${input.value}`);
            }
            input.value = "";
        })

        getContent();
    })
}

export default main;