const cors = require('cors');
const express = require('express');

const app = express();

app.use(cors({
    origin: '*'
}));

app.get('/', (req, res) => {
  let ips = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  ips = JSON.stringify(ips);
  //Delete other ip redirection
  let ip = ips.split(",")[0];
  var json = { "ip" : ip.replaceAll('"','') };
    let info = {
     ip : ip.replaceAll('"',''),
     apis : [
         {
         name: "Real API with NODEJS-EXPRESS-JWT-MONGO",
         description : "ApiRest + JsonWebToken + MongoDB",
         url : "http://api-jwt-mongodb.fenixbinario.com"
         },
        {
         name: "Fake API",
         description : "Fake API with two method post and get",
         url: 'http://api.fenixbinario.com'
        },
        {
         name: "What is my IP?",
         description : "Api",
         url : "http://ip.fenixbinario.com"
        }
     ],
    "http://ip.fenixbinario.com" : {
    "/ip" : 
        { 
          method : "get" 
        },
    response : 
        {
          ip : "your ip"
        }
    },
    "/postman" : {
      method : "get",
      response : {
        file : "postman_collection.json"
      }
    }
  }

  res.status(200).send(info);
  console.log(json);
});

app.get('/ip', (req, res) => {
  let ips = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  ips = JSON.stringify(ips);
  //Delete other ip redirection
  let ip = ips.split(",")[0];
  var json = { "ip" : ip.replaceAll('"','') };
  res.status(200).send(json);
  console.log(json);
});
const mySecret = process.env['SECRETO']

app.get('/postman', function(req, res){
  const file = `${__dirname}/public/postman_collection.json`;
  res.download(file); // Set disposition and send it.
});


app.listen(3000, () => {
  console.log('WHAT IS  MY IP? - Server started - ' + mySecret);
});
