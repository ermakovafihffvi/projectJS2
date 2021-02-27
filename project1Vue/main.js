const App = {
    data() {
        return {
            API: `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`,
            catalogUrl: '/catalogData.json',
            products: [],
            imgCatalog: 'https://placehold.it/200x150',
            isVisibleCart: false,
            productsInCart: [],
            textInput: '',
            productsInSearch: [],
            notSearchAction: false,
        }
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(e => console.log(e));
        },
        addProduct(product) {
            console.log(product);
            console.log(product.id_product);
            let productToCart = {name: product.product_name, id: product.id_product, price: product.price, count: 1};
            if (this.productsInCart.some(el => el.id === productToCart.id)) {
                this.productsInCart.find(el => {
                    if (el.id === productToCart.id) return true
                }).count++;
            } else {
                this.productsInCart.push(productToCart);
            }
        },
        deleteOne(product) {
            if(product.count === 1) {
                product.count = product.count;
            } else {
                product.count--;
            }
        },
        addOne(product) {
            product.count++;
        },
        deleteItem(product) {
            let currentProduct = this.productsInCart.find(el => {
                if(el.id === product.id) return true
            });
            let index = this.productsInCart.indexOf(currentProduct);
            this.productsInCart.splice(index, 1);
        },
        clear() {
            this.productsInCart = [];
        },
        FilterGoods(text) {ы
            if (text !== '') {
                let regexp = new RegExp(text, "gi");
                for (let product of this.products) {
                    if (regexp.test(product.product_name)) {
                        this.productsInSearch.push(product);
                    } 
                }
            }
        },
    },
    computed: {
        displayValue() {
            if(!this.productsInCart.length) {
                return 'block';
            } else {
                return 'none';
            }
        },
        displayValueMirror() {
            if(this.productsInCart.length) {
                return 'block';
            } else {
                return 'none';
            }
        },
        sum() {
            let s = 0;
            for(el of this.productsInCart) {
                s = s + (el.count * el.price);
            }
            return s;
        }
    },
    mounted() {
        this.getJson(`${this.API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });
        /*this.getJson(`getProducts.json`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });*/
    }
};

Vue.createApp(App).mount('#app');