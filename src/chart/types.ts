import type { Root } from "@amcharts/amcharts5";

import type {
  AxisRendererX,
  IDateAxisSettings,
  XYChart,
} from "@amcharts/amcharts5/xy";

export type BaseChartConfig<
  T extends Record<string, string | number | Date> & { bullet?: boolean }
> = {
  id: string;
  name: string;
  chartType: "bar" | "bullet" | "animated-bar" | "default" | "horizontal-bar";
  data: T[];
  dataName?: string;
  secondaryDataName?: string;
  valueXField?: keyof T;
  valueYField?: keyof T;
  categoryXField?: keyof T;
  categoryYField?: keyof T;
  baseInterval?: IDateAxisSettings<AxisRendererX>["baseInterval"];
  startDate?: Date;
  endDate: Date;
  showScrollbar?: boolean;
  secondaryData?: T[];
};

export type ValueChartConfig<
  T extends Record<string, string | number | Date> & { bullet?: boolean }
> = {
  root: Root;
  chart: XYChart;
  data: T[];
  valueXField: keyof T; // = 'date' as keyof T,
  valueYField: keyof T; // = 'count' as keyof T,
  baseInterval: IDateAxisSettings<AxisRendererX>["baseInterval"]; // = BASE_INTERVAL_DEFAULT_OPTIONS,
  startDate?: Date;
  endDate?: Date;
  secondaryData?: T[];
  name: string;
};

export type CategoryChartConfig<
  T extends Record<string, string | number | Date> & { bullet?: boolean }
> = {
  root: Root;
  chart: XYChart;
  name: string;
  dataName?: string;
  secondaryDataName?: string;
  data: T[];
  secondaryData?: T[];
  valueXField: keyof T;
  valueYField: keyof T; // = 'value' as keyof T,
  categoryXField: keyof T; // = 'country' as keyof T,
  categoryYField: keyof T;
  startDate?: Date;
  endDate?: Date;
};

export type BarChartConfig<
  T extends Record<string, string | number | Date> & { bullet?: boolean }
> = {
  root: Root;
  chart: XYChart;
  data: T[];
  valueXField: keyof T;
  valueYField: keyof T;
  baseInterval: IDateAxisSettings<AxisRendererX>["baseInterval"];
  name: string;
};
