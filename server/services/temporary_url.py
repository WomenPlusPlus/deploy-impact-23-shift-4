import secrets
import time

localhost = "http://localhost:5001"
route = "company-registration"
# expiration_time = int(time.time()) + 24 * 60 * 60  # 24 hours in seconds
expiration_time = int(time.time()) + 60  # 1 minute in seconds (for testing)


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


def is_token_valid(temporary_link):
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
