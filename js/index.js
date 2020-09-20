// variables
window.app = new Vue({
  el: '#app',
  data: {
    login_email:'',
    login_password:'',
    firstname:'',
    firstnameState: null,
    lastname:'',
    lastnameState: null,
    email:'',
    emailState: null,
    password:'',
    passwordState: null,
  },
  created() {
    axios.get('/db/check_user.php')
    .then(function (response){
      if(response.data){
      window.location.href = "common.html"
      }
    })
  },
  computed: {
    firstnameValidate(){
      this.firstnameState = this.firstname.length == 0 ? null : true
      return this.firstnameState
    },
    lastnameValidate(){
      this.lastnameState = this.lastname.length == 0 ? null : true
      return this.lastnameState
    },
    emailValidate(){
      this.emailState = this.email.length == 0 ? null : /\w+[@]\w+[.]\w+/.test(this.email)
      return this.emailState
    },
    passwordValidate() {
      this.passwordState = this.password.length == 0 ? null : (this.password.length >= 8) && /[A-Z]/.test(this.password) && /[0-9]/.test(this.password) && /[^A-Z^a-z^0-9]/.test(this.password)
      return this.passwordState
    }
  },
  methods: {
    logIn(){
      event.preventDefault() //prevents page reload after button submit
      login_email = this.login_email;
      login_password = this.login_password;
      axios.post('/db/login.php',{'email': this.login_email, 'password': this.login_password})
      .then(function (response) {
        if (response.data != null){
          window.location = 'common.html'
        }
        else{
          alert("Δεν βρέθηκε λογαριασμός")
        }
      })
      .catch(function (error) {
        console.log(error);
      })
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
      event.preventDefault() //prevents page reload after button submit
      if (this.firstnameState & this.lastnameState & this.emailState & this.passwordState){
        axios.post('/db/signup.php',{'name': this.firstname+' '+this.lastname, 'email': this.email, 'password':this.password})
        .then(function (response) {
          if(response.data == 'ok'){
            alert("Η εγγραφή σας ολοκληρώθηκε με επιτυχία")
          }
          else{
            alert("Η εγγραφή σας απέτυχε λόγω σφάλματος")
          }
          location.reload();
        })
        .catch(function (error) {
          console.log(error);
        })
      }
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
