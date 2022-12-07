var http = require('http');
http.createServer(function (original_request, response) {
    console.log(`Just got a request at ${original_request.url}!`)
	
	var https = require('follow-redirects').https;
	var fs = require('fs');

	var qs = require('querystring');

	var options = {
	  'method': 'POST',
	  'hostname': 'api.infosimples.com',
	  'path': '/api/v2/consultas/receita-federal/simples-das',
	  'headers': {
		'Content-Type': 'application/x-www-form-urlencoded'
	  },
	  'maxRedirects': 20
	};

	var req = https.request(options, function (res) {
	  var chunks = [];

	  res.on("data", function (chunk) {
		chunks.push(chunk);
	  });

	  res.on("end", function (chunk) {
		var body = Buffer.concat(chunks);
		console.log(body.toString());
		
		response.write(body.toString());
		
		response.end();
	  });

	  res.on("error", function (error) {
		console.error(error);
	  });
	});

	var postData = qs.stringify({
	  'token': 'v9E6v_ecpZQ4VAapkca4bLcHfg5aK1J-z_x6I4zQ',
	  'cnpj': '43039407000135',
	  'periodos': '202212'
	});

	req.write(postData);

	req.end();
	
    //response.write('Yo!');

    //response.end();
}).listen(process.env.PORT || 3000);