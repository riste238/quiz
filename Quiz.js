
class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.score = 0;
        this.currentIndex = 0;
    }
    // make some functionality here.
    getQuestion() {
        return this.questions[this.currentIndex];
    }
    checkAnswer(answer) {
        if (answer === this.getQuestion().answer) {
            this.score += this.getQuestion().points;
        }
        this.currentIndex++;
    }

    isEnd() {
        return this.currentIndex === this.questions.length;
    }
    getRandomOptions() {
        // 
        let copy = [].concat(this.getQuestion().options);
        let randomized = [];
        for (let i = 0; i < 4; i++) {
            let rand = Math.floor(Math.random() * copy.length);
            randomized.push(copy[rand]);
            copy.splice(rand, 1);   
        }
        return randomized;
    }
}

// let quiz = new Quiz(questions);