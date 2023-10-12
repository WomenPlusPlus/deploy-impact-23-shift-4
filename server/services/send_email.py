import sendgrid
from sendgrid.helpers.mail import Mail, From, To, Subject, PlainTextContent, HtmlContent
import sys, os

sys.path.append(os.path.abspath(__file__).split("services")[0])
from services.temporary_url import generate_temporary_link_signed
from dotenv import load_dotenv

load_dotenv()
import time

# Constants
email_from = os.environ.get("SMTPLIB_EMAIL")
password_from = os.environ.get("SMTPLIB_PASSWORD")
api_key = os.environ.get("SENDGRID_API_KEY")


def func_send_email(recipient_email, user_type, association):
    # Initialize the SendGrid client
    sg = sendgrid.SendGridAPIClient(api_key=api_key)
    
    expiration_time = int(time.time()) + 24 * 60 * 60  # 24 hours in seconds
    
    # expiration_time = int(time.time()) + 2 * 60 # 2 minutes in seconds
    
    temporary_link = generate_temporary_link_signed(user_type, expiration_time, association)

    subject = "Invitation to Join Shift Software - Empowering Refugees in Switzerland"
    body = f"""
            <html>
                <head>
                </head>
                <body>
                    <div style="padding: 0 20px; text-align: center; color: #757575;">
                        <h1>Join Shift Software: Empowering Refugees in Switzerland</h1>
                    </div>
                    <div class="container" style="width: 700px; height: 500px; margin: 0 auto; padding: 20px; background-color: #F0EFEB; color: #fff; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); display: flex; flex-direction: column; justify-content: space-between;">
                         <div class="header" style="text-align: center; background-color: #F0EFEB; color: #fff; padding: 10px; border-radius: 5px 5px 0 0;">
                            <div class="content" style="padding: 5px; color: #757575;">
                                <p>Dear [Recipient's Name],</p>
                                <p>We are excited to invite you to join <strong>Shift Software</strong>, a comprehensive system designed to empower refugees in Switzerland by providing them with the tools, resources, and support they need to find entry-level jobs in the tech industry.</p>
                                <p><strong>Shift Software</strong>  envisions a future where refugees in Switzerland can leverage their skills, gain meaningful employment in the tech sector, and contribute to both their own success and the Swiss economy. This innovative platform aims to bridge the gap between refugees' skills and the demands of the Swiss tech job market, fostering integration, self-sufficiency, and economic independence.</p>
                                <p>This system embodies the spirit of inclusion, diversity, and innovation, fostering a brighter future for refugees and the Swiss tech industry alike.</p>
                                <p>Take the first step towards making a difference: <br>
                                Click the button below to access Shift Software and be part of this inspiring journey:</p>
                                <p><a href="{temporary_link}" class="button">Join Shift Software</a></p>
                                <p>We look forward to having you as a valuable member of our community.</p>
                                <p>Sincerely,</p>
                                <p>The Shift Software Team</p>
                            </div>
                        </div>
                    </div>
                </body>
            </html>
            """

    # Create the email message
    message = Mail(
        from_email=From(email_from, "Shift4"),
        to_emails=To(recipient_email),
        subject=Subject(subject),
        plain_text_content=PlainTextContent(body),
        html_content=HtmlContent(body),
    )

    try:
        # Send the email
        response = sg.send(message)
        if response.status_code == 202:
            print(f"Email sent successfully to {recipient_email}")
            return {"message": "success", "link": temporary_link}
        else:
            print(f"Email sending failed with status code: {response.status_code}")
            return {"message": f"error. {response.status_code}"}
    except Exception as e:
        print(f"Email sending failed with exception: {str(e)}")
        return {"message": "error"}
