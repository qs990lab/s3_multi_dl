const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const getS3Obj = async () => {
    const dl_btn = document.getElementById("download-object-button");
    let target=[];
    let input_list = document.querySelectorAll("input[type=checkbox]:checked");

    // 対象のチェックボックスを取得する
    input_list.forEach((e, index)=>{
        if (e.className.startsWith('awsui_native-input_')){
            target.push(index);
            input_list[index].click();
        }
    });
    // 1つずつチェックして、ダウンロードする。ウェイト1S
    for (let i = 0; i < target.length; i++) {
        input_list[target[i]].click();
        dl_btn.click();
        input_list[target[i]].click();
        await _sleep(1000);
    }
    // チェックボックスを元に戻す
    target.forEach((e)=>{
        input_list[e].click();
    });
}

// 拡張ダウンロードボタンを配置する
// icon: https://css.gg/arrow-down-o
const putButton = () => {
    const append_btn = document.getElementById("append-button");
    if (append_btn == null) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.id = 'append-button';
        btn.onclick = getS3Obj;
        btn.className = 'gg-arrow-down-o';
        const pos = document.getElementById("download-object-button");
        pos.parentNode.parentNode.insertBefore(btn, pos.parentNode.nextSibling);
    } 
}
// 変更を監視
const target = document.querySelector('body');
//const target = document.querySelector('[aria-label="パンくずリスト"]');
// const target = document.getElementById("download-object-button");
const options = {
    childList: true,
    attributes: true,
}
const observer = new MutationObserver(putButton);
observer.observe(target, options);
// putButton();