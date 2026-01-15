/**
 * AVIORÉ ARCHIVE - Email Template Library
 * Updated with Logo Integration
 */

export const getAcquisitionTemplate = (
  customerName: string, 
  items: any[], 
  amount: number, 
  txId: string
) => {
  // REPLACE THIS URL with your actual hosted logo link
  const LOGO_URL = "https://your-domain.com/logo-white.png"; 

  const itemsList = items.map(i => `
    <tr style="border-bottom: 1px solid #1a1a1a;">
      <td style="padding: 12px 0; font-size: 11px; text-transform: uppercase; color: #ffffff;">
        ${i.name}
      </td>
      <td style="padding: 12px 0; font-size: 11px; text-align: right; color: #666; text-transform: uppercase;">
        [${i.brand}]
      </td>
    </tr>
  `).join("");

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { 
            background-color: #050505; 
            color: #ffffff; 
            font-family: 'Courier New', Courier, monospace; 
            margin: 0; 
            padding: 40px; 
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            border: 1px solid #1a1a1a; 
            padding: 40px; 
          }
          .logo-wrapper {
            margin-bottom: 40px;
            text-align: left;
          }
          .logo-img {
            height: 30px; /* Adjust based on your logo shape */
            width: auto;
          }
          .header { 
            letter-spacing: 0.4em; 
            text-transform: uppercase; 
            border-bottom: 1px solid #1a1a1a; 
            padding-bottom: 20px; 
            margin-bottom: 30px; 
            font-weight: bold;
          }
          .label { color: #444; font-size: 8px; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 4px; }
          .value { font-size: 12px; margin-bottom: 24px; text-transform: uppercase; color: #ffffff; }
          .table { width: 100%; border-collapse: collapse; margin: 30px 0; }
          .total { font-size: 20px; font-style: italic; border-top: 1px solid #1a1a1a; padding-top: 20px; color: #ffffff; }
          .footer { margin-top: 60px; font-size: 9px; color: #333; border-top: 1px solid #1a1a1a; padding-top: 20px; line-height: 1.5; letter-spacing: 0.1em; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo-wrapper">
            <img src="${LOGO_URL}" alt="AVIORÉ" class="logo-img" />
          </div>

          <div class="header">ARCHIVE_TRANSMISSION</div>
          
          <div class="label">Identity_Confirmed</div>
          <div class="value">${customerName}</div>
          
          <div class="label">Transaction_Reference</div>
          <div class="value">${txId}</div>

          <table class="table">
            <thead>
              <tr>
                <th style="text-align: left; font-size: 8px; color: #444; letter-spacing: 0.2em; padding-bottom: 10px;">SPECIMEN</th>
                <th style="text-align: right; font-size: 8px; color: #444; letter-spacing: 0.2em; padding-bottom: 10px;">ENTITY</th>
              </tr>
            </thead>
            <tbody>
              ${itemsList}
            </tbody>
          </table>

          <div class="total">
            VALUATION: ₦${amount.toLocaleString()}
          </div>

          <div class="footer">
            OFFICIAL_MANIFEST_ATTACHED_AS_PDF // 
            SECURE_LOGISTICS_INITIALIZED // 
            DO_NOT_REPLY_TO_THIS_TRANSMISSION
          </div>
        </div>
      </body>
    </html>
  `;
};