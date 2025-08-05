
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

    return (
        <>
            {data.length <= 0 ?
                <div className='flex justify-center items-center mt-5 flex-col space-y-2'>
                    <span className='bg-red-300/50 border-10 shadow-2xl border-red-100 text-red-400 rounded-full animate-bounce'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-40">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634Zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 0 1-.189-.866c0-.298.059-.605.189-.866Zm-4.34 7.964a.75.75 0 0 1-1.061-1.06 5.236 5.236 0 0 1 3.73-1.538 5.236 5.236 0 0 1 3.695 1.538.75.75 0 1 1-1.061 1.06 3.736 3.736 0 0 0-2.639-1.098 3.736 3.736 0 0 0-2.664 1.098Z" clipRule="evenodd" />
                        </svg>

                    </span>
                    <button className='bg-red-400 shadow-2xl shadow-red-900/70 border-5 border-red-50/50 text-red-100 p-2 rounded-4xl px-5 font-medium flex flex-row space-x-3.5'>
                        <p>
                            No se hay resultados
                        </p>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 animate-spin">
                            <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                : (
                    <>
                        {checked.length >= 1 &&
                            <CheckSelect datos={checked} total={checked.length} setDeletes={setDeletes} />
                        }

                        <div className=" flex flex-row rounded-md mb-2 w-min shadow shadow-gray-300" role="group">
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

                        <div className="flex-1 overflow-y-scroll rounded-sm">
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
                                                <th
                                                    key={col.key}
                                                    className="p-2 text-center text-white 
                                                    min-w-[80px] max-w-[120px] 
                                                    sm:min-w-[120px] sm:max-w-[160px] 
                                                    md:min-w-[140px] md:max-w-[200px] 
                                                    overflow-hidden text-ellipsis whitespace-nowrap"
                                                >
                                                    {col.label}
                                                </th>
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
                                                    <td
                                                        key={col.key}
                                                        className="py-1.5 px-4 
                                                        min-w-[80px] max-w-[120px] 
                                                        sm:min-w-[120px] sm:max-w-[160px] 
                                                        md:min-w-[140px] md:max-w-[200px] 
                                                        overflow-hidden text-ellipsis whitespace-nowrap"
                                                        title={row[col.key]}
                                                    >
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
                        </div>
                    </>
                )}
        </>
    );
}

export default DefaultTable;