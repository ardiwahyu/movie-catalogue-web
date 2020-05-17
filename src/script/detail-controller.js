import ApiServices from './api-services.js';
import rating from './component/rating.js';
const dateFormat = require('dateformat');

function detail() {
    const overlay = document.querySelector(".overlay");
    const jumbotron = document.querySelector(".jumbotron");
    const poster = document.querySelector("#poster");
    const judul = document.querySelector("#txt-judul");
    const listGenre = document.querySelector("#list-genre");
    const valueRate = document.querySelector("#value-rate");
    const overviewImage = document.querySelector("#overview-image");
    const movie = document.querySelector("#movie");
    const tv = document.querySelector("#tv");
    const url = new URL(window.location.href);
    const type = url.searchParams.get("type");
    const id = url.searchParams.get("id");

    const getDetail = async () => {
        overlay.classList.add("show");
        if (type == "movie") {
            movie.classList.add("active");
            tv.classList.remove("active");
        } else {
            movie.classList.remove("active");
            tv.classList.add("active");
        }
        try {
            const result = await ApiServices.getDetail(type, id);
            renderResult(result);
        } catch (message) {
            console.log(message);
        }
    }

    const renderResult = (result) => {
        if (type == "movie") {
            judul.innerHTML = `${result.title} (${dateFormat(result.release_date, "yyyy")})`;
        } else {
            judul.innerHTML = `${result.name} (${dateFormat(result.release_date, "yyyy")})`;
        }
        poster.innerHTML = `
            <img class="card-img-top"
                src="https://image.tmdb.org/t/p/original${result.poster_path}" alt="Card image cap">`;
        result.genres.forEach(genre => {
            listGenre.innerHTML += `<li class="list-group-item item">${genre.name}</li>`
        });
        rating(result.vote_average);
        valueRate.innerHTML = `${result.vote_average * 10}${valueRate.innerHTML}`
        overviewImage.innerHTML = `${result.overview}`
        jumbotron.innerHTML = `
            <style>
                .jumbotron {
                    background-image: url("https://image.tmdb.org/t/p/original${result.backdrop_path}");
                }
            </style>
            ${jumbotron.innerHTML}
        `;
        overlay.classList.remove("show");
    }

    document.addEventListener("DOMContentLoaded", () => {
        const movie = document.querySelector("#movie");
        const tv = document.querySelector("#tv");
        const form = document.querySelector("#form-search");
        const input = document.querySelector("#input-search");

        movie.addEventListener("click", function () {
            movie.setAttribute("href", `${window.location.origin}?type=movie&filter=popular`);
        })

        tv.addEventListener("click", function () {
            tv.setAttribute("href", `${window.location.origin}?type=tv&filter=popular`);
        })

        form.addEventListener("submit", function () {
            if (movie.classList.contains("active")) {
                window.location.href = `${window.location.origin}?type=movie&s=${input.value}`;
            } else {
                window.location.href = `${window.location.origin}?type=tv&s=${input.value}`;
            }
        })

        getDetail();
    });
}

export default detail;