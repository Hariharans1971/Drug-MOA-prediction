import urllib.request
import urllib.parse
import json

BASE_URL = "http://127.0.0.1:8000/api/auth"

def register():
    url = f"{BASE_URL}/register"
    data = {
        "email": "test@example.com",
        "password": "password123",
        "full_name": "Test User"
    }
    req = urllib.request.Request(url, data=json.dumps(data).encode('utf-8'), method="POST")
    req.add_header('Content-Type', 'application/json')
    
    try:
        with urllib.request.urlopen(req) as res:
            print(f"REGISTER: {res.getcode()}")
            print(res.read().decode('utf-8'))
    except urllib.error.HTTPError as e:
        print(f"REGISTER FAILED: {e.code} {e.reason}")
        print(e.read().decode('utf-8'))

def login():
    url = f"{BASE_URL}/token"
    # OAuth2PasswordRequestForm expects form data, not JSON
    data = urllib.parse.urlencode({
        "username": "test@example.com",
        "password": "password123"
    }).encode('utf-8')
    
    req = urllib.request.Request(url, data=data, method="POST")
    req.add_header('Content-Type', 'application/x-www-form-urlencoded')
    
    try:
        with urllib.request.urlopen(req) as res:
            print(f"LOGIN: {res.getcode()}")
            response = json.loads(res.read().decode('utf-8'))
            print(response)
            return response.get("access_token")
    except urllib.error.HTTPError as e:
        print(f"LOGIN FAILED: {e.code} {e.reason}")
        print(e.read().decode('utf-8'))
        return None

def check_me(token):
    url = f"{BASE_URL}/me"
    req = urllib.request.Request(url, method="GET")
    req.add_header('Authorization', f'Bearer {token}')
    
    try:
        with urllib.request.urlopen(req) as res:
            print(f"ME: {res.getcode()}")
            print(res.read().decode('utf-8'))
    except urllib.error.HTTPError as e:
        print(f"ME FAILED: {e.code} {e.reason}")
        print(e.read().decode('utf-8'))

if __name__ == "__main__":
    print("--- Testing Auth ---")
    register()
    token = login()
    if token:
        check_me(token)
