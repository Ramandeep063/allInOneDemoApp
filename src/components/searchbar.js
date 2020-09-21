import React from 'react';
import { searchPhotosRoute, getYouTubeVideos } from '../config';


class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedText: '',
      isSearching: false,
      page: 1
    }
    this.timer = null;
  }

  static getDerivedStateFromProps(props, state) {
    if (props.isBottomReached) {
      searchPhotosRoute(state.searchedText, state.page + 1).then(res => {
        props.onGetResults(res);
      }).catch(e => console.log(e));
      return {
        page: state.page + 1,
      };
    }
    return null;
  }

  onChangeText = (evt) => {
    this.props.getStatus('searching');
    this.setState({ isSearching: true, searchedText: evt.target.value }, () => {
      this.timer = setTimeout(() => {
        if (typeof this.props.searchFor === 'undefined') {
          searchPhotosRoute(this.state.searchedText, this.state.page).then(res => {
            this.props.getStatus('searchingDone');
            this.props.onGetResults(res);
          }).catch(e => console.log(e));
        } else {
          getYouTubeVideos(this.state.searchedText).then(res => {
            this.props.getStatus('searchingDone');
            this.props.onGetResults(res);
          }).catch(() => {
            this.props.getStatus('searchingDone');
            this.props.onGetResults({
              data: {
                items: []
              }
            })
          });
        }
      }, 1000)
    });
  }

  componentDidUpdate() {
    if (this.timer !== null) {
      clearTimeout(this.timer);
    }
  }

  render() {
    return (
      <div className='ui segment'>
        <form className='ui form'>
          <div className='field'>
            <label>{this.props.label}</label>
            <input
              placeholder={this.props.placeholder}
              onChange={this.onChangeText}
              value={this.state.searchedText}
              type='text' />
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;