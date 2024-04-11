import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { FiChevronsDown, FiMoreHorizontal } from "react-icons/fi";
import { LuChevronsUp } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import DataTable from "../../Components/DataTable";
import CustomModal from "../../Components/Modal";
import { Button } from "../../Components/ui/button";
import { MdLogout } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../Components/ui/dropdown-menu";
import { Input } from "../../Components/ui/input";
import { toast } from "../../Components/ui/use-toast";
import {
  deleteStockDetail,
  getStocksDataBySymbol,
  userStocksData,
} from "../../services/httpServices";
import { StocksRowData } from "../../services/interfaces";
import { decodeToken } from "../../services/utils";
import ConfirmPopup from "../../Components/ConfirmPopup";

const Dashboard = () => {
  const [action, setAction] = useState("");
  const [isOpen, setIsPopupOpen] = useState<Boolean>(false);
  const [symbolName, setSymbolName] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmLoading, setIsConfirmLoading] = useState(false);
  const [tableData, setTableData] = useState<StocksRowData[]>([]);
  const [userName, setUserName] = useState("");
  const [seachQuery, setSeachQuery] = useState("");
  const [stockId, setStockId] = useState("");
  const navigate = useNavigate();
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSymbolName(event.target.value.toUpperCase());
  };

  const columns: ColumnDef<StocksRowData>[] = [
    {
      accessorKey: "symbol",
      header: "Symbol Name",
    },
    {
      accessorKey: "maxHigh",
      header: "High",
      cell: ({ row }) => {
        return (
          <div>
            <div className="  flex flex-col text-[green] justify-evenly">
              <p className="flex items-center">
                {row.original.maxHigh} <LuChevronsUp />
              </p>
            </div>
          </div>
        );
      },
    },

    {
      accessorKey: "maxLow",
      header: "Low",
      cell: ({ row }) => {
        return (
          <div className="  flex flex-1 flex-col text-[red] justify-evenly">
            <p className="flex items-center">
              {row.original.maxLow} <FiChevronsDown />
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "performance",
      header: "Performance",

      cell: ({ row }) => {
        let performance = Number(row.original.performance).toFixed(2);
        const isNegative = Number(performance) < 0;
        return (
          <div className="  flex flex-1 flex-col  justify-evenly">
            <p
              className={`flex items-center ${
                !isNegative ? "text-[green]" : "text-[red]"
              }`}
            >
              {performance}%
              {!isNegative ? (
                <LuChevronsUp color="green" />
              ) : (
                <FiChevronsDown color="red" />
              )}
            </p>
          </div>
        );
      },
    },

    {
      id: "actions",
      accessorKey: "action",
      header: "Action",
      enableHiding: false,
      cell: ({ row }) => {
        // console.log(row)
        // onClick={()=>navigate()}
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <FiMoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => navigate(`/viewStockDetail/${row.original._id}`)}
              >
                View
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setIsPopupOpen(true);
                  setStockId(row.original._id);
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  const deletData = async () => {
    try {
      setIsConfirmLoading(true);
      const res = await deleteStockDetail(stockId);
      if (res.status === 200) {
        toast({
          variant: "success",
          title: res.data.message,
        });
        getUserStocks();
      }
    } catch (err: any) {
      console.warn(err);
      toast({
        variant: "destructive",
        title: err?.response?.data.error,
      });
    } finally {
      setIsConfirmLoading(false);
      setIsPopupOpen(false);
    }
  };
  const getUserStocks = async () => {
    try {
      const userData = await decodeToken();
      const res = await userStocksData(
        userData?.deCodedToken?.payload?._id as string,
        seachQuery
      );
      setTableData(res.data.filteredDataArray);
      setUserName(res.data.userName);
    } catch (err: any) {
      console.warn(err);
      toast({
        variant: "destructive",
        title: err?.response?.data.error,
      });
    }
  };
  const handleSubmit = async () => {
    try {
      if (symbolName.trim() !== "") {
        setIsLoading(true);
        const userData = await decodeToken();
        const res = await getStocksDataBySymbol(
          symbolName,
          userData?.deCodedToken?.payload?._id as string
        );
        setSymbolName("");
        if (res.status === 200) {
          toast({
            variant: "success",
            title: res.data.message,
          });
        }
        getUserStocks();
      }
    } catch (err: any) {
      console.warn(err);
      toast({
        variant: "destructive",
        title: err?.response?.data.error,
      });
    } finally {
      closeModal();
      setIsLoading(false);
    }
  };
  const logout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  useEffect(() => {
    getUserStocks();
  }, [seachQuery]);
  return (
    <>
      <div className="flex gap-4 flex-col ">
        <div className="border rounded p-[1rem] items-center shadow-custom bg-white flex justify-between">
          <div>
            <p className="text-2xl">Hey {userName}</p>
            <p> Welcome to your Dashboard</p>
          </div>
          <div className="w-[2rem] h-[2rem]">
            <MdLogout
              className="cursor-pointer w-full h-full"
              onClick={() => logout()}
            />
          </div>
        </div>
        <div
          style={{ scrollbarWidth: "none" }}
          className="shadow-custom border rounded p-[1rem] bg-white min-h-[75vh] overflow-y-scroll max-h-[50vh]"
        >
          <div className="flex  items-center p-[1rem] rounded justify-between">
            <Input
              value={seachQuery}
              placeholder="Filter stocks..."
              className="max-w-sm "
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSeachQuery(e?.target?.value)
              }
            />
            <Button onClick={openModal} variant="outline">
              Add Stock
            </Button>
          </div>
          <DataTable columns={columns} data={tableData} />
        </div>
      </div>
      <CustomModal
        loading={isLoading}
        handleSubmit={handleSubmit}
        onInputChange={handleInputChange}
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        symbolName={symbolName}
      />
      <ConfirmPopup
        showConfirmPopup={isOpen}
        title={"Delete stock"}
        description={`Do you really want to delete this stock?`}
        // description={`Do you really want to ${
        //   selectedData?.isDeleted ? "unarchive" : "archive"
        // } this pack?`}
        btnTitle={"Delete"}
        setIsOpen={setIsPopupOpen}
        action={action}
        deleteHandler={deletData}
        confirmLoading={confirmLoading}
        IsOpen={setIsPopupOpen}
      />
    </>
  );
};

export default Dashboard;
