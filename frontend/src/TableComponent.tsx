import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso, TableComponents } from "react-virtuoso";
import { styled } from "@mui/material/styles";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#D3D3D3",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface InterfacePartnerIdentifier {
  entity_id: string;
  asym_id: string;
}

interface PartnerData {
  interface_partner_identifier: InterfacePartnerIdentifier;
  table_data: number[][];
}

interface ColumnData {
  dataKey: number;
  label: string;
  numeric?: boolean;
  width: number;
}

const columns: ColumnData[] = [
  {
    width: 50,
    label: "Seq. ID",
    dataKey: "Sequence ID",
  },
  {
    width: 120,
    label: "Unbound ASA",
    dataKey: "Unbound ASA",
    float: true,
  },
  {
    width: 120,
    label: "Bound ASA",
    dataKey: "Bound ASA",
    float: true,
  },
  {
    width: 120,
    label: "ASA Change",
    dataKey: "ASA Change",
    float: true,
  },
];

const VirtuosoTableComponents: TableComponents<number[]> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
    />
  ),
  TableHead,
  TableRow: ({ item: _item, ...props }) => <StyledTableRow {...props} />,
  TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric || false ? "right" : "left"}
          style={{ width: column.width }}
          sx={{
            backgroundColor: "#2c2b2e",
            color: "white",
            fontSize: 28,
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index: number, row: number[]) {
  return (
    <React.Fragment>
      {row.map((value, index) => (
        <TableCell
          key={index}
          align={columns[index].numeric || false ? "right" : "left"}
          sx={{
            fontSize: 28,
          }}
        >
          {value}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

export default function TableComponent({ data }: { data: PartnerData[] }) {
  console.log("THE DATA THAT CAME *****************");
  console.log(data.length);
  let size: number = data.length;
  return (
    <div>
      <div className="container is-max-desktop ">
        <section className="section is-small has-">
          <h1 className="title is-1 has-text-centered has-text-white ">
            ASA Change Table
          </h1>
          <h2 className=" title is-4 has-text-centered has-text-white ">
            (Scroll the table to view full list)
          </h2>
        </section>
      </div>

      {data.map((item, index) => (
        <section className="section is-small ">
          <center>
            <h2 className=" title is-3 has-text-centered has-text-white ">
              Entity ID: {item.interface_partner_identifier.entity_id}, Asym ID:{" "}
              {item.interface_partner_identifier.asym_id}
            </h2>
            <Paper style={{ height: 400, width: "90%" }}>
              <TableVirtuoso
                data={item.table_data}
                components={VirtuosoTableComponents}
                fixedHeaderContent={fixedHeaderContent}
                itemContent={rowContent}
              />
            </Paper>
          </center>
        </section>
      ))}
    </div>
  );
}
