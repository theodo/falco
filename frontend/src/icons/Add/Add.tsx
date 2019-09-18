import React from 'react';

interface Props {
  color: string;
  width?: string;
  height?: string;
  strokeWidth?: string;
}

export default class Add extends React.Component<Props> {
  render() {
    return (
      <svg
        width={this.props.width}
        height={this.props.height}
        viewBox="0 0 24 24"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M 12 2 C 6.486 2 2 6.486 2 12 C 2 17.514 6.486 22 12 22 C 17.514 22 22 17.514 22 12 C 22 6.486 17.514 2 12 2 z M 12 4 C 16.411 4 20 7.589 20 12 C 20 16.411 16.411 20 12 20 C 7.589 20 4 16.411 4 12 C 4 7.589 7.589 4 12 4 z M 11 8 L 11 11 L 8 11 L 8 13 L 11 13 L 11 16 L 13 16 L 13 13 L 16 13 L 16 11 L 13 11 L 13 8 L 11 8 z"
          stroke={this.props.color}
          fill={this.props.color}
        />
      </svg>
    );
  }
}
