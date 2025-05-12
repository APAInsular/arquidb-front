
// src/components/DataTable.jsx
import { useEffect, useState } from 'react';
import Actions from '../modals/crud/Actions';
import Avatar from './Avatar';
import CheckSelect from '../modals/crud/CheckSelect';

const DefaultTable = ({ columns, data, setDeletes, openId, setOpenId }) => {

    const [checked, setChecked] = useState([]);

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

    useEffect(() => {
        setChecked([]);
    }, [data]);

    console.log(checked)

    return (
        <>
            {checked.length >= 1 &&
                <CheckSelect datos={checked} total={checked.length} setDeletes={setDeletes} />
            }

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
                            {data.map((row) => (
                                <tr
                                    key={row.id}
                                    className={
                                        `mt-2 cursor-pointer transition-all text-nowrap 
                                    ${checked.includes(row.id)
                                            ? 'bg-[#bb2b46]/70 text-white even:bg-[#bb2b46]/50 border-s-5 border-red-900 even:border-red-500'
                                            : 'hover:bg-[#bb2b46]/60 hover:text-white even:bg-[#bb2b46]/8 border-s-5 border-transparent'}`
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
                                        <Actions tabla={'usuarios'} datos={row} setDeletes={setDeletes} openId={openId} setOpenId={setOpenId} />
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