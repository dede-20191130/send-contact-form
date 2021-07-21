import NS from "./NameSpace";
import { FormView } from "./FormView";
import { ModalView } from "./ModalView";
import "./style.scss";

window.addEventListener("DOMContentLoaded", (ev) => {
    const opinionForm = document.forms["opinion-send"];

    NS.formView = new FormView({
        form: opinionForm,
        name: opinionForm.fname,
        gender: opinionForm.fgender,
        age: opinionForm.fage,
        address: opinionForm.faddress,
        message: opinionForm.fmessage,
        submitBtn: opinionForm.fbutton,
        errArea: document.getElementById("error-area")
    });

    NS.modalView = new ModalView({
        screen: document.getElementById("modal-container"),
        screenCover: document.getElementById("cover-div"),
        dlBtn: document.getElementById("modal-download"),
        closeBtn: document.getElementById("modal-close"),
    });


})
