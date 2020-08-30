// variables
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
    showPage(sel_page){
      document.getElementById("overview").style.display = "none"
      document.getElementById("analysis").style.display = "none"
      document.getElementById("upload").style.display = "none"
      document.getElementById(sel_page).style.display = "block"
    },
  }
})

window.app = new Vue({
  el: '#loader'
})

var progress_canvas = document.getElementById('progress_chart').getContext('2d');
var progress_chart = new Chart(progress_canvas, {
    type: 'line',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [{
          label: 'Eco Points',
          backgroundColor: "#bbdb8a",
          borderColor: "#bbdb8a",
          data: [0, 10, 5, 2, 20, 30, 45, 20, 14, 40, 30, 10]
      }]
    },
    options: {
      legend: {
        display: false
      },
      maintainAspectRatio: false
    }
})
var ratio_canvas = document.getElementById('ratio_chart');
var ratio_chart = new Chart(ratio_canvas.getContext('2d'), {
    type: 'doughnut',
    data: {
      labels: ['Vehicle', 'Bicycle','On Foot', 'Walking', 'Running', 'Still', 'Tilting', 'Unknown'],
      datasets: [{
        label: "%",
        backgroundColor: ["#EDA8A7", "#ECE1A5", "#BDEDA5", "#A6EDC9", "#A6D5ED", "#B3A6EE", "#D0A6EE", "#F2BCE0"],
        data: [10, 20, 30, 15, 15, 0, 0, 0]
        }]
    },
    options: {
      legend: {
        display: false
      },
      maintainAspectRatio: false,
      onHover: function (evt) {
        var element = ratio_chart.getElementsAtEvent(evt)[0]
        if (element) {
          var label = ratio_chart.data.labels[element._index]
          var color = ratio_chart.data.datasets[0].backgroundColor[element._index]
          document.getElementById("test").innerHTML = label
          hour_chart.data.datasets[0].backgroundColor = color
          hour_chart.data.datasets[0].data = transport_data[label]["hour_data"]
          hour_chart.update()
          day_chart.data.datasets[0].backgroundColor = color
          day_chart.data.datasets[0].data = transport_data[label]["day_data"]
          day_chart.update()
        }
      }
    }
})

var hour_canvas = document.getElementById('hour_chart');
var hour_chart = new Chart(hour_canvas.getContext('2d'), {
    type: 'bar',
    data: {
        labels: range(1,24),
        datasets: [{
            label: 'Eco Points',
            backgroundColor: 'rgb(187, 219, 138)',
            data: [0, 10, 5, 2, 20, 30, 45, 20, 14, 40, 30, 10]
        }]
    },
    options: {
      legend: {
        display: false
      },
      maintainAspectRatio: false
    }
})

var day_canvas = document.getElementById('day_chart');
var day_chart = new Chart(day_canvas.getContext('2d'), {
    type: 'bar',
    data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [{
            label: 'Eco Points',
            backgroundColor: 'rgb(187, 219, 138)',
            data: [0, 10, 5, 2, 20, 30, 45]
        }]
    },
    options: {
      legend: {
        display: false
      },
      maintainAspectRatio: false
    }
})


var transport_data = {
  "Vehicle": {
    "hour_data": range(1,24),
    "day_data":[10, 20, 30, 15, 15, 0, 0, 0],
  },
  "Bicycle": {
    "hour_data": range(1,24),
    "day_data":[10, 20, 30, 15, 15, 0, 0, 0],
  },
  "On Foot": {
    "hour_data": range(1,24),
    "day_data":[10, 20, 30, 15, 15, 0, 0, 0],
  },
  "Walking": {
    "hour_data": range(1,24),
    "day_data":[10, 20, 30, 15, 15, 0, 0, 0],
  },
  "Running": {
    "hour_data": range(1,24),
    "day_data":[10, 20, 30, 15, 15, 0, 0, 0],
  },
  "Still": {
    "hour_data": range(1,24),
    "day_data":[10, 20, 30, 15, 15, 0, 0, 0],
  },
  "Tilting": {
    "hour_data": range(1,24),
    "day_data":[10, 20, 30, 15, 15, 0, 0, 0],
  },
  "Unknown": {
    "hour_data": range(1,24),
    "day_data":[10, 20, 30, 15, 15, 0, 0, 0],
  }
}

// functions
function hideLoader(){
  document.getElementById("loader").style.display = "none"
  document.getElementById("app").style.display = "block"
}

function range(start,end){ //generate array with values from start to end
  var array = []
  for (i=start;i<=end;i++){
    array.push(i)
  }
  return array
}
