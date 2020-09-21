import React, { Component } from 'react';
import SearchBar from './searchbar';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from 'react-loader-spinner';
import { Link } from "react-router-dom";
import ImageCard from './imageCard';

export default class Home extends Component {
  state = {
    searchedPhotos: [],
    isSearching: false,
    isDataFound: null,
    isBottomReached: false
  }

  onGetResults = (res) => {
    if (res.data.results.length === 0) {
      this.setState({
        searchedPhotos: res.data.results,
        isDataFound: false
      });
      return;
    }
    this.setState({ searchedPhotos: [...this.state.searchedPhotos, ...res.data.results] });
  }

  getStatus = (status) => {
    if (status === 'searching') {
      this.setState({ isSearching: true });
    } else {
      this.setState({ isSearching: false });
    }
  }
  render() {
    return (
      <div
        className='ui container'
        style={{
          marginTop: '10px'
        }}>
        <SearchBar
          onGetResults={this.onGetResults}
          getStatus={this.getStatus}
          isBottomReached={this.state.isBottomReached}
          placeholder='search pics'
          label='Image Search'
        />
        <div>
          <Link to="/SearchVideos">Instead search videos</Link>
        </div>
        <div>
          <Link to="/QuizScreen">Want to play quiz?</Link>
        </div>
        <InfiniteScroll
          dataLength={this.state.searchedPhotos.length} //This is important field to render the next data
          next={() => {
            this.setState({ isBottomReached: true }, () => {
              setTimeout(() => {
                this.setState({ isBottomReached: false })
              }, 100);
            })
          }}
          hasMore={true}
          loader={<Loader
            visible={this.state.isSearching}
            type='ThreeDots'
            color="#00BFFF"
            height={100}
            width={100}
          />}
        >
          <div
            style={{ columns: 2 }}>
            {
              this.state.searchedPhotos.map(image => {
                return (
                  <div key={image.id}>
                    <ImageCard
                      image={image.urls.small}
                    />
                  </div>
                )
              })
            }
          </div>
        </InfiniteScroll>
        {
          !this.state.isDataFound &&
          <p>
            No data found
        </p>
        }
      </div>
    );
  }
}