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
            <Playlist />
          </div>
        </div>
      </div>
    )
  }
}
