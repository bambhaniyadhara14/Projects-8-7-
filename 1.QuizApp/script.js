const quizData = [
  {
    question: "1. Which keyword is used to declare a variable in JavaScript?",
    options: ["var", "int", "string", "define"],
    answer: "var"
  },

  {
    question: "2. Which method is used to display a message in a popup box?",
    options: ["console.log()", "alert()", "prompt()", "print()"],
    answer: "alert()"
  },

  {
    question: "3. Which function is used to take input from the user?",
    options: ["alert()", "confirm()", "prompt()", "input()"],
    answer: "prompt()"
  },

  {
    question: "4. Which symbol is used for single-line comments in JavaScript?",
    options: ["<---->", "//", "/* */", "#"],
    answer: "//"
  },

  {
    question: "5. Which operator is used for strict equality in JavaScript?",
    options: ["=", "==", "===", "!="],
    answer: "==="
  },

  {
    question: "6. Which method is used to print output in the browser console?",
    options: ["document.write()", "alert()", "console.log()", "prompt()"],
    answer: "console.log()"
  },

  {
    question: "7. Which loop is best when the number of iterations is known?",
    options: ["while", "do...while", "for", "switch"],
    answer: "for"
  },

  {
    question: "8. What is the correct keyword to create a constant variable?",
    options: ["let", "var", "const", "constant"],
    answer: "const"
  },

  {
    question: "9. Which data type is used to store true or false values?",
    options: ["String", "Number", "Boolean", "Array"],
    answer: "Boolean"
  },

  {
    question: "10. Which method converts a JSON string into a JavaScript object?",
    options: [
      "JSON.stringify()",
      "JSON.parse()",
      "JSON.convert()",
      "JSON.object()"
    ],
    answer: "JSON.parse()"
  }
];





let index = 0;
var id;
var timeupQuestions = [];
var nextQuestions = [];
var score = 0;
var flag = 0;

function getData(index) {
  document.querySelectorAll(".timer span")[0].innerText = "01";
  document.querySelectorAll(".timer span")[1].innerText = "00";

  if (index == quizData.length - 1) {
    document.querySelector(".next").disabled = true;
    document.querySelector(".next").classList.add("no-cursor");
  } else if (index == 0) {
    document.querySelector(".pre").disabled = true;
    document.querySelector(".pre").classList.add("no-cursor");
  } else {
    document.querySelector(".pre").classList.remove("no-cursor");
    document.querySelector(".pre").disabled = false;
    document.querySelector(".next").disabled = false;
    document.querySelector(".next").classList.remove("no-cursor");
  }

  document.querySelector(".questionList").innerHTML = `
    <article>
      <h2>${quizData[index].question}</h2>

      <main>
        <aside>
          <input type="radio" name="mcq" form="myform"
            value="${quizData[index].options[0]}" id="id1">
          <label for="id1">${quizData[index].options[0]}</label>
        </aside>

        <aside>
          <input type="radio" name="mcq" form="myform"
            value="${quizData[index].options[1]}" id="id2">
          <label for="id2">${quizData[index].options[1]}</label>
        </aside>

        <aside>
          <input type="radio" name="mcq" form="myform"
            value="${quizData[index].options[2]}" id="id3">
          <label for="id3">${quizData[index].options[2]}</label>
        </aside>

        <aside>
          <input type="radio" name="mcq" form="myform"
            value="${quizData[index].options[3]}" id="id4">
          <label for="id4">${quizData[index].options[3]}</label>
        </aside>
      </main>
    </article>
  `;

  setTimeout(() => {
    document.querySelectorAll(".timer span")[0].innerText = "00";
    document.querySelectorAll(".timer span")[1].innerText = "59";
  }, 1000);

  setTimeout(() => {
    id = setInterval(() => {
      if (document.querySelectorAll(".timer span")[1].innerText == "0") {
        clearInterval(id);
        timeupQuestions.push(index);
        index++;
        flag++;

        if (index < quizData.length) {
          getData(index);
        }
        return;
      }

      document.querySelectorAll(".timer span")[1].innerText--;
    }, 1000);
  }, 1000);
}

getData(index);

document.querySelector(".next").onclick = function (event) {
  event.preventDefault();
  clearInterval(id);

  nextQuestions.push(index);

  if (index < quizData.length - 1) {
    index++;
    getData(index);
  }
};

document.querySelector(".pre").onclick = function (event) {
  event.preventDefault();
  clearInterval(id);

  if (index > 0) {
    index--;
    getData(index);
  }
};



document.querySelector("form").onsubmit = function (event) {
  event.preventDefault();
  flag++;

  let attempted = 0;

  for (let i = 0; i < quizData[index].options.length; i++) {
    if (event.target[i].checked) {
      attempted++;

      if (event.target[i].value == quizData[index].answer) {
        score++;
      }
      break;
    }
  }

  clearInterval(id);

  if (index == quizData.length - 1) {

    if (flag == quizData.length) {

      document.querySelector(".wrapper").style.display = "none";
      document.body.classList.add("final");

      let totalQuestions = quizData.length;
      let wrong = totalQuestions - score;
      let percentage = (score / totalQuestions) * 100;

      let resultText = "";

      if (percentage >= 40) {
        resultText = "PASS 🎉";
      } else {
        resultText = "FAIL ❌";
      }

      
      document.querySelector(".result").innerHTML = `
        <pre>
      Total Questions : ${totalQuestions}

      Attempted : ${flag}

      Correct : ${score}

      Wrong : ${wrong}

      Score : ${score}/${totalQuestions}

      Percentage : ${percentage}%

      Result : ${resultText}
        </pre>
      `;
    }

    return;
  }

  index++;
  getData(index);
};