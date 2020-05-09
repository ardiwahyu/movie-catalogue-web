function pagination(pageNow, totalPage) {

    const pagination = document.querySelector("#navigation");
    const paginationItem = document.querySelector(".pagination-item");

    const setPagination = () => {
        paginationItem.innerHTML = `
            <li class="page-item" id="previous">
                <a class="page-link" href="javascript:void(0)" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
        `
        if (totalPage == 1) {
            pagination.classList.remove("show");
            pagination.classList.add("hidden");
        } else {
            pagination.classList.remove("hidden");
            pagination.classList.add("show");
            if (totalPage < 5) {
                for (let i = 0; i < totalPage; i++) {
                    if (i + 1 == pageNow) {
                        paginationItem.innerHTML += `
                        <li class="page-item active number-item">
                            <a class="page-link" href="javascript:void(0)">${i + 1}</a>
                        </li>`;
                    } else {
                        paginationItem.innerHTML += `
                        <li class="page-item number-item">
                            <a class="page-link" href="javascript:void(0)">${i + 1}</a>
                        </li>`;
                    }

                }
            } else if (pageNow <= 3) {
                for (let i = 0; i < 5; i++) {
                    if (i + 1 == pageNow) {
                        paginationItem.innerHTML += `
                        <li class="page-item active number-item">
                            <a class="page-link" href="javascript:void(0)">${i + 1}</a>
                        </li>`;
                    } else {
                        paginationItem.innerHTML += `
                        <li class="page-item number-item">
                            <a class="page-link" href="javascript:void(0)">${i + 1}</a>
                        </li>`;
                    }

                }
            } else {
                for (let i = -2; i <= 2; i++) {
                    if (pageNow + i == pageNow) {
                        paginationItem.innerHTML += `
                        <li class="page-item active number-item">
                            <a class="page-link" href="javascript:void(0)">${pageNow + i}</a>
                        </li>`;
                    } else {
                        paginationItem.innerHTML += `
                        <li class="page-item number-item">
                            <a class="page-link" href="javascript:void(0)">${pageNow + i}</a>
                        </li>`;
                    }

                }
            }
            paginationItem.innerHTML += `
                <li class="page-item" id="next">
                    <a class="page-link" href="javascript:void(0)" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>`
        }

        const next = document.querySelector("#next");
        const prev = document.querySelector("#previous");
        if (pageNow == 1) {
            prev.classList.add("disabled");
            next.classList.remove("disabled");
        } else if (pageNow == totalPage) {
            prev.classList.remove("disabled");
            next.classList.add("disabled");
        }
    }

    setPagination();
}

export default pagination;