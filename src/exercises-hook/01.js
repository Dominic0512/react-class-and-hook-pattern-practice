// Building the toggle component

import React from 'react'
// 🐨 uncomment this import to get the switch component.
// It takes an `onClick` and an `on` prop
import {Switch} from '../switch'

function Toggle(props) {
  //-- Solution1
  const [on, setOn] = React.useState(false)
  const toggle = React.useCallback(() => {
    const newOn = !on
    setOn(newOn)
    props.onToggle(newOn)
  }, [on, props])
  return <Switch on={on} onClick={toggle} />

  //-- Solution2
  // const [on, toggle] = React.useState(false)

  // React.useEffect(() => {
  //   props.onToggle(on)
  // }, [on, props])

  // return <Switch on={on} onClick={() => toggle(!on)} />

  //-- Solution3
  // const [on, setOn] = React.useState(false)

  // const toggle = React.useCallback(() => {
  //   setOn(!on)
  // }, [on])

  // React.useEffect(() => {
  //   props.onToggle(on)
  // }, [on, props])

  // return <Switch on={on} onClick={toggle} />
}

// Don't make changes to the Usage component. It's here to show you how your
// component is intended to be used and is used in the tests.
// You can make all the tests pass by updating the Toggle component.
function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return <Toggle onToggle={onToggle} />
}
Usage.title = 'Build Toggle'

export {Toggle, Usage as default}
