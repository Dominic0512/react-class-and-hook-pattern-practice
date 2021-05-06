import React from 'react'
import { Switch } from '../switch'
import { useDidUpdateEffect } from './util';

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args))
function Toggle(props) {
  const initialState = {
    on: props.initialOn
  }
  
  const [{ on }, setState] = React.useState(initialState);

  const reset = React.useCallback(
    () => {
      setState(initialState)
      props.onReset(initialState.on);
    },
    [initialState, props.onReset]
  )

  const toggle = React.useCallback(
    () => {
      setState(prevState => ({ 
        ...prevState,
        on: !on
      }))
    },
    [on],
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
  
  useDidUpdateEffect(() => {
    props.onToggle(on)

  }, [on, props.onToggle])

  return props.children(getStateAndProps())
}

Toggle.defaultProps = {
  initialOn: false,
  onReset: () => {},
}
function Usage({
  initialOn = false,
  onToggle = (...args) => console.log('onToggle', ...args),
  onReset = (...args) => console.log('onReset', ...args),
}) {
  return (
    <Toggle
      initialOn={initialOn}
      onToggle={onToggle}
      onReset={onReset}
    >
      {({getTogglerProps, on, reset}) => (
        <div>
          <Switch {...getTogglerProps({on})} />
          <hr />
          <button onClick={() => reset()}>Reset</button>
        </div>
      )}
    </Toggle>
  )
}
Usage.title = 'State Initializers'

export {Toggle, Usage as default}
