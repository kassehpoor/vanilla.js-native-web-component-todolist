var db = (function () {

    return {
        getModel:getModelFromServer,
        setModel:setModelToServer,
    };
    
    function getModelFromServer(){
        console.log('I am getModelFromServer function....');
        let xhr = new XMLHttpRequest();
        xhr.open("GET",url,false);
        xhr.onreadystatechange = function (){
            var value;
            let url = '/read/';
            if (this.readyState == 4 && this.status == 200){
                value = this.responseText;
                value.forEeach((obj)=>{console.log(obj);});
            };
        };
        xhr.send(null);
        console.log('I want to read....');
        if (!value) return null;
        return JSON.parse(value);
    };

    function setModelToServer(value){
        let xhr = new XMLHttpRequest();
        console.log('I am setModelToerver function....');
        let url = '/write/';
        xhr.open("POST",url,true);
        xhr.setRequestHeader('Content-Type','application/json');
        xhr.send(JSON.stringify(value));
        console.log('I want to write....');
    };
}())





/*
//---------------------------------------------------------
    var key = 'MODEL';

    return {
        getModel: getModelFromLocalStorage,
        setModel: setModelToLocalStorage,
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
//---------------------------------------------------------
*/
