import { AuditResultType } from 'redux/auditResults/types';
import { ProjectType } from 'redux/entities/projects/types';
import { UserState } from 'redux/user';

export const getWPTAuditId = (audit: AuditResultType) => {
  const auditUrl = new URL(audit.WPTResultsJsonUrl);

  return auditUrl.searchParams.get('test');
};

export const pause = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export const validateEmail = (email: string) => {
  // eslint-disable-next-line
  const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return emailRegexp.test(String(email).toLowerCase());
};

export const isUserAdminOfProject = (user: UserState, project: ProjectType) => {
  if (!user) {
    return false;
  }

  let isAdmin = false;
  project.projectMembers.forEach((projectMember) => {
    if (user.username === projectMember.username && projectMember.isAdmin) {
      isAdmin = true;
    }
  });

  return isAdmin;
};
