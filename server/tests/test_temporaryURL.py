import pytest
import sys, os
import time
sys.path.append(os.path.abspath(__file__).split("/tests")[0])
from services.temporaryURL import route, localhost, is_token_valid, expiration_time

# Run `pytest -s tests/test_temporaryURL.py`
def test_temporary_url():
    # Example usage
    temporary_link = f"{localhost}/{route}?token=8y-5QSv5dz1sQpHrl8dtliA6qyRBX5LWvefUrz9IdDc&expires=1695841503"
    print("Temporary Link:", temporary_link)

    # Simulate checking if the link is still valid after 2 minutes
    response = is_token_valid(temporary_link)
    assert response is False

@pytest.mark.skip()
def test_expiration_time():
    assert expiration_time == int(time.time()) + 24 * 60 * 60