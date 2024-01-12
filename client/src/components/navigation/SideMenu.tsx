import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {useState} from "react";
import {MenuItem, Select} from "@mui/material";
import Title from '../../functions/strings/Title';

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

type SideMenuProps = {
    initialTab: number,
    panels: string[],
    onChange: (value: number) => void,
    mobile?: boolean
}

export default function SideMenu(props: SideMenuProps) {

    const [value, setValue] = useState(props.initialTab);

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
                { props.panels.map((value, index) =>
                    <MenuItem key={value} value={index}>{Title(value)}</MenuItem>)
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
                aria-label="Vertical tabs"
                // sx={{ borderRight: 1, borderColor: 'divider' }}
            >
                {props.panels.map((value, index) =>
                    <Tab key={value} label={value} {...a11yProps(index)}/>
                )}
            </Tabs>
        </Box>
}
