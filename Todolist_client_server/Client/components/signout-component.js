var SignOutComponent = (function () {
    return {
        init: init,
        render: render
    }

    function init() {
        db.setCurrentUser({ id: 0 });
    }

    function render() {
        Router.goto('todolist');
    }

}()); 