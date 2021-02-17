let data = [
    { name: 'small', callories: 20, price: 50 },
    { name: 'big', callories: 40, price: 100 },
    { name: 'cheese', callories: 20, price: 10 },
    { name: 'salat', callories: 5, price: 20 },
    { name: 'potato', callories: 10, price: 15 },
    { name: 'flavoring', callories: 0, price: 15 },
    { name: 'mazyk', callories: 5, price: 20 }
];

class Buter {
    calloriesSum = 0;
    priceSum = 0;
    parameters = {};

    container = document.querySelector('.container');

    constructor(event, dataObj) {
        this.parameters.size = event.currentTarget.parentNode.
                querySelector('[name="size"]').value;
        this.parameters.buterContent = event.currentTarget.parentNode.
                querySelector('[name="buter-content"]').value;
        this.parameters.buterFlavoring = event.currentTarget.parentNode.
                querySelector('[name="buter-flavoring"][value="y"]').checked;
        this.parameters.buterMazyk = event.currentTarget.parentNode.
                querySelector('[name="buter-mazyk"][value="y"]').checked;   
        this.priceSum = this._priceSumCounter(dataObj); 
        this.calloriesSum = this._calloriesSumCounter(dataObj);  
        //this._renderNewPage();    
    }

    /*_renderNewPage() {
        event.currentTarget.parentNode.innerHTML = 
            `<h2>Стоимость бутера: ${buter.priceSum}</h2><br>
            <h2>Каллорийность бутера: ${buter.calloriesSum}</h2>`;
    }*/

    _priceSumCounter(dataObj) {
        let s = 0;
        let i = 0;
        while (this.parameters.size != dataObj[i].name) {
            i++;
        }
        s = s + dataObj[i].price;
        i = 0;
        while (this.parameters.buterContent != dataObj[i].name) {
            i++;
        }
        s = s + dataObj[i].price;

        //нужно найти номер элемента массива где содержатся цены на flavoring И mazyk
        let j = 0;
        while (dataObj[j].name != 'flavoring') j++;
        let flavoringPrice = dataObj[j].price;
        j = 0;
        while (dataObj[j].name != 'mazyk') j++;
        let mazykPrice = dataObj[j].price;
        /////////////////////

        if (this.parameters.buterFlavoring === true) s = s + flavoringPrice;
        if (this.parameters.buterMazyk === true) s = s + mazykPrice;
        return s;
    }

    _calloriesSumCounter(dataObj) {
        let s = 0;
        let i = 0;
        while (this.parameters.size != dataObj[i].name) {
            i++;
        }
        s = s + dataObj[i].callories;
        i = 0;
        while (this.parameters.buterContent != dataObj[i].name) {
            i++;
        }
        s = s + dataObj[i].callories;

        //нужно найти номер элемента массива где содержатся каллории на flavoring И mazyk
        let j = 0;
        while (dataObj[j].name != 'flavoring') j++;
        let flavoringCallories = dataObj[j].callories;
        j = 0;
        while (dataObj[j].name != 'mazyk') j++;
        let mazykCallories = dataObj[j].callories;
        /////////////////////

        if (this.parameters.buterFlavoring === true) s = s + flavoringCallories;
        if (this.parameters.buterMazyk === true) s = s + mazykCallories;
        return s;
    }
}

let btn = document.querySelector('.btn-ready');
//let container = document.querySelector('.container');
//let form = document.querySelector('form');
btn.addEventListener('click', function(event) {
    const buter = new Buter(event, data);
    event.currentTarget.parentNode.innerHTML = `<h2>Стоимость бутера: ${buter.priceSum}</h2><br>
    <h2>Каллорийность бутера: ${buter.calloriesSum}</h2>`;
    /*form.style.display = 'none'; 
    container.insertAdjacentHTML('beforeend', 
                `<h2>Стоимость бутера: ${buter.priceSum}</h2><br>
                <h2>Каллорийность бутера: ${buter.calloriesSum}</h2>`);*/
    //ПОЧЕМУ ЗАКОММЕНТИРОВАННЫЙ ВАРИАНТ НЕ РАБОТАЕТ????            
});


/*let btn = document.querySelector('.btn-ready');
btn.addEventListener('click', function (event) {
    let size = event.currentTarget.parentNode.querySelector('[name="size"]').value;
    let buterContent = event.currentTarget.parentNode.
        querySelector('[name="buter-content"]').value;
    let buterFlavoring = event.currentTarget.parentNode.
        querySelector('[name="buter-flavoring"][value="y"]').checked;
    let buterMazyk = event.currentTarget.parentNode.
        querySelector('[name="buter-mazyk"][value="y"]').value;     
}); */


