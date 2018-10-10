const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

//Arreglo con items Iniciales
const pokemon = [
    { id: 1, name: 'Torterra', number: '389', typing: 'Grass/Ground', baseStatTotal: '525', imageLink: 'https://www.serebii.net/sunmoon/pokemon/389.png'},
    { id: 2, name: 'Infernape', number: '392', typing: 'Fire/Fighting', baseStatTotal: '534', imageLink: 'https://www.serebii.net/sunmoon/pokemon/392.png'},
    { id: 3, name: 'Empoleon', number: '395', typing: 'Water/Steel', baseStatTotal: '530', imageLink: 'https://www.serebii.net/sunmoon/pokemon/395.png'}
];

//Test
app.get('/', (req,res) => {
    res.send('Hola Mundo')
});

//GET Listado
app.get('/api/pokemon', (req, res) => {
    res.send(pokemon);
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
        id: pokemon.length + 1,
        name: req.body.name,
        number: req.body.number,
        typing: req.body.typing,
        baseStatTotal: req.body.baseStatTotal,
        imageLink: req.body.imageLink
    }
    pokemon.push(poke);
    res.status(201).send('Pokemon added succesfully')
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
 
