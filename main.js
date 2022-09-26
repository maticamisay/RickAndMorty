document.addEventListener('DOMContentLoaded', () => {

  const DOMcontainer = document.querySelector('#game');

  const playerOne = {
    name: '',
    characters: []
  }

  const playerTwo = {
    name: '',
    characters: []
  }


  function renderizarForm() {
    const form = document.createElement('form');
    const formContainer = document.createElement('div');
    formContainer.classList.add('my-5');

    const label = document.createElement('label');
    label.classList.add('form-label');
    label.textContent = 'Jugador 1';
    const input = document.createElement('input');
    input.classList.add('form-control');
    input.setAttribute('id', 'formElement-1');

    const label2 = document.createElement('label');
    label2.classList.add('form-label');
    label2.textContent = 'Jugador 2';
    const input2 = document.createElement('input');
    input2.classList.add('form-control');
    input2.setAttribute('id', 'formElement-2');
    // input2.setAttribute('value', 'text');



    const button = document.createElement('button');
    button.textContent = 'Empezar';
    button.classList.add('btn', 'btn-primary', 'mt-3');

    form.addEventListener('submit', startGame);

    formContainer.appendChild(label);
    formContainer.appendChild(input);
    formContainer.appendChild(label2);
    formContainer.appendChild(input2);
    formContainer.appendChild(button);
    form.appendChild(formContainer);



    DOMcontainer.appendChild(form);
  }

  const startGame = (e) => {
    e.preventDefault();
    const player1 = document.querySelector('#formElement-1').value;
    const player2 = document.querySelector('#formElement-2').value;
    playerOne.name = player1
    playerTwo.name = player2

    loading()
  }

  loading = () => {
    let loading = true

    if (loading) {
      DOMcontainer.removeChild(DOMcontainer.firstChild)
      const div = document.createElement('div');
      div.classList.add('d-flex', 'mt-5', 'justify-content-center');

      div.innerHTML = `
            <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
            </div>`

      DOMcontainer.appendChild(div);
    }

    setTimeout(() => {
      loading = false;
      DOMcontainer.removeChild(DOMcontainer.firstChild)

      gameRender()
    }, 1000)
  }

  const gameRender = async () => {
    await fetchApi()
    //CREAR FUNCION QUE SELECCIONE EL JUGADOR 
    const changePlaylayerSelected = () =>{
      if(currentPlayer.name==playerOne.name){

        currentPlayer.name=playerTwo.name
        currentPlayer.characters=playerTwo.characters
      } else{

      }
    }

    // CREAR OBJETO CURRENT PLAYER REFERENCIADO AL JUGADOR
    const currentPlayer = {
      name,
      characters
    }
    const title = document.querySelector('.mobile-borders');
    const carrousel = document.createElement('div');
    carrousel.classList.add('d-flex', 'align-items-center', 'mt-3');
    const playerName = document.createElement('div');
    playerName.classList.add('h2');
    // CON EL JUGADOR SELECCIONADO, MOSTRAS SU NOMBRE
    playerName.textContent = `${playerOne.name}`;

    carrousel.innerHTML = `
          <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
      <div class="carousel-item active">
        <img src=${currentPlayer.characters[0].image} class="d-block w-100 game-img" alt="...">
      </div>
      <div class="carousel-item active">
        <img src=${playerOne.characters[1].image} class="d-block w-100 game-img" alt="...">
      </div><div class="carousel-item active">
      <img src=${playerOne.characters[2].image} class="d-block w-100 game-img" alt="...">
    </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>`
    // CUANDO CAMBIES EL JUGADOR, QUE BORRE EL CARROUSEL, Y VUELVA A CREARSE CON LOS DATOS DEL JUGADOR
    const changePlayer = document.createElement('button');
    changePlayer.classList.add('btn', 'btn-primary', 'mb-3', 'mt-1');
    changePlayer.textContent = 'Cambiar jugador';


    DOMcontainer.appendChild(carrousel);
    DOMcontainer.appendChild(changePlayer);
    title.appendChild(playerName);


  }

  const fetchApi = async () => {

    let characters;
    const res = await fetch("https://rickandmortyapi.com/api/character/?page=1")
    characters = await res.json();
    for (let i = 0; i < 3; i++) {
      playerOne.characters.push(characters.results[Math.round(numeroAleatorioDecimales(0, 20))])
      playerTwo.characters.push(characters.results[Math.round(numeroAleatorioDecimales(0, 20))])
    }

    function numeroAleatorioDecimales(min, max) {
      var num = Math.random() * (max - min);
      return num + min;
    }
    console.log(playerOne)
  }
  renderizarForm()
})

