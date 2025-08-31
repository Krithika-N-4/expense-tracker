import { EditIcon, DeleteIcon } from "../icons/Icons"

const TransactionList = ({ transactions, onEdit, onDelete }) => (
    <ul className="space-y-3">
        {transactions.length > 0 ? (
        transactions.map(transaction => (
            <li
            key={transaction.id}
            className={`flex justify-between items-center p-4 rounded-lg border-r-8 ${transaction.type === 'income' ? 'border-green-500' : 'border-red-500'} bg-gray-50`}
            >
            <span className="flex-1 font-medium capitalize">{transaction.description}</span>
            <div className="flex items-center space-x-4">
                <span className="font-bold text-lg">
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </span>
                <div onClick={() => onEdit(transaction)}>
                    <EditIcon />
                </div>
                <div onClick={() => onDelete(transaction.id)}>
                    <DeleteIcon />
                </div>
            </div>
            </li>
        ))
        ) : (
        <p className="text-center text-gray-500 py-4">No transactions found.</p>
        )}
    </ul>
)

export default TransactionList
