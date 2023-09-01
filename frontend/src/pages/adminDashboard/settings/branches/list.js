import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableBody, Typography, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { deleteRequest, getRequest, resetDelete } from '../../../../redux/modules/branch/slice';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { DeleteConfirmationModal } from '../../../../utils/modal';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
const EllipsisText = ({ children }) => (
  <Typography>
    {children}
  </Typography>
);
const tableHeading = ["Branch Name", "Email", "Phone Number", "Address", "Action"];

let deleteItemId;
export default function BranchList({ setItemData, toggleList }) {
  const dispatch = useDispatch();
  let { getRes, deleteRes } = useSelector(state => state.branch);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    dispatch(getRequest())
  }, [dispatch]);

  useEffect(() => {
    if (deleteRes?.success) {
      dispatch(getRequest())
    }
    toast(deleteRes?.message);
    dispatch(resetDelete());
  }, [dispatch, deleteRes]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {tableHeading.map(elem => (<StyledTableCell key={elem}>{elem}</StyledTableCell>))}
            </TableRow>
          </TableHead>
          <TableBody>
            {getRes?.data?.length > 0 ?
              getRes?.data?.map(elem => (
                <StyledTableRow key={elem._id}>
                  <StyledTableCell align="left"><EllipsisText>{elem.name}</EllipsisText></StyledTableCell>
                  <StyledTableCell align="left"><EllipsisText>{elem.email}</EllipsisText></StyledTableCell>
                  <StyledTableCell align="left"><EllipsisText>{elem.phone}</EllipsisText></StyledTableCell>
                  <StyledTableCell align="left"><EllipsisText>{elem.address}</EllipsisText></StyledTableCell>
                  <StyledTableCell align="left">
                    <EllipsisText>
                      <IconButton color="primary" onClick={() => { setItemData(elem); toggleList() }}>
                        <EditIcon />
                      </IconButton>
                      {!elem.isDeleted &&
                        <IconButton color="error" onClick={() => { deleteItemId = elem._id; setIsModalOpen(true) }}>
                          <DeleteIcon />
                        </IconButton>
                      }
                    </EllipsisText>
                  </StyledTableCell>
                </StyledTableRow>
              ))
              :
              <StyledTableRow>
                <StyledTableCell colSpan={tableHeading.length} align="left"><Typography>There is no data to show</Typography></StyledTableCell>
              </StyledTableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>
      <DeleteConfirmationModal open={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={() => { dispatch(deleteRequest(deleteItemId)); setIsModalOpen(false) }} />
    </>
  );
}