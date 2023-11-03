(() => {
  class AppElement extends HTMLDivElement {
    constructor() {
      super();

      this.innerHTML = `
<header class="header">
  <nav class="global-nav">
  </nav>
</header>

<div class="wrapper">
  <main>
    <div>
      <form
        is="answer-form"
        data-total="${this.dataset.total}"
        data-list-in-progress=""
        data-answer-sheet-only="${this.dataset.answerSheetOnly}"
      >
      </form>
    </div>
  </main>
</div>

<footer class="footer">
</footer>
      `
    }
  }
  customElements.define("app-div", AppElement, { extends: "div" });

  function createMultipleChoice(nth) {
    return ["ア", "イ", "ウ", "エ"].map((text, index) => {
      return `
<label>
  <input type="radio" name="question${nth}" value="${index + 1}"></input>
  ${text}
</label>
      `
    });
  }

  function createAnswerColumn(href, nth, answerSheetOnly) {
    return `
<fieldset>
  <legend>
    <a ${answerSheetOnly === 'true' ? '' : `href="${href}"`}>問${nth}</a>
  </legend>
  ${createMultipleChoice(nth).join('')}
</fieldset>
    `
  }

  class AnswerFormElement extends HTMLFormElement {
    constructor() {
      super();

      const answerColumns = [];
      const listInProgress = this.dataset.listInProgress.split(",").map(i => parseInt(i));
      for (let i = 1; i <= parseInt(this.dataset.total); i++) {
        if (listInProgress.includes(i)) continue;
        const answerColumn = createAnswerColumn(`${i}/index.html`, i, this.dataset.answerSheetOnly);
        answerColumns.push(answerColumn);
      }

      this.innerHTML = `
${answerColumns.join('')}
<input type="submit" value="Submit">
<input type="reset" value="Reset">
<output></output>
      `
    }
  }
  customElements.define("answer-form", AnswerFormElement, { extends: "form" });

  const formElem = document.querySelector("form");

  formElem.onsubmit = (e) => {
    e.preventDefault();

    new FormData(formElem);
  };

  fetch(`index.json`)
    .then((response) => response.json())
    .then((data) => {
      let answers = {};
      data["answers"].forEach((elem, i) => {
        answers[`question${i+1}`] = elem["value"];
      });
      return answers;
    })
    .then((answers) => {
      const outputElem = document.querySelector("output");

      formElem.onformdata = (e) => {
        const formData = e.formData;
        let count = 0;
        formData.forEach((answer, index) => {
          if (parseInt(answer) === answers[index]) {
            count++;
          }
        })
        outputElem.value = `Your score: ${count} / ${Object.keys(answers).length}`;
      }
    });
})();
