(() => {
  function createAnswerFieldSetElement(href, nth) {
    const fieldsetElem = document.createElement("fieldset");

    const aElem = document.createElement("a");
    aElem.setAttribute("href", href);
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
        const fieldsetElem = createAnswerFieldSetElement(`${i}/index.html`, i);
        this.appendChild(fieldsetElem);
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

  const answers = {
    "question1": "4",
    "question2": "3",
    "question3": "4",
    "question4": "2",
    "question5": "4",
    "question6": "1",
    "question7": "3",
    "question8": "3",
    "question9": "4",
    "question10": "1",
    "question11": "3",
    "question12": "4",
    "question13": "3",
    "question14": "2",
    "question15": "2",
    "question16": "4",
    "question17": "4",
    "question18": "4",
    "question19": "3",
    "question20": "4",
    "question21": "4",
    "question22": "4",
    "question23": "2",
    "question24": "4",
    "question25": "4"
  };

  const outputElem = document.querySelector("output");

  formElem.onformdata = (e) => {
    const formData = e.formData;
    let count = 0;
    formData.forEach((answer, index) => {
      if (answer === answers[index]) {
        count++;
      }
    })
    outputElem.value = `Your score: ${count} / ${Object.keys(answers).length}`;
  }
})();
