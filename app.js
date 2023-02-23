document.getElementById('expForm').addEventListener('submit', addExpense);

// initial array of expenses, reading from localStorage
const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function addExpense(e){
    e.preventDefault();

    let name = document.getElementById('name').value;
    let amount = document.getElementById('amount').value;

    if( name.length > 0 
        && amount > 0){
        const expense = {
            name, 
            amount, 
            id: expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1,
        }

        expenses.push(expense);
        // localStorage 
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    document.getElementById('expForm').reset();
    showExpenses();
}

const showExpenses = () => {
    const expenseTable = document.getElementById('expenseTable');
    expenseTable.innerHTML = '';
    for(let i = 0; i < expenses.length; i++){
        expenseTable.innerHTML += `
           <li> ${expenses[i].amount}  &nbsp   ${expenses[i].name} &nbsp &nbsp
           <button class="deleteButton" onclick="deleteExpense(${expenses[i].id})">Delete Product</button></li>` ;
                    
    }
}

const deleteExpense = (id) => {
    for(let i = 0; i < expenses.length; i++){
        if(expenses[i].id == id){
            expenses.splice(i, 1);
        }
    }

    // localStorage
    localStorage.setItem('expenses', JSON.stringify(expenses));
    showExpenses();
}

showExpenses();