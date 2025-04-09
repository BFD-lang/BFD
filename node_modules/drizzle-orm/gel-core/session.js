import { entityKind } from "../entity.js";
import { TransactionRollbackError } from "../errors.js";
import { tracer } from "../tracing.js";
import { GelDatabase } from "./db.js";
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
  static [entityKind] = "GelPreparedQuery";
  /** @internal */
  joinsNotNullableMap;
}
class GelSession {
  constructor(dialect) {
    this.dialect = dialect;
  }
  static [entityKind] = "GelSession";
  execute(query) {
    return tracer.startActiveSpan("drizzle.operation", () => {
      const prepared = tracer.startActiveSpan("drizzle.prepareQuery", () => {
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
class GelTransaction extends GelDatabase {
  constructor(dialect, session, schema) {
    super(dialect, session, schema);
    this.schema = schema;
  }
  static [entityKind] = "GelTransaction";
  rollback() {
    throw new TransactionRollbackError();
  }
}
export {
  GelPreparedQuery,
  GelSession,
  GelTransaction
};
//# sourceMappingURL=session.js.map