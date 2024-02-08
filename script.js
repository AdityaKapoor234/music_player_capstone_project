// Songs List
const songData = [
  {
    id: 1,
    name: "Chingari Koi",
    artist: "Kishore Kumar",
    img: "/public/images/amar_prem/image.jpg",
    source: "/public/song/amar_prem/chingari_koi.mp3",
    genre: "Sad Song",
  },
  {
    id: 2,
    name: "Din Dhal Jaye",
    artist: "Mohammed Rafi",
    img: "/public/images/guide/image.jpg",
    source: "/public/song/guide/din_dhal_jaaye_haaye.mp3",
    genre: "Sad Song",
  },
  {
    id: 3,
    name: "O Saiyan",
    artist: "Ajay Atul",
    img: "/public/images/agneepath/o_saiyan.jpg",
    source: "/public/song/agneepath/o_saiyan.mp3",
    genre: "Romantic Song",
  },
  {
    id: 4,
    name: "Gun Gun Guna",
    artist: "Ajay Atul",
    img: "/public/images/agneepath/gun_gun_guna.jpg",
    source: "/public/song/agneepath/gun_gun_guna.mp3",
    genre: "Party Song",
  },
  {
    id: 5,
    name: "Shah Ka Rutba",
    artist: "Ajay Atul",
    img: "/public/images/agneepath/shah_ka_rutba.jpg",
    source: "/public/song/agneepath/shah_ka_rutba.mp3",
    genre: "Party Song",
  },
  {
    id: 6,
    name: "Abhi Mujh Mein Kahin",
    artist: "Ajay Atul",
    img: "/public/images/agneepath/abhi_mujh_mein_kahin.jpg",
    source: "/public/song/agneepath/abhi_mujh_mein_kahin.mp3",
    genre: "Party Song",
  },
  {
    id: 7,
    name: "Deva Shree Ganesha",
    artist: "Ajay Atul",
    img: "/public/images/agneepath/deva_shree_ganesha.jpg",
    source: "/public/song/agneepath/deva_shree_ganesha.mp3",
    genre: "Devotional Song",
  },
];
// Playlist Currently being played
let currentPlaylingList = [...songData];
// New Playlist being Created
let currentPlaylist = new Set;
// List of All Playlists
let allPlaylist = [];
// Current Song being played
let currentSong = currentPlaylingList[0];





// Body Element for adding elements & changing theme
const body = document.querySelector('body');
const themeChange = document.querySelector('#themeChange');





// Function to Change Theme (Toggle)
function toggleTheme() {
  const musicBodyBox = document.querySelectorAll('.musicBodyBox');
  const songItem = document.querySelectorAll('.songItem');
  const musicBodyImageBox = document.querySelectorAll('.musicBodyImageBox');

  if (body.classList.contains('darkMode')) {
    body.classList.remove('darkMode');
    for (let i of musicBodyBox) {
      i.classList.remove('musicBodyBoxDark');
    }
    for (let i of songItem) {
      i.classList.remove('songItemDark');
    }
    for (let i of musicBodyImageBox) {
      i.classList.remove('musicBodyImageBoxDark');
    }
  } else {
    body.classList.add('darkMode');
    for (let i of musicBodyBox) {
      i.classList.add('musicBodyBoxDark');
    }
    for (let i of songItem) {
      i.classList.add('songItemDark');
    }
    for (let i of musicBodyImageBox) {
      i.classList.add('musicBodyImageBoxDark');
    }
  }
}





// Function to Show list of all songs
function showSongs(genre) {
  const allSongList = document.querySelector('#allSongList');

  let song = '';
  let songList = [];

  if (genre.value) {
    songList = songData.filter((elem) => elem.genre === genre.value);
  } else {
    songList = songData;
  }

  for (let i of songList) {
    song +=
      `<div class="songItem point-text" accessKey=${i.id} onclick="renderCurrentSong(this)">
      ${i.name} - ${i.artist}
    </div>`;
  }
  allSongList.innerHTML = song;
}





// Function to play a song
function renderCurrentSong(elem) {
  currentPlaylingList = [...songData];
  let obj;

  for (let i of currentPlaylingList) {
    if (i.id === parseInt(elem.accessKey)) {
      obj = i;
      currentSong = i;
    }
  }

  document.getElementById("musicBodyImageBox2").style.backgroundImage = `url(${obj.img})`;
  document.getElementById("currentSongName").textContent = obj.name;
  document.getElementById("currentSongArtist").textContent = obj.artist;
  document.getElementById("currentSong").src = obj.source;
  document.getElementById("currentSong").autoplay = true;
}





// Function to add song into playlist
function addToPlaylist() {
  const currentPlaylistDiv = document.querySelector('#currentPlaylist');

  currentPlaylist.add(currentSong);

  let song = '';

  for (let i of currentPlaylist) {
    song +=
      `<div class="songItem songItemPlaylist text-center point-text" accessKey=${i.id} onclick="renderCurrentSong(this)">
        <div>${i.name} - ${i.artist}</div>
      </div>`;
  }
  currentPlaylistDiv.innerHTML = song;
}





// Function to Create Playlist
function createPlaylist() {
  if (document.querySelector('#playlistName').value) {
    let obj = {
      id: allPlaylist.length + 1,
      name: document.querySelector('#playlistName').value,
      songs: [],
    };

    document.querySelector('#playlistName').value = '';
    allPlaylist.push(obj);


    let song = '';

    for (let i of allPlaylist) {
      song +=
        `<div class="songItem songItemPlaylist text-center point-text" accessKey=${i.id} onclick="renderPlaylistSong(this)">
          <div>${i.name}</div>
        </div>`;
    }
    document.querySelector('#allPlaylist').innerHTML = song;
  }
}





// Function to Play Playlist
function renderPlaylistSong(playlist) {
  let index = allPlaylist.findIndex((elem) => elem.id === parseInt(playlist.accessKey))

  if (index !== -1) {
    if (allPlaylist[index].songs.length > 0) {
      currentPlaylingList = [...allPlaylist[index].songs];
      let obj;

      let song = '';

      for (let i of currentPlaylingList) {
        if (i.id === parseInt(allPlaylist[index].songs[0].id)) {
          obj = i;
          currentSong = i;
        }
        song +=
          `<div class="songItem songItemPlaylist point-text text-center point-text" accessKey=${i.id} onclick="renderCurrentSong(this)">
            <div>${i.name} - ${i.artist}</div>
          </div>`;
      }

      document.querySelector('#currentPlaylist').innerHTML = song;

      document.getElementById("musicBodyImageBox2").style.backgroundImage = `url(${obj.img})`;
      document.getElementById("currentSongName").textContent = obj.name;
      document.getElementById("currentSongArtist").textContent = obj.artist;
      document.getElementById("currentSong").src = obj.source;
      document.getElementById("currentSong").autoplay = true;
    } else {
      allPlaylist[index].songs = [...currentPlaylist];
      currentPlaylist = new Set;
      document.querySelector('#currentPlaylist').innerHTML = "";
    }
  }
}





// Function to Play Next Song
function playNext() {
  if (currentSong.id !== currentPlaylingList[currentPlaylingList.length - 1].id) {
    let index = currentPlaylingList.findIndex((elem) => elem.id === currentSong.id) + 1;
    if (index !== -1) {
      let obj = currentPlaylingList[index];
      currentSong = currentPlaylingList[index];

      document.getElementById("musicBodyImageBox2").style.backgroundImage = `url(${obj.img})`;
      document.getElementById("currentSongName").textContent = obj.name;
      document.getElementById("currentSongArtist").textContent = obj.artist;
      document.getElementById("currentSong").src = obj.source;
      document.getElementById("currentSong").autoplay = true;
    }
  }
}





// Function to Play Previous Song
function playPrev() {
  if (currentSong.id !== currentPlaylingList[0].id) {
    let index = currentPlaylingList.findIndex((elem) => elem.id === currentSong.id) - 1;
    if (index !== -1) {
      let obj = currentPlaylingList[index];
      currentSong = currentPlaylingList[index];

      document.getElementById("musicBodyImageBox2").style.backgroundImage = `url(${obj.img})`;
      document.getElementById("currentSongName").textContent = obj.name;
      document.getElementById("currentSongArtist").textContent = obj.artist;
      document.getElementById("currentSong").src = obj.source;
      document.getElementById("currentSong").autoplay = true;
    }
  }
}





// Function to Search Song
function searchSongList() {
  let song = document.getElementById("searchSong").value;
  let songSearch = '';
  const searchSongList = document.querySelector('#searchSongList');

  if (song.trim()) {
    for (let i of songData) {
      if (i.name.trim().toLowerCase().includes(song.trim().toLowerCase())) {
        songSearch +=
          `<div class="songItem point-text" accessKey=${i.id} onclick="renderCurrentSong(this)">
            ${i.name} - ${i.artist}
          </div>`;
      }
    }
  }
  searchSongList.innerHTML = songSearch;
}





// Function to Search Playlist
function searchPlayList() {
  let playlist = document.getElementById("searchPlaylistValue").value;
  let playlistSearch = '';
  const searchPlayList = document.querySelector('#searchPlayList');

  if (playlist.trim()) {
    for (let i of allPlaylist) {
      if (i.name.trim().toLowerCase().includes(playlist.trim().toLowerCase())) {
        playlistSearch +=
          `<div class="songItem songItemPlaylist text-center point-text" accessKey=${i.id} onclick="renderPlaylistSong(this)">
            <div>${i.name}</div>
          </div>`;
      }
    }
  }
  searchPlayList.innerHTML = playlistSearch;
}





// Event Listener for Theme Change Button
themeChange.addEventListener('click', () => {
  toggleTheme();
});

// Calling Function to display all songs
showSongs("");








