import moment from "moment";

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
    constructor() {
        this._serializedData = null;
    }
    set serializedData(value) {
        this._serializedData = value;
    }
    createText() {
        const data = JSON.parse(this._serializedData);

        // gender:int to string
        data.gender = ["その他", "男性", "女性"][data.gender];

        let text = textTemplate;
        for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
                text = text.replace("$" + key, data[key]);
            }
        }
        text = text.replace("$date", moment().format("YYYY年MM月DD日"));

        return text;
    }
    createTextBlob(text) {
        const blob = new Blob([text], { type: "text/plain" });
        return URL.createObjectURL(blob);
    }
}
