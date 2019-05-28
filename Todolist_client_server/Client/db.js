var db = (function () {
    var key = 'MODEL';
    
    return {
        getModel:getModelFromLocalStorage,
        setModel:setModelToLocalStorage
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
  
}())

 
