window.app = new Vue({
  el: '#app',
  data: {
    items: [
          { rank: 1, name: 'Leo D.'},
          { rank: 2, name: 'Pam B.'},
          { rank: 3, name: 'Christos M.'},
          { rank: 26, name: 'Ioanna G.', _rowVariant: 'info'}
        ]
  },
  computed: {
  },
  methods: {
    }
})

window.app = new Vue({
  el: '#loader'
})

function hideLoader(){
  document.getElementById("loader").style.visibility = "hidden"
  document.getElementById("app").style.visibility = "visible"
}
