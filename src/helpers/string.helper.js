export const objectToQueryString = (obj = {}, prefix = null) => {
  const str = []

  for (const p in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, p)) {
      const k = prefix ? prefix + '[' + p + ']' : p
      const v = obj[p]
      str.push(
        v !== null && typeof v === 'object'
          ? objectToQueryString(v, k)
          : encodeURIComponent(k) + '=' + encodeURIComponent(v)
      )
    }
  }

  return str.join('&')
}
