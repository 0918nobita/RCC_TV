import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions, CounterAction, actionsType } from '@/store/counter/actions';
import { GlobalState } from '@/store/_state';
import { CounterState } from '@/store/counter/state';

interface Props {
  state: CounterState;
  actions: actionsType;
}

class Counter extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>Value: {this.props.state.count}</p>
        <button onClick={this.props.actions.increment}>Increment</button>
        <button onClick={this.props.actions.decrement}>Decrement</button>
      </div>
    );
  }
}

export default connect(
  (state: GlobalState) => ({ state: state.counter }),
  (dispatch: Dispatch<CounterAction>) => ({ actions: bindActionCreators(actions, dispatch) })
)(Counter);
