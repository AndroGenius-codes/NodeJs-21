const http = require("http");
const fs = require("fs");
const os = require("os");
const port = 8080;
const host = '127.0.0.1';


const server = http.createServer((req, res) => {
    
   
  
    if(req.url === '/'){
            
            res.writeHead(200, {'content-Type': 'text/html'});
            html = fs.readFileSync('./pages/index.html')
            
            res.end(html);

    }
    else if (req.url === '/about') {
        res.writeHead(200, {'content-Type': 'text/html'});
        html = fs.readFileSync('./pages/about.html')
        
        res.end(html);

    }
     
       
    else if(req.url === '/sys') {
        res.writeHead(201, {'content-Type': 'text/plain'});

        const newData = {
    
            hostname: os.hostname(),
            platform: os.platform(),
            architecture: os.arch(),
            numberOfCPUS: os.cpus().length,
            networkInterfaces: os.networkInterfaces(),
            uptime: os.uptime()
        
       };
    
        fs.writeFile('./osinfo.json',JSON.stringify(newData, null, 2), err => {
           if(err) {console.log(err);}
        
        })
        res.end('Your OS info has been saved successfully!');
    }

    else{
        res.writeHead(404, {'content-Type': 'text/html'});
        html = fs.readFileSync('./pages/404.html')
        
        res.end(html);
    }
    
 

});

server.listen(port, host, () => {
    console.log(`i am listening at ${host}:${port}`)
});