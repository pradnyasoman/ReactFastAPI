import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import { TableVirtuoso, TableComponents } from "react-virtuoso";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { AppContext } from "./AppContext";

/**
 * Interfaces to define data structure.
 * @interface
 */
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

/**
 * Defining and styling table elements
 * @const
 */
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#D3D3D3",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
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

/**
 * Function to define Table row.
 * @function
 */
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

/**
 * Function to define Row content.
 * @function
 */
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

/**
 * Table component to disply ASA change data.
 * @component
 */
export default function TableComponent({ data }: { data: PartnerData[] }) {
  const context = React.useContext(AppContext);

  if (!context) {
    throw new Error("AppContext not available");
  }

  const { setCurrentPage } = context;
  const { setData } = context;
  function goBack() {
    setCurrentPage("form");
  }

  function loadGraph() {
    setData(data);
    setCurrentPage("graphs");
  }

  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: "#8ed1fc" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            onClick={goBack}
            style={{
              color: "black",
              fontFamily: "Arial",
              fontSize: "25px",
              fontWeight: "bold",
            }}
          >
            <ArrowBackIosIcon />
            <Box component="span" marginLeft={1}>
              Back
            </Box>
          </IconButton>
          <Box style={{ flexGrow: 1 }} /> {}
          <Button
            color="inherit"
            onClick={loadGraph}
            style={{
              color: "black",
              fontFamily: "Arial",
              fontSize: "25px",
              fontWeight: "bold",
            }}
          >
            Graphs
          </Button>
        </Toolbar>
      </AppBar>

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
        <section className="section is-small " key={index}>
          <center>
            <h2 className=" title is-3 has-text-centered has-text-white ">
              Interface Partner --- Entity ID:{" "}
              {item.interface_partner_identifier.entity_id}, Asym ID:{" "}
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
