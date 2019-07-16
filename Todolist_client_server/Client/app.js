var App = (function () {

    var _headerComponent;

    var app = {
        init: init,
        parseHtml: parseHtml,
        run: run,
        loadUser: loadUser,
        reInit: reInit
    };

    return app;

    function init(appContainer, routerContainer, routes) {
        app.appContainer = appContainer;
        if (!app.appContainer) throw new Error('Invalid app container.');

        app.routerContainer = routerContainer;
        if (!app.routerContainer) throw new Error('Invalid router container.');

        _headerComponent = document.getElementById('headerComponent');

      
        loadUser();
        Router.config(routes);
        Router.init();


    _headerComponent.addEventListener('signin',function(e){
        run('signin')
    });

    _headerComponent.addEventListener('signup',function(e){
        run('signup')
    });

    _headerComponent.addEventListener('signout',function(e){
        run('signout')
    });

    }

    function parseHtml(html) {
        var div = document.createElement('div');
        div.innerHTML = html;
        return div.children[0];
    }

    function run(opr) {
                
        switch (opr) {
            case 'signin':
                return Router.goto('signin');
            case 'signup':
                return Router.goto('signup');
            case 'signout':
                return Router.goto('signout');
        }
    }

    function loadUser() {
        app.user = db.getCurrentUser() || { id: 0 };
        connection.setTokenHeader(app.user.id);

        _headerComponent.displayName = app.user.firstName ? app.user.firstName + ' ' + app.user.lastName : '';

    }

    function reInit(user) {
        connection.setTokenHeader(user.id);
        db.setCurrentUser(user);
        loadUser();
        Router.goto('todolist');
    }

}());