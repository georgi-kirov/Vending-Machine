class VendingMachine {
    products = [];
    availableCoins = {
        '5': 1,
        '10': 4,
        '20': 3,
        '50': 2,
        '100': 4,
        '200': 2
    };
    // availableCoins = {
    //     '5c': 1,
    //     '10c': 4,
    //     '20c': 3,
    //     '50c': 2,
    //     '$1.00': 4,
    //     '$2.00': 2
    // };

    constructor() {}
}

VendingMachine.prototype.addItem = function(id, name, quentity, price) {
    this.products.push(new Item(id, name, quentity, price))
} 


class Item {
    constructor(id, name, quentity, price) {
        this.id = id;
        this.name = name;
        this.quentity = quentity;
        this.price = price;
    }
}

let vendingMachine = new VendingMachine();
vendingMachine.addItem(1, 'Snikers', 3, 1.05);
vendingMachine.addItem(2, 'Bounty', 0, 1.00);
vendingMachine.addItem(3, 'Mars', 1, 1.25);
vendingMachine.addItem(4, 'Twix', 2, 2.00);
vendingMachine.addItem(5, 'Wispa', 2, 1.80);
vendingMachine.addItem(6, 'Twirk!', 2, 0.75);
vendingMachine.addItem(7, 'Yorkie', 3, 1.80);

module.exports = vendingMachine;