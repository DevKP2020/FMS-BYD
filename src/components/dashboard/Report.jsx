import { useMemo, useState, useEffect } from 'react'
import * as XLSX from 'xlsx'
import moment from 'moment'
import DataTable from 'react-data-table-component'
import CustomLoader from '../materials/CustomLoader'
import useSWR from 'swr'
import Fetcher from '../../libs/Fetcher'
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";

export default function Report() {

    const [pending, setPending] = useState(true)
    const [rows, setRows] = useState([])
    const [ startDate, setStartDate ] = useState(moment().startOf('week').format('YYYY-MM-DD HH:mm:ss'))
    const [ endDate, setEndDate ] = useState(moment().endOf('week').format('YYYY-MM-DD HH:mm:ss'))

    const API = import.meta.env.VITE_PUBLIC_API_FUELPOS;

    const { data: dataReport } = useSWR(`${API}/transactions/range?start=${startDate}&end=${endDate}`, Fetcher, { refreshInterval: 10000 })

    const filteredData = useMemo(() => {
        return dataReport?.data?.filter(data => {
            const reportDate = moment(data.dateTime)
            const reportFilter = reportDate.isBetween(startDate, endDate, null, '[]')

            return reportFilter
        }).sort((a, b) => moment(b.dateTime) - moment(a.dateTime))
    }, [dataReport, startDate, endDate])

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

        XLSX.writeFile(workbook, `report_transactions_${moment().format('YYYYMMDD_HHmmss')}.xlsx`)
    }

    const customStyles = {
        tableWrapper: {
            style: {
                borderRadius: 0,
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
            name: 'Transaction Date',
            selector: row => row.dateTime,
            sortable: true,
        },
        {
            name: 'Pump',
            selector: row => row.pumpId,
            sortable: true,
        },
        // {
        //     name: 'Product',
        //     selector: row => row.productName,
        //     sortable: true,
        // },
        // {
        //     name: 'Tank',
        //     selector: row => row.tankName,
        //     sortable: true,
        // },
        {
            name: 'Total Volume',
            selector: row => parseFloat(row.volume).toFixed(2),
            sortable: true,
        },
        {
            name: 'Total Amount',
            selector: row => parseFloat(row.amount).toLocaleString('id-ID'),
            sortable: true,
        }
    ];

    useEffect(() => {
        const timeout = setTimeout(() => {
            setRows(filteredData);
            setPending(false);
        }, 2000);

        return () => clearTimeout(timeout);
    }, [filteredData]);

    return (
        <div className='w-full h-full max-h-[80vh] overflow-auto p-4 bg-white rounded-lg shadow-md'>
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
            <DataTable
                columns={columns}
                data={rows}
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
                progressPending={pending}
                progressComponent={<CustomLoader />}
            />
        </div>
    )
}