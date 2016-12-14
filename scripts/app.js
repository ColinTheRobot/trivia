$(document).ready(function() {
  console.log('Loaded, bro');
  var $startButton = $('#start');
  var $resetButton = $('#reset');

  $startButton.click(function($event) {
    $event.stopPropagation()
    console.log('Starting a game!', $event);
    triviaGame.start();
  });

  $resetButton.click(function($event) {
    triviaGame.reset()
  })
})


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
    var $scoreDisplay = $('.score');
    // set current score
    $scoreDisplay.text(`Score: ${this.score}`);

    this.loadQuestion('1');
  },

  loadQuestion: function(questionKey) {
    // set our variables
    var $questionContainer = $('.question-container');
    var $questionDisplay = $('.question');
    var $answerDisplay = $('.answers-container');

    // reset question and answers
    $questionDisplay.text("")
    $answerDisplay.html("")

    // set current score
    var $scoreDisplay = $('.score');
    $scoreDisplay.text(`Score: ${this.score}`);

    // set question
    $questionDisplay.text(this.triviaQuestions[questionKey].question);
    $questionContainer.attr("data-answer", questionKey)

    // loop to build our answer
    for (answer in this.triviaQuestions[questionKey].answers) {
      // set our vars to clean up logic
      var $answerContainer = $('<div>');
      var data = this.triviaQuestions[questionKey].answers[answer];

      // set some attribute stuff
      $answerContainer.attr("class", answer);
      $answerContainer.attr("class", "answer");
      $answerContainer.attr("data-answer", data.key);
      $answerContainer.text(data.text);

      // add an event listener to check if the answer is right

      $answerContainer.click(function($event) {
        var $answer = $(this);
        // debugger
        triviaGame.checkAnswer($answer)
      })
      $answerContainer.appendTo($answerDisplay);
    }
    console.log($answerDisplay)
  },

  checkAnswer: function($answerNode) {
    this.progress += 1
    if ($answerNode.attr('data-answer') === 'true') {
      this.score += 1
      $answerNode.css({backgroundColor: 'green'});
      this.nextQuestion($answerNode);
    } else {
      $answerNode.css({backgroundColor: 'red'});
      this.nextQuestion($answerNode);
    }
  },

  nextQuestion: function($answer) {
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
    var $questionDisplay = $('.question');
    var $answerDisplay = $('.answers-container');
    var $scoreDisplay = $('.score');

    this.progress = 0
    this.score = 0

    $questionDisplay.text('')
    $answerDisplay.html('')
    $scoreDisplay.text(`Score: ${this.score}`);
  },

  triggerWinState: function() {
    var self = this;
    var $scoreDisplay = $('.score');
    $scoreDisplay.text(`Score: ${this.score}`);

    setTimeout(function() {
      alert(`Game over! Your score is ${self.score} out of ${Object.keys(self.triviaQuestions).length}`)
      triviaGame.reset()
    }, 400)
  }
}
