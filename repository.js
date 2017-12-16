const config = require('./config');

const customers = [
    {
        id: 1,
        name: "Jan Kowalski",
        photoUrl: `http://localhost:${config.port}/images/jan_kowalski.jpeg`,
        age: 34,
        description: "Bardzo wazny klient",
        address: {
            street: "Zielona",
            houseNumber: 5,
            city: "Warszawa"
        },
        type: 1,
        categories: [
            "zagraniczny",
            "mikroprzedsiębiorstwo",
            "duzy obrót"
        ]
    },
    {
        id: 2,
        name: "Jan Nowak",
        photoUrl: `http://localhost:${config.port}/images/jan_nowak.jpeg`,
        age: 56,
        description: "Dzwonić co tydzień",
        address: {
            street: "Niebieska",
            houseNumber: 33,
            city: "Radom"
        },
        type: 0,
        categories: [
            "Polska",
            "duzy obrót"
        ]
    },
    {
        id: 3,
        name: "Agata Czarna",
        photoUrl: `http://localhost:${config.port}/images/agata_czarna.jpeg`,
        age: 26,
        description: "Kluczowy klient",
        address: {
            street: "Czerwona",
            houseNumber: 123,
            city: "Katowice"
        },
        type: 2,
        categories: [
            "osoba prywatna"
        ]
    }
];

function CustomerRepository() {
    this.customers = customers;
    this.nextId = customers.map(c => c.id).reduce((p, v) => p > v ? p : v) + 1;
}

CustomerRepository.prototype.find = function (id) {
    const customer = this.customers.filter(function (item) {
        return item.id == id;
    })[0];
    if (null == customer) {
        throw new Error('customer not found');
    }
    return customer;
}

CustomerRepository.prototype.findIndex = function (id) {
    let index = null;
    this.customers.forEach(function (item, key) {
        if (item.id == id) {
            index = key;
        }
    });
    if (null == index) {
        throw new Error('customer not found');
    }
    return index;
}

CustomerRepository.prototype.findAll = function () {
    return this.customers;
}

CustomerRepository.prototype.save = function (customer) {
    if (customer.id == null || customer.id == 0) {
        customer.id = this.nextId;
        this.customers.push(customer);
        this.nextId++;
    } else {
        const index = this.findIndex(customer.id);
        this.customers[index] = customer;
    }

}

CustomerRepository.prototype.remove = function (id) {
    const index = this.findIndex(id);
    this.customers.splice(index, 1);
}

module.exports = CustomerRepository;