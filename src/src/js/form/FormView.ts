import { FormController } from "./FormController";

export class FormView {
    address: any;
    age: any;
    errArea: any;
    form: any;
    formController: any;
    gender: any;
    message: any;
    name: any;
    submitBtn: any;
    constructor({
        form,
        name,
        gender,
        age,
        address,
        message,
        submitBtn,
        errArea,
        modalScreen
    }: any) {
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

    setSubmitEvt(elem: any) {
        elem.onclick = (ev: any) => {
            ev.preventDefault();
            this.onSubmit();
        };
    }

    setInputBoxFocusEvts(elem: any) {
        elem.onfocus = function (ev: any) {
            // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
            document
                .querySelector(`label[for="${ev.currentTarget.id}"]`)
                .classList.add("active");
        };
        elem.onblur = function (ev: any) {
            if (ev.currentTarget.value === "") {
                // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
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
