const net = require('net')
const fs =  require('fs')
const server = net.createServer((socket) => {
  console.log('new connection')

  socket.on('data', (data) => {
    const [directive, parameter] = data.toString().split(' ')

    switch(directive) {
        case 'USER':
            let rawdata = fs.readFileSync('id.json');
            let student = JSON.parse(rawdata);

            //console.log(student["username"])
            console.log(parameter)
                if(student["username"] == parameter){
                    socket.write('200 successfuly connected')
                }
            
            break;
    }
  })

  socket.write('Hello from server')
})

server.listen(5000, () => {
  console.log('Server started at port 5000')
})