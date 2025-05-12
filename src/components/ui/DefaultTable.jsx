
// src/components/DataTable.jsx
import Actions from '../modals/crud/Actions';
import Avatar from './Avatar';

const DefaultTable = ({ columns, data, setDeletes, openId, setOpenId }) => {
    return (
        <div className="flex-1 overflow-y-scroll rounded-sm">
            <div className="pb-2">
                <table className="space-y-2 w-full mb-5">
                    <thead>
                        <tr className="shadow-2xl sticky top-0 bg-[#a3273e] text-gray-100 text-sm font-mono uppercase">
                            <th className="p-2 h-full">
                                <div className="flex items-center justify-center">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 rounded-sm focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </th>

                            {columns.map((col) => (
                                <th key={col.key} className="p-2 text-center">{col.label}</th>
                            ))}

                            <th className="p-2"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((row) => (
                            <tr
                                key={row.id}
                                className="hover:bg-[#bb2b46]/60 hover:text-white even:bg-[#bb2b46]/8 mt-2 cursor-pointer transition-all text-nowrap"
                            >
                                <td className="py-1.5 px-4">
                                    <div className="flex items-center justify-center">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 rounded-sm focus:ring-2 focus:ring-blue-500"
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
        </div>
    );
}

export default DefaultTable;