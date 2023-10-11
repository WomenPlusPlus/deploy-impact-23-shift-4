import secrets
import time
import hashlib
import hmac
import base64
import os

localhost = "http://localhost:3000"
route = "register"
# expiration_time = int(time.time()) + 24 * 60 * 60  # 24 hours in seconds
expiration_time = int(time.time()) + 80  # 1 minute in seconds (for testing)
secret_key = os.environ.get("SECRET_KEY")


# Function to generate a temporary link with expiration
def generate_temporary_link(expiration_time, user_type):
    # Generate a random token
    token = secrets.token_urlsafe(32)

    # Combine the token and expiration time in a structured format
    temporary_link = f"{localhost}/{route}?token={token}&expires={expiration_time}&user_type={user_type}"

    return temporary_link


# Function to extract expiration timestamp from the link
def extract_expiration_timestamp(link):
    # Extract the expiration timestamp from the link (assuming it's in the query string)
    try:
        query_params = link.split("?")[1].split("&")
        for param in query_params:
            key, value = param.split("=")
            if key == "expires":
                return int(value)
    except Exception as e:
        # Handle parsing errors here
        return None


def is_token_expired(temporary_link):
    # Extract the expiration timestamp from the token
    expiration_timestamp = extract_expiration_timestamp(temporary_link)

    # Get the current timestamp
    current_time = int(time.time())

    # Check if the token is expired
    if expiration_timestamp and current_time <= expiration_timestamp:
        print("Link is still valid.")
        return True
    else:
        print("Link has expired.")
        return False


expiration_time = int(time.time()) + 3600  # 1 hour from now
user_type = "candidate"


# Function to generate a temporary signed URL
def generate_temporary_link_signed(user_type, expiration_time):
    secret_key = os.environ.get("SECRET_KEY")
    # Create the token
    token_data = (
        f"{route}?token={secret_key}&expires={expiration_time}&user_type={user_type}"
    )
    token = base64.urlsafe_b64encode(token_data.encode()).decode()

    # Create the signature
    signature = hmac.new(secret_key.encode(), token.encode(), hashlib.sha256).digest()
    signature_base64 = base64.urlsafe_b64encode(signature).decode()

    # Create the temporary link
    temporary_link = f"{localhost}/{route}?token={token}&expires={expiration_time}&user_type={user_type}&signature={signature_base64}"

    return temporary_link


# Function to verify a temporary signed URL
def verify_temporary_link(temp_link, secret_key):
    parts = temp_link.split("?")
    if len(parts) != 2:
        return False

    query_string = parts[1]
    query_params = query_string.split("&")

    token = None
    signature = None
    expiration_time = None

    for param in query_params:
        key, *value = param.split("=")
        value = "=".join(value)

        if key == "token":
            token = value
        elif key == "signature":
            signature = value
        elif key == "expires":
            expiration_time = int(value)

    print(
        f"token: {token}",
        f"signature: {signature}",
        f"expiration_time: {expiration_time}",
        sep="\n",
    )
    if not token or not signature or expiration_time is None:
        return False

    token_data = (
        f"{route}?token={secret_key}&expires={expiration_time}&user_type={user_type}"
    )
    token = base64.urlsafe_b64encode(token_data.encode()).decode()

    computed_signature = base64.urlsafe_b64encode(
        hmac.new(secret_key.encode(), token.encode(), hashlib.sha256).digest()
    ).decode()

    return computed_signature == signature


# # Example usage:
# temporary_link = generate_temporary_link_signed(secret_key, route, user_type, expiration_time)
# if verify_temporary_link(temporary_link, secret_key):
#     print("Temporary link is valid.")
# else:
#     print("Temporary link is not valid.")
