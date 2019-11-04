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
        viewBox="0 0 76 76"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          id="Arrow-/-Dark"
          stroke={this.props.color}
          stroke-width="5"
          fill={this.props.color}
          fill-rule="evenodd"
          stroke-linecap="square"
        >
          <g id="Arrow" transform="translate(18.000000, 0.000000)">
            <path d="M0.692307692,0 L39.5,38" id="Line-4" />
            <path
              d="M0.692307692,38 L39.5,76"
              id="Line-4"
              transform="translate(20.096154, 57.000000) scale(1, -1) translate(-20.096154, -57.000000) "
            />
          </g>
        </g>
      </svg>
    );
  }
}
