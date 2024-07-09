const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));

// Define a route to handle form submission
app.post('/submit', (req, res) => {
  // Extract form data
  const name = req.body.name;
  const email = req.body.email;

  // Server-side validation (basic example)
  let errors = [];
  if (name.length === 0) {
    errors.push("Name is required");
  }
  if (!email.includes('@')) {
    errors.push("Invalid email format");
  }

  // If there are errors, send them back to the client
  if (errors.length > 0) {
    res.render('form', { errors: errors, name: name, email: email });
    return;
  }

  // Simulate temporary storage (replace with database or other solution)
  console.log(`Storing data: Name: ${name}, Email: ${email}`);

  // Send success message to the client
  res.send('Form submitted successfully!');
});

// Define a route to serve the form
app.get('/', (req, res) => {
  res.render('form', { errors: [], name: '', email: '' });
});

// Set templating engine (e.g., EJS)
app.set('view engine', 'ejs');

// Set views directory
app.set('views', './views');

app.listen(port, () => console.log(`Server listening on port ${port}`));
