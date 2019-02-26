import * as React from 'react';
import { PageType } from 'redux/pages/types';

export type Props = {
  pageId: string;
  page?: PageType;
};

class PageMetric extends React.Component<Props> {
  render() {
    const { page } = this.props;
    if (!page) return null;
    return (
      <React.Fragment>
        <div>
          {page.name}{' '}
          <a href={page.url} target="_blank">
            Link
          </a>
        </div>
      </React.Fragment>
    );
  }
}

export default PageMetric;
