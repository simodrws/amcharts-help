/** @jsxImportSource @emotion/react */
import { ITimeInterval } from "@amcharts/amcharts5/.internal/core/util/Time";
import React, { useEffect, useRef, useState } from "react";

import { css, SerializedStyles } from "@emotion/react";
import { XYChart } from "@amcharts/amcharts5/xy";
import { MoonLoader } from "react-spinners";

import Colors from "../styles/colors";

import Column from "../ui/Column";
import { CHART_HEIGHT } from "./constants";
import { createBaseChart } from "./createBaseChart";
import { BASE_PADDING } from "../styles/styles";

export const DeclarativeChart = <
  T extends Record<string, string | number | Date>
>({
  id,
  data,
  secondaryData,
  type = "default",
  valueXField = "date",
  valueYField = "count",
  categoryXField = "country",
  categoryYField = "country",
  name = "default",
  timeUnit = "day",
  count = 1,
  startDate,
  endDate,
  cssStyle,
  showScrollbar = true,
  isLoading = false,

  dataName = "",
  secondaryDataName = "",
}: {
  id: string;
  data: T[];
  secondaryData?: T[];
  name: string;
  type: "bar" | "bullet" | "default" | "animated-bar" | "horizontal-bar";
  valueXField?: keyof T;
  valueYField?: keyof T;
  categoryXField?: keyof T;
  categoryYField?: keyof T;
  timeUnit?: ITimeInterval["timeUnit"];
  count?: ITimeInterval["count"];
  startDate?: Date;
  endDate?: Date;
  cssStyle?: SerializedStyles;
  showScrollbar?: boolean;
  isLoading?: boolean;

  dataName?: string;
  secondaryDataName?: string;
}) => {
  const chartRef = useRef<XYChart>();
  const [dataComparePoint, setComparePoint] = useState<T | null>(null);
  const [lastName, setLastName] = useState<string | null>(name);
  const [lastTimeUnit, setLastTimeUnit] = useState<
    ITimeInterval["timeUnit"] | null
  >(timeUnit);
  console.log({ name });

  useEffect(() => {
    if (isLoading) {
      if (chartRef.current) {
        return () => {
          chartRef.current?.dispose();
          chartRef.current = undefined;
        };
      }
      return undefined;
    }

    if (chartRef.current) {
      if (
        type !== "horizontal-bar" &&
        (lastName !== name || lastTimeUnit !== timeUnit)
      ) {
        return () => {
          chartRef.current?.dispose();
          chartRef.current = undefined;
          setLastName(name);
          setLastTimeUnit(timeUnit);
        };
      }

      if (type === "horizontal-bar" && lastTimeUnit !== timeUnit) {
        return () => {
          chartRef.current?.dispose();
          chartRef.current = undefined;
          setLastTimeUnit(timeUnit);
          setLastName(null);
        };
      }

      return undefined;
    }

    const { disposeChart, chart } = createBaseChart<T>({
      id,
      data,
      secondaryData,
      chartType: type,
      valueXField,
      valueYField,
      categoryXField,
      categoryYField,
      name,
      dataName,
      secondaryDataName,
      baseInterval: { timeUnit, count },
      startDate,
      endDate: endDate as Date,

      showScrollbar,
    });

    setComparePoint(data[0]);

    chartRef.current = chart;

    return () => {
      setComparePoint(null);
      disposeChart();
    };
  }, [
    id,
    data,
    dataName,
    secondaryDataName,
    type,
    valueXField,
    valueYField,
    count,
    timeUnit,
    name,
    startDate,
    endDate,
    dataComparePoint,
    showScrollbar,
    lastName,
    isLoading,
    categoryXField,
    categoryYField,
    lastTimeUnit,
    secondaryData,
  ]);

  if (isLoading)
    return (
      <Column cssStyle={css({ height: CHART_HEIGHT })}>
        <MoonLoader size={64} color={Colors.RedesignPrimary} />
      </Column>
    );

  return (
    <div
      css={css(chartContainerStyle, cssStyle)}
      className="chart-container"
      id={id}
    />
  );
};

const chartContainerStyle = css({
  position: "relative",
  width: "100%",
  height: "100%",
  background: "transparent",
  ".chart-container": {
    color: "red",
  },
  ".chart-tooltip": {
    minWidth: 150,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflowY: "hidden",

    "& > li": {
      width: "100%",
      "&:first-of-type": {},
      "&:nth-of-type(2)": {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",

        "& > div": {
          padding: BASE_PADDING / 16,
          color: Colors.White,
          fontSize: 12,
          lineHeight: "18px",
          "&:last-of-type": {},
        },
      },
      "& > p": {
        padding: BASE_PADDING / 16,
        paddingBottom: 0,
        fontSize: 12,
        lineHeight: "18px",
        color: Colors.RedesignFontTernary,
      },
    },
  },
});

export default DeclarativeChart;
