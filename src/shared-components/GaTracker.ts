import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import * as ga from 'react-ga';

interface GaTrackerProps {
  children?: any;
}

type Props = GaTrackerProps & RouteComponentProps<any>;

class GaTracker extends React.PureComponent<Props, {}> {
  constructor(props: Props) {
    super(props);

    if (process.env.NODE_ENV === 'production' && process.env.GA_ID) {
      ga.initialize(process.env.GA_ID);
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (process.env.NODE_ENV === 'production' && this.props.location !== prevProps.location) {
      ga.pageview(window.location.pathname);
    }
  }

  render() {
    const { children } = this.props;

    return children;
  }
}

export default withRouter(GaTracker);