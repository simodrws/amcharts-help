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

interface RowProps
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

const Row = React.memo(
  React.forwardRef<Ref, RowProps>(
    // eslint-disable-next-line @typescript-eslint/typedef
    ({ cssStyle, children, as = "div", ...rest }: RowProps, ref) => {
      const Component = as;

      return (
        // @ts-expect-error -- union type too complex to represent - but it works
        <Component ref={ref} css={css(rowStyle, cssStyle)} {...rest}>
          {children}
        </Component>
      );
    }
  )
);

Row.displayName = "Row";

export default Row;

const rowStyle = css({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
});
