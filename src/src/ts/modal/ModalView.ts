import { ModalModel } from "./ModalModel";

interface IModalViewArg {
    screen: HTMLDivElement;
    screenCover: HTMLDivElement;
    dlBtn: HTMLButtonElement;
    closeBtn: HTMLDivElement;

}

export class ModalView {
    private screen: HTMLDivElement;
    private screenCover: HTMLDivElement;
    private dlBtn: HTMLButtonElement;
    private closeBtn: HTMLDivElement;
    private modalModel: ModalModel;
    constructor({
        screen,
        screenCover,
        dlBtn,
        closeBtn
    }: IModalViewArg) {
        this.modalModel = new ModalModel();
        this.screen = screen;
        this.screenCover = screenCover;
        this.dlBtn = dlBtn;
        this.closeBtn = closeBtn;

        // avoid custom-event caveat by below
        // https://github.com/microsoft/TypeScript/issues/28357#issuecomment-436484705
        this.screen.addEventListener("show", ((ev: CustomEvent) => {
            this.modalModel.serializedData = ev.detail.serializedData;
            this.screen.hidden = !this.screen.hidden;
            this.screenCover.hidden = !this.screenCover.hidden;
            document.body.classList.add("preventScroll");
        }) as EventListener);
        this.dlBtn.onclick = this.download.bind(this);
        this.closeBtn.onclick = this.close.bind(this);
    }
    private download() {
        const text = this.modalModel.createText();
        const link = document.createElement("a");
        link.download = "受理内容.txt";
        link.href = this.modalModel.createTextBlob(text);

        link.click();

        URL.revokeObjectURL(link.href);
    }
    private close() {
        this.screen.hidden = !this.screen.hidden;
        this.screenCover.hidden = !this.screenCover.hidden;
        document.body.classList.remove("preventScroll");
    }
}
