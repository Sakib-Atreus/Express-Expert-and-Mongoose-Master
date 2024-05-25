const http = require('http');
const fs = require('fs')

//creating a server using node.js
const server = http.createServer()

// Listener
server.on('request', (req, res) => {
    if(req.url === '/readFile' && req.method === 'GET');

    // Streaming file reading
    const readableStream = fs.createReadStream(process.cwd() + '/texts/longRead.txt')

    readableStream.on('data', (buffer) => {
        res.statusCode = 200;
        res.write(buffer)
    })

    readableStream.on('end', () => {
        res.statusCode = 200;
        res.end('The streaming is over !')
    })

    readableStream.on('end', (error) => {
        res.statusCode = 500;
        res.end('Something went wrong !')
    })
    
})

server.listen(5000, () => {
    console.log(`Server is listening on port 5000`);
})