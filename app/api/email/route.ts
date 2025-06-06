import { sendEmail } from "@/lib/mailConfig";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const jsonPayload = await new Response(req.body).text();
  const { sender, recipient, subject, message } = JSON.parse(jsonPayload);

  const mailOptions = {
    sender: { name: sender.name, address: sender.address },
    recipient: [{ name: recipient.name, address: recipient.address }],
    subject: subject,
    message: message,
  };

  console.log("Mail options:", mailOptions);

  try {
    const result = await sendEmail(mailOptions);

    console.log("Email sent: " + result.response);

    return Response.json({
      message: "Email sent successfully",
      accepted: result.accepted,
    });
  } catch {
    return Response.json({ message: "Error sending email" });
  }
}
