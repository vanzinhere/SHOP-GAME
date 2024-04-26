
const db = firebase.firestore();

// Ambil referensi elemen HTML
const itemList = document.getElementById('item');

// Fungsi untuk mendapatkan dan menampilkan daftar item dari Firebase Firestore
function displayItems() {
    itemList.innerHTML = ''; // Bersihkan daftar item sebelum menampilkan ulang

    // Ambil data dari Firestore
    db.collection('ff').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const item = doc.data();
            const li = document.createElement('li');

            // Tampilkan informasi item dan gambar (dalam tag img)
            li.innerHTML = `
            <div class="produk">
            <a href="#" class="ptk">
                <img class="img-produk" src="asset/images/diamond.webp">
                <div class="produk-name">${item.name}</div>
                <div class="produk-harga">Rp ${item.price}</div>
            </a>
            </div>
            `;

            itemList.appendChild(li);
        });
    });
}

// Panggil fungsi displayItems saat halaman dimuat
displayItems();