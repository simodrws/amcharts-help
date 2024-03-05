/** @jsxImportSource @emotion/react */

import { css, SerializedStyles } from "@emotion/react";
import React, {
  AriaAttributes,
  ComponentPropsWithRef,
  HTMLAttributes,
  JSX,
  ReactNode,
} from "react";

type Ref = HTMLElement | SVGElement;

interface ColumnProps
  extends AriaAttributes,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ComponentPropsWithRef<any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    HTMLAttributes<any> {
  // eslint-disable-next-line react/no-unused-prop-types
  cssStyle?: SerializedStyles;
  // eslint-disable-next-line react/no-unused-prop-types
  children?: ReactNode;
  // eslint-disable-next-line react/no-unused-prop-types
  as?: keyof JSX.IntrinsicElements;
}

const Column = React.memo(
  React.forwardRef<Ref, ColumnProps>(
    // eslint-disable-next-line @typescript-eslint/typedef
    ({ cssStyle, children, as = "div", ...rest }: ColumnProps, ref) => {
      const Component = as;

      return (
        // @ts-expect-error -- union type too complex to represent - but it works
        <Component ref={ref} css={css(columnStyle, cssStyle)} {...rest}>
          {children}
        </Component>
      );
    }
  )
);

Column.displayName = "Column";

export default Column;

const columnStyle = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
});
