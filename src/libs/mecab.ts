import { tokenizeSync } from '@enjoyjs/node-mecab';
interface IToken {
    feature: IFeature
}
interface IFeature {
	// 品詞
	pos?: string;

	// 品詞細分類1, 品詞細分類2, 品詞細分類3
	posSubs: [string | undefined, string | undefined, string | undefined];

	// 活用型
	conjugatedType?: string;

	// 活用形
	conjugatedForm?: string;

	// 原形
	basicForm?: string;

	// 読み
	reading?: string;

	// 発音
	pronunciation?: string;
}

 // MeCabを用いてフリガナ(全角)を抽出する関数
 export const extractFurigana = (text: string) => {
    let katakana = '';
    const result = tokenizeSync(text);
    result.map((token : IToken) => {
        if (token.feature.reading) {
            katakana += token.feature.reading;
        }
    })
    return katakana;
};