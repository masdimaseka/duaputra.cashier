const resaultHistory = document.getElementById("resault__history");

const getTransaction = () => {
  resaultHistory.innerHTML = "";

  const items = accessTransaction("GET");

  for (i = 0; i < items.length; i++) {
    resaultHistory.innerHTML += `
    <div class="resault__list-history">
        <div id="date">
        <p>${items[i].date}</p>
        </div>
        <div id="nama">
        <p>${items[i].barang}</p>
        </div>
        <div id="harga">
        <p>${items[i].harga}</p>
        </div>
        <div id="jumlah">
        <p>${items[i].jumlah}</p>
        </div>
        <div id="jumlahHarga">
        <p>${items[i].jumlah_harga}</p>
        </div>
        <div>
        <button class="btn btn-box-danger" onclick = "removeDataTransaction(${items[i].id})"><i class="uil uil-multiply"></i></button>
        </div>
    </div>`;
  }
};

const removeDataTransaction = (itemsId) => {
  const tempData = [];
  const items = accessTransaction("GET");
  for (i = 0; i < items.length; i++) {
    if (items[i].id != itemsId) {
      tempData.push(items[i]);
    }
  }
  accessTransaction("SET", tempData);
  getTransaction();
};

getTransaction();
