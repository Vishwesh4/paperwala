'use strict';
const http = require('http');
const host =  "newsapi.org";

exports.paperwala = (req, res) => {
  // Call the weather API
  callWeatherApi(req).then((output) => {
    // Return the results of the weather API to Dialogflow   
	res.setHeader('Content-Type', 'application/json');
	let num = req.body.result.parameters['ordinal']; 
	console.log('ordinal:'+num);   
	let output1=output[0];
	if(num!=null){
	output1 = 'Ok then , I got your covered '+output[1][1];}
	  
	 console.log('output final:'+output1);
	 res.send(JSON.stringify({ 'speech': output1, 'displayText': output1 }));

  }).catch((error) => {
    // If there is an error let the user know

  });
 };
function callWeatherApi(req) {
  return new Promise((resolve, reject) => {
    // Create the path for the HTTP request to get the weather
    let topic = req.body.result.parameters['topic'];
	console.log('topic:'+topic);
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
	var url1=['a','b','c','d'];
	var output1=['a','b','c','d'];
	var response1=['a','b','c','d'];
	var output2=['a','b','c','d'];
	
	for(var i=0;i<=3;i++){
	 url1[i] = b.articles[i].url;
	 output2[i]=b.articles[i].description;
	}
	let AYLIENTextAPI = require('aylien_textapi');
	let textapi = new AYLIENTextAPI({
	application_id: "7c2699e4",
	application_key: "30a8199f5ebc6086fa514ae5487fd404"
	});

	let url=url1[1];
	
	url = url1[0];
	textapi.extract({
	url:url
	}, function(error, response) {
	if (error === null) {
		output1[0]=response.title;
		response1[0]=response.article;
		}
	});	
	url = url1[1];
	textapi.extract({
	url:url
	}, function(error, response) {
	if (error === null) {
		output1[1]=response.title;
		response1[1]=response.article;
		}
	});
	
	url = url1[2];
	textapi.extract({
	url:url
	}, function(error, response) {
	if (error === null) {
		output1[2]=response.title;
		response1[2]=response.article;
		}
	});
	
	url = url1[3];
	textapi.extract({
	url:url
	}, function(error, response) {
	if (error === null) {
		output1[3]=response.title;
		response1[3]=response.article;
			let output=['Here is the latest news. The Headlines are , First headline,  '+ output2[0] + '  ,Second headline,  ' +  output2[1] + '  ,Third headline,  ' + output2[2] + '  ,Fourth headline,  ' + output2[3] + '     ,   '  + 'Please tell in which headline are you interested in',response1];	
			console.log('output'+output);
			resolve(output);
		}
	});
      });
      res.on('error', (error) => {
        reject(error);
      });
    });
  });
}
