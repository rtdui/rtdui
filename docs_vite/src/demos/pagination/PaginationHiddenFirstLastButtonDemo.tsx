import { Pagination } from "@rtdui/core";

export default function PaginationHiddenFirstLastButtonDemo() {
  return (
    <Pagination count={10} showFirstButton={false} showLastButton={false} />
  );
}
