const fetch = require('isomorphic-unfetch')
const querystring = require('querystring');

let clientId
let clientSecret
let refreshToken

if (process.env.NODE_ENV === 'development') {
  const dotenv = require('dotenv')
  const envVariables = dotenv.config().parsed

  clientId = envVariables.SPOTIFY_CLIENT_ID
  clientSecret = envVariables.SPOTIFY_CLIENT_SECRET
  refreshToken = envVariables.SPOTIFY_REFRESH_TOKEN
} else {
  clientId = process.env.SPOTIFY_CLIENT_ID
  clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  refreshToken = process.env.SPOTIFY_REFRESH_TOKEN
}

const client_id = clientId;
const client_secret = clientSecret;
const refresh_token = refreshToken;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

module.exports = async function getAccessToken () {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token
    })
  });

  return response.json();
};