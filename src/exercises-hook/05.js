import React from 'react'
import { Switch } from '../switch'
import { useDidUpdateEffect } from './util';

function Toggle(props) {
  const [on, setOn] = React.useState(false)

  const toggle = React.useCallback(
    () => {
      setOn(!on)
    },
    [on],
  )

  const getStateAndProps = React.useCallback(
    () => ({
      on,
      toggle,
      togglerProps: {
        'aria-pressed': on,
        onClick: toggle
      }
    }), 
    [on, toggle],
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
}) {
  return (
    <Toggle onToggle={onToggle}>
    {({on, togglerProps}) => (
      <div>
        <Switch on={on} {...togglerProps} />
        <hr />
        <button aria-label="custom-button" {...togglerProps}>
          {on ? 'on' : 'off'}
        </button>
      </div>
    )}
  </Toggle>
  )
}
Usage.title = 'Prop Collections'

export {Toggle, Usage as default}
