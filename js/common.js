// variables
var months = ['Ιαν', 'Φεβ', 'Μαρ', 'Απρ', 'Μαι', 'Ιουν', 'Ιουλ', 'Auγ', 'Σεπ', 'Οκτ', 'Νοε', 'Δεκ']
var full_months = ['Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος', 'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος']
var days = ['Δευ', 'Τρι', 'Τετ', 'Πεμ', 'Παρ', 'Σαβ', 'Κυρ']
var full_days = ['Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο', 'Κυριακή']
var activities = ['Όχημα', 'Ποδήλατο','Με τα πόδια', 'Ακινησία']
var transport_data = {
  "Όχημα": {
    "hour_data": range(1,24),
    "day_data":[10, 20, 30, 15, 15, 0, 0, 0],
  },
  "Ποδήλατο": {
    "hour_data": range(1,24),
    "day_data":[6, 30, 40, 15, 50, 20, 10, 5],
  },
  "Με τα πόδια": {
    "hour_data": range(1,24),
    "day_data":[50, 20, 30, 55, 15, 0, 40, 0],
  },
  "Ακινησία": {
    "hour_data": range(1,24),
    "day_data":[10, 20, 30, 15, 15, 0, 0, 0],
  }
}

// main window app
window.app = new Vue({
  el: '#app',
  data: {
    username: "<username>",
    points: 0,
    data_start: "<start-date>",
    data_end: "<end-date>",
    last_upload: "<date>",
    curr_year: new Date().getFullYear(),
    last_month: full_months[new Date().getMonth()-1],
    leaderboard_fields: [{key:"rank", label:"Θέση"},{key:"name", label:"Όνομα"},{key:"points", label:"Πόντοι"}],
    leaderboard: [
          { rank: 1, name: 'Leo D.', points: 870},
          { rank: 2, name: 'Pam B.', points: 790},
          { rank: 3, name: 'Christos M.', points: 655},
          { rank: 26, name: 'Ioanna G.', points: 200, _rowVariant: 'primary'}
        ],
    years: [{value:null, text: "-"},2016,2017,2018,2019,2020], // they will be imported from database based on the user's records
    months: [{value:null, text: "-"}].concat(months),
    days: [{value:null, text:"-"}].concat(full_days),
    hours: [{value:null, text:"-"},0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    from_year: null,
    to_year: null,
    from_month: null,
    to_month: null,
    from_year_admin: null,
    to_year_admin: null,
    from_month_admin: null,
    to_month_admin: null,
    from_day:null,
    to_day:null,
    from_hour:null,
    to_hour:null,
  },
  created() {
    axios.get('/db/check_user.php')
    .then(function (response){
      if(response.data){
        if(response.data == 'user'){
          document.getElementById('nav-dashboard').style.display = "none"
          document.getElementById('nav-map').style.display = "none"
          document.getElementById("overview").style.display = "block"
        }
        else if(response.data == 'admin'){
          document.getElementById('nav-overview').style.display = "none"
          document.getElementById('nav-analysis').style.display = "none"
          document.getElementById('nav-upload').style.display = "none"
          document.getElementById("dashboard").style.display = "block"
        }
      }
      else{
        window.location.href = "index.html"
      }
    })
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
    },
      showYearsAdmin(){ //generates years for the "to-year" field
      if (this.from_year_admin!=null){
        document.getElementById("to-year-admin").disabled = false
      }
      else {
        document.getElementById("to-year-admin").disabled = true
        this.to_year_admin=null
      }
      if (this.from_year_admin>this.to_year_admin) this.to_year_admin = null
      var after_years = [{value:null, text: "-"}] //years available after "from-year"
      for (var year of this.years){
        if (year!=null) {
          if (year>this.from_year_admin){
            after_years.push(year)
          }
        }
      }
      return after_years
    },
    showMonthsAdmin(){ //generates months for the "to-month" field
      if (this.from_month_admin!=null){
        document.getElementById("to-month-admin").disabled = false
      }
      else {
        document.getElementById("to-month-admin").disabled = true
        this.to_month_admin=null
      }
      if (this.from_month_admin>this.to_month_admin) this.to_month_admin = null
      var after_months = [{value:null, text: "-"}] //months available after "from-month"
      for (var month of this.months){
        if (month!=null) {
          if (this.months.indexOf(month)>this.months.indexOf(this.from_month_admin)){
            after_months.push(month)
          }
        }
      }
      return after_months
    },
    showDays(){ //generates months for the "to-month" field
      if (this.from_day!=null){
        document.getElementById("to-day").disabled = false
      }
      else {
        document.getElementById("to-day").disabled = true
        this.to_day=null
      }
      if (this.from_day>this.to_day) this.to_day = null
      var after_days = [{value:null, text: "-"}] //months available after "from-month"
      for (var day of this.days){
        if (day!=null) {
          if (this.days.indexOf(day)>this.days.indexOf(this.from_day)){
            after_days.push(day)
          }
        }
      }
      return after_days
    },
    showHours(){ //generates months for the "to-month" field
      if (this.from_hour!=null){
        document.getElementById("to-hour").disabled = false
      }
      else {
        document.getElementById("to-hour").disabled = true
        this.to_hour=null
      }
      if (this.from_hour>this.to_hour) this.to_hour = null
      var after_hours = [{value:null, text: "-"}] //months available after "from-month"
      for (var hour of this.hours){
        if (hour!=null) {
          if (this.hours.indexOf(hour)>this.hours.indexOf(this.from_hour)){
            after_hours.push(hour)
          }
        }
      }
      return after_hours
    }


  },
  methods: {
    showTab(sel_tab){
      //hide and show elements
      document.getElementById("overview").style.display = "none"
      document.getElementById("analysis").style.display = "none"
      document.getElementById("upload").style.display = "none"
      document.getElementById("dashboard").style.display = "none"
      document.getElementById("map").style.display = "none"
      document.getElementById(sel_tab).style.display = "block"
      if(sel_tab=='overview'){
      }
      else if(sel_tab=="map"){
        this.getAdminMapData()
        admin_heatmap.invalidateSize()// redraw heatmap to fix resize issue;}
      }
      else if(sel_tab=="analysis"){user_heatmap.invalidateSize()}; // redraw heatmap to fix resize issue}

    },
    getOverviewData() {
      axios.get('/db/overview.php')
      .then(function (response){
        alert(response.data)
      })
      .catch(function (error) {
          console.log(error);
      });
    },
    getUserMapData() {
      axios.get('/db/user_heatmap.php')
      .then(function (response){
        admin_heatmap_data.data = response.data;
        var admin_heatmap_layer = new HeatmapOverlay(heatmap_cfg);
        admin_heatmap_layer.setData(admin_heatmap_data);
        admin_heatmap.addLayer(admin_heatmap_layer);
      })
      .catch(function (error) {
          console.log(error);
      });
    },
    getAdminStats(){
        axios.get('db/stats.php')
        .then(function (response) {
            app.contacts = response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    getAdminMapData() {
      axios.get('/db/test.php')
      .then(function (response){
        admin_heatmap_data.data = response.data;
        var admin_heatmap_layer = new HeatmapOverlay(heatmap_cfg);
        admin_heatmap_layer.setData(admin_heatmap_data);
        admin_heatmap.addLayer(admin_heatmap_layer);
      })
      .catch(function (error) {
          console.log(error);
      });
    },
    logOut(){
      axios.get('/db/logout.php')
      .then(function (response){
      })
      .catch(function (error) {
          console.log(error);
      });
      window.location = 'index.html'
    },
  }
})

// loader app
window.app = new Vue({
  el: '#loader'
})

// heatmaps
var heatmap_cfg = {
  "radius": 25,
  "maxOpacity": .8,
  "scaleRadius": false,
  "useLocalExtrema": false,
  latField: 'lat',
  lngField: 'lng',
  valueField: 'count'
};

var user_heatmap_data = { max: 2, data: []}
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

var admin_heatmap_data = { max: 2, data: []}
var admin_heatmap = L.map('admin-heatmap', {dragging: !L.Browser.mobile}).setView([38.230462,21.753150], 12);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    minZoom: 12,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoid2VicHJvajIwMjAiLCJhIjoiY2tlazRydmlnMHBjMjJ5cGlybnZvM2x5YyJ9.LHhwAHv1LV6kPzfOy4Y3VA',
}).addTo(admin_heatmap);

//charts
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
      labels: activities,
      datasets: [{
        backgroundColor: ["#EDA8A7", "#ECE1A5", "#BDEDA5", "#A6D5ED"],
        data: [10, 20, 30, 15]
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
          document.getElementById("active-hour").innerHTML = "Πιο ενεργή ώρα: "+active_hour
          document.getElementById("active-day").innerHTML = "Πιο ενεργή ημέρα: "+active_day
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

var ratio_canvas2 = document.getElementById('ratio_chart2');
var ratio_chart2 = new Chart(ratio_canvas2.getContext('2d'), {
    type: 'doughnut',
    data: {
      labels: activities,
      datasets: [{
        backgroundColor: ["#EDA8A7", "#ECE1A5", "#BDEDA5", "#A6D5ED"],
        data: [20, 20, 30, 15]
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
        labels: full_days,
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
      labels: full_months,
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
      labels: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'], //we will import only available years from db
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

// Vue.component declaration for Upload:

Vue.component('file-upload', {
  template: '#upload',
  data(){
    return {
      dragAndDropCapable: false,
      files: [],
      uploadPercentage: 0
    }
  },
  mounted(){
    /*
      Determine if drag and drop functionality is capable in the browser
    */
    this.dragAndDropCapable = this.determineDragAndDropCapable();

    /*
      If drag and drop capable, then we continue to bind events to our elements.
    */
    if( this.dragAndDropCapable ){
      /*
        Listen to all of the drag events and bind an event listener to each
        for the fileform.
      */
      ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach( function( evt ) {
        /*
          For each event add an event listener that prevents the default action
          (opening the file in the browser) and stop the propagation of the event (so
          no other elements open the file in the browser)
        */
        this.$refs.fileform.addEventListener(evt, function(e){
          e.preventDefault();
          e.stopPropagation();
        }.bind(this), false);
      }.bind(this));

      /*
        Add an event listener for drop to the form
      */
      this.$refs.fileform.addEventListener('drop', function(e){
        /*
          Capture the files from the drop event and add them to our local files
          array.
        */
        for( let i = 0; i < e.dataTransfer.files.length; i++ ){
          this.files.push( e.dataTransfer.files[i] );
        }
      }.bind(this));
    }
  },

  methods: {
    /*
      Determines if the drag and drop functionality is in the
      window
    */
    determineDragAndDropCapable(){
      /*
        Create a test element to see if certain events
        are present that let us do drag and drop.
      */
      var div = document.createElement('div');

      /*
        Check to see if the `draggable` event is in the element
        or the `ondragstart` and `ondrop` events are in the element. If
        they are, then we have what we need for dragging and dropping files.

        We also check to see if the window has `FormData` and `FileReader` objects
        present so we can do our AJAX uploading
      */
      return ( ( 'draggable' in div )
              || ( 'ondragstart' in div && 'ondrop' in div ) )
              && 'FormData' in window
              && 'FileReader' in window;
    },

    /*
      Submits the files to the server
    */
    submitFiles(){
      /*
        Initialize the form data
      */
      let formData = new FormData();

      /*
        Iteate over any file sent over appending the files
        to the form data.
      */
      for( var i = 0; i < this.files.length; i++ ){
        let file = this.files[i];

        formData.append('files[' + i + ']', file);
      }

      /*
        Make the request to the POST /file-drag-drop-instant URL
      */
      axios.post( '/file-drag-drop-instant',
        formData,
        {
          headers: {
              'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: function( progressEvent ) {
            this.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) );
          }.bind(this)
        }
      ).then(function(){
        console.log('SUCCESS!!');
      })
      .catch(function(){
        console.log('FAILURE!!');
      });
    }
  }
}
)

new Vue({ el: '#upload'})

// Vue.component declaration over




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
