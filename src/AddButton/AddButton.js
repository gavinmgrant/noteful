import React from 'react'
import './AddButton.css'

export default function AddButton(props) {
  const { tag, className, children, ...otherProps } = props

  return React.createElement(
    props.tag,
    {
      className: ['AddButton', props.className].join(' '),
      ...otherProps
    },
    props.children
  )
}

AddButton.defaultProps ={
  tag: 'a',
}