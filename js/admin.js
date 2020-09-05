// variables
window.app = new Vue({
  el: '#app',
  data: {
  },
  computed: {
  },
  methods: {
    showPage(sel_page){
      //hide and show elements
      document.getElementById("dashboard").style.display = "none"
      document.getElementById("map").style.display = "none"
      document.getElementById(sel_page).style.display = "block"
      //scroll to top
      window.scrollTo(0,0) // for safari
      //document.documentElement.scrollTop = 0; // for chrome, firefox, ie and opera
    },
    getStats: function(){
        axios.get('db/stats.php')
        .then(function (response) {
            console.log(response.data);
            app.stat_div = response.data;

        })
        .catch(function (error) {
            console.log(error);
        });
    }
  }
})

window.app = new Vue({
  el: '#loader'
})

var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

var ratio_canvas = document.getElementById('ratio_chart');
var ratio_chart = new Chart(ratio_canvas.getContext('2d'), {
    type: 'doughnut',
    data: {
      labels: ['Όχημα', 'Ποδήλατο','Με τα πόδια', 'Περπάτημα', 'Τρέξιμο', 'Ακινησία', 'Υπο κλίση', 'Άγνωστο'],
      datasets: [{
        backgroundColor: ["#EDA8A7", "#ECE1A5", "#BDEDA5", "#A6EDC9", "#A6D5ED", "#B3A6EE", "#D0A6EE", "#F2BCE0"],
        data: [10, 20, 30, 15, 15, 0, 0, 0]
        }]
    },
    options: {
      legend: {
        display: false
      },
      maintainAspectRatio: false,
      tooltips: {
        callbacks: {
          label: function(tooltipItem, data) {
            return data.labels[tooltipItem.index]+": "+data.datasets[0].data[tooltipItem.index]+"%"
          }
        }
      },
      onHover: function (evt) {
        var element = ratio_chart.getElementsAtEvent(evt)[0]
        if (element) {
          var label = ratio_chart.data.labels[element._index]
          document.getElementById("activity").innerHTML = label
        }
      }
    }
})

var hour_canvas = document.getElementById('hour_chart');
var hour_chart = new Chart(hour_canvas.getContext('2d'), {
    type: 'bar',
    data: {
        labels: timeRange(),
        datasets: [{
            label: 'Εγγραφές',
            backgroundColor: '#BDEDA5',
            data: range(1,24)
        }]
    },
    options: {
      legend: {
        display: false
      },
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true,
            }
        }]
      }
    }
})

var day_canvas = document.getElementById('day_chart');
var day_chart = new Chart(day_canvas.getContext('2d'), {
    type: 'bar',
    data: {
        labels: ['Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο', 'Κυριακή'],
        datasets: [{
            label: 'Εγγραφές',
            backgroundColor: '#BDEDA5',
            data: range(1,7)
        }]
    },
    options: {
      legend: {
        display: false
      },
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
      }
    }
})

var month_canvas = document.getElementById('month_chart').getContext('2d');
var month_chart = new Chart(month_canvas, {
    type: 'line',
    data: {
      labels: ['Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος', 'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος'],
      datasets: [{
          label: 'Εγγραφές',
          backgroundColor: "#BDEDA5",
          borderColor: "#BDEDA5",
          data: [0, 1, 5, 10, 20, 8, 45, 3, 3, 45, 23, 22]
      }]
    },
    options: {
      legend: {
        display: false
      },
      maintainAspectRatio: false
    }
})

var year_canvas = document.getElementById('year_chart').getContext('2d');
var year_chart = new Chart(year_canvas, {
    type: 'line',
    data: {
      labels: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
      datasets: [{
          label: 'Εγγραφές',
          backgroundColor: "#BDEDA5",
          borderColor: "#BDEDA5",
          data: [0, 1, 5, 10, 20, 8, 45, 3, 3, 45, 23, 22]
      }]
    },
    options: {
      legend: {
        display: false
      },
      maintainAspectRatio: false
    }
})

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

function timeRange(){ //generate array with per hour strings
  var array = []
  for (i=1;i<=24;i++){
    array.push(i+":00")
  }
  return array
}
