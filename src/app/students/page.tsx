import useStudentsData from "@/hooks/useStudentsData";
import { columns } from "./columns";
import { DataTable } from "./data-table";

function StudentsTable() {
  const { data, loading } = useStudentsData();

  return <>{loading && <p>Loading...</p>}
  {data.length > 0 && <DataTable columns={columns} data={data} />}
  </>;
}

export default StudentsTable;
