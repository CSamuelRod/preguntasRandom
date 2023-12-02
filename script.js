// Variables
const questionInput = document.getElementById('questionInput');
const addQuestionButton = document.getElementById('addQuestion');
const questionList = document.getElementById('questionList');
const selectRandomQuestionsButton = document.getElementById('selectRandomQuestions');
const deleteAllQuestionsButton = document.getElementById('deleteAllQuestions');

// Array para almacenar las preguntas
const questions = [];

// Función para agregar una pregunta
function addQuestion() {
    const questionText = questionInput.value.trim();
    if (questionText !== '') {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${questionText}</span>
            <span class="delete">Eliminar</span>
        `;
        questionList.appendChild(li);
        questionInput.value = '';

        // Agregar pregunta al array
        questions.push(questionText);

        // Agregar evento para eliminar pregunta
        li.querySelector('.delete').addEventListener('click', () => {
            const index = questions.indexOf(questionText);
            if (index !== -1) {
                questions.splice(index, 1);
            }
            questionList.removeChild(li);
        });
    }
}

// Función para seleccionar 10 preguntas aleatorias
function selectRandomQuestions() {
    const totalQuestions = questions.length;
    if (totalQuestions >= 10) {
        const randomQuestions = [];
        for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(Math.random() * totalQuestions);
            randomQuestions.push(questions[randomIndex]);
            questions.splice(randomIndex, 1);
            totalQuestions--;
        }

        // Limpiar la lista de preguntas
        questionList.innerHTML = '';

        // Mostrar las 10 preguntas aleatorias en la lista
        randomQuestions.forEach((questionText) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${questionText}</span>
                <span class="delete">Eliminar</span>
            `;
            questionList.appendChild(li);

            // Agregar evento para eliminar pregunta
            li.querySelector('.delete').addEventListener('click', () => {
                const index = questions.indexOf(questionText);
                if (index !== -1) {
                    questions.splice(index, 1);
                }
                questionList.removeChild(li);
            });
        });
    } else {
        alert('No hay suficientes preguntas para seleccionar 10 aleatoriamente.');
    }
}

// Función para eliminar todas las preguntas
function deleteAllQuestions() {
    questions.length = 0;
    questionList.innerHTML = '';
}

// Eventos
addQuestionButton.addEventListener('click', addQuestion);
selectRandomQuestionsButton.addEventListener('click', selectRandomQuestions);
deleteAllQuestionsButton.addEventListener('click', deleteAllQuestions);

// Permitir agregar una pregunta presionando Enter
questionInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addQuestion();
    }
});
