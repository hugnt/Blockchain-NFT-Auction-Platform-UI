import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./TabBox.css";
import BidInforRow from "../BidInforRow";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
const theme = createTheme({
  palette: {
    primary: {
      main: '#fff',
 
    },
    secondary: {
      main: '#E0C2FF',
      light: '#F5EBFF',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#47008F',
    },
  },
});

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TabBox() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div id="page-tab">
      <ThemeProvider theme={theme}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="primary"
              indicatorColor="primary"
              aria-label="basic tabs example"
              
            >
              <Tab label="Bids" {...a11yProps(0)} />
              <Tab label="Owners" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0} >
            <div className="rounded-[20px] bg-fog-4 py-10 px-6 mt-8">
              <BidInforRow className="mb-4"/>
              <BidInforRow className="mb-4"/>
              <BidInforRow className="mb-4"/>
              <BidInforRow className="mb-4"/>
            </div>
            
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
          <div className="rounded-[20px] bg-fog-4 py-10 px-6 mt-8">
              <BidInforRow className="mb-4"/>
              <BidInforRow className="mb-4"/>
              <BidInforRow className="mb-4"/>
              <BidInforRow className="mb-4"/>
            </div>
          </CustomTabPanel>
        </Box>
      </ThemeProvider>
    </div>
  );
}
