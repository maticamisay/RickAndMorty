document.addEventListener('DOMContentLoaded', () => {

  const DOMcontainer = document.querySelector('#game');

  const playerOne = {
    name: '',
    characterOne: '',
    characterTwo: '',
    characterThree: ''
  }

  const playerTwo = {
    name: '',
    characterOne: '',
    characterTwo: '',
    characterThree: ''
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

  const gameRender = () => {
    fetchApi()

    const carrousel = document.createElement('div');
    carrousel.classList.add('d-flex', 'align-items-center', 'mt-3');

    carrousel.innerHTML = `
          <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="https://repository-images.githubusercontent.com/120371205/b6740400-92d4-11ea-8a13-d5f6e0558e9b" class="d-block w-100" alt="...">
              </div>
              <div class="carousel-item">
                <img src="https://repository-images.githubusercontent.com/120371205/b6740400-92d4-11ea-8a13-d5f6e0558e9b" class="d-block w-100" alt="...">
              </div>
              <div class="carousel-item">
                <img src="https://repository-images.githubusercontent.com/120371205/b6740400-92d4-11ea-8a13-d5f6e0558e9b" class="d-block w-100" alt="...">
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

    DOMcontainer.appendChild(carrousel);

  }
  
  const fetchApi = async () => {
    
    let characters;
    
    const res = await fetch('./rickAndMorty.json')
    
    characters = await res.json();
    
    
    // fetch('./rickAndMorty.json')
    //   .then(res => res.json())
    //   .then(res => characters.push(res))
    //   .catch(e => console.log(e))
    playerOne.characterOne = characters[Math.round(numeroAleatorioDecimales(0, 20))]
    playerOne.characterTwo = characters[Math.round(numeroAleatorioDecimales(0, 20))]
    playerOne.characterThree = characters[Math.round(numeroAleatorioDecimales(0, 20))]
    
    function numeroAleatorioDecimales(min, max) {
      var num = Math.random() * (max - min);
      return num + min;
    }
    console.log(playerOne)
  }
  renderizarForm()
})

