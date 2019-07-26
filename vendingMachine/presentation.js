const functions = require('./functions');
const vendingMachine = require('./classes');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// display from here
    let products = functions.getProducts(vendingMachine);
    const intro = `

    Welcome to the Vending Machine simulator!

    The vending machine contains the following products
    `;

    console.log(intro)

    // display all products
    products.forEach(element => {
        console.log(`   Slot ${element.id} - ${element.quentity} x ${element.name} = ${element.price}`)
    });

    console.log(); // empty row
    // display rest instructions for use
    const info = `
        The vending machine accepts the following coins: 5c 10c 20c 50c $1 $2\n
        Please insert coins one at a time and pressing enter after each, e.g. $2 or 5c\n
        To vend from a slot type slot command, e.g. Slot 1\n
        if you want to stop, type 'exit'
    `;
    console.log(info);

    let tendered = 0;
    rl.setPrompt('Enter = ');
    rl.prompt();
    rl.on('line', function(input) {

        if (input.toLowerCase().trim() === 'exit') {

            rl.close();

        } else {
            if (input.indexOf('$') > -1 || input.indexOf('c') > -1) {
                tendered += functions.checkCoin(input);

                console.log('\nTendered $', tendered.toFixed(2));
                rl.setPrompt('\nEnter = ');
                rl.prompt();

            } else if((input.toLowerCase()).indexOf('slot') > - 1) {

                let productId = +input.substring(5);

                if (productId > vendingMachine.products.length || productId < 1 ) {
                    rl.setPrompt('Invalid product! Choose from the list above\nEnter = ');
                    rl.prompt();
                } else {
                    let product = vendingMachine.products[productId-1];
                    // if Money is enought and machine have this product and can give back change...
                    if ( tendered >= product.price && product.quentity > 0 ) {
                        let change = tendered - product.price;
                        let canWeGiveChange = functions.returnChange(Math.round(change*100), vendingMachine.availableCoins, {});

                        // canWeGiveChange return object with change or a string if we cant give back change
                        if (typeof canWeGiveChange === 'object') {
                            let isThereAChange = functions.sellProduct(product, canWeGiveChange);
                            tendered = 0;
                            console.log('\nEnjoy!\nItem = %s\nChange = %s', product.name, isThereAChange ? isThereAChange : 'No change');
                            rl.setPrompt('\nEnter = ');
                            rl.prompt();

                        } else if (typeof canWeGiveChange === 'string') {

                            rl.setPrompt(`${canWeGiveChange}`);
                            rl.prompt();
                            rl.close();
                        }
                    } else {
                        rl.setPrompt('Not enought money or this product is out of service!\nEnter = ');
                        rl.prompt();
                    }
                }

            } else {

                rl.setPrompt('Invalid value!\nEnter = ');
                rl.prompt();
            }
        }
    });

    rl.on('close', function() {
        console.log('\nCome back soon!\n')
    })
