/*const data = [
    { title: 'Notebook', id: 1, price: 2000 },
    { title: 'Keyboard', id: 2, price: 200 },
    { title: 'Mouse', id: 3, price: 100 },
    { title: 'Gamepad', id: 4, price: 87 }
];

const renderProduct = ({title = 'undefined', price}, img = 'https://placehold.it/200x150') => {
    return ` 
        <div class="product-item">
            <img src="${img}" alt="${title}">
            <h3>${title}</h3>
            <p>${price}</p>
            <button class="buy-btn">Купить</button>
        </div>
    `;
};

const render = (products) => {
    const productsList = products.map(item => renderProduct(item));
    const prod = document.querySelector('.products');

    for (let item of productsList) {
        prod.insertAdjacentHTML('beforeend', item);
    }
};

render(data);*/

const API = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`;

class Products {
    products = []; 
    container = null;
    sum = 0;
    

    constructor(selector) {
        /*Получаем на вход селектор (например '.products') и записываем ссылку на объект html в container*/
        this.container = document.querySelector(selector);
        //вызываем внутренние функции
        this._fetchData()
            .then(() => {
                this._render();
            }).then(()=>{doCartThings();});
        //this._sumPrice();
    }

    /**
    *Функция получает массив данных о товарах products
    */
    _fetchData() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json()) //преобразование данных из json в js 
            .then(data => {
                for(let product of data) {
                    this.products.push(new ProductItem(product));
                }
            })
    }

    _render() {
        for (let product of this.products) {
            if(product.rendered) {
                continue;
            }
            this.container.insertAdjacentHTML('beforeend', product.render());
        }
    }

    /*метод определяющий суммарную стоимость всех товаров*/
    _sumPrice() {
        for (let data of this.products) {
            this.sum = this.sum + data.price;
        }
        return this.sum;
    }
}

class ProductItem {
    title = '';
    price = 0;
    id = 0;
    img = '';
    rendered = false;

    constructor(product, img = 'https://placehold.it/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }

    render() {
        this.rendered = true;
        return ` 
        <div class="product-item">
            <img class="product-item-img" src="${this.img}" alt="${this.title}">
            <h3>${this.title}</h3>
            <p>${this.price}</p>
            <div class="product-item-boxButton">
            <button class="buy-btn" id="${this.id}">Купить</button></div>
        </div>`;
    }
}

const list = new Products('.products');
//console.log(list.sum);

function doCartThings () {
    let buttons = document.querySelectorAll('.buy-btn');
    buttons.forEach(button => {
        button.addEventListener('click', event => {
            let currentId = Number(event.currentTarget.id);
            //console.log(list.products[0].id.toString());
            //ищем в массиве list.products элемент с таким же id который хотим добавить в cart
            let currentProduct = list.products.find(element => {
                if(element.id === currentId) 
                    return true
                });
            //console.log(currentProduct.id, currentProduct.price, currentProduct.title);
            let currentProductToCart = new CartItem(currentProduct);
            if (cart.productsToBuy.some(element => element.id === currentId)) { //проверяем есть ли такой id уже в корзине
                cart.productsToBuy.find(element => {
                    if(element.id === currentId) 
                        return true
                    }).count += 1; //если есть, то находим этот объект в корзине и прибавлем 1 к count
            } else {
                cart.productsToBuy.push(currentProductToCart); //если такого id в корзине ещё нет, то добавляем такой product в корзину
            };
            if(cart.rendered === true) {
                cart.cartWindow.innerHTML = '';
                cart.render();
            }
        });
    });
}













