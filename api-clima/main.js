//llamado del DOM
const result = document.querySelector('.result');
const form = document.querySelector('.get-weather');
const nameCity = document.querySelector('#city');
const nameCountry = document.querySelector('#country');

// validacion del formulario
form.addEventListener('submit', (e) => {
   e.preventDefault();
  // validar que si entra informacion en los formularios
  if (nameCountry.value === '' || nameCity.value === '') {msgAlert();}
  // se llama a al  api y se ingresan parametros 
  callApi(nameCity.value, nameCountry.value);
});

//mensaje de alerta para que ingrese datos en los campos
function msgAlert(msg) {
  const parrafo = document.createElement('p');
  parrafo.classList.add('alert-message');
  parrafo.innerHTML = msg;
  form.appendChild(parrafo)

  //pasados 3 segundos el parrafo creado se eliminara
  setTimeout(()=>{
    parrafo.remove()
  },2500 /*este es el tiempo que tarda*/)
}

// funcion que llama a la api  
function callApi(city, country) {
  // datos para la API  
  const API = 'd1c308e7b69b9dcddac0b03810f710e2';
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API}`;
  //llamado a la api
  fetch(URL)
    .then(data => {
      return data.json();
    })
    .then(dataJSON =>{
      if (dataJSON.cod === '404') {
        msgAlert('el lugar no se encontro');

      } else {
        limpiar();
        mostrarClima(dataJSON);
      }
    })
    .catch(error => {console.log(error);})
}


function mostrarClima(data) {
  const {name, main:{temp, temp_max, temp_min},weather:[clima]} = data;
  const result = document.querySelector('.result')
  const contenido = document.createElement('div');
  // grados en centigrados
  const max = transformar(temp_max)
  const min = transformar(temp_min)
  const temperatura = transformar(temp)
  contenido.innerHTML = `
                        <p>Agrege cuidad y pais</p>
                        <h5>Clima en ${name}</h5>
                        <img src="https://openweathermap.org/img/wn/${clima.icon}@2x.png" alt="icon del clima ${clima.description}">
                        <h2>${temperatura}</h2>
                        <p>Max:${max}</p>
                        <p>Min:${min}</p> 
  `;
  result.appendChild(contenido)
}
// esta funcion limpia los datos anteriores
function limpiar() {
  result.innerHTML = '';
}
// esta funcion transforma los grados de kelvin a centigrados
function transformar(grados) {
  return parseInt(grados - 273,15)
}