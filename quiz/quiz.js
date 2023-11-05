/* const questions = [
    {
      question: "Question 1",
      answers: [
        { option: "Option 1.1", correct: true },
        { option: "Option 1.2", correct: false },
        { option: "Option 1.3", correct: false },
        { option: "Option 1.4", correct: false }
      ],
      image: "question1.jpg"
    },
    {
      question: "Question 2",
      answers: [
        { option: "Option 2.1", correct: false },
        { option: "Option 2.2", correct: true },
        { option: "Option 2.3", correct: false },
        { option: "Option 2.4", correct: false }
      ],
      image: "question2.jpg"
    },
    // Add more questions here
  ];
   */
  const questionContainer = document.getElementById("question-container");
  const submitButton = document.getElementById("submit-button");
  const scoreContainer = document.getElementById("score-container");
  
  let currentQuestionIndex = 0;
  let score = 0;
  let quizCompleted = false;
  
  function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionContainer.innerHTML = "";
  
    const questionElement = document.createElement("div");
    questionElement.classList.add("question");
  
    const imgElement = document.createElement("img");
    imgElement.src = question.image;
    imgElement.alt = "Question Image";
    questionElement.appendChild(imgElement);
  
    const pElement = document.createElement("p");
    pElement.textContent = question.question;
    questionElement.appendChild(pElement);
  
    const answersElement = document.createElement("div");
    answersElement.classList.add("answers");
    questionElement.appendChild(answersElement);
  
    question.answers.forEach((answer, index) => {
      const answerElement = document.createElement("div");
      answerElement.classList.add("answer");
  
      const inputElement = document.createElement("input");
      inputElement.type = "radio";
      inputElement.name = "question";
      inputElement.value = index;
      inputElement.id = `answer-${index}`;
  
      const labelElement = document.createElement("label");
      labelElement.textContent = answer.option;
      labelElement.setAttribute("for", `answer-${index}`);
  
      answerElement.appendChild(inputElement);
      answerElement.appendChild(labelElement);
      answersElement.appendChild(answerElement);
    });
  
    questionContainer.appendChild(questionElement);
  }
  
  
  function showScore() {
    const html = `<p>Ты ответила правильно на ${score} из ${questions.length} <br> что составило ${score / questions.length *100} %</p>`;
    scoreContainer.innerHTML = html;
  }
  
  function checkAnswer() {
    const selectedAnswer = document.querySelector('input[name="question"]:checked');
  
    if (selectedAnswer) {
      const selectedAnswerIndex = parseInt(selectedAnswer.value);
      const currentQuestion = questions[currentQuestionIndex];
    
      if (currentQuestion.answers[selectedAnswerIndex].correct) {
        score++;
        /* selectedAnswer.parentNode.classList.add("correct"); */
      } else {
        /* selectedAnswer.parentNode.classList.add("incorrect"); */
      }
      const AnswersEL = document.querySelectorAll('input[name="question"]');
      for(let i = 0; i < currentQuestion.answers.length; i++){
        if(currentQuestion.answers[i].correct){
            AnswersEL[i].parentNode.classList.add("correct");
        }
        else{
            AnswersEL[i].parentNode.classList.add("incorrect");
        }
      }
  
      currentQuestionIndex++;
    }
  
    if (currentQuestionIndex >= questions.length) {
      quizCompleted = true;
      showScore();
      submitButton.disabled = true;
    } else {
        setTimeout(showQuestion,1000);
      ;
    }
  }
  
  submitButton.addEventListener("click", function() {
    checkAnswer();
  
    if (quizCompleted) {
      setTimeout(function() {
        submitButton.style.display = "none";
      }, 1000);
    } else {
      setTimeout(function() {
        showQuestion();
      }, 1000);
    }
  });
  
  showQuestion();
