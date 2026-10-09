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
localStorage.setItem("access_token", "BQBCbbljpZtMwU_nUzTijdQ3xF8vjndxwU9hAA44BYIIYVjqJDMGoTnRH8OpkKLacAuB4e57HKKCP9XBiNS6ygAtI-hDk27wsbNa6dViz1UTAHACLZpGHjwdMapPCnM6_5K5QMNlsylE");
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

 async function loadTrackData(trackID1, index) {
    const response = await fetch(
      `https://api.spotify.com/v1/tracks/${trackID1}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    const track = await response.json();


    const row = document.querySelectorAll(".track")[index];
    row.querySelector("img").src = track.album.images[0].url;
    row.querySelector(".track-title").textContent = track.name;
    row.querySelector(".track-album").textContent = track.album.name;
    row.querySelector(".track-duration").textContent = convertMsToMinSec(track.duration_ms);


    row.querySelector(".track-number").textContent = track.disc_number;

  }

  loadTrackData(trackID1, 0);
  loadTrackData(trackID2, 1);
  loadTrackData(trackID3, 2); 
  loadArtistData();
}
load();


   