var http = require("http");
var fs = require("fs");

var do_longpoll = 0;
http.createServer(function(req, res){
  if (~req.url.indexOf("every-2nd-longpoll"))
  {
    do_longpoll = !do_longpoll;
    console.log("req, will do_longpoll", do_longpoll);

    if (do_longpoll)
    {
      setTimeout(function(){
        var headers = {};
        headers["Content-Type"] = "text/plain";
        // headers["Cache-Control"] = "max-age=0";
        res.writeHead(200, headers);
        res.end("Longpolling done");
      }, 20000);
    }
    else
    {
      res.writeHead(200, {"Content-Type": "text/plain"});
      res.end("Done");
    }
  }
  else
  {
    var filename = "index.html";
    var mimeType = "text/html"
    res.writeHead(200, mimeType);

    var fileStream = fs.createReadStream(filename);
    fileStream.pipe(res);
  }

}).listen(1337,'127.0.0.1');