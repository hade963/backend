const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');


const server = http.createServer((req,res) => { 
  const file = req.url ==='/'? '/index.html': req.url;
  filePath = path.join(__dirname,'/pages',file);
  const extname = path.extname(file);
  let contentType = '';

  switch(extname) {
    case '.js': 
    contentType = 'text/js';
    break;
    case '.css': 
    contentType = 'text/css';
    break;
    case '.html': 
    contentType = 'text/html';
    break;
    case '.json': 
    contentType = 'application/json';
    break;
    case '.png': 
    contentType = 'image/png';
    break;
  }

  fs.readFile(filePath,(err,data) => { 
    if(err) {
      if(err.code === 'ENOENT') { 
        fs.readFile(path.join(path.dirname(err.path),'error.html'),(er,d) => { 
          if(er) { 
            throw er;
          }
          res.writeHead(404,{'content-type':'text/html'});
          res.end(d);
        }) 
      } 
        else { 
          throw err;
        }
      }
    else { 
      res.writeHead(200,{"content-type": `${contentType}`});
      res.end(data);
    }
  })
})
server.listen(8080);