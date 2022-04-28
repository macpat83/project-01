var userFormEl = document.querySelector('#user-form');
var artistInputEl = document.querySelector('#artist');
var albumInputEl = document.querySelector('#album');
var resultsContainerEl = document.querySelector('#results-container');
var resultSearchTerm = document.querySelector('#result-search-term');


var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();
  
    // get value from input element
    var artist = artistInputEl.value.trim();
  
    if (artist) {
      getArtist(artist);
  
      // clear old content
      resultsContainerEl.textContent = '';
      artistInputEl.value = '';
    } else {
      alert('Please enter an artist');
    }
  };


var getArtist = function(artist) {
    //format the github api url
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'genius.p.rapidapi.com',
            'X-RapidAPI-Key': '284cc868e3mshb53d5d29c0255a9p11cbc8jsn4a2488211b96'
        }
    };
    
    fetch('https://genius.p.rapidapi.com/search?q=' + artist, options)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            displayHighlights(data.response.hits, artist)
        })
        //.then(response => console.log(response))
        .catch(err => console.error(err));
        //displayHighlights(data, artist)
}

var displayHighlights = function(hits,searchTerm) {
    // check if api returned any highlights
    if (hits.length === 0) {
      resultsContainerEl.textContent = 'No songs found.';
      return;
    }
  
    resultSearchTerm.textContent = searchTerm;
    var artist_id = hits[0].result.primary_artist
    // loop over highlights
    for (var i = 0; i < hits.length; i++) {

        
        

      // format highlights name
      var highlightsName = hits[i].result.full_title;
      console.log(highlightsName);
  
      // create a container for each highlight
      var highlightsEl = document.createElement("div");
      highlightsEl.classList = 'list-item is-flex-direction-row is-justify-content-space-between is-align-content-center';
    
  
      // create a span element to hold highlight name
      var titleEl = document.createElement('p');
      titleEl.textContent = highlightsName;
  
      // append to container
      highlightsEl.appendChild(titleEl);
  
      // create a status element
      var statusEl = document.createElement('span');
      statusEl.classList = 'is-flex-direction-row is-align-content-center';

      var imageEl = document.createElement('img');
      imageEl.setAttribute("src", hits[i].result.song_art_image_url)
      imageEl.classList.add("song-art")
      highlightsEl.appendChild(imageEl);

    var linkEl = document.createElement('a')
    var ButtonEl = document.createElement('button')
    linkEl.setAttribute("href", hits[i].result.url)
    linkEl.setAttribute("target","_blank")
    ButtonEl.textContent = "lyrics";

    linkEl.appendChild(ButtonEl);

    highlightsEl.appendChild(linkEl);
      // append container to the dom
    resultsContainerEl.appendChild(highlightsEl);
        
    }
};


    // var apiURL = "https://genius.p.rapidapi.com/" + artist + "/:id/songs"
    // make a get request to url
    
    
    // fetch('https://genius.p.rapidapi.com/search?q=' + artist, options)
      
    //   .then(function(response) {
    //     // request was successful
    //     if (response.ok) {
    //       console.log(response);
    //       response.json().then(function(data) {
    //         console.log(data);
    //         // displayAlbums(data, artist);
    //       });
    //     } else {
    //       alert('Error: ' + response.statusText);
    //     }
    //   })
    //   .catch(function(error) {
    //     alert('Unable to connect to Musitory');
    //   });
  

  // add event listeners to forms
userFormEl.addEventListener('submit', formSubmitHandler);