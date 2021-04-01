import MainLayout from 'layouts/MainLayout/MainLayout';
import KanbanContainer from 'containers/Kanban/Kanban';

const Kanban = () => (
  <MainLayout sectionName="kanban">
    <h1>Project</h1>
    <KanbanContainer />
  </MainLayout>
);

export default Kanban;
