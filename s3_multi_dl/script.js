const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 設定を取得
const getSettings = () => new Promise((resolve) => {
    chrome.storage.sync.get({ recursiveDownload: false }, resolve);
});

// チェック済みの行からフォルダかファイルかを判定
const getCheckedItems = () => {
    const items = [];
    const rows = document.querySelectorAll('tr');
    rows.forEach((row) => {
        const checkbox = row.querySelector("input[type=checkbox]");
        if (!checkbox || !checkbox.checked) return;
        if (!checkbox.className.startsWith('awsui_native-input_')) return;

        // フォルダ判定: span.name.folder クラスまたは aria-label="フォルダ" で判定
        const nameSpan = row.querySelector('span.name');
        if (!nameSpan) return;
        const link = nameSpan.closest('.object-link')?.querySelector('a');
        if (!link) return;

        const isFolder = nameSpan.classList.contains('folder');
        items.push({ checkbox, link, isFolder, row });
    });
    return items;
};

// 単一ファイルをダウンロード（チェック→DLボタン→チェック解除）
const downloadSingleFile = async (checkbox) => {
    const dl_btn = document.getElementById("download-object-button");
    checkbox.click(); // 一旦解除（全解除後に個別選択するため）
    await _sleep(200);
    checkbox.click(); // 選択
    await _sleep(200);
    dl_btn.click();
    await _sleep(200);
    checkbox.click(); // 解除
    await _sleep(1000);
};

// 現在のページの全ファイルをダウンロード（再帰モード用）
const downloadAllFilesOnPage = async () => {
    const dl_btn = document.getElementById("download-object-button");
    if (!dl_btn) return;

    const checkboxes = [];
    const rows = document.querySelectorAll('tr');
    rows.forEach((row) => {
        const checkbox = row.querySelector("input[type=checkbox]");
        if (!checkbox) return;
        if (!checkbox.className.startsWith('awsui_native-input_')) return;

        const nameSpan = row.querySelector('span.name');
        if (!nameSpan) return;
        if (!nameSpan.classList.contains('folder')) {
            checkboxes.push(checkbox);
        }
    });

    for (const cb of checkboxes) {
        cb.click();
        await _sleep(200);
        dl_btn.click();
        cb.click();
        await _sleep(1000);
    }
};

// フォルダに入って再帰ダウンロード
const downloadFolderRecursive = async (folderLink) => {
    folderLink.click();
    await _sleep(2000);

    // サブフォルダを収集
    const getSubFolderLinks = () => {
        const links = [];
        document.querySelectorAll('tr').forEach((row) => {
            const nameSpan = row.querySelector('span.name.folder');
            if (!nameSpan) return;
            const link = nameSpan.closest('.object-link')?.querySelector('a');
            if (link) links.push(link);
        });
        return links;
    };

    const subFolderCount = getSubFolderLinks().length;

    // まず現在のページのファイルをダウンロード
    await downloadAllFilesOnPage();

    // サブフォルダを再帰的に処理
    for (let i = 0; i < subFolderCount; i++) {
        const currentFolders = getSubFolderLinks();
        if (i < currentFolders.length) {
            await downloadFolderRecursive(currentFolders[i]);
        }
    }

    // 戻る
    window.history.back();
    await _sleep(3000);
};

// メインのダウンロード処理
const getS3Obj = async () => {
    const append_btn = document.getElementById("append-button");
    const dl_btn = document.getElementById("download-object-button");
    const settings = await getSettings();

    if (settings.recursiveDownload) {
        // 再帰モード: getCheckedItemsで取得してから処理
        const items = getCheckedItems();

        if (items.length === 0) {
            alert('ダウンロードするオブジェクトを選択してください');
            return;
        }

        append_btn.disabled = true;
        append_btn.style.opacity = '0.5';
        append_btn.style.cursor = 'not-allowed';

        // href一覧を保存（DOM参照は遷移後に無効になるため）
        const itemData = items.map(item => ({
            isFolder: item.isFolder,
            href: item.link.getAttribute('href'),
        }));

        // まず全チェックを外す
        items.forEach((item) => {
            if (item.checkbox.checked) item.checkbox.click();
        });
        await _sleep(300);

        for (const data of itemData) {
            if (data.isFolder) {
                // hrefでリンクを再取得してクリック
                const link = document.querySelector(`a[href="${data.href}"]`);
                if (link) await downloadFolderRecursive(link);
            } else {
                // ファイル: hrefでリンクの行を見つけてチェックボックスを操作
                const link = document.querySelector(`a[href="${data.href}"]`);
                if (!link) continue;
                const row = link.closest('tr');
                if (!row) continue;
                const cb = row.querySelector('input[type=checkbox]');
                if (!cb) continue;
                cb.click();
                await _sleep(500);
                dl_btn.click();
                await _sleep(500);
                cb.click();
                await _sleep(1000);
            }
        }
    } else {
        let target = [];
        let input_list = document.querySelectorAll("input[type=checkbox]:checked");

        input_list.forEach((e, index) => {
            if (e.className.startsWith('awsui_native-input_')) {
                target.push(index);
                input_list[index].click();
            }
        });

        if (target.length === 0) {
            alert('ダウンロードするオブジェクトを選択してください');
            return;
        }

        append_btn.disabled = true;
        append_btn.style.opacity = '0.5';
        append_btn.style.cursor = 'not-allowed';

        for (let i = 0; i < target.length; i++) {
            input_list[target[i]].click();
            await _sleep(500);
            dl_btn.click();
            await _sleep(500);
            input_list[target[i]].click();
            await _sleep(1000);
        }
        target.forEach((e) => {
            input_list[e].click();
        });
    }

    // ボタン再有効化
    append_btn.disabled = false;
    append_btn.style.opacity = '';
    append_btn.style.cursor = '';
}

// 拡張ダウンロードボタンを配置する
const putButton = () => {
    try {
        const append_btn = document.getElementById("append-button");
        if (append_btn == null) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.id = 'append-button';
            btn.onclick = getS3Obj;
            btn.className = 'gg-arrow-down-o';
            btn.title = '選択したオブジェクトを一括ダウンロード';
            const pos = document.getElementById("download-object-button");
            if (pos && pos.parentNode && pos.parentNode.parentNode) {
                pos.parentNode.parentNode.insertBefore(btn, pos.parentNode.nextSibling);
            }
        }
    } catch(e) {}
}

// 変更を監視
const target = document.querySelector('body');
const options = {
    childList: true,
    subtree: true,
    attributes: false,
}
const observer = new MutationObserver(() => { try { putButton(); } catch(e) {} });
observer.observe(target, options);
