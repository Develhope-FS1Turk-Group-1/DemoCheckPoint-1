//ALP ÖNCELİKLE HOŞGELDİN ABİ

const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const addBtn = document.getElementById("addBtn");
const deleteBtn = document.getElementById("deleteBtn");
const updateBtn = document.getElementById("updateBtn");
const tasks = document.getElementById("tasks");
const ol = document.createElement("ol");
let taskListStorage = JSON.parse(localStorage.getItem("taskList")) || []; //LocalStorage işlemimiz burada başlıyor. eğer localStorage içerisinde "taskList" key'ine sahip bir şey varsa onu parse edip taskListStorage içerisine atar. eğer localStorage içerisinde "taskList" isimli bir şey yoksa, localStorage içerisinde boş bir array ([]) oluşturup taskListStorage değişkenine ekler.

let taskArray = []; //Ana array'imiz bu. eklediğimiz, sildiğimiz ve güncellediğimiz elemanlar taskArray içinden halldedilecek.

tasks.append(ol);

const clearInput = () => {
  nameInput.value = "";
  ageInput.value = "";
};

const updateProcess = () => {
  ol.innerHTML = "";
  taskArray.map((task) => {
    const li = document.createElement("li");
    li.innerText = task.name + " " + task.age;
    ol.appendChild(li);
    clearInput();
  });
};

const addTask = () => {
  if (nameInput.value === "" || ageInput.value === "") {
    alert("Please enter name and age");
  } else {
    taskArray = [...taskArray, { name: nameInput.value, age: ageInput.value }];
    updateProcess();
    saveToLocalStorage(); //listeye yeni bir şey ekledik.(aslında taskArray içine ekledik :D)  hemen localStorage'ı da güncellemek için bu fonksiyonu kullanıyoruz. fonksiyona en aşağıdan ulaşabilirsin. yaptığı şey çok basit.
  }
};

const deleteTask = () => {
  let index = taskArray.findIndex((task) => task.name == nameInput.value);
  let index2 = taskArray.findIndex((task) => task.age == ageInput.value);
  console.log(index, index2);
  if (index >= 0 && index2 >= 0) {
    index === index2 && taskArray.splice(index, 1);

    updateProcess();
    saveToLocalStorage(); // taskArray'den bir şey sildik.. localStorage'ı güncellemek lazım acilllllll
  } else {
    alert("delete button is not accesable");
  }
};

const updateTask = () => {
  let index = taskArray.findIndex((task) => task.name == nameInput.value);

  if (index === -1 && ageInput.value !== "") {
    alert("wrong way");
  } else if (index > -1 && ageInput.value !== "") {
    taskArray[index].age = ageInput.value;

    updateProcess();
    saveToLocalStorage(); // bir veriyi güncelledik. hemen localStorage'ı da güncelleyelim.
  }
};

const saveToLocalStorage = () => {
  localStorage.setItem("taskList", JSON.stringify(taskArray)); //localStorage'ı set edip taskArray'e eşitliyoruz. böylece taskArray'in en güncel hali localStorage'da tutulmuş oluyor
  console.log("saved to local storage");
};

const LoadToLocalStorage = () => {
  //burada da sayfa ilk açıldığında localStorage'da kaydedilen elemanları ekrana yazdırıyoruz.
  taskArray = [...taskListStorage]; // burada taskArray'i neden taskListStore'a güncelledik bunu tahmin et abi. sölemicem :D
  taskListStorage.map((storageItem) => {
    const li = document.createElement("li");
    li.innerText = storageItem.name + " " + storageItem.age;
    ol.appendChild(li);
  });
};

LoadToLocalStorage();

addBtn.addEventListener("click", addTask);
deleteBtn.addEventListener("click", deleteTask);
updateBtn.addEventListener("click", updateTask);
