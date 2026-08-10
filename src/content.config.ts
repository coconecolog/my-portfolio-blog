// コンテンツコレクション定義(基盤)
// 【重要】Astroのバージョンによって、このファイルの配置場所が2通りあります。
//   - 新しめ(Content Layer API): src/content.config.ts
//   - 従来: src/content/config.ts
// 実際のリポジトリに既にどちらかのファイルがあるはずなので、
// 存在する方をこの内容で置き換えてください(ファイル名/場所は変えないこと)。

import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    // タグ: ブログ・White Paper共通の語彙で運用(自由入力の文字列配列)
    tags: z.array(z.string()).default([]),
    // この記事が誘導する White Paper(N:1。複数記事が同じ資料を指せます)
    whitepaper: reference("whitepaper"),
  }),
});

const whitepaper = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/whitepaper" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    image: z.string().optional(),
    previewImages: z.array(z.string()).max(2).default([]),
    tags: z.array(z.string()).default([]),
    // ダウンロード対象ファイル(PDFなど)へのパス。/public/whitepapers/xxx.pdf のように配置想定。
    fileUrl: z.string(),
  }),
});

export const collections = { blog, whitepaper };
