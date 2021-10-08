window.addEventListener('DOMContentLoaded', function () {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    console.log(params.id);



    const bookName1 = document.querySelector('.bookName1')
    const user = document.querySelector('.user')
    const author1 = document.querySelector('.author1')
    const star1 = document.querySelector('.star1')
    const starRating1 = document.querySelector('.starRating1')
    const price11 = document.querySelector('.price11')
    const originalPrice1 = document.querySelector('.originalPrice1')
    const bkDetail = document.querySelector('.bk2')
    const flxContainer = document.querySelector('.flex-container21')
    const bagButton = document.querySelector('.bagButton')
    const wishButton = document.querySelector('.wishButton')
    const productCounter = document.querySelector('.productCounter')
    let counterDisplay = document.querySelector('.counter-display');
    let counterMinus = document.querySelector('.counter-minus');
    let counterPlus = document.querySelector('.counter-plus');
    const cart = document.querySelector('.cart')
    const userOptions = document.querySelector('.userOptions')
    const wishBtn = document.querySelector('.wishBtn')


    let count = 1;

    // updateDisplay();


    requirejs(['../service/dataService.js'], (methods) => {
        methods.getBooks().then(function (getResponse) {
            let res = getResponse.data.result;
            console.log(getResponse)
            console.log(res)


            let filterArry = res.filter(function (book) {
                return book._id == params.id;
            })
            console.log(filterArry)
            console.log(params.id)

            flxContainer.innerHTML = filterArry.map(function (book1) {
                return `<div class="bookDesc1">
                <div class="bookName1" id="bookName">${book1.bookName}</div>
                <div class="author1" id="author">${book1.author}</div>
    
    
                <div class="rating1">
                    <div class="star1" id=${book1._id}>4.5*</div>
                    <div class="starRating1" id=${book1._id}>(20)</div>
                </div>
    
                <div class="price1">
                    <div class="price11" id=${book1._id}>Rs. ${book1.discountPrice}</div>
                    <div class="originalPrice1" id=${book1._id}> ${book1.price}</div>
                </div>
    
    
            </div>
    
    
            <div class="bookDetails">
                <div class="bk1">Book Detail</div>
                <div class= "bk2"><p>Although aimed at a somewhat young age group, the book series has gained fair acclaim by critics and fans alike, especially in terms of storyline. They're noted for their spectacular illustrations, and creative integration between the stories told in the books, and the references to the movies. A fair share of readers agree that the stories are too short, but do make up in the number of volumes and their price of about five dollars.Wonder what Jack's crew did aboard the Fleur de la Mort after leaving Jack and the Barnacle in City of Gold? Want to know how they met Billy Turner? </p></div>
            </div>`
            }).join(' ');

        })

    })
    user.addEventListener('click', function () {
        console.log("user")
        userOptions.style.display = "flex";

    })

    wishBtn.addEventListener('click', function () {
        window.location = "http://localhost:5500/Pages/wishlist.html";

    })
    // ADD TO CART

    bagButton.addEventListener('click', function () {
        // window.location ="http://localhost:5500/Pages/cart.html"
        console.log('hai')
        bagButton.style.display = 'none'
        productCounter.style.display = "flex"

        let obj1 = {
            product_id: params.id,

        }
        console.log(obj1)

        requirejs(['../service/dataService.js'], function (methods) {
            methods.addCart(obj1).then(function (cartResponse) {
                console.log('bag')

                console.log(cartResponse)


            })


        })
    })


    // WISHLIST

    wishButton.addEventListener('click', function () {
        console.log('wish')

        let objWish = {
           product_id: params.id,
            // quantityToBuy: count,
        }

        console.log(objWish);

        requirejs(['../service/dataService.js'], function (methods){
            methods.wish(objWish).then(function(wishResponse){
                console.log(wishResponse)

            })
        })

    })



    // COUNTER CODE

    $(document).on('click', '.counter-plus', function (event) {
        // let cartQid = event.target.id
        count += 1;


        $('.counter-display').html(count);

        let cartCount = {
            _id: params.id,
            quantityToBuy: count,
        }

        console.log(cartCount);

        requirejs(['../service/dataService.js'], function (methods){
            methods.addQuantity(cartCount).then(function(bookQuantity){
                console.log(bookQuantity)

            })
        })


    });


    cart.addEventListener('click', function () {
        window.location = "http://localhost:5500/Pages/cart.html"

    })

    $(document).on('click', '.counter-minus', function (event) {
        cartQid = event.target.id

        if (count == 0){ 
            return count;
        }
        else if(count > 0){
            count -= 1;
        }
        
        $('.counter-display').html(count);



        let cartCount = {
            _id: params.id,
            quantityToBuy: count,
        }

        console.log(cartCount);

        requirejs(['../service/dataService.js'], function (methods){
            methods.addQuantity(cartCount).then(function(bookQuantity){
                console.log(bookQuantity)

            })
        })


    });

   

})


