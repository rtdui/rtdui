import React from "react";
import { Loading } from "@rtdui/core";

export default function () {
  return (
    <>
      <div className="flex gap-4">
        <Loading size="lg" variant="ball" />
        <Loading size="md" variant="ball" />
        <Loading size="sm" variant="ball" />
        <Loading size="xs" variant="ball" />
      </div>
      <div className="flex gap-4">
        <Loading size="lg" variant="ball" color="primary" />
        <Loading size="lg" variant="ball" color="secondary" />
        <Loading size="lg" variant="ball" color="accent" />
        <Loading size="lg" variant="ball" color="info" />
        <Loading size="lg" variant="ball" color="success" />
        <Loading size="lg" variant="ball" color="warning" />
        <Loading size="lg" variant="ball" color="error" />
      </div>
    </>
  );
}
