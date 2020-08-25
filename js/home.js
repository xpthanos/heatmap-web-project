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
      this.passwordState = (this.password.length >= 8) && /[A-Z]/.test(this.password) && /[0-9]/.test(this.password) && /[^A-Z^a-z^0-9]/.test(this.password)
      return this.password.length == 0 ? null : this.passwordState // if the field is empty do not show format warning
    }
  },
  methods: {
    logIn(){

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
function hideLoader(){
  document.getElementById("loader").style.visibility = "hidden"
  document.getElementById("app").style.visibility = "visible"
}
