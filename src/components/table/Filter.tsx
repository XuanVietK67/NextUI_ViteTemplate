import {
    Button,
    DateRangePicker,
    Input,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Select,
    SelectItem,
  } from "@nextui-org/react";
  import { TbEaseInOutControlPoints } from "react-icons/tb";
  import { SearchIcon } from "../layout/icons";
  
  const Filter = () => {
    return (
      <Popover placement="bottom" showArrow={true}>
        <PopoverTrigger>
          <Button
            color="secondary"
            variant="flat"
            className="capitalize"
            size={"lg"}
          >
            <div className="flex flex-row justify-center items-center gap-2">
              <TbEaseInOutControlPoints size={20} color="white" />
              Filter
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col w-auto h-50">
            <div className="w-full p-3">
              <p className="font-medium">Filter</p>
            </div>
  
            <hr />
  
            <div className="flex flex-col">
              <div className="flex flex-row justify-between p-2">
                <p className="font-medium">Date range</p>
  
                <p className="font-semibold text-green-600">Reset</p>
              </div>
  
              <div className="flex flex-row gap-3 pb-5">
                <div>
                  <p className="p-2">From:</p>
                  <DateRangePicker label="Stay duration" size="sm" />
                </div>
  
                <div>
                  <p className="p-2">To:</p>
                  <DateRangePicker label="Stay duration" size="sm" />
                </div>
              </div>
  
              <hr />
  
              <div className="flex flex-col gap-3 pb-5">
                <div className="flex flex-row justify-between p-2">
                  <p className="font-medium">Activity type</p>
                  <p className="font-semibold text-green-600">Reset</p>
                </div>
                <Select
                  className="max-w-xs"
                  // label="Favorite Animal"
                  placeholder="All warehouses"
                  selectionMode="multiple"
                >
                  <SelectItem key={"xv"}>Xuan Viet</SelectItem>
                  <SelectItem key={"xvv"}>Xuan Viett</SelectItem>
                </Select>
              </div>
  
              <hr />
  
              <div className="flex flex-col gap-3 pb-5">
                <div className="flex flex-row justify-between p-2">
                  <p className="font-medium">Status</p>
                  <p className="font-semibold text-green-600">Reset</p>
                </div>
                <Select
                  className="max-w-xs"
                  // label="Favorite Animal"
                  placeholder="Active"
                  selectionMode="multiple"
                >
                  <SelectItem key={"xv"}>Xuan Viet</SelectItem>
                  <SelectItem key={"xvv"}>Xuan Viett</SelectItem>
                </Select>
              </div>
  
              <hr />
  
              <div className="flex flex-col gap-3 pb-5">
                <div className="flex flex-row justify-between p-2">
                  <p className="font-medium">Keyword search</p>
                  <p className="font-semibold text-green-600">Reset</p>
                </div>
                <Input
                  // isClearable
                  classNames={{
                    label: "text-black/50 dark:text-white/90",
                    input: [
                      "bg-transparent",
                      "text-black/90 dark:text-white/90",
                      "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                    ],
                    innerWrapper: "bg-transparent",
                    inputWrapper: [
                      "shadow-xl",
                      "bg-default-200/50",
                      "dark:bg-default/60",
                      "backdrop-blur-xl",
                      "backdrop-saturate-200",
                      "hover:bg-default-200/70",
                      "dark:hover:bg-default/70",
                      "group-data-[focus=true]:bg-default-200/50",
                      "dark:group-data-[focus=true]:bg-default/60",
                      "!cursor-text",
                    ],
                  }}
                  label="Search"
                  placeholder="Type to search..."
                  radius="lg"
                  startContent={
                    <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                  }
                />
              </div>
  
              <hr />
            </div>
  
            <div className="flex flex-row justify-between p-2">
              <Button className="bg-gray-50 border-gray-700">
                  Reset all
              </Button>
  
              <Button className="bg-green-600	text-zinc-50">
                  Apply now
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  };
  export default Filter;
  