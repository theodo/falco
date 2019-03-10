import * as React from 'react';
import { Link } from 'react-router-dom';
import { ProjectType } from 'redux/projects/types';
import Style from './ProjectTile.style';

interface Props {
  project: ProjectType;
}

const Projects: React.FunctionComponent<Props> = props => {
  const { project } = props;

  return (
    <Style.Container>
      <Style.ProjectScreenshot src={project.screenshotUrl} />
      <Style.ProjectTitle>{project.name}</Style.ProjectTitle>
      <Style.LastAudit>Dernier audit aujourd'hui à 08:02</Style.LastAudit>
      <Style.PagesWrapper>
        {project.pages.map(page => (
          <>
            <Style.Page key={page.uuid}>📄{page.name}</Style.Page>
            <Style.Page key={1}>📄{page.name}</Style.Page>
            <Style.Page key={2}>📄{page.name}</Style.Page>
          </>
        ))}
      </Style.PagesWrapper>
      <Style.LinkWrapper>
        <Link to={`/project/${project.uuid}/front`}>
          <Style.PrimaryButton>ACCEDER À l'AUDIT</Style.PrimaryButton>
        </Link>
      </Style.LinkWrapper>
    </Style.Container>
  );
};

export default Projects;
