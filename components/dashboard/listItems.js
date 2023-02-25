import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import UploadIcon from '@mui/icons-material/Upload';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import DisplayIcon from '@mui/icons-material/DisplaySettings';
import AssignmentIcon from '@mui/icons-material/Assignment';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton href='/dashbord'>
      <ListItemIcon>
        <UploadIcon />
      </ListItemIcon>
      <ListItemText primary="アップロード" />
    </ListItemButton>
    <ListItemButton href='/dashbord/ManageContents'>
      <ListItemIcon>
        <ChangeCircleIcon />
      </ListItemIcon>
      <ListItemText primary="コンテンツ変更" />
    </ListItemButton>
    <ListItemButton href='/dashbord/ViewPosition'>
      <ListItemIcon>
        <DisplayIcon />
      </ListItemIcon>
      <ListItemText primary="表示画面調整" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
