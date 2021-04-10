import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import { ProjectsSettingsMembersProps } from './types';

import './ProjectsSettingsMembers.scss';

const useStyles = makeStyles({
  participants: {
    marginTop: 10,
    color: 'rgba(0, 0, 0, 0.54)',
    marginBottom: 10,
  },
  list: {
    width: '100%',
    position: 'relative',
    boxShadow: '0px 0px 10px #d0d0d0',
    borderRadius: '10px',
    overflow: 'auto',
    maxHeight: 300,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
  submit: {},
});

const ProjectsSettingsMembers: React.FC<ProjectsSettingsMembersProps> = ({ formik }) => {
  const classes = useStyles();
  const array: Array<number> = [];

  return (
    <div className="project-settings__members">
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="user"
          name="user"
          label="Invited user"
          type="user"
          value={formik.values.user}
          onChange={formik.handleChange}
          error={formik.touched.user && Boolean(formik.errors.user)}
          helperText={formik.touched.user && formik.errors.user}
        />
        <button type="submit">Invite</button>
      </form>

      <div className="members__wrapper">
        <Typography variant="caption" className={classes.participants}>
          Participants
        </Typography>
        {array.length ? (
          <List className={classes.list}>
            {array.map((sectionId) => (
              <ListItem key={`item-${sectionId}-${sectionId}`}>
                <ListItemText primary={`Item ${sectionId}`} />
              </ListItem>
            ))}
          </List>
        ) : (
          'There are no project participants yet.'
        )}
      </div>
    </div>
  );
};

export default ProjectsSettingsMembers;
