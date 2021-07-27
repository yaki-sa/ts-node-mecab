import { tokenizeSync } from '@enjoyjs/node-mecab';
 
 // MeCabを用いてフリガナ(全角)を抽出する関数
 export const extractFurigana = (text: string) => {
    let katakana = '';
    const result = tokenizeSync(text);
    result.map((morph : any) => {
        if (morph.feature.reading) {
            katakana += morph.feature.reading;
        }
    })
    return katakana;
};