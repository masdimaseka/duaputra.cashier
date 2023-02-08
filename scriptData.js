const key = "DPT_Data";
const inputBarang = document.getElementById("barang");
const inputHarga = document.getElementById("harga");
const resault = document.getElementById("resault__main");

const accessStorage = (action, itemsData = null) => {
  if (action === "GET") {
    console.log("melakukan GET");
    return JSON.parse(localStorage.getItem(key));
  } else if (action === "SET" && itemsData !== null) {
    console.log("melakukan SET");
    localStorage.setItem(key, JSON.stringify(itemsData));
  }
};

const addData = () => {
  const acces = accessStorage("GET");
  if (inputBarang.value != "" && inputHarga.value != 0) {
    acces.push({
      id: Date.now() + Math.random(),
      barang: inputBarang.value,
      harga: inputHarga.value,
    });
    accessStorage("SET", acces);
  } else {
    return false;
  }
  inputBarang.value = "";
  inputHarga.value = "";
  getData();
};

const getData = () => {
  resault.innerHTML = "";

  const items = accessStorage("GET");

  for (i = 0; i < items.length; i++) {
    resault.innerHTML += `
    <div class="resault__list">
            <div>
              <p>${i + 1}</h5>
            </div>
            <div>
              <p>${items[i].barang}</h5>
            </div>
            <div>
              <p>${items[i].harga}</h5>
            </div>
            <div>
              <button class="btn btn-box-danger" onclick = "removeData(${
                items[i].id
              })"><i class="uil uil-multiply"></i></button>
            </div>
    </div>`;
  }
};

const removeData = (itemsId) => {
  const tempData = [];
  const items = accessStorage("GET");
  for (i = 0; i < items.length; i++) {
    if (items[i].id != itemsId) {
      tempData.push(items[i]);
    }
  }
  accessStorage("SET", tempData);
  getData();
};

if (accessStorage("GET") === null) {
  accessStorage("SET", []);
}
getData();
