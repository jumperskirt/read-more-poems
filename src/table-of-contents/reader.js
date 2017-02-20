var read = function(poem) {

  // Base case
  if (!poem.connections.length) {
    // Your code here
    console.log(poem.text);
    return Promise.resolve() // Don't worry about this, we will look more into Promise later on
  }

  // Recursive case
  return inquirer.prompt([{
    type: 'list',
    name: 'poem',
    message: poem.text,
    choices: poem.connections
  }])
  .then(function(answer) {
    return read(answer.poem)
  });
}

read(table.startingPoint)
.then(function() {
  console.log('and so it goes...') // This will run after the Promise.resolve() method is called
})
