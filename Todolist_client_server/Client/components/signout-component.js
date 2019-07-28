
(function () {
    class SignOutComponent extends HTMLElement {
        constructor() {
            super();

             var me = this;

            me.doSingOut();
        }
        doSingOut() {
            setTimeout(function () {
                App.reInit({ id: 0 });
            });
            Router.goto('todolist');
        }
    }
    window.customElements.define('signout-component', SignOutComponent);
}())

/************************************************************** */
/*
var SignOutComponent = (function () {
    return {
        init: init,
        render: render
    }

    function init() {
        setTimeout(function () {
            App.reInit({ id: 0 });
        });
    }

    function render() {
        return App.parseHtml('<div></div>');
    }

}()); 
*/