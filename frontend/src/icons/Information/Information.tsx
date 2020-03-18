import React from 'react';

interface Props {
  color: string;
  width?: string;
  height?: string;
}

export default class Information extends React.Component<Props> {
  render() {
    return (
      <svg
        width={this.props.width}
        height={this.props.height}
        viewBox="0 0 76 76"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Information" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Group" fill="#3657FF" fillRule="nonzero">
            <path
              d="M38,0 C17.0468,0 0,17.0470303 0,38.0002303 C0,58.9534303 17.0468,76 38,76 C58.9532,76 76,58.9534303 76,38.0002303 C76,17.0470303 58.9532,0 38,0 Z M38,69.0909091 C20.8562424,69.0909091 6.90909091,55.1437576 6.90909091,38.0002303 C6.90909091,20.856703 20.8562424,6.90909091 38,6.90909091 C55.1437576,6.90909091 69.0909091,20.856703 69.0909091,38.0002303 C69.0909091,55.1437576 55.1435273,69.0909091 38,69.0909091 Z"
              id="Shape"
            />
            <path
              d="M39,16 C36.2429486,16 34,18.244 34,21.00225 C34,23.758 36.2429486,26 39,26 C41.7570514,26 44,23.758 44,21.00225 C44,18.244 41.7570514,16 39,16 Z"
              id="Path"
            />
            <path
              d="M38,31 C36.3432,31 35,32.6230333 35,34.625 L35,56.375 C35,58.3769667 36.3432,60 38,60 C39.6568,60 41,58.3769667 41,56.375 L41,34.625 C41,32.6230333 39.6568,31 38,31 Z"
              id="Path"
            />
          </g>
        </g>
      </svg>
    );
  }
}
