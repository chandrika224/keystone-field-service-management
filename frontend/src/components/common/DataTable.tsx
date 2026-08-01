import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Column<T> {
  key: keyof T;
  header: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
}

export default function DataTable<T extends Record<string, any>>({
  columns,
  data,
}: DataTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <Table>

        <TableHeader>

          <TableRow>

            {columns.map((column) => (
              <TableHead key={String(column.key)}>
                {column.header}
              </TableHead>
            ))}

          </TableRow>

        </TableHeader>

        <TableBody>

          {data.map((row, index) => (

            <TableRow key={index}>

              {columns.map((column) => (

                <TableCell key={String(column.key)}>
                  {String(row[column.key])}
                </TableCell>

              ))}

            </TableRow>

          ))}

        </TableBody>

      </Table>
    </div>
  );
}