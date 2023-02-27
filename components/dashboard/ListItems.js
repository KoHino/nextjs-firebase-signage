import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import UploadIcon from '@mui/icons-material/Upload';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import DisplayIcon from '@mui/icons-material/DisplaySettings';
import { useRouter } from 'next/router';

export const MainListItems = () => {
  const router = useRouter();
  const CustomlistItem = ({onClick, text, children}) => {
    return (
      <ListItemButton onClick={onClick}>
        <ListItemIcon>
          {children}
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>      
    )
  }

  return (
    <React.Fragment>
      <CustomlistItem onClick={() => router.push('/dashbord')} text="アップロード">
        <UploadIcon />
      </CustomlistItem>
      <CustomlistItem onClick={() => router.push('/dashbord/ManageContents')} text="コンテンツ変更">
        <ChangeCircleIcon />
      </CustomlistItem>
      <CustomlistItem onClick={() => router.push('/dashbord/ViewPosition')} text="表示画面調整">
        <DisplayIcon />
      </CustomlistItem>
    </React.Fragment>
  );
}


