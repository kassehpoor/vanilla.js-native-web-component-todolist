var templ = (function () {
    return function tmpl(str, data) {        
        var fn = !/\W/.test(str)
            ? cache[str] = cache[str] || tmpl(document.getElementById(str).innerHTML)
            : new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};p.push('"
                + str.replace(/[\r\t\n]/g, " ")
                    .split("<%").join("\t")
                    .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                    .replace(/\t=(.*?)%>/g, "',$1,'")
                    .split("\t").join("');")
                    .split("%>").join("p.push('")
                    .split("\r").join("\\'")
                + "');return p.join('');");

        return data ? wrap(data) : wrap;

        function wrap(data) {
            return fn.call(data);
        }
    };
}())