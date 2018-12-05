import Vue from "vue"

Vue.filter("formatTime", function(value) {
  return new Date(value).toLocaleString()
})
