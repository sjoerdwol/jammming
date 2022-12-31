import React from 'react';
import './App.css';
import { Playlist } from '../Playlist/Playlist';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';

 export class App extends React.Component {
  constructor(props) {
    super(props)
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.state = {
      searchResults: [
        {name: 'Tanya', artist: 'Fred again', album: 'Fred 3', id: 1}, 
        {name: 'Lights out', artist: 'Fred again', album: 'Fred 2', id: 2}, 
        {name: 'Kenya', artist: 'Fred again', album: 'Fred 3', id: 3}
      ],
      playlistName: 'New Playlist',
      playlistTracks: [
        {name: 'Africa', artist: 'Toto', album: 'Africa', id: 4}, 
        {name: 'Hotel California', artist: 'The Eagles', album: 'HC', id: 5}, 
        {name: 'Bananenbrot', artist: 'Theo', album: 'THEEEEOO', id: 6}
      ]
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
    const trackURIs = this.state.playlistTracks.map(track => {return track.uri});
  }
  
  render() {
    return (
      <div>
        <h1>Ja<span className='highlight'>mmm</span>ing</h1>
        <div className='App'>
          <SearchBar />
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
