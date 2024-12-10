import { TableCustom } from "@/types";
import {
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Filter from "./Filter";
// import ColumnAction from "./ColumnAction";
import Action from "./Action";

const ITable = <T extends Record<string, unknown> & { _id: string }>(
  props: TableCustom<T>
) => {
  let { columns,columnsFilter, data, page, showColumnsAction, filter } = props;
  // const hidden = useProductStore.getState().hidden;
  // let columnss: TableColumn<Product>[]=[]

  const renderCells = useCallback((product: T, columnKey: string) => {
    return <div>{product[columnKey] as JSX.Element}</div>;
  }, []);

  const navigate = useNavigate();

  console.log("check columnFilter, column:", columnsFilter)
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-end mr-8 gap-3 items-center">
        {/* {showColumnsAction ? <ColumnAction columns={columns} /> : <></>} */}
        {filter? <Filter/>: <></> }
        <Button
          size="lg"
          color="primary"
          className="flex flex-col gap-0"
          onClick={() => props.create()}
        >
          <FaPlus />
          Create
        </Button>
      </div>
      <Table
        isStriped
        aria-label="Example table with dynamic content"
        bottomContent={
          data && (
            <div className="flex w-full justify-end">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={data?.pageInfo?.totalPage || 1}
                onChange={(page) => props.setPage(page)}
              />
            </div>
          )
        }
      >
        <TableHeader columns={columnsFilter}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>

        <TableBody
          items={data?.res ? data.res : data?.result ? data?.result : []}
        >
          {(item) => (
            <TableRow key={item._id}>
              {columnsFilter.map((column) => {
                return (
                  <TableCell key={column.key}>
                    {column.render ? (
                      typeof column.render == "function" ? (
                        column.render(item, column.key)
                      ) : (
                        <Action actions={column.render} item={item} />
                      )
                    ) : (
                      renderCells(item, column.key)
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ITable;
