import React, { Fragment } from 'react'
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

const Layer1 = () => <Layer2 />
const Layer2 = () => (
  <Fragment>
    <Toggle.On>The button is on</Toggle.On>
    <Toggle.Off>The button is off</Toggle.Off>
    <Layer3 />
  </Fragment>
)
const Layer3 = () => <Layer4 />
const Layer4 = () => <Toggle.Button />

function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return (
    <Toggle onToggle={onToggle}>
      <Layer1 />
    </Toggle>
  )
}
Usage.title = 'Provider Pattern'

export {Toggle, Usage as default}
