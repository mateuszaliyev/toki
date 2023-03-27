import type { ReactNode } from "react";

import {
  Content,
  Portal,
  Provider,
  Root,
  Trigger,
} from "@radix-ui/react-tooltip";

export type TooltipProps = {
  children?: ReactNode;
  trigger?: ReactNode;
};

export const Tooltip = ({ children, trigger }: TooltipProps) => (
  <Provider>
    <Root>
      <Trigger>{trigger}</Trigger>
      <Portal>
        <Content
          className="mt-1 animate-fade-in select-none border border-gray-300 bg-gray-100/80 px-2 py-1 backdrop-blur transition dark:border-gray-800 dark:bg-gray-900/50"
          side="bottom"
        >
          {children}
        </Content>
      </Portal>
    </Root>
  </Provider>
);
