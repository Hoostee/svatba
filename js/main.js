(function ($) {
    "use strict";

    const evaluatingDelayMs = 10;

    let correctAnswers = 0;
    let currentQuestionIndex = 0;

    $(questionsContainer).show();
    $(resultContainer).hide();
    $(weddingInfoContainer).hide();

    let questionList = [
        {
            questionText: "Kolik v současnosti zbývá Markétce zubů?",
            options: ["7", "27", "32", "47"],
            correctAnswer: "27"
        },
        {
            questionText: "Který z následujících psisek je největší basťoch?",
            options: ["Kouďáček", "Fíbí", "Skřetisko", "Ginuška"],
            correctAnswer: "Fíbí"
        }
    ];

    
    showQuestion(questionList[currentQuestionIndex]);

    $(enterButton).click(showWeddingInfo);

    function showQuestion(question) {
        $("body").css("background-color", "white");
        $(questionLabel).css("color", "orange");
        $(questionAnswers).empty();

        $(questionLabel).text(question.questionText);

        for (const option of question.options) {
            let button = $("<button></button>")
                .text(option)
                .click(function () { handleAnswer(question, option); });
            $(questionAnswers).append(button);
        }
    }

    function handleAnswer(question, answer) {

        $(questionAnswers).empty();

        setEvaluating().then(() => {
            if (question.correctAnswer === answer) {
                handleCorrectAnswer()
            } else {
                handleIncorrectAnswer(question);
            }

            if (++currentQuestionIndex < questionList.length) {
                $(questionAnswers).append($("<button></button>")
                    .text("Další otázka")
                    .click(() => { showQuestion(questionList[currentQuestionIndex]); }));
            } else {
                $(questionAnswers).append($("<button></button>")
                    .text("Pokračovat")
                    .click(allQuestionsAnswered));
            }
            
        });

    }

    async function setEvaluating() {
        $(questionLabel).text("Vypočítávám...");
        return new Promise(r => setTimeout(r, evaluatingDelayMs));
    }

    function handleCorrectAnswer() {
        $(questionLabel).css("color", "white");
        $("body").css("background-color", "green");
        $(questionLabel).text("Výborně!");
        correctAnswers++;
    }
    
    function handleIncorrectAnswer(question) {
        $(questionLabel).css("color", "white");
        $("body").css("background-color", "red");
        $(questionLabel).text("Špatně!!! Správná odpověď: " + question.correctAnswer);
    }

    function allQuestionsAnswered() {
        $(questionsContainer).hide();
        $(resultContainer).show();

        $(resultLabel).text("Počet správných odpovědí: " + correctAnswers + " / " + questionList.length);
        $(assessmentLabel).text(resolveAssessmentLabel());
        $("body").css("background-color", "white");
        console.log(correctAnswers + "/" + questionList.length);
    }

    function resolveAssessmentLabel() {
        // TODO
        return "Hustý! Zveme Tě na";
    }

    function showWeddingInfo() {
        $(questionsContainer).hide();
        $(resultContainer).hide();
        $(weddingInfoContainer).show();
    }

})(jQuery);

