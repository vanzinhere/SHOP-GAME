const beranda = document.getElementById('beranda'),
      welcomeSign = document.getElementById('welcomer'),
      saldo = document.getElementById('saldo'),
      trxB = document.getElementById('trxB'),
      trxG = document.getElementById('trxG'),
      trxP = document.getElementById('trxP'),
      userr = document.getElementById('userata'),
      aidi = document.getElementById('aidi'),
      mail = document.getElementById('mail'),
      phon = document.getElementById('phon'),
      sst = document.getElementById('stt'),
      vrf = document.getElementById('verif-hp'),
      btn_vrf = document.getElementById('verif-phone'),
      btn_cde = document.getElementById('verif-kode'),
      settings = document.getElementById('bt-settings')

function formatRupiah(angka) {
    var reverse = angka.toString().split('').reverse().join('');
    var ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join('.').split('').reverse().join('');
    return 'Rp ' + ribuan;
}

sst.style.display = 'none';
vrf.style.display = 'none';
firebase.auth().onAuthStateChanged((user) => {
   if (user) {
     // Pengguna telah login
     firebase.database().ref('users/' + user.uid).once('value').then(function(snapshot) {
        var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
        var saldoo = (snapshot.val() && snapshot.val().saldo);
        var trxBB = (snapshot.val() && snapshot.val().trxB);
        var trxGG = (snapshot.val() && snapshot.val().trxG);
        var trxPP = (snapshot.val() && snapshot.val().trxP);
        var phonee = (snapshot.val() && snapshot.val().phone);
        var rupiah = formatRupiah(saldoo)
        welcomeSign.textContent = 'Welcome, '+username;
        saldo.textContent = rupiah;
        trxB.textContent = trxBB;
        trxG.textContent = trxGG;
        trxP.textContent = trxPP;
        userr.placeholder = username;
        aidi.placeholder = user.uid;
        mail.placeholder = user.email;
        phon.placeholder = phonee;
        //window.location.href = 'index.html';
    });
   } else {
     // Tidak ada pengguna yang login
     window.location.href = 'index.html';
   }
});

settings.addEventListener('click', () =>{
    var usernametag = document.getElementById('cardasa');
    var titleran = document.getElementById('ttg');       
    
    titleran.style.display = 'none';
    usernametag.style.display = 'none';
    sst.style.display = 'block';
    vrf.style.display = 'block';
})

beranda.addEventListener('click', () =>{
    window.location.href = 'index.html';
})

btn_vrf.addEventListener('click', () =>{
    const nohp = document.getElementById('no_hp').value;
    const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    firebase.auth().signInWithPhoneNumber(nohp, appVerifier)
      .then((confirmationResult) => {
        // Kode verifikasi telah dikirim
        alert('Kode verifikasi telaah terkirim cek sms mu sekarang!!!')
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        console.error('Gagal mengirim kode verifikasi:', error);
      });
})

btn_cde.addEventListener('click', () =>{
    const verificationCode = document.getElementById('verificationCode').value;
    window.confirmationResult.confirm(verificationCode)
      .then((result) => {
        // Kode verifikasi berhasil diverifikasi
        const user = result.user;
        console.log('Verifikasi berhasil, pengguna:', user);


        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                firebase.database().ref('users/' + user.uid).once('value').then(function(snapshot) {
                    var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
                    var saldoo = (snapshot.val() && snapshot.val().saldo);
                    var trxBB = (snapshot.val() && snapshot.val().trxB);
                    var trxGG = (snapshot.val() && snapshot.val().trxG);
                    var trxPP = (snapshot.val() && snapshot.val().trxP);
                    firebase.database().ref('users/' + user.uid).set({
                        username: username,
                        email: user.email,
                        phone: "0895339775187",
                        saldo: saldoo,
                        trxB: trxBB,
                        trxG: trxGG,
                        trxP: trxPP
                    });
                    window.location.href = 'profile.html';
                });
            } else {
              // Tidak ada pengguna yang login
              window.location.href = 'index.html';
            }
         });
      })
      .catch((error) => {
        // Kode verifikasi gagal diverifikasi
        console.error('Verifikasi gagal:', error);
      });
})