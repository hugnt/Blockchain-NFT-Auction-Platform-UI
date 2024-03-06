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

interface PropsTab{
  lstComponent?:React.ReactNode[];
  lstLabel?: string[];
  className?:string;
  whiteBG?:Boolean;
  tabActive?:number;
  handleClickReel?:(tabIndex: number) => void;
}
const theme = createTheme({
  palette: {
    primary: {
      main: '#fff',
 
    },
    secondary: {
      main: 'rgba(12, 68, 93, 1)',
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
          <Typography component={'span'}>{children}</Typography>
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

export default function TabBox(props: PropsTab) {
  let {lstComponent, lstLabel, className, whiteBG = false, tabActive=0, handleClickReel} = props;
  const [value, setValue] = React.useState(tabActive);

  React.useEffect(() => {
    setValue(tabActive);
  },[tabActive]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    handleClickReel&&handleClickReel(newValue);
  };

  return (
    <div id="page-tab" className={`${className} ${whiteBG?'whiteBG':'backBG'}`}>
      <ThemeProvider theme={theme}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", maxWidth:"80rem", margin:"auto" }} >
            <Tabs
              value={value}
              onChange={handleChange}
              textColor={!whiteBG?"primary":"secondary"}
              indicatorColor={!whiteBG?"primary":"secondary"}
              aria-label="basic tabs example"
              className=""
            >            
              {
                lstLabel?.map((x, i)=>(
                  <Tab key={i} label={x} {...a11yProps(i)} />
                ))
              }
            </Tabs>
          </Box>
          {
              lstComponent?.map((x,i) => (
                <CustomTabPanel value={value} index={i} key={i}>{x}</CustomTabPanel>
              ))
          }
        
        </Box>
      </ThemeProvider>
    </div>
  );
}
