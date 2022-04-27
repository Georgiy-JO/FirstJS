//const jQuery = require('jquery');
const puppeteer = require('puppeteer');

let Bookbuy = async () => {
    const browser = await puppeteer.launch({headless: false});   //for us to see how everything is going on it actually visually opens the browser
    const page = await browser.newPage();
    await page.goto('https://www.labirint.ru');                   
    await page.setViewport({width: 1400, height: 800});
    await page.click('#searchform > div.b-search-e-input-wrapper > span.b-header-b-search-outer-e-input');
    //let b = "тестирование";
    await page.goto('https://www.labirint.ru/search/тестирование/?stype=0');                  //haven't found a good enough way to use the search method included in the web-site
    await page.click('#rubric-tab > div.b-search-page-content > div:nth-child(1) > div.products-row-outer.responsive-cards > div > div:nth-child(5) > div > div.product-buy-area > div > div.product-buy.buy-avaliable.fleft');
    
    //choosing book#1, book#2, book#3
    const book1 = await page.evaluate(() => {
        let title = document.querySelector('#rubric-tab > div.b-search-page-content > div:nth-child(1) > div.products-row-outer.responsive-cards > div > div:nth-child(5) > div > div.product-cover > a').innerText;
        let pricetemp = document.querySelector('#rubric-tab > div.b-search-page-content > div:nth-child(1) > div.products-row-outer.responsive-cards > div > div:nth-child(5) > div > div.product-cover > div > div.price-label > div > div > span.price-val > span').innerText;
        let price =Number (pricetemp.replace(/[^\d]/g, ''));                                   //is needed for example for  1 300 (NaN) => 1300 (Number)
        return {
            title,
            price
        }
    });
    
    await page.click('#rubric-tab > div.b-search-page-content > div:nth-child(1) > div.products-row-outer.responsive-cards > div > div:nth-child(4) > div > div.product-buy-area > div > div.product-buy.buy-avaliable.fleft');
    const book2 = await page.evaluate(() => {
        let title = document.querySelector('#rubric-tab > div.b-search-page-content > div:nth-child(1) > div.products-row-outer.responsive-cards > div > div:nth-child(4) > div > div.product-cover > a').innerText;
        let pricetemp = document.querySelector('#rubric-tab > div.b-search-page-content > div:nth-child(1) > div.products-row-outer.responsive-cards > div > div:nth-child(4) > div > div.product-cover > div > div.price-label > div > div > span.price-val > span').innerText;
        let price =Number (pricetemp.replace(/[^\d]/g, ''));
        return {
            title,
            price
        }
    });
    
    await page.click('#rubric-tab > div.b-search-page-content > div:nth-child(1) > div.products-row-outer.responsive-cards > div > div:nth-child(3) > div > div.product-buy-area > div > div.product-buy.buy-avaliable.fleft');
    const book3 = await page.evaluate(() => {
        let title = document.querySelector('#rubric-tab > div.b-search-page-content > div:nth-child(1) > div.products-row-outer.responsive-cards > div > div:nth-child(3) > div > div.product-cover > a').innerText;
        let pricetemp = document.querySelector('#rubric-tab > div.b-search-page-content > div:nth-child(1) > div.products-row-outer.responsive-cards > div > div:nth-child(3) > div > div.product-cover > div > div.price-label > div > div > span.price-val > span').innerText;
        let price =Number (pricetemp.replace(/[^\d]/g, ''));
        return {
            title,
            price
        }
    });
    await page.click('#minwidth > div.top-header > div.cookie-policy > button');                 //cookie button
    
    let sum = book2.price +  book3.price + book1.price;                    //total price
    await page.click('#minwidth > div.header-fixed.min-width > div > div > div.bl-fixed-items-cont > div.bl-fixed-item.bl-basket-fixed.have-dropdown > div.header-fixed-padding > a');
    await page.waitForTimeout(5000);                                       //time to load the page, just in case
    //result numbers from the bascet
    const bsc = await page.evaluate(() =>{
        const tottaltemp = document.querySelector('#basket-step1-default > div.b-carttotal > div.js-order-summary-block.order-summary-default > div.b-dotted-im.js-summary-pay-result.b-dotted-im-m-2rows > span.b-dotted-im-e-val').innerText;
        let tottal = Number (tottaltemp.replace(/[^\d]/g, ''));
        const nummbertemp = document.querySelector('#ui-id-4').innerText;
        let nummber = Number (nummbertemp.replace(/[^\d]/g, ''));

        const title1 = document.querySelector('#basket-step1-default > div.b-bask-panel.b-bask-panel-order > div.js-main_order-container > div > div > div:nth-child(3) > div > div.product-cover > a.cover').innerText;
        const title2 = document.querySelector('#basket-step1-default > div.b-bask-panel.b-bask-panel-order > div.js-main_order-container > div > div > div:nth-child(2) > div > div.product-cover > a.cover').innerText;
        const title3 = document.querySelector('#basket-step1-default > div.b-bask-panel.b-bask-panel-order > div.js-main_order-container > div > div > div:nth-child(1) > div > div.product-cover > a.cover').innerText;
        
        const price1temp = document.querySelector('#basket-step1-default > div.b-bask-panel.b-bask-panel-order > div.js-main_order-container > div > div > div:nth-child(3) > div > div.product-pricing > div > span.price-val > span').innerText;
        let price1 =Number (price1temp.replace(/[^\d]/g, ''));
        const price2temp = document.querySelector('#basket-step1-default > div.b-bask-panel.b-bask-panel-order > div.js-main_order-container > div > div > div:nth-child(2) > div > div.product-pricing > div > span.price-val > span').innerText;
        let price2 =Number (price2temp.replace(/[^\d]/g, ''));
        const price3temp = document.querySelector('#basket-step1-default > div.b-bask-panel.b-bask-panel-order > div.js-main_order-container > div > div > div:nth-child(1) > div > div.product-pricing > div > span.price-val > span').innerText;
        let price3 =Number (price3temp.replace(/[^\d]/g, ''));

        const amount1temp = document.querySelector('#basket-step1-default > div.b-bask-panel.b-bask-panel-order > div.js-main_order-container > div > div > div:nth-child(3) > div > div.product-operations > div.product-quantity.product-quantity-cart.fleft.mr10 > input').value;
        let amount1 =Number (amount1temp.replace(/[^\d]/g, ''));
        const amount2temp = document.querySelector('#basket-step1-default > div.b-bask-panel.b-bask-panel-order > div.js-main_order-container > div > div > div:nth-child(2) > div > div.product-operations > div.product-quantity.product-quantity-cart.fleft.mr10 > input').value;
        let amount2 =Number (amount2temp.replace(/[^\d]/g, ''));
        const amount3temp = document.querySelector('#basket-step1-default > div.b-bask-panel.b-bask-panel-order > div.js-main_order-container > div > div > div:nth-child(1) > div > div.product-operations > div.product-quantity.product-quantity-cart.fleft.mr10 > input').value;
        let amount3 =Number (amount3temp.replace(/[^\d]/g, ''));

        return{
            tottal,
            nummber,
            title1,
            price1,
            amount1,
            title2,
            price2,
            amount2,
            title3,
            price3,
            amount3
        }
    });
    //main task - checking errors
    if(bsc.nummber!=3){ return "Error: total amount!";}                       // not 3 different books
    if(bsc.tottal!=sum){return "Error: total price!"; }                       //different price from summ of 3 book prices
    //checking name, amount and price of each book
    if(book1.title!=bsc.title1 ){       //more checks can be added (like if the order of books is different), but according to previous code and logic of the basket is it not necessary
        return "Error: adding first book!";
    }else{
        if(book1.price!=bsc.price1){ return "Error: first book price!";}
        if(bsc.amount1!=1) { return "Error: first book amount!";}
    }
    if(book2.title!=bsc.title2 ){   return "Error: adding second book!";
    }else{
        if(book2.price!=bsc.price2){ return "Error: second book price!";}
        if(bsc.amount2!=1) { return "Error: second book amount!";}
    }
    if(book3.title!=bsc.title3 ){   return "Error: adding third book!";
    }else{
        if(book3.price!=bsc.price3){ return "Error: third book price!";}
        if(bsc.amount3!=1) { return "Error: third book amount!";}
    }
    //deleting one book
    await page.click("#basket-step1-default > div.b-bask-panel.b-bask-panel-order > div.js-main_order-container > div > div > div:nth-child(3) > div > div.b-product-check > label > span");
    await page.waitForTimeout(8000);                  //time delay just in case       
    
    await page.click('#step1-default > div > div > a.btn.btn-small.btn-invert.btn-pad-10.b-action-panel-e-btn-m-main.js-ap-btn-remove');
    await page.waitForTimeout(5000);                  //time delay just in case  
   
    //('input').trigger(jQuery.Event( 'keydown', { which: 13 } ));

    //one more time checking bascet
    sum -= bsc.price1;
    const bsc2 = await page.evaluate(() => {
        let pricetemp = document.querySelector('#basket-step1-default > div.b-carttotal > div.js-order-summary-block.order-summary-default > div.b-dotted-im.js-summary-pay-result.b-dotted-im-m-2rows > span.b-dotted-im-e-val').innerText;
        let anounttemp = document.querySelector('#ui-id-4').innerText;
        let anount =Number (anounttemp.replace(/[^\d]/g, ''));
        let price =Number (pricetemp.replace(/[^\d]/g, ''));
        return {
            anount,
            price
        }
    });

    //last checks after deleting
    if(sum != bsc2.price){ return "Error: deleting problem (price difference)!";}
    if(bsc.nummber-1!=bsc2.anount) { return "Error: deleting problem (amount)!";}
    await page.screenshot({path: '1.png'});
    browser.close();
    
    return  "Total amount: " + bsc2.anount + ";\n Bill: " + bsc2.price + ".\n" + "Everything is alright!";
  };

Bookbuy().then((value) => {
    
    console.log(value);              //the result goes to the console, as well as errors, if there are some - there was no need in printing the result of shoping, but just in case it will be printed 
});