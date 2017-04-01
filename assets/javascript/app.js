$(document).on("#submit", "click", yelp)

function pull(){
	var radius = $("#radius").val().trim()
	var name = $("#name").val().trim()
	var waypoint = $("#waypoint").val().trim()
}

function yelp(){
	var yelpkey = 
		{grant_type: client_credentials,
		client_id: "t0aPZwK_XWNLxm-3n3g53Q",
        client_secret: "MQwCVNcEjdbsGnXNncDBe3jkenxSBqgtBNx193FZ4haQDVWRPnWOZQSt1Moys1q1"
		}
	var key = JSON.stringify(yelpkey) 
	console.log(key)
	var posturl = "https://api.yelp.com/oauth2/token"

      $.ajax({
        	method: "POST",
        	url: posturl + key
        })
      .done(function(response){
      	var result = response
        console.log(result)
        var queryurl = "https://api.yelp.com/v3/businesses/search" +
        search + "&api_key=dc6zaTOxFJmzC&limit=10"
      	
      })
}