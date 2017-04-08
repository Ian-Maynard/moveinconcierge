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
    // name variable here
	var waypoint = $("#waypoint").val().trim()
    $("#waypoint").val("")
  waypoint = parseAdd(waypoint)
    // waypoint variable here

  var radius = $("#radius").val().trim()
    $("#radius").val("")
    radius = Math.floor((parseInt(radius)*1609.34))
    // radius variable here
  $.each($("input[name='interests']:checked"), function() {
  realinterests.push($(this).val())
  })
    latLong(waypoint)
    places(waypoint, radius)
// direction()
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
    //  lat
    // long
  }); 
}

function parseAdd(x) {
var y = x;
x = y.replace(/ /g, "+");
return x;
}