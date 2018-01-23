(function(window){

    function myLibrary(){

        //execute code here
        const catalog = createRandomCatalog(100);

        return {
            searchProductById: searchProductById,
            searchProductsByPrice: searchProductsByPrice,
            searchProductsByType: searchProductsByType,
            searchAllProducts: searchAllProducts
        }

        //function definitions go here
        function createRandomProduct() {
          const typeArray = ['Electronics', 'Book', 'Clothing', 'Food'];
          const price = (Math.random()*500).toFixed(2);
          const type = typeArray[Math.floor(Math.random() * 4)];
          
          return {
            price,
            type,
          };
        }
        
        function createRandomCatalog(num) {
          const catalog = [];
          for (let i = 0; i < num; i++) {
            const obj = createRandomProduct();
            catalog.push({
              id: i,
              price: obj.price,
              type: obj.type,
            });
          }
          return catalog;
        }

        function searchAllProducts() {
          const promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve(catalog), 1000);
          });
          return promise;
        }
        
        function searchProductById(id) {
          const promise = new Promise((resolve, reject) => {
            let i = 0;
            setTimeout(() => {
              while (i < catalog.length) {
                const obj = catalog[i];
                if (obj.id == id) {
                  resolve({
                    id,
                    price: obj.price,
                    type: obj.type,
                  });
                }
                i++;
              }
              reject(`Invalid ID: ${id}`);
            }, 1000);
          });
          return promise;
        }
        
        function searchProductsByType(type) {
          const promise = new Promise((resolve, reject) => {
            let i = 0;
            const typeArray = [];
            const possibleTypes = ['Electronics', 'Book', 'Clothing', 'Food'];
            if (!possibleTypes.includes(type)) {
              reject(`Invalid Type: ${type}`);
            } else {
              setTimeout(() => {
                while(i < catalog.length) {
                  const obj = catalog[i];
                  if (obj.type === type) {
                    typeArray.push({
                      id: obj.id,
                      price: obj.price,
                      type: obj.type,
                    });
                  }
                  i++;
                }
                resolve(typeArray);
              }, 1000);
            }
          });
          return promise;
        }
        
        function searchProductsByPrice(price, difference) {
          const promise = new Promise((resolve, reject) => {
            let i = 0;
            const priceArray = [];
            if (!isFinite(price)) {
              reject(`Invalid Price: ${price}`);
            } else {
              setTimeout(() => {
                while (i < catalog.length) {
                  const obj = catalog[i];
                  if (Math.abs(obj.price - price) < difference) {
                    priceArray.push({
                      id: obj.id,
                      price: obj.price,
                      type: obj.type,
                    });
                  }
                  i++;
                }
                resolve(priceArray);
              }, 1000);
            }
          });
          return promise;
        }
    }


    if(typeof(window.api) === 'undefined'){
        window.api = myLibrary();
    }

})(window); 