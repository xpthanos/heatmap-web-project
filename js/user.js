window.app = new Vue({
  el: '#app',
  data: {
    items: [
          { rank: 1, name: 'Leo D.', score: 870},
          { rank: 2, name: 'Pam B.', score: 790},
          { rank: 3, name: 'Christos M.', score: 655},
          { rank: 26, name: 'Ioanna G.', score: 200, _rowVariant: 'info'}
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

var element = document.getElementById('progress_chart').getContext('2d');
var chart = new Chart(element, {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
            label: 'Eco Points',
            backgroundColor: 'rgb(187, 219, 138)',
            borderColor: 'rgb(187, 219, 138)',
            data: [0, 10, 5, 2, 20, 30, 45, 20, 14, 40, 30, 10]
        }]
    },
    options: {
      legend: {
        display: false
      },
      maintainAspectRatio: false
    }
});

function hideLoader(){
  document.getElementById("loader").style.visibility = "hidden"
  document.getElementById("app").style.visibility = "visible"
}
