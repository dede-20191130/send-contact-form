import NS from "./NameSpace";
import { FormView } from "./form/FormView";
import { ModalView } from "./modal/ModalView";
import "../style/style.scss";

window.addEventListener("DOMContentLoaded", () => {
    const opinionForm = document.forms["opinion-send"];
    const modalScreen = document.getElementById("modal-container");
    NS.formView = new FormView({
        form: opinionForm,
        name: opinionForm.fname,
        gender: opinionForm.fgender,
        age: opinionForm.fage,
        address: opinionForm.faddress,
        message: opinionForm.fmessage,
        submitBtn: opinionForm.fbutton,
        errArea: document.getElementById("error-area"),
        modalScreen: modalScreen,
    });

    NS.modalView = new ModalView({
        screen: modalScreen,
        screenCover: document.getElementById("cover-div"),
        dlBtn: document.getElementById("modal-download"),
        closeBtn: document.getElementById("modal-close"),
    });
});
