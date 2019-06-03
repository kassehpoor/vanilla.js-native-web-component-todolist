var db = (function () {
    var MODEL_KEY = 'MODEL',
        USER_KEY = 'USER';

    return {
        getModel: getModelFromLocalStorage,
        setModel: setModelToLocalStorage,
        getUser: getUserFromLocalStorage,
        setUser: setUserToLocalStorage,
    };

    function getModelFromLocalStorage() {
        var value = localStorage.getItem(MODEL_KEY);
        if (!value) return null;
        return JSON.parse(value);
    };

    function setModelToLocalStorage(value) {
        !value && (value = {});
        localStorage.setItem(MODEL_KEY, JSON.stringify(value));
    };

    function getUserFromLocalStorage() {
        var user = localStorage.getItem(USER_KEY);
        if (!user) return null;
        return JSON.parse(user);
    }

    function setUserToLocalStorage(user) {
        if (!user) {
            return localStorage.removeItem(USER_KEY);
        }
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    }

}())