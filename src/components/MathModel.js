import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
  root: {
    width: "50%",
    [theme.breakpoints.down("xs")]: {
      width: "90%"
    }
  },
  margin: {
    height: theme.spacing(3)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const MathModel = ({ timeline }) => {
  const factorList = timeline.map((item, index) => {
    const { name, infectados } = item;
    if (index === 0) {
      return {
        factor: 0,
        factorLabel: name
      };
    }
    return {
      factor: infectados / timeline[index - 1].infectados,
      factorLabel: name
    };
  });
  factorList.splice(0, 3); // remove factor without information;

  const todayInfected = timeline[timeline.length - 1].infectados;
  const initialFactor = factorList[factorList.length - 1].factor;

  const [factorPrediction, setFactorPrediction] = useState(initialFactor);

  const [day, setDay] = useState(1);

  const classes = useStyles();

  const handleFactorChange = event => {
    setFactorPrediction(event.target.value);
  };

  const getDay = day => {
    setDay(day);
  };

  const getPrediction = (infected, factor, day) => {
    if (day === 0) {
      return infected;
    }
    let currentInfected = infected;

    for (let i = 1; i <= day; i++) {
      currentInfected = currentInfected * factor;
    }

    return currentInfected;
  };

  const getOptionsList = () => {
    const options = factorList.map((item, index) => {
      const { factor, factorLabel } = item;
      return (
        <MenuItem key={factorLabel} value={factor}>
          {`${factorLabel}: `}
          <strong> {factor}</strong>
        </MenuItem>
      );
    });
    let total = 0;
    for (let index = 0; index < factorList.length; index++) {
      total = total + factorList[index].factor;
    }
    const average = total / factorList.length;

    options.push(
      <MenuItem key="promedio" value={average}>
        promedio
        <strong> {average}</strong>
      </MenuItem>
    );
    return options;
  };

  console.log("factores", factorList);
  return (
    <div className={classes.root}>
      <Typography
        id="discrete-slider-always"
        gutterBottom
        style={{ marginBottom: 30 }}
      >
        Modelo matemático que predice{" "}
        <strong>nuevos infectados en Argentina:</strong>
      </Typography>
      <Slider
        defaultValue={0}
        getAriaValueText={getDay}
        aria-labelledby="discrete-slider-small-steps"
        step={1}
        marks={[
          { value: 0, label: "Hoy" },
          { value: 7, label: "Día 7" }
        ]}
        min={0}
        max={7}
        valueLabelDisplay="on"
      />
      <Typography gutterBottom>Predicción de infectados:</Typography>
      <Typography gutterBottom variant="h6">
        <strong>{getPrediction(todayInfected, factorPrediction, day)}</strong>
      </Typography>
      <Box>
        <Typography id="discrete-slider-always" gutterBottom>
          Modelo:
        </Typography>
      </Box>
      <Box>
        <Typography variant="caption" display="block" gutterBottom>
          VI = <strong>Variación de infectados</strong>
        </Typography>
      </Box>
      <Box>
        <Typography variant="caption" display="block" gutterBottom>
          E = <strong>Nivel de exposición</strong>
        </Typography>
      </Box>
      <Box>
        <Typography variant="caption" display="block" gutterBottom>
          P = <strong>Probabilidad de contagio</strong>
        </Typography>
      </Box>
      <Box>
        <Typography variant="caption" display="block" gutterBottom>
          I = <strong>Infectados</strong>
        </Typography>
      </Box>
      <Box>
        <Typography
          variant="caption"
          display="block"
          gutterBottom
        >{` VI = E x P x I`}</Typography>
      </Box>
      <Box>
        <Typography
          variant="caption"
          display="block"
          gutterBottom
        >{`si  VI = (I + 1) - I = E x P x I`}</Typography>
      </Box>
      <Box>
        <Typography
          variant="caption"
          display="block"
          gutterBottom
        >{`=>  (I + 1) - I = E x P x I`}</Typography>
      </Box>
      <Box>
        <Typography
          variant="caption"
          display="block"
          gutterBottom
        >{`=>  (I + 1) = (E x P x I) + I`}</Typography>
      </Box>
      <Box>
        <Typography
          variant="caption"
          display="block"
          gutterBottom
        >{`=>  (I + 1) = I (E x P + 1)`}</Typography>
      </Box>
      <Box>
        <Typography
          variant="caption"
          display="block"
          gutterBottom
        >{`=>  (E x P + 1) = (I + 1) / I`}</Typography>
      </Box>
      <Box>
        <Typography
          variant="caption"
          display="block"
          gutterBottom
        >{`=>  FACTOR = (I + 1) / I`}</Typography>
      </Box>
      <Box>
        <Typography
          variant="caption"
          display="block"
          gutterBottom
        >{`Llegamos a la variable que estamos buscando:`}</Typography>
      </Box>
      <Box>
        <Typography
          variant="caption"
          display="block"
          gutterBottom
        >{`FACTOR = (E x P + 1) = (I + 1) / I`}</Typography>
      </Box>
      <Box>
        <Typography
          variant="caption"
          display="block"
          gutterBottom
        >{`Este FACTOR nos permite generar una predicción de cuantos infectados va haber mañana, y así sucesivamente.`}</Typography>
      </Box>
      <Box>
        <Typography
          variant="caption"
          display="block"
          gutterBottom
        >{`El cálculo queda:`}</Typography>
      </Box>
      <Box>
        <Typography variant="caption" display="block" gutterBottom>
          <strong>{`Predicción de infectados = Infectados * FACTOR`}</strong>
        </Typography>
      </Box>
      <Box>
        <Typography variant="body2" display="block" gutterBottom>
          Como veran este <strong>{`FACTOR`}</strong> depende exclusivamente de
          E(<strong>{`NIVEL DE EXPOSICIÓN`}</strong>) y P(
          <strong>{`PROBABILIDAD DE CONTAGIO`}</strong>), si{" "}
          <strong>{`nos quedamos en casa`} </strong>este{" "}
          <strong>{`FACTOR`}</strong> no va crecer, es muy importante no subir
          este número. Si tenemos{" "}
          <strong>{`NIVEL DE EXPOSICIÓN 0 el factor se mantiene en 1 por ende no hay nuevos infectados.`}</strong>
        </Typography>
      </Box>
      <Box>
        <Typography variant="body2" display="block" gutterBottom>
          <strong>{`Para esta predicción estamos tomando el FACTOR de HOY pero a continuación te dejo las opciones de factores de cada fecha que fue avanzado el corona virus en Argentina:`}</strong>
        </Typography>
      </Box>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Factor</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={factorPrediction}
          onChange={handleFactorChange}
          label="Factor"
        >
          {getOptionsList()}
        </Select>
      </FormControl>
      <Box>
        <Typography variant="body2" display="block" gutterBottom>
          <strong>{`Este modelo analiza el crecimiento de infectados en Argentina, no se toma en cuenta recuperados, muertes o otro tipo de variable. Simplemente vemos como va creciendo el número de infectados día por día y detectando esa variación.`}</strong>
        </Typography>
      </Box>
    </div>
  );
};

export default MathModel;
