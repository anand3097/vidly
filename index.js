const joi = require('joi')
const express = require('express');
const app = express();

app.use(express.json());

const movies=[
    {id:1, 
    name:'ABC',
    desc:'This is movie ABC',
    rating:'4 on 5'},
    {id:2, 
    name:'DEF',
    desc:'This is movie DEF',
    rating:'1 on 5'},
    {id:3, 
    name:'PQR',
    desc:'This is movie PQR',
    rating:'3 on 5'},
    {id:4, 
    name:'XYZ',
    desc:'This is movie XYZ',
    rating:'4 on 5'},
    {id:5, 
    name:'LMN',
    desc:'This is movie LMN',
    rating:'5 on 5'},
];

app.get('/api/movies',(req,res)=>{
    res.send(movies);
});

app.post('/api/movies',(req,res)=>{
    // Check Movie Valid
    console.log('Request')
    console.log(req.body)
    let { error } = validateMovie(req.body);
    if(error) return res.status(400).send(error.message);

    let movie = {
        id:movies.length+1,
        name:req.body.name,
        desc:req.body.desc,
        rating:req.body.rating
    }

    movies.push(movie);
    res.send(movies);
});

app.put('/api/movies/:id',(req,res)=>{
    // Check if id exist
    let movie = movies.find(e=> e.id === parseInt(req.params.id));
    console.log(movie)
    if(!movie) return res.status(404).send('Movie not found!');

    // Validate movie data
    let { error } = validateMovie(req.body);
    if(error) return res.status(400).send(error.message);

    // Update movie
    let index = movies.indexOf(movie);
    movies[index].name=req.body.name;
    movies[index].desc=req.body.desc;
    movies[index].rating=req.body.rating;

    res.send(movies);
});

app.delete('/api/movies/:id',(req,res)=>{
    let movie = movies.find(e=> e.id === parseInt(req.params.id));
    console.log(movie)
    if(!movie) return res.status(404).send('Movie not found!');

    let index = movies.indexOf(movie);
    movies.splice(index,1);

    res.send(movies);
});


function validateMovie(movie) {
    console.log('Validate');
    console.log(movie)
    const schema = joi.object({
        name: joi.string().required().min(1).max(5),
        desc:joi.string().required().min(1).max(20),
        rating:joi.string().required().length(6)
    });

    return schema.validate(movie);
}

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});


