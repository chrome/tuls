import React from 'react'
import uniq from 'lodash/array/uniq'
import isObject from 'lodash/lang/isObject'

import elementType from './element_type'

function parseLevels(selector) {
  const result = selector.split(/ +/).map((level) => {
    const [tag, className] = /^([\w\d]+)?(\.[\w\d-_]+)?$/.exec(level).slice(1)
    return {tag, className: className ? className.substr(1) : className}
  })
  return result
}

function haveClass(el, className) {
  if (el.props) {
    return (' ' + el.props.className + ' ').indexOf(` ${className} `) > -1
  } else {
    return false
  }
}

function elementMatch(el, selector) {
  if (selector.tag && elementType(el) !== selector.tag) {
    return false
  }
  if (selector.className && !haveClass(el, selector.className)) {
    return false
  }
  if (!selector.tag && !selector.className) {
    console.warn('Incorrect selector', selector)
    return false
  }
  return true
}

function findDeep(parent, selector, itsRoot = true) {
  if (!isObject(parent)) {
    return []
  }
  let results = itsRoot ? [] : (elementMatch(parent, selector) ? [parent] : [])
  React.Children.forEach(parent.props.children, (el) => {
    results = results.concat(findDeep(el, selector, false))
  })
  return results
}

export default function find(parent, selector) {
  const levels = parseLevels(selector)
  let results = [parent]
  let prevResults = []
  levels.forEach((level) => {
    let nextResults = []
    results.map((el) => {
      if (!prevResults.includes(el)) {
        nextResults = nextResults.concat(findDeep(el, level))
      }
    })
    prevResults = results
    results = nextResults
  })
  results = uniq(results)
  switch(results.length) {
    case 0:
      return null
    case 1:
      return results[0]
  }
  return results
}
