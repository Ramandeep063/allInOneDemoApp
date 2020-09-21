import React, { Component } from 'react';
import SearchBar from './searchbar';
import Loader from 'react-loader-spinner';
import { Link } from "react-router-dom";
import VideoScreen from './videoScreen';

export default class SearchVideos extends Component {
  state = {
    searchedVideos: [],
    isSearching: false,
    isDataFound: null,
    isBottomReached: false,
    selectedVideo: {}
  }

  onGetResults = (res) => {
    console.log(res);
    if (res.data.items.length === 0) {
      this.setState({
        searchedVideos: res.data.items,
        isDataFound: false
      });
      return;
    }
    this.setState({ searchedVideos: [...res.data.items] });
  }

  getStatus = (status) => {
    if (status === 'searching') {
      this.setState({ isSearching: true });
    } else {
      this.setState({ isSearching: false });
    }
  }

  defaultSelectedVideo = (selectedVideo) => {
    console.log(selectedVideo);
    this.setState({ selectedVideo });
  }

  onSelectVideo = (selectedVideo) => {
    console.log(selectedVideo);
    this.setState({ selectedVideo });
  }

  render() {
    const url = `https://www.youtube.com/embed/`;
    return (
      <div
        className='ui container'
        style={{
          marginTop: '10px',
        }}>
        <SearchBar
          onGetResults={this.onGetResults}
          getStatus={this.getStatus}
          isBottomReached={this.state.isBottomReached}
          placeholder='search videos'
          searchFor='videos'
          label='Video Search'
        />
        <Loader
          visible={this.state.isSearching}
          type='ThreeDots'
          color="#00BFFF"
          height={100}
          width={100}
        />
        <Link to="/">Instead search photos</Link>

        <div >
          {typeof this.state.selectedVideo.id !== 'undefined' &&
            <div style={{
              float: 'left',
              width: '650px',
            }}>
              <iframe
                width='680px'
                height='440px'
                src={`${url}${this.state.selectedVideo.id.videoId}`}>
              </iframe>
              <p>{this.state.selectedVideo.snippet.title}</p>
            </div>
          }
          <div>
            {
              this.state.searchedVideos.map((video, index) => {
                return (
                  <VideoScreen
                    key={index.toString()}
                    video={video}
                    onSelectVideo={this.onSelectVideo}
                    defaultSelectedVideo={this.defaultSelectedVideo}
                    index={index}
                  />
                )
              })
            }
          </div>
        </div>
      </div>
    );
  }
}