# tuls

A set of helpers for testing react components.

## Usage

```jsx
import React from 'react'
import {find, render, textContent, elementType} from 'tuls'

class CompByClass extends React.Component {
  render() {
    return (<div />)
  }
}

const CompByFunc = () => {
  return (<div />)
}

class TestComponent extends React.Component {
  render() {
    return (
      <div>
        <div className="first-div">
          <div className="first-div-child">
            {'Hel' + 'lo'}, <b>World</b>!
          </div>
          <i>a</i>
        </div>
        <div className="second-div">
          <div className="second-div-child">
            <i>b</i>
          </div>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <i>c</i>
        </div>
        <CompByClass a='1'>
          Hey
        </CompByClass>
        <CompByFunc b='2' />
      </div>
    )
  }
}

() => {
  const comp = render(<TestComponent />)
  const div = find(comp, 'div.first-div .first-div-child')
  const text = textContent(div)
  console.log(text) // Hello, World!

  const ps = find(comp, '.second-div p')
  const nums = ps.map((p) => textContent(p))
  console.log(nums) // ['1', '2', '3']

  const is = find(comp, 'i')
  const abc = is.map((i) => textContent(i))
  console.log(abc) // ['a', 'b', 'c']

  const cbc = find(comp, 'CompByClass')
  console.log(cbc.props, textContent(cbc)) // {a: 1, children: 'Hey'} 'Hey'

  console.log(elementType(cbc)) // 'CompByClass'

  const cbf = find(comp, 'CompByFunc')
  console.log(cbf.props) // {b: 2}
}()
```

## Todo
- [ ] Write specs
