window.addEventListener('DOMContentLoaded', function () {

  const flexContainer1 = document.querySelector('.flex-container1');
  const user = document.querySelector('.user')
  const wishBtn = document.querySelector('.wishBtn')
  const userOptions = document.querySelector('.userOptions')
  const cart = document.querySelector('.cart')
  const searchInput1 = document.querySelector('.searchInput1')




  let search;

  window.onclick = e => {
    console.dir(e.target);  // use this in chrome
    // console.log(e.target);  // use this in firefox - click on tag name to view 
  }

  user.addEventListener('click', function () {
    console.log("user")
    userOptions.style.display = "flex";

  })



  wishBtn.addEventListener('click', function () {
    window.location = "http://localhost:5500/Pages/wishlist.html";

  })

  cart.addEventListener('click', function () {
    window.location = "http://localhost:5500/Pages/cart.html"
  })



  requirejs(['../service/dataService.js'], (methods) => {
    methods.getBooks().then(function (getResponse) {
      let res = getResponse.data.result;
      console.log(getResponse)
      console.log(res)

      flexContainer1.innerHTML = res.map(function (book) {
        return `<div class="bookContainer" id=${book._id}> 
            <div class="imgContainer" >
            <div class="book"id=${book._id}><img src="/Assets/bookListing.png" class ="img"> </div>
            </div> 
            <div class="bookName"id=${book._id}>${book.bookName}</div>
            <div class="author"id=${book._id}>${book.author}</div>
            <div class="rating">
            <div class="star" id=${book._id}>4.5*</div>
            <div class="starRating" id=${book._id}>(20)</div>
            </div>
            <div class="price">
            <div class="price1"id=${book._id}>Rs. ${book.discountPrice}</div>
            <div class="originalPrice"id=${book.price}> ${book.price}</div>
            </div>
            </div>`;

      }).join('');

    })

  });
  $(document).on('click', '.bookContainer', function (event) {
    console.log(event.target.id)
    console.log(event.target.textContent)

    window.location = `http://localhost:5501/Pages/displayBook.html?id=${event.target.id}`
  })


  user.addEventListener('click', function () {
    console.log("user")
    userOptions.style.display = "flex";

  })


  searchInput1.addEventListener('change', function () {
    search = searchInput1.value;
    console.log(search);


    requirejs(['../service/dataService.js'], (methods) => {
      methods.getBooks().then(function (getResponse) {
        let res = getResponse.data.result;
        console.log(getResponse)
        console.log(res)

        let searchArry = res.filter(function (book1) {
          return book1.bookName.match(search);
        })
        console.log(searchArry)

        flexContainer1.innerHTML = searchArry.map(function (book) {
          return `<div class="bookContainer" id=${book._id}> 
              <div class="imgContainer" >
              <div class="book"id=${book._id}><img src="/Assets/bookListing.png" class ="img"> </div>
              </div> 
              <div class="bookName"id=${book._id}>${book.bookName}</div>
              <div class="author"id=${book._id}>${book.author}</div>
              <div class="rating">
              <div class="star" id=${book._id}>4.5*</div>
              <div class="starRating" id=${book._id}>(20)</div>
              </div>
              <div class="price">
              <div class="price1"id=${book._id}>Rs. ${book.discountPrice}</div>
              <div class="originalPrice"id=${book.price}> ${book.price}</div>
              </div>
              </div>`;

        }).join('');
        

      })

    });
  })


})
