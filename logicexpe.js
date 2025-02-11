// Initialize expenses array from localStorage or empty array
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// DOM Elements
const expenseForm = document.getElementById('expense-form');
const expenseTable = document.getElementById('expense-table').getElementsByTagName('tbody')[0];
const totalAmount = document.getElementById('total-amount');

// Function to add expense
function addExpense(amount, category, date) {
  const expense = {
    id: new Date().getTime(),
    amount: parseFloat(amount),
    category,
    date,
  };

  expenses.push(expense);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  renderExpenses();
  calculateTotal();
}

// Function to render expenses
function renderExpenses() {
  expenseTable.innerHTML = '';
  expenses.forEach((expense) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>₹${expense.amount.toFixed(2)}</td>
      <td>${expense.category}</td>
      <td>${expense.date}</td>
      <td><button onclick="deleteExpense(${expense.id})">Delete</button></td>
    `;

    expenseTable.appendChild(row);
  });
}

// Function to delete expense
function deleteExpense(id) {
  expenses = expenses.filter((expense) => expense.id !== id);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  renderExpenses();
  calculateTotal();
}

// Function to calculate total expenses
function calculateTotal() {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  totalAmount.textContent = `Total: ₹ ${total.toFixed(2)}`;
}

// Event listener for form submission
expenseForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const amount = document.getElementById('amount').value;
  const category = document.getElementById('category').value;
  const date = document.getElementById('date').value;

  if (amount && category && date) {
    addExpense(amount, category, date);
    expenseForm.reset();
  } else {
    alert('Please fill in all fields.');
  }
});

// Initial render
renderExpenses();
calculateTotal();