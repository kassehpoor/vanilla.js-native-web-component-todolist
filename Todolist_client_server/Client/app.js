var App = (function () {

    var app = {
        configRoutes: configRoutes,
        init: init,
        parseHtml: parseHtml,
        render: render
    };

    return app;

    function configRoutes(routes) {
        Router.config(routes);
    }

    function init(appContainer) {
        app.container = appContainer;
        if (!app.container) throw new Error('Invalid app container.');

        app.user = db.getCurrentUser() || { id: 0 };
        connection.setTokenHeader(app.user.id);
        app.userModel = db.getModel(app.user.id) || { todos: [], filter: 0 };

        Router.init();
    }

    function parseHtml(html) {
        var div = document.createElement('div');
        div.innerHTML = html;
        return div.children[0];
    }

    function render(component) {
        app.container.innerHTML = '';
        component.init();
        app.container.appendChild(component.render());
    }

}());