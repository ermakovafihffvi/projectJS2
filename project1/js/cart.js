class Cart {
    //СВОЙСТВА:
    productsToBuy = [];
    sumPriceCart = 0;
    promokod = 0; //??
    rendered = false;

    cartWindow = document.querySelector('.cart-window');
    buttonClearCart = '';
    checkoutBtn = '';
    countPlus = '';
    countMinus = '';

    /**
    *Очищает корзину при нажатии кнопки "очистить корзину"
    */
    clearCart() {
        this.productsToBuy = [];
        this.cartWindow.innerHTML = 'В корзине нет товаров';
    }

    /**
    *При нажатии на кнопку "оформить заказ" нужно из корзины переходить к оормлению заказа
    */
    //checkout() {}

    /**
    *Считаем итоговую стоимости товаров в корзине
    */
    _sumPriceCart() {
        let sum = 0;
        for(let product of this.productsToBuy) {
            sum = sum + Number(product.price) * Number(product.count);
        }
        return sum;
    }

    /**
     * Удалить один элемент из корзины
     */
    _deletItem(Event) {
        let currentId = Number(Event.currentTarget.id);
        let currentProduct = cart.productsToBuy.find(element => {
            if(element.id === currentId) 
                 return true
        });
        let index = cart.productsToBuy.indexOf(currentProduct);
        cart.productsToBuy = cart.productsToBuy.slice(0, index)
                    .concat(cart.productsToBuy.slice(index + 1, cart.productsToBuy.length));
        cart.cartWindow.innerHTML = '';            
        this.render();
    }

    /**
     * Уменьшает количество данного товара в корзине на один
     */
    _deleteOne(Event) {
        let currentId = Number(Event.currentTarget.name);
        let currentProduct = cart.productsToBuy.find(element => {
            if(element.id === currentId) 
                 return true
        });
        if(currentProduct.count === 1) {
            this.cartWindow.querySelector(`div[name="${currentId}"] div.count p`).innerHTML = `${currentProduct.count}`;
        } else {
            currentProduct.count = currentProduct.count - 1;
            //console.log(this.cartWindow.querySelector(`div[name="${currentId}"] div.count p`).innerHTML);
            this.cartWindow.querySelector(`div[name="${currentId}"] div.count p`).innerHTML = `${currentProduct.count}`;
            this._sumPriceCart();
            this.cartWindow.querySelector('p[name="sumPrice"]').innerHTML = `Итоговая стоимость:  ${this._sumPriceCart()}`;
        } 
    }

    /**
     * Увеличивает количество данного товара в корзине на один
     */
    _addOne(Event) {
        let currentId = Number(Event.currentTarget.name);
        let currentProduct = cart.productsToBuy.find(element => {
            if(element.id === currentId) 
                 return true
        });
        currentProduct.count = currentProduct.count + 1;
        //console.log(this.cartWindow.querySelector(`div[name="${currentId}"] div.count p`).innerHTML);
        this.cartWindow.querySelector(`div[name="${currentId}"] div.count p`).innerHTML = `${currentProduct.count}`;
        this._sumPriceCart();
        this.cartWindow.querySelector('p[name="sumPrice"]').innerHTML = `Итоговая стоимость:  ${this._sumPriceCart()}`;
    }

    /**
    *Отрисовать саму корзину на сайте
    */
    render() {
        if (this.cartWindow.classList.contains('hide-cart')) {
            this.cartWindow.classList.remove('hide-cart');
        }
        this.cartWindow.classList.add('show-cart');
        if (this.productsToBuy.length === 0) {
            this.cartWindow.insertAdjacentHTML('afterbegin', `В корзине нет товаров`)
        } else {
            for(let product of this.productsToBuy){
                this.cartWindow.insertAdjacentHTML('afterbegin', product.render());
             }
             this.cartWindow.insertAdjacentHTML('beforeend', `<p name="sumPrice">Итоговая стоимость:  ${this._sumPriceCart()}</p>`);
             this.cartWindow.insertAdjacentHTML('beforeend', `<button class="btn-clearCart">очистить корзину</button>`);
             this.cartWindow.insertAdjacentHTML('beforeend', `<button class="btn-checkout">перейти к оформлению</button>`);
             this.buttonClearCart = this.cartWindow.querySelector('.btn-clearCart');
             this.checkoutBtn = this.cartWindow.querySelector('.btn-checkout');
             this.buttonClearCart.addEventListener('click', () => cart.clearCart());
             this.deleteButtons = this.cartWindow.querySelectorAll('.delete-btn');
             this.deleteButtons.forEach(deleteButton => deleteButton.addEventListener('click', event => this._deletItem(event)));
             this.countPlus = this.cartWindow.querySelectorAll('.countPlus');
             this.countMinus = this.cartWindow.querySelectorAll('.countMinus');
             this.countMinus.forEach(countM => countM.addEventListener('click', event => this._deleteOne(event)));
             this.countPlus.forEach(countP => countP.addEventListener('click', event => this._addOne(event)));
        }
    }

    /**
     * Спарятать вкладку корзины
     */
    hide() {
        this.cartWindow.classList.remove('show-cart');
        this.cartWindow.classList.add('hide-cart');
        this.cartWindow.innerHTML = '';
    }

}

class CartItem {
//СВОЙСТВА:
title = '';
id = 0;
img = '';
count = 1;
price = 0;

//МЕТОДЫ:
constructor(product) {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = product.img;
    }

/**
*Получить разметку для одного элемента корзины
*/
render() {
    return ` 
        <div class="product-item-cart" name="${this.id}">
            <img class="product-item-img" src="${this.img}" alt="${this.title}">
            <h3>${this.title}</h3>
            <p>${this.price}</p>
            <div class="count">
                <button class="countMinus" name="${this.id}"> Убрать один</button>
                <p>${this.count}</p>
                <button class="countPlus" name="${this.id}">Прибавить один</button>
            </div>    
            <button id ="${this.id}" class="delete-btn">Убрать из корзины</button>
        </div>`;
    }
}


cartBtn = document.querySelector('.btn-cart');
const cart = new Cart();

cartBtn.addEventListener('click', () => {
    if(cart.rendered) {
        cart.hide();
        cart.rendered = false;
    } else {
        cart.render();
        cart.rendered = true;
    }
});




