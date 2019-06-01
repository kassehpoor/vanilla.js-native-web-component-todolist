var http = (function () {

    var _defaultHeaders = [];

    return {
        get: get,
        post: post,

        setDefaultHeader: addDefaultHeader
    };

    // =====================================================================

    function get(url, headers, cb, err) {
        xhr('GET', url, null, headers, cb, err);
    }

    function post(url, data, headers, cb, err) {
        xhr('POST', url, data, headers, cb, err);
    }

    function addDefaultHeader(name, value) {
        _defaultHeaders.push({ 'name': name, 'value': value });
    }

    // =====================================================================

    function xhr(method, url, data, headers, cb, err) {
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
        xhr.open(method, url, true);
        _defaultHeaders.forEach(function (h) {
            xhr.setRequestHeader(h.name, h.value);
        });
        
        (headers || []).forEach(function (h) {
            xhr.setRequestHeader(h.name, h.value);
        });
        xhr.send(data);
    }

})();