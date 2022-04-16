import React from "react";
import Actions from "../core/actions";
import ReportDetail from "./ReportDetail";
import { useParams } from "react-router";

function ReportDetailPage() {
  const { Id } = useParams();

  return (
    <>
      <Actions />
      <ReportDetail reportId={Id} />
    </>
  );
}

export default ReportDetailPage;
