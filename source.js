
const AWS =  require("aws-sdk");
const elasticsearch = require("elasticsearch");
var express = require('express');
var app = express();
var bodyParser= require('body-parser');
const stringify = require('json-stringify');

app.use(bodyParser.json());

var esDomain = {
  endpoint: 'REPLACE',
  region: 'us-east-1',
  index: 'practice',
  doctype: 'practice'
};
const client = new elasticsearch.Client({
  hosts: [
    {
      host: "replace",
      auth: "replace"
    }
  ]
});
client.indices.create({
  index: 'practice'
}, function(err, resp, status) {
  if(err) {
    console.log('error creating practice index', err);
  } else {
    console.log('creating practice index!  woot!', resp);
  }
});


const myObject = {
  'name': 'Katie',
  'age': '37',
  'awesome': true,
  'loves_coffee': true,
  'fav_foods': ['soup', 'salad', 'chocolate'],
  'hates': 'breath -- all kinds'
}

  AWS.config.update({
    accessKeyId: "REPLACE",
    secretAccessKey: "REPLACE",
    region: "us-east-1"
  });

  const s3 = new AWS.S3({apiVersion: "2006-03-01"});
  const params = {
    Bucket: "bucket.evereve.com",
    Key: "products.json"
  };

params.Body = stringify(myObject);

// s3.upload(params, function (err, data) {
//   if (err) {
//     console.log("error with upload to s3 bucket", err);
//   } if (data) {
//     console.log("success uploading", data.Location);
//   }
// });

const getParams = {
  Bucket: "bucket.evereve.com",
  Key: "products.json"
};

s3.getObject(getParams, function(err, data){
  if (err) {
    console.log("error getting your object", err);
  } if (data) {
    console.log("success getting your object", data.Body.toString());
  }
  sendData = data.Body.toString();
  console.log("sendData: ", sendData);
  index_data(sendData);
});


 ///elastic search code will go here //

function index_data(sendData) {
  console.log("index_data function has been started");
  newData = {
        index: 'practice',
        type: 'practice_object',
        body: sendData
      }
    console.log("New Data", newData);
  client.index(newData, function(err, response){
    if (err) {
      console.log("failed to bulk index", err);
    } else {
      console.log("successful index to ES", response);
    }
  });
};

 /////



const server = app.listen(3002, function(){
  var port = server.address().port;
  console.log('Listening on port: ', port);
});
