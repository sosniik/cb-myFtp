const net = require('net')
const readline = require('readline');
const client = new net.Socket()

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

client.connect(5000, '127.0.0.1', () => {
    console.log('connected')
    rl.on('line', (input) => {
        console.log(input);
      });
      client.write('USER Jean \n\r')
  
})

client.on('data', (data) => {
    console.log(data.toString());
})

