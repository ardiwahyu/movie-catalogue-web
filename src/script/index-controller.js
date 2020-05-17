import ApiServices from './api-services.js';
import './component/list-movie.js';
import pagination from './component/pagination.js';

function main() {
    const movieListElement = document.querySelector("list-movie");
    const overlay = document.querySelector(".overlay");
    const spanner = document.querySelector(".spanner");
    const activeSelector = document.querySelector("#active-selector");
    const dropdown = document.querySelector("#navbarDropdown");
    const terpopuler = document.querySelector("#terpopuler");
    const nowPlaying = document.querySelector("#now-playing");
    const movie = document.querySelector("#movie");
    const tv = document.querySelector("#tv");
    const url = new URL(window.location.href);
    let type = url.searchParams.get("type");
    const filter = url.searchParams.get("filter");
    const search = url.searchParams.get("s");
    const page = url.searchParams.get("page");
    let pageNow, totalPage, urlSend = window.location.origin;

    const getContent = async () => {
        overlay.classList.add("show");
        spanner.classList.add("show");
        let typeText;
        if (type == "tv") {
            typeText = "TV";
            movie.classList.remove("active");
            tv.classList.add("active");
        } else {
            typeText = "Movie";
            movie.classList.add("active");
            tv.classList.remove("active");
        }
        if (filter == "now_playing" || filter == "on_the_air") {
            dropdown.innerHTML = "Now Playing ";
        } else {
            dropdown.innerHTML = "Popular ";
        }
        try {
            let result;
            if (type == null) {
                result = await ApiServices.getContent("movie", "popular", 1);
                activeSelector.innerHTML = `Movie Popular`
                type = "movie"
                urlSend = `${window.location.origin}?type=${type}&filter=popular`
            } else {
                if (search == null) {
                    result = await ApiServices.getContent(type, filter, page);
                    activeSelector.innerHTML = `${typeText} ${dropdown.innerText}`
                    urlSend = `${window.location.origin}?type=${type}&filter=${filter}`
                } else {
                    result = await ApiServices.searchContent(type, search, page);
                    activeSelector.innerHTML = `${typeText} search: ${search}`
                    urlSend = `${window.location.origin}?type=${type}&s=${search}`
                }
            }
            pageNow = result.page;
            totalPage = result.total_pages;
            renderResult(result.results, type);
        } catch (message) {
            console.log(message);
        }
    }

    const renderResult = (result, type) => {
        overlay.classList.remove("show");
        spanner.classList.remove("show");
        movieListElement.type = type;
        movieListElement.items = result;
        pagination(pageNow, totalPage, urlSend);
    }

    document.addEventListener("DOMContentLoaded", () => {
        const form = document.querySelector("#form-search");
        const input = document.querySelector("#input-search");

        movie.addEventListener("click", function () {
            if (`${dropdown.innerText}` == "Popular ") {
                movie.setAttribute("href", `${window.location.origin}?type=movie&filter=popular`);
            } else {
                movie.setAttribute("href", `${window.location.origin}?type=movie&filter=now_playing`);
            }
        })

        tv.addEventListener("click", function () {
            if (`${dropdown.innerText}` == "Popular ") {
                tv.setAttribute("href", `${window.location.origin}?type=tv&filter=popular`);
            } else {
                tv.setAttribute("href", `${window.location.origin}?type=tv&filter=on_the_air`);
            }
        })

        terpopuler.addEventListener("click", function () {
            if (movie.classList.contains("active")) {
                terpopuler.setAttribute("href", `${window.location.origin}?type=movie&filter=popular`);
            } else {
                terpopuler.setAttribute("href", `${window.location.origin}?type=tv&filter=popular`);
            }
        })

        nowPlaying.addEventListener("click", function () {
            if (movie.classList.contains("active")) {
                nowPlaying.setAttribute("href", `${window.location.origin}?type=movie&filter=now_playing`);
            } else {
                nowPlaying.setAttribute("href", `${window.location.origin}?type=tv&filter=on_the_air`);
            }
        })

        form.addEventListener("submit", function () {
            if (movie.classList.contains("active")) {
                window.location.href = `${window.location.origin}?type=movie&s=${input.value}`;
            } else {
                window.location.href = `${window.location.origin}?type=tv&s=${input.value}`;
            }
        })

        getContent();
    });
}

export default main;