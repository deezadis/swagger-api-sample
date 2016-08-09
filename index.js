var app = require('express')();
var bodyParser = require('body-parser')
var _ = require('lodash');


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use(bodyParser.json());

var pokemons = [
	{
	    name: "Pikachu",
	    hp: 23,
	    atk: 38
	},
	{
	    name: "Bulbasaur",
	    hp: 34,
	    atk: 28
	},
	{
	    name: "Parasect",
	    hp: 33,
	    atk: 28
	},
	{
	    name: "Meowth",
	    hp: 28,
	    atk: 32
	},
	{
	    name: "Cloyster",
	    hp: 42,
	    atk: 40
	}
];

var port = process.env.PORT || 8888;  //User setting or 8888 as default

app.get('/',function(req,res) {
    res.send('OK');
});

app.get('/echo',function(req,res){
	// The response text is param['message'] in query
	console.log(req.param('message'));
	res.send(req.param('message'));
});

app.get('/echo/:message',function(req,res){
	// The response text is param['message'] in path
	res.send(req.params['message']);
});

app.get('/pokemon/list',function(req,res) {
    res.send(pokemons);
});


app.get('/pokemon/info/:name',function(req,res) {
   	var monster =_.filter(pokemons,function(monster){
   		return monster.name === req.params['name'];
	});
    if(monster[0]){
        res.send(monster[0]);
    }
    else{
        res.send({error:true , errorMessage:'No pokemon name'+req.params['name'] })
    }
});


app.post('/pokemon/add', function(req,res){
    console.log("name " + req.body['name'] + " hp " + req.body['hp'] + " atk : " + req.body['atk']);
    var newItem = {
        name: req.body['name'],
        hp:  req.body['hp'] ,
        atk: req.body['atk']
    };
    pokemons.push(newItem);

    console.log("put item  : " + newItem + "to pokemon list");
    res.send(newItem);
});

app.listen(port, function() {
    console.log('Starting node.js on port ' + port);
});