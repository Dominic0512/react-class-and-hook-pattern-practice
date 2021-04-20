// Flexible Compound Components with context

import React from 'react'
import {Switch} from '../switch'
import { useDidUpdateEffect } from './util';

const ToggleContext = React.createContext();

function On({ children }) {
  const { on } = React.useContext(ToggleContext)
  return on ? children : null;
}

function Off({ children }) {
  const { on } = React.useContext(ToggleContext)
  return on ? null : children ;
}

function Button() {
  const { on, toggle } = React.useContext(ToggleContext)
  return <Switch on={on} onClick={() => toggle(!on)} />
}

function Toggle(props) {
  const [on, toggle] = React.useState(false)

  useDidUpdateEffect(() => {
    props.onToggle(on)
  }, [on, props])

  const contextProps = React.useMemo(() => ({on, toggle}), [on])

  return (
    <ToggleContext.Provider value={contextProps}>
      {props.children}
    </ToggleContext.Provider>
  )
}

Object.assign(Toggle, {
  On,
  Off,
  Button
})
function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return (
    <Toggle onToggle={onToggle}>
      <Toggle.On>The button is on</Toggle.On>
      <Toggle.Off>The button is off</Toggle.Off>
      <div>
        <Toggle.Button />
      </div>
    </Toggle>
  )
}
Usage.title = 'Flexible Compound Components'

export {Toggle, Usage as default}
