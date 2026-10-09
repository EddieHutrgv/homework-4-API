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
localStorage.setItem("access_token", "BQBSsOF0pREEH6nRBF8yjCv6uVAHOsjXofi8phiNXvlltvJ_rM8HvhMpH6XZPELrUOVNjI8e2Zz98yKxgwPKy4h8mFIpchSY_1YepMpVnlAFGAunmFA-GyMIUcAVjRxpP4qAa4DInz1T");
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


  }

 async function loadTrackData(trackID, index) {
    const response = await fetch(
      `https://api.spotify.com/v1/tracks/${trackID}`,
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
    row.querySelector(".track-number").textContent = track.track_number;
  }

async function loadAlbumData() {
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album,single&limit=4`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    const data = await response.json();

    const cards = document.querySelectorAll(".album-card");
    data.items.forEach((album, i) => {
      cards[i].querySelector("img").src = album.images[0].url;
      cards[i].querySelector("h3").textContent = album.name;
      cards[i].querySelector("p").textContent =
        `${album.release_date} • ${album.album_type}`;
    });
  }


  loadAlbumData();
  loadTrackData(trackID1, 0);
  loadTrackData(trackID2, 1);
  loadTrackData(trackID3, 2); 
  loadArtistData();
}
load();


   