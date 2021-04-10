import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Loader from 'shared/Loader/Loader';

import ProjectsSettingsMembers from 'components/ProjectsSettingsMembers/ProjectsSettingsMembers';

import { RootState } from 'store/types';
import { getUserByEmail } from 'store/projects/action';

import { ProjectParticipantsForms } from './types';

// import { RootState } from 'store/types';
const useStyles = makeStyles({
  h6: {
    fontWeight: 500,
  },
});

const ProjectParticipants = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const {
    loading,
    currentProject: { participants },
  } = useSelector((state: RootState) => state.projects);

  const handleSumbit = ({ user }: ProjectParticipantsForms) => {
    const findedUser = participants.find((participantItem) => participantItem.email === user);

    if (!findedUser) {
      dispatch(getUserByEmail({ user, enqueueSnackbar }));
    } else {
      enqueueSnackbar('This user has already been added', {
        variant: 'warning',
      });
    }
  };

  const validationSchema = yup.object({
    user: yup.string().email('Enter a valid email').required('Email is required'),
  });

  const formik = useFormik({
    initialValues: {
      user: '',
    },
    validationSchema,
    onSubmit: handleSumbit,
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="project-participants__wrapper shared--wrapper">
      <Typography variant="h6" className={classes.h6}>
        Project participants
      </Typography>

      <ProjectsSettingsMembers formik={formik} />
    </div>
  );
};

export default ProjectParticipants;
