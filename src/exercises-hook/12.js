import React, { Fragment } from 'react'
import {Switch} from '../switch'
import { useDidUpdateEffect } from './util';

const ToggleContext = React.createContext();

function Toggle(props) {
  const [on, toggle] = React.useState(false)

  const handleToggle = (on) => () => toggle(on);

  useDidUpdateEffect(() => {
    props.onToggle(on)
  }, [on, props])

  const contextProps = React.useMemo(() => ({on, toggle: handleToggle}), [on, toggle])

  return (
    <ToggleContext.Provider value={contextProps}>
      {props.children}
    </ToggleContext.Provider>
  )
}


const Layer1 = () => <Layer2 />
const Layer2 = () => {
  const { on } = React.useContext(ToggleContext)
  return (
    <Fragment>
      {on ? 'The button is on' : 'The button is off'}
      <Layer3 />
    </Fragment>
  )
}
const Layer3 = () => <Layer4 />
const Layer4 = () => {
  const { on, toggle } = React.useContext(ToggleContext)

  return (
    <Switch on={on} onClick={toggle(!on)} />
  )
}

function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return (
    <Toggle onToggle={onToggle}>
      <Layer1 />
    </Toggle>
  )
}
Usage.title = 'Higher Order Components'

export {Toggle, Usage as default}
