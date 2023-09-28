import sendgrid
from sendgrid.helpers.mail import Mail, From, To, Subject, PlainTextContent, HtmlContent
from temporaryURL import generate_temporary_link
from dotenv import load_dotenv

load_dotenv()
import os

# Constants
email_from = os.environ.get("SMTPLIB_EMAIL")
password_from = os.environ.get("SMTPLIB_PASSWORD")
api_key = os.environ.get("SENDGRID_API_KEY")


def send_email(subject, body, recipient_email):
    # Initialize the SendGrid client
    sg = sendgrid.SendGridAPIClient(api_key=api_key)

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
        else:
            print(f"Email sending failed with status code: {response.status_code}")
    except Exception as e:
        print(f"Email sending failed with exception: {str(e)}")


temporary_link = generate_temporary_link()
recipient_email = "laurapurcaro@gmail.com"
subject = "Temporary Link"
body = f"Click the link below to reset your password:\n{temporary_link}"

send_email(subject, body, recipient_email)
