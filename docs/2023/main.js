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

  function createAnswerColumn(href, nth, answerSheetOnly) {
    const fieldsetElem = document.createElement("fieldset");

    const aElem = document.createElement("a");
    if (answerSheetOnly !== 'true') {
      aElem.setAttribute("href", href);
    }
    aElem.innerText = `問${nth}`;

    const legendElem = document.createElement("legend");
    legendElem.appendChild(aElem);
    fieldsetElem.appendChild(legendElem);

    [
      "ア",
      "イ",
      "ウ",
      "エ"
    ].forEach((text, index) => {
      const labelElem = document.createElement("label");
      const inputElem = document.createElement("input");
      inputElem.setAttribute("type", "radio");
      inputElem.setAttribute("name", `question${nth}`);
      inputElem.setAttribute("value", index + 1);
      labelElem.appendChild(inputElem);
      labelElem.appendChild(new Text(text));
      fieldsetElem.appendChild(labelElem);
    });

    return fieldsetElem;
  }

  class AnswerFormElement extends HTMLFormElement {
    constructor() {
      super();

      const listInProgress = this.dataset.listInProgress.split(",").map(i => parseInt(i));
      for (let i = 1; i <= parseInt(this.dataset.total); i++) {
        if (listInProgress.includes(i)) continue;
        const answerColumn = createAnswerColumn(`${i}/index.html`, i, this.dataset.answerSheetOnly);
        this.appendChild(answerColumn);
      }
      const submitElem = document.createElement("input");
      submitElem.setAttribute("type", "submit");
      submitElem.setAttribute("value", "Submit");
      this.appendChild(submitElem);
      const resetElem = document.createElement("input");
      resetElem.setAttribute("type", "reset");
      resetElem.setAttribute("value", "Reset");
      this.appendChild(resetElem);
      this.appendChild(document.createElement("output"));
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
