import React, { useContext, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import BarChartComponent from "./BarChart";
import LineChartComponent from "./LineChart";
import ScatterPlotComponent from "./ScatterPlot";
import { AppContext } from "./AppContext";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Box from "@mui/material/Box";

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

/**
 * All Charts component to hold different graphs.
 * @component
 */
const AllChartsComponent = ({ data }: { data: PartnerData[] }) => {
  const context = useContext(AppContext);
  if (!context) {
    return <div>Loading...</div>;
  }
  const { setCurrentPage } = context;
  return (
    <>
      <AppBar position="static" style={{ backgroundColor: "#8ed1fc" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            onClick={() => setCurrentPage("table")}
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
        </Toolbar>
      </AppBar>

      <div className="container is-max-desktop ">
        <section className="section is-small has-">
          <h1 className="title is-1 has-text-centered has-text-white ">
            Graphical Representation of ASA Change
          </h1>
        </section>
      </div>

      <section className="section is-medium ">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              style={{
                backgroundColor: "white",
                padding: "10px",
              }}
            >
              <BarChartComponent data={data} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              style={{
                backgroundColor: "white",
                padding: "10px",
              }}
            >
              <ScatterPlotComponent data={data} />
            </Paper>
          </Grid>

          <Grid item xs={12} md={12}>
            <Paper
              elevation={3}
              style={{
                backgroundColor: "white",
                padding: "10px",
              }}
            >
              <LineChartComponent data={data} />
            </Paper>
          </Grid>
        </Grid>
      </section>
    </>
  );
};

export default AllChartsComponent;
