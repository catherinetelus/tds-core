/* eslint-disable no-param-reassign */
const isObject = obj => obj && typeof obj === 'object'

const deepMerge = (...objects) => {
  return objects
    .filter(obj => isObject(obj))
    .reduce((prev, obj) => {
      Object.keys(obj).forEach(key => {
        const pVal = prev[key]
        const oVal = obj[key]

        if (Array.isArray(pVal) && Array.isArray(oVal)) {
          prev[key] = pVal.concat(...oVal)
        } else if (isObject(pVal) && isObject(oVal)) {
          prev[key] = deepMerge(pVal, oVal)
        } else {
          prev[key] = oVal
        }
      })

      return prev
    }, {})
}

export default deepMerge