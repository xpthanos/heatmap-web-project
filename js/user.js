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

var element = document.getElementById('progress_chart').getContext('2d');
var chart = new Chart(element, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45]
        }]
    },

    // Configuration options go here
    options: {
      legend: {
        display: false
      },
      responsive: {
        responsive: false,
        maintainAspectRatio: false
      }
    }
});

function hideLoader(){
  document.getElementById("loader").style.visibility = "hidden"
  document.getElementById("app").style.visibility = "visible"
}
