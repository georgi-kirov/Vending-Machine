const vendingMachine = require('./classes');

const acceptedCoins = [200, 100, 50, 20, 10, 5];

function giveCoins(availableCoins) {
    let coins = [];
    // get available coins
    for (const key in availableCoins) {
        if (availableCoins.hasOwnProperty(key) && availableCoins[key] > 0) {
            coins.push(+key)
        }
    }

    return coins;
}

function returnChange(amount, availableCoins, change) {

    let coins = giveCoins(vendingMachine.availableCoins);
    // check if we can give back change
    let isThereChange = coins.some(coin => coin <= amount);

    if (amount == 0 ) {
        return change;
    }

    if (isThereChange) {
        coins.forEach(coin => {
            if( coin <= amount ) {
                change[coin] ? change[coin] += 1 : change[coin] = 1;   
                availableCoins[coin] -= 1;       
                amount -= coin;
            }
        })
    } else {
        for (const coin in change) {
            if (change.hasOwnProperty(coin)) {
                availableCoins[coin] += change[coin]
            }
        }
        return "Sorry, cant vent!\n";
    }
    
    return returnChange(amount, availableCoins, change);
}

function checkCoin(value) {
    let coin = 0,
        convertToNumber = 0;
    
    function isAvailable(coin) {
        return (acceptedCoins.indexOf(coin) > -1) ? true : false;
    }
    
    // get value from $ coins
    if (value.indexOf('$') > -1) {
        convertToNumber = +(value.substring(1));
        // add 1 coin to current one
        vendingMachine.availableCoins[convertToNumber*100] += 1;
        isAvailable(convertToNumber*100) ? coin = convertToNumber : coin;
    } 
    
    // get value from C coins
    if (value.indexOf('c') > -1) { 
        convertToNumber = +(value.slice(0, -1));
        // add 1 coin to current one
        vendingMachine.availableCoins[convertToNumber] += 1;
        isAvailable(convertToNumber) ? coin = (convertToNumber/100) : coin;
    }

    return coin;
}

function sellProduct(product, change) {
    let showChange = '';
    product.quentity -= 1;

    for (let [key, value] of Object.entries(change)) {
        key < 100 ? showChange += `${value} x ${key}c, ` : showChange += `${value} x $${key}, `;
    }

    return showChange;
}

function getProducts(vendMachine) {
    if (typeof vendMachine === 'object') {
        return vendMachine.products;
    }
} 

module.exports = {
    giveCoins: giveCoins,
    getProducts: getProducts,
    sellProduct: sellProduct,
    checkCoin: checkCoin,
    returnChange: returnChange
};