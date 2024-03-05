import {
  Bullet,
  Color,
  Label,
  Legend,
  Tooltip,
  array,
  color,
  ease,
  percent,
} from "@amcharts/amcharts5";
import AnimatedTheme from "@amcharts/amcharts5/themes/Animated";
import DarkTheme from "@amcharts/amcharts5/themes/Dark";
import ResponsiveTheme from "@amcharts/amcharts5/themes/Responsive";
import {
  AxisRenderer,
  AxisRendererX,
  AxisRendererY,
  CategoryAxis,
  ColumnSeries,
  ValueAxis,
} from "@amcharts/amcharts5/xy";

import Colors from "../styles/colors";
import { CategoryChartConfig } from "./types";
import HorizontalCategoryBarChartTheme from "../themes/HorizontalCategoryBarChartTheme";

const labelHTML = `
  <ul class="chart-tooltip">
      <li>
          <p>{catgory}</p>
      </li>
      <li>
          <div>{name}</div>
          <div>{valueX}<div>
      </li>
  </ul>`;

export const createHorizontalCategoryChart = <
  T extends Record<string, string | number | Date> & { bullet?: boolean }
>({
  root,
  chart,
  name,
  dataName,
  secondaryDataName,
  data,
  secondaryData,
  valueXField = "count" as keyof T,
  categoryYField = "country" as keyof T,
  startDate,
  endDate,
}: CategoryChartConfig<T>) => {
  root.setThemes([
    DarkTheme.new(root),
    AnimatedTheme.new(root),
    ResponsiveTheme.new(root),
    HorizontalCategoryBarChartTheme.new(root),
  ]);

  chart.zoomOutButton.set("forceHidden", true);

  const tooltip = Tooltip.new(root, {
    labelHTML,
    getFillFromSprite: false,
    getLabelFillFromSprite: false,
    keepTargetHover: true,
    pointerOrientation: "right",
  });
  tooltip?.get("background")?.setAll({
    fill: color(Colors.RedesignBackground),
    fillOpacity: 1,
    stroke: color(Colors.RedesignDarkGray),
    strokeWidth: 1,
    strokeOpacity: 1,
    shadowColor: color("#000000"),
    shadowOpacity: 0.3,
    shadowBlur: 10,
    shadowOffsetY: 5,
    shadowOffsetX: 0,
  });

  const xAxis = chart.xAxes.push(
    ValueAxis.new(root, {
      // ...minMax,
      calculateTotals: true,
      renderer: AxisRendererX.new(root, {
        cellStartLocation: 0,
        cellEndLocation: 1,
        forceHidden: true,
        tooltip,
      }),
    })
  );

  const yAxis = chart.yAxes.push(
    CategoryAxis.new(root, {
      categoryField: categoryYField as string,
      start: 0,
      end: 1,
      startLocation: 0,
      endLocation: 1,
      minZoomCount: 5,
      maxZoomCount: 5,
      zoomable: false,
      fixAxisSize: true,
      renderer: AxisRendererY.new(root, {
        cellStartLocation: 0,
        cellEndLocation: 1,
        visible: false,
        minGridDistance: 50,
        tooltip: Tooltip.new(root, {
          labelText: "{categoryY}: {valueX}",
        }),
      }),
    })
  );

  const series = chart.series.push(
    ColumnSeries.new(root, {
      name: dataName ?? name,
      xAxis,
      yAxis,
      minBulletDistance: 50,
      minHeight: 500,
      valueXField: valueXField as string,
      categoryYField: categoryYField as string,
      tooltip: Tooltip.new(root, {
        labelHTML,
        getFillFromSprite: false,
        getLabelFillFromSprite: false,
        keepTargetHover: true,
        pointerOrientation: "right",
      }),
      width: percent(100),
      clustered: false,
    })
  );

  // Make each column to be of a different color
  series.columns.template.adapters.add("fill", () => {
    return Color.fromCSS(Colors.RedesignPrimary);
  });

  series.columns.template.adapters.add("stroke", () => {
    return Color.fromCSS(Colors.RedesignPrimary);
  });

  series.columns.template.setAll({
    cornerRadiusTR: 5,
    cornerRadiusBR: 5,
    strokeOpacity: 0,
    // height: 12,
  });

  series.bullets.push(() =>
    Bullet.new(root, {
      locationX: 1,
      sprite: Label.new(root, {
        text: "{valueX}",
        centerX: percent(0),
        centerY: percent(50),
        fill: Color.fromString(Colors.White),
        populateText: true,
      }),
    })
  );

  let secondarySeries: ColumnSeries | undefined;

  if (secondaryData) {
    secondarySeries = chart.series.push(
      ColumnSeries.new(root, {
        name: secondaryDataName ?? `New ${name}`,
        xAxis,
        yAxis,
        fill: Color.fromCSS(Colors.RedesignSecondary),
        valueXField: valueXField as string,
        categoryYField: categoryYField as string,
        tooltip,
      })
    );
    secondarySeries.columns.template.adapters.add("fill", () => {
      return Color.fromCSS(Colors.RedesignSecondary);
    });

    secondarySeries.columns.template.adapters.add("stroke", () => {
      return Color.fromCSS(Colors.RedesignSecondary);
    });

    secondarySeries.columns.template.setAll({
      cornerRadiusTR: 5,
      cornerRadiusBR: 5,
      strokeOpacity: 0,
    });

    secondarySeries.bullets.push(() =>
      Bullet.new(root, {
        sprite: Label.new(root, {
          text: "{valueX}",
          centerX: percent(50),
          centerY: percent(50),
          fontSize: 47,
          fill: Color.fromCSS(Colors.White),
          populateText: true,
        }),
      })
    );
  }

  const dataByCategory = [
    ...new Set(data.map((dp: T) => dp[categoryYField])),
  ].map((ctg: T[keyof T]) => ({
    [categoryYField]: ctg,
  }));

  yAxis.data.setAll(dataByCategory);
  series.data.setAll(data);

  if (secondarySeries && secondaryData) {
    secondarySeries.data.setAll(secondaryData);
  }

  const legend = chart.children.unshift(
    Legend.new(root, {
      nameField: "name",
      centerX: percent(50),
      x: percent(50),
    })
  );

  legend.data.setAll(chart.series.values);

  series.appear(1000).catch((error: unknown) => console.error(error));
  chart.appear(1000, 100).catch((error: unknown) => console.error(error));
  sortCategoryAxis({
    yAxis,
    series,
  });
};

// Get series item by category
const getSeriesItem = ({
  series,
  category,
}: {
  series: ColumnSeries;
  category?: string;
}) => {
  for (const dataItem of series.dataItems) {
    if (dataItem.get("categoryY") === category) {
      return dataItem;
    }
  }

  return undefined;
};

const sortCategoryAxis = ({
  yAxis,
  series,
}: {
  yAxis: CategoryAxis<AxisRenderer>;
  series: ColumnSeries;
}) => {
  // Sort by value
  series.dataItems.sort((x, y) => {
    return Number(x.get("valueX")) - Number(y.get("valueX")); // descending
    // return y.get("valueY") - x.get("valueX"); // ascending
  });

  // Go through each axis item
  array.each(yAxis.dataItems, (dataItem) => {
    // get corresponding series item
    const seriesDataItem = getSeriesItem({
      series,
      category: dataItem.get("category"),
    });

    if (seriesDataItem) {
      // get index of series data item
      const index = series.dataItems.indexOf(seriesDataItem);
      // calculate delta position
      const deltaPosition =
        (index - dataItem.get("index", 0)) / series.dataItems.length;
      // set index to be the same as series data item index
      dataItem.set("index", index);
      // set deltaPosition instanlty
      dataItem.set("deltaPosition", -deltaPosition);
      // animate delta position to 0
      dataItem.animate({
        key: "deltaPosition",
        to: 0,
        duration: 1000,
        easing: ease.out(ease.cubic),
      });
    }
  });

  // Sort axis items by index.
  // This changes the order instantly, but as deltaPosition is set,
  // they keep in the same places and then animate to true positions.
  yAxis.dataItems.sort(
    (xVal, yVal) => Number(xVal?.get?.("index")) - Number(yVal?.get?.("index"))
  );
};
