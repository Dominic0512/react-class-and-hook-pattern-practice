import React from 'react'
import { Switch } from '../switch'
import { useDidUpdateEffect } from './util';

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args))

function Toggle(props) {
  const [on, setOn] = React.useState(false)

  const toggle = React.useCallback(
    () => {
      setOn(!on)
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
      toggle,
      getTogglerProps,
    }), 
    [on, toggle, getTogglerProps],
  )
  
  useDidUpdateEffect(() => {
    props.onToggle(on)
  }, [on, props])

  return props.children(getStateAndProps())
}

// Don't make changes to the Usage component. It's here to show you how your
// component is intended to be used and is used in the tests.
// You can make all the tests pass by updating the Toggle component.
function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
  onButtonClick = () => console.log('onButtonClick'),
}) {
  return (
    <Toggle onToggle={onToggle}>
      {({on, getTogglerProps}) => (
        <div>
          <Switch {...getTogglerProps({on})} />
          <hr />
          <button
            {...getTogglerProps({
              'aria-label': 'custom-button',
              onClick: onButtonClick,
              id: 'custom-button-id',
            })}
          >
            {on ? 'on' : 'off'}
          </button>
        </div>
      )}
    </Toggle>
  )
}
Usage.title = 'Prop Getters'

export {Toggle, Usage as default}
