//IMPORTS
var request = require( "request" );
var readline = require( "readline" );
var fs = require( "fs" );

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//GET SEARCH
rl.question( "GOOGLE: ", function( response ){
	//CLOSE
  	rl.close();

  	//SEARCH IN GOOGLE
  	searchInGoogle( response.trim() );
});

//FUNCTION SEARCH IN GOOGLE
function searchInGoogle( search ){
	//SET HEADERS
	var headers = {
		"User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.110 Safari/537.36",
		"Content-Type": "application/x-www-form-urlencoded" 
	}
	
	//CONFIGURE THE REQUEST
	var options = {
	    url     : "https://www.google.com/search?q=" + search,
	    method  : "GET",
	    jar     : true,
	    headers : headers
	}
	
	//DO REQUEST
	request( options, function( error, response, body ){
	    if( !error && response.statusCode == 200 ){
	    	//SHOW RESPONSE
	    	console.log( body );

	    	//SAVE RESULT
	    	saveResultSearch( body );
	    }
	});
}	

//FUNCTION SAVE RESULT OF SEARCH
function saveResultSearch( result ){
	//VARIABLES
	var date = new Date();
	var name = 	"search" + date.getTime() + ".html";
	var path = "resultSearchs/" + name;

	//WRITE
	fs.writeFile( path, result, function( err ){
		//SHOW ERROR IF THERE ARE
		if( err ){
			//SHOW
		    console.log(err);
		}
		else{
			//SHOW MESSAGE OF CONFIRMATION
			console.log( "The file was saved !" );
		}

		//OPEN FILE
		var exec = require( "child_process" ).exec, child;

		child = exec( "\"" + path + "\"", function( err, stdout, stderr ){
			//SHOW ERROR IF THERE ARE
			if( err ){
				//SHOW
			    console.log(err);
			}
		});
	});
}