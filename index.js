const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const pokemon = [
    { id: 1, name: 'Torterra', number: '389', typing: 'Grass/Ground', baseStatTotal: '525', imageLink: 'https://www.serebii.net/sunmoon/pokemon/389.png'},
    { id: 2, name: 'Infernape', number: '392', typing: 'Fire/Fighting', baseStatTotal: '534', imageLink: 'https://www.serebii.net/sunmoon/pokemon/392.png'},
    { id: 3, name: 'Empoleon', number: '395', typing: 'Water/Steel', baseStatTotal: '530', imageLink: 'https://www.serebii.net/sunmoon/pokemon/395.png'}
];

app.get('/', (req,res) => {
    res.send('Hola Muchachas')
});

app.get('/api/pokemon', (req, res) => {
    res.send(pokemon);
});


app.get('/api/pokemon/:id',(req, res) => {
    const poke = pokemon.find(c => c.id === parseInt(req.params.id));
    if (!poke) res.status(404).send('The Pokemon was not found');
    res.send(poke);
});

app.post('/api/pokemon', (req, res) => {
    
    const schema = {
        name: Joi.string().required(),
        number: Joi.number().required(),
        typing: Joi.string().required(),
        baseStatTotal: Joi.string().required(),
        imageLink: Joi.string().required()
    };

    const result = Joi.validate(req.body,schema);

    if(result.error){
        res.status(400).send(res.error.details[0].message);
        return;
    }
    
    const poke = {
        id: pokemon.length + 1,
        name: req.body.name,
        number: req.body.number,
        typing: req.body.typing,
        baseStatTotal: req.body.baseStatTotal,
        imageLink: req.body.imageLink
    }
    pokemon.push(poke);
    res.send(poke);
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Escuchanda en puerto ${port}...`));
 
