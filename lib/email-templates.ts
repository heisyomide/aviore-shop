export const generateReceiptHTML = (orderData: {
  customerName: string;
  orderId: string;
  items: any[];
  total: number;
  shippingAddress: string;
}) => {
  const date = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).toUpperCase();

  const itemsHtml = orderData.items.map(item => `
    <tr style="border-bottom: 1px solid #111;">
      <td style="padding: 15px 0; font-size: 11px;">
        ${item.name}<br/>
        <span style="color: #555; font-size: 9px;">LOT: ${item.lotNumber || 'N/A'} // SIZE: ${item.size || 'OS'}</span>
      </td>
      <td style="padding: 15px 0; text-align: right; font-size: 12px;">₦${item.price.toLocaleString()}</td>
    </tr>
  `).join('');

  return `
    <div style="background: #000; color: #fff; padding: 40px; font-family: monospace; max-width: 600px; margin: 0 auto; border: 1px solid #222;">
      <div style="text-align: center; margin-bottom: 40px;">
        <h1 style="font-style: italic; letter-spacing: -2px; margin: 0;">AVIORÉ</h1>
        <p style="font-size: 8px; tracking: 0.4em; color: #444; text-transform: uppercase; margin-top: 10px;">Official_Acquisition_Manifest</p>
      </div>

      <div style="display: flex; justify-content: space-between; margin-bottom: 40px; font-size: 9px; color: #888; text-transform: uppercase; letter-spacing: 1px;">
        <div>DATE: ${date}</div>
        <div style="text-align: right;">ORDER_ID: ${orderData.orderId}</div>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 40px;">
        <thead>
          <tr style="border-bottom: 2px solid #222;">
            <th style="text-align: left; font-size: 10px; padding-bottom: 10px; color: #444;">ITEM_DESCRIPTION</th>
            <th style="text-align: right; font-size: 10px; padding-bottom: 10px; color: #444;">VALUE</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
        <tfoot>
          <tr>
            <td style="padding-top: 20px; font-size: 10px; color: #444;">TOTAL_ACQUISITION_COST</td>
            <td style="padding-top: 20px; text-align: right; font-size: 16px; font-weight: bold;">₦${orderData.total.toLocaleString()}</td>
          </tr>
        </tfoot>
      </table>

      <div style="background: #0a0a0a; padding: 20px; border: 1px solid #111; margin-bottom: 40px;">
        <p style="font-size: 9px; color: #444; text-transform: uppercase; margin-bottom: 10px;">[SHIPPING_DESTINATION]</p>
        <p style="font-size: 11px; color: #ccc; margin: 0; line-height: 1.6;">${orderData.shippingAddress}</p>
      </div>

      <div style="text-align: center; border-top: 1px solid #222; padding-top: 30px;">
        <p style="font-size: 9px; color: #333; line-height: 1.8;">
          THIS IS AN AUTHENTICATED RECORD OF YOUR ACQUISITION.<br/>
          THE ARCHIVE RETAINS ALL OWNERSHIP LOGS UNTIL DISPATCH.<br/>
          <span style="color: #fff; margin-top: 10px; display: block;">VERIFIED_BY_AVIORÉ_SYSTEMS</span>
        </p>
      </div>
    </div>
  `;
};