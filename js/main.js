const data = [
    { title: 'Notebook', id: 1, price: 2000 },
    { title: 'Keyboard', id: 2, price: 200 },
    { title: 'Mouse', id: 3, price: 100 },
    { title: 'Gamepad', id: 4, price: 87 }
];

const renderProduct = (title, id, price) => {
    return ` 
        <div class="product-item">
            <h3>${title}</h3>
            <p>${price}</p>
        </div>
    `;
};

let def = [
    {title: "товаров сейчас нет", id: 0, price: ''}
];

const render = (products = def) => {
    const productsList = products.map(item => renderProduct(item.title, item.id, item.price));

    let len = products.length;
    //console.log(productsList);
    for (let i = 0; i < len; i++) {
        document.querySelector('.products').innerHTML += productsList[i];
    }
};

render(data);
//render();