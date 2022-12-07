var http = require('http');
http.createServer(function (original_request, response) {
    console.log(`Just got a request at ${original_request.url}!`)
	
	var request = require('request');
	var options = {
	  'method': 'POST',
	  'url': 'https://api.infosimples.com/api/v2/consultas/receita-federal/simples-das',
	  'headers': {
	    'Content-Type': 'application/x-www-form-urlencoded'
	  },
	  form: {
	    'token': 'v9E6v_ecpZQ4VAapkca4bLcHfg5aK1J-z_x6I4zQ',
	    'cnpj': '43039407000135',
	    'periodos': '202212'
	  }
	};
	request(options, function (error, response) {
	  if (error) throw new Error(error);
	  console.log(response.body);
	});
	
    //response.write('Yo!');

    //response.end();
}).listen(process.env.PORT || 3000);
