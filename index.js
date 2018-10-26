const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const mongoose = require('mongoose');
let dev_db_url = 'mongodb://admin:9Bb6UUE8P8iEicz@ds127994.mlab.com:27994/pokemon';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Arreglo con items Iniciales
const pokemon = [
   
];

//Test
app.get('/', (req,res) => {
    res.send('Hola Mundo')
});

//GET Listado
app.get('/api/pokemon', (req, res) => {
    db.collection('pokemon').find().toArray(function(err, results) {
        res.send(results);
        // send HTML file populated with quotes here
      })

});

//GET Individual
app.get('/api/pokemon/:id',(req, res) => {
    const poke = pokemon.find(c => c.id === parseInt(req.params.id));
    if (!poke) return res.status(404).send('The Pokemon was not found');
    res.send(poke);
});

//POST (Create) 
app.post('/api/pokemon', (req, res) => {
    
    const { error } = validatePokemon(req.body);

    if (error) return res.status(400).send(error.details[0].message);
        
    const poke = {
        name: req.body.name,
        number: req.body.number,
        typing: req.body.typing,
        baseStatTotal: req.body.baseStatTotal,
        imageLink: req.body.imageLink
    }
    db.collection('pokemon').save(poke, (err, result) => {
        if (err) return console.log(err)
    
        console.log('saved to database')
        res.status(201).send('Pokemon added succesfully')
      })
    
});

//PUT (Update)
app.put('/api/pokemon/:id', (req,res) => {
    const poke = pokemon.find(c => c.id === parseInt(req.params.id));
    if (!poke) return res.status(404).send('The Pokemon was not found');


    const { error } = validatePokemon(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    poke.name = req.body.name;
    poke.number = req.body.number;
    poke.typing = req.body.typing;
    poke.baseStatTotal = req.body.baseStatTotal;
    poke.imageLink = req.body.imageLink;

    res.status(204).send('Pokemon updated succesfully');

});


//DELETE
app.delete('/api/pokemon/:id', (req,res) => {
    const poke = pokemon.find(c => c.id === parseInt(req.params.id));
    if (!poke) return res.status(404).send('The Pokemon was not found');

    const index = pokemon.indexOf(poke);
    pokemon.splice(index,1);
    res.status(204).send('Pokemon deleted succesfully');
})

//Funcion para validar que el request sea válido
function validatePokemon(poke) {
    const schema = {
        name: Joi.string().required(),
        number: Joi.number().required(),
        typing: Joi.string().required(),
        baseStatTotal: Joi.string().required(),
        imageLink: Joi.string().required()
    };

    return Joi.validate(poke,schema);
}




const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Escuchando en puerto ${port}...`));
 
