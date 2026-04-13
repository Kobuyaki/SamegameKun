const panel = document.querySelectorAll('.box');

panel.forEach((panel, index) => {
    panel.addEventListener('click', () => {
        // indexは0から始まるので、1番目にするには +1 する
        console.log(`${index + 1}番目のボックスです！`);
        
        console.log(getConnectedBoxes(index));
    });
});

const color = Array.from({ length: 100 }, () => Math.floor(Math.random() * 3) + 1);

console.log(color);

const ybox = Array.from({ length: 100 }, (_, i) => Math.floor(i / 10) + 1);

console.log(ybox);

const xbox = Array.from({ length: 100 }, (_, i) => i % 10 + 1);

console.log(xbox);

function paintColor(){
color.forEach((num) => { // num に 1, 2, 3 が入る
  const rect = document.querySelector('.box');
  rect.classList = 'box';
  rect.classList.add('rect');
  
  // ここで num を使う！
  rect.classList.add(`color-${num}`); 
  
  container.appendChild(rect);
});
}

function getConnectedBoxes(index) {
    const targetColor = color[index];
    const connected = new Set(); // 重複を防ぐためのセット

    function check(i) {
        // 範囲外、または既にチェック済み、または色が違う場合は終了
        if (i < 0 || i >= 100 || connected.has(i) || color[i] !== targetColor) return;
        
        // 横移動の際、行をまたがないためのチェック
        if (Math.abs((i % 10) - (index % 10)) > 9) return; // 簡易的な境界チェック（必要に応じて精密化）

        connected.add(i); // 見つけた！

        // 上下左右を再帰的にチェック
        if (i % 10 !== 9) check(i + 1); // 右（右端じゃなければ）
        if (i % 10 !== 0) check(i - 1); // 左（左端じゃなければ）
        check(i + 10); // 下
        check(i - 10); // 上
    }

    check(index);


    if (connected.size >= 2){
        connected.forEach((connectedNum) => {
            color[connectedNum] = 0;
        })

        fall();

        paintColor();

        if (color.every(num => num === 0)) {
            alert("全消し達成！おめでとうございます！");
        }
    }
}

function fall(){
    for(let fall = 1 ; fall <= 10 ; fall++){
        for(let fallNum = 89 ; fallNum >= 0 ; fallNum--){
            if(color[fallNum] != 0 && color[fallNum + 10] == 0 && fallNum < 90){
                color[fallNum + 10] = color[fallNum] ; 
                color[fallNum] = 0 ;
            }
        }
    }
    slide();
    
    
    function slide() {
    // 最大9回繰り返せば、左に詰めきることができます
    for (let loop = 0; loop < 10; loop++) {
        // 0列目から8列目までチェック（右隣の9列目を左に持ってくるため）
        for (let x = 0; x < 9; x++) {
            // 現在の列(x)が完全に空かどうかを判定
            let isColumnEmpty = true;
            for (let y = 0; y < 10; y++) {
                if (color[x + y * 10] !== 0) {
                    isColumnEmpty = false;
                    break;
                }
            }

            // もし列が空なら、右隣の列をまるごとコピーしてくる
            if (isColumnEmpty) {
                for (let y = 0; y < 10; y++) {
                    const currentIdx = x + y * 10;
                    const rightIdx = (x + 1) + y * 10;
                    
                    color[currentIdx] = color[rightIdx];
                    color[rightIdx] = 0; // 右側を空にする
                }
            }
        }
    }


}
}
    

paintColor();