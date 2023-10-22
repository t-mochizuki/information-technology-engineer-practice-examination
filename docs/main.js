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

      const href = this.dataset.href;
      const listInProgress = this.dataset.listInProgress.split(",").map(i => parseInt(i));
      for (let i = 1; i <= parseInt(this.dataset.total); i++) {
        if (listInProgress.includes(i)) continue;
        const fieldsetElem = createAnswerFieldSetElement(`${href}${i}/index.html`, i);
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
    "question1": "1",
    "question2": "1",
    "question3": "3",
    "question4": "3"
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
