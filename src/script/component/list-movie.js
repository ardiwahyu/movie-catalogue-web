import './list-item.js';

class MovieList extends HTMLElement {
    set items(items) {
        this._items = items;
        this.render();
    }

    set type(type) {
        this._type = type;
    }

    render() {
        this.innerHTML = ``;
        this._items.forEach(item => {
            const listItemElement = document.createElement("list-item");
            listItemElement.itemType = this._type;
            listItemElement.item = item;
            listItemElement.className = "col-lg-2 col-md-4 col-sm-6 mt-4";
            this.appendChild(listItemElement);
        });
    }
}

customElements.define("list-movie", MovieList);