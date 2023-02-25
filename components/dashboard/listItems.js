import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import UploadIcon from '@mui/icons-material/Upload';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import DisplayIcon from '@mui/icons-material/DisplaySettings';

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


