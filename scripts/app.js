window.onload = function() {
  console.log('Loaded, bro');
  var startButton = document.getElementById('start');
  var resetButton = document.getElementById('reset');

  startButton.addEventListener('click', function() {
    console.log('Starting a game!');
    triviaGame.start();
  });

  resetButton.addEventListener('click', function() {
    triviaGame.reset()
  })
}


var triviaGame = {

  triviaQuestions: {
    1: {
        question: "What color is the sky?",
        answers: {
          a1: {text: "blue", key: true},
          a2: {text: "red", key: false},
          a3: {text: "green", key: false},
          a4: {text: "black", key: false}
        }
      },
    2: {
      question: "What color is the dirt?",
      answers: {
        a1: {text: "brown", key: true},
        a2: {text: "red", key: false},
        a3: {text: "green", key: false},
        a4: {text: "pink", key: false}
    }}
  },

  score: 0,
  progress: 0,

  start: function() {
    // var scoreDisplay = document.querySelector('.score');
    // // set current score
    // scoreDisplay.innerText = `Score: ${this.score}`;

    this.loadQuestion('1');
  },

  loadQuestion: function(questionKey) {
    // set our variables
    var questionContainer = document.querySelector('.question-container');
    var questionDisplay = document.querySelector('.question');
    var answerDisplay = document.querySelector('.answers-container');

    // reset question and answers
    questionDisplay.innerText = ""
    answerDisplay.innerHTML = ""

    // set current score
    var scoreDisplay = document.querySelector('.score');
    scoreDisplay.innerText = `Score: ${this.score}`;

    // set question
    questionDisplay.innerHTML = this.triviaQuestions[questionKey].question;
    questionContainer.setAttribute("data-answer", questionKey)

    // loop to build our answer
    for (answer in this.triviaQuestions[questionKey].answers) {
      // set our vars to clean up logic
      var answerContainer = document.createElement('div');
      var data = this.triviaQuestions[questionKey].answers[answer];

      // set some attribute stuff
      answerContainer.setAttribute("class", answer);
      answerContainer.setAttribute("class", "answer");
      answerContainer.setAttribute("data-answer", data.key);
      answerContainer.innerText = data.text;

      // add an event listener to check if the answer is right

      answerContainer.addEventListener('click', function(event) {
        var answer = this;

        triviaGame.checkAnswer(answer)
      })

      answerDisplay.appendChild(answerContainer);
    }
  },

  checkAnswer: function(answerNode) {
    this.progress +=1

    if (answerNode.getAttribute('data-answer') === "true") {
      this.score += 1
      answerNode.style.backgroundColor = "green";
      this.nextQuestion(answerNode);
    } else {
      answerNode.style.backgroundColor = "red";
      this.nextQuestion(answerNode);
    }
  },

  nextQuestion: function(answer) {
    var self = this;

    setTimeout(function() {
      if (!triviaGame.checkGameEnd()) {
        triviaGame.loadQuestion((self.progress + 1).toString())
      } else {
        triviaGame.triggerWinState()
      }
    }, 450)
  },

  checkGameEnd: function() {
    return this.progress === Object.keys(this.triviaQuestions).length
  },

  reset: function() {
    var questionDisplay = document.querySelector('.question');
    var answerDisplay = document.querySelector('.answers-container');
    var scoreDisplay = document.querySelector('.score');

    this.progress = 0
    this.score = 0

    questionDisplay.innerText = ""
    answerDisplay.innerHTML = ""
    scoreDisplay.innerText = `Score: ${this.score}`;
  },

  triggerWinState: function() {
    var self = this;
    var scoreDisplay = document.querySelector('.score');
    scoreDisplay.innerText = `Score: ${this.score}`;

    setTimeout(function() {
      alert(`Game over! Your score is ${self.score} out of ${Object.keys(self.trviaQuestions).length}`)
      triviaGame.reset()
    }, 400)
  }
}
