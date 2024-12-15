import {  TableCustom } from "@/types";
import {
  Button,
  Pagination,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import Action from "./Action";
// import { useProductStore } from "@/store/ProductStore";
// import ColumnAction from "./ColumnAction";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Filter from "./Filter";
import { HiOutlineSwitchVertical } from "react-icons/hi";


const ITable = <T extends Record<string, unknown> & { _id: string }>(
  props: TableCustom<T>
) => {
  let { columns, columnsFilter, data, page, showColumnsAction, filter } = props;
  // const hidden = useProductStore.getState().hidden;
  // let columnss: TableColumn<Product>[]=[]

  const renderCells = useCallback((product: T, columnKey: string) => {
    return <div>{product[columnKey] as JSX.Element}</div>;
  }, []);

  const navigate = useNavigate();


  const rowsPerPage=[{key:6,label:6},{key:8,label:8},{key:10,label:10},{key:12,label:12}]

  const handleChangePageSize=(e: React.ChangeEvent<HTMLSelectElement>)=>{
    console.log("check e.target.value: ",e.target.value)
    props.setPage(1)
    props.setRowsPerPage(+e.target.value)
  }
  console.log("check data: ", data);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-3 bg-background items-center pr-5 rounded">
          <p className="px-3 h-full bg-white rounded-md	flex items-center justify-center border-2">
            Recent clients
          </p>
          <p>Order activity</p>
          <p>Client engagement</p>
        </div>
        <div className="flex flex-row justify-end mr-8 gap-3 items-center">
          {/* {showColumnsAction ? <ColumnAction columns={columns} /> : <></>} */}
          {filter ? <Filter /> : <></>}
          <Button
            size="md"
            // color="primary"
            className="flex flex-row gap-1 bg-white border-1 border-gray-400 rounded-lg hover:bg-primary hover:text-white text-ring"
            onClick={() => props.create()}
          >
            <FaPlus />
            Create
          </Button>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="h-7/10">
          <Table
            aria-label="Example table with dynamic content"
            shadow="none"
            // className="h-5/6"
          >
            <TableHeader className="bg-background" columns={columnsFilter}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>

            <TableBody
              items={data?.res ? data.res : data?.result ? data?.result : []}
            >
              {(item) => (
                <TableRow key={item._id} className="border-b-1 border-special-gray">
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

        <div className="bg-background h-3/50 w-100% flex flex-row justify-between">
          <div className="flex flex-row justify-center items-center gap-2">
            <Select
              disableSelectorIconRotation
              className="w-12"
              selectorIcon={<HiOutlineSwitchVertical  />}
              onChange={handleChangePageSize}
            >
              {rowsPerPage.map((rows) => (
                <SelectItem key={rows.key}>{rows.label}</SelectItem>
              ))}
            </Select>
            <div className="flex flex-row justify-end items-center h-full ml-3">
              {data && (
                <p className="flex flex-row items-center">
                  Entries per page - from
                  {` ${data?.pageInfo?.from} to ${data?.pageInfo?.to} / ${data?.pageInfo?.totalItems}`}
                </p>
              )}
            </div>
          </div>

          {data && (
            <div className="flex flex-row justify-end items-center h-full">
              <Pagination
                color="default"
                classNames={{ item: "bg-none", cursor: "text-white" }}
                page={page}
                total={data?.pageInfo?.totalPage || 1}
                onChange={(page) => props.setPage(page)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ITable;
