"use client";

import { expenseType } from "@/app/types/commonTypes";
import { useState } from "react";
import ExpenseModal from "../expenseModal/expenseModal";
import { BiCommentEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { MdAddChart } from "react-icons/md";
import ExpenseChart from "../expenseChart/expenseChart";

export default function ExpenseList() {
  //Expense List
  const [expenses, setExpenses] = useState<expenseType[]>([]);
  //Expense Modal initialization to false initialy  
  const [isOpen , setIsOpen] = useState(false);
  //single Expense
  const [expense , setExpense] = useState<expenseType>({
    id: '',
    amount: 0,
    category: '',
    note: '',
    status : '',
    date: '' });
    const [total , setTotal] = useState<number>(0);

    // data for graph making
    const [data, setData] = useState([{
      date:'',
      amount : 0,
    
    }]);


 // Intial Add Expnese Button when there is no data
  const onAddExpense = (expense : expenseType) =>{
    setExpenses([...expenses, expense]);
    setTotal(total + expense.amount);
    data.push(expense);
    setData(data);
  }
  //ON close Function which reset all values to 0
  const onClose = () => {
    setIsOpen(false);
    setExpense({
      id: '',
      amount: 0,
      category: '',
      note: '',
      status : '',
      date: ''
    })
  }
  // Delete Expense Handler
  const onDeleteHandler = (expense : expenseType) =>{
    const filteredExpense : expenseType[] = expenses.filter((e) => e.id !== expense.id)
    setExpenses(filteredExpense);
    setTotal(total - expense.amount);
    setData(data);

  }
  // Edit Expense Handler 
  const  onEditHandler =(expense : expenseType) =>{
  setExpense(expense);
  setIsOpen(true);
  setData(data);

  }
 // Edit Expense and set the clicked expense to to 0
  const onUpdateExpense = (expenseRecord : expenseType) =>{
    setExpenses(expenses.map((e) => (e.id === expenseRecord.id ? expenseRecord : e)));
    setTotal(total - expense.amount + expenseRecord.amount);
    setExpense({
      id: '',
      amount: 0,
      category: '',
      note: '',
      status : '',
      date: ''
    })
    setData(data);

  }
// Main Component
  return (
    <div className="m-8">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-4">Expense List</h2>
        <button className="flex justify-center items-center mb-2 bg-green-500 rounded p-1" onClick={() => setIsOpen(true)}><MdAddChart />
          Add Expense
        </button>
        {/* Expense Modal Component Call */}
        <ExpenseModal isOpen={isOpen} onClose={onClose} onAddExpense={onAddExpense} expense={expense} onUpdateExpense = {onUpdateExpense}/>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Amount</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Note</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
          expenses.length > 0 ?
          expenses.map((expense) => (
            <tr key={expense.id} className="hover:bg-gray-50 text-center">
              <td className="py-2 px-4 border-b">{expense.id}</td>
              <td className="py-2 px-4 border-b">PKR{expense.amount}</td>
              <td className="py-2 px-4 border-b">{expense.category}</td>
              <td className="py-2 px-4 border-b">{expense.note}</td>
              <td className="py-2 px-4 border-b">{expense.status}</td>
              <td className="py-2 px-4 border-b">
                {new Date(expense.date).toLocaleDateString()}
              </td>

              <td  className="flex justify-center py-2 px-4 border-b">
                <button className="flex mr-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => onEditHandler(expense)}><BiCommentEdit className="mt-1"/>Edit</button>
                <button onClick={() => onDeleteHandler(expense)} className="flex mr-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"><MdDeleteForever className="mt-1"/>Delete</button>
              </td>
            </tr>
          )) 
          : <tr>
          <td colSpan={6} className="text-center text text-red-600 font-bold">No Expense Found!</td>
        </tr>
        }
        </tbody>
      </table>
      <div className="flex justify-end">
        <p className="mb-4 , text-2xl , font-semibold">Total:PKR{total.toFixed(2)}</p>

      </div>
      <div className={`modal ${isOpen ? 'hidden' : 'block'}`}>
        {/* Expense Chart Component */}
      <ExpenseChart expense={data}/>
      </div>
    </div>
  );
}
