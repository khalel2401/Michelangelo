import * as React from 'react';
import Box from '@mui/material/Box'; 
import Tab from '@mui/material/Tab';
import { TabContext } from '@mui/lab';
import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';

export default function TopTabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
            <TabList 
            onChange={handleChange} 
            aria-label="top tabs"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
                <Tab label="Tab 1" value="1" />
                <Tab label="Tab 2" value="2" />
                <Tab label="Tab 3" value="3" />
            </TabList>
            <TabPanel value="1">
                Content for Tab 1
            </TabPanel>
            <TabPanel value="2">
                Content for Tab 2
            </TabPanel>
            <TabPanel value="3">
                Content for Tab 3
            </TabPanel>
        </TabContext>
    </Box>
  );
}