
var connection = (function (){
    return {
        download :download,
        upload : upload,
        getToken : getToken, 

    };
    var token_;
    function getToken (cb, err) {
        var isAuthorized = false;  
        var xhr = new XMLHttpRequest(); 
   
    xhr.open("POST", url, true); 
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('jwtoken'));
    xhr.send(); // specify the credentials to receive the token on request
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var response  = xhr.responseText;
                var data = JSON.parse(response);
                token_ = data.access_token;
                token_ &&  !isAuthorized ;
                cb && cb(isAuthorized);
            } else {
                cb (isAuthorized);
                err && err();
            }
        }
    };
 }

    function download(cb, err) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var data = xhr.responseText;
                    cb && cb(data);
                } else {
                    err && err(xhr.responseText);
                }
            }
        };
        xhr.open('GET', 'read', true);
        xhr.send();
    }

    function upload(data, cb, err) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    cb && cb();
                }else {
                    err && err();
                }
            }
        };
        xhr.open('POST', 'write', true);
        xhr.setRequestHeader('Content-Type','application/json');
        xhr.send(JSON.stringify(data));
    }
 
}())

