window.app = new Vue({
  el: '#app',
  data: {
    name: ''
  },
  computed: {
    showAlert() {
      return this.name.length > 4 ? true : false
    }
  }
});

window.app = new Vue({
  el: '#loader',
  data: {
    name: ''
  },
  computed: {
    showAlert() {
      return this.name.length > 4 ? true : false
    }
  }
});

$(window).on('load',function() {
  document.getElementById("loader").style.visibility = "hidden";
  document.getElementById("app").style.visibility = "visible";
});

function myFunction() {
  alert("Hello! I am an alert box!");
};
