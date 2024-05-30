import { Card, Table, TableBody, TableContainer } from '@mui/material';
import Scrollbar from '../scrollbar';
import TableHead from './table-head';

function TableComponent({
  headLabel,
  children,
}: {
  children: React.ReactNode;
  headLabel: {
    id: string;
    label: string;
  }[];
}) {
  return (
    <Card>
      <Scrollbar sx={{}}>
        <TableContainer sx={{ overflow: 'unset' }}>
          <Table sx={{ minWidth: 800 }}>
            <TableHead rowCount={20} numSelected={0} headLabel={headLabel} />
            <TableBody>{children}</TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </Card>
  );
}

export default TableComponent;
