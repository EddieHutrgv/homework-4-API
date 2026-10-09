// *********************************************************************
// Homework 4 APIs
// *********************************************************************

function convertMsToMinSec(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const paddedSeconds = String(seconds).padStart(2, '0');
  return `${minutes}:${paddedSeconds}`;
}

// **************** Update code below  **************** 


// IDs and secret token should come from Spotify
localStorage.setItem("artist_id", "6l3HvQ5sa6mXTsMTB19rO5");
localStorage.setItem("access_token", "BQBtp12c7nETBxjo_6bg3VlctB8f66lPM7AwtIULTmE74H46sXD-cyB9HV4g6zvM0HpXeTvpYHY3gKiKJC_SNfSsjvDrEgB9uDKaanldHOe9rXjN9cLmPOqDuKX5sqINC_ExmIpzBCXE");
localStorage.setItem("track_id_1", "2wAJTrFhCnQyNSD3oUgTZO");
localStorage.setItem("track_id_2", "68Dni7IE4VyPkTOH9mRWHr");
localStorage.setItem("track_id_3", "2uwnP6tZVVmTovzX5ELooy");


async function load(){
    
    let artistID = localStorage.getItem("artist_id");
    let accessToken = localStorage.getItem("access_token");
    let trackID1 = localStorage.getItem("track_id_1");
    let trackID2 = localStorage.getItem("track_id_2");
    let trackID3 = localStorage.getItem("track_id_3");
    
  async function loadArtistData() {
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${artistID}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    const artist = await response.json();
    document.getElementById("artist-name").textContent = artist.name;
    document.querySelector(".artist-image img").src = artist.images[0].url;

    document.querySelector(".followers").textContent =
      `${artist.followers.total.toLocaleString()} followers`;
    
  }
  
  loadArtistData();
}
load();


   