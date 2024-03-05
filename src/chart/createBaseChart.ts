import { Container, Root, Scrollbar, p100, percent } from "@amcharts/amcharts5";
import { XYChart, XYCursor } from "@amcharts/amcharts5/xy";
import { BaseChartConfig } from "./types";
import { createHorizontalCategoryChart } from "./createHorizontalCategoryChart";
import { CHART_HEIGHT } from "./constants";

export const createBaseChart = <
  T extends Record<string, string | number | Date> & { bullet?: boolean }
>({
  id,
  chartType,
  data,
  secondaryData,
  name,
  dataName,
  secondaryDataName,
  valueXField = "date",
  valueYField = "count",
  categoryXField = "period",
  categoryYField = "country",
  baseInterval = {
    timeUnit: "day",
    count: 1,
  },
  startDate,
  endDate,
  showScrollbar = true,
}: BaseChartConfig<T>) => {
  const root = Root.new(id);

  root.utc = true;

  const chart = root.container.children.push(
    XYChart.new(root, {
      panX: true,
      panY: false,
      wheelX: "none",

      arrangeTooltips: false,
      pinchZoomX: true,

      cursor: XYCursor.new(root, {
        visible: false,
        behavior: "none",
      }),

      layout: root.verticalLayout,
      maxTooltipDistance: 0,
    })
  );

  if (chartType === "horizontal-bar") {
    const scrollableContainer = chart.chartContainer.children.unshift(
      Container.new(root, {
        width: percent(100),

        height: p100,
        verticalScrollbar: Scrollbar.new(root, {
          orientation: "vertical",
          dx: 10,
        }),
      })
    );

    chart.yAxesAndPlotContainer.set("height", CHART_HEIGHT);
    chart.yAxesAndPlotContainer.set("paddingBottom", 10);
    scrollableContainer.children.push(chart.yAxesAndPlotContainer);
    chart.leftAxesContainer.set("layout", root.verticalLayout);
    const scrollbarX = chart.get("scrollbarX");

    scrollbarX?.startGrip.setAll({
      visible: false,
    });

    scrollbarX?.endGrip.setAll({
      visible: false,
    });
  }

  const dateFormat = "MMMM yyyy";

  root.dateFormatter.setAll({
    dateFormat,
    dateFields: [],
  });

  switch (chartType) {
    case "horizontal-bar": {
      createHorizontalCategoryChart({
        root,
        chart,
        name,
        dataName,
        secondaryDataName,
        data,
        secondaryData,
        valueYField,
        valueXField,
        categoryXField,
        categoryYField,
        startDate,
        endDate,
      });

      break;
    }
    default: {
      break;
    }
    // No default
  }

  return {
    root,
    chart,
    disposeChart: () => chart.dispose,
  } as {
    root: Root;
    chart: XYChart;
    disposeChart: () => void;
  };
};
