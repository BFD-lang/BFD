🧠 NitroPress ASTノード構造定義 v0.9
🔧 AST形式：JSON準拠のJSオブジェクト構造
🎯 目的：CLI・check・build・SSR・LSPに利用される“言語の骨格”

📘 トップノード：NitroFile
ts
コピーする
編集する
type NitroFile = {
  type: "NitroFile";
  state?: StateDeclaration[];
  routes?: RouteNode[];
  islands?: IslandNode[];
  streams?: StreamBlock[];
  server?: ServerEndpoint[];
  db?: DbSchema[];
  prompts?: PromptNode[];
};
🟢 StateDeclaration
ts
コピーする
編集する
type StateDeclaration = {
  type: "StateDeclaration";
  name: string;
  kind: "signal" | "computed";
  value: string | number | boolean;
};
🟠 RouteNode
ts
コピーする
編集する
type RouteNode = {
  type: "Route";
  path: string;
  html: HtmlElement;
};
🔵 HtmlElement
ts
コピーする
編集する
type HtmlElement = {
  type: "Element";
  tag: string;
  props?: Record<string, string>;
  children?: HtmlChild[];
};

type HtmlChild =
  | HtmlElement
  | TextNode
  | InterpolationNode;
ts
コピーする
編集する
type TextNode = {
  type: "Text";
  value: string;
};

type InterpolationNode = {
  type: "Interpolation";
  expression: string; // e.g., "count", "user.name"
};
🟣 IslandNode
ts
コピーする
編集する
type IslandNode = {
  type: "Island";
  name: string;
  state?: StateDeclaration[];
  view: HtmlElement;
};
🔴 StreamBlock
ts
コピーする
編集する
type StreamBlock = {
  type: "Stream";
  name: string;
  source: string; // e.g. "/api/stream"
  loopVar: string; // e.g. "metric"
  children: HtmlElement[];
};
🟤 ServerEndpoint
ts
コピーする
編集する
type ServerEndpoint = {
  type: "ServerEndpoint";
  method: "get" | "post";
  path: string;
  bodyVars?: string[]; // optional keys used from body
  returns: ServerReturn; // json or status
};

type ServerReturn =
  | { kind: "json"; value: Record<string, any> }
  | { kind: "status"; code: number };
🟡 DbSchema + DbQuery
ts
コピーする
編集する
type DbSchema = {
  type: "DbSchema";
  table: string;
  fields: DbField[];
};

type DbField = {
  name: string;
  fieldType: "int" | "string" | "timestamp";
  modifiers?: string[]; // e.g. ["primary", "nullable"]
};

type DbQuery = {
  type: "DbQuery";
  name: string;
  query: string; // Nitro DSLクエリ構文で記述
};
🧠 オプション：PromptNode（MVP後対応）
ts
コピーする
編集する
type PromptNode = {
  type: "Prompt";
  name: string;
  systemMessage: string;
};
✅ 拡張ポイント（今後追加可能なノード）
ConditionalNode（if-like構文）

IncludeNode（複数ファイル対応）

ScriptBlock（LLM連携用 function calling）