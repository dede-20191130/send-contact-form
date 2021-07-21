import { ModalModel } from "./ModalModel";

export class ModalView {
    constructor({ screen, dlBtn, closeBtn }) {
        this.modalModel = new ModalModel();
        this.screen = screen;
        this.dlBtn = dlBtn;
        this.closeBtn = closeBtn;

        this.dlBtn.onclick = this.download;
        this.closeBtn.onclick = this.close;

    }
    download() {
        const text = this.modalModel.createText();
        const link = document.createElement('a');
        link.download = '受理内容.txt';
        link.href = this.modalModel.createTextBlob(text);

        link.click();

        URL.revokeObjectURL(link.href);

    }
    close() {
        //todo screen hidden change
    }
}