import { fullEiSujiConverter, fullKatakanaConverter, hiraganaConverter } from './libs/stringConverter'
import { extractFurigana } from './libs/mecab'  

  (() => {
    // コマンドラインから引数を指定した場合、ふりがなを抽出する
    if (process.argv.length > 2) {
      const text = process.argv[2];
      const fullEiSuji = fullEiSujiConverter(text);
      console.log('全角（英数字）変換：', fullEiSuji);
      const fullKatakana = fullKatakanaConverter(fullEiSuji);
      console.log('全角（カタカナ）変換：', fullKatakana);
      const furigana_katakana = extractFurigana(fullKatakana);
      console.log('フリガナ：', furigana_katakana);
      const furigana_hiragana = hiraganaConverter(furigana_katakana);
      console.log('ふりがな：', furigana_hiragana);
    } else {
      console.log('引数を設定してください');
      console.log(
        '（例）node index.js 昔々、ある所にお爺さんとお婆さんが居たそうですよ！！'
      );
    }
  })();