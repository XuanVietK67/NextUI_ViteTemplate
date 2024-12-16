import { ActionElement } from "@/types";
import { Button, Tooltip } from "@nextui-org/react";

const Action = <T extends Record<string, unknown>>(props: any) => {
  const actionss = props;
  const actions = actionss.actions;
  
  console.log("check actions: ",actions)
  return (
    <div className="relative flex items-center gap-2">
      {actions &&
        actions.length > 0 &&
        actions.map((action: ActionElement<T>) => {
          return (
            <Tooltip
              key={action.label}
              content={action.label}
              color={action.color ? action.color : "default"}
            >
              <Button
                startContent={action.icon}
                isIconOnly
                size="sm"
                radius="full"
                variant="light"
                color={action.color ? action.color : "default"}
                onClick={() => action.onClick(props.item)}
              ></Button>
            </Tooltip>
          );
        })}
    </div>
  );
};

export default Action;
