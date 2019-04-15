//  Name: Nunez, Priscilla
// Class: SI 339
// Date: 4.10.19
// Assignment: JavaScript Canvas
// Instructor: Dr. CVL 
// GSI: Lee, Sanghyun 



const appId = "3396692f-626d-46f2-adb6-4fdc925400c1"
const apiKey = "yzkYIQG3tjPMlOGYBdVn95BHIS9iGG9G"
const googelApiKey = "AIzaSyAcotR8YZ-Zsd6dcREUBhkUA_NE3UC5AIY"
const apiSecret = "QhKCLUBh6EdFOWGG"

fetch('https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key=' + apiKey, {
    method: 'get',
  })
  .then(response => { return response.json(); })
  .then(nytimesBestSellers => { 
    nytimesBestSellers.results.forEach(function(book) {
        var isbn = book.isbns[1].isbn10;
        var bookInfo = book.book_details[0];
        var lastWeekRank = book.rank_last_week || 'n/a';
        var weeksOnList = book.weeks_on_list || 'New this week';

        var listing = 
        '<div id="' + book.rank + '" class="entry">' + 
          '<p>' + 
          '<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/387928/book%20placeholder.png" class="book-cover" alt="book image" id="cover-' + book.rank + '">' + 
          '</p>' + 
          '<h2><a href="' + book.amazon_product_url + '" target="_blank">' + bookInfo.title + '</a></h2>' +
          '<h3>By ' + bookInfo.author + '</h4>' +
          '<h3 class="publisher">' + bookInfo.publisher + '</h4>' +
          '<p>' + bookInfo.description + '</p>' + 
          '<div class="stats">' +
            '<hr>' + 
            '<p>Last Week: ' + lastWeekRank + '</p>' + 
            '<p>Weeks on list: ' + weeksOnList + '</p>' +
          '</div>' +
        '</div>';

        $('#best-seller-titles').append(listing);
        $('#' + book.rank).attr('nyt-rank', book.rank);
        updateCover(book.rank, isbn);
      });
   });

   const updateCover = (id, isbn) => {
    fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn + "&key=" + googelApiKey, {
      method: 'get'
    })
    .then(response => { return response.json(); })
    .then(data => {
        var img = data.items[0].volumeInfo.imageLinks.thumbnail;
        img = img.replace(/^http:\/\//i, 'https://');
        $('#cover-' + id).attr('src', img);
    })
    .catch(error => {
        var index = id - 1;
        var img = archivedImages[index];
        $('#cover-' + id).attr('src', img);
    });
  }

  $(window).scroll(function (event) {
    var scroll = $(window).scrollTop();
    if (scroll > 50) {
      $('#masthead').css({'height':'50', 'padding' : '8'});
      $('#nyt-logo').css({'height':'35'});
    } else {
      $('#masthead').css({'height':'100', 'padding':'10'});
      $('#nyt-logo').css({'height':'80'});
    }
  });
