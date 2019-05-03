import React from 'react';

interface Props {
  color: string;
  width?: string;
  height?: string;
}

export default class Logo extends React.Component<Props> {
  render() {
    return (
      <svg
        width={this.props.width}
        height={this.props.height}
        viewBox="0 0 426.667 426.667"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          fill={this.props.color}
          points="213.333,10.441 279.249,144.017 426.667,165.436 320,269.41 345.173,416.226 213.333,346.91
    81.485,416.226 106.667,269.41 0,165.436 147.409,144.017 "
        />
      </svg>
    );
  }
}
