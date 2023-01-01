let accessToken;
const clientID = process.env.REACT_APP_SPOTIFY_CLIENT;
const redirectURI = 'http://localhost:3000/';

const Spotify = {
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
  },

  search(term) {
    //get access token from own method
    const accessToken = Spotify.getAccessToken();

    //fetch the search results using the term
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }).then(response => {
            return response.json();
          }).then(jsonResponse => {
            //if there are no matching tracks, return an empty array
            if(!jsonResponse.tracks) {
              return [];
            }

            //if there are matching tracks, return an array of all tracks as objects with the following keys
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                album: track.album.name, 
                artist: track.artists[0].name,
                uri: track.uri
            }));
          });
  },

  savePlaylist(name, trackURIs) {
    if(!name || !trackURIs.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userID;

    // get userID
    return fetch('https://api.spotify.com/v1/me', { headers: headers })
    .then(response => response.json())
    .then(jsonResponse => {
      userID = jsonResponse.id;
      // create a new playlist using the just fetched user id
      return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, 
        {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({ name: name })
        }
      )
      .then(response => response.json())
      .then(jsonResponse => {
        const playlistID = jsonResponse.id;
        // fill the new playlist using the new playlist id
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
          {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({ uris: trackURIs })
          }
        )
      });
    });
  }
}

export default Spotify;
