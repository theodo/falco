import React from 'react';

interface Props {
  color: string;
  width?: string;
  height?: string;
  strokeWidth?: string;
}

export default class Close extends React.Component<Props> {
  render() {
    return (
      <svg
        width={this.props.width}
        height={this.props.height}
        viewBox="0 0 76 76"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Close-Icon" stroke="none" fill="none" fillRule="evenodd" strokeLinecap="round">
          <path
            d="M2.04268536,73.9573146 L74.1217669,1.87823315"
            id="Path-2"
            stroke={this.props.color}
            strokeWidth={this.props.strokeWidth || "4"}
          />
          <path
            d="M2.04268536,73.9573146 L74.1217669,1.87823315"
            id="Path-2"
            stroke={this.props.color}
            strokeWidth={this.props.strokeWidth || "4"}
            transform="translate(38.500000, 37.500000) scale(-1, 1) translate(-38.500000, -37.500000) "
          />
        </g>
      </svg>
    );
  }
}
