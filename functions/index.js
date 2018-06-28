'use strict';



process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').DialogflowApp;
const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const NAME_ACTION = 'getNews';
const TOPIC = 'topic' ;

exports.paperwala = functions.https.onRequest((request, response) => {
  const app = new App({request, response});
  
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));
   function callWeatherApi(app) {
  let topic = app.getArgument(TOPIC);
  return new Promise((resolve, reject) => {
    // Create the path for the HTTP request to get the weather
    
	let path = '/v2/everything?q='+topic+'&language=en&apiKey=8dbb480cec64459d8c609c263bbb2aad';
		if(topic.localeCompare('general') == 0){
				path = '/v2/top-headlines?sources=the-times-of-india,the-hindu&apiKey=8dbb480cec64459d8c609c263bbb2aad';}
	
	console.log('API Request: ' + host + path);
    // Make the HTTP request to get the weather
    http.get({host: host, path: path}, (res) => {
      let body = ''; // var to store the response chunks
      res.on('data', (d) => { body += d; }); // store each response chunk
      res.on('end', () => {
        // After all the data has been received parse the JSON for desired data
	let b= JSON.parse(body);
	console.log('print b::' + b);
	var url1=['a','b','c','d'];
	var output1=['a','b','c','d'];
	var response1=['a','b','c','d'];
	var output2=['a','b','c','d'];
	
	for(var i=0;i<=3;i++){
	 url1[i] = b.articles[i].url;
	 output2[i]=b.articles[i].description;

	let AYLIENTextAPI = require('aylien_textapi');
	let textapi = new AYLIENTextAPI({
	application_id: "7c2699e4",
	application_key: "30a8199f5ebc6086fa514ae5487fd404"
	});

	textapi.extract({
	url:url1[i]
	}, function(error, response) {
	if (error === null) {
		output1[i]=response.title;
		response1[i]=response.article;
		
	}	
	});
	}	
		let output='Here is the latest news. The Headlines are '+ output2[0] + '     ' +  output2[1] + '      ' + output2[2] + '     ' + output2[3] + '     ' + 'Please tell in which headline are you interested in ';	
        console.log(output);
        resolve(output);
  
	
		
	  
	  
	  
	  
	  
	  
      });
      res.on('error', (error) => {
        reject(error);
      });
    });
  });
}
  // d. build an action map, which maps intent names to functions
  let actionMap = new Map();
  actionMap.set(NAME_ACTION, callWeatherApi);


app.handleRequest(actionMap);
});	

