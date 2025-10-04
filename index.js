const Questions = 
[
{
   question: "O Creeper surgiu por acidente, mas qual era a intenção original para ele?",
   answers: 
   [
      { text: "Porco", correct: true },
      { text: "Zumbi", correct: false },
      { text: "Slime", correct: false },
      { text: "Gato", correct: false },
   ]
},
{
   question: "Como fazer o cobre parar de oxidar?",
   answers: 
   [
      { text: "Com Machado", correct: false },
      { text: "Com Água", correct: false },
      { text: "Com Favo de mel", correct: true },
      { text: "Com Ferro", correct: false },
   ]
},
{
   question: "Qual foi o ano de lançamento do Minecraft?",
   answers: 
   [
      { text: "2007", correct: false },
      { text: "2009", correct: true },
      { text: "2005", correct: false },
      { text: "2006", correct: false },
   ]
},
{
   question: "Qual é a distância máxima que um fio de redstone pode transmitir sinal?",
   answers: 
   [
      { text: "20", correct: false },
      { text: "10", correct: false },
      { text: "15", correct: true },
      { text: "25", correct: false },
   ]
},
{
   question: "Qual é a principal lenda do Minecraft?",
   answers: 
   [
      { text: "Herobrine", correct: true },
      { text: "Notch", correct: false },
      { text: "Null", correct: false },
      { text: "Entity 303", correct: false },
   ]
},
{
   question: "Qual variante de axolot possui a menor taxa de spawn no jogo?",
   answers: 
   [
      { text: "Rosa", correct: false },
      { text: "Dourado", correct: false },
      { text: "Marrom", correct: false },
      { text: "Azul", correct: true },
   ]
},
{
   question: "Qual empresa comprou a Mojang e, consequentemente, o Minecraft?",
   answers: 
   [
      { text: "Ubisoft ", correct: false },
      { text: "Nintendo", correct: false },
      { text: "Google", correct: false },
      { text: "Microsoft", correct: true },
   ]
},
{
   question: "Qual é o minério do Overworld mais raro de se encontrar naturalmente no Minecraft?",
   answers: 
   [
      { text: "Diamante", correct: false },
      { text: "Esmeralda", correct: true },
      { text: "Ouro", correct: false },
      { text: "Redstone", correct: false },
   ]
},
];

const $startGameButton = document.querySelector(".btn-inicial")
const $questionsContainer = document.querySelector(".questions")
const $inicio = document.querySelector(".ativar")
const $titulo = document.querySelector(".titulo")
const $answersContainer = document.querySelector(".answer-container")
const $questionText = document.querySelector(".question")
const $nextQuestionButton = document.querySelector(".nextQuestion")

$startGameButton.addEventListener ("click", startGame)
$nextQuestionButton.addEventListener ("click", displayNestQuestion)

let currentQuestionIndex = 0
let totalCorrect = 0




 function startGame() 
 {
   document.body.style.backgroundImage = "url('imagens/minecraft-glowing-caves.png')";
   $startGameButton.classList.add("hide");
   $nextQuestionButton.classList.add("hide");
   $inicio.classList.add("hide");
   $titulo.classList.add("hide");
   $questionsContainer.classList.remove("hide");

   displayNestQuestion()
 }

 function displayNestQuestion()
 {
  resetState()

  if (Questions.length === currentQuestionIndex) { 
   return finishGame()
  }

   $questionText.textContent = Questions[currentQuestionIndex].question
   Questions[currentQuestionIndex].answers.forEach(answer => {
      const newAnswer = document.createElement("button")
      newAnswer.classList.add("button", "answer")
      newAnswer.textContent = answer.text 
      if (answer.correct){
         newAnswer.dataset.correct = answer.correct
      }
   $answersContainer.appendChild(newAnswer)

   newAnswer.addEventListener("click", selectAnswer)

   });
}

 function resetState(){
    while($answersContainer.firstChild)
   {
      $answersContainer.removeChild($answersContainer.firstChild)
   }

   document.body.removeAttribute("class")
   $nextQuestionButton.classList.add("hide")
}

 function selectAnswer(event){
   const answerClicked = event.target
   const isCorrect = answerClicked.dataset.correct === "true";

      if (isCorrect) {
         answerClicked.classList.add("correct");
         document.body.classList.add("correct");
         totalCorrect++;
   }
      else {
         answerClicked.classList.add("incorrect");
         document.body.classList.add("incorrect");
      }

         document.querySelectorAll(".answer").forEach(button => {
        button.disabled = true;
          });

      $nextQuestionButton.classList.remove("hide")
      currentQuestionIndex++
}

function finishGame(){
   document.body.style.backgroundImage = "url('imagens/e3ff3148529bb16a1ce5e8bd4ce9f838.jpeg')";
   const totalQuestions = Questions.length
   const performace = Math.floor (totalCorrect * 100/ totalQuestions)

   let message = ""

   switch (true) {
      case(performace >= 90):
         message = "Exelente ^^"
         break
      case(performace >= 70):
         message = "Muito Bom!"
         break
      case(performace >= 50):
         message = "Na média"
         break
      default:
         message = "Pode melhorar ;-;"
   }

   $questionsContainer.innerHTML = 
   `
   <div class="finalcontainer">
   <p class="final">
      Voce acertou ${totalCorrect} de ${totalQuestions} Questões!
      <span>Resultado: ${message}</span>
   </p>
   <button onclick=window.location.reload() class="nextQuestion">Tentar Novamente</button>
   </div>
  `
}
