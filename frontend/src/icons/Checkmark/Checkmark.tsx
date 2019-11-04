import React from 'react';

interface Props {
  color: string;
  width?: string;
  height?: string;
  strokeWidth?: string;
}

export default class Checkmark extends React.Component<Props> {
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
          id="Checkmark"
          stroke={this.props.color}
          stroke-width="1"
          fill={this.props.color}
          fill-rule="evenodd"
        >
          <g
            id="Group"
            fill={this.props.color}
            fill-rule="nonzero"
            stroke={this.props.color}
            stroke-width={this.props.strokeWidth}
          >
            <polygon
              id="Path"
              points="24.1818182 60.119403 6.04545455 36.2985075 0 44.238806 24.1818182 76 76 7.94029851 69.9545455 0"
            />
          </g>
        </g>
      </svg>
    );
  }
}
