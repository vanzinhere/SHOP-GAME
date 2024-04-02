firebase.auth().onAuthStateChanged((user) => {
   if (user) {
     // Pengguna telah login
     firebase.database().ref('users/' + user.uid).once('value').then(function(snapshot) {
               var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
               elemen.style.display = 'block';
               elemen.textContent = 'ID: '+user.uid;
               login.style.display = 'none';
               loginBtn.style.display = 'block';
               lgbtn.style.display = 'block';
               //window.location.href = 'index.html';
            });
   } else {
     // Tidak ada pengguna yang login
   }
});

/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
navToggle.addEventListener('click', () =>{
   navMenu.classList.add('show-menu')
})

/* Menu hidden */
navClose.addEventListener('click', () =>{
   navMenu.classList.remove('show-menu')
})

/*=============== LOGIN ===============*/
const login = document.getElementById('login'),
      loginBtn = document.getElementById('login-btn'),
      loginClose = document.getElementById('login-close'),
      daftarCuy = document.getElementById('daftar-cuy'),
      lupaCuy = document.getElementById('lupa-cuy'),
      dftr = document.getElementById('dftr'),
      lpw = document.getElementById('lupa-cuy'),
      submitbtn = document.getElementById('submit-btn'),
      logout = document.getElementById('log-btn'),
      elemen = document.getElementById('idakun'),
      lgbtn = document.getElementById('logbtn')


lgbtn.style.display = 'none';
elemen.style.display = 'none';
/* Login show */
loginBtn.addEventListener('click', () =>{
   firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // Pengguna telah login
        window.location.href = 'profile.html';
      } else {
        // Tidak ada pengguna yang login
        login.classList.add('show-login')
        submitbtn.innerHTML = 'Masuk Sebagai Member'
        title.textContent = 'Login Member'
        headEmail.style.display = 'block';
        email.style.display = 'block';
        headPass.style.display = 'block';
        pasword.style.display = 'block';
        dftr.style.display = 'block'
        lpw.style.display = 'block'
      }
   });
})

/* Login hidden */
loginClose.addEventListener('click', () =>{
   login.classList.remove('show-login')
})

submitbtn.addEventListener('click', () =>{
   var v_email = document.getElementById('email').value;
   var v_password = document.getElementById('password').value;
   firebase.auth().signInWithEmailAndPassword(v_email, v_password)
        .then((cred) => {
            firebase.database().ref('users/' + cred.user.uid).once('value').then(function(snapshot) {
               var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
               alert("Selamat datang, " + username);
               elemen.style.display = 'block';
               elemen.textContent = 'ID: '+cred.user.uid;
               login.style.display = 'none';
               loginBtn.style.display = 'block';
               lgbtn.style.display = 'block';
               //window.location.href = 'index.html';
            });
        })
        .catch((error) => {
            alert(error);
        });
})

lgbtn.addEventListener('click', () =>{
   firebase.auth().signOut().then(() => {
      elemen.style.display = 'none';
      elemen.style.display = 'block';
      loginBtn.style.display = 'block';
      lgbtn.style.display = 'none';
      window.location.href = 'index.html';
      alert("Berhasil Logout");
  }).catch((err) => alert(err));
})

daftarCuy.addEventListener('click', () =>{
   window.location.href = 'register.html';
})