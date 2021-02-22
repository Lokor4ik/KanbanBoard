import MainLayout from 'layouts/MainLayout/MainLayout';
import ProjectsContainer from 'containers/ProjectsContainer/ProjectsContainer';

const Projects = () => (
  <MainLayout sectionName="projects">
    <h1>Projects</h1>
    <ProjectsContainer />
  </MainLayout>
);

export default Projects;
