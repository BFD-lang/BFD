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
  SingleStorePreparedQuery: () => SingleStorePreparedQuery,
  SingleStoreSession: () => SingleStoreSession,
  SingleStoreTransaction: () => SingleStoreTransaction
});
module.exports = __toCommonJS(session_exports);
var import_entity = require("../entity.cjs");
var import_errors = require("../errors.cjs");
var import_sql = require("../sql/sql.cjs");
var import_db = require("./db.cjs");
class SingleStorePreparedQuery {
  static [import_entity.entityKind] = "SingleStorePreparedQuery";
  /** @internal */
  joinsNotNullableMap;
}
class SingleStoreSession {
  constructor(dialect) {
    this.dialect = dialect;
  }
  static [import_entity.entityKind] = "SingleStoreSession";
  execute(query) {
    return this.prepareQuery(
      this.dialect.sqlToQuery(query),
      void 0
    ).execute();
  }
  async count(sql2) {
    const res = await this.execute(sql2);
    return Number(
      res[0][0]["count"]
    );
  }
  getSetTransactionSQL(config) {
    const parts = [];
    if (config.isolationLevel) {
      parts.push(`isolation level ${config.isolationLevel}`);
    }
    return parts.length ? import_sql.sql`set transaction ${import_sql.sql.raw(parts.join(" "))}` : void 0;
  }
  getStartTransactionSQL(config) {
    const parts = [];
    if (config.withConsistentSnapshot) {
      parts.push("with consistent snapshot");
    }
    if (config.accessMode) {
      parts.push(config.accessMode);
    }
    return parts.length ? import_sql.sql`start transaction ${import_sql.sql.raw(parts.join(" "))}` : void 0;
  }
}
class SingleStoreTransaction extends import_db.SingleStoreDatabase {
  constructor(dialect, session, schema, nestedIndex) {
    super(dialect, session, schema);
    this.schema = schema;
    this.nestedIndex = nestedIndex;
  }
  static [import_entity.entityKind] = "SingleStoreTransaction";
  rollback() {
    throw new import_errors.TransactionRollbackError();
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SingleStorePreparedQuery,
  SingleStoreSession,
  SingleStoreTransaction
});
//# sourceMappingURL=session.cjs.map