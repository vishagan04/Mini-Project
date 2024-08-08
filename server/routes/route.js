
const express = require('express');
const controller = require('../controller/controller');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/api/categories')
  .post(auth, controller.create_Categories)
  .get(auth, controller.get_Categories);

router.route('/api/transaction')
  .post(auth, controller.create_Transaction)
  .get(auth, controller.get_Transaction)
  .delete(auth, controller.delete_Transaction);

router.route('/api/labels')
  .get(auth, controller.get_Labels);

module.exports = router;