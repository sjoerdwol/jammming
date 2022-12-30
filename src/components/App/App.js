import React from 'react';
import './App.css';
import { Playlist } from '../Playlist/Playlist';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';

 export class App extends React.Component {
  constructor(props) {
    super(props)
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
  
  render() {
    return (
      <div>
        <h1>Ja<span className='highlight'>mmm</span>ing</h1>
        <div className='App'>
          <SearchBar />
          <div className='App-playlist'>
            <SearchResults searchResults={this.state.searchResults} />
            <Playlist plName={this.state.playlistName} plTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    )
  }
}
