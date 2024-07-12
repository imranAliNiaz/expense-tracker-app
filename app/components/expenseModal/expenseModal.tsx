import { expenseType } from "@/app/types/commonTypes";
import { ExpenseModalType } from "@/app/types/componentTypes";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function ExpenseModal({
  isOpen,
  onClose,
  onAddExpense,
  expense,
  onUpdateExpense,
}: ExpenseModalType) {
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const categories = [
    "Groceries",
    "Rent",
    "Utilities",
    "Entertainment",
    "Online Purchases",
    "Other",
  ];
  const Statuses = ["Paid", "Unpaid", "Pending", "Cancelled", "Overdue"];

  const handleAddExpense = () => {
    const newExpense: expenseType = {
      id: `${Date.now()}`,
      amount: amount,
      category,
      note,
      status,
      date,
    };
    onAddExpense(newExpense), setAmount(0);
    setCategory("");
    setCategory("");
    setNote("");
    setStatus(""), setDate("");
    onClose();
  };

  const handleUpdateExpense = () => {
    const updateExpense: expenseType = {
      id: expense.id,
      amount: amount || expense.amount,
      category: category || expense.category,
      note: note || expense.note,
      status: status || expense.status,
      date: date || expense.date,
    };
    onUpdateExpense(updateExpense);
    setAmount(0),
      setCategory(""),
      setNote(""),
      setDate(""),
      setStatus(""),
      onClose();
  };

  return (
    <div className={`modal ${isOpen ? "block" : "hidden"}`}>
      <div className="modal-overlay absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-80">
        <div className="modal-container bg-white w-96 mx-auto mt-20 p-6 rounded shadow-lg">
          <div className="mb-4">
            <div className="flex justify-between">
              <h3 className="text-2xl font-semibold mb-2">Add Expense</h3>
              <button onClick={onClose}>
                <FaTimes className="text-3xl text-red-500 hover:text-gray-700 cursor-pointer" />
              </button>
            </div>

            <label
              className="block text-gray-600 text-sm mb-2"
              htmlFor="amount"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount || expense.amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              className="w-full border p-2 mb-2"
            />

            <label
              className="block text-gray-600 text-sm mb-2"
              htmlFor="category"
            >
              Category
            </label>

            <select
              id="category"
              value={category || expense.category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border p-2 mb-2"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <label className="block text-gray-600 text-sm mb-2" htmlFor="note">
              Note
            </label>
            <textarea
              id="note"
              rows={2}
              value={note || expense.note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full border p-2 mb-2"
            />
            <label
              className="block text-gray-600 text-sm mb-2"
              htmlFor="Status"
            >
              Status
            </label>
            <select
              id="status"
              value={status || expense.status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border p-2 mb-2"
            >
              <option value="" disabled>
                Select Status
              </option>
              {Statuses.map((sat) => (
                <option key={sat} value={sat}>
                  {sat}
                </option>
              ))}
            </select>

            <label className="block text-gray-600 text-sm mb-2" htmlFor="date">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date || expense.date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border p-2 mb-4"
            />
          </div>

          <div className="flex justify-end">
            {expense.id !== "" ? (
              <button
                onClick={handleUpdateExpense}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                update Expense
              </button>
            ) : (
              <button
                onClick={handleAddExpense}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add Expense
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
