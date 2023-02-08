const resaultCatalog = document.getElementById("resault__catalog");
const inpJum = document.getElementById("inpJumlah");

const getDataCatalog = () => {
  resaultCatalog.innerHTML = "";

  const items = accessStorage("GET");

  for (i = 0; i < items.length; i++) {
    resaultCatalog.innerHTML += `
    <div class="resault__list-catalog">
        <div id="date">
        <p>${i + 1}</p>
        </div>
        <div id="nama">
        <p>${items[i].barang}</p>
        </div>
        <div id="harga">
        <p>${items[i].harga}</p>
        </div>
        <div>
        <button class="btn btn-box-success" onclick="proccessDataCatalog(${
          items[i].id
        })"><i class="uil uil-plus"></i></i></button>
        </div>
    </div>`;
  }
};

const proccessDataCatalog = (nBarang) => {
  const items = accessStorage("GET");
  if (inpJum.value != 0) {
    for (i = 0; i < items.length; i++) {
      if (nBarang === items[i].id) {
        const harga = parseInt(items[i].harga);
        const jumlahHarga = harga * inpJum.value;
        totalHarga += jumlahHarga;

        printTransaction(
          items[i].barang,
          items[i].harga,
          inpJum.value,
          jumlahHarga,
          totalHarga
        );

        addDataTransaction(
          items[i].barang,
          items[i].harga,
          inpJum.value,
          jumlahHarga,
          totalHarga
        );
      }
    }
  } else {
    alertNotInput.classList.add("alert__status");
  }
  inpJum.value = "";
};

getDataCatalog();
