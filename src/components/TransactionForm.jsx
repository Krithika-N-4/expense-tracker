const TransactionForm = ({ onFormSubmit, onCancel, isEditing, currentTransaction, onInputChange }) => (
  <section className="bg-white p-6 rounded-lg shadow-md animate-fade-in-down">
    <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{isEditing ? 'Edit Transaction' : 'Add New Transaction'}</h2>
        <button
          onClick={onCancel}
          className="bg-black text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-800 transition-colors duration-300"
        >
          CANCEL
        </button>
    </div>
    <form onSubmit={onFormSubmit} className="space-y-4">
      <input
        type="number"
        name="amount"
        value={currentTransaction.amount}
        onChange={onInputChange}
        placeholder="Amount"
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition"
        required
        step="0.01"
      />
      <input
        type="text"
        name="description"
        value={currentTransaction.description}
        onChange={onInputChange}
        placeholder="Description"
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition"
        required
      />
      <div className="flex items-center space-x-6">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="type"
            value="expense"
            checked={currentTransaction.type === 'expense'}
            onChange={onInputChange}
            className="form-radio h-5 w-5 text-red-600"
          />
          <span className="text-lg">Expense</span>
        </label>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="type"
            value="income"
            checked={currentTransaction.type === 'income'}
            onChange={onInputChange}
            className="form-radio h-5 w-5 text-green-600"
          />
          <span className="text-lg">Income</span>
        </label>
      </div>
      <button
        type="submit"
        className="w-full bg-gray-800 text-white font-bold py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300"
      >
        {isEditing ? 'Update Transaction' : 'Add Transaction'}
      </button>
    </form>
  </section>
)

export default TransactionForm
