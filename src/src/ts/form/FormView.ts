import { FormController } from "./FormController";

interface IFormViewArg {
    address: HTMLInputElement;
    age: HTMLInputElement;
    errArea: HTMLDivElement;
    form: HTMLFormElement;
    gender: RadioNodeList;
    message: HTMLTextAreaElement;
    name: HTMLInputElement;
    submitBtn: HTMLInputElement;
    modalScreen: HTMLDivElement;

}

export class FormView {
    private address: HTMLInputElement;
    private age: HTMLInputElement;
    public errArea: HTMLDivElement;
    private form: HTMLFormElement;
    private formController: FormController;
    private gender: RadioNodeList;
    private message: HTMLTextAreaElement;
    private name: HTMLInputElement;
    private submitBtn: HTMLInputElement;
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
    }: IFormViewArg) {
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

    private setSubmitEvt(elem: HTMLElement) {
        elem.onclick = (ev) => {
            ev.preventDefault();
            this.onSubmit();
        };
    }

    private setInputBoxFocusEvts(elem: HTMLElement) {
        elem.onfocus = function (ev) {
            document
                .querySelector(`label[for="${(ev.currentTarget as HTMLElement)?.id}"]`)
                ?.classList.add("active");
        };
        elem.onblur = function (ev: any) {
            if (ev.currentTarget.value === "") {

                document
                    .querySelector(`label[for="${(ev.currentTarget as HTMLElement)?.id}"]`)
                    ?.classList.remove("active");

            }
        };
    }

    private onSubmit() {
        this.formController.onSubmit({
            name: this.name.value,
            gender: this.gender.value,
            age: this.age.value,
            address: this.address.value,
            message: this.message.value,
        });
    }
}
