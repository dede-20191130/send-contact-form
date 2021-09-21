import * as moment from 'moment';
import { IFormModelArg } from "../form/FormModel";

const textTemplate = `※ご意見フォーム送信フェイク※
下記内容で承りました。

【氏名】$name
【性別】$gender
【年齢】$age歳
【住所】$address
【ご意見内容】
$message

-----------------------

受理日時：$date

`;

export class ModalModel {
    private _serializedData: string = "";
    set serializedData(value: string) {
        this._serializedData = value;
    }
    public createText() {
        const data = JSON.parse(this._serializedData) as IFormModelArg;

        // convert gender:int to string
        data.gender = ["その他", "男性", "女性"][Number(data.gender)];

        let text = textTemplate;
        let key: keyof IFormModelArg;
        for (key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
                text = text.replace("$" + key, data[key]);
            }
        }
        // hack for jest/typescript on testing moment
        // https://newbedev.com/using-rollup-for-angular-2-s-aot-compiler-and-importing-moment-js
        const momentFunc = (moment as any).default ? (moment as any).default : moment;
        text = text.replace("$date", momentFunc().format("YYYY年MM月DD日"));

        return text;
    }
    public createTextBlob(text: string) {
        const blob = new Blob([text], { type: "text/plain" });
        return URL.createObjectURL(blob);
    }
}
