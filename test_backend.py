import urllib.request
import urllib.parse
import json

url = "http://127.0.0.1:8000/api/predict/moa"
boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW'
data = (
    f'--{boundary}\r\n'
    'Content-Disposition: form-data; name="file"; filename="demo.csv"\r\n'
    'Content-Type: text/csv\r\n\r\n'
    'gene1,gene2\n1.0,2.0\r\n'
    f'--{boundary}--\r\n'
).encode('utf-8')

req = urllib.request.Request(url, data=data, method="POST")
req.add_header('Content-Type', f'multipart/form-data; boundary={boundary}')

try:
    print(f"Sending request to {url}...")
    with urllib.request.urlopen(req) as response:
        print(f"Status Code: {response.getcode()}")
        print(f"Response: {response.read().decode('utf-8')}")
except urllib.error.HTTPError as e:
    print(f"HTTP Error {e.code}: {e.reason}")
    print(f"Error Body: {e.read().decode('utf-8')}")
except Exception as e:
    print(f"Error: {e}")
