import { ModalModel } from "./ModalModel";

export class ModalView {
    closeBtn: any;
    dlBtn: any;
    modalModel: any;
    screen: any;
    screenCover: any;
    constructor({
        screen,
        screenCover,
        dlBtn,
        closeBtn
    }: any) {
        this.modalModel = new ModalModel();
        this.screen = screen;
        this.screenCover = screenCover;
        this.dlBtn = dlBtn;
        this.closeBtn = closeBtn;

        this.screen.addEventListener("show", (ev: any) => {
            this.modalModel.serializedData = ev.detail.serializedData;
            this.screen.hidden = !this.screen.hidden;
            this.screenCover.hidden = !this.screenCover.hidden;
            document.body.classList.add("preventScroll");
        });
        this.dlBtn.onclick = this.download.bind(this);
        this.closeBtn.onclick = this.close.bind(this);
    }
    download() {
        const text = this.modalModel.createText();
        const link = document.createElement("a");
        link.download = "受理内容.txt";
        link.href = this.modalModel.createTextBlob(text);

        link.click();

        URL.revokeObjectURL(link.href);
    }
    close() {
        this.screen.hidden = !this.screen.hidden;
        this.screenCover.hidden = !this.screenCover.hidden;
        document.body.classList.remove("preventScroll");
    }
}
