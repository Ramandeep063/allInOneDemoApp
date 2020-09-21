import React, { Component } from 'react';

export default class ImageCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spans: 0
    }
    this.imageRef = React.createRef();
  }

  componentDidMount() {
    this.imageRef.current.addEventListener('load', this.setSpans);
  }

  setSpans = () => {
    console.log('hello')
    console.log(this.imageRef.current.clientHeight)
  }

  render() {
    const { image } = this.props;

    return (
      <img
        ref={this.imageRef}
        alt='Loading'
        style={{ height: 200, width: 200 }}
        src={image} />
    )
  }
}
