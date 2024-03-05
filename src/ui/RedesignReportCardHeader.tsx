/** @jsxImportSource @emotion/react */
import React, { ReactNode } from "react";
import { SerializedStyles, css } from "@emotion/react";

import Colors from "../styles/colors";
import type DeclarativeChart from "../chart/Chart";
import Row from "./Row";

import { BASE_PADDING, ZIndex } from "../styles/styles";
import Column from "./Column";

export interface ReportCardProps {
  // this is here so we do not get dependency cycles
  chart: typeof DeclarativeChart | ReactNode;
  heading?: ReactNode;
  subheading?: ReactNode;
  cssStyle?: SerializedStyles;
}

const RedesignReportCardHeader = ({
  heading,
  subheading,
}: //   periodOptions,
//   selectedPeriod,
//   handlePeriodChange,
Omit<ReportCardProps, "chart">) => {
  return (
    <>
      <Row as="header" cssStyle={headerStyle}>
        <ReportCardHeading heading={heading} subheading={subheading} />
      </Row>
      <Row cssStyle={dropdownContainerStyle}></Row>
    </>
  );
};

const ReportCardHeading = ({
  heading,
  subheading,
}: Pick<ReportCardProps, "heading" | "subheading">) => {
  return (
    <Row cssStyle={headerWrapperStyle}>
      <Column>
        <Row cssStyle={headingStyle} as="h1">
          {heading}
        </Row>
        <Row cssStyle={subheadingStyle} as="h2">
          {subheading}
        </Row>
      </Column>
    </Row>
  );
};

const headerWrapperStyle = css({
  padding: `${BASE_PADDING / 2}px ${BASE_PADDING / 3}px`,
  paddingBottom: BASE_PADDING / 4,
});

const dropdownContainerStyle = css({
  flex: "1 1 20%",
  alignItems: "flex-end",
  justifyContent: "flex-end",
  height: "100%",
  borderBottom: `solid 1px ${Colors.RedesignDarkGray}`,
  zIndex: ZIndex.FRONT,
  paddingBottom: BASE_PADDING / 2,
  paddingRight: BASE_PADDING / 4,
});

const headerStyle = css({
  flex: "0 1 50%",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  width: "auto",
  borderBottom: `solid 1px ${Colors.RedesignDarkGray}`,

  padding: 0,
  margin: 0,

  zIndex: ZIndex.FRONT,
});

const headingStyle = css({
  alignItems: "flex-start",
  justifyContent: "flex-start",
  fontSize: 18,
  fontWeight: 500,
  lineHeight: "12px",
  color: Colors.White,
});

const subheadingStyle = css({
  alignItems: "flex-start",
  justifyContent: "flex-start",
  fontSize: 14,
  fontWeight: 400,
  lineHeight: "20px",
  color: Colors.RedesignFontTernary,
  paddingTop: BASE_PADDING / 6,
});
export default RedesignReportCardHeader;
