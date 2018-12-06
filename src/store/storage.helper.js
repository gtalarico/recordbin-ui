class VueLocalStorage {
  static getKeyName(name) {
    return `recordbin:${name}`
  }

  getItem(key, def) {
    const keyName = VueLocalStorage.getKeyName(key)
    const strValue = localStorage.getItem(keyName) || def
    return strValue ? JSON.parse(strValue) : null
  }

  setItem(key, value) {
    const keyName = VueLocalStorage.getKeyName(key)
    const strValue = JSON.stringify(value)
    localStorage.setItem(keyName, strValue)
  }

  clearItem(key) {
    const keyName = VueLocalStorage.getKeyName(key)
    localStorage.removeItem(keyName)
  }
}

export default new VueLocalStorage()
