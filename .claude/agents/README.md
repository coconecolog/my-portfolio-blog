# DXメディア記事量産エージェント群

Claude Codeのサブエージェント機能を使った、記事量産の運用フローです。各エージェントは、Claude Code上で `@エージェント名` のように呼び出すか、Claude Codeが自動的に適切なエージェントを選んで起動します。

## 全体フロー

```
1. cycle-research      … サイクル共通リサーチ(1サイクルに1回)
2. cycle-planner       … 記事リスト・meta.yaml雛形の作成
   ─────────────────────────────────────
   (以下、記事1本ごとに繰り返す)
3. interview-agent     … 体験談ヒアリング(任意・スキップ可)
4. article-research-diff … 記事固有の差分リサーチ
5. article-outliner    … 構成案作成 → ★人間承認ゲート★
   (人間が outline.md を確認・修正し、meta.yamlのstatus.outlineをapprovedに変更)
6. article-writer      … 本文執筆
7. wp-writer           … White Paper制作(新規作成の場合のみ)
8. article-reviewer    … 最終校正
   ─────────────────────────────────────
9. (人間が)昇格作業: draft.md → src/content/blog/{slug}.mdx
                    wp-draft.md → src/content/whitepaper/{wp-slug}.md
```

## 人間承認ゲートについて

**`article-outliner` の後で必ず一度止まります。** `article-writer` 以降のエージェントは、`meta.yaml` の `status.outline` が `approved` になっていることを確認してから動きます。承認前に執筆が進んでしまうことを防ぐための仕組みです。

## 実際のリポジトリ構成との対応

この仕様は、既存の `content.config.ts` に合わせて一部調整しています(元の仕様書は `whitepapers`(複数形)コレクションを想定していましたが、実際のリポジトリは `whitepaper`(単数形)のため、そちらに統一しています)。

- `src/content/blog/` … 公開記事(Astro Content Collection)
- `src/content/whitepaper/` … White Paper(Astro Content Collection)
- `content-ops/` … エージェントの作業ディレクトリ(Astroのビルド対象外)

## 使い方の例(Claude Code上で)

```
新しいサイクルのリサーチを始めたい → cycle-research を使う
記事リストを作りたい → cycle-planner を使う
article-0012の体験談を聞きたい → interview-agent を使う
article-0012の構成を作りたい → article-outliner を使う
```
