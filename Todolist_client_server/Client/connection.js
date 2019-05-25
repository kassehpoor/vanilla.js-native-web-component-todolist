
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
    
    
    function upload() {
        var data =  db.getModel();
        if (!data) return alert('there is nothing to upload.');
    
        var confirmResult = confirm('data on the server will be replaced!, are you sure to continue?');
        if (!confirmResult) return;
        
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                alert('upload done successfully.');
            }
        }
        xhr.open('POST', 'write', true);
        xhr.setRequestHeader('Content-Type','application/json');
        xhr.send(JSON.stringify(data));
        
    }
 

}())

