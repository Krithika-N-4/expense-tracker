import { useState, useEffect } from 'react';
import Header from './components/Header'
import TransactionForm from './components/TransactionForm'
import Balance from './components/Balance'
import Summary from './components/Summary'
import TransactionList from './components/TransactionList'
import { getInitialTransactions } from './utils/LocalStorage'

function App() {

  const [transactions, setTransactions] = useState(getInitialTransactions);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState({ id: null, description: '', amount: '', type: 'expense' });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('expenseTrackerTransactions', JSON.stringify(transactions));
  }, [transactions]);

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const balance = totalIncome - totalExpense;
  const filteredTransactions = transactions.filter(t => t.description.toLowerCase().includes(searchTerm.toLowerCase()));

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTransaction(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!currentTransaction.description || !currentTransaction.amount) {
        alert("Please fill in all fields.");
        return;
    }
    const transactionAmount = parseFloat(currentTransaction.amount);
    if (isNaN(transactionAmount) || transactionAmount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }
    const newTransaction = { ...currentTransaction, amount: transactionAmount };
    if (isEditing) {
      setTransactions(transactions.map(t => (t.id === newTransaction.id ? newTransaction : t)));
    } else {
      setTransactions([...transactions, { ...newTransaction, id: Date.now() }]);
    }
    resetAndHideForm();
  };

  const handleEditClick = (transaction) => {
    setIsEditing(true);
    setCurrentTransaction({ ...transaction });
    setIsFormVisible(true);
  };

  const handleDeleteClick = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const resetAndHideForm = () => {
    setIsFormVisible(false);
    setIsEditing(false);
    setCurrentTransaction({ id: null, description: '', amount: '', type: 'expense' });
  };
  
  const handleShowForm = () => {
    setIsEditing(false);
    setCurrentTransaction({ id: null, description: '', amount: '', type: 'expense' });
    setIsFormVisible(true);
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans text-gray-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        <main className="space-y-8">
          {isFormVisible ? (
            <TransactionForm 
              onFormSubmit={handleFormSubmit}
              onCancel={resetAndHideForm}
              isEditing={isEditing}
              currentTransaction={currentTransaction}
              onInputChange={handleInputChange}
            />
          ) : (
            <Balance balance={balance} onAddClick={handleShowForm} />
          )}
          
          <Summary totalIncome={totalIncome} totalExpense={totalExpense} />
          
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Transactions</h2>
            <input
              type="text"
              placeholder="Search Transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-200 bg-gray-50 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition"
            />
            <TransactionList 
                transactions={filteredTransactions} 
                onEdit={handleEditClick} 
                onDelete={handleDeleteClick} 
            />
          </section>
        </main>
      </div>
    </div>
  );
}

export default App
