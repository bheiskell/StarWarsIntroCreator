import { h, Component } from 'preact';
import {
  INITIAL_PAGE,
  REQUEST_PAGE,
  FINAL_PAGE,
  NOT_QUEUED,
} from './constants';

import NotQueuedPage from './NotQueuedPage';
import RequestDownloadPage from './RequestDownloadPage';

class DownloadPage extends Component {
  constructor(props) {
    super(props);
    const { status, openingKey } = props;

    this.state = {
      status,
      openingKey,
      page: INITIAL_PAGE,
      donate: true,
    };
  }

  yesDonateHandle = () => {
    this.setState({
      page: REQUEST_PAGE,
      donate: true,
    });
  };

  noDonateHandle = () => {
    this.setState({
      page: REQUEST_PAGE,
      donate: false,
    });
  };

  finishRequestHandle = (requestStatus) => {
    this.setState({
      page: FINAL_PAGE,
      requestStatus, // TODO FINAL PAGE
    });
  }

  renderInitialPage() {
    const { status, openingKey } = this.state;
    const statusType = status.status;
    switch (statusType) {
      default:
      case NOT_QUEUED:
        return (
          <NotQueuedPage
            status={status}
            openingKey={openingKey}
            yesDonateHandle={this.yesDonateHandle}
            noDonateHandle={this.noDonateHandle}
          />
        );
    }
  }

  render() {
    const { page, openingKey, donate } = this.state;
    switch (page) {
      default:
      case INITIAL_PAGE:
        return this.renderInitialPage();

      case REQUEST_PAGE:
        return (
          <RequestDownloadPage
            donate={donate}
            openingKey={openingKey}
            yesDonateHandle={this.yesDonateHandle}
            finishRequestHandle={this.finishRequestHandle}
          />
        );
    }
  }
}

export default DownloadPage;
