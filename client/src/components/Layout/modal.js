import React ,{useState}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Backdrop,Fab, Modal} from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add';
import Fade from '@material-ui/core/Fade';
import EditRecipeForm from '../Form/EditRecipeForm';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function FormModal() {
    const [currentId, setCurrentId] = useState(0);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div>
        <Fab color="secondary" aria-label="add" className={classes.fab} onClick={handleOpen}>
          <AddIcon />
        </Fab>
      </div>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 200,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
          <EditRecipeForm currentId={currentId} setCurrentId={setCurrentId} />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
