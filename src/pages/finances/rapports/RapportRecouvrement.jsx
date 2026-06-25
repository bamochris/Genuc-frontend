import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useReports } from '../../hooks/useReports';
import useReportStore from '../../stores/reportStore';

/**
 * Rapports de Recouvrement - Caissier/Finance Manager
 * Génère les rapports de recouvrement des paiements
 */

const RapportRecouvrement = () => {
  const { generateDailyReport, generateMonthlyReport, getPaymentSummary, isLoading } = useReports();
  const { reports, currentReport, filters, setFilters } = useReportStore();
  const [reportType, setReportType] = useState('DAILY');
  const [dates, setDates] = useState({
    date: new Date().toISOString().split('T')[0],
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const handleGenerateReport = async () => {
    try {
      if (reportType === 'DAILY') {
        await generateDailyReport(1, dates.date, 1); // universiteId=1, generatedBy=1
      } else if (reportType === 'MONTHLY') {
        await generateMonthlyReport(1, dates.month, dates.year, 1);
      }
    } catch (error) {
      console.error('Erreur génération rapport:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDates((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getCollectionRate = () => {
    if (!currentReport) return 0;
    return (
      (currentReport.totalCollectedFc /
        (currentReport.totalCollectedFc + currentReport.totalPendingFc)) *
      100
    ).toFixed(1);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Rapports de Recouvrement</h1>

      {/* Formulaire génération rapport */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Générer un Rapport</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Type de rapport */}
          <div>
            <label className="block text-sm font-medium mb-2">Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="DAILY">Journalier</option>
              <option value="MONTHLY">Mensuel</option>
            </select>
          </div>

          {/* Sélecteur date/mois */}
          {reportType === 'DAILY' ? (
            <div>
              <label className="block text-sm font-medium mb-2">Date</label>
              <input
                type="date"
                name="date"
                value={dates.date}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Mois</label>
                <select
                  name="month"
                  value={dates.month}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => (
                    <option key={m} value={m}>
                      {new Date(2024, m - 1).toLocaleDateString('fr-FR', { month: 'long' })}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Année</label>
                <input
                  type="number"
                  name="year"
                  value={dates.year}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  min="2020"
                />
              </div>
            </>
          )}

          {/* Bouton générer */}
          <div className="flex items-end">
            <button
              onClick={handleGenerateReport}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 disabled:bg-gray-400"
            >
              {isLoading ? 'Génération...' : 'Générer'}
            </button>
          </div>
        </div>
      </div>

      {/* Rapport actuel */}
      {currentReport && (
        <div className="space-y-6">
          {/* Résumé */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-green-50 p-6 rounded-lg shadow border-l-4 border-green-500">
              <p className="text-gray-600 text-sm mb-1">Collecté</p>
              <p className="text-2xl font-bold text-green-600">
                {currentReport.totalCollectedFc?.toLocaleString()} FC
              </p>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg shadow border-l-4 border-yellow-500">
              <p className="text-gray-600 text-sm mb-1">En Attente</p>
              <p className="text-2xl font-bold text-yellow-600">
                {currentReport.totalPendingFc?.toLocaleString()} FC
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg shadow border-l-4 border-blue-500">
              <p className="text-gray-600 text-sm mb-1">Transactions</p>
              <p className="text-2xl font-bold text-blue-600">{currentReport.numberOfTransactions}</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg shadow border-l-4 border-purple-500">
              <p className="text-gray-600 text-sm mb-1">Taux Collecte</p>
              <p className="text-2xl font-bold text-purple-600">{getCollectionRate()}%</p>
            </div>
          </div>

          {/* Détails rapport */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Détails du Rapport</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Code Rapport</p>
                <p className="font-mono font-bold text-lg">{currentReport.reportCode}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Période</p>
                <p className="font-semibold">
                  {new Date(currentReport.periodStart).toLocaleDateString('fr-FR')} -{' '}
                  {new Date(currentReport.periodEnd).toLocaleDateString('fr-FR')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Étudiants Payés</p>
                <p className="font-semibold text-lg">{currentReport.numberOfStudentsPaid}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">USD Collecté</p>
                <p className="font-semibold text-lg">${currentReport.totalCollectedUsd?.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Action d'export */}
          <div className="flex gap-4">
            <button className="px-6 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700">
              📄 Exporter PDF
            </button>
            <button className="px-6 py-2 bg-green-600 text-white rounded font-semibold hover:bg-green-700">
              📊 Exporter Excel
            </button>
          </div>
        </div>
      )}

      {/* Historique rapports */}
      {reports && reports.length > 0 && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Historique des Rapports</h3>
          <div className="space-y-3">
            {reports.slice(-5).reverse().map((report) => (
              <div key={report.reportCode} className="flex justify-between items-center p-4 bg-gray-50 rounded border-l-2 border-blue-500">
                <div>
                  <p className="font-semibold">{report.reportCode}</p>
                  <p className="text-xs text-gray-600">
                    {report.reportType} - {new Date(report.reportDate).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">{report.totalCollectedFc?.toLocaleString()} FC</p>
                  <p className="text-xs text-gray-600">{report.numberOfTransactions} transactions</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RapportRecouvrement;
