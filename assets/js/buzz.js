// $('document').ready(function () {
// ! Function for loading the map on page 1

function initMap() {
  // Map options
  var options = {
    zoom: 13,
    center: {
      lat: 32.845885,
      lng: -96.783393
    }
  }
  //  * create new map
  var map = new google.maps.Map(document.getElementById('map'), options);
  var schoolImage = 'https://img.icons8.com/nolan/64/000000/school.png';
  var coffeeImage = 'https://img.icons8.com/color/48/000000/cafe.png';
  var beerImage = 'https://img.icons8.com/ios/50/000000/beer.png';

  // ! add marker function *
  addMarker({
    coordinates: {
      lat: 32.87232,
      lng: -96.772507
    },
    iconImage: 'https://img.icons8.com/color/48/000000/cafe.png',
    content: '<img src="http://i.imgur.com/4H1Fei6.jpg"><h3>Panera</><h3>Address</h3><a href="https://locations.panerabread.com/tx/dallas/7839-park-ln.html?utm_medium=display-ad&utm_source=paid-digital&utm_campaign=yext&utm_content=local-search">Panera</a><h3>Ratings</h3>'

  });
  // addMarker({
  //   coordinates: {
  //     lat: 32.847997,
  //     lng: -96.787064
  //   },
  //   // iconImage: 'https://img.icons8.com/color/48/000000/cafe.png',
  //   content: '<h2>Coffee Shop</h2>'
  // });

  addMarker({
    coordinates: {
      lat: 32.880896,
      lng: -96.769267
    },
    iconImage: 'https://img.icons8.com/color/48/000000/cafe.png',
    content: '<h2>Coffee Shop</h2>',
  });

  addMarker({
    coordinates: {
      lat: 32.8419369,
      lng: -96.7706972
    },
    iconImage: beerImage,
    content: '<h2>Barley House</h2><p class="rating"><i class="fa fa-star"></i></i><i class="fa fa-star"></i></i><i class="fa fa-star"></i></i><i class="fa fa-star"></i></i> <i class="fa fa-star-half"></i></p><br><a href="./location.html">Location Page</a>',
  });

  addMarker({
    coordinates: {
      lat: 32.845885,
      lng: -96.783393
    },
    iconImage: schoolImage,
    content: '<h2>We meet Jon here!</h2>'
  });

  function addMarker(props) {
    var marker = new google.maps.Marker({
      position: props.coordinates,
      map: map,
    })
    // Check for an Icon
    if (props.iconImage) {
      // Set Icon Image
      marker.setIcon(props.iconImage)
    }

    // check for content
    if (props.content) {

      var info = new google.maps.InfoWindow({
        content: props.content
      });
      marker.addListener('click', function () {
        info.open(map, marker);
      });
    }
  }
}

function locationMap() {
  // Map options
  var options = {
    zoom: 13,
    center: {
      lat: 32.845885,
      lng: -96.783393
    }
  }

  function initMap() {
    var locationMarker = new google.maps.Marker({
      position: {
        lat: 32.8458281,
        lng: 96.7701872
      },
      map: locationMap
    })
  }
}


// ! This is for generating the bar page page data

var key =
  'JARq9NBksYNIfR1HQQ8z3P5r7ypZW9-Xo_bVQUO-QRgXM3XJbnpvhKuo25EXjDrm1Xq8A9Vv6-p9dHcRJlH6dVqQVbXLU_iq3CYqI1YVwxyD12qLi0-xDNo8_ba5XHYx';

var userloc = 75207;
var loc = 'location=' + userloc;
// var categories = 'categories=beerbar';
var term = 'term=happy%20hour'
var businessID = 'VJyE0wCtZtoLev9YgXYpIQ';

// ! Empty variables for storing information to pass between API's
var businessName = ''
var centerMap = lat1,
  lat2;
var lat1 = '',
  lat2 = '',
  lat3 = '',
  lat4 = '',
  lat5 = '',
  lat6 = '',
  lat7 = '',
  lat8 = '',
  lat9 = '',
  lat10 = '';

var lng1 = '',
  lng2 = '',
  lng3 = '',
  lng4 = '',
  lng5 = '',
  lng6 = '',
  lng7 = '',
  lng8 = '',
  lng9 = '',
  lng10 = '';

var thisBusiness = 0;
var businessCount = 0;
var searchLimit = 2;


// ! This is the first call made to fill the buttons and the map
var buzzURL =
  'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?' +
  loc +
  '&' +
  term +
  '&limit=' + searchLimit;

// Things we can add
//   categories;
// '&' +


var buzzDetailURL =
  'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/' + businessID;

var buzzReviewURL =
  'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/' + businessID + '/reviews';

function getData() {
  $.ajax({
    url: buzzURL,
    type: 'GET',
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', 'Bearer ' + key);
      xhr.setRequestHeader('X-Requested-With', 'true');
    },
    success: function (data) {
      businessID = data.businesses[0].id;
      businessName = data.businesses[1].name;
      console.log('----Here is the 1st set of Data ', data);
      console.log("id: " + businessID);
      console.log(data.businesses[1].price)



      // ! This function will create buttons (Repeating element) for each bar on the 1st page based on

      function barButton() {
        var barDiv = $('<div>').addClass('bars');
        for (var i = 0; i < searchLimit; i++) {
          var barBtn = $('<button>');
          barBtn.addClass("btn btn-light btn-lg")
          barBtn.html(data.businesses[i].name + '<br>' + "rating: " + [data.businesses[i].rating]);
          barBtn.attr('id', [data.businesses[i].id]);
          // barDiv.append(barBtn)
          barBtn.appendTo('.bar-btn');
          console.log(data.businesses[i].id);
          // lat + [i] = [data.businesses[i].coordinates.latitude];
          console.log("lat" + [i]);
          console.log("lng" + [i] + ": " + [data.businesses[i].coordinates.longitude])

        }
      }
      barButton();
    },


  });


}




function getDataByID() {
  $.ajax({
    url: buzzDetailURL,
    type: 'GET',
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', 'Bearer ' + key);
      xhr.setRequestHeader('X-Requested-With', 'true');
    },

    success: function (data) {
      console.log(data);
      var name = $('<h2>').html(data.name);
      var price = $('<h4>').html('Price: ' + data.price);
      var cat = $('<h3>').html('Category: ' + data.categories[0].title);
      var addr = $('<h4>').html('Street address: ' + data.location.display_address);

      var phone = $('<h4>').html('Phone: ' + data.display_phone);
      var coords = $('<h4>').html("Latitude: " + data.coordinates.latitude + "  Longitude: " + data
        .coordinates
        .longitude);
      // var hours = $('<h4>').html('Hours: Monday-Saturday ' + data.hours[0].open[0].start + ' - ' + data.hours[0].open[0].end);
      var hoursObject = data.hours[0];
      // console.log("Here are the hours: " + hoursObject);

      $('.info').append(name, price, cat, addr, phone, coords);
      for (let j = 0; j < data.photos.length; j++) {
        var photos = $('<img>');
        photos.attr("src", data.photos[j]);
        photos.css("height", "200px");
        $('.image-here').append(photos);
      }
      console.log("-----id again----- " + data.id)

      getreviewsByID();
    },
  });
}


function getreviewsByID() {
  $.ajax({
    url: buzzReviewURL,
    type: 'GET',
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', 'Bearer ' + key);
      xhr.setRequestHeader('X-Requested-With', 'true');
    },

    success: function (data) {
      var reviewTitle = $('<h2>').html('Reviews');
      $('.info').append(reviewTitle);
      for (let k = 0; k < data.reviews.length; k++) {
        var reviews = $('<p>').html(data.reviews[k].text);
        var br =
          $('.reviews').append(reviews);
      }

    },
  });
}

getDataByID();
getData();

// }