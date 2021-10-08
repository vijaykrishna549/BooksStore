window.addEventListener('DOMContentLoaded', function () {


    // window.onclick = e => {
    //     console.dir(e.target);  // use this in chrome
    //     // console.log(e.target);  // use this in firefox - click on tag name to view 
    // } 

    const wishContainer = document.querySelector('.wish-container')
    const removeWish = document.querySelector('.removeWish')
    const aCart = document.querySelector('.aCart')
    const user = document.querySelector('.user')
    const cart = document.querySelector('.cart')

    let tar = "";

    $(document).on('click', '.bookHead', function (event) {
        tar = event.target.id
        console.log(tar)

        $(document).on('click', '.removeWish', function () {
            let objDelete = {
                product_id: tar,
            }

            console.log(objDelete)
            requirejs(['../service/dataService.js'], (methods) => {
                methods.deleteWish(objDelete).then(function (delWish) {
                    location.reload();
                    console.log(delWish)
                })

            })
        })

        $(document).on('click', '.aCart', function () {
            console.log('acart')

            let obj1 = {
                product_id: tar,

            }
            console.log(obj1)

            requirejs(['../service/dataService.js'], function (methods) {
                methods.addCart(obj1).then(function (cartResponse) {
                    console.log('bag')

                    console.log(cartResponse)


                })


            })
        })
    })

    //   console.log(tar)



    requirejs(['../service/dataService.js'], (methods) => {
        methods.getwishItems().then(function (abc) {
            // let res = getResponse.data.result;
            console.log(abc.data.result)
            wishBook = abc.data.result;
            console.log(wishBook)

            wishContainer.innerHTML = wishBook.map(function (wishItem) {
                console.log(wishItem.product_id._id)

                return `
                <div class="bookHead" id="${wishItem.product_id._id}">
                    <div class="bookContainer" id="${wishItem.product_id._id}">
                        <img src="/Assets/cartImage 11.png" width="100%" height="100%">
                    </div>
                    <div class="detailContainer" id="${wishItem.product_id._id}">
    
                        <div class="bookName1" id="${wishItem.product_id._id}">${wishItem.product_id.bookName}</div>
                        <div class="author1" id="${wishItem.product_id._id}">${wishItem.product_id.author}</div>
    
                        <div class="price1" id="${wishItem.product_id._id}">
                            <div class="price11" id="${wishItem.product_id._id}">Rs. ${wishItem.product_id.discountPrice}</div>
                            <div class="originalPrice1" id="${wishItem.product_id._id}"> ${wishItem.product_id.price}</div>
                        </div> 
                        <div class= "removeWish" id="${wishItem.product_id._id}">
                        <i class="material-icons" id="${wishItem.product_id._id}">delete</i>

                    </div>
                    <div class ="aCart" id="${wishItem.product_id._id}">
                    <i class="material-icons" id="${wishItem.product_id._id}">add_shopping_cart</i>
                    </div>
                      
                    </div>
                </div>
                `
            }).join(' ');

        })
        // .catch(function (error) {
        //     console.log(error)
        // })







    })

    user.addEventListener('click', function () {
        console.log("user")
        userOptions.style.display = "flex";

    })

    cart.addEventListener('click', function () {
        window.location = "http://localhost:5500/Pages/cart.html"
    })

})