function hashHandler(){
    this.oldHash = window.location.hash;
    this.Check;

    var that = this;
    var detect = function(){
        const lambda = "https://bgusiaaz4aueob6ybmpaz5zxm40zmykg.lambda-url.eu-central-1.on.aws";
        if(that.oldHash!=window.location.hash){
            console.log("HASH CHANGED - new has" + window.location.hash);
            that.oldHash = window.location.hash;
            const ajax = function(options, callback) {
                const xhr = new XMLHttpRequest();
                xhr.open(options.type, options.url, options.async || true);
                xhr.onreadystatechange = function() {
                  if (xhr.readyState === 4) {
                    return callback(xhr.responseText);
                  }
                };
                return xhr.send();
            };
            ajax({
                type: "GET",
                url: lambda
            });
        }
    };
    this.Check = setInterval(function() { detect() }, 100);
}

console.log(window.location.hash);
var hashDetection = new hashHandler();