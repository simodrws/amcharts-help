import { Color, color } from "@amcharts/amcharts5";
import Colors from "../styles/colors";
import BaseTheme from "./BaseTheme";

// https://www.amcharts.com/docs/v5/concepts/themes/

export default class HorizontalCategoryBarChartTheme extends BaseTheme {
  protected setupDefaultRules(): void {
    super.setupDefaultRules();
    this.rule("Label").setAll({
      fontSize: 16,
      fill: Color.fromString(Colors.White),
    });

    this.rule("RoundedRectangle", ["scrollbar", "thumb"]).setAll({
      // scrollbar color
      fill: Color.fromCSS(Colors.RedesignLightBackgroundBorder),
    });

    this.rule("RoundedRectangle", ["scrollbar", "thumb"]).states.create(
      "hover",
      {
        fill: Color.fromCSS(Colors.RedesignLightBackgroundBorder),
      }
    );

    this.rule("RoundedRectangle", ["scrollbar", "button", "background"]).setAll(
      {
        fill: color(0x00_ff_00),
      }
    );

    this.rule("RoundedRectangle", [
      "scrollbar",
      "button",
      "background",
    ]).states.create("hover", {
      fill: Color.fromCSS(Colors.RedesignBackground),
    });

    this.rule("DateAxis").setAll({
      maxDeviation: 0,

      baseInterval: {
        timeUnit: "day",
        count: 3,
      },
    });

    this.rule("ValueAxis").setAll({
      maxDeviation: 0,
    });

    this.rule("ColumnSeries").setAll({
      fill: Color.fromCSS(Colors.RedesignPrimary),
    });
  }
}
