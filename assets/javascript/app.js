   // Initialize Firebase
var config = {
        apiKey: "AIzaSyCLpZgiH4nEnfoCg4dfF_U5spFvCnhdEzE",
        authDomain: "project-one-cc2cf.firebaseapp.com",
        databaseURL: "https://project-one-cc2cf.firebaseio.com",
        projectId: "project-one-cc2cf",
        storageBucket: "project-one-cc2cf.appspot.com",
        messagingSenderId: "495954010839"
     };

var database = firebase.database();
firebase.initializeApp(config)
var name = ""
var waypoint = ""
var radius = 0

var interests = ["Airport", "Bakery", "Bank", "Bar", "Beauty Salon", "Book Store", "Cafe", "Church", "Convenience Store", "Dentist", "Gas Station", "Gym", "Hardware Store", "Hospital", "Library", "Night Club", "Pharmacy", "Police", "Restaurant", "Shopping Mall", "Veterinary Care"]
for (var i = 0; i < interests.length; i++) {
  var label = $("<label>")
  label.text(interests[i])
  var input = $("<input>")
  input.attr("type", "checkbox")
  input.attr("id", "cbox")
  input.attr("name", "interests")
  input.attr("value", interests[i])
  label.prepend(input)
  $("#checkbox").append(label)
}

$(document).on("click", "#submit", pull)

var realinterests = []

function pull(event){
  event.preventDefault()
	var name = $("#name").val().trim()
    $("#name").val("")
      name = snapshot.val().name;
	var waypoint = $("#waypoint").val().trim()
    $("#waypoint").val("")
  waypoint = parseAdd(waypoint)
  var radius = $("#radius").val().trim()
    $("#radius").val("")
    radius = Math.floor((parseInt(radius)*1609.34))
  $.each($("input[name='interests']:checked"), function() {
  realinterests.push($(this).val())
  })
    latLong(waypoint)
    places(waypoint, radius)

    database.ref().set({
      name: name,
      radius : radius, 
      waypoint: waypoint,
      lat: lat,
      long: long,
    });
}

function interestlist(){
  var interest = ""
  for (var i = 0; i < realinterests.length; i++) {
    interest = interest + "type=" + realinterests[i] + "&"
  }
}

function places(waypoint, radius){
  var and = "&"
  var placekey = "key=AIzaSyCtHALFK3VL5Bxh7uJijmjZgBLz6J31YiE"
  var location = "location=35.981826,-78.835710"
  var radius = "radius="+radius
  var type =  interestlist()
  // var rank = "rankby=distance"
	var urlp = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?"+location+and+radius+and+type+and+placekey
  $.ajax({
    method: "GET",
    url: urlp,
  }).done(function(response){
    var result = response
    console.log(result)
  })
}

$(document).on("click", "#test", direction)

function direction(event){
  event.preventDefault()
  var mapsURL = "https://maps.googleapis.com/maps/api/distancematrix/json?"  
  var orAdd   = "&origins=180+Front+Street+Hellertown+PA+18055"
  var deAdd   = "&destinations=3525+Rawdon+Drive+Durham+NC+27713"
  var apiKey  = "&key=AIzaSyBKnyekYJnpf78xoDtJ1SxWUdvYPuTw85U"
  mapsURL = mapsURL+orAdd+deAdd+apiKey
  $.ajax({
    url: mapsURL,
    method: "GET"
  }).done(function(response){
    console.log(response)
    var outPut = response.data
    console.log(outPut)
  })
}

function latLong(location){
  var latLong ="https://maps.googleapis.com/maps/api/directions/json?"
  var orAdd   = "&origin=" + location
  var deAdd   = "&destination=3525+Rawdon+Drive+Durham+NC+27713"
  var apiKey  = "&key=AIzaSyBKnyekYJnpf78xoDtJ1SxWUdvYPuTw85U"
  latLong = latLong+orAdd+deAdd+apiKey; 

  $.ajax({
    url: latLong,
    method: "GET"
  }).done(function(response){
    var lat = response.routes["0"].legs["0"].end_location.lat
    var long = response.routes["0"].legs["0"].end_location.lng

    database.ref().set({
        lat: lat,
        long: long,
    });

  }); 

 

}

function parseAdd(x) {
var y = x;
x = y.replace(/ /g, "+");
return x;
}