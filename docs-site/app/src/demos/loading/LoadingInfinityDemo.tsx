import React from "react";
import { Loading } from "@rtdui/core";

export default function Demo() {
  return (
    <>
      <div className="flex gap-4">
        <Loading size="lg" variant="infinity" />
        <Loading size="md" variant="infinity" />
        <Loading size="sm" variant="infinity" />
        <Loading size="xs" variant="infinity" />
      </div>
      <div className="flex gap-4">
        <Loading size="lg" variant="infinity" color="primary" />
        <Loading size="lg" variant="infinity" color="secondary" />
        <Loading size="lg" variant="infinity" color="accent" />
        <Loading size="lg" variant="infinity" color="info" />
        <Loading size="lg" variant="infinity" color="success" />
        <Loading size="lg" variant="infinity" color="warning" />
        <Loading size="lg" variant="infinity" color="error" />
      </div>
    </>
  );
}
Demo.displayName = "LoadingInfinityDemo";
