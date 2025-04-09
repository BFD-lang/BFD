import type { Check } from "./checks.cjs";
import type { ForeignKey } from "./foreign-keys.cjs";
import type { Index } from "./indexes.cjs";
import type { PrimaryKey } from "./primary-keys.cjs";
import { SQLiteTable } from "./table.cjs";
import { type UniqueConstraint } from "./unique-constraint.cjs";
import type { SQLiteView } from "./view.cjs";
export declare function getTableConfig<TTable extends SQLiteTable>(table: TTable): {
    columns: import("./index.ts").SQLiteColumn<any, {}, {}>[];
    indexes: Index[];
    foreignKeys: ForeignKey[];
    checks: Check[];
    primaryKeys: PrimaryKey[];
    uniqueConstraints: UniqueConstraint[];
    name: string;
};
export type OnConflict = 'rollback' | 'abort' | 'fail' | 'ignore' | 'replace';
export declare function getViewConfig<TName extends string = string, TExisting extends boolean = boolean>(view: SQLiteView<TName, TExisting>): {
    name: TName;
    originalName: TName;
    schema: string | undefined;
    selectedFields: import("../index.ts").ColumnsSelection;
    isExisting: TExisting;
    query: TExisting extends true ? undefined : import("../index.ts").SQL<unknown>;
    isAlias: boolean;
};
