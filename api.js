const CustomerRepository = require('./repository');
const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const repository = new CustomerRepository();

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/customers', function (request, response) {
    response.json(repository.findAll());
});

app.get('/customers/:id', function (request, response) {
    const customerId = request.params.id;
    try {
        response.json(repository.find(customerId));
    } catch (exeception) {
        response.sendStatus(404);
    }
});

app.post('/customers', function (request, response) {
    const customer = request.body;
    if (!customer.name || !customer.age || !customer.type) { 
        response.status(400).end();
        return; 
    }
    repository.save({
        name: customer.name,
        age: customer.age,
        type: customer.type,
        photoUrl: customer.photoUrl || `http://localhost:${config.port}/images/customer.png`,
        description: customer.description || '',
        address: {
            street: (customer.address || {}).street || '',
            houseNumber: (customer.address || {}).houseNumber || 0,
            city: (customer.address || {}).city || ''
        },
        categories: customer.categories || []
    });
    response.sendStatus(200);
});

app.delete('/customers/:id', function (request, response) {
    try {
        repository.remove(request.params.id);
        response.sendStatus(200);
    } catch (exeception) {
        response.sendStatus(404);
    }
});

app.listen(config.port);