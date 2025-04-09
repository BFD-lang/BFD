"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var session_exports = {};
__export(session_exports, {
  GelPreparedQuery: () => GelPreparedQuery,
  GelSession: () => GelSession,
  GelTransaction: () => GelTransaction
});
module.exports = __toCommonJS(session_exports);
var import_entity = require("../entity.cjs");
var import_errors = require("../errors.cjs");
var import_tracing = require("../tracing.cjs");
var import_db = require("./db.cjs");
class GelPreparedQuery {
  constructor(query) {
    this.query = query;
  }
  authToken;
  getQuery() {
    return this.query;
  }
  mapResult(response, _isFromBatch) {
    return response;
  }
  static [import_entity.entityKind] = "GelPreparedQuery";
  /** @internal */
  joinsNotNullableMap;
}
class GelSession {
  constructor(dialect) {
    this.dialect = dialect;
  }
  static [import_entity.entityKind] = "GelSession";
  execute(query) {
    return import_tracing.tracer.startActiveSpan("drizzle.operation", () => {
      const prepared = import_tracing.tracer.startActiveSpan("drizzle.prepareQuery", () => {
        return this.prepareQuery(
          this.dialect.sqlToQuery(query),
          void 0,
          void 0,
          false
        );
      });
      return prepared.execute(void 0);
    });
  }
  all(query) {
    return this.prepareQuery(
      this.dialect.sqlToQuery(query),
      void 0,
      void 0,
      false
    ).all();
  }
  async count(sql) {
    const res = await this.execute(sql);
    return Number(
      res[0]["count"]
    );
  }
}
class GelTransaction extends import_db.GelDatabase {
  constructor(dialect, session, schema) {
    super(dialect, session, schema);
    this.schema = schema;
  }
  static [import_entity.entityKind] = "GelTransaction";
  rollback() {
    throw new import_errors.TransactionRollbackError();
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GelPreparedQuery,
  GelSession,
  GelTransaction
});
//# sourceMappingURL=session.cjs.map