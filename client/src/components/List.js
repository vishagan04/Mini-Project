// import React from 'react'
// import 'boxicons';
// import {default as api} from '../store/apiSlice';

// export default function List() {
//     const { data, isFetching , isSuccess, isError } = api.useGetLabelsQuery()
//     const [deleteTransaction] = api.useDeleteTransactionMutation()
//     let Transactions;

//     console.log(data)
//     const handlerClick = (e) => {
//         if(!e.target.dataset.id) return 0;
//         deleteTransaction({ _id : e.target.dataset.id })
//     }

//     if(isFetching){
//         Transactions = <div>Fetching</div>;
//     }else if(isSuccess){
//         Transactions = data.map((v, i) => <Transaction key={i} category={v} handler={handlerClick} ></Transaction>);
//     }else if(isError){
//         Transactions = <div>Error</div>
//     }


//   return (
//     <div className="flex flex-col py-6 gap-3">
//         <h1 className='py-4 font-bold text-xl'>History</h1>
//         {Transactions}
//     </div>
//   )
// }

// function Transaction({ category, handler }){
//     if(!category) return null;
//     return (
//         <div className="item flex justify-center bg-gray-50 py-2 rounded-r" style={{ borderRight : `8px solid ${category.color ??  "#e5e5e5"}`}}>
//             <button className='px-3' onClick={handler}><box-icon data-id={category._id ?? ''}  color={category.color ??  "#e5e5e5"} size="15px" name="trash" ></box-icon></button>            
//             <span className='block w-full'>{category.name ?? ''}</span>
//         </div>
//     )
// }


import React from 'react';
import 'boxicons';
import { default as api } from '../store/apiSlice';

export default function List() {
    const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();
    const [deleteTransaction] = api.useDeleteTransactionMutation();
    let Transactions;

    const handlerClick = (e) => {
        if (!e.target.dataset.id) return;
        deleteTransaction({ _id: e.target.dataset.id });
    };

    if (isFetching) {
        Transactions = <div>Fetching</div>;
    } else if (isSuccess) {
        Transactions = data.map((v, i) => (
            <Transaction key={i} category={v} handler={handlerClick} />
        ));
    } else if (isError) {
        Transactions = <div>Error</div>;
    }

    return (
        <div className="flex flex-col py-6 gap-3">
            <h1 className='py-4 font-bold text-xl'>History</h1>
            {Transactions}
        </div>
    );
}

function Transaction({ category, handler }) {
    if (!category) return null;

    return (
        <div className="relative flex items-center bg-gray-50 py-2 rounded-r transition-transform hover:scale-105 hover:bg-gray-100 shadow-md" style={{ borderRight: `8px solid ${category.color ?? "#e5e5e5"}` }}>
            <button
                className='px-3 text-gray-600 hover:text-red-600'
                onClick={handler}
            >
                <box-icon data-id={category._id ?? ''} color={category.color ?? "#e5e5e5"} size="15px" name="trash" />
            </button>
            <div className="w-full flex items-center justify-between">
                <span className='block'>{category.name ?? ''}</span>
                <div className="relative group">
                    <span className='block'>{category.amount ? `₹${category.amount}` : '₹0'}</span>
                    <div className="absolute left-full top-1/2 transform -translate-x-2 -translate-y-1/2 bg-white border border-gray-200 rounded-md p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className='text-sm font-semibold text-gray-700'>{category.name ?? ''}</p>
                        <p className='text-xs text-gray-500'>Amount: ₹{category.amount ?? '0'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
