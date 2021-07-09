const endpointUrl = '/.netlify/functions/spotify'

const APIURL = process.env.ELEVENTY_ENV === 'development'
  ? `http://localhost:8081${endpointUrl}` : endpointUrl

const spotifyContainerEl = document.getElementById('spotify--container')
fetch(APIURL).then(res => res.json()).then(song => {
  const spotifyArtistEl = document.getElementById('spotify--artists')
  const spotifySongLinkEl = document.getElementById('spotify--song-link')
  const spotifyStatusEl = document.getElementById('spotify--play-status')

  spotifyContainerEl.classList.add('layout-show')
  spotifyContainerEl.classList.remove('layout-hide')

  if (!song) {
    return
  }

  if (
    song.artistText
    && song.songUrl
    && song.songName
  ) {
    spotifyArtistEl.textContent = song.artistText
    spotifySongLinkEl.href = song.songUrl
    spotifySongLinkEl.textContent = song.songName
    spotifyStatusEl.textContent = song.isPlaying ? 'Currently playing: ' : 'Was playing a while back: '
  }
}).catch(() => {
  spotifyContainerEl.classList.add('layout-show')
  spotifyContainerEl.classList.remove('layout-hide')
})