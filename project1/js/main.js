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

class Products {
    data = [];
    //ЗАЧЕМ ЭТО НАДО????? products = []; 
    container = null;
    sum = 0;

    constructor(selector) {
        /*Получаем на вход селектор (например '.products') и записываем ссылку на объект html в container*/
        this.container = document.querySelector(selector);
        //вызываем внутренние функции
        this._fetchData();
        this._render();
        this._sumPrice();
    }

    /**
    *Функция получает массив данных о товарах, пока что записали в явном виде в качестве заглушки
    *возвращает data
    */
    _fetchData() {
        this.data = [
            {title: 'Notebook', id: 1, price: 2000},
            {title: 'Keyboard', id: 2, price: 200},
            {title: 'Mouse', id: 3, price: 100},
            {title: 'Gamepad', id: 4, price: 88}
        ]
    }

    _render() {
        for (let dataItem of this.data) {
            const product = new ProductItem(dataItem); //создаём объект на базе ProductItem из елемента массива data
            //ЗАЧЕМ ЭТО НАДО????? this.products.push(product); //присоединяем к массиву products полученный объект
            this.container.insertAdjacentHTML('beforeend', product.render());
        }
    }

    /*метод определяющий суммарную стоимость всех товаров*/
    _sumPrice() {
        for (let data of this.data) {
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

    constructor(product, img = 'https://placehold.it/200x150') {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }

    render() {
        return ` 
        <div class="product-item">
            <img class="product-item-img" src="${this.img}" alt="${this.title}">
            <h3>${this.title}</h3>
            <p>${this.price}</p>
            <div class="product-item-boxButton">
            <button class="buy-btn">Купить</button></div>
        </div>`;
    }
}

class Cart {
//СВОЙСТВА:
data = [];
sumPriceCart = 0;
promokod = 0; //??

//ВНЕШНИЕ МЕТОДЫ:
/**
*Очищает корзину при нажатии кнопки "очистить корзину"
*/
//clearCart() {}

/**
*При нажатии на кнопку "оформить заказ" нужно из корзины переходить к оормлению заказа
*/
//checkout() {}

//ВНУТРЕННИЕ МЕТОДЫ:
/**
*Считаем итоговую стоимости товаров в корзине
*/
//_sumPriceCart() {}

/**
*Получить массив товаров, которые хотят поместить в корзину (не представляю как) 
*/
//_fetchDataCart() {}

/**
*Отрисовать саму корзину на сайте
*/
//_renderCart() {}

}

class CartItem {
//СВОЙСТВА:
title = '';
id = 0;
number = 0;
price = 0;
//МЕТОДЫ:
/**
*Получить разметку для одного элемента корзины
*/
//render() {}
}

const list = new Products('.products');
console.log(list.sum);