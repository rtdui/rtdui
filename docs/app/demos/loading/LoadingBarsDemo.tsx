import React from "react";
import { Loading } from "@rtdui/core";

export default function () {
  return (
    <>
      <div className="flex gap-4">
        <Loading size="lg" variant="bars" />
        <Loading size="md" variant="bars" />
        <Loading size="sm" variant="bars" />
        <Loading size="xs" variant="bars" />
      </div>
      <div className="flex gap-4">
        <Loading size="lg" variant="bars" color="primary" />
        <Loading size="lg" variant="bars" color="secondary" />
        <Loading size="lg" variant="bars" color="accent" />
        <Loading size="lg" variant="bars" color="info" />
        <Loading size="lg" variant="bars" color="success" />
        <Loading size="lg" variant="bars" color="warning" />
        <Loading size="lg" variant="bars" color="error" />
      </div>
    </>
  );
}
