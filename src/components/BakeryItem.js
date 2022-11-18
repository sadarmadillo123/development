import * as React from "react";
import Grid from "@mui/material/Grid"; // Grid version 1
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { CardMedia } from "@mui/material";

export default function BakeryItem(props) {
  const card = (
    <CardContent
      className="store-item"
      sx={{ display: "flex", justifyContent: "space-between" }}
    >
      <div className="left-box">
        <div>
          <Typography variant="h5" component="div">
            {props.item.name}
          </Typography>
          <Typography sx={{ fontSize: 16 }} color="text.secondary">
            ${props.item.price} <i>Calories:</i> {props.item.calories}
          </Typography>

          <Typography sx={{ fontSize: 16 }} color="text.secondary">
            <i>Type:</i> {props.item.type}
          </Typography>

          <Typography sx={{ fontSize: 16 }} color="text.secondary">
            <i>Dietary Restriction:</i> {props.item.diet.join(", ")}
          </Typography>
          <Typography variant="body1">{props.item.description}</Typography>
        </div>
        <div>
          <CardActions>
            <Button
              size="medium"
              variant="outlined"
              startIcon={<RemoveShoppingCartIcon />}
              onClick={() => {
                props.removeFromCart(props.item);
              }}
            >
              Remove Item
            </Button>
            <Button
              size="medium"
              variant="contained"
              startIcon={<AddShoppingCartIcon />}
              onClick={() => {
                props.addToCart(props.item);
              }}
            >
              Add Item
            </Button>
          </CardActions>
        </div>
      </div>
      <CardMedia>
        <img className="img" src={props.item.image} />
      </CardMedia>
    </CardContent>
  );

  return (
    <Grid item xs={12} lg={6}>
      <Card variant="outlined" sx={{ borderRadius: "6px" }}>
        {card}
      </Card>
    </Grid>
  );
}
