import { entityKind } from "../entity.js";
import { GelPreparedQuery, GelSession, GelTransaction } from "../gel-core/session.js";
import { NoopLogger } from "../logger.js";
import { fillPlaceholders } from "../sql/sql.js";
import { tracer } from "../tracing.js";
import { mapResultRow } from "../utils.js";
class GelDbPreparedQuery extends GelPreparedQuery {
  constructor(client, queryString, params, logger, fields, _isResponseInArrayMode, customResultMapper, transaction = false) {
    super({ sql: queryString, params });
    this.client = client;
    this.queryString = queryString;
    this.params = params;
    this.logger = logger;
    this.fields = fields;
    this._isResponseInArrayMode = _isResponseInArrayMode;
    this.customResultMapper = customResultMapper;
    this.transaction = transaction;
  }
  static [entityKind] = "GelPreparedQuery";
  async execute(placeholderValues = {}) {
    return tracer.startActiveSpan("drizzle.execute", async () => {
      const params = fillPlaceholders(this.params, placeholderValues);
      this.logger.logQuery(this.queryString, params);
      const { fields, queryString: query, client, joinsNotNullableMap, customResultMapper } = this;
      if (!fields && !customResultMapper) {
        return tracer.startActiveSpan("drizzle.driver.execute", async (span) => {
          span?.setAttributes({
            "drizzle.query.text": query,
            "drizzle.query.params": JSON.stringify(params)
          });
          return client.querySQL(query, params.length ? params : void 0);
        });
      }
      const result = await tracer.startActiveSpan("drizzle.driver.execute", (span) => {
        span?.setAttributes({
          "drizzle.query.text": query,
          "drizzle.query.params": JSON.stringify(params)
        });
        return client.withSQLRowMode("array").querySQL(query, params.length ? params : void 0);
      });
      return tracer.startActiveSpan("drizzle.mapResponse", () => {
        return customResultMapper ? customResultMapper(result) : result.map((row) => mapResultRow(fields, row, joinsNotNullableMap));
      });
    });
  }
  all(placeholderValues = {}) {
    return tracer.startActiveSpan("drizzle.execute", () => {
      const params = fillPlaceholders(this.params, placeholderValues);
      this.logger.logQuery(this.queryString, params);
      return tracer.startActiveSpan("drizzle.driver.execute", (span) => {
        span?.setAttributes({
          "drizzle.query.text": this.queryString,
          "drizzle.query.params": JSON.stringify(params)
        });
        return this.client.withSQLRowMode("array").querySQL(this.queryString, params.length ? params : void 0).then((result) => result);
      });
    });
  }
  /** @internal */
  isResponseInArrayMode() {
    return this._isResponseInArrayMode;
  }
}
class GelDbSession extends GelSession {
  constructor(client, dialect, schema, options = {}) {
    super(dialect);
    this.client = client;
    this.schema = schema;
    this.options = options;
    this.logger = options.logger ?? new NoopLogger();
  }
  static [entityKind] = "GelDbSession";
  logger;
  prepareQuery(query, fields, name, isResponseInArrayMode, customResultMapper) {
    return new GelDbPreparedQuery(
      this.client,
      query.sql,
      query.params,
      this.logger,
      fields,
      isResponseInArrayMode,
      customResultMapper
    );
  }
  async transaction(transaction) {
    return await this.client.transaction(async (clientTx) => {
      const session = new GelDbSession(clientTx, this.dialect, this.schema, this.options);
      const tx = new GelDbTransaction(this.dialect, session, this.schema);
      return await transaction(tx);
    });
  }
  async count(sql) {
    const res = await this.execute(sql);
    return Number(res[0]["count"]);
  }
}
class GelDbTransaction extends GelTransaction {
  static [entityKind] = "GelDbTransaction";
  async transaction(transaction) {
    const tx = new GelDbTransaction(
      this.dialect,
      this.session,
      this.schema
    );
    return await transaction(tx);
  }
}
export {
  GelDbPreparedQuery,
  GelDbSession,
  GelDbTransaction
};
//# sourceMappingURL=session.js.map