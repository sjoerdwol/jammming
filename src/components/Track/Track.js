import React from "react";

export class Track extends React.Component {
  renderAction() {
    const text = this.isRemoval ? '-' : '+';
    return <button className='Track-action'>{text}</button>
  }
  
  render() {
    return (
      <div className='Track'>
        <div className='Track-information'>
          <h3>trackname</h3>
          <p>artist | album</p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}