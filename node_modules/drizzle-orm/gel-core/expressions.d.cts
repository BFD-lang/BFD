import type { GelColumn } from "./columns/index.cjs";
import type { Placeholder, SQL, SQLWrapper } from "../sql/sql.cjs";
export * from "../expressions.cjs";
export declare function concat(column: GelColumn | SQL.Aliased, value: string | Placeholder | SQLWrapper): SQL;
export declare function substring(column: GelColumn | SQL.Aliased, { from, for: _for }: {
    from?: number | Placeholder | SQLWrapper;
    for?: number | Placeholder | SQLWrapper;
}): SQL;
