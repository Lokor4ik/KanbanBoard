import { FormikValues } from 'formik';

import { ProjectParticipants } from 'store/projects/types';

export interface ProjectsSettingsMembersProps {
  lead: string;
  formik: FormikValues;
  participants: ProjectParticipants;
  deleteMember: (id: string) => void;
}
