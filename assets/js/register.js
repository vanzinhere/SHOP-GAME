const daftarCuy = document.getElementById('daftar-cuy')
      daftar = document.getElementById('daftar-btn')
    
var auth = firebase.auth();

daftarCuy.addEventListener('click', () =>{
    window.location.href = 'index.html';
})

daftar.addEventListener('click', () =>{
    event.preventDefault();
    var v_username = document.getElementById('v-username').value;
    var v_email = document.getElementById('v-email').value;
    var v_password = document.getElementById('v-password').value;
    var v_password1 = document.getElementById('v-password1').value;
    var v_referal = document.getElementById('v-referal').value;
    if(v_password ==='' || v_password1 === ''){
        alert('Pendaftaran ditolak periksa kembali!!!')
    } else {
        if(v_username === '') {
            alert('Pastikan username terisi!!')
        } else {
            if(v_email === '') {
                alert('Pastikan email terisi!!')
            } else {
                auth.createUserWithEmailAndPassword(v_email, v_password)
                .then(function(userCredential) {
                    var user = userCredential.user;
                    firebase.database().ref('users/' + user.uid).set({
                        username: v_username,
                        email: v_email,
                        phone: "",
                        saldo: 0,
                        trxB: 0,
                        trxG: 0,
                        trxP: 0
                    });
                    alert('Registerasi berhasil. Welcome: ' + v_username);
                })
                .catch(function(error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    alert('Registerasi gagal: ' + errorMessage)
                });
            }
        }
    }
})