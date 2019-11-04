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
        viewBox="0 0 24 24"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Close-Icon" stroke="none" fill="none" fillRule="evenodd" strokeLinecap="round">
          <path
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
            stroke={this.props.color}
            strokeWidth={this.props.strokeWidth || "4"}
          />
          <path d="M0 0h24v24H0z" fill="none" />
        </g>
      </svg >
    );
  }
}
