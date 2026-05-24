# S3 Multiple Downloader 改善提案

## 既知の制限事項・バグ修正

- [ ] 初回表示時にリロードが必要（SPA遷移でContent Scriptが注入されない）
  - Background Scriptで `webNavigation.onHistoryStateUpdated` を使い動的に注入する
- [ ] AWSコンソールの画面構造（ID、クラス名）への依存が強い

## 機能改善

- [ ] 進捗表示の追加（何件中何件目をダウンロード中か表示）
- [x] フォルダ（プレフィックス）の再帰ダウンロード対応
- [ ] ダウンロード間隔の設定（ポップアップUIで変更可能に）
- [ ] ダウンロード失敗時のリトライ/エラー通知

## UX改善

- [x] ボタンのツールチップ追加（`btn.title` で説明表示）
- [x] ダウンロード中のボタン無効化（連打防止）
- [x] 選択数0件時の警告表示

## コード品質

- [x] MutationObserverに `subtree: true` 追加（検知漏れ防止）
- [x] MutationObserverの `attributes: false` 設定（不要な発火削減）
- [ ] ボタン配置のロバスト性向上（フォールバックセレクタ対応）
- [ ] チェックボックスのセレクタ改善（`awsui_native-input_` 依存をやめる）

## manifest.json

- [ ] `permissions` 追加（`storage`, `notifications` 等）
- [ ] アイコンの複数サイズ対応（16, 32, 48, 128px）
- [ ] `_locales` による多言語対応（日英）

## 名前・ブランディング

- [ ] 名前の変更検討（現状「S3MultipleDownloader」）
  - 競合「S3 Multi File Downloader」と紛らわしい
  - "Multiple Downloader" は英語としてやや不自然
  - 候補: **S3 Batch Download** / **Bulk Download for S3** / **S3 Bulk Saver**
- [ ] アイコンのリデザイン
  - S3バケツ + 複数下矢印のデザイン
  - S3ブランドカラー（緑: `#3F8624`）ベース
  - 4サイズ展開（16, 32, 48, 128px）
