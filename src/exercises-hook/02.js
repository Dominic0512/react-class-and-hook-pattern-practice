// Compound Components

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

// 💯 Support rendering non-Toggle components within Toggle without incurring warnings in the console.
// for example, try to render a <span>Hello</span> inside <Toggle />

// Don't make changes to the Usage component. It's here to show you how your
// component is intended to be used and is used in the tests.
// You can make all the tests pass by updating the Toggle component.
function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return (
    <Toggle onToggle={onToggle}>
      <Toggle.On>The button is on</Toggle.On>
      <Toggle.Off>The button is off</Toggle.Off>
      <Toggle.Button />
      <div>The is button postfix.</div>
    </Toggle>
  )
}
Usage.title = 'Compound Components'

export {Toggle, Usage as default}
