import { toast, Toaster } from "sonner";
import { useRef, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

const CreateExpense = () => {
    const [formData, setFormData] = useState({
        description: "",
        amount: "",
        category: ""
    });

    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const changeCategoryHandler = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            category: e.target.value
        }));
    };

    const dialogRef = useRef(null);

    // Open Dialog
    const openDialog = () => {
        dialogRef.current.showModal();
    };

    // Close Dialog
    const closeDialog = () => {
        dialogRef.current.close();
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        // Convert amount to a number
        const formattedData = {
            ...formData,
            amount: Number(formData.amount)
        };

        console.log("Submitting Data:", formattedData);

        try {
            setLoading(true);
            const res = await axios.post("http://localhost:8000/api/v1/expense/add", formattedData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message || "Expense added successfully");
                setFormData({ description: "", amount: "", category: "" }); // Reset form
                setIsOpen(false);
                closeDialog(); // Close modal
            }
        } catch (err) {
            console.error("Error Response:", err.response?.data || err.message);
            toast.error(err.response?.data?.message || "Failed to add expense");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Toaster />
            {/* Open Button */}
            <button
                onClick={openDialog}
                className="px-4 py-2 bg-violet-500 text-white rounded-full hover:bg-violet-600"
            >
                Add New Expense
            </button>

            {/* Dialog (Modal) */}
            <dialog ref={dialogRef} open={isOpen} onChange={setIsOpen} className="p-6 border border-gray-300 rounded-lg shadow-lg w-96">
                <h2 className="text-lg font-semibold mb-4">Add New Expense</h2>

                {/* Expense Form */}
                <form method="dialog" className="space-y-4" onSubmit={submitHandler}>
                    {/* Expense Name */}
                    <div className="flex flex-col">
                        <label htmlFor="description" className="text-gray-700 font-medium">Description:</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter expense description"
                            value={formData.description}
                            onChange={changeEventHandler}
                            required
                        />
                    </div>

                    {/* Expense Amount */}
                    <div className="flex flex-col">
                        <label htmlFor="amount" className="text-gray-700 font-medium">Amount (₹):</label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter amount"
                            value={formData.amount}
                            onChange={changeEventHandler}
                            required
                        />
                    </div>

                    {/* Expense Category (Dropdown) */}
                    <div className="flex flex-col">
                        <label htmlFor="category" className="text-gray-700 font-medium">Category:</label>
                        <select
                            id="category"
                            name="category"
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                            onChange={changeCategoryHandler}
                            value={formData.category}
                            required
                        >
                            <option value="">Select a Category</option>
                            <option value="rent">Rent</option>
                            <option value="food">Food</option>
                            <option value="salary">Salary</option>
                            <option value="shopping">Shopping</option>
                            <option value="others">Others</option>
                        </select>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-2 mt-4">
                        <button
                            type="button"
                            onClick={closeDialog}
                            className="px-4 py-2 border border-gray-400 text-gray-700 rounded-full hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                        {loading ? (
                            <button className="w-full my-4 flex items-center justify-center">
                                <Loader2 className="mr-2 h-4 animate-spin" />
                                Please wait
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600"
                            >
                                Save Expense
                            </button>
                        )}
                    </div>
                </form>
            </dialog>
        </div>
    );
};

export default CreateExpense;
