const dateFormat = require('dateformat');

class ListItem extends HTMLElement {

    set item(item) {
        this._item = item;
        this.render();
    }

    render() {
        this.innerHTML = `
                <div class="card profile-card-5">
                    <div class="card-img-block">
                        <img class="card-img-top"
                            src="https://image.tmdb.org/t/p/w500/${this._item.poster_path}"
                            alt="Card image cap">
                    </div>
                    <div class="card-body pt-0 pb-3">
                        <h6 class="card-title">${this._item.title}</h6>
                        <p class="card-text">(${dateFormat(this._item.release_date, "yyyy")})</p>
                    </div>
                </div>
        `;
    }
}

customElements.define("list-item", ListItem);