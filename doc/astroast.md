🧠 astro: AST構造設計（v0.1案）
🎯 目的
astro: セクションを「再帰的な意味構文ツリー」として定義し、
.astro ファイルにコンパイルできるASTとして構造化すること。

✅ サンプルBFD構文
bfd
astro:
  Layout:
    h1 title
    form @submit="/api/login":
      input name="email"
      button "Login"
✅ 期待されるAST構造（JSON）
json

{
  "tag": "Layout",
  "children": [
    {
      "tag": "h1",
      "props": {},
      "content": "title"
    },
    {
      "tag": "form",
      "props": {
        "@submit": "/api/login"
      },
      "children": [
        {
          "tag": "input",
          "props": { "name": "email" }
        },
        {
          "tag": "button",
          "content": "Login"
        }
      ]
    }
  ]
}
✨ 構成ルール定義
フィールド	型	説明
tag	string	Astroタグ名 or コンポーネント名
props	object	属性（例：@submit や name="email"）
content	string?	テキストノード or データ変数名（titleなど）
children	array?	再帰的なノード配列（ツリー構造）
✅ 特別ルール（仕様に加えるべきもの）
1. props の前処理
@submit= → method="POST" + action="..." に変換するなどはASTではそのまま保持、変換は後段（renderer）

2. content vs children
テキストノード（h1 title）なら content: "title" とする

children がある場合、content は原則使わない

🧪 もう少し複雑な例でテスト
bfd
astro:
  Layout:
    div class="box":
      p "Welcome, :name"
      ul:
        li "Item A"
        li "Item B"
→ AST（簡略）：

json
コピーする
編集する
{
  "tag": "Layout",
  "children": [
    {
      "tag": "div",
      "props": { "class": "box" },
      "children": [
        {
          "tag": "p",
          "content": "Welcome, :name"
        },
        {
          "tag": "ul",
          "children": [
            { "tag": "li", "content": "Item A" },
            { "tag": "li", "content": "Item B" }
          ]
        }
      ]
    }
  ]
}