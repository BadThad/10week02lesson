import express from "express";

const app = express();

const PORT = 3000;

// Checks if user is a member at the club. (Set to false to simulate if user is not a member.)
app.use((req, res, next) => {
  const userAuthenticated = true;
  if (!userAuthenticated) {
    return res.status(403).send("You are not yet a member at this club.");
  }
  next();
});

// Logs the time and date the reservation was made.
app.use((req, res, next) => {
  console.log(
    `Reservation has been made at ${new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}, ${new Date().toLocaleDateString()}.`
  );
  next();
});

// Returns a message to say that the table is not available. (Set to false to simulate that table is unavailable.)
app.use((req, res, next) => {
  const tableAvailable = true;
  if (!tableAvailable) {
    return res
      .status(400)
      .send(`Sorry, but that table is not available at this time.`);
  }
  next();
});

// Returns a message to confirm the reservation.
app.get(`/booking`, (req, res) => {
  res.send(`Your selected table has been reserved.`);
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});


// Router

const router = express.Router();

router.use((req, res, next) => {
    console.log("Router-level middleware for /reservation")
    next();
});

// An extension which would allow a user to check on and to edit their reservation.

router.get("/reservation", (req, res) => {
    res.send("Here is your reservation.");
});

app.use("/api", router);