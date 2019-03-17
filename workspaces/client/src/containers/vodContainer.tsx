import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { GlobalState } from '@/store/_state';
import { VODState } from '@/store/vod/state';
import { VODAction, actions, actionsType } from '@/store/vod/actions';
import PlayerComponent from '@/player';

interface Props {
  state: VODState;
  actions: actionsType;
}

class VODContainer extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div>
        <button onClick={this.props.actions.requestVideo}>サンプル動画を取得・再生</button>
        { this.props.state.video &&
          <div>
            <p>
              videoId: {this.props.state.video.id}<br />
              title: {this.props.state.video.title}<br />
              desc: {this.props.state.video.desc}
            </p>
            <PlayerComponent src={this.props.state.video.url}></PlayerComponent>
          </div>
        }
      </div>
    );
  }
}

export default connect(
  (state: GlobalState) => ({ state: state.vod }),
  (dispatch: Dispatch<VODAction>) => ({ actions: bindActionCreators(actions, dispatch) })
)(VODContainer);
