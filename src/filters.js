import Vue from "vue"

let filters = {
  formatDatetime(value) {
    return new Date(value).toLocaleString()
  },

  capitalize(value) {
    if (!value) return ""
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}

// Register All Filters on import
Object.keys(filters).forEach(function(filterName) {
  Vue.filter(filterName, filters[filterName])
})
