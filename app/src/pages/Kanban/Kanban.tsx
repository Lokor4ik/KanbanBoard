import MainLayout from 'layouts/MainLayout/MainLayout';
import KanbanContainer from 'containers/Kanban/Kanban';

const Kanban = () => (
  <MainLayout sectionName="projects">
    <h1>Kanban</h1>
    <KanbanContainer />
  </MainLayout>
);

export default Kanban;
