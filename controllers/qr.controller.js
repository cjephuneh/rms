const { generateQRCode } = require("../services/qr.service");

// 🎟 Generate a QR code for a table
exports.getQRCode = async (req, res) => {
  try {
    const { tableNumber } = req.params;
    if (!tableNumber) return res.status(400).json({ error: "Table number is required" });

    const qrCode = await generateQRCode(tableNumber);
    res.json({ tableNumber, qrCode });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate QR code" });
  }
};
