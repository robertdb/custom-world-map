import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345
    },
    media: {
      height: 0,
      paddingTop: "56.25%" // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: "rotate(180deg)"
    },
    avatar: {
      backgroundColor: "#3f51b5"
    }
  })
);

const CountryCard = ({
  info,
  total_cases,
  total_recovered,
  total_unresolved,
  total_deaths,
  total_new_cases_today,
  total_new_deaths_today,
  total_active_cases,
  total_serious_cases
}) => {
  const { title, code, source } = info;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {code}
          </Avatar>
        }
        title={title}
      />
      <CardContent>
        <List className={classes.root}>
          <Typography variant="h6">{`Casos totales: ${total_cases}`}</Typography>
          <Typography variant="h6">{`Nuevos casos hoy: ${total_new_cases_today}`}</Typography>
          <Typography variant="h6">{`Nuevos muertos hoy: ${total_new_deaths_today}`}</Typography>
          <Typography variant="h6">{`Muertos: ${total_deaths}`}</Typography>
          <Typography variant="h6">{`Activos: ${total_active_cases}`}</Typography>
          <Typography variant="h6">{`Recuperados: ${total_recovered}`}</Typography>
          <Typography variant="h6">{`En estado serio: ${total_serious_cases}`}</Typography>
          <Typography variant="h6">{`Sin resolver: ${total_unresolved}`}</Typography>
        </List>
      </CardContent>
      <CardActions>
        <Link href="#" onClick={() => window.open(source)} variant="body2">
          Más info
        </Link>
      </CardActions>
    </Card>
  );
};

export default CountryCard;
