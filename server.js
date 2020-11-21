const net = require('net')
const fs =  require('fs')
const readline = require('readline');
const { ENGINE_METHOD_DIGESTS, ENETUNREACH } = require('constants');
const { exit } = require('process');
const PORT = process.argv[2]

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})


const server = net.createServer((socket) => {
  console.log('New connection')

  socket.on('data', (data) => {
    const [directive, parameter] = data.toString().split(' ')
    let rawdata = fs.readFileSync('id.json');
    let student = JSON.parse(rawdata);
//console.log(student)

    switch(directive) {
        case 'USER':
            
            let ok = Boolean
            ok = 0

            student.forEach(element => {
                let verif = element["username"]
                if(verif == parameter){
                     ok = true
                }});            
            
                if(ok){
                    socket.write('Please, enter your password')
                    socket.username = parameter

                }
                else {
                    socket.write('Impossible to connect')
                }
            break;

        case 'PASS':
            let result = student.filter(e => e.username == socket.username)
                let ok1 = Boolean
                ok1 = 0
            result.forEach(element1 => {
                let verif1 = element1["password"]
                if(verif1 == parameter){
                    ok1 = true
                    }      
                });
                if(ok1){
                    socket.write('Password ok\nWELCOME '+ socket.username)
                    socket.username = parameter
                    socket.verifpass = true
                }
                else {
                    socket.write('Password not ok ')
                }
            break;

        case 'LIST':
            if(socket.verifpass == true){
                fs.readdir('/Users/leolemercier/Documents/cours_efrei/cb-myFtp', (err, files) => {
                    if(err) return console.error(err);
                    socket.write(files.join('\n'));
                });
            }
            else{
                socket.write("You don't have the permission")
            }
            break;
        
        case 'CWD' :    
            if(socket.verifpass == true){
                socket.write(`Starting directory: ${process.cwd()}`);
                    try {
                        process.chdir(parameter);
                        socket.write(`New directory: ${process.cwd()}`);
                    } catch (err) {
                        socket.write(`chdir: ${err}`);
                    }
            }else{
                socket.write("You don't have the permission")
            }
            break

        case 'RETR':

            if(socket.verifpass == true){
              fs.readFile(`${parameter}`, 'utf8' , (err, data) => {
                if (err) {
                  console.error(err)
                  return
                }
                socket.write(`The file content : \n`+ data)
              })
                
            }
            else{
                socket.write("You don't have the permission")
            }
            break;

        case 'STOR':
            if(socket.verifpass == true){
                fs.readFile(`${parameter}`, 'utf8' , (err, data) => {
                    if (err) {
                      console.error(err)
                      return
                    }
                    console.log(`The file content : \n`+ data)
                  })
                
            }
            else{
                socket.write("You don't have the permission")
                }
            break;

        case 'PWD' :
            if(socket.verifpass == true){
            socket.write(`Current directory: ${process.cwd()}`)
            }
            else{
                socket.write("You don't have the permission")
            }
            break;
        
        case 'HELP':
            socket.write("USER <username> : enter username\nPASS <password> : enter your password\nLIST : list the current directory of the server\nCWD <directory> : change the current directory of the server\nRETR <filename> transfert a copy of the file FILE from the server to the client\nSTOR <filename> : transfer a copy of the file FILE from the client to the server\nPWD : display the name of the current directory of the server\nQUIT : close the connection and stop the program")
            break;

        case 'QUIT':
            server.close();
            console.log('Server closed!');
            break;
    }
  })

 // socket.write('Hello from server')
})

server.listen(PORT, () => {
  console.log(`Server started at port ` + PORT)
})



/*student.forEach(element => {
                    if(element.student == parameter){
                        socket.write("connected")
                    }else{
                        socket.write("notconnected")
                    }*/