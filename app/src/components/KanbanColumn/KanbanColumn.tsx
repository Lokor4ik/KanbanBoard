import { PropsKanbanColumn } from './types';

import './KanbanColumn.scss';

const KanbanColumn: React.FC<PropsKanbanColumn> = ({ columnId, column, children }) => (
  <div className="kanban__column" key={columnId}>
    <h2>{column.name}</h2>
    {children}
  </div>
);

export default KanbanColumn;
