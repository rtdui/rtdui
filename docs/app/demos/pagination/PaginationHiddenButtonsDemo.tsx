import { Pagination } from "@rtdui/core";

export default function () {
  return (
    <Pagination
      count={10}
      showFirstButton={false}
      showLastButton={false}
      showPrevButton={false}
      showNextButton={false}
    />
  );
}
