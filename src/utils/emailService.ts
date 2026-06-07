// EmailJS Configuration
const EMAIL_SERVICE_ID = "service_kj4r0yd";
const EMAIL_TEMPLATE_ID = "template_kwbc4jw";
const EMAIL_PUBLIC_KEY = "gEsLT7ZMOq43LJpf9"; // Replace with your actual public key from EmailJS dashboard
const EMAIL_API_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";

interface EmailParams {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendEmail = async (params: EmailParams): Promise<boolean> => {
  try {
    const response = await fetch(EMAIL_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: EMAIL_SERVICE_ID,
        template_id: EMAIL_TEMPLATE_ID,
        user_id: EMAIL_PUBLIC_KEY,
        template_params: {
          to_email: "shakibskty@gmail.com",
          from_name: params.name,
          from_email: params.email,
          subject: params.subject,
          message: params.message,
        },
      }),
    });

    const responseText = await response.text();
    let responseData;
    
    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = responseText;
    }
    
    if (response.ok) {
      console.log("✅ Email sent successfully!");
      return true;
    } else {
      console.error("❌ Email failed - Status:", response.status);
      console.error("Response:", responseData);
      return false;
    }
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return false;
  }
};
