(() => {
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
