/** Test Translate Page */
router.get('/test-translate', (req, res) => {
  // http://localhost:3333/test-translate?name=John&items=5
  const userName = req.query.name || 'Guest'; // Get the user's name from query parameters, default to 'Guest'
  const cartItemCount = parseInt(req.query.items, 10) || 0; // Get item count from query parameters, default to 0

  res.status(200).render('test-translate', {
    user: res.locals.user,
    title: req.t('title'),
    message: req.t('message'),
    welcomeMessage: req.t('welcome_user', { name: userName }), // Interpolate user's name
    cartMessage: req.t('cart_items', { count: cartItemCount }), // Display singular/plural based on count
  });
});
