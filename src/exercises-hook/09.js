import React from 'react'
import { Switch } from '../switch'
import { useStateWithCallback } from './util';

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args))

const Toggle = (props) => {
  const initialState = {
    on: props.initialOn
  }
  
  const [{ on }, setState] = useStateWithCallback(initialState);

  const internalSetState = React.useCallback(
    (changes, callback) => {
      setState(prevState => {
        return [changes]
          .map(c => typeof c === 'function' ? c(prevState): c)
          .map(c => props.stateReducer(prevState, c) || {})
          .map(({type, ...remainChanges}) => remainChanges)
          .map(c => Object.keys(c).length ? c : null )[0];
      }, callback);
    }, 
    [props.stateReducer]
  )

  const reset = React.useCallback(
    () => {
      internalSetState(
        { ...initialState, type: Toggle.actionTypes.reset }, 
        (prevState, state) => {
          props.onReset(state.on)
        }
      )
    },
    [initialState, props.onReset, internalSetState]
  )

  const toggle = React.useCallback(
    ({ type = Toggle.actionTypes.toggle } = {}) => {
      internalSetState(prevState => ({ 
        ...prevState,
        type,
        on: !on
      }), 
      (prevState, state) => props.onToggle(state.on))
    },
    [on, internalSetState, props.onToggle],
  )

  const getTogglerProps = React.useCallback(
    ({ onClick, ...props } = {}) => ({
      'aria-pressed': on,
      onClick: callAll(onClick, toggle),
      ...props,
    }), 
    [on, toggle]
  );

  const getStateAndProps = React.useCallback(
    () => ({
      on,
      reset,
      toggle,
      getTogglerProps,
    }), 
    [on, reset, toggle, getTogglerProps],
  )

  return props.children(getStateAndProps())
};

Toggle.defaultProps = {
  initialOn: false,
  onReset: () => {},
  stateReducer: (state, changes) => changes,
}

Toggle.actionTypes = {
  reset: '__reset__',
  toggle: '__toggle__',
}



class Usage extends React.Component {
  static defaultProps = {
    onToggle: (...args) => console.log('onToggle', ...args),
    onReset: (...args) => console.log('onReset', ...args),
  }
  initialState = {timesClicked: 0}
  state = this.initialState
  handleToggle = (...args) => {
    this.setState(({timesClicked}) => ({
      timesClicked: timesClicked + 1,
    }))
    this.props.onToggle(...args)
  }
  handleReset = (...args) => {
    this.setState(this.initialState)
    this.props.onReset(...args)
  }
  toggleStateReducer = (state, changes) => {
    if (changes.type === 'forced') {
      return changes
    }
    if (this.state.timesClicked >= 4) {
      return {...changes, on: false}
    }
    return changes
  }
  render() {
    const {timesClicked} = this.state
    return (
      <Toggle
        stateReducer={this.toggleStateReducer}
        onToggle={this.handleToggle}
        onReset={this.handleReset}
        ref={this.props.toggleRef}
      >
        {({on, toggle, reset, getTogglerProps}) => (
          <div>
            <Switch
              {...getTogglerProps({
                on: on,
              })}
            />
            {timesClicked > 4 ? (
              <div data-testid="notice">
                Whoa, you clicked too much!
                <br />
                <button onClick={() => toggle({type: 'forced'})}>
                  Force Toggle
                </button>
                <br />
              </div>
            ) : timesClicked > 0 ? (
              <div data-testid="click-count">
                Click count: {timesClicked}
              </div>
            ) : null}
            <button onClick={reset}>Reset</button>
          </div>
        )}
      </Toggle>
    )
  }
}
Usage.title = 'State Reducers (with change types)'

export {Toggle, Usage as default}

/* eslint
"no-unused-vars": [
  "warn",
  {
    "argsIgnorePattern": "^_.+|^ignore.+",
    "varsIgnorePattern": "^_.+|^ignore.+",
    "args": "after-used"
  }
]
 */
