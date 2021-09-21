import NS from "./NameSpace";
import { FormView } from "./form/FormView";
import { ModalView } from "./modal/ModalView";
import "../style/style.scss";

window.addEventListener("DOMContentLoaded", () => {
    const opinionForm = (document.forms as any)["opinion-send"] as HTMLFormElement;
    const modalScreen = document.getElementById("modal-container") as HTMLDivElement;

    NS.formView = new FormView({
        form: opinionForm,
        name: opinionForm.fname,
        gender: opinionForm.fgender,
        age: opinionForm.fage,
        address: opinionForm.faddress,
        message: opinionForm.fmessage,
        submitBtn: opinionForm.fbutton,
        errArea: document.getElementById("submit-error-area") as HTMLDivElement,
        modalScreen: modalScreen as HTMLDivElement,
    });

    NS.modalView = new ModalView({
        screen: modalScreen,
        screenCover: document.getElementById("cover-div") as HTMLDivElement,
        dlBtn: document.getElementById("modal-download") as HTMLButtonElement,
        closeBtn: document.getElementById("modal-close") as HTMLDivElement,
    });
});
