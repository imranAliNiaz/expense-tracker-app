import { expenseType } from "./commonTypes"

export type ExpenseModalType = {
    isOpen : boolean,
    onClose : ()=> void,
    expense : expenseType
    onAddExpense : (expense : expenseType) => void
    onUpdateExpense : (expense : expenseType) =>void
}

export type expenseChart = {
    expense : expenseType
}