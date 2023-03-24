(function ($) {
    "use strict";

    const evaluatingDelayMs = 10;

    let correctAnswers = 0;
    let currentQuestionIndex = 0;

    let questionList = [
        {
            questionText: "Kolik zbývá v současnosti Markétce zubů?",
            options: ["5", "25", "32", "45"],
            correctAnswer: "25"
        },
        {
            questionText: "Které z následujících psisek je největší basťoch?",
            options: ["Kouďáček", "Fíbí", "Skřetisko", "Ginuška"],
            correctAnswer: "Fíbí"
        },
        {
            questionText: "Po kom se Václavíček jmenuje?",
            options: ["Táta", "Děda", "Máma", "Strejda"],
            correctAnswer: "Máma"
        },
        {
            questionText: "Jaké zvíře kouslo Makrelíčka do nohy v zoo?",
            options: ["Želva", "Fíbí", "Velbloud", "Papouch"],
            correctAnswer: "Velbloud"
        },
        {
            questionText: "Kde Václavíček požádal Makrelíčka o ruku?",
            options: ["Sokolov", "Geirangerfjord", "Geyrangerfjord", "Korsika"],
            correctAnswer: "Geirangerfjord"
        }
    ];

    let correctAnswersToAssesment = [
        "Jsi blbeček a vůbec nás neznáš, ale přesto Tě zveme na",
        "Moc nás teda neznáš, ale přesto Tě zveme na",
        "Nic moc, je tu prostor pro zlepšení, ale přesto Tě zveme na",
        "To ujde! A tak Tě zveme na",
        "Jsi náš kámoš, tak Ti jednu chybičku odpustíme a zveme Tě na",
        "Hustý, jsi borec! A proto Tě zveme na"
    ]

    $(entryPointContainer).show();
    $(questionsContainer).hide();
    $(resultContainer).hide();
    $(weddingInfoContainer).hide();
    
    showQuestion(questionList[currentQuestionIndex]);

    $(enterQuestionerButton).click(showQuestions);
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

        $(resultLabel).text(correctAnswers + " / " + questionList.length);
        $(assessmentLabel).text(correctAnswersToAssesment[correctAnswers]);
        $("body").css("background-color", "white");
        console.log(correctAnswers + "/" + questionList.length);
    }

    function showQuestions() {
        $(entryPointContainer).hide();
        $(questionsContainer).show();
        $(resultContainer).hide();
        $(weddingInfoContainer).hide();
    }

    function showWeddingInfo() {
        $(entryPointContainer).hide();
        $(questionsContainer).hide();
        $(resultContainer).hide();
        $(weddingInfoContainer).show();
    }

})(jQuery);

