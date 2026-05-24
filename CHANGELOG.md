# Changelog

## [1.0.0] - 2026-05-24

### Added
- ボタンにツールチップ追加（「選択したオブジェクトを一括ダウンロード」）
- 選択数0件時に警告ダイアログを表示
- ダウンロード中のボタン無効化（連打防止）

### Changed
- MutationObserverに `subtree: true` を追加（検知漏れ防止）
- MutationObserverの `attributes` を `false` に変更（不要な発火削減）

## [0.0.2] - 2024-05-21

### Changed
- S3コンソールのURL変更に対応（`matches` パターンを更新）

## [0.0.1] - 2023-08-04

### Added
- 初回リリース
- S3バケット画面に一括ダウンロードボタンを追加
- チェックボックスで選択したオブジェクトを1秒間隔で順次ダウンロード
- MutationObserverによるボタンの動的配置
- CSSによるダウンロードボタンのスタイリング（css.gg/arrow-down-o ベース）
- 48pxアイコン
