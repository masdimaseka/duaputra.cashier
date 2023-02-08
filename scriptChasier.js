const keyTransaction = "DPT_Transaction";
const namaKasir = document.getElementById("inpNama");
const jumlahKasir = document.getElementById("inpJumlah");
const addKasir = document.getElementById("addKasir");
const resaultKasir = document.getElementById("resault__kasir");
const total = document.getElementById("total");
let totalHarga = 0;

const accessTransaction = (action, transaction = null) => {
  if (action === "GET") {
    console.log("melakukan GET");
    return JSON.parse(localStorage.getItem(keyTransaction));
  } else if (action === "SET" && transaction !== null) {
    console.log("melakukan SET");
    localStorage.setItem(keyTransaction, JSON.stringify(transaction));
  }
};

const addDataTransaction = (
  namaBarang,
  hargaBarang,
  jumlahBarang,
  jumlahHarga
) => {
  const acces = accessTransaction("GET");

  const dateFormat = new Date();
  console.log(dateFormat.getMonth());

  acces.push({
    id: Date.now() + Math.random(),
    date: `${dateFormat.getDate()} / ${
      dateFormat.getMonth() + 1
    } / ${dateFormat.getFullYear()}`,
    barang: namaBarang,
    harga: hargaBarang,
    jumlah: jumlahBarang,
    jumlah_harga: jumlahHarga,
  });
  accessTransaction("SET", acces);
};

const printTransaction = (barang, harga, jumlah, jumlah_harga, total_harga) => {
  resaultKasir.innerHTML += `
          <div class="resault__list-kasir">
              <div>
                <p>${barang}</h5>
              </div>
              <div>
                <p>${harga}</h5>
              </div>
              <div>
                <p>${jumlah}</h5>
              </div>
              <div>
                <p>${jumlah_harga}</h5>
              </div>
            </div>`;
  total.innerHTML = `<h3>${total_harga}</h3>`;
};

const proccessDataCashier = () => {
  const items = accessStorage("GET");

  if (namaKasir.value != "" && jumlahKasir.value != 0) {
    for (i = 0; i < items.length; i++) {
      if (namaKasir.value.toLowerCase() === items[i].barang.toLowerCase()) {
        const harga = parseInt(items[i].harga);
        const jumlahHarga = harga * jumlahKasir.value;
        totalHarga += jumlahHarga;

        printTransaction(
          items[i].barang,
          items[i].harga,
          jumlahKasir.value,
          jumlahHarga,
          totalHarga
        );

        addDataTransaction(
          items[i].barang,
          items[i].harga,
          jumlahKasir.value,
          jumlahHarga,
          totalHarga
        );
      }
      // else {
      //   alertNotFound.classList.add("alert__status");
      // }
    }
  } else if (namaKasir.value != "" || jumlahKasir.value != 0) {
    alertNotInput.classList.add("alert__status");
  } else {
    alertNone.classList.add("alert__status");
  }
  namaKasir.value = "";
  jumlahKasir.value = "";
};

if (accessTransaction("GET") === null) {
  accessTransaction("SET", []);
}

const clearDisplay = () => {
  resaultKasir.innerHTML = "";
  total.innerHTML = "<h3>-</h3>";
};
