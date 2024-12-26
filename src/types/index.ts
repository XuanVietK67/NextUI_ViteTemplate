import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type ActionElement<T> = {
  icon: JSX.Element;
  label: string;
  onClick: (row: T) => void;
  color?:
  | "danger"
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning";
};

export type TableColumn<T> = {
  key: string;
  label: string;
  render?: ((items: T, columnKey: string) => JSX.Element) | ActionElement<T>[] ;
};


export type TableCustom<T> = {
  data?: {
    pageInfo?: {
      totalPage: number;
      totalItems: number;
      currentPage: number;
      pageSize: number;
      from: number;
      to: number;
    };
    res?: Array<T>;
    result?: Array<T>;
  };
  columns: TableColumn<T>[];
  columnsFilter: TableColumn<T>[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setRowsPerPage?: React.Dispatch<React.SetStateAction<number>>;
  showColumnsAction?: boolean;
  filter?: boolean;
  header?: boolean;
  footer?: boolean
  create: () => void
};


export type PopoverCustom<T>={
  data: T[]
  render: (item: T)=> JSX.Element
  isOpen: boolean
}