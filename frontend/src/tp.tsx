import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
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

interface Data {
  calories: number;
  carbs: number;
  dessert: string;
  fat: number;
  id: number;
  protein: number;
}

interface ColumnData {
  dataKey: keyof Data;
  label: string;
  numeric?: boolean;
  width: number;
}

type Sample = [string, number, number, number, number];

const sample: readonly Sample[] = [
  ["Frozen yoghurt", 159, 6.0, 24, 4.0],
  ["Ice cream sandwich", 237, 9.0, 37, 4.3],
  ["Eclair", 262, 16.0, 24, 6.0],
  ["Cupcake", 305, 3.7, 67, 4.3],
  ["Gingerbread", 356, 16.0, 49, 3.9],
];

function createData(
  id: number,
  dessert: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
): Data {
  return { id, dessert, calories, fat, carbs, protein };
}

const columns: ColumnData[] = [
  {
    width: 200,
    label: "Dessert",
    dataKey: "dessert",
  },
  {
    width: 120,
    label: "Calories\u00A0(g)",
    dataKey: "calories",
    numeric: true,
  },
  {
    width: 120,
    label: "Fat\u00A0(g)",
    dataKey: "fat",
    numeric: true,
  },
  {
    width: 120,
    label: "Carbs\u00A0(g)",
    dataKey: "carbs",
    numeric: true,
  },
  {
    width: 120,
    label: "Protein\u00A0(g)",
    dataKey: "protein",
    numeric: true,
  },
];

const rows: Data[] = Array.from({ length: 200 }, (_, index) => {
  const randomSelection = sample[Math.floor(Math.random() * sample.length)];
  return createData(index, ...randomSelection);
});

const VirtuosoTableComponents: TableComponents<Data> = {
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

function rowContent(_index: number, row: Data) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric || false ? "right" : "left"}
          sx={{
            fontSize: 28,
          }}
        >
          {row[column.dataKey]}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

export default function TableComponent({ data }) {
  console.log("THE DATA THAT CAME *****************");
  console.log(data.length);
  let size: number = data.length;
  return (
    <div>
      <div className="container is-max-desktop ">
        <section className="section is-small">
          <h1 className="title is-1 has-text-centered has-text-white ">
            ASA Change Table
          </h1>
          <h2 className=" title is-4 has-text-centered has-text-white ">
            (Scroll the table to view full list)
          </h2>
        </section>
      </div>

      {data.map((item, index) => (
        <section className="section is-small">
          <center>
            <h2 className=" title is-3 has-text-centered has-text-white ">
              {item.interface_partner_identifier}
            </h2>
            <Paper style={{ height: 400, width: "90%" }}>
              <TableVirtuoso
                data={rows}
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
