var db = (function () {
    var MODEL_KEY = 'MODEL',
        USER_KEY = 'USER';

    return {
        getModel: getModel,
        setModel: setModel,
        getCurrentUser: getCurrentUser,
        setCurrentUser: setCurrentUser,
    };

    function getModel(userId) {
        var allModels = JSON.parse(localStorage.getItem(MODEL_KEY) || '{}');
        return allModels[userId];
    };

    function setModel(userId, model) {
        !model && (model = {});
        var allModels = JSON.parse(localStorage.getItem(MODEL_KEY) || '{}');
        allModels[userId] = model;
        localStorage.setItem(MODEL_KEY, JSON.stringify(allModels));
    };

    function getCurrentUser() {
        var user = localStorage.getItem(USER_KEY);
        if (!user) return null;
        return JSON.parse(user);
    }

    function setCurrentUser(user) {
        if (!user) {
            return localStorage.removeItem(USER_KEY);
        }
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    }

}())