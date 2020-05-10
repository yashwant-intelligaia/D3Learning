fetch('http://localhost:3000/expenses')
  .then(response => response.json())
  .then(data => console.log(data));
