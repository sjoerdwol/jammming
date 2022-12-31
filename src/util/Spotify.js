let accessToken;
const clientID = '2179bde57822462c99310f6c8f06fab5';
const redirectURI = 'http://localhost:3000/';

class Spotify {
  getAccessToken() {
    if(accessToken) {
      return accessToken;
    }

    // this part was not taught at all and thus is a copy of the solution on youtube + my own explanations
    // check for access token match, returns the matching part of the current url
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    // if both are present, set the accessToken
    // it will be cleared, after it has expired
    if(accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      // if none or only one is present, redirect user to the authorize page of Spotify
      const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = accessURL;
    }
  }
}

export default Spotify;
