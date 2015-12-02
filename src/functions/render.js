import React from 'react'
import TestUtils from 'react-addons-test-utils'

export default function render(children) {
  const renderer = TestUtils.createRenderer()
  renderer.render(children)
  return renderer.getRenderOutput()
}
