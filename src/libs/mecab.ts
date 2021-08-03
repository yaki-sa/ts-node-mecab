import { tokenizeSync } from '@enjoyjs/node-mecab';
import { Token } from '@enjoyjs/node-mecab/src/types';

// MeCabを用いてフリガナ(全角)を抽出する関数
export const extractFurigana = (text: string) => {
  let katakana = '';
  const result = tokenizeSync(text);
  result.map((token: Token) => {
    if (token.feature.reading) {
      katakana += token.feature.reading;
    }
  });
  return katakana;
};
