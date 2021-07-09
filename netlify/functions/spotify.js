const fetch = require('isomorphic-unfetch')
const getAccessToken = require('./server/fetch-spotify-token')

const SPOTIFY_API_URL= 'https://api.spotify.com/v1/me/player/currently-playing';

const getHeaders = (token) => {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
};


const responseHeaders = {
  "Access-Control-Allow-Origin": "*"
}

exports.handler = async function fetchSpotifyCurrentPlaying(event, context) {
  let spotifyCurrentPlayingData = null;
  let error = null; 
  
  const tokenData = await getAccessToken();
  const token = tokenData.access_token
  const headers = getHeaders(token)

  try {
    const response = await fetch(SPOTIFY_API_URL, {
      headers
    }).then(async res => {
      return {
        spotifyData: res.status === 204 ? null : await res.json(),
        responseMetaData: res
      }
    })
 
    if (response.responseMetaData.status === 204) {
      return {
        statusCode: response.responseMetaData.status,
        error: "no data",
        headers: responseHeaders
      }
    }

    if ( response.responseMetaData.status >=400 && response.responseMetaData.status < 600) {
      return {
        statusCode: response.responseMetaData.status,
        error: 'Something went wrong',
        headers: responseHeaders
      }
    }

    const songData = response.spotifyData
    
    const artistText = songData?.item?.artists?.reduce((acc, artist, index) => {
      if (index === 0) return acc + artist.name + "'s"
      return acc + ` and ${artist.name}'s`
    }, '')
    

    if ( response ) {
      const data = {
        isPlaying: songData?.is_playing,
        artistText,
        songName: songData.item?.name,
        songUrl: songData.item?.external_urls?.spotify
      }
  
      return {
        statusCode: 200,
        body: JSON.stringify(data),
        headers: responseHeaders
      }
    }

    return {
      statusCode: 500,
      error: 'Something went wrong',
      headers: responseHeaders
    }

  } catch (e) {
    console.log(e)
    return {
      statusCode: 500,
      error: 'Something went wrong',
      headers: responseHeaders
    }
  }

  return {
    statusCode: 500,
    error: 'Something went wrong',
    headers: responseHeaders
  }
}


