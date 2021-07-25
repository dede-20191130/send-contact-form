import { FormController } from "./FormController";

export class FormView {
    constructor({
        form,
        name,
        gender,
        age,
        address,
        message,
        submitBtn,
        errArea,
        modalScreen,
    }) {
        this.formController = new FormController({
            formView: this,
            modalScreen: modalScreen,
        });
        this.form = form;
        this.name = name;
        this.gender = gender;
        this.age = age;
        this.address = address;
        this.message = message;
        this.submitBtn = submitBtn;
        this.errArea = errArea;

        this.setSubmitEvt(this.submitBtn);

        for (const elem of [this.name, this.age, this.address, this.message]) {
            this.setInputBoxFocusEvts(elem);
        }

    }

    setSubmitEvt(elem) {
        elem.onclick = (ev) => {
            ev.preventDefault();
            this.onSubmit();
        };
    }

    setInputBoxFocusEvts(elem) {
        elem.onfocus = function (ev) {
            document
                .querySelector(`label[for="${ev.currentTarget.id}"]`)
                .classList.add("active");
        };
        elem.onblur = function (ev) {
            if (ev.currentTarget.value === "") {
                document
                    .querySelector(`label[for="${ev.currentTarget.id}"]`)
                    .classList.remove("active");

            }
        };
    }

    onSubmit() {
        this.formController.onSubmit({
            name: this.name.value,
            gender: this.gender.value,
            age: this.age.value,
            address: this.address.value,
            message: this.message.value,
        });
    }
}
