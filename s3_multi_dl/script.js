const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const getS3Obj = async () => {
    const append_btn = document.getElementById("append-button");
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

    // 選択数0件時の警告
    if (target.length === 0) {
        alert('ダウンロードするオブジェクトを選択してください');
        return;
    }

    // ボタン無効化（連打防止）
    append_btn.disabled = true;
    append_btn.style.opacity = '0.5';
    append_btn.style.cursor = 'not-allowed';

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

    // ボタン再有効化
    append_btn.disabled = false;
    append_btn.style.opacity = '';
    append_btn.style.cursor = '';
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
        btn.title = '選択したオブジェクトを一括ダウンロード';
        const pos = document.getElementById("download-object-button");
        pos.parentNode.parentNode.insertBefore(btn, pos.parentNode.nextSibling);
    } 
}
// 変更を監視
const target = document.querySelector('body');
const options = {
    childList: true,
    subtree: true,
    attributes: false,
}
const observer = new MutationObserver(putButton);
observer.observe(target, options);
