import { AgGridReact } from "ag-grid-react";
// interface GridProps{
//   columnDefs:
//   rowData: StockData
//   height:
//   className:
//   innerRef:
// }
export default function Grid({
  columnDefs,
  rowData,
  height,
  className,
  innerRef,
}: any) {
  return (
    <div>
      <div
        className={"ag-theme-alpine font-inter border-none " + className}
        style={{
          height: height,
          width: "100%",
          fontFamily: "inter",
          border: "none",
          overflowY: "auto",
        }}
      >
        <AgGridReact
          ref={innerRef}
          defaultColDef={{ suppressMovable: true }}
          columnDefs={columnDefs}
          rowData={rowData}
          overlayNoRowsTemplate={"No data found"}
          className=".ag-overlay-loading-center "
          tooltipShowDelay={0}
          tooltipHideDelay={2000}
        />
      </div>
    </div>
  );
}
