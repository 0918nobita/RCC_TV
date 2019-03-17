import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { GlobalState } from '@/store/_state';
import { VODState } from '@/store/vod/state';
import { VODAction, actions, actionsType } from '@/store/vod/actions';

interface Props {
  state: VODState;
  actions: actionsType;
}

class VODContainer extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (<div><button onClick={this.props.actions.requestVideo}>request</button></div>);
  }
}

export default connect(
  (state: GlobalState) => ({ state: state.vod }),
  (dispatch: Dispatch<VODAction>) => ({ actions: bindActionCreators(actions, dispatch) })
)(VODContainer);
