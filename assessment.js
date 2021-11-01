'use strict'
// ユーザー名入力欄：ユーザー名の取得に使用する
const userNameInput = document.getElementById('user-name');
// 診断ボタン：ボタン押下時に診断処理を実行する
const assessmentButton = document.getElementById('assessment');
// 結果表示エリア：診断結果を表示する場所
const resultArea = document.getElementById('result-area');
// ツイートボタン表示エリア：ツイートボタンを表示する場所
const tweetButtonArea = document.getElementById('tweet-area');

assessmentButton.onclick = function(){
    // 診断ボタンがクリックされた時の処理
    const userName = userNameInput.value;
    if( userName.length === 0){
        // ユーザー名が0文字の場合は処理を中断する
        // (return 句は処理の結果を返し、関数を終了する)
        return;
    }

    // 診断結果表示エリアの作成
    resultArea.innerText = '';
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultArea.appendChild(header);

    const paragraph = document.createElement('p');
    let result = assessment(userName);
    result = result.replaceAll('{userName',userName);
    paragraph.innerText = result;
    resultArea.appendChild(paragraph);

    // ツイートエリアの作成
    tweetDivided.innerText = "";
    const anchor = document.createElement('a');
    const hrefValue =
         'https://twitter.com/intent/tweet?button_hashtag=あなたのいいところ&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';
    tweetDivided.appendChild(anchor);

    // widgets.js の設定
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);

}

const answers = [
'{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
'{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
'{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
'{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
'{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
'{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
'{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
'{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
'{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
'{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
'{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
'{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
'{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
'{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
'{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
'{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
];

/**
 * ユーザー名をパラメータで受け取り、
 * いいところの診断のテンプレートを選び、
 * ユーザー名を入れて返却します。
 * @param {string} userName ユーザー名
 * @returns {string} 診断結果
 */
function assessment(userName){
    // ユーザー名の全ての文字コードを足し合わせる
    let sumOfCharCode = 0;
    for(let i=0; i<userName.length; i++){  // ユーザー名の文字数分ループ
        sumOfCharCode += userName.charCodeAt(i); //文字コードを足していく
    }

    // answersの添字の範囲内の数値に変換する
    const index = sumOfCharCode % answers.length;
    // テンプレートの配列から結果を取得する
    let result = answers[index];
    // {userName}部分をユーザー名で置換する
    result = result.replaceAll('{userName}', userName);
return result;
}




console.assert(
    assessment('米倉') ===
    '米倉のいいところは好奇心です。新しいことに向かっていく米倉の心構えが多くの人に魅力的に映ります。',
  '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
    );

