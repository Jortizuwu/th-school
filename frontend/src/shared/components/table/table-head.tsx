import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import { TableCell, TableSortLabel } from '@mui/material';

export default function StudentTableHead({
  headLabel,
}: {
  rowCount: number;
  headLabel: {
    id: string;
    label: string;
  }[];
  numSelected: number;
}) {
  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell key={headCell.id}>
            <TableSortLabel hideSortIcon>{headCell.label}</TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
