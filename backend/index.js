// Imports
const app = require('./server');

//  Define the port
const PORT = process.env.PORT || 3000;


// Run
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`You can access it at: http://localhost:${PORT}`);
})