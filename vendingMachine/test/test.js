const expect  = require('chai').expect;
const should = require('chai').should();
const functions = require('../functions');
const mockedVendingMachine = {
  products: [
    {
      id: 1,
      name: 'Snikers',
      quentity: 3,
      price: 1.05
    }
  ],
  availableCoins: {
    '5': 1,
    '10': 4,
    '20': 3,
    '50': 2,
    '100': 4,
    '200': 2
  }
}

let mockedNotAvalabileCoins = {
  '5': 0,
  '10': 0,
  '20': 0,
  '50': 0,
  '100': 0,
  '200': 0
};

let mockedCoins = [5, 10, 20, 50, 100, 200];

describe('Test index.js functionality', function() {
  describe('giveCoins()', function() {

    describe('called with available coins', function() {
        let coins = functions.giveCoins(mockedVendingMachine.availableCoins)
        
        it('should return array', function() {
          expect(coins).to.not.equal([])
        });

        it('should return array of coins', function() {
          expect(functions.giveCoins(mockedVendingMachine.availableCoins)).to.deep.equal(mockedCoins);
        })
    });

    describe('called without available coins', function() {
      it('should return empty array', function() {
        expect(functions.giveCoins(mockedNotAvalabileCoins)).to.deep.equal([])
      })
    });
  });

  describe('getProducts()', function() {
    it('should return vending products', function() {
      expect(functions.getProducts(mockedVendingMachine)).to.equal(mockedVendingMachine.products)
    })
  })

  describe('sellProduct()', function() {
    let product = mockedVendingMachine.products[0];
    let changeToReturn = { '5': 1, '10': 3, '20': 2, '50': 1 };
    let innerVendMachine = {
      products: [{
        id: 1,
        name: 'Snikers',
        quentity: 2,
        price: 1.05
      }]
    }

    describe('with change to return', function() {
      beforeEach(function() {
        functions.sellProduct(product, changeToReturn)
      })
      it('should remove 1 quentity from given product', function() {
        expect(mockedVendingMachine.products[0].quentity).to.deep.equal(innerVendMachine.products[0].quentity)
      })
  
      it('should display change', function() {
        expect(functions.sellProduct(product, changeToReturn)).to.equal('1 x 5c, 3 x 10c, 2 x 20c, 1 x 50c, ');
      });
    })
    
    describe('without change to return', function() {
      it('should return message No change', function() {
        expect(functions.sellProduct(product, {})).to.equal('');
      });
    });
  });

  describe('checkCoin()', function() {
    
    it('should return dolars if passed value have $ sign', function() {
      expect(functions.checkCoin('$2')).to.be.equal(2);
    });

    it('should return cents if passed value have c', function() {
      expect(functions.checkCoin('50c')).to.be.equal(0.5);
    });

    it('should retunr 0 if is not available coin', function() {
      expect(functions.checkCoin('30c')).to.be.equal(0);
    });
  });

  describe('returnChange()', function() {
    let amount = 125;

    describe('if there is coins to return change', function() {
      let coins = [];

      beforeEach(function() {
        coins = functions.giveCoins(mockedVendingMachine.availableCoins);
      });

      it('we should have coins', function() {
        expect(coins).to.deep.equal([5, 10, 20, 50, 100, 200])
      });

      it('should return change', function() {
          expect(functions.returnChange(amount, mockedVendingMachine.availableCoins, {})).to.deep.equal({ '5': 3, '10': 2, '20': 2, '50': 1 })
      });
    });

    describe('if there is no coins to return change', function() {
      let coins = [];

      beforeEach(function() {
        coins = functions.giveCoins(mockedNotAvalabileCoins);
      });

      it('there should be no coins, if they are not available', function() {
        expect(coins).to.deep.equal([])
      });
    });
  }); 
})
