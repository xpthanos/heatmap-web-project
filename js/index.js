// variables
window.app = new Vue({
  el: '#app',
  data: {
    login_email:'',
    login_password:'',
    firstname:'',
    lastname:'',
    email:'',
    password:'',
    passwordState:null
  },
  computed: {
    passwordValidate() {
      this.passwordState = (this.password.length >= 8) && /[A-Z]/.test(this.password) && /[0-9]/.test(this.password) && /[^A-Z^a-z^0-9]/.test(this.password)
      return this.password.length == 0 ? null : this.passwordState // if the field is empty do not show format warning
    }
  },
  methods: {
    logIn(){
      login_email = this.login_email
      login_password = this.login_password
      alert("email: "+login_email+"\npass: "+login_password)


    },
    cancel() {
      this.firstname=''
      this.lastname=''
      this.email=''
      this.password=''
      this.passwordState=null
      this.$bvModal.hide("signup")
    },
    signUp(){
      alert("Signed up!")

    }
  }
})

window.app = new Vue({
  el: '#loader'
})

// functions
function hideLoader(){
  document.getElementById("loader").style.display = "none"
  document.getElementById("app").style.display = "block"
}
