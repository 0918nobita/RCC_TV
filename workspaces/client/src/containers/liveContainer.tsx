import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { GlobalState } from '@/store/_state';
import { VODAction, actions, actionsType } from '@/store/live/actions';
import { LiveState } from '@/store/live/state';

interface Props {
  state: LiveState;
  actions: actionsType;
}

class VODContainer extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div>
        <button onClick={this.props.actions.start}>SSE 受信開始</button>
        <p>Count: {this.props.state.count}</p>
      </div>
    );
  }
}

export default connect(
  (state: GlobalState) => ({ state: state.live }),
  (dispatch: Dispatch<VODAction>) => ({
    actions: bindActionCreators(actions, dispatch),
  })
)(VODContainer);
