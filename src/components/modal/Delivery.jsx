import React, { useState, useMemo } from "react";
import useSWR from "swr";
import moment from "moment";
import * as XLSX from 'xlsx';
import DataTable from "react-data-table-component";

import Fetcher from "../../libs/Fetcher";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";

export default function Delivery({ tank, setOpenModalDelivery }) {

    const [ startDate, setStartDate ] = useState(moment().startOf('week').format('YYYY-MM-DD HH:mm:ss'))
    const [ endDate, setEndDate ] = useState(moment().endOf('week').format('YYYY-MM-DD HH:mm:ss'))

    const API = import.meta.env.VITE_PUBLIC_API_FUELPOS;

    const { data: dataDelivery } = useSWR(`${API}/delivery/range?tankId=${tank?.probeNumber}&start=${startDate}&end=${endDate}`, Fetcher)

    const filteredData = useMemo(() => {
        return dataDelivery?.data?.filter(data => {
            const deliveryDate = moment(data?.startValues?.dateTime)
            const deliveryFilter = deliveryDate?.isBetween(startDate, endDate, null, '[]')

            return deliveryFilter
        }).sort((a, b) => moment(b?.startValues?.dateTime) - moment(a?.startValues?.dateTime))
    }, [dataDelivery, startDate, endDate])

    const handleExport = () => {
        if(!filteredData || filteredData.length === 0) return

        const exportData = filteredData.map((row, index) => {
            const obj = {}

            columns.forEach(col => {
                if (typeof col.selector === "function") {
                    obj[col.name] = col.selector(row, index)
                }
            })

            return obj
        })

        const worksheet = XLSX.utils.json_to_sheet(exportData)
        const workbook = XLSX.utils.book_new()

        XLSX.utils.book_append_sheet(workbook, worksheet, "Report")

        XLSX.writeFile(workbook, `report_delivery_${moment().format('YYYYMMDD_HHmmss')}.xlsx`)
    }

    const customStyles = {
        tableWrapper: {
            style: {
                borderRadius: 1,
            }
        },
        headRow: {
            style: {
                backgroundColor: '#0f2a44;',
                color: 'white'
            }    
        },
        headCells: {
            style: {
                justifyContent: 'center'
            }
        },
        cells: {
            style: {
                justifyContent: 'center',
            }
        },
        pagination: {
            style: {
                borderRadius: 'inherit'
            }
        }
    };

    const columns = [
        {
            name: 'No',
            selector: (_, index) => index + 1,
            width: '50px'
        },
        {
            name: 'Start Date',
            selector: row => row.startValues.dateTime,
            sortable: true,
        },
        {
            name: 'End Date',
            selector: row => row.endValues.dateTime,
            sortable: true,
        },
        {
            name: 'Start Height',
            selector: row => (row.startValues.productHeight).toFixed(2),
            sortable: true,
        },
        {
            name: 'End Height',
            selector: row => (row.endValues.productHeight).toFixed(2),
            sortable: true,
        },
        {
            name: 'Start Volume',
            selector: row => parseFloat(row.startValues.productVolume).toFixed(2),
            sortable: true,
        },
        {
            name: 'End Volume',
            selector: row => parseFloat(row.endValues.productVolume).toFixed(2),
            sortable: true,
        },
        {
            name: 'Total Volume',
            selector: row => parseFloat(row.absoluteValues.probeCalculationVolume).toFixed(2),
            sortable: true,
        }
    ];

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative p-4 w-full max-w-6xl h-full md:h-auto" style={{ maxHeight: "90vh" }}>
                    <div className="border-0 rounded-xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t-xl bg-dark">
                            <h3 className="text-3xl font-semibold text-white">
                                Tank Delivery
                            </h3>
                            <button
                                className="text-white bg-red-500 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setOpenModalDelivery(false)}
                            >
                                x
                            </button>
                        </div>
                        <div className="w-full h-full p-4 bg-grey rounded-b-xl">
                            <div className="bg-white rounded-lg shadow-md p-4">
                                <div className="w-full md:w-full h-full mb-2">
                                    <div className="grid grid-cols-2">
                                        <form className="flex mb-2 items-center">
                                            <label htmlFor="startDate" className="w-full block text-sm font-medium text-gray-900 mr-5">Start Date</label>
                                            <input 
                                                type="datetime-local" 
                                                name="startDate" 
                                                id="startDate" 
                                                className="bg-gray-50 border-2 border-black text-gray-900 text-end text-sm rounded-md block" 
                                                value={startDate}
                                                onChange={(e) => setStartDate(moment(e.target.value).format('YYYY-MM-DD HH:mm:ss'))}
                                            />
                                            <label htmlFor="endDate" className="w-full block text-sm font-medium text-gray-900 mx-5">End Date</label>
                                            <input 
                                                type="datetime-local" 
                                                name="endDate" 
                                                id="endDate" 
                                                className="bg-gray-50 border-2 border-black text-gray-900 text-end text-sm rounded-md block" 
                                                value={endDate}
                                                onChange={(e) => setEndDate(moment(e.target.value).format('YYYY-MM-DD HH:mm:ss'))}
                                            />
                                        </form>
                                        <div className="flex justify-end mb-2">
                                            <button onClick={handleExport} className="flex p-2 text-sm text-white bg-green-500 font-semibold hover:bg-green-600 hover:text-dark rounded-lg border-1 shadow-lg"><PiMicrosoftExcelLogoFill className="mr-1 h-5 w-5" aria-hidden="true"/> Export</button>
                                        </div>
                                    </div>
                                </div>
                                <DataTable
                                    columns={columns}
                                    data={filteredData}
                                    fixedHeader
                                    fixedHeaderScrollHeight="350px"
                                    highlightOnHover
                                    customStyles={customStyles}
                                    dense
                                    striped
                                    noDataComponent="No data available"
                                    responsive
                                    pagination
                                    sortable
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="opacity-50 fixed z-40"></div>
        </>
    );
};
