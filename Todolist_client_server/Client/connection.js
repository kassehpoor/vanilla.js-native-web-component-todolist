
var connection = (function (){
    return {
        download :download,
		upload : upload, 

    };
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

