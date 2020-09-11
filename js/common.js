// variables
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
var full_months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
var days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
var full_days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
var map = { max: 2, data: []};
var cfg = {
  // radius should be small ONLY if scaleRadius is true (or small radius is intended)
  // if scaleRadius is false it will be the constant radius used in pixels
  "radius": 90,
  "maxOpacity": .8,
  // scales the radius based on map zoom
  "scaleRadius": false,
  // if set to false the heatmap uses the global maximum for colorization
  // if activated: uses the data maximum within the current map boundaries
  //   (there will always be a red spot with useLocalExtremas true)
  "useLocalExtrema": false,
  // which field name in your data represents the latitude - default "lat"
  latField: 'lat',
  // which field name in your data represents the longitude - default "lng"
  lngField: 'lng',
  // which field name in your data represents the data value - default "value"
  valueField: 'count'
};
var admin_heatmap_layer = new HeatmapOverlay(cfg);
window.app = new Vue({
  el: '#app',
  data: {
    username: "Ioanna Gogou",
    points: 200,
    data_start: "10-10-20",
    data_end: "10-10-20",
    last_upload: "10-10-20",
    curr_year: new Date().getFullYear(),
    last_month: full_months[new Date().getMonth()-1],
    leaderboard: [
          { rank: 1, name: 'Leo D.', score: 870},
          { rank: 2, name: 'Pam B.', score: 790},
          { rank: 3, name: 'Christos M.', score: 655},
          { rank: 26, name: 'Ioanna G.', score: 200, _rowVariant: 'info'}
        ],
    years: [{value:null, text: "-"},2016,2017,2018,2019,2020], // they will be imported from database based on the user's records
    months: [{value:null, text: "-"}].concat(months),
    from_year: null,
    to_year: null,
    from_month: null,
    to_month: null,
    map_data: null
  },
  computed: {
    showYears(){ //generates years for the "to-year" field
      if (this.from_year!=null){
        document.getElementById("to-year").disabled = false
      }
      else {
        document.getElementById("to-year").disabled = true
        this.to_year=null
      }
      if (this.from_year>this.to_year) this.to_year = null
      var after_years = [{value:null, text: "-"}] //years available after "from-year"
      for (var year of this.years){
        if (year!=null) {
          if (year>this.from_year){
            after_years.push(year)
          }
        }
      }
      return after_years
    },
    showMonths(){ //generates months for the "to-month" field
      if (this.from_month!=null){
        document.getElementById("to-month").disabled = false
      }
      else {
        document.getElementById("to-month").disabled = true
        this.to_month=null
      }
      if (this.from_month>this.to_month) this.to_month = null
      var after_months = [{value:null, text: "-"}] //months available after "from-month"
      for (var month of this.months){
        if (month!=null) {
          if (this.months.indexOf(month)>this.months.indexOf(this.from_month)){
            after_months.push(month)
          }
        }
      }
      return after_months
    }
  },
  methods: {
    showPage(sel_page){
      //hide and show elements

      document.getElementById("overview").style.display = "none"
      document.getElementById("analysis").style.display = "none"
      document.getElementById("upload").style.display = "none"
      document.getElementById("dashboard").style.display = "none"
      document.getElementById("map").style.display = "none"
      document.getElementById(sel_page).style.display = "block"
      if(sel_page=="map"){this.getMapData();admin_heatmap.invalidateSize()} // redraw heatmap to fix resize issue;}
      if(sel_page=="analysis"){user_heatmap.invalidateSize()}; // redraw heatmap to fix resize issue}
    },
    getStats: function(){
        axios.get('db/stats.php')
        .then(function (response) {
            console.log(response.data);
            app.contacts = response.data;

        })
        .catch(function (error) {
            console.log(error);
        });
    },
    getMapData: function() {
      axios.get('test.php')
      .then(function (response){
        map.data = response.data;
        console.log(map);
        admin_heatmap_layer.setData(map);
        admin_heatmap.addLayer(admin_heatmap_layer);
      })
    }
  }
})

window.app = new Vue({
  el: '#loader'
})

var progress_canvas = document.getElementById('progress_chart').getContext('2d');
var progress_chart = new Chart(progress_canvas, {
    type: 'line',
    data: {
      labels: months,
      datasets: [{
          label: 'Eco Points',
          backgroundColor: "rgba(90,152,255,0.2)",
          borderColor: "rgba(90,152,255,1)",
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
      onHover: function (evt) { //updates hour chart and day chart with data for specific activity
        var element = ratio_chart.getElementsAtEvent(evt)[0]
        if (element) {
          var label = ratio_chart.data.labels[element._index]
          var color = ratio_chart.data.datasets[0].backgroundColor[element._index]
          var active_hour_points = Math.max.apply(Math,transport_data[label]["hour_data"])
          var active_hour = hour_chart.data.labels[transport_data[label]["hour_data"].indexOf(active_hour_points)]
          var active_day_points = Math.max.apply(Math,transport_data[label]["day_data"])
          var active_day = full_days[transport_data[label]["day_data"].indexOf(active_day_points)]
          document.getElementById("activity").innerHTML = label
          document.getElementById("active-hour").innerHTML = "Most active hour: "+active_hour
          document.getElementById("active-day").innerHTML = "Most active day: "+active_day
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
        labels: timeRange(),
        datasets: [{
            label: 'Records',
            backgroundColor: '#c7c7c7',
            data: []
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
        labels: days,
        datasets: [{
            label: 'Records',
            backgroundColor: '#c7c7c7',
            data: []
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

var user_heatmap = L.map('user-heatmap', { dragging: !L.Browser.mobile }).setView([38.230462,21.753150], 12);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    minZoom: 12,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoiam9hbmdvZyIsImEiOiJja2VpcWJ2NTMyOG00MnNtaWpqejlxYTAwIn0.x3iJFQ5cNLEgBpDTQXfciA',
    dragging: !L.Browser.mobile
}).addTo(user_heatmap);
user_heatmap.scrollWheelZoom.disable();

var transport_data = {
  "Vehicle": {
    "hour_data": range(1,24),
    "day_data":[10, 20, 30, 15, 15, 0, 0, 0],
  },
  "Bicycle": {
    "hour_data": range(1,24),
    "day_data":[6, 30, 40, 15, 50, 20, 10, 5],
  },
  "On Foot": {
    "hour_data": range(1,24),
    "day_data":[50, 20, 30, 55, 15, 0, 40, 0],
  },
  "Walking": {
    "hour_data": range(1,24),
    "day_data":[40, 80, 20, 15, 5, 30, 75, 20],
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

var admin_heatmap = L.map('admin-heatmap', {dragging: !L.Browser.mobile}).setView([38.2, 21.7], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    minZoom: 3,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoid2VicHJvajIwMjAiLCJhIjoiY2tlazRydmlnMHBjMjJ5cGlybnZvM2x5YyJ9.LHhwAHv1LV6kPzfOy4Y3VA',
}).addTo(admin_heatmap);
admin_heatmap.scrollWheelZoom.disable()


var ratio_canvas2 = document.getElementById('ratio_chart2');
var ratio_chart2 = new Chart(ratio_canvas2.getContext('2d'), {
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

var hour_canvas2 = document.getElementById('hour_chart2');
var hour_chart2 = new Chart(hour_canvas2.getContext('2d'), {
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

var day_canvas2 = document.getElementById('day_chart2');
var day_chart2 = new Chart(day_canvas2.getContext('2d'), {
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
