import express from 'express';

const app = express()

const port = 3000
app.use(express.json());

let teaData = [];
let nextId = 1;

app.post('/teas', (req, res)=> {
    const {name, price} = req.body;
    const newTea = {
        id: nextId++, name, price
    };
    teaData.push(newTea);
    res.status(201).send(newTea);
});

app.get('/teas', (req, res)=>{
    res.status(200).send(teaData);
});

app.get('/teas/:id', (req, res)=> {
    const tea = teaData.find(t => t.id === parseInt(req.params.id));
    if (!tea){
        return res.status(404).send('Invalid index');
    }
    res.status(200).send(tea);
})

//update tea
app.put('/teas/:id', (req, res)=>{
    const teaId = parseInt(req.params.id);
    const tea = teaData.find(t => t.id === teaId);

    if (!tea){
        return res.status(404).send('Tea not found');
    }

    const {name, price} = req.body;
    teaData[teaId-1] = {
        id: teaId,
        name, 
        price
    }
    res.status(201).send(teaData[teaId-1]);
});

// delete tea 

app.delete('teas/:id', (req, res)=>{
    const index = teaData.findIndex(t => t.id == parseInt(req.params.id));
    if (index === -1){
        return res.status(404).send("Tea Not Found");
    }
    teaData.splice(index, 1);
    return res.status(204).send("Deleted");
});

app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}...`);
});