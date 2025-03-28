const QRCode = require("qrcode");

// Generate a QR Code for a specific table
exports.generateQRCode = async (tableNumber) => {
  try {
    const qrData = `${process.env.FRONTEND_URL}/table/${tableNumber}`;
    const qrCodeImage = await QRCode.toDataURL(qrData);
    return qrCodeImage;
  } catch (error) {
    console.error("Error generating QR Code:", error);
    throw new Error("Failed to generate QR code");
  }
};
