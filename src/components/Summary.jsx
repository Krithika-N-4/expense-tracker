const Summary = ({ totalIncome, totalExpense }) => (
  <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <h3 className="text-lg uppercase text-gray-500">Income</h3>
      <p className="text-2xl font-bold text-green-600">${totalIncome.toFixed(2)}</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <h3 className="text-lg uppercase text-gray-500">Expense</h3>
      <p className="text-2xl font-bold text-red-600">${totalExpense.toFixed(2)}</p>
    </div>
  </section>
)

export default Summary