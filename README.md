# cb-myFtp
When you start your server and client, please respect :
  node myFtpServer.js <port>
  
  node myFtpClient.js <host> <port>
  
The default PORT is 5000 but you can change if you want
The IP is 127.0.0.1, you don't change this.


USER <username>: check if the user exist
  
PASS <password>: authenticate the user with a password
  
LIST: list the current directory of the server

CWD <directory>: change the current directory of the server
  
RETR <filename>: transfer a copy of the file FILE from the server to the client
  
STOR <filename>: transfer a copy of the file FILE from the client to the server
  
PWD: display the name of the current directory of the server

HELP: send helpful information to the client

QUIT: close the connection and stop the program

