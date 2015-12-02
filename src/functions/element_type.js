import isString from 'lodash/lang/isString'
import isFunction from 'lodash/lang/isFunction'


export default function elementType(el) {
  if (isString(el.type)) {
    return el.type
  }
  if (isFunction(el.type)) {
    const functionString = el.type.toString()
    const [functionName] = /^function ([\w\d]+)/.exec(functionString).slice(1)
    return functionName
  }
  console.warn('Unknown element type: ', el)
}
