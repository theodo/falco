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
        <g
          id="Close"
          stroke={this.props.color}
          strokeWidth="5"
          fill={this.props.color}
          fillRule="evenodd"
        >
          <g
            id="Group"
            transform="translate(-0.000000, 0.000000)"
            stroke={this.props.color}
            strokeWidth={this.props.strokeWidth}
          >
            <path d="M0,76 L76,0" id="Path-2" />
            <path
              d="M1.01333333,76 L77.0133333,0"
              id="Path-2"
              transform="translate(39.013333, 38.000000) scale(-1, 1) translate(-39.013333, -38.000000) "
            />
          </g>
        </g>
      </svg>
    );
  }
}
