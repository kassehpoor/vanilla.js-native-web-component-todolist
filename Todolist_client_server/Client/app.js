var App = (function () {

    var app = {
        init: init,
        parseHtml: parseHtml,
        run: run
    };

    return app;

    function init(appContainer, routerContainer, routes) {
        app.appContainer = appContainer;
        if (!app.appContainer) throw new Error('Invalid app container.');

        app.routerContainer = routerContainer;
        if (!app.routerContainer) throw new Error('Invalid router container.');

        Router.config(routes);

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

    function run(opr) {
        switch (opr) {
            case 'gotoSignInPage':
                return Router.goto('signin');
            case 'gotoSignUpPage':
                return Router.goto('signup');
            
        }
    }

}());