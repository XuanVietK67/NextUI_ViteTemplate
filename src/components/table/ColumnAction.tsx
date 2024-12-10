// import { TableColumn } from "@/types";
// import {
//   Button,
//   Checkbox,
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@nextui-org/react";

// const ColumnAction = <T extends Record<string, unknown>>(props: {columns: TableColumn<T>[]}) => {
//   const hidden = useProductStore.getState().hidden;
//   const { setHidden } = useProductStore();
//   const {columns}=props


//   const handleHideColumn = (column: TableColumn<T>) => {
//     // console.log("check change: ", columnKey)
//     if (hidden.includes(column.key as never)) {
//       let hiddenCopy = hidden.filter((items) => items !== column.key);
//       useProductStore.persist.clearStorage();
//       setHidden(hiddenCopy);
//     } else {
//       let hiddenCopy = [...hidden, column.key];
//       useProductStore.persist.clearStorage();
//       setHidden(hiddenCopy);
//     }
//   };
//   console.log("check columns: ",columns)
//   return (
//     <Popover
//       key="opaque"
//       showArrow
//       offset={10}
//       placement="bottom"
//       backdrop="opaque"
//     >
//       <PopoverTrigger>
//         <Button
//           color="warning"
//           variant="flat"
//           className="capitalize"
//           size={"lg"}
//         >
//           Column Action
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-[240px]">
//         {(titleProps) => (
//           <div className="px-1 py-2 w-full">
//             <p className="text-small font-bold text-foreground" {...titleProps}>
//               COLUMN ACTION
//             </p>
//             <div className="flex flex-col gap-2">
//               {columns.map((column) => {
//                 return (
//                   <Checkbox
//                     key={column.key}
//                     isSelected={
//                       hidden.includes(column.key as never) ? true : false
//                     }
//                     onChange={() => handleHideColumn(column)}
//                   >
//                     {column.label}
//                   </Checkbox>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </PopoverContent>
//     </Popover>
//   );
// };

// export default ColumnAction;
