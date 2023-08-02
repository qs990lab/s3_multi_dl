const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let dl_btn = document.getElementById("download-object-button");
var getS3Obj = async () => {
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

let btn = document.createElement("button");
btn.innerHTML = "DL Selected";
btn.addEventListener("click",getS3Obj);
dl_btn.parentNode.insertBefore(btn, dl_btn.nextElementSibling);
