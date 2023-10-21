(() => {
  class AnswerFieldSetElement extends HTMLFieldSetElement {
    constructor() {
      super();

      const aElem = document.createElement("a");
      aElem.setAttribute("href", this.dataset.href);
      aElem.innerText = `問${this.dataset.index}`;

      const legendElem = document.createElement("legend");
      legendElem.appendChild(aElem);
      this.appendChild(legendElem);

      [
        "ア",
        "イ",
        "ウ",
        "エ"
      ].forEach((text, index) => {
        const labelElem = document.createElement("label");
        const inputElem = document.createElement("input");
        inputElem.setAttribute("type", "radio");
        inputElem.setAttribute("name", `question${this.dataset.index}`);
        inputElem.setAttribute("value", index + 1);
        labelElem.appendChild(inputElem);
        labelElem.appendChild(new Text(text));
        this.appendChild(labelElem);
      });
    }
  }
  customElements.define("answer-fieldset", AnswerFieldSetElement, { extends: "fieldset" });

  const formElem = document.querySelector("form");

  formElem.onsubmit = (e) => {
    e.preventDefault();

    new FormData(formElem);
  };

  const answers = {
    "question1": "1",
    "question2": "1",
    "question3": "3"
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
