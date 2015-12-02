import React from 'react'
import isString from 'lodash/lang/isString'

export default function textContent(element) {
  if (typeof element === 'string') {
    return element
  }
  if (!element.props || !element.props.children) {
    return ''
  }
  if (typeof element.props.children === 'string') {
    return element.props.children
  }
  return React.Children.toArray(element.props.children).map((el) => isString(el) ? el : textContent(el)).join('')
}
