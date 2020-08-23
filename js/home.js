window.app = new Vue({
  el: '#app',
  data: {
    firstname:'',
    lastname:'',
    email:'',
    password:'',
    passwordState:null
  },
  computed: {
    passwordValidate() {
      this.passwordState = this.password.length >= 8 ? true : false
      return this.passwordState
    },
    cancelSignUp() {
      this.password = ''
      this.passwordState = null
    },
    okSignup(){
      alert("Signed up!")
    }
  }
});

window.app = new Vue({
  el: '#loader',
});

$(window).on('load',function() {
  document.getElementById("loader").style.visibility = "hidden";
  document.getElementById("app").style.visibility = "visible";
});
