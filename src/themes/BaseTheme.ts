import { Color, Rectangle, Theme } from "@amcharts/amcharts5";
import { ColumnSeries, XYCursor } from "@amcharts/amcharts5/xy";
import Colors from "../styles/colors";

// https://www.amcharts.com/docs/v5/concepts/themes/

export default class BaseTheme extends Theme {
  protected setupDefaultRules(): void {
    super.setupDefaultRules();
    this.rule("Label").setAll({
      fontSize: 16,
      fill: Color.fromCSS(Colors.RedesignFontPrimary),
    });

    this.rule("InterfaceColors").setAll({
      alternativeBackground: Color.fromCSS(Colors.RedesignContentCardBorder),
      background: Color.fromCSS(Colors.RedesignBackground),
      alternativeText: Color.fromCSS(Colors.RedesignFontPrimary),
      disabled: Color.fromCSS(Colors.RedesignFontTernary),
      fill: Color.fromCSS(Colors.RedesignFontPrimary),
      grid: Color.fromCSS(Colors.RedesignLightBorder),
      negative: Color.fromCSS(Colors.RedesignSecondary),
      primaryButton: Color.fromCSS(Colors.RedesignPrimary),
      primaryButtonActive: Color.fromCSS(Colors.RedesignPurple),
      primaryButtonHover: Color.fromCSS(Colors.RedesignPurple),
      primaryButtonText: Color.fromCSS(Colors.RedesignFontPrimary),
      secondaryButton: Color.fromCSS(Colors.RedesignSecondary),
      secondaryButtonActive: Color.fromCSS(Colors.RedesignFontPrimary),
      secondaryButtonDown: Color.fromCSS(Colors.RedesignFontPrimary),
      secondaryButtonHover: Color.fromCSS(Colors.RedesignFontPrimary),
      secondaryButtonStroke: Color.fromCSS(Colors.RedesignFontPrimary),
      secondaryButtonText: Color.fromCSS(Colors.RedesignFontPrimary),
      stroke: Color.fromCSS(Colors.RedesignPrimary),
    });

    this.rule("ColorSet").set("colors", [
      Color.fromCSS(Colors.RedesignPrimary),
      Color.fromCSS(Colors.RedesignPurple),
      Color.fromCSS(Colors.RedesignSecondary),
      Color.fromCSS(Colors.RedesignFontPrimary),
      Color.fromCSS(Colors.RedesignFontSecondary),
      Color.fromCSS(Colors.RedesignFontTernary),
    ]);

    this.rule("XYChart").setAll({
      // panX: true,
      // panY: true,
      // wheelX: 'none',
      // wheelY: 'none',
      // pinchZoomX: true,
      cursor: XYCursor.new(this._root, {
        visible: false,
      }),
    });

    this.rule("CategoryAxis").setAll({
      // maxDeviation: 0.3,
      categoryField: "country",
    });

    this.rule("ValueAxis").setAll({
      // maxDeviation: 0.3,
    });

    this.rule("ColumnSeries").setAll({
      valueYField: "value",
      categoryXField: "country",
      // tooltip: Tooltip.new(this._root, {
      //   labelText: '{categoryX}: {valueY}',
      // }),
    });

    this.rule("ColumnSeries").setup = (target: ColumnSeries) => {
      target.columns.template.setAll({
        // cornerRadiusTL: 5,
        // cornerRadiusTR: 5,
        strokeOpacity: 1,
        stroke: Color.fromCSS(Colors.RedesignPrimary),
      });
    };

    this.rule("Tooltip").setAll({
      background: Rectangle.new(this._root, {
        fill: Color.fromCSS(Colors.RedesignBackground),
        fillOpacity: 1,
        stroke: Color.fromCSS(Colors.RedesignLightBorder),
        strokeWidth: 1,
        shadowBlur: 8,
        shadowOffsetY: 2,
        shadowOffsetX: 0,
        shadowColor: Color.fromCSS(Colors.RedesignShadowColor),
      }),
      // { fill: Color.fromCSS(Colors.RedesignBackground) },
      // fill: Color.fromCSS(Colors.RedesignBackground),
    });
  }
}
