const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('searchBtn');

const songContainer = document.getElementById('songsDiv');
const artistContainer = document.getElementById('artistDiv');

async function getSearchResults(e){
    e.preventDefault();
    const query = searchInput.value;
    const url = `https://shazam.p.rapidapi.com/search?term=${query}`;
    
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6269a40e4emsh89420b7bdcdcf27p1228f6jsnd625fefd9cf8',
		'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
	}};

    try {
        const response = await fetch(url,options);
        if (!response.ok) {
            throw new Error('Error en la solicitud: ', response.status);
        } 
        const data = await response.json();
        
        console.log(data); // devuelve 2 objetos, artists y tracks
        //Llamada a funcion display:
        displayResults(data);
    } catch (error) {
        console.log(error)
    }

};

function displayResults(data) {
   
    const artists = data.artists.hits;
    //console.log(artists); // devuelve un array con artistas q se llama hits
   
    const hits = data.tracks.hits; // devuelve array de hits
    //console.log(hits);

    let contentSongs = '';

    hits.forEach(hit => {

        const songTitle = hit.track.title
        const songSubtitle = hit.track.subtitle
        const imageUrl = hit.track.images.coverart

        contentSongs += `

        <div class="song-info-container card-01">
            <div><img src="${imageUrl}" class="songImg"></div>
            
            <div class= "info-division">
                <div class="song-title"><p>${songTitle}</p></div>
                <div class="song-subtitle"><p>${songSubtitle}</p></div>
            </div>
        </div>
        `
        songContainer.innerHTML= contentSongs;

    }); 

    let contentArtists='';
    
    artists.forEach(artist => {

        const artistName = artist.artist.name
        const artistAvatar = artist.artist.avatar
        const artistUrl = `${artist.artist.weburl}`
        console.log(artistAvatar);
        console.log(artistName);
        console.log(artistUrl);

        contentArtists+=`
        <div class="artist-info-container card-02">
        <div class= "artistAvatar"><img src="${artistAvatar}" class="artistImg"></div>
            <div class="artist-title"><p>${artistName}</p></div>
            <div class="artist-url"><a href="${artistUrl}" target="blank">${artistUrl.length>25? artistUrl.substring(0,25).concat('...'):artistUrl}</a></div>
        </div>
        `
        artistContainer.innerHTML = contentArtists;

    });

}

searchBtn.addEventListener('click', (e) => {
    getSearchResults(e);


})