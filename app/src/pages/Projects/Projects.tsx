import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import MainLayout from 'layouts/MainLayout/MainLayout';
import ProjectsContainer from 'containers/Projects/Projects';
import CustomLink from 'shared/Link/Link';

import './Projects.scss';

const useStyles = makeStyles({
  h6: {
    fontWeight: 500,
  },
});

const Projects = () => {
  const classes = useStyles();

  return (
    <MainLayout sectionName="projects">
      <div className="projects__wrapper">
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
        <ProjectsContainer />
      </div>
    </MainLayout>
  );
};

export default Projects;
