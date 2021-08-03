let show = document.querySelector(".show");
let toggle = document.querySelectorAll(".toggle");
let inputSearch = document.querySelector(".inputSearch");
let closeList = document.querySelector(".closeList");
let noResult = document.querySelector(".noResult");
let showList = document.querySelectorAll(".showList");
let main2 = document.querySelector(".main2");
let main1 = document.querySelector(".main1");


let timerId;

inputSearch.addEventListener("input", torthler); //() => console.log('jj'))

function torthler() {
  if (timerId) return false;
  timerId = setTimeout(() => {
    fetcher(inputSearch.value);
    timerId = null;
  }, 2000);
}
async function fetcher(val) {
  noResult.style.display = "none";
  if (val) {
    let res = await fetch(`https://swapi.dev/api/people/?search=${val}`);
    let data = await res.json();
    display(data);
    return data.results;
  } else {
    toggler('unset');
  }
}

function display({ results }) {
  show.innerHTML = "";
  console.log(results);
  if (!results.length) {
    toggler('none');
    noResult.style.display = "unset";
    return false;
  }
  toggler('unset')
  results.forEach((el) => {
    //   console.log(el);
    let x = `<div class="showList" onclick="displayCharInfo.call(this)">
      <p><span class="name">${el.name}</span> <br><span class="birthyear">${el.birth_year}</span></p>
      <p class="gender">${el.gender}</p>
    </div>`;

    show.insertAdjacentHTML("beforeend", x);
  });
}

closeList.addEventListener("click", () => {
  toggler('none');
});

async function displayCharInfo() {
  let chr = await fetcher(this.querySelector(".name").textContent);
  // console.log(chr[0]);
  main2.classList.remove('hide');
  main1.classList.add('hide');
  main2.innerHTML='';
  let x = `<h1 class="name">${chr[0].name}</h1>
  <div class="tiles">
      <div class="info hov">
          <h2>Personal Info</h2>
          <div class="birth">Birth Year: ${chr[0].birth_year}</div>
          <div class="gen">Gender: ${chr[0].gender}</div>
          <div class="height">Height: ${chr[0].height}</div>
      </div>
      <div class="info hov">
          <h2>Anatomy</h2>
          <div class="birth">Eye Color: ${chr[0].eye_color}</div>
          <div class="gen">Mass: ${chr[0].mass}</div>
          <div class="height">Hair Color: ${chr[0].hair_color}</div>
      </div>
  </div>
  <div class="goback hov">Go Back</div>
  `;
  main2.insertAdjacentHTML("beforeend", x);
  let goback = document.querySelector(".goback"); 
  goback.addEventListener('click',()=>{
  main2.classList.add('hide');
  main1.classList.remove('hide');
  toggler('none');
  })
}
showList.forEach((el) =>
  el.addEventListener("click", () => {
    displayCharInfo();
  })
);

function toggler(val){
  toggle.forEach((el) => (el.style.display = `${val}`));
  if(val=='none')inputSearch.value = "";
}

//Sound Effects
let sound = document.querySelector(".sound");
let flag=false;
let playSound=()=>{
  if(flag){
  sound.innerHTML=''
  sound.insertAdjacentHTML("beforeend", `<img
  class="soundimg"
  src="https://upload.wikimedia.org/wikipedia/commons/2/21/Speaker_Icon.svg"
  alt=""
  />
  <audio autoplay src="./theme.mp3"></audio>`);
}
 else{
  sound.innerHTML=''
  sound.insertAdjacentHTML("beforeend", `<img
  class="soundimg"
  src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Mute_Icon.svg"
  alt=""
  />`);
 }
 flag=!flag;
}

playSound();
sound.addEventListener('click',playSound);


