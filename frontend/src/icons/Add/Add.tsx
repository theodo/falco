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
        viewBox="0 0 76 76"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          id="Add"
          stroke={this.props.color}
          strokeWidth="1"
          fill={this.props.color}
          fillRule="evenodd"
        >
          <g
            id="Group"
            fill={this.props.color}
            fillRule="nonzero"
            stroke={this.props.color}
            strokeWidth="0.5"
          >
            <path
              d="M38,0 C17.0468,0 0,17.0468 0,38 C0,58.9532 17.0468,76 38,76 C58.9532,76 76,58.9532 76,38 C76,17.0468 58.9532,0 38,0 Z M38,5 C56.195375,5 71,19.804625 71,38 C71,56.195375 56.195375,71 38,71 C19.804625,71 5,56.195375 5,38 C5,19.804625 19.804625,5 38,5 Z M33.25,19 L33.25,33.25 L19,33.25 L19,42.75 L33.25,42.75 L33.25,57 L42.75,57 L42.75,42.75 L57,42.75 L57,33.25 L42.75,33.25 L42.75,19 L33.25,19 Z"
              id="Shape"
            />
          </g>
        </g>
      </svg>
    );
  }
}
