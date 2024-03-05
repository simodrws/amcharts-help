/** @jsxImportSource @emotion/react */
import React from "react";
import { SerializedStyles, css } from "@emotion/react";
import RedesignReportCard from "./RedesignReportCard";
import { BASE_PADDING, ZIndex } from "../styles/styles";
import DeclarativeChart from "../chart/Chart";
import Colors from "../styles/colors";
import { CHART_HEIGHT } from "../chart/constants";

const UsersByCountries = <T extends Record<string, string | number | Date>>({
  cssStyle,
  data,
  id,
  heading,
}: {
  data?: T[];
  cssStyle?: SerializedStyles;
  id?: string;
  heading: string;
}) => {
  return (
    <RedesignReportCard
      cssStyle={cssStyle}
      heading={`${heading} - Users by Country`}
      subheading="Total numbers of user per country"
      chart={
        <DeclarativeChart<T>
          isLoading={false}
          cssStyle={chartStyle}
          name="New User"
          dataName="New User"
          data={data ?? []}
          secondaryData={undefined}
          timeUnit={undefined}
          categoryYField="country"
          valueXField="count"
          type="horizontal-bar"
          id={`users-by-countries-chart-one-${id}`}
          showScrollbar={false}
        />
      }
    />
  );
};

const chartStyle = css({
  background: Colors.RedesignBackground,
  zIndex: ZIndex.BACK,
  width: "100%",
  height: CHART_HEIGHT,
  borderRadius: 8,
  position: "inherit",
  padding: BASE_PADDING / 8,
  paddingLeft: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export default UsersByCountries;
