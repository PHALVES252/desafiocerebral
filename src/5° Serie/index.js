const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")
const $imagem = document.querySelector(".imagem")
const $mensagem = document.querySelector(".mensagem")
var porcetagem = document.querySelector('#porcetagem')
var b = 0;
var barra_preenchimento = 0;



let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}


/*Proxima pergunta=======================*/
function displayNextQuestion() {
  resetState()

  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct;
    }


    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })


  /*mudar imagem*/
  $imagem.src = `${questions[currentQuestionIndex].img}`

}
/*=================================*/
function resetState() {
  while ($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

/*verifica se a resposta e acorreta*/
function selectAnswer(event) {

  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
    console.log('resposta certa')

    let resposta_errada = `
      <div class="alternativa_correta">
      <h1>CORRETO</h1>
      <p>${questions[currentQuestionIndex].curiosidade}</p>
      </div>
      `;
      $mensagem.innerHTML = resposta_errada;
      $mensagem.classList.remove('remove')
      if(b < 100) {
        b+=10;
        barra_preenchimento +=11;
        porcetagem.innerHTML = `${b}%`
        document.querySelector('.preenchimento').style.width = `${barra_preenchimento}%`
    } 
  } else {
    document.body.classList.add("incorrect")
    console.log('resposta errada')

    let resposta_errada = `
      <div class="alternativa_errada">
      <h1>ERRADA</h1>
      <p>${questions[currentQuestionIndex].curiosidade}</p>
      </div>
      `;
      $mensagem.innerHTML = resposta_errada;
      $mensagem.classList.remove('remove')
  }


  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })



  

  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)

  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Excelente 😁"
      img = 'MEDALHA DE DIAMANTE.jpg'
      break
    case (performance >= 70):
      message = "Muito bom 😃"
      img = 'MEDALHA DE OURO.jpg'
      break
    case (performance >= 50):
      message = "Bom 😄"
      img = 'MEDALHA DE PRATA.jpg'
      break
    case (performance >= 30):
      message = "Pode melhorar 😅"
      img = 'MEDALHA DE BRONZE.jpg'
    default:
      message = "Muito ruim 😌"
  }

  $questionsContainer.innerHTML =
    `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
      <img class="Mensagem_imagem" src="./imgs/${img}" alt="">
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}







const questions = [
  {
    question: "Qual é o principal meio de transporte na China?",
    answers: [
      { text: "patinete", correct: false },
      { text: "patins de rodas", correct: false },
      { text: "bicicleta", correct: true },
      { text: "Skate", correct: false },
    ],
    img: "./imgs/china.webp",
    curiosidade: "É estimado que a China tenha mais de meio bilhão de bicicletas, em torno de 37.2% da população total. E 3 em cada 10 pessoas preferem usar a bicicleta, em comparação a quaisquer veículos a motor. Por ser um dos países com mais habitantes do mundo, o uso da bicicleta simplifica o trânsito."
  },

  {
    question: "Que instrumento musical acompanha geralmente o bailarino de flamengo?",
    answers: [
      { text: "acordeão", correct: false },
      { text: "trompede", correct: false },
      { text: "guitarra", correct: true },
      { text: "violino", correct: false },
    ],
    img: "./imgs/bailarino-flamengo.jpg",
    curiosidade: "O flamenco é um estilo de música e dança tipicamente espanhol. Essa manifestação cultural é relacionada sobretudo à comunidade autônoma da Andaluzia, ao sul da Espanha, assim como à cidade de Múrcia e à região de Estremadura."
  },

  {
    question: "Quem pintou a Mona liza?",
    answers: [
      { text: "Salvador Dalí", correct: false },
      { text: "Leonardo da Vinci", correct: true },
      { text: "MICHELANGELO", correct: false },
      { text: "Claude Monet", correct: false },
    ],
    img: "./imgs/Mona Lisa (Gioconda).jpg",
    curiosidade: "As pinturas de Da Vinci geralmente retratavam temas religiosos e rostos. Entre elas, está “Mona Lisa”, talvez a arte mais conhecida do mundo. Por meio desse quadro, o artista revelou a harmonia entre a humanidade e a natureza, muito bem representadas pela figura feminina e pela paisagem ao fundo."
  },
  
  {
    question: "Quantas aves têm dentes?",
    answers: [
      { text: "1", correct: false },
      { text: "3", correct: false },
      { text: "7", correct: false },
      { text: "0", correct: true },
    ],
    img: "./imgs/aves.jpg",
    curiosidade: "Há cerca de 65 milhões de anos, a Terra experimentou um evento de extinção em massa, resultando na sobrevivência apenas de alguns grupos de espécies, como as aves. De acordo com um artigo publicado na revista Biology Letters, as aves pararam de desenvolver dentes devido a uma pressão evolutiva para acelerar o desenvolvimento embrionário. Em outras palavras, elas trocaram os dentes pelo bico, o que permitiu que passassem menos tempo dentro do ovo."
  },
  
  {
    question: "Que corpo celeste o homem pisou antes de qualquer outro?",
    answers: [
      { text: "Lua", correct: false },
      { text: "Marte", correct: false },
      { text: "Terra", correct: true },
      { text: "Saturno", correct: false },
    ],
    img: "./imgs/terra.jpg",
    curiosidade: "a Terra é o primeiro corpo celeste em que o ser humano pisou e também é o planeta em que vivemos. A exploração espacial começou com a exploração da própria Terra antes de tentar alcançar outros corpos celestes e até agora ela é o único corpo celeste conhecido a abrigar vida."
  },
  {
    question: "Por que nome se designa a população nativa da Austrália??",
    answers: [
      { text: "Asutralianos", correct: false },
      { text: "Somaliaos", correct: false },
      { text: "Aborigíne", correct: true },
      { text: "Arnga", correct: false },
    ],
    img: "./imgs/australia.jpg",
    curiosidade: "Os aborígines são os povos indígenas mais antigos da Austrália, com estimativas de 65.000 anos de existência. Eles viviam em grupos nômades, caçando e coletando alimentos, e tinham um conhecimento profundo da terra e de seus recursos."
  },
  {
    question: "Em que cidade morava Sherlock Holmes?",
    answers: [
      { text: "Inglaterra", correct: false },
      { text: "Paris", correct: false },
      { text: "Italia", correct: false },
      { text: "Londres", correct: true },
    ],
    img: "./imgs/Sherlock-Holmes.webp",
    curiosidade: "Sherlock Holmes é um personagem fictício criado pelo escritor britânico Sir Arthur Conan Doyle. Holmes é conhecido por residir em Londres, Inglaterra. Portanto, a cidade em que Sherlock Holmes morava é Londres.."
  },

  {
    question: "A ilha do Mel fica na entrada da:",
    answers: [
      { text: "Baia de Paranaquá", correct: true },
      { text: "Foz do Amazonas", correct: false },
      { text: "Porto alegre", correct: false },
      { text: "Porto de Santos", correct: false },
    ],
    img: "./imgs/ilha do mel.jpg",
    curiosidade: "A Ilha do Mel é uma ilha brasileira situada na embocadura da baía de Paranaguá, no estado do Paraná. De acordo com o Instituto Brasileiro de Geografia e Estatística, sua população no ano de 2010 era de 1 094 pessoas residentes. A ilha do Mel é um ponto turístico de muita importância no estado do Paraná"
  },

  {
    question: "Desde quando, pela constituição brasileira, as mulheres têm direito a votar?",
    answers: [
      { text: "1997", correct: false },
      { text: "1894", correct: false },
      { text: "1932", correct: true},
      { text: "1954", correct: false },
    ],
    img: "./imgs/voto feminino.jpg",
    curiosidade: "O direito ao voto pelas mulheres foi concedido em 1932 por meio do Decreto 21.076, que criou a Justiça Eleitoral, pelo então presidente Getúlio Vargas. Mas a luta feminina pelo voto vem desde o movimento sufragista no século 19 e de organizações de movimentos feministas no início do século 20."
  },

  {
    question: "A Finlândia faz fronteira com a Rúsia?",
    answers: [
      { text: "Sim", correct: true },
      { text: "Não", correct: false },
    ],
    img: "./imgs/finlandia.jpg",
    curiosidade: "A entrada da Finlândia mais do que dobra a extensão da fronteira da aliança militar com a Rússia, já que o país nórdico compartilha cerca de 1.300 quilômetros com a nação comandada por Vladimir Putin. Antes, 4 integrantes da Otan compartilhavam fronteira terrestre com a Rússia: Estônia, Letônia, Lituânia e Polônia."
  },
]

