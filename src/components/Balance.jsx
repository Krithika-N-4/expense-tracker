const Balance = ({ balance, onAddClick }) => (
  <section className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
    <div>
      <h2 className="text-lg text-gray-500 uppercase">Balance</h2>
      <p className={`text-3xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        ${balance.toFixed(2)}
      </p>
    </div>
    <button
      onClick={onAddClick}
      className="bg-gray-800 text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-700 transition-colors duration-300"
    >
      ADD
    </button>
  </section>
)

export default Balance