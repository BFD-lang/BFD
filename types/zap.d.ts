// types/zap.d.ts

// フィールド型の定義
export type FieldDefinition =
  | { type: "id" }
  | { type: "text"; label?: string }
  | { type: "status"; states: string[] }

// フィールドヘルパー
export const field: {
  id: () => FieldDefinition
  text: (options?: { label?: string }) => FieldDefinition
  status: (states: string[]) => FieldDefinition
}

// 遷移ガード関数の型
export type GuardFn = (context: { user: { role: string } }) => boolean

// 状態遷移の定義
export interface TransitionDefinition {
  name: string
  from: string
  to: string
  guard?: GuardFn
}

// モデル定義
export interface ModelDefinition {
  name: string
  fields: Record<string, FieldDefinition>
  transitions: TransitionDefinition[]
}

// DSLエクスポート関数
export function defineModel(name: string, config: {
  fields: Record<string, FieldDefinition>
  transitions: TransitionDefinition[]
}): ModelDefinition

export function defineTransition(name: string, config: {
  from: string
  to: string
  guard?: GuardFn
}): TransitionDefinition
