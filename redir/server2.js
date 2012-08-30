var http = require("http");
http.createServer(function(req,res){
  console.log("req", req.url);
  if (req.url.indexOf("redir") -1)
  {
    res.writeHead(302 ,{"Content-Type": "text/plain",
                        "Location": "http://127.0.0.1:1337/redir"});
    res.end("Found.");
  }
  else
  {
    res.writeHead(200,{"Content-Type": "text/plain",
                       "X-I-am-custom": "true"});
    res.end("Here we are.");
  }
}).listen(1337,"127.0.0.1");