const net = require('net')
const readline = require('readline');
const client = new net.Socket()
const PORT = process.argv[3]
const HOST = process.argv[2] //127.0.0.1

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

client.connect(PORT , HOST, () => {
    console.log('USE THE COMMAND <<HELP>> FOR MORE INFORMATION')
    rl.on('line', (input) => {
        client.write(input)
      }); 
})

client.on('data', (data) => {
    console.log(data.toString());
})

/*
    rl.question('Enter your username :', (input) =>{
        client.write('USER '+input);
    });
    rl.question("give password :",(input) =>{
        client.write('password'+input)
    });
      */