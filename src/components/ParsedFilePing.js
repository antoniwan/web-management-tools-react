import React, { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import { Button, Card, Divider, Spinner } from "@blueprintjs/core";

export default function ParsedFilePing(props) {
  const { tableData, handleStartChecking, processing } = props;

  const columns = React.useMemo(
    () => [
      {
        Header: "URL",
        accessor: "url",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Response Code",
        accessor: "responseCode",
      },
      {
        Header: "Asset Type",
        accessor: "assetType",
      },
    ],
    []
  );

  const data = useMemo(
    () =>
      tableData.map((element) => {
        return {
          url: element.data.URL,
          status: null,
          responseCode: null,
          assetTye: null,
        };
      }),
    [tableData]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <Card>
      <p>
        Found <strong>{tableData.length} URL</strong>.{" "}
        <Button
          intent="success"
          text={processing ? "Processing! PLEASE WAIT!" : "Start Checking!"}
          onClick={handleStartChecking}
          disabled={processing}
        ></Button>
      </p>
      <Divider />

      <div className="card-actions">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  // Add the sorting props to control sorting. For this example
                  // we can add them into the header props
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    {/* Add a sort direction indicator */}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
