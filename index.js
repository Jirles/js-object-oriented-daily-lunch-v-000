// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
// unique, incrementing ids
let deliveryId = 0;
let neighborhoodId = 0;
let mealId = 0;
let customerId =0;
// classes
class Delivery {
  constructor(mealId, neighborhoodId, customerId){
    this.id = ++deliveryId;
    this.mealId = mealId;
    this.customerId = customerId;
    this.neighborhoodId = neighborhoodId;

    store.deliveries.push(this);
  };
  meal(){
    return store.meals.find(meal => meal.id === this.mealId);
  };
  customer(){
    return store.customers.find(customer => customer.id === this.customerId);
  };
  neighborhood(){
    return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId);
  };
};

class Neighborhood {
  constructor(name){
    this.id = ++neighborhoodId;
    this.name = name;

    store.neighborhoods.push(this);
  };
  deliveries(){
    return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id);
  };
  customers(){
    return store.customers.filter(customer => customer.neighborhoodId === this.id);
  };
  meals(){
    const meals = [];
    for(const delivery of this.deliveries()){
      meals.push(delivery.meal());
    };
    return meals;
  };
};

class Meal {
  constructor(title, price){
    this.id = ++mealId;
    this.title = title;
    this.price = price;

    store.meals.push(this);
  };
  deliveries(){
    return store.deliveries.filter(delivery => delivery.mealId === this.id);
  };
  customers(){
    const customers = [];
    for(const delivery of this.deliveries()){
      customers.push(delivery.customer());
    };
    return customers;
  };
  byPrice(){
    return store.meals.sort(meal.price ,function(num1, num2){ return num1 - num2; });
  };
};

class Customer {
  constructor(name, neighborhoodId) {
    this.id = ++customerId;
    this.name = name;
    this.neighborhoodId = neighborhoodId;

    store.customers.push(this);
  };
  deliveries(){
    return store.deliveries.filter(delivery => delivery.customerId === this.id);
  };
  meals(){
    const meals = [];
    for(const delivery of this.deliveries()){
      meals.push(delivery.meal());
    };
    return meals;
  };
  totalSpent(){
    const reduceMealPrice = function(agg, el, i, arr){
      return agg += el.price;
    };
    return this.meals().reduce(reduceMealPrice, 0);
  };
};
