const express = require('express');
const app = express();

app.use(express.json());

const pokemon = [
    { id: 389, name: 'Torterra'},
    { id: 392, name: 'Infernape'},
    { id: 395, name: 'Empoleon'}
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
    const poke = {
        id: pokemon.length + 1,
        name: req.body.name
    }
    pokemon.push(poke);
    res.send(poke);
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Escuchanda en puerto ${port}...`));
 
