# content-ops/

エージェントの作業ディレクトリです。**Astroのビルド対象外**(`src/` の外にあるため自然に除外されます)。

記事は、いきなり `src/content/blog/` に書かれるのではなく、ここで「リサーチ → 体験談ヒアリング → 構成(人間承認)→ 執筆 → (WP制作) → 校正」の工程を踏み、人間がOKを出したものだけが `src/content/` へ昇格します。

## フォルダ構成

```
content-ops/
├── research/
│   └── cycle-{id}/research.md      … サイクル共通リサーチ結果
├── plans/
│   └── cycle-{id}/plan.yaml        … サイクル内の記事一覧
├── wp-catalog.yaml                 … 既存White Paper一覧(新規/流用判定に使用)
├── interviews/
│   └── library.yaml                … 体験談の再利用インデックス
└── articles/
    └── article-{id}/
        ├── meta.yaml                … この記事の進捗ステータス
        ├── interview.md             … ヒアリングした体験談
        ├── research-diff.md         … 記事固有の差分リサーチ
        ├── outline.md               … 構成案(★人間承認ゲート)
        ├── draft.md                 … 記事本文
        ├── wp-draft.md              … White Paper下書き(新規作成時のみ)
        └── review-notes.md          … 校正結果
```

使い方の詳細は `.claude/agents/README.md` を参照してください。
