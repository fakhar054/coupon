import React from 'react';
import './PromoTable.css';

const PromoTable = () => {
  const promoCodes = [
    { reduction: '90% off', promotion: 'Treat yourself to an exceptional 90% discount on your favorite items on the Amazon website or app', endDate: '07/30/2024' },
    { reduction: '20% off', promotion: 'SECOND-HAND GOOD DEAL: Save an additional 20% with second-hand products offered by Amazon', endDate: '07/30/2024' },
    { reduction: 'OFFER', promotion: 'RIGHT NOW: Get new summer essentials for less than €10 at Amazon', endDate: '01/09/2024' },
    { reduction: 'GOOD PLAN', promotion: 'READING PLAN: Find your current book in ebook form with Amazon Reading', endDate: '07/30/2024' },
    { reduction: 'GOOD PLAN', promotion: 'Amazon Photos offers you unlimited storage. Take advantage of it!', endDate: '07/30/2024' },
  ];

  return (
    
    <div className="main-table">
    <div className="promo-table-container">
      <h2>Latest Amazon promo codes and deals added:</h2>
      <table className="promo-table">
        <thead>
          <tr>
            <th>Reduction</th>
            <th>Promotion</th>
            <th>End date</th>
          </tr>
        </thead>
        <tbody>
          {promoCodes.map((promo, index) => (
            <tr key={index}>
              <td>{promo.reduction}</td>
              <td>{promo.promotion}</td>
              <td>{promo.endDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default PromoTable;
