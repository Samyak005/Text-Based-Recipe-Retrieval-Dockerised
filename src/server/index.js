const { Client } = require("@elastic/elasticsearch");
                   require("dotenv").config();

const elasticUrl = process.env.ELASTIC_URL || "http://localhost:9200";
const client   = new Client({ node: elasticUrl });

// var elasticsearch = require('elasticsearch')
// var client = elasticsearch.Client({
//   host: 'localhost:9200'
// })

//require Express
const express = require( 'express' );
// instantiate an instance of express and hold the value in a constant called app
const app     = express();
//require the body-parser library. will be used for parsing body requests
const bodyParser = require('body-parser')
//require the path library
const path    = require( 'path' );

function start() {
  // use the bodyparser as a middleware  
  app.use(bodyParser.json())
  // set port for the app to listen on
  app.set( 'port', process.env.PORT || 3000 );
  // set path to serve static files
  app.use( express.static( path.join( __dirname, 'public' )));
  // enable CORS 
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  // defined the base route and return with an HTML file called tempate.html
  app.get('/', function(req, res){
    res.sendFile('template.html', {
      root: path.join( __dirname, 'views' )
    });
  })

  // define the /search route that should return elastic search results 
  app.get('/search', function (req, res){
    // declare the query object to search elastic search and return only 200 results from the first result found. 
    // also match any data where the name is like the query string sent in
    let body = {
      size: 200,
      from: 0, 
      query: {
        match: {
            ingredients: req.query['q']
        }
      }
    }

    // perform the actual search passing in the index, the search query and the type
    const request = client.search({index:'recipes3',  body:body, type:'recipes'})
    
    request
      .then(results => {
      console.log(results.body.hits.hits)
      res.send(results.body.hits.hits);
    })
    .catch(err=>{
      console.log(err)
      res.send([]);
    });

    // const { request } = await client.search({
    //   index: 'recipes3',
    //   body: body,
    //   type:'recipes'
    // })

    // res.send(request.hits.hits)
  })

  // listen on the specified port
  app .listen( app.get( 'port' ), function(){
    console.log( 'Express server listening on port ' + app.get( 'port' ));
  } );

}

module.exports = {
  start
};