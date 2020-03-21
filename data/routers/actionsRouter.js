const router = require("express").Router();

const Actions = require("../helpers/actionModel");

//CRUD ops
router.get("/", (req, res) => {
  Actions.get()
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Error retrieving actions" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Actions.remove(id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Error deleting action" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const updateAction = req.body;
  Actions.update(id, updateAction)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Error updating action" });
    });
});


module.exports = router;