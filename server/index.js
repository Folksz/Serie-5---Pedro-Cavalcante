const express = require('express'),
    app = express(),
    port = process.env.PORT || 5000,
    fs = require('fs'),
    bodyParser = require('body-parser');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
      


app.post('/sendformulario', function(req, res) {

    var resposta = req.body;
	delete resposta['formErrors']
    fs.readFile(__dirname + "/formulario.json", function(err, formulario) {
        var objeto = JSON.parse(formulario);
        objeto.vetor.push(resposta);
        var json = JSON.stringify(objeto);
		fs.writeFile(__dirname + "/formulario.json", json, function(err) {});
    });
    res.status(200);
});

app.get('/pegarDados', function(req, res) {
    fs.readFile(__dirname + "/formulario.json", "utf8", function(err, formulario) {
        res.end(JSON.stringify(JSON.parse(formulario)));
    });
});



app.listen(port, () => console.log(`Listening on port ${port}`));