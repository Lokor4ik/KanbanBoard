import ProjectsTable from 'components/ProjectsTable/ProjectsTable';

function createData(id: string, name: string, key: string, lead: string) {
  return { id, name, key, lead };
}

const rows = [
  createData('2190d90df21g9', 'Frozen yoghurt', 'SAS', 'Pavel'),
  createData('fdsaf90290e', 'Ice cream sandwich', 'GROM', 'Gerd'),
  createData('wqmlcldvs0', 'Eclair', 'DELTA', 'Frozen'),
  createData('0f9009lkklglk2', 'Cupcake', 'MI6', 'Angelina'),
  createData('cxmnvmjkld2', 'Gingerbread', 'GIGN', 'John'),
];

const ProjectsContainer = () => <ProjectsTable rows={rows} />;

export default ProjectsContainer;
