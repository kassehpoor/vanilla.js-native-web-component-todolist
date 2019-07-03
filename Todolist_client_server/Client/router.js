var Router = (function () {

    // route: { name:'route-name', component: component }
    var _routes = [];

    var router = {
        config: config,
        addRoute: addRoute,
        init: init,
        goto: goto
    };

    return router;

    function config(routes) {
        _routes = routes;
    }

    function addRoute(route) {
        _routes.push(route);
    }

    function init() {
        // TODO: ...
        var defaultRoute = _routes.find(function (r) { return r.default; });
        if (!defaultRoute) throw new Error('no default route cofigured.');
        router.goto(defaultRoute.name);
    }

    function goto(routeName) {
        var route = _routes.find(function (r) { return r.name === routeName; });
        if (!route) throw new Error('route not found: ' + routeName);

        render(route.component);
    }

    // ====================================================================================

    function render(component) {
        App.routerContainer.innerHTML = '';
        // if (component === SignOutComponent) { TodoComponent.init(); return  } 
        component.init();
        App.routerContainer.appendChild(component.render());
    }

}());