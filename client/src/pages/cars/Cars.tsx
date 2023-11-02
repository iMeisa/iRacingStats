import Box from "@mui/material/Box";
import {Tab} from "@mui/material";
import React, {useState} from "react";
import TabPanel from '@mui/lab/TabPanel';
import {TabContext, TabList} from "@mui/lab";
import CarTable from "./CarTable.tsx";

// function a11yProps(index: number) {
//     return {
//         id: `simple-tab-${index}`,
//         'aria-controls': `simple-tabpanel-${index}`,
//     };
// }

export default function Cars() {
    const [value, setValue] = useState('1');

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <>
            {/*<h1>Cars</h1>*/}
            {/*<Box className={"container"} sx={{ width: '100%'}}>*/}
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                            <Tab label="Cars" value="1" />
                            <Tab label="Classes" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <CarTable/>
                    </TabPanel>
                    <TabPanel value="2">car classes</TabPanel>
                </TabContext>
            {/*</Box>*/}
        </>
    )
}
