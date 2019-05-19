var db = (function () {

    return {
        getModel:getModelFromServer,
        setModel:setModelToServer,
    };
    
    function getModelFromServer(callBack){
        let url = '/read/';
        console.log('I am getModelFromServer function....');
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function (){
            var value;
            if (xhr.readyState == 4 && xhr.status == 200){
                value = xhr.responseText;
				console.log('I want to read.... ');
				if (!value) callBack(null);
				else callBack(JSON.parse(value)) ;
            }
        };
        xhr.open("GET",url);
		xhr.send();
    };
//************************************************************************
    function setModelToServer(value){
        let url = '/write/';
        let xhr = new XMLHttpRequest();
        console.log('I am setModelToerver function....');
        
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
