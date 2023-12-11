export function reorderColumn(
  draggedColumnId: string,
  targetColumnId: string,
  columnOrder: string[]
) {
  columnOrder.splice(
    columnOrder.indexOf(targetColumnId),
    0,
    columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0] as string
  );
  return [...columnOrder];
}
