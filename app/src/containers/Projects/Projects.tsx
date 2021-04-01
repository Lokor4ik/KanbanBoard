import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Loader from 'shared/Loader/Loader';

import ProjectsTable from 'components/ProjectsTable/ProjectsTable';

import { RootState } from 'store/types';
import { getProjects } from 'store/projects/action';

const ProjectsContainer = () => {
  const { rows, loading } = useSelector((state: RootState) => state.projects);

  const dispatch = useDispatch();

  const fetchProjects = useCallback(async () => {
    dispatch(getProjects());
  }, [dispatch]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  if (loading) {
    return <Loader />;
  }

  return <ProjectsTable rows={rows} />;
};

export default ProjectsContainer;
