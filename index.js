var http = require('http');
var url = require('url');

http.createServer(function (original_request, response) {
    var q = url.parse(original_request.url, true).query;
    console.log(`Just got a request at ${original_request.url}!`)
	
	var request = require('request');
	var options = {
	  'method': 'POST',
	  'url': 'https://api.infosimples.com/api/v2/consultas/receita-federal/simples-das',
	  'headers': {
	    'Content-Type': 'application/x-www-form-urlencoded'
	  },
	  form: {
	    'token': q.token,
	    'cnpj': q.cnpj,
	    'periodos': q.periodos
	  }
	};
	request(options, function (error, response) {
	  if (error) throw new Error(error);
		
	  console.log(response.body);
	  response.write(response.body);
	  response.end();
	});
	
    //response.write('Yo!');

    //response.end();
}).listen(process.env.PORT || 3000);
