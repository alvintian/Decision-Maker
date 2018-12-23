# Decision-Maker
A group project that let users create polls and visitors can rank the options. The result will be mailed.

## Usage
Install the dependencies and start the server.
<br>
`git clone git@github.com:alvintian/Decision-Maker.git`
<br>
npm install 
<br>
connect to psql and provides all necessary infos through .env file:
<br>
DB_HOST,DB_USER,DB_PASS,DB_NAME,DB_SSL,DB_PORT,GMAIL_USER,GMAIL_PASS,EMAIL_USER
<br>
knex migrate:latest
<br>
npm start
<br>
screenshot:
<br>
<img src="screenshot/one.png" height='500px'>
<img src="screenshot/two.png" height='500px'>
<img src="screenshot/three.png" height='400px'>
## Dependencies
body-parser
bootstrap
gmail-send
knex
morgan
multer
nodemailer
