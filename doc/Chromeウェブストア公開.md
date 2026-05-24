# Chrome ウェブストア公開手順

拡張機能「S3 Batch Downloader」を Chrome ウェブストアに公開するための手順。

---

## 1. デベロッパーアカウントの登録（初回のみ）

※ 登録済み（quick.sweet.990）

---

## 2. ZIP ファイルの作成

`deploy.sh` を実行する。`manifest.json` の `version` からファイル名が自動生成される。

```bash
bash deploy.sh
# → s3-multi-dl-1.0.0.zip が生成される
```

---

## 3. 拡張機能のアップロード

1. [Chrome Developer Dashboard](https://chrome.google.com/webstore/devconsole/) を開く
2. 既存アイテムを選択
3. **「パッケージ」** → 新しいバージョンの ZIP をアップロード

---

## 4. ストア掲載情報の入力

### ストアの掲載情報タブ

| 項目 | 内容 |
|---|---|
| 名前 | S3 Batch Downloader（日本語: S3 Multiple Downloader） |
| 説明（短） | Download multiple checked S3 objects at once. Supports recursive folder download. |
| 説明（詳細） | 下記「ストア説明文」を参照 |
| スクリーンショット | `assets/s3_multi_dl_pic_en.png`（英語・中国語用）/ `assets/s3_multi_dl_pic.png`（日本語用）（1280×800） |
| プロモーション画像（小タイル） | `assets/promotion_440x280.png`（440×280） |
| カテゴリ | Developer Tools |
| ホームページURL | https://github.com/qs990lab/s3_multi_dl |
| 言語 | English / 日本語 / 中文(简体) |

---

## ストア説明文

### 短い説明（132文字以内）

```
Download multiple checked S3 objects at once. Supports recursive folder download.
```

### 詳細説明

```
Download multiple checked S3 objects at once from the AWS Management Console.

[Features]
- Batch download selected objects sequentially
- Recursive folder (prefix) download support (toggle on/off in settings)
- Adds a dedicated download button to the S3 console
- No page reload required (works with SPA navigation)

[How to use]
1. Open the S3 bucket objects page
2. Check the objects you want to download
3. Click the round download button (↓)
4. Selected objects will be downloaded sequentially

[Settings]
Click the extension icon to open settings.
- Recursive folder DL: Recursively downloads files inside selected folders

This extension only works on the AWS S3 console page.
No data is collected or transmitted.

---

チェックを入れた複数のS3オブジェクトを一括ダウンロードできるChrome拡張機能です。

【主な機能】
・チェックボックスで選択したオブジェクトを順次ダウンロード
・フォルダ（プレフィックス）の再帰ダウンロード対応（設定でon/off切替）
・AWSマネジメントコンソールのS3画面に専用ボタンを追加
・ページリロード不要（SPA遷移に対応）

【使い方】
1. S3バケットのオブジェクト一覧画面を開く
2. ダウンロードしたいオブジェクトにチェックを入れる
3. 追加された丸いダウンロードボタン（↓）をクリック
4. 選択したオブジェクトが順次ダウンロードされます

【設定】
拡張機能アイコンをクリックすると設定画面が開きます。
・フォルダ再帰DL: フォルダを選択した場合、中のファイルを再帰的にダウンロードします

【動作環境】
AWS マネジメントコンソールの S3 画面のみで動作します。
他のサイトへのアクセスは一切行いません。

---

从AWS管理控制台批量下载已选中的S3对象。

【功能】
・批量顺序下载已选中的对象
・支持文件夹（前缀）递归下载（可在设置中开关）
・在S3控制台添加专用下载按钮
・无需刷新页面（支持SPA导航）

【使用方法】
1. 打开S3存储桶对象列表页面
2. 勾选要下载的对象
3. 点击圆形下载按钮（↓）
4. 已选对象将依次下载

【设置】
点击扩展图标打开设置。
・文件夹递归下载：选中文件夹时，递归下载其中的文件

本扩展仅在AWS S3控制台页面运行。
不收集或传输任何数据。
```

---

### プライバシータブ

| 項目 | 内容 |
|---|---|
| 単一の目的 | S3コンソールでの複数オブジェクト一括ダウンロード |
| storage の理由 | ユーザーの設定（再帰ダウンロードon/off）を保存するため |
| webNavigation の理由 | AWSコンソール内のSPA遷移（pushState）を検知し、S3ページに遷移した際にContent Scriptを注入するため |
| scripting の理由 | S3ページへのSPA遷移時にContent Scriptを動的に注入するため |
| ホスト権限の理由 | `*.console.aws.amazon.com` のS3画面でのみ動作するため |
| リモートコードの使用 | なし |
| データ収集 | なし（ユーザーデータを収集・送信しない） |

### 配布タブ

| 項目 | 内容 |
|---|---|
| 公開設定 | Public（公開） |
| 地域配布 | すべての地域 |

---

## 5. 審査に提出

1. 各タブの入力が完了したら **「審査に提出」** ボタンをクリック
2. 審査には通常 **数日〜1週間程度** かかる

---

## 6. 現在の公開情報

| 項目 | 内容 |
|---|---|
| ストアURL | https://chromewebstore.google.com/detail/hkfgcimbcdngoekajjianmgelbhlckch |
| GitHub | https://github.com/qs990lab/s3_multi_dl |
| 現在のバージョン | 1.0.0 |
| 開発者 | quick.sweet.990 |
| ユーザー数 | 1,000+ |
| 評価 | 5.0（3件） |
| カテゴリ | Developer Tools |

---

## バージョンアップ時

1. `manifest.json` の `version` を上げる
2. `CHANGELOG.md`（リポジトリルート）に変更内容を追記
3. `bash deploy.sh` で ZIP を再生成
4. Developer Dashboard でアップロード → 審査に提出

---

## プロモーション画像

| サイズ | 用途 | ファイル |
|---|---|---|
| 440×280 | 小タイル | `assets/promotion_440x280.png` |
| 920×680 | 大タイル | （任意） |
| 1400×560 | マーキー | （任意） |

---

## 参考リンク

- [Chrome Web Store デベロッパーダッシュボード](https://chrome.google.com/webstore/devconsole/)
- [公式: 拡張機能の準備](https://developer.chrome.com/docs/webstore/prepare)
- [公式: Chrome Web Store に公開する](https://developer.chrome.com/docs/webstore/publish)
- [GitHub リポジトリ](https://github.com/qs990lab/s3_multi_dl)
