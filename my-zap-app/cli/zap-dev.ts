import { Hono } from "hono";
import { serve } from "bun";
import path from "path";
import { readFile } from "fs/promises";
import { z } from "zod";

// --- Zodスキーマ定義（zap.schema.jsonに準拠） ---
const ApiRouteSchema = z.object({
  method: z.enum(["GET", "POST", "PUT", "DELETE"]),
  path: z.string(),
  public: z.boolean().optional(),
  handler: z.string(),
});

const ZapSchema = z.object({
  api: z.record(ApiRouteSchema),
  db: z.record(z.record(z.string())),
  events: z
    .record(
      z.object({
        trigger: z.enum(["cron.daily"]),
        handler: z.string(),
      })
    )
    .optional(),
});

// --- zap.ts の読み込みとバンドル（仮想的に eval で取り扱う） ---
const zapPath = Bun.argv[2] || "./zap.ts";
const mod = await import(path.resolve(zapPath));
const appDef = ZapSchema.parse(mod.default);

// --- Hono Appの構築 ---
const app = new Hono();
// --- CRON イベント処理（cron.daily = 毎分） ---
for (const [name, event] of Object.entries(appDef.events || {})) {
  if (event.trigger === "cron.daily") {
    const handlerFn = await loadHandler(zapPath, event.handler);
    console.log(`⏰ Registered cron.daily -> ${name}`);
    setInterval(async () => {
      console.log(`🚀 Triggering cron.daily -> ${name}`);
      await handlerFn({ env: {}, db: mockDb(appDef.db), webhook }); // ← 追加！
      
    }, 60_000);
  }
}

// APIルーティング登録
for (const [key, api] of Object.entries(appDef.api)) {
  const method = api.method.toLowerCase() as "get" | "post" | "put" | "delete";
  const handlerFn = await loadHandler(zapPath, api.handler);

  app[method](api.path, async (c) => {
    const result = await handlerFn({
      req: c.req,
      env: {},
      db: mockDb(appDef.db),
    });
    return c.json(result);
  });
}

// --- DBモック関数（型安全化は次フェーズで）---
function mockDb(dbDef: Record<string, Record<string, string>>) {
  return new Proxy(dbDef as Record<string, any>, {
    get(_, col: string) {
      return {
        findMany: async () => [{ id: 1, name: `Mock ${col}` }],
        insert: async (data: any) => ({ id: Date.now(), ...data }),
      };
    },
  }) as Record<
    string,
    { findMany: () => Promise<any[]>; insert: (data: any) => Promise<any> }
  >;
}
// --- DBルート（SDK用） ---
app.get("/db/:table", async (c) => {
  const table = c.req.param("table");
  const db = mockDb(appDef.db);
  return c.json(await db[table].findMany());
});

app.post("/db/:table", async (c) => {
  const table = c.req.param("table");
  const data = await c.req.json();
  const db = mockDb(appDef.db);
  return c.json(await db[table].insert(data));
});

// --- handler関数の動的読み込み ---
async function loadHandler(basePath: string, handlerPath: string) {
  const fullPath = path.resolve(path.dirname(basePath), handlerPath);
  const mod = await import(fullPath);
  return mod.default;
}
// --- Webhook関数 ---
async function webhook(url: string, data: any) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    console.log(`✅ Webhook sent to ${url} (${res.status})`);
  } catch (err) {
    console.error(`❌ Webhook failed to ${url}:`, err);
  }
}
// --- サーバー起動 ---
console.log("🚀 ZapDev API running at http://localhost:8787");
serve({ fetch: app.fetch, port: 8787 });
