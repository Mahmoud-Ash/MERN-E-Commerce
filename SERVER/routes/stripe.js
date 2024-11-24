const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/payment", async (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: Math.ceil(req.body.amount),
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      stripeErr
        ? res.status(500).json(stripeErr)
        : res.status(200).json(stripeRes);
    }
  );
});
module.exports = router;
