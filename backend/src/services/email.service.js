const nodemailer = require('nodemailer');
const { config } = require('../config/env');

let transporter;

const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.secure,
      auth: { user: config.smtp.user, pass: config.smtp.pass },
    });
  }
  return transporter;
};

const send = async (to, subject, html) => {
  try {
    await getTransporter().sendMail({ from: config.smtp.from, to, subject, html });
  } catch (err) {
    console.error(`[Email] Failed to send to ${to}:`, err.message);
  }
};

const sendInquiryToAdmin = (inquiry, product) =>
  send(
    config.smtp.adminEmail,
    `🔔 New Inquiry: ${product.name}`,
    `<h2>New Product Inquiry Received</h2>
     <table style="border-collapse:collapse">
       <tr><td><b>Product:</b></td><td>${product.name}</td></tr>
       <tr><td><b>Buyer:</b></td><td>${inquiry.buyerName}</td></tr>
       <tr><td><b>Company:</b></td><td>${inquiry.buyerCompany || 'N/A'}</td></tr>
       <tr><td><b>Email:</b></td><td>${inquiry.buyerEmail}</td></tr>
       <tr><td><b>Phone:</b></td><td>${inquiry.buyerPhone || 'N/A'}</td></tr>
       <tr><td><b>Country:</b></td><td>${inquiry.buyerCountry || 'N/A'}</td></tr>
       <tr><td><b>Quantity:</b></td><td>${inquiry.quantity || 'Not specified'}</td></tr>
       <tr><td><b>Message:</b></td><td>${inquiry.message || 'No message'}</td></tr>
     </table>
     <p><a href="${config.frontendUrl || 'http://localhost:3000'}/admin/inquiries">View in Admin Panel →</a></p>`
  );

const sendInquiryToVendor = (inquiry, product, vendorEmail) =>
  send(
    vendorEmail,
    `📬 New Inquiry for your product: ${product.name}`,
    `<h2>You have a new inquiry!</h2>
     <p>A buyer is interested in your product <strong>${product.name}</strong>.</p>
     <table style="border-collapse:collapse">
       <tr><td><b>Buyer:</b></td><td>${inquiry.buyerName}</td></tr>
       <tr><td><b>Company:</b></td><td>${inquiry.buyerCompany || 'N/A'}</td></tr>
       <tr><td><b>Country:</b></td><td>${inquiry.buyerCountry || 'N/A'}</td></tr>
       <tr><td><b>Quantity:</b></td><td>${inquiry.quantity || 'Not specified'}</td></tr>
       <tr><td><b>Message:</b></td><td>${inquiry.message || 'No message'}</td></tr>
     </table>
     <p><a href="${config.frontendUrl || 'http://localhost:3000'}/dashboard/inquiries">View & Respond →</a></p>`
  );

const sendInquiryConfirmationToBuyer = (email, name, productName) =>
  send(
    email,
    '✅ We received your inquiry — Bharath Bridge',
    `<h2>Thank you, ${name}!</h2>
     <p>Your inquiry about <strong>${productName}</strong> has been received.</p>
     <p>Our team will review your request and connect you with the vendor within <strong>24-48 hours</strong>.</p>
     <br>
     <p>Best regards,<br><strong>Bharath Bridge Team</strong></p>`
  );

const sendVendorStatusEmail = (email, name, action, notes) =>
  send(
    email,
    `Your Bharath Bridge vendor application has been ${action}d`,
    `<h2>Hello ${name},</h2>
     <p>Your vendor KYC application has been <strong style="color:${action === 'approve' ? 'green' : 'red'}">${action}d</strong>.</p>
     ${notes ? `<p><strong>Notes from admin:</strong> ${notes}</p>` : ''}
     ${action === 'approve'
       ? `<p>You can now log in and start adding your products!</p>
          <p><a href="${config.frontendUrl || 'http://localhost:3000'}/dashboard">Go to Dashboard →</a></p>`
       : '<p>Please contact support if you have questions about this decision.</p>'}
     <br><p>Bharath Bridge Team</p>`
  );

module.exports = {
  sendInquiryToAdmin,
  sendInquiryToVendor,
  sendInquiryConfirmationToBuyer,
  sendVendorStatusEmail,
};
