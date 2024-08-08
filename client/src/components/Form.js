import React from 'react';
import { useForm } from 'react-hook-form';
import List from './List';
import { default as api } from '../store/apiSlice';

export default function Form() {
    const { register, handleSubmit, resetField, formState: { errors } } = useForm();
    const [addTransaction] = api.useAddTransactionMutation();

    const onSubmit = async (data) => {
        if (!data) return;
        await addTransaction(data).unwrap();
        resetField('name');
        resetField('type');
        resetField('amount');
    };

    return (
        <div className="form max-w-sm mx-auto w-96">
            <h1 className='font-bold pb-4 text-xl'>Transaction</h1>

            <form id='form' onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="input-group">
                    <input
                        type="text"
                        {...register('name', { required: 'Name is required' })}
                        placeholder='Salary, House Rent, SIP'
                        className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>
                
                <div className="input-group">
                    <select
                        {...register('type', { required: 'Type is required' })}
                        className={`form-input ${errors.type ? 'border-red-500' : ''}`}
                    >
                        <option value="" disabled>Select type</option>
                        <option value="Investment">Investment</option>
                        <option value="Expense">Expense</option>
                        <option value="Saving">Savings</option>
                    </select>
                    {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
                </div>

                <div className="input-group">
                    <input
                        type="text"
                        {...register('amount', { required: 'Amount is required', pattern: { value: /^[0-9]+$/, message: 'Amount must be a number' } })}
                        placeholder='Amount'
                        className={`form-input ${errors.amount ? 'border-red-500' : ''}`}
                    />
                    {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
                </div>

                <div className="submit-btn">
                    <button type="submit" className='border py-2 text-white bg-indigo-500 w-full'>
                        Make Transaction
                    </button>
                </div>
            </form>

            <List />
        </div>
    );
}
