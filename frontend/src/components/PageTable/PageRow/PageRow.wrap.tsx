import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { getPage } from 'redux/entities/pages/selectors';
import { RootState } from 'redux/types';
import { OwnProps, PageRow } from './PageRow';

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  page: getPage(state, props.pageId || ""),
});


export default connect(
  mapStateToProps,
)(injectIntl(PageRow));
