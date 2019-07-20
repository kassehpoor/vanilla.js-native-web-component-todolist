(function () {
    const template = document.createElement('template');
    template.innerHTML = `
    <style>
        .filters {
            background-color: #f7e4e4;
            color: rgb(19, 17, 17);
            text-emphasis-color: black;
            margin: 3px;
            padding: 3px 7px;
            text-decoration: none;
            border: 1px solid transparent;
            border-radius: 3px;
        
        }
    </style>
    <div>
        <ul>
            <input class="filters filter-all-button" type="button" value="All">
            <input class="filters filter-active-button" type="button" value="Active">
            <input class="filters filter-complete-button" type="button" value="Complete">
         </ul>
    </div>
    `;

    class FilterTodoComponent extends HTMLElement {
        constructor() {
            super();

            var me = this;

            me._shadowRoot = this.attachShadow({ 'mode': 'open' });
            me._shadowRoot.appendChild(template.content.cloneNode(true));
            me._filterAllButton = this._shadowRoot.querySelector('.filter-all-button');
            me._filterActiveButton = this._shadowRoot.querySelector('.filter-active-button');
            me._filtercompleteButton = this._shadowRoot.querySelector('.filter-complete-button');
            me._model = {};

            me._filterAllButton.addEventListener('click', e => {
                this.dispatchEvent(new CustomEvent('filter', {
                    bubbles: true,
                    cancelable: false,
                    composed: true,
                    detail: 0
                }));

            });

            me._filterActiveButton.addEventListener('click', e => {
                this.dispatchEvent(new CustomEvent('filter', {
                    bubbles: true,
                    cancelable: false,
                    composed: true,
                    detail: 1
                }));

            });

            me._filtercompleteButton.addEventListener('click', e => {
                this.dispatchEvent(new CustomEvent('filter', {
                    bubbles: true,
                    cancelable: false,
                    composed: true,
                    detail: 2
                }));

            });
        }
    }
    window.customElements.define('filter-todos', FilterTodoComponent)
}())