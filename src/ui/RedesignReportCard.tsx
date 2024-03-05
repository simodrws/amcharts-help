/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import RedesignReportCardHeader, {
  ReportCardProps,
} from "./RedesignReportCardHeader";

import Row from "./Row";
import { ZIndex } from "../styles/styles";
import Column from "./Column";
import Colors from "../styles/colors";

const RedesignReportCard = ({ chart, cssStyle, ...rest }: ReportCardProps) => {
  return (
    <Column cssStyle={css(cardStyle, cssStyle)}>
      <Row
        cssStyle={css({
          alignItems: "flex-end",
          justifyContent: "flex-start",
        })}
      >
        <RedesignReportCardHeader {...rest} />
      </Row>
      {chart}
    </Column>
  );
};

const cardStyle = css({
  background: Colors.RedesignBackground,
  border: `solid 1px ${Colors.RedesignDarkGray}`,
  borderRadius: "12px 12px 0 0",
  marginLeft: 0,
  marginTop: 0,
  justifyContent: "flex-start",
  zIndex: ZIndex.FRONT,

  minHeight: 560,
});

export default RedesignReportCard;
