import React from 'react'
import {default as api} from '../store/apiSlice';
import { getLabels } from '../helper/helper';

export default function Labels() {

   const { data, isFetching , isSuccess, isError } = api.useGetLabelsQuery()
    let Transactions;

    
    console.log(data)
    if(isFetching){
        Transactions = <div>Fetching</div>;
    }else if(isSuccess){
        Transactions = getLabels(data, 'type').map((v, i) => <LabelComponent key={i} data={v}></LabelComponent>);
    }else if(isError){
        Transactions = <div>Error</div>
    }

  return (
    <>
        {Transactions}
    </>
  )
}




function LabelComponent({ data }) {
    if (!data) return null;

    return (
        <div className="flex justify-between items-center p-3 border-b border-gray-200 bg-white rounded-lg shadow-sm">
            <div className="flex items-center space-x-3">
                <div
                    className='w-3 h-3 rounded-full'
                    style={{ backgroundColor: data.color ?? '#f9c74f' }}
                ></div>
                <span className='text-sm font-medium text-gray-700'>{data.type ?? 'Unknown'}</span>
            </div>
            <div className="flex items-center space-x-4">
                <span className='text-sm font-semibold text-gray-800'>{Math.round(data.percent) ?? 0}%</span>
                <span className='text-sm font-semibold text-gray-900'>{data.total ? `₹${data.total.toLocaleString()}` : '₹0'}</span>
            </div>
        </div>
    );
}


