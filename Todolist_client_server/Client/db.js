var db = (function () {
    var MODEL_KEY = 'MODEL',
        TOKEN_KEY = 'TOKEN',
        USER_KEY = 'USER';

    return {
        getModel: getModelFromLocalStorage,
        setModel: setModelToLocalStorage,
        getToken: getTokenFromLocalStorage,
        setToken: setTokenToLocalStorage,
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

    function getTokenFromLocalStorage() {
        var token = localStorage.getItem(TOKEN_KEY);
        if (!token) return null;
        return token;
    }

    function setTokenToLocalStorage(token) {
        localStorage.setItem(TOKEN_KEY, token);
    }
    
    function getUserFromLocalStorage() {
        var user = localStorage.getItem(USER_KEY);
        if (!user) return null;
        return JSON.parse(user);
    }

    function setUserToLocalStorage(user) {
        !user && (user = {});
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    }

}())


