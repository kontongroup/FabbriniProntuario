import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import EventIcon from '@material-ui/icons/Event';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import HelpIcon from '@material-ui/icons/Help';
import MoreIcon from '@material-ui/icons/More';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import logo from '../../images/logo.svg';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import api from '../../services/api';
import './drawer.css';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useForm } from 'react-hook-form';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { DashboardSharp } from '@material-ui/icons';

import swal from '@sweetalert/with-react';

const themeGlobal = createMuiTheme({
  palette: {
    primary: {
      main: '#2D9CDB',
    },
  },
});

const selectStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

// Mudar a cor das bordas dos input's
const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#2D9CDB',
    },

    '& .MuiOutlinedInput-root': {
      // '& fieldset': {
      //   borderColor: 'red',
      // },
      '&.Mui-focused fieldset': {
        borderColor: '#2D9CDB',
      },
    },
  },
})(TextField);

const useStylesAcordion = makeStyles((theme) => ({
  root: {
    MaxWidth: '100%',
    maxHeight: '100%',
    margin: '50px',
    padding: '20px',
  },
  heading: {
    //fontSize: theme.typography.pxToRem(15),
    //fontWeight: theme.typography.fontWeightRegular,
    fontFamily: 'Roboto',
    fontSize: '18px',
    fontWeight: 500,
    fontStyle: 'normal',
    color: '#878686',
  },
}));
const Container = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    marginRight: theme.spacing(18),
    width: '50px',
    marginLeft: 'auto',
    marginBottom: '20px',
    marginTop: '12px',
  },
}));

const InputDiv1 = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(3, 3, 3, 14),
      width: ' 75ch',
    },
  },
}));

const InputDiv2 = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(3, 3, 3, 16),
      width: ' 74ch',
    },
  },
}));

const ImputFont = createMuiTheme({
  typography: {
    subtitle1: {
      fontSize: 18,
      fontStyle: 'normal',
      color: '#878686',
    },
    h1: {
      fontFamily: 'Roboto',
      fontSize: 45,
      fontWeight: 400,
      color: '#000000',
      fontStyle: 'normal',
    },
  },
});

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    background: '#E5E5E5',
    height: '100vh',
  },
  appBar: {
    background: '#FFFFFF',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: 'black',
  },
  menuButton2: {
    marginRight: theme.spacing(-2),
    marginLeft: 'auto',
    color: 'black',
  },
  hide: {
    display: 'block',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 0,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -230,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  primary: {
    color: '#878686',
    fontFamily: 'Roboto',
    fontSize: '18px',
    fontweight: 'normal',
    display: 'flex',
    '&:hover': {
      color: '#0071BC',
      fontWeight: 'bold',
    },
  },
}));
const outherThemefont = createMuiTheme({
  typography: {
    h1: {
      fontFamily: 'Roboto',
      fontSize: 30,
      fontWeight: 400,
      color: '#000000',
      fontStyle: 'normal',
    },
  },
});

function Drawermenu() {
  const classes = useStyles();
  const classesBases1 = useStylesAcordion();
  const classesDiv1 = InputDiv1();
  const classesDiv2 = InputDiv2();
  const classesContainer = Container();

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  //const select = selectStyles();
  const [selectsex, setSelectsex] = React.useState('');
  const handleSelectChange = (event) => {
    setSelectsex(event.target.value);
  };

  const [dados, setDados] = React.useState('');
  const handleDadosChange = (event) => {
    setDados(event.target.value);
  };

  const [image, setImage] = React.useState('');
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const Data = {
      selectedDate,
      selectsex,
      dados,
      image,
    };
    api
      .post('/prontuario', {
        selectedDate,
        selectsex,
        dados,
      })

      .then(() => {
        swal(
          'Deu tudo certo!',
          'Prontuário cadastrado com sucesso!',
          'success',
        );
      })
      .catch((err) => swal('Oops', 'Algo deu errado!', 'error'));

    console.log(Data);
    console.log(image);
  };
  return (
    <ThemeProvider theme={themeGlobal}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="initial"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              edge="start"
              className={clsx(classes.menuButton2, open && classes.hide)}
            >
              <ExitToAppIcon style={{ color: 'black' }} />
            </IconButton>
            {/* <IconButton>
              <ExitToAppIcon style={{ color: 'black' }} />
            </IconButton> */}

            {/* <Typography variant="h6" noWrap>
                Persistent drawer
              </Typography> */}
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <img src={logo}></img>
          <Divider />
          <List>
            {[
              'DASHBOARD',
              'PROFISSIONAIS',
              'PACIENTES',
              'AGENDA',
              'PRONTUÁRIO',
              'AJUDA',
              'SOBRE',
            ].map((text, index) => (
              <ListItem button key={text} divider>
                <ListItemIcon>
                  {/* {index % 2 === 0 ? <DashboardIcon /> : <MailIcon />} */}
                  {index == 0 ? (
                    <DashboardIcon style={{ color: '#6AC4EB' }} />
                  ) : (
                    ''
                  )}
                  {index == 1 ? (
                    <PeopleIcon style={{ color: '#6AC4EB' }} />
                  ) : (
                    ''
                  )}
                  {index == 2 ? (
                    <LocalHospitalIcon style={{ color: '#6AC4EB' }} />
                  ) : (
                    ''
                  )}
                  {index == 3 ? <EventIcon style={{ color: '#6AC4EB' }} /> : ''}
                  {index == 4 ? (
                    <AssignmentIndIcon style={{ color: '#6AC4EB' }} />
                  ) : (
                    ''
                  )}
                  {index == 5 ? <HelpIcon style={{ color: '#6AC4EB' }} /> : ''}
                  {index == 6 ? <MoreIcon style={{ color: '#6AC4EB' }} /> : ''}
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: classes.primary }}
                  primary={text}
                />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <ThemeProvider theme={outherThemefont}>
            <Box mt="30px">
              <Box ml="40px">
                <Box mb="40px">
                  <Typography variant="h1">PRONTUÁRIO</Typography>
                </Box>
              </Box>
            </Box>
          </ThemeProvider>
          <div className={classesBases1.root}>
            <Box mb="15px">
              <Accordion
                style={{ borderRadius: '12px', boxsizing: 'border-box' }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-conten"
                  id="panel1a-header"
                >
                  <Typography className={classesBases1.heading}>
                    Entrada de Saúde
                  </Typography>
                </AccordionSummary>
                <Divider />
                <ThemeProvider theme={ImputFont}>
                  <Box ml="115px">
                    <Box mt="20px">
                      <Typography variant="subtitle1">
                        Insira as informações referente a queixa principal.
                      </Typography>
                    </Box>
                  </Box>
                </ThemeProvider>

                <section className={classesContainer.root}>
                  <form onSubmit={handleSubmit} enctype="multipart/form-data">
                    <div className={classesDiv1.root}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          inputVariant="outlined"
                          margin="normal"
                          id="date-picker-dialog"
                          label=""
                          format="dd/MM/yyyy"
                          value={selectedDate}
                          onChange={handleDateChange}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                      </MuiPickersUtilsProvider>

                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                      >
                        <InputLabel id="demo-simple-select-outlined-label">
                          Sexo
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={selectsex}
                          onChange={handleSelectChange}
                          label="Age"
                        >
                          <MenuItem value="">
                            <em>-</em>
                          </MenuItem>
                          <MenuItem value={'Masculino'}>Masculino</MenuItem>
                          <MenuItem value={'Feminino'}>Feminino</MenuItem>
                        </Select>
                      </FormControl>

                      <CssTextField
                        label="Dados"
                        type="text"
                        value={dados}
                        onChange={handleDadosChange}
                        placeholder="Insira os todos os dados aqui"
                        variant="outlined"
                        id="custom-css-outlined-input"
                      />

                      <TextField
                        variant="outlined"
                        name="image"
                        type="file"
                        //accept="application/image"
                        onChange={handleImageChange}
                      />
                    </div>
                    <Divider />

                    <div className={classesContainer.button}>
                      <Button
                        size="large"
                        variant="contained"
                        type="submit"
                        style={{
                          background: '#2D9CDB',
                          color: 'white',
                          borderRadius: '6px',
                        }}
                        startIcon={<SaveIcon />}
                      >
                        SALVAR
                      </Button>
                    </div>
                  </form>
                </section>
              </Accordion>
            </Box>
            <Box mb="15px">
              <Accordion
                style={{ borderRadius: '12px', boxsizing: 'border-box' }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography className={classesBases1.heading}>
                    Antropometria
                  </Typography>
                </AccordionSummary>
                <Divider />
                <ThemeProvider theme={ImputFont}>
                  <Box ml="115px">
                    <Box mt="20px">
                      <Typography variant="subtitle1">
                        Insira as informações referente a antropometria.
                      </Typography>
                    </Box>
                  </Box>
                </ThemeProvider>
                <section className={classesContainer.root}>
                  <form onSubmit={handleSubmit} enctype="multipart/form-data">
                    <div className={classesDiv1.root}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          inputVariant="outlined"
                          margin="normal"
                          id="date-picker-dialog2"
                          label=""
                          format="dd/MM/yyyy"
                          value={selectedDate}
                          onChange={handleDateChange}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                      </MuiPickersUtilsProvider>

                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          inputVariant="outlined"
                          margin="normal"
                          id="date-birth2"
                          label=""
                          format="dd/MM/yyyy"
                          value={selectedDate}
                          onChange={handleDateChange}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                      </MuiPickersUtilsProvider>

                      <CssTextField
                        label="Sexo de nascimento"
                        type="text"
                        value={dados}
                        onChange={handleDadosChange}
                        variant="outlined"
                        id="custom-css-outlined-input2"
                      />

                      <TextField
                        label="Altura"
                        id="altura"
                        variant="outlined"
                        name="altura"
                        type="text"
                      />

                      <TextField
                        label="Peso"
                        id="peso"
                        variant="outlined"
                        name="peso"
                        type="text"
                      />

                      <TextField
                        label="Memo"
                        id="memo"
                        variant="outlined"
                        name="memo"
                        type="text"
                      />

                      <TextField
                        id="imagem2"
                        variant="outlined"
                        name="imagem2"
                        type="file"
                      />
                    </div>
                    <Divider />

                    <div className={classesContainer.button}>
                      <Button
                        size="large"
                        variant="contained"
                        type="submit"
                        style={{
                          background: '#2D9CDB',
                          color: 'white',
                          borderRadius: '6px',
                        }}
                        startIcon={<SaveIcon />}
                      >
                        SALVAR
                      </Button>
                    </div>
                  </form>
                </section>
              </Accordion>
            </Box>
            <Box mb="15px"></Box>
            <Box mb="15px">
              <Accordion
                style={{ borderRadius: '12px', boxsizing: 'border-box' }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4a-content"
                  id="panel4a-header"
                >
                  <Typography className={classesBases1.heading}>
                    Item
                  </Typography>
                </AccordionSummary>
                <Divider />
                <ThemeProvider theme={ImputFont}>
                  <Box ml="115px">
                    <Box mt="20px">
                      <Typography variant="subtitle1">
                        Insira as informações referente a queixa principal.
                      </Typography>
                    </Box>
                  </Box>
                </ThemeProvider>
                <AccordionDetails>
                  <form noValidate autoComplete="off">
                    <TextField
                      id="outlined-basic"
                      label="Item"
                      variant="outlined"
                      color="pink"
                    />
                    <TextField
                      id="outlined-basic"
                      label="Item"
                      variant="outlined"
                    />
                    <TextField
                      id="outlined-basic"
                      label="item"
                      variant="outlined"
                    />
                    <TextField
                      id="outlined-basic"
                      label="Item"
                      variant="outlined"
                    />
                  </form>
                  <form noValidate autoComplete="off">
                    <TextField
                      id="outlined-basic"
                      label="Item"
                      variant="outlined"
                    />
                    <TextField
                      id="outlined-basic"
                      label="Item"
                      variant="outlined"
                    />
                    <TextField
                      id="outlined-basic"
                      label="Item"
                      variant="outlined"
                    />
                    <TextField
                      id="outlined-basic"
                      label="Item"
                      variant="outlined"
                    />
                  </form>
                </AccordionDetails>
                <Divider />
                <Button
                  size="large"
                  variant="contained"
                  style={{
                    background: '#2D9CDB',
                    color: 'white',
                    borderRadius: '6px',
                  }}
                  startIcon={<SaveIcon />}
                  className={classesBases1.margin}
                >
                  SALVAR
                </Button>
              </Accordion>
            </Box>
            <Box mb="15px">
              <Accordion
                style={{ borderRadius: '12px', boxsizing: 'border-box' }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel5a-content"
                  id="panel5a-header"
                >
                  <Typography className={classesBases1.heading}>
                    Item
                  </Typography>
                </AccordionSummary>
                <Divider />
                <ThemeProvider theme={ImputFont}>
                  <Box ml="115px">
                    <Box mt="20px">
                      <Typography variant="subtitle1">
                        Insira as informações referente a queixa principal.
                      </Typography>
                    </Box>
                  </Box>
                </ThemeProvider>
                <AccordionDetails>
                  <form noValidate autoComplete="off">
                    <TextField
                      id="outlined-basic"
                      label="Item"
                      variant="outlined"
                      color="pink"
                    />
                    <TextField
                      id="outlined-basic"
                      label="Item"
                      variant="outlined"
                    />
                    <TextField
                      id="outlined-basic"
                      label="item"
                      variant="outlined"
                    />
                    <TextField
                      id="outlined-basic"
                      label="Item"
                      variant="outlined"
                    />
                  </form>
                  <form noValidate autoComplete="off">
                    <TextField
                      id="outlined-basic"
                      label="Item"
                      variant="outlined"
                    />
                    <TextField
                      id="outlined-basic"
                      label="Item"
                      variant="outlined"
                    />
                    <TextField
                      id="outlined-basic"
                      label="Item"
                      variant="outlined"
                    />
                    <TextField
                      id="outlined-basic"
                      label="Item"
                      variant="outlined"
                    />
                  </form>
                </AccordionDetails>
                <Divider />
                <Button
                  size="large"
                  variant="contained"
                  style={{
                    background: '#2D9CDB',
                    color: 'white',
                    borderRadius: '6px',
                  }}
                  startIcon={<SaveIcon />}
                  className={classesBases1.margin}
                >
                  SALVAR
                </Button>
              </Accordion>
            </Box>
            <Box mb="15px">
              <Accordion
                style={{ borderRadius: '12px', boxsizing: 'border-box' }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel6a-content"
                  id="panel6a-header"
                >
                  <Typography className={classesBases1.heading}>
                    Item
                  </Typography>
                </AccordionSummary>
                <Divider />
                <ThemeProvider theme={ImputFont}>
                  <Box ml="115px">
                    <Box mt="20px">
                      <Typography variant="subtitle1">
                        Insira as informações referente a queixa principal.
                      </Typography>
                    </Box>
                  </Box>
                </ThemeProvider>
                <AccordionDetails>
                  <form noValidate autoComplete="off">
                    <TextField
                      id="outlined-basic"
                      label="Item"
                      variant="outlined"
                      color="pink"
                    />
                    <TextField
                      id="outlined-basic"
                      label="Item"
                      variant="outlined"
                    />
                    <TextField
                      id="outlined-basic"
                      label="item"
                      variant="outlined"
                    />
                    <TextField
                      id="outlined-basic"
                      label="Item"
                      variant="outlined"
                    />
                  </form>
                  <form noValidate autoComplete="off">
                    <TextField
                      id="outlined-basic"
                      label="Item"
                      variant="outlined"
                    />
                    <TextField
                      id="outlined-basic"
                      label="Item"
                      variant="outlined"
                    />
                    <TextField
                      id="outlined-basic"
                      label="Item"
                      variant="outlined"
                    />
                    <TextField
                      id="outlined-basic"
                      label="Item"
                      variant="outlined"
                    />
                  </form>
                </AccordionDetails>
                <Divider />
                <Button
                  size="large"
                  variant="contained"
                  style={{
                    background: '#2D9CDB',
                    color: 'white',
                    borderRadius: '6px',
                  }}
                  startIcon={<SaveIcon />}
                  className={classesBases1.margin}
                >
                  SALVAR
                </Button>
              </Accordion>
            </Box>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}
export default Drawermenu;
