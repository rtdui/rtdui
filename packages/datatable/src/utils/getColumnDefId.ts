import type { ColumnDef, ColumnDefResolved } from "@tanstack/react-table";

export function getColumnDefId<TData>(columnDef: ColumnDef<TData>) {
  const resolvedColumnDef = columnDef as ColumnDefResolved<TData>;
  const { id, accessorKey, header } = resolvedColumnDef;
  return (
    id ??
    (accessorKey ? accessorKey.replace(".", "_") : undefined) ??
    (typeof header === "string" ? header : undefined)
  );
}
