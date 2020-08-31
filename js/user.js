// variables
window.app = new Vue({
  el: '#app',
  data: {
    leaderboard: [
          { rank: 1, name: 'Leo D.', score: 870},
          { rank: 2, name: 'Pam B.', score: 790},
          { rank: 3, name: 'Christos M.', score: 655},
          { rank: 26, name: 'Ioanna G.', score: 200, _rowVariant: 'info'}
        ],
    years: [{value:null, text: "-"},2016,2017,2018,2019,2020], // they will be imported from database based on the users record
    months: [{value:null, text: "-"},'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    from_year: null,
    to_year: null,
    from_month: null,
    to_month: null
  },
  computed: {
    showYears(){ //generates years for the "to-year" field
      if (this.from_year!=null){
        document.getElementById("to-year").disabled = false;
      }
      else {
        document.getElementById("to-year").disabled = true;
        this.to_year=null
      }
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
        document.getElementById("to-month").disabled = false;
      }
      else {
        document.getElementById("to-month").disabled = true;
        this.to_month=null
      }
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
      document.getElementById(sel_page).style.display = "block"
      //scroll to top
      window.scrollTo(0,0) // for safari
      //document.documentElement.scrollTop = 0; // for chrome, firefox, ie and opera
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
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [{
          label: 'Eco Points',
          backgroundColor: "#BDEDA5",
          borderColor: "#BDEDA5",
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
          var active_day = day_chart.data.labels[transport_data[label]["day_data"].indexOf(active_day_points)]
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
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
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
