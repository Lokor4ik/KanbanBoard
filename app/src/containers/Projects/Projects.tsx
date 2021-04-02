import { useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Loader from 'shared/Loader/Loader';
import CustomLink from 'shared/Link/Link';

import ProjectsTable from 'components/ProjectsTable/ProjectsTable';

import { RootState } from 'store/types';
import { getProjects } from 'store/projects/action';

import './Projects.scss';

const useStyles = makeStyles({
  body1: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  h6: {
    fontWeight: 500,
  },
});

const ProjectsContainer = () => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const { rows, loading, creatingProject } = useSelector((state: RootState) => state.projects);

  const dispatch = useDispatch();

  const fetchProjects = useCallback(async () => {
    dispatch(getProjects({ enqueueSnackbar }));
  }, [dispatch, enqueueSnackbar]);

  useEffect(() => {
    if (!creatingProject) {
      fetchProjects();
    }
  }, [fetchProjects, creatingProject]);

  const tableContainerClasses = useMemo(
    () =>
      rows.length >= 13 ? 'projects__wrapper projects__wrapper--box-shadow' : 'projects__wrapper',
    [rows.length]
  );

  if (loading || creatingProject) {
    return <Loader />;
  }

  return (
    <div className={tableContainerClasses}>
      <div className="projects__top">
        <Typography variant="h6" className={classes.h6}>
          Projects
        </Typography>

        <CustomLink
          title="Create a new project"
          path="/new-project"
          className="link--blue link--no-margins"
        />
      </div>
      {rows.length ? (
        <ProjectsTable rows={rows} />
      ) : (
        <Typography className={classes.body1} variant="body1">
          There are no projects in which you are involved
        </Typography>
      )}
    </div>
  );
};

export default ProjectsContainer;
