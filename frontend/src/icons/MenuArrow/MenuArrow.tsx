import React from 'react';

interface Props {
  color: string;
  width?: string;
  height?: string;
}

export default class MenuArrow extends React.Component<Props> {
  render() {
    return (
      <svg
        width={this.props.width}
        height={this.props.height}
        viewBox="0 0 10 16"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          id="Symbols"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
          strokeLinecap="square"
        >
          <g id="MenuArrow" transform="translate(1.000000, 1.000000)" stroke={this.props.color}>
            <path d="M0.307692308,0 L7.69230769,7" id="Line-4" />
            <path
              d="M0.307692308,7 L7.69230769,14"
              id="Line-4"
              transform="translate(4.000000, 10.500000) scale(1, -1) translate(-4.000000, -10.500000) "
            />
          </g>
        </g>
      </svg>
    );
  }
}
