import { createPool } from "mysql2";
import { entityKind } from "../entity.js";
import { DefaultLogger } from "../logger.js";
import {
  createTableRelationsHelpers,
  extractTablesRelationalConfig
} from "../relations.js";
import { SingleStoreDatabase } from "../singlestore-core/db.js";
import { SingleStoreDialect } from "../singlestore-core/dialect.js";
import { isConfig } from "../utils.js";
import { SingleStoreDriverSession } from "./session.js";
class SingleStoreDriverDriver {
  constructor(client, dialect, options = {}) {
    this.client = client;
    this.dialect = dialect;
    this.options = options;
  }
  static [entityKind] = "SingleStoreDriverDriver";
  createSession(schema) {
    return new SingleStoreDriverSession(this.client, this.dialect, schema, { logger: this.options.logger });
  }
}
import { SingleStoreDatabase as SingleStoreDatabase2 } from "../singlestore-core/db.js";
class SingleStoreDriverDatabase extends SingleStoreDatabase {
  static [entityKind] = "SingleStoreDriverDatabase";
}
function construct(client, config = {}) {
  const dialect = new SingleStoreDialect({ casing: config.casing });
  let logger;
  if (config.logger === true) {
    logger = new DefaultLogger();
  } else if (config.logger !== false) {
    logger = config.logger;
  }
  const clientForInstance = isCallbackClient(client) ? client.promise() : client;
  let schema;
  if (config.schema) {
    const tablesConfig = extractTablesRelationalConfig(
      config.schema,
      createTableRelationsHelpers
    );
    schema = {
      fullSchema: config.schema,
      schema: tablesConfig.tables,
      tableNamesMap: tablesConfig.tableNamesMap
    };
  }
  const driver = new SingleStoreDriverDriver(clientForInstance, dialect, { logger });
  const session = driver.createSession(schema);
  const db = new SingleStoreDriverDatabase(dialect, session, schema);
  db.$client = client;
  return db;
}
function isCallbackClient(client) {
  return typeof client.promise === "function";
}
function drizzle(...params) {
  if (typeof params[0] === "string") {
    const connectionString = params[0];
    const instance = createPool({
      uri: connectionString
    });
    return construct(instance, params[1]);
  }
  if (isConfig(params[0])) {
    const { connection, client, ...drizzleConfig } = params[0];
    if (client)
      return construct(client, drizzleConfig);
    const instance = typeof connection === "string" ? createPool({ uri: connection, supportBigNumbers: true }) : createPool(connection);
    const db = construct(instance, drizzleConfig);
    return db;
  }
  return construct(params[0], params[1]);
}
((drizzle2) => {
  function mock(config) {
    return construct({}, config);
  }
  drizzle2.mock = mock;
})(drizzle || (drizzle = {}));
export {
  SingleStoreDatabase2 as SingleStoreDatabase,
  SingleStoreDriverDatabase,
  SingleStoreDriverDriver,
  drizzle
};
//# sourceMappingURL=driver.js.map