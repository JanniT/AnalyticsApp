var express = require('express');
var router = express.Router();
router.use(express.json())

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/analytics', function(req, res, next) {
  res.render('analytics', { title: "Fetch wanted analytical data"})
})

router.post("/analytics", async function(req,res,next) {
  try {
    const url = "https://pxdata.stat.fi:443/PxWeb/api/v1/fi/StatFin/muutl/statfin_muutl_pxt_119z.px"

    const response = await fetch(url, {
      method: "POST",
      headers: { 'Content-Type': 'application/json',},
      body: JSON.stringify(req.body),
    })

    if (!response.ok) {
      console.log("Failed to fetch data")
      res.status(500).json({ error: "Internal server error"})
      return
    }
    const data = await response.json()
    // console.log(data)
    res.json(data)
  } catch (error){
    console.error("Error in analytics endpoint: ", error)
    res.status(500).json({ error: "Internal server error"})
  }
})

module.exports = router;
