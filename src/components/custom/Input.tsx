// import { useProductStore } from "@/store/ProductStore";
import { Input as InputNextUI, InputProps } from "@nextui-org/react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

type PropsType<T extends FieldValues> = UseControllerProps<T> & InputProps;

const Input = <T extends FieldValues>(props: PropsType<T>) => {
  const { control, name, ...inputProps } = props;

  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  //   const { action } = useProductStore();
  return (
    <div className="flex flex-col gap-2 ">
      <InputNextUI
        {...field}
        {...inputProps}
        errorMessage={error?.message}
        isInvalid={!!error?.message}
        labelPlacement="outside"
        classNames={{
        }}
      />
    </div>
  );
};

export default Input;
