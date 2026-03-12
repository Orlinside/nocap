import { sendEmail } from "@/lib/mailConfig";
type EmailPayload = {
  sender: { name: string; address: string };
  recipient: { name: string; address: string };
  subject: string;
  message: string;
};

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as Partial<EmailPayload>;
    const { sender, recipient, subject, message } = payload;

    if (
      !sender?.name ||
      !sender?.address ||
      !recipient?.name ||
      !recipient?.address ||
      !subject ||
      !message
    ) {
      return Response.json(
        { message: "Invalid email payload" },
        { status: 400 },
      );
    }

    const mailOptions = {
      sender: { name: sender.name, address: sender.address },
      recipient: [{ name: recipient.name, address: recipient.address }],
      subject,
      message,
    };

    const result = await sendEmail(mailOptions);

    return Response.json(
      {
        message: "Email sent successfully",
        accepted: result.accepted,
      },
      { status: 200 },
    );
  } catch {
    return Response.json({ message: "Error sending email" }, { status: 500 });
  }
}
