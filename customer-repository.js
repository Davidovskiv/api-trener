const config = require('./config');

const customers = [
  {
    id: 1,
    name: 'Jan kowalski',
    quantity: 5,
    type: 'personal',
    options: 'dieta , plan treningowy',
    weight: {
      initial: 88,
      current: 80,
      target: 75,
    },
    trainingList: [
      {
        type: 'grupowy',
        date: '22-03-2023',
        time: '19:00'
      },
      {
        type: 'personalny',
        date: '24-03-2023',
        time: '12:00'
      },
    ]
  },
  {
    id: 2,
    name: 'Damian Kruk',
    quantity: 13,
    type: 'personal',
    options: 'dieta',
    weight: {
      initial: 95,
      current: 90,
      target: 85,
    },
    trainingList: [
      {
        type: 'personalny',
        date: '01-04-2023',
        time: '19:00'
      },
      {
        type: 'grupowy',
        date: '04-04-2023',
        time: '12:00'
      },
    ]
  },
  {
    id: 3,
    name: 'Wiktor Silny',
    quantity: 7,
    type: 'personal',
    options: 'plan treningowy',
    weight: {
      initial: 113,
      current: 104,
      target: 98,
    },
    trainingList: [
      {
        type: 'personalny',
        date: '11-05-2023',
        time: '19:00'
      },
      {
        type: 'personalny',
        date: '13-05-2023',
        time: '12:00'
      },
    ]
  },
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

CustomerRepository.prototype.addTrening = function (id,newTrening) {
  const index = this.findIndex(id);
  const customer = this.customers.find(index)
  customer.trainingList.push(newTrening)

}

module.exports = CustomerRepository;