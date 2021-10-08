window.addEventListener('DOMContentLoaded', function () {
    let counterDisplay = document.querySelector('.counter-display');
    let counterMinus = document.querySelector('.counter-minus');
    let counterPlus = document.querySelector('.counter-plus');
    const cart = document.querySelector('.cart')
    const user = document.querySelector('.user')
    const userOptions = document.querySelector('.userOptions')
    const wishBtn = document.querySelector('.wishBtn')
    const cartContainer = document.querySelector('.cart-container')

    const placeOrderBtn = document.querySelector('.placeOrder')
    const AddressDetails = document.querySelector('.AddressDetails')
    const CustomerDetails = document.querySelector('.CustomerDetails')
    const continueButton = document.querySelector('.cntButton')

    const OrderSummary = document.querySelector('.OrderSummary')
    const OrderSummary1 = document.querySelector('.OrderSummary1')

    const inputAddress = document.querySelector('.inputAddress')
    const inputCity = document.querySelector('.inputCity')
    const inputState = document.querySelector('.inputState')

    const once = document.querySelector('.once')

    const checkoutButton = document.querySelector('.checkoutButton')


    const removeItem = document.querySelector('.removeItem')


    let remCart = "";

    let city1;
    let state1;
    let address;
    let h = "Home";

    inputAddress.addEventListener('change', function () {
        address = inputAddress.value;

        console.log(address)

    })

    inputCity.addEventListener('change', function () {
        city1 = inputCity.value
    })

    inputState.addEventListener('change', function () {
        state1 = inputState.value;
    })



    placeOrderBtn.addEventListener('click', function () {
        AddressDetails.style.display = 'none';
        CustomerDetails.style.display = 'flex';
        placeOrderBtn.style.display = 'none';
    })

    continueButton.addEventListener('click', function () {
        OrderSummary.style.display = 'none';
        OrderSummary1.style.display = 'flex';
       
    })



    $(document).on('click', '.bookHead', function (event) {
        remCart = event.target.id
        console.log(remCart)

        $(document).on('click', '.removeItem', function () {
            console.log("hello")
            let cartDelete = {
                product_id: remCart,
            }

            console.log(cartDelete)
            requirejs(['../service/dataService.js'], (methods) => {
                methods.deleteCart(cartDelete).then(function (delCart) {
                    console.log(delCart)

                })

                // location.reload();
            })
        })



    })


    continueButton.addEventListener('click', function () {

        let obj4 = {
            addressType: h,
            fullAddress: address,
            city: city1,
            state: state1,
        }

        console.log(obj4);

        requirejs(['../service/dataService.js'], (methods) => {
            methods.editUser(obj4).then(function (editedUser) {
                console.log(editedUser)
                console.log(editedUser.status)

                if(editedUser.status === 200){
                    continueButton.style.display = 'none';

                }

            })
        });

    })

    let count = 1;
    let cartBook = [];
    let crtBook = [];
    let cartQid;

    // updateDisplay();

    // counterPlus.addEventListener("click", () => {
    $(document).on('click', '.counter-plus', function (event) {
        let cartQid = event.target.id
        count += 1;


        // $('.counter-display').html(count);

        let cartCount = {
            _id: cartQid,
            quantityToBuy: count,
        }

        console.log(cartCount);

        requirejs(['../service/dataService.js'], function (methods) {
            methods.addQuantity(cartCount).then(function (bookQuantity) {
                console.log(bookQuantity)
                location.reload();

            })
        })


    });

    $(document).on('click', '.counter-minus', function (event) {
        cartQid = event.target.id

        if (count > 0) {
            count -= 1;
        }
        else if (count == 0) {
            return count;
        }


        $('.counter-display').html(count);



        let cartCount = {
            _id: cartQid,
            quantityToBuy: count,
        }

        console.log(cartCount);

        requirejs(['../service/dataService.js'], function (methods) {
            methods.addQuantity(cartCount).then(function (bookQuantity) {
                console.log(bookQuantity)
                location.reload();

            })
        })


    });




    user.addEventListener('click', function () {
        console.log("user")
        userOptions.style.display = "flex";

    })

    wishBtn.addEventListener('click', function () {
        window.location = "http://localhost:5500/Pages/wishlist.html";

    })


    requirejs(['../service/dataService.js'], (methods) => {
        methods.getCartItems().then(function (abc) {
            // let res = getResponse.data.result;
            console.log(abc.data.result)
            cartBook = abc.data.result;
            console.log(cartBook)
            // console.log(cartBook[0].quantityToBuy)

            // $('.counter-display').html(cartBook.product_id.quantity);

            cartContainer.innerHTML = cartBook.map(function (cartItem) {

                return `
                <div class="bookHead" id="${cartItem._id}">
                    <div class="bookContainer" id="${cartItem._id}">
                        <img src="/Assets/cartImage 11.png" width="100%" height="100%" id="${cartItem._id}">
                    </div>
                    <div class="detailContainer" id="${cartItem._id}">
    
                        <div class="bookName1" id="bookName">${cartItem.product_id.bookName}</div>
                        <div class="author1" id="author">${cartItem.product_id.author}</div>
    
                        <div class="price1" id="${cartItem._id}">
                            <div class="price11" id="${cartItem._id}">Rs. ${cartItem.product_id.discountPrice}</div>
                            <div class="originalPrice1" id="${cartItem._id}"> ${cartItem.product_id.price}</div>
                        </div> <div class="counterHead" id="${cartItem._id}">
                        <button class="counter-minus" id="${cartItem._id}">-</button>
                        <div class="counter-display" id="${cartItem._id}">${cartItem.quantityToBuy}</div>
                        
                        <button class="counter-plus" id="${cartItem._id}">+</button>
                        
                        <button class="removeItem" id="${cartItem._id}">Remove</button>
                        
                    
                </div>
    
                    </div>
                </div>`
            }).join(' ');

        })
        // .catch(function (error) {
        //     console.log(error)
        // })

        // function as(event) {
        //     console.log(event.target.id)
        // }
    })


    continueButton.addEventListener('click', function () {
        console.log('check')

        requirejs(['../service/dataService.js'], (methods) => {
            methods.getCartItems().then(function (crt) {
                console.log(crt.data.result)
                console.log(crt.data.result[0]._id)
                crtBook = crt.data.result;

                console.log(crtBook)

                once.innerHTML = crtBook.map(function (crtItem) {
                    return `  <div class="itemConatiner">
                    <div class="bookImg1"></div>
                    <div class="bookDetails1">
                        <div class="bookTitle1">${crtItem.product_id.bookName}</div>
                        <div class="bookAuthor1">${crtItem.product_id.author} </div>
                        <div class= "fullPrice">
                            <div class="sellPrice">Rs. ${crtItem.product_id.discountPrice}</div>
                            <div class="nonSellPrice">${crtItem.product_id.price}</div>
                        </div>
                    </div>
                </div>`
                })

            })

            checkoutButton.addEventListener('click', function () {

                console.log('checkoutBtn')
              
                console.log(crtBook)
                //   console.log(crtBook.product_id.bookName)
                let nme = crtBook.map(function(book){
                    return {
                         product_id: `${book._id}`,
                                    product_name: `${book.product_id.bookName}`,
                                    product_quantity: `${book.quantityToBuy}`,
                                    product_price: `${book.product_id.price}`,
                                }
                })
                console.log(nme);


                let objOrder = {
                    orders: nme,
                }
                // console.log(nme)

                // let bkid = crtBook.map(function(orFun){
                //     return orFun._id
                // })
                // console.log(bkid)

                // let qtt = crtBook.map(function(orFun){
                //     return orFun.quantityToBuy
                // })
                // console.log(qtt)

                // let prc = crtBook.map(function(orFun){
                //     return orFun.product_id.discountPrice
                // })
                // console.log(prc)
        
                // let objOrder = {
        
                //     orders: [
                //         {
                //             product_id: bkid[0],
                //             product_name: nme[0],
                //             product_quantity: qtt[0],
                //             product_price: "1234",
                //         },
                //         // {
                //         //     product_id: bkid[1],
                //         //     product_name: nme[1],
                //         //     product_quantity: qtt[1],
                //         //     product_price: prc[1],
                //         // },
                //         // {
                //         //     product_id: bkid[2],
                //         //     product_name: nme[2],
                //         //     product_quantity: qtt[2],
                //         //     product_price: prc[2],
                //         // },
                //         // {
                //         //     product_id: bkid[3],
                //         //     product_name: nme[3],
                //         //     product_quantity: qtt[3],
                //         //     product_price: prc[3],
                //         // },
                //         // {
                //         //     product_id: bkid[4],
                //         //     product_name: nme[4],
                //         //     product_quantity: qtt[4],
                //         //     product_price: prc[4],
                //         // },
                //     ]
                // }
        
                console.log(objOrder)
                console.log(crtBook)
                // console.log(crtBook.bookName)
        
                requirejs(['../service/dataService.js'], (methods) => {
                    console.log('hello');
                    methods.addOrder(objOrder).then(function (finalOrder) {
                        console.log(finalOrder);
                        console.log(finalOrder.data.result)
                        // crtBook = crt.data.result;
                        // console.log(crtBook)
        
        
        
                    })
        
                })
        
            })
        })
    })

  

})