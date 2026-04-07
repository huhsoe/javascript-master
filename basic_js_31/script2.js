const form = document.getElementById("expenseForm");
const list = document.getElementById("expenseList");

function getExpenses() {
  return JSON.parse(localStorage.getItem("expenses")) || [];
}

function saveExpenses(expenses) {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function renderExpenses() {
  const expenses = getExpenses();
  list.innerHTML = "";

  expenses.forEach((expense, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${expense.description} - ${expense.amount}₽ - ${expense.date}
      <button data-index="${index}">Удалить</button>
    `;

    list.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const expense = {
    description: document.getElementById("description").value,
    amount: document.getElementById("amount").value,
    date: document.getElementById("date").value
  };

  const expenses = getExpenses();
  expenses.push(expense);

  saveExpenses(expenses);
  renderExpenses();
  form.reset();
});

list.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const index = e.target.getAttribute("data-index");

    const expenses = getExpenses();
    expenses.splice(index, 1);

    saveExpenses(expenses);
    renderExpenses();
  }
});

renderExpenses();