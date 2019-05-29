var db = (function () {
    var key = 'MODEL';
        
    return {
        getModel:getModelFromLocalStorage,
        setModel:setModelToLocalStorage,
        setToken:setTokenToLocalStorage,
        getToken:getTokenFromLocalStorage,
    };

      function getModelFromLocalStorage() {
        var value = localStorage.getItem(key);
        if (!value) return null;
        return JSON.parse(value);
    };

    function setModelToLocalStorage(value) {
        !value && (value = {});
        localStorage.setItem(key, JSON.stringify(value));
    };
    
    function getTokenFromLocalStorage () {
        var token = localStorage.getItem('Token');
        if (!token) return null;
        return token;
    }

    function setTokenToLocalStorage (token) {
        !token && (token = {});
        localStorage.setItem('Token', JSON.stringify(token));
    }

}())

 
