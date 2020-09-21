import React, { Component } from 'react';


export default class VideoScreen extends Component {
  constructor(props) {
    super(props);
  }

  sendSelectedVideoDetails = () => {
    this.props.onSelectVideo(this.props.video);
  }
  componentDidMount() {
    console.log('called dshfdhnfbdhjfbdkjfmn');
    if (this.props.index === 0) {
      this.props.defaultSelectedVideo(this.props.video);
    }
  }


  render() {
    const { video } = this.props;

    return (
      <div
        style={{ float: 'right', width: '410px', marginBottom: 5, justifyContent: 'center' }}
        onClick={this.sendSelectedVideoDetails}
      >
        <img
          style={{ float: 'left', width: '205px', height: '110px' }}
          src={video.snippet.thumbnails.medium.url}
        />
        <p style={{ float: 'right', width: '205px', alignSelf: 'center' }}
        >{video.snippet.title}</p>
      </div>
    )
  }
}