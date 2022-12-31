import React from 'react';
import './App.css';

import { Playlist } from '../Playlist/Playlist';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';

import Spotify from '../../util/Spotify';

 export class App extends React.Component {
  constructor(props) {
    super(props)
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.state = {
      searchResults: [],
      playlistName: '',
      playlistTracks: []
    }
  }

  addTrack(track) {
    if(this.state.playlistTracks.find(plTrack => plTrack.id === track.id)) {
      return;
    }

    const newPlaylist = this.state.playlistTracks;
    newPlaylist.push(track);
    this.setState({ playlistTracks: newPlaylist });
  }

  removeTrack(track) {
    const newPlaylist = this.state.playlistTracks.filter(plTrack => {return plTrack.id !== track.id});
    this.setState({ playlistTracks: newPlaylist });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({
      playlistName: '',
      playlistTracks: []
    });
  }

  search(term) {
    Spotify.search(term).then(searchResults => {

      // filter results for tracks which are already in the playlist
      const playlistTrackIDs = this.state.playlistTracks.map(track => track.id);
      console.log(playlistTrackIDs);
      playlistTrackIDs.forEach(id => {
        searchResults = searchResults.filter(track => track.id !== id);
      });

      this.setState({ searchResults: searchResults });
    });
  }
  
  render() {
    return (
      <div>
        <h1>Ja<span className='highlight'>mmm</span>ing</h1>
        <div className='App'>
          <SearchBar onSearch={this.search} />
          <div className='App-playlist'>
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist 
              plName={this.state.playlistName} 
              plTracks={this.state.playlistTracks} 
              onRemove={this.removeTrack} 
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    )
  }
}
