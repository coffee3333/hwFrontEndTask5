document.getElementById("searchButton").onclick = function() {searchEvent()};

async function getResponse(url){
	let json;
	let response = await fetch(url);
	if (response) {
	  json = await response.json();
	} else {
	  alert("Ошибка HTTP: " + response.status);
	}
	return json;
}

function urlParser(searchQuery){
	var url = `https://api.giphy.com/v1/gifs/search?q=${searchQuery}&api_key=SHeftHLJ5WErqoerFzUsHVYmoHjGZq9E&limit=27`
	return url;
}

function pageParser(json){
	var jsonImages = json['data'];
	var counter = 0;
	var divGif = document.getElementById("gifsBox");
	var divGifWrapper = document.createElement("div");
	divGifWrapper.setAttribute('class', 'gif-result-field')

	for (var key in jsonImages){
		counter += 1;
		var gif = document.createElement("img");		
		var div = document.createElement("div");
		div.setAttribute('class', 'gif-wrapper')
		gif.setAttribute('src', jsonImages[key]['images']['original']['url']);
		gif.setAttribute('height', '320px');
		gif.setAttribute('max-width', '450px');
		gif.setAttribute('width', '100%');
		div.appendChild(gif)
		divGifWrapper.appendChild(div);
	}
	if (counter != 0 ){
		divGif.appendChild(divGifWrapper)
	}else{
		var titleNoFound = document.createElement("h2");
		var text = document.createTextNode("No results were found for your search");
		titleNoFound.setAttribute('class', 'text-center');
		titleNoFound.appendChild(text);
		divGif.appendChild(titleNoFound);
	}
}



async function search(){
	var searchQuery = document.getElementById('searchInput').value
	var url = urlParser(searchQuery);
	var jsonRedy = await getResponse(url);
	pageParser(jsonRedy);

}





async function searchEvent(){
	if (parseInt(document.getElementById('searchInput').value.length, 10) > 0){
		var divGifsBox = document.getElementById('gifsBox');
		divGifsBox.innerHTML = '';
		search();
	}

}









