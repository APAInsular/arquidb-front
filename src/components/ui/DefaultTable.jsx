
// src/components/DataTable.jsx
import { useEffect, useReducer, useState } from 'react';
import Actions from '../modals/crud/Actions';
import Avatar from './Avatar';
import CheckSelect from '../modals/crud/CheckSelect';
import FilterReducer from '../../store/reducers/FilterReducer';

const arrowUp =
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
    </svg>;
const arrowDown =
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>;

const initialState = {
    data: [],
    order: '',
    key: {
        text:
        {
            name: 'A-z',
            icon: arrowUp
        },
        num: {
            name: 'Número',
            icon: arrowUp
        },
        date: {
            name: 'Fecha',
            icon: arrowUp
        },
    },
};

const DefaultTable = ({ columns, data, setDeletes, openId, setOpenId, tabla, ...filters }) => {

    const [checked, setChecked] = useState([]);
    const [state, dispatch] = useReducer(FilterReducer, initialState);

    const handleChecked = (id) => {
        setChecked(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (checked.length === data.length) {
            setChecked([]);
        } else {
            setChecked(data.map(row => row.id));
        }
    };

    const handleFilter = (type) => {

        switch (type.action) {
            case 'TEXT':
                if (state.order === 'asc') {
                    state.key.text.icon = arrowUp;
                    dispatch({ type: 'SORT_TEXT', key: `${filters.someText}`, order: `${state.order = "desc"}` })
                } else if (state.order === 'desc' || state.order === '') {
                    state.key.text.icon = arrowDown;
                    dispatch({ type: 'SORT_TEXT', key: `${filters.someText}`, order: `${state.order = "asc"}` })
                }
                break;
            case 'NUMBER':
                if (state.order === 'asc') {
                    state.key.num.icon = arrowUp;
                    dispatch({ type: 'SORT_NUMBER', key: `${filters.someNumber}`, order: `${state.order = "desc"}` })
                } else if (state.order === 'desc' || state.order === '') {
                    state.key.num.icon = arrowDown;
                    dispatch({ type: 'SORT_NUMBER', key: `${filters.someNumber}`, order: `${state.order = "asc"}` })
                }
                break;
            case 'DATE':
                if (state.order === 'asc') {
                    state.key.date.icon = arrowUp;
                    dispatch({ type: 'SORT_DATE', key: `${filters.someDate}`, order: `${state.order = "desc"}` })
                } else if (state.order === 'desc' || state.order === '') {
                    state.key.date.icon = arrowDown;
                    dispatch({ type: 'SORT_DATE', key: `${filters.someDate}`, order: `${state.order = "asc"}` })
                }
                break;
        }
    }

    useEffect(() => {
        dispatch({ type: 'SET_DATA', payload: data });
    }, []);

    useEffect(() => {
        setChecked([]);
    }, [data]);

    console.log(state)

    return (
        <>
            {checked.length >= 1 &&
                <CheckSelect datos={checked} total={checked.length} setDeletes={setDeletes} />
            }

            <div className="flex flex-row rounded-md mb-2 w-min shadow shadow-gray-300" role="group">
                <button
                    onClick={() => handleFilter({ action: 'TEXT' })}
                    type="button"
                    className="flex flex-row items-center space-x-2 text-nowrap cursor-pointer px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-2 focus:ring-gray-700 focus:text-gray-700"
                >
                    <p>{state.key.text.name}</p>
                    <span>{state.key.text.icon}</span>
                </button>
                <button
                    onClick={() => handleFilter({ action: 'NUMBER' })}
                    type="button"
                    className="flex flex-row items-center space-x-2 text-nowrap cursor-pointer px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-2 focus:ring-gray-700 focus:text-gray-700"
                >
                    <p>{state.key.num.name}</p>
                    <span>{state.key.num.icon}</span>
                </button>
                <button
                    onClick={() => handleFilter({ action: 'DATE' })}
                    type="button"
                    className="flex flex-row items-center space-x-2 text-nowrap cursor-pointer px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-2 focus:ring-gray-700 focus:text-gray-700"
                >
                    <p>{state.key.date.name}</p>
                    <span>{state.key.date.icon}</span>
                </button>
            </div>


            < div className="flex-1 overflow-y-scroll rounded-sm" >
                <div className="pb-2">
                    <table className="space-y-2 w-full mb-5">
                        <thead>
                            <tr className="shadow-2xl sticky top-0 bg-[#a3273e] text-gray-100 text-sm font-mono uppercase">
                                <th className="p-2 h-full">
                                    <div className="flex items-center justify-center">
                                        <input
                                            type="checkbox"
                                            checked={checked.length === data.length && data.length > 0}
                                            onChange={handleSelectAll}
                                            className="cursor-pointer w-4 h-4 rounded-sm focus:ring-2 focus:ring-red-500"
                                            style={{ accentColor: '#dc2626' }}
                                        />
                                    </div>
                                </th>

                                {columns.map((col) => (
                                    <th key={col.key} className="p-2 text-center text-white">{col.label}</th>
                                ))}

                                <th className="p-2"></th>
                            </tr>
                        </thead>

                        <tbody>
                            {state.data.map((row) => (
                                <tr
                                    key={row.id}
                                    className={
                                        `mt-2 cursor-pointer transition-all text-nowrap 
                                    ${checked.includes(row.id)
                                            ? 'bg-[#bb2b46]/70 text-white even:bg-[#bb2b46]/50 border-s-5 border-red-900 even:border-red-500'
                                            : 'hover:bg-[#bb2b46]/60 hover:text-white even:bg-[#bb2b46]/8 border-s-5 border-transparent'
                                        }`
                                    }
                                >
                                    <td className="py-1.5 px-4">
                                        <div className="flex items-center justify-center">
                                            <input
                                                checked={checked.includes(row.id)}
                                                onChange={() => handleChecked(row.id)}
                                                type="checkbox"
                                                className="cursor-pointer w-4 h-4 rounded-sm focus:ring-2 focus:ring-red-500"
                                                style={{ accentColor: '#dc2626' }}
                                            />
                                        </div>
                                    </td>

                                    {columns.map((col) => (
                                        <td key={col.key} className="py-1.5 px-4">
                                            {col.render ? col.render(row) : row[col.key]}
                                        </td>
                                    ))}

                                    <td className="py-1.5 px-4">
                                        <Actions tabla={tabla} datos={row} setDeletes={setDeletes} openId={openId} setOpenId={setOpenId} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div >
        </>
    );
}

export default DefaultTable;