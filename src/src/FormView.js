export class FormView {
  constructor({
    formController,
    form,
    name,
    gender,
    age,
    address,
    message,
    submitBtn,
    errArea,
  }) {
    this.formController = formController;
    this.form = form;
    this.name = name;
    this.gender = gender;
    this.age = age;
    this.address = address;
    this.message = message;
    this.submitBtn = submitBtn;
    this.errArea = errArea;

    this.setSubmitEvt(this.submitBtn);
  }

  setSubmitEvt(elem) {
    elem.onclick = (ev) => {
      ev.preventDefault();
      this.onSubmit();
    };
  }
  onSubmit() {
    this.formController.onSubmit();
  }
}
