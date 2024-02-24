import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const Customers = () => {
    return (
        <>
            <h1 className='text-2xl font-semibold mb-3'>Orders</h1>
            <Table>
                <TableCaption>A list of your orders</TableCaption>
                <TableHeader className='hover:bg-secondary bg-secondary'>
                    <TableRow className='bg-secondary hover:bg-secondary'>
                        <TableHead className="w-[100px]">Invoice</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow className=''>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </>
    )
}

export default Customers