
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {useState} from "react";
import {MenuItem, Select} from "@mui/material";

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const panels = ['Info', 'Races']

export default function UserMenu(props: {onChange: (value: number) => void, mobile?: boolean}) {
    const [value, setValue] = useState(0);

    const handleChange = (newValue: number) => {
        setValue(newValue);
        props.onChange(newValue)
    };
    return props.mobile ?
        <Box
            sx={{ mt: 1, bgcolor: 'background.paper', display: {xs: 'block', md:'none'}}}
        >
            <Select
                fullWidth
                value={value}
                onChange={(event) => handleChange(event.target.value as number)}
            >
                { panels.map((value, index) =>
                    <MenuItem value={index}>{value}</MenuItem>)
                }
            </Select>
        </Box>
        :
        <Box
            sx={{ bgcolor: 'background.paper', display: {xs: 'none', md:'flex'}}}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={(_, newValue) => handleChange(newValue)}
                aria-label="Vertical tabs example"
                // sx={{ borderRight: 1, borderColor: 'divider' }}
            >
                {panels.map((value, index) =>
                    <Tab label={value} {...a11yProps(index)}/>
                )}
            </Tabs>
        </Box>
}
