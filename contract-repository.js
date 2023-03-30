const config = require('./config');

const contracts = [
    {
        id: 1,
        customerId: 1,
        customerName: "Jan Kowalski",
        value: 5000,
        date: Date.parse('Aug 9, 2017')
    },
    {
        id: 2,
        customerId: 2,
        customerName: "Jan Nowak",
        value: 2000,
        date: Date.parse('Sep 22, 2017')
    },
    {
        id: 3,
        customerId: 3,
        customerName: "Agata Czarna",
        value: 15000,
        date: Date.parse('Nov 11, 2017')
    },
    {
        id: 4,
        customerId: 3,
        customerName: "Agata Czarna",
        value: 20000,
        date: Date.parse('Mar 1, 2017')
    }
];

function ContractRepository() {
    this.contracts = contracts;
    this.nextId = contracts.map(c => c.id).reduce((p, v) => p > v ? p : v) + 1;
}

ContractRepository.prototype.find = function (id) {
    const contract = this.contracts.filter(function (item) {
        return item.id == id;
    })[0];
    if (null == contract) {
        throw new Error('contract not found');
    }
    return contract;
}

ContractRepository.prototype.findIndex = function (id) {
    let index = null;
    this.contracts.forEach(function (item, key) {
        if (item.id == id) {
            index = key;
        }
    });
    if (null == index) {
        throw new Error('contract not found');
    }
    return index;
}

ContractRepository.prototype.findAll = function () {
    return this.contracts;
}

module.exports = ContractRepository;