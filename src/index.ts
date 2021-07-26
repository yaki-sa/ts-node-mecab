const MeCab = require('mecab-async');

// 半角(英数字)→全角(英数字)に変換する関数
const fullEiSujiConverter = (text: string) => {
    return text.replace(/[!-~]/g, (s) => {
      return String.fromCharCode(s.charCodeAt(0) + 0xfee0);
    });
  };

// 半角（カタカナ）→全角（カタカナ）に変換する関数
const fullKatakanaConverter = (text: string) => {
    const kanaMap: {[key:string] : string }  = {
      ｶﾞ: 'ガ',
      ｷﾞ: 'ギ',
      ｸﾞ: 'グ',
      ｹﾞ: 'ゲ',
      ｺﾞ: 'ゴ',
      ｻﾞ: 'ザ',
      ｼﾞ: 'ジ',
      ｽﾞ: 'ズ',
      ｾﾞ: 'ゼ',
      ｿﾞ: 'ゾ',
      ﾀﾞ: 'ダ',
      ﾁﾞ: 'ヂ',
      ﾂﾞ: 'ヅ',
      ﾃﾞ: 'デ',
      ﾄﾞ: 'ド',
      ﾊﾞ: 'バ',
      ﾋﾞ: 'ビ',
      ﾌﾞ: 'ブ',
      ﾍﾞ: 'ベ',
      ﾎﾞ: 'ボ',
      ﾊﾟ: 'パ',
      ﾋﾟ: 'ピ',
      ﾌﾟ: 'プ',
      ﾍﾟ: 'ペ',
      ﾎﾟ: 'ポ',
      ｳﾞ: 'ヴ',
      ﾜﾞ: 'ヷ',
      ｦﾞ: 'ヺ',
      ｱ: 'ア',
      ｲ: 'イ',
      ｳ: 'ウ',
      ｴ: 'エ',
      ｵ: 'オ',
      ｶ: 'カ',
      ｷ: 'キ',
      ｸ: 'ク',
      ｹ: 'ケ',
      ｺ: 'コ',
      ｻ: 'サ',
      ｼ: 'シ',
      ｽ: 'ス',
      ｾ: 'セ',
      ｿ: 'ソ',
      ﾀ: 'タ',
      ﾁ: 'チ',
      ﾂ: 'ツ',
      ﾃ: 'テ',
      ﾄ: 'ト',
      ﾅ: 'ナ',
      ﾆ: 'ニ',
      ﾇ: 'ヌ',
      ﾈ: 'ネ',
      ﾉ: 'ノ',
      ﾊ: 'ハ',
      ﾋ: 'ヒ',
      ﾌ: 'フ',
      ﾍ: 'ヘ',
      ﾎ: 'ホ',
      ﾏ: 'マ',
      ﾐ: 'ミ',
      ﾑ: 'ム',
      ﾒ: 'メ',
      ﾓ: 'モ',
      ﾔ: 'ヤ',
      ﾕ: 'ユ',
      ﾖ: 'ヨ',
      ﾗ: 'ラ',
      ﾘ: 'リ',
      ﾙ: 'ル',
      ﾚ: 'レ',
      ﾛ: 'ロ',
      ﾜ: 'ワ',
      ｦ: 'ヲ',
      ﾝ: 'ン',
      ｧ: 'ァ',
      ｨ: 'ィ',
      ｩ: 'ゥ',
      ｪ: 'ェ',
      ｫ: 'ォ',
      ｯ: 'ッ',
      ｬ: 'ャ',
      ｭ: 'ュ',
      ｮ: 'ョ',
      '｡': '。',
      '､': '、',
      ｰ: 'ー',
      '｢': '「',
      '｣': '」',
      '･': '・',
    };
    let reg = new RegExp('(' + Object.keys(kanaMap).join('|') + ')', 'g');
    return text
      .replace(reg,  (s : string) => {
        return kanaMap[s];
      })
      .replace(/ﾞ/g, '゛')
      .replace(/ﾟ/g, '゜');
  };
  
  // MeCabを用いてフリガナ(全角)を抽出する関数
  const katakanaConverter = (text: string) => {
    MeCab.command = 'mecab';
    let katakana = '';
    const result = MeCab.parseSyncFormat(text);
    result.map((morph : any) => {
      // カタカナの取得方法は「reading」と「pronunciation」の2つ存在する
      // 本実装では「reading」だけを取得している
      if (morph.reading) {
        katakana += morph.reading;
      }
    });
    return katakana;
  };
  
  // カタカナ(全角)→ひらがな(全角)に変換する関数
  const hiraganaConverter = (text: string) => {
    return text.replace(/[\u30a1-\u30f6]/g, (s) => {
      return String.fromCharCode(s.charCodeAt(0) - 0x60);
    });
  };

  (() => {
    // コマンドラインから引数を指定した場合、ふりがなを抽出する
    if (process.argv.length > 2) {
      const text = process.argv[2];
      const fullEiSuji = fullEiSujiConverter(text);
      console.log('全角（英数字）変換：', fullEiSuji);
      const fullKatakana = fullKatakanaConverter(fullEiSuji);
      console.log('全角（カタカナ）変換：', fullKatakana);
      const furigana_katakana = katakanaConverter(fullKatakana);
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