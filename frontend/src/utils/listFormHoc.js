import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button } from '@mui/material';
import { useSelector } from 'react-redux';

const ListFormHoc = ({ List, Form }) => {
  const { currentBranch } = useSelector(state => state.branch)
  const [showList, setShowList] = useState(true);
  const [itemData, setItemData] = useState({});
  const toggleList = () => { setShowList(!showList) }
  useEffect(() => {
    if (currentBranch) {
      setShowList(true);
    }
  }, [currentBranch])
  return (
    <>
      <Box textAlign={'right'} mb={3}>
        <Button variant="contained" onClick={() => { toggleList(); setItemData({}) }} startIcon={showList ? <AddIcon /> : <CloseIcon />}> {showList ? "Add" : "Cancel"} </Button>
      </Box>
      {showList ? <List setItemData={setItemData} toggleList={toggleList} /> : <Form itemData={itemData} setItemData={setItemData} toggleList={toggleList} />}
    </>
  )
}

export default ListFormHoc;