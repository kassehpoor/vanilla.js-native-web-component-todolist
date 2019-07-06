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