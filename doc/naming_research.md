# 名前に関する調査（2026-05-24）

## 現状

- 現在の名前: **S3MultipleDownloader**
- Chromeウェブストアに公開済み

## 競合

| 拡張機能名 | 開発者 | 備考 |
|---|---|---|
| S3 Multi File Downloader | 別の開発者 | 名前・機能ともに非常に類似 |

## 評価

| 観点 | 評価 |
|---|---|
| 商標リスク | 「S3」はAWSの商標だが、Chrome拡張で使っている例は多数あり、個人開発レベルで問題になった例はほぼない |
| 競合との差別化 | 「S3 Multi File Downloader」と紛らわしい。ユーザーが混同する可能性あり |
| 検索性 | 「S3 Multiple Downloader」で検索すると見つかるが、「S3 Multi」で検索すると競合が先に出る可能性 |
| 英語として自然か | "Multiple Downloader" はやや不自然。"Batch Downloader" や "Multi-file Downloader" の方が英語圏では自然 |

## 結論

現在の名前で実害はないが、以下の改善余地がある:

1. **競合と紛らわしい** — 差別化が弱い
2. **英語としてやや不自然** — "Multiple Downloader" より "Batch Download" の方が自然
3. **AWSの商標ポリシー** — 厳密には「for Amazon S3」のような表記が推奨されるが、実態として問題になった例はほぼない

## 改名候補

| 案 | メリット |
|---|---|
| **S3 Batch Download** | 英語として自然、競合と差別化できる |
| **Bulk Download for S3** | AWS商標ガイドラインに沿った表記 |
| **S3 Bulk Saver** | 短くユニーク |

推奨: **S3 Batch Download** — 自然な英語で競合と差別化でき、検索性も良い。
