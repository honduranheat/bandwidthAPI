var Bandwidth = require("node-bandwidth");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var http = require("http").Server(app);

var client = new Bandwidth({
    userId : 'u-ljsog7op2xkonfhl2shcrgq',
    apiToken : 't-vjzu7f7u7hhbk7oy2ztffmy',
    apiSecret : 'pmpjth3u62kjclvbdukhacohfnrxwfdylrt6i4i' 
});



var sendMessage = function(params){
    client.Message.send({
      //returns a promise
      from : params.from, //your bandwidth number
      to   : params.to, //number to send to
      text : "Hey Gay!!! How are you doing!!! It's me!!!! John Cumberbatch III from pasta class!!!",
     // media: "https://s3.amazonaws.com/bwdemos/logo.png"
    })
    //calls back the message id number and catches any errors
    .then(function(message){
      console.log(message);
      return client.Message.get(message.id)
      //access ID from json can also get to and from
    })
    // catches any errors
    .catch(function(err){
      console.log(err)
    });
  }

  var createCall = function(params) {
      console.log('to: ' + params.to);
      console.log('from: ' + params.from);
      return client.Call.create({
          from: params.from,
          to : params.to,
          callbackHttpMethod: 'GET',
          callbackUrl: "https://s3.amazonaws.com/bwdemos/helloFromBandwidth.xml"
      })
  };

var numbers = {
    to:'+19197471817',
    from: '+19192137606'
};

app.use(bodyParser.json());
app.set('port', (process.env.PORT || 3000));

sendMessage(numbers);
createCall(numbers);
