var http = require('http');
http.createServer(function(req,res){
  var header = req.headers['authorization']||'',        // get the header
      token = header.split(/\s+/).pop()||'',            // and the encoded auth token
      auth = new Buffer(token, 'base64').toString(),    // convert from base64
      parts = auth.split(/:/),                          // split on colon
      username = parts[0],
      password = parts[1];

  console.log("Headers: " + JSON.stringify(req.headers));
  if (!username)
  {
    res.writeHead(401 ,{'Content-Type':'text/plain',
                        "WWW-Authenticate": 'Basic realm="Secure Area"'});
    res.end("Auth me");
  }

  res.writeHead(200,{'Content-Type':'text/plain'});
  res.end('username is "'+username+'" and password is "'+password+'"');

}).listen(1337,'127.0.0.1');