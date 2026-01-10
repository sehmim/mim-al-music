import React, { useState } from 'react';
import { Download, FileSpreadsheet, CheckCircle } from 'lucide-react';

export default function ExcelDownloader() {
  const [downloaded, setDownloaded] = useState(false);

  const paymentsData = [
    {
      'Source File': '04032025',
      'Supplier ID': '5000031527',
      'Supplier Name': '14564464 CANADA INC',
      'GST/QST #': '787856814/1231126623',
      'Payment Reference': '1032669',
      'Process Date': '04/01/2025',
      'Payment Date': '04/03/2025',
      'Invoice ID': 'SVTKC01S1445238',
      'Invoice Date': '04/01/2025',
      'Voucher ID': 'S1445238',
      'Gross Amount': 2414.48,
      'Discount Amount': 0,
      'Paid Amount': 2414.48,
      'Currency': 'CAD'
    },
    {
      'Source File': '04092025',
      'Supplier ID': '5000031527',
      'Supplier Name': '14564464 CANADA INC',
      'GST/QST #': '787856814/1231126623',
      'Payment Reference': '1032669',
      'Process Date': '04/08/2025',
      'Payment Date': '04/09/2025',
      'Invoice ID': 'SVTKC01S1446958',
      'Invoice Date': '04/08/2025',
      'Voucher ID': 'S1446958',
      'Gross Amount': 2414.48,
      'Discount Amount': 0,
      'Paid Amount': 2414.48,
      'Currency': 'CAD'
    },
    {
      'Source File': '04102025',
      'Supplier ID': '5000031527',
      'Supplier Name': '14564464 CANADA INC',
      'GST/QST #': '787856814/1231126623',
      'Payment Reference': '1032669',
      'Process Date': '04/09/2025',
      'Payment Date': '04/10/2025',
      'Invoice ID': 'SVTKC01S1448251',
      'Invoice Date': '04/09/2025',
      'Voucher ID': 'S1448251',
      'Gross Amount': 2414.48,
      'Discount Amount': 0,
      'Paid Amount': 2414.48,
      'Currency': 'CAD'
    },
    {
      'Source File': '04172025',
      'Supplier ID': '5000031527',
      'Supplier Name': '14564464 CANADA INC',
      'GST/QST #': '787856814/1231126623',
      'Payment Reference': '1032669',
      'Process Date': '04/16/2025',
      'Payment Date': '04/17/2025',
      'Invoice ID': 'SVTKC01S1450937',
      'Invoice Date': '04/16/2025',
      'Voucher ID': 'S1450937',
      'Gross Amount': 1690.13,
      'Discount Amount': 0,
      'Paid Amount': 1690.13,
      'Currency': 'CAD'
    },
    {
      'Source File': '05012025',
      'Supplier ID': '5000031527',
      'Supplier Name': '14564464 CANADA INC',
      'GST/QST #': '787856814/1231126623',
      'Payment Reference': '1032669',
      'Process Date': '04/30/2025',
      'Payment Date': '05/01/2025',
      'Invoice ID': 'SVTKC01S1456327',
      'Invoice Date': '04/30/2025',
      'Voucher ID': 'S1456327',
      'Gross Amount': 2414.48,
      'Discount Amount': 0,
      'Paid Amount': 2414.48,
      'Currency': 'CAD'
    }
  ];

  const handleDownload = async () => {
    const XLSX = await import('https://cdn.sheetjs.com/xlsx-0.20.0/package/xlsx.mjs');
    
    const totalGross = paymentsData.reduce((sum, p) => sum + p['Gross Amount'], 0);
    const totalDiscount = paymentsData.reduce((sum, p) => sum + p['Discount Amount'], 0);
    const totalPaid = paymentsData.reduce((sum, p) => sum + p['Paid Amount'], 0);

    const wb = XLSX.utils.book_new();

    const summaryData = [
      ['PAYMENT SUMMARY REPORT'],
      [''],
      ['Report Generated:', new Date().toLocaleDateString()],
      ['Period:', '04/03/2025 - 05/01/2025'],
      [''],
      ['OVERALL STATISTICS'],
      ['Total Number of Payments:', paymentsData.length],
      ['Total Gross Amount (CAD):', `$${totalGross.toFixed(2)}`],
      ['Total Discount Amount (CAD):', `$${totalDiscount.toFixed(2)}`],
      ['Total Paid Amount (CAD):', `$${totalPaid.toFixed(2)}`],
      ['Currency:', 'CAD'],
      ['Average Payment (CAD):', `$${(totalPaid / paymentsData.length).toFixed(2)}`],
      [''],
      ['SUPPLIER INFORMATION'],
      ['Supplier ID:', '5000031527'],
      ['Supplier Name:', '14564464 CANADA INC'],
      ['GST/QST #:', '787856814/1231126623'],
      ['Payment Reference:', '1032669'],
      [''],
      ['BREAKDOWN BY FILE'],
      ['Source File', 'Payment Date', 'Amount (CAD)'],
      ['04032025', '04/03/2025', '$2,414.48'],
      ['04092025', '04/09/2025', '$2,414.48'],
      ['04102025', '04/10/2025', '$2,414.48'],
      ['04172025', '04/17/2025', '$1,690.13'],
      ['05012025', '05/01/2025', '$2,414.48'],
      ['', 'TOTAL:', `$${totalPaid.toFixed(2)}`]
    ];

    const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
    summarySheet['!cols'] = [
      { wch: 28 },
      { wch: 20 },
      { wch: 15 }
    ];
    XLSX.utils.book_append_sheet(wb, summarySheet, 'Summary');

    const detailSheet = XLSX.utils.json_to_sheet(paymentsData);
    detailSheet['!cols'] = [
      { wch: 12 },
      { wch: 12 },
      { wch: 25 },
      { wch: 25 },
      { wch: 18 },
      { wch: 12 },
      { wch: 12 },
      { wch: 20 },
      { wch: 12 },
      { wch: 12 },
      { wch: 12 },
      { wch: 14 },
      { wch: 12 },
      { wch: 10 }
    ];
    XLSX.utils.book_append_sheet(wb, detailSheet, 'Detailed Payments');

    XLSX.writeFile(wb, 'Payment_Summary_Report.xlsx');
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  const totalPaid = paymentsData.reduce((sum, p) => sum + p['Paid Amount'], 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-green-100 rounded-full p-4">
              <FileSpreadsheet className="w-16 h-16 text-green-600" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Payment Summary Report
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Excel file with aggregated payment data
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Report Contents:</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span><strong>Summary Sheet:</strong> Overview with totals, supplier info, and breakdown by file</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span><strong>Detailed Payments Sheet:</strong> Complete payment records with all fields</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span><strong>5 Payments</strong> from 04/03/2025 to 05/01/2025</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span><strong>Total Amount:</strong> ${totalPaid.toFixed(2)} CAD</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleDownload}
              disabled={downloaded}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                downloaded
                  ? 'bg-green-500 text-white cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-green-600 text-white hover:from-blue-700 hover:to-green-700 hover:shadow-lg transform hover:-translate-y-1'
              }`}
            >
              {downloaded ? (
                <>
                  <CheckCircle className="w-6 h-6" />
                  Downloaded Successfully!
                </>
              ) : (
                <>
                  <Download className="w-6 h-6" />
                  Download Excel File
                </>
              )}
            </button>

            <p className="text-center text-sm text-gray-500">
              File name: <span className="font-mono font-semibold">Payment_Summary_Report.xlsx</span>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-3">Quick Summary:</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-600 text-xs mb-1">Supplier</p>
                <p className="font-semibold text-gray-800">14564464 CANADA INC</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-600 text-xs mb-1">Total Payments</p>
                <p className="font-semibold text-gray-800">5</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-600 text-xs mb-1">Period</p>
                <p className="font-semibold text-gray-800">Apr - May 2025</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-600 text-xs mb-1">Total Amount</p>
                <p className="font-semibold text-green-600">${totalPaid.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


