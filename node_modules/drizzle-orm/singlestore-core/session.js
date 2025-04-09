import { entityKind } from "../entity.js";
import { TransactionRollbackError } from "../errors.js";
import { sql } from "../sql/sql.js";
import { SingleStoreDatabase } from "./db.js";
class SingleStorePreparedQuery {
  static [entityKind] = "SingleStorePreparedQuery";
  /** @internal */
  joinsNotNullableMap;
}
class SingleStoreSession {
  constructor(dialect) {
    this.dialect = dialect;
  }
  static [entityKind] = "SingleStoreSession";
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
    return parts.length ? sql`set transaction ${sql.raw(parts.join(" "))}` : void 0;
  }
  getStartTransactionSQL(config) {
    const parts = [];
    if (config.withConsistentSnapshot) {
      parts.push("with consistent snapshot");
    }
    if (config.accessMode) {
      parts.push(config.accessMode);
    }
    return parts.length ? sql`start transaction ${sql.raw(parts.join(" "))}` : void 0;
  }
}
class SingleStoreTransaction extends SingleStoreDatabase {
  constructor(dialect, session, schema, nestedIndex) {
    super(dialect, session, schema);
    this.schema = schema;
    this.nestedIndex = nestedIndex;
  }
  static [entityKind] = "SingleStoreTransaction";
  rollback() {
    throw new TransactionRollbackError();
  }
}
export {
  SingleStorePreparedQuery,
  SingleStoreSession,
  SingleStoreTransaction
};
//# sourceMappingURL=session.js.map