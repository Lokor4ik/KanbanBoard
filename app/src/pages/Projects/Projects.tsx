import MainLayout from 'layouts/MainLayout/MainLayout';
import ProjectsContainer from 'containers/Projects/Projects';

const Projects = () => (
  <MainLayout sectionName="projects">
    <h1>Projects</h1>
    <ProjectsContainer />
  </MainLayout>
);

export default Projects;
