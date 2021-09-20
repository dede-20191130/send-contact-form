import NS from "./NameSpace";
import { FormView } from "./form/FormView";
import { ModalView } from "./modal/ModalView";
import "../style/style.scss";

window.addEventListener("DOMContentLoaded", () => {
    // @ts-expect-error ts-migrate(7015) FIXME: Element implicitly has an 'any' type because index... Remove this comment to see the full error message
    const opinionForm = document.forms["opinion-send"];
    const modalScreen = document.getElementById("modal-container");

    // @ts-expect-error ts-migrate(2322) FIXME: Type 'FormView' is not assignable to type 'null'.
    NS.formView = new FormView({
        form: opinionForm,
        name: opinionForm.fname,
        gender: opinionForm.fgender,
        age: opinionForm.fage,
        address: opinionForm.faddress,
        message: opinionForm.fmessage,
        submitBtn: opinionForm.fbutton,
        errArea: document.getElementById("submit-error-area"),
        modalScreen: modalScreen,
    });

    // @ts-expect-error ts-migrate(2322) FIXME: Type 'ModalView' is not assignable to type 'null'.
    NS.modalView = new ModalView({
        screen: modalScreen,
        screenCover: document.getElementById("cover-div"),
        dlBtn: document.getElementById("modal-download"),
        closeBtn: document.getElementById("modal-close"),
    });
});
