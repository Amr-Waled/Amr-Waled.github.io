import sys
import io
from PIL import Image

try:
    from rembg import remove
except ImportError:
    print("rembg is not installed yet.")
    sys.exit(1)

input_path = sys.argv[1]
output_path = sys.argv[2]

try:
    with open(input_path, 'rb') as i:
        input_data = i.read()
    
    print(f"Removing background from {input_path}...")
    output_data = remove(input_data)
    
    with open(output_path, 'wb') as o:
        o.write(output_data)
    
    print(f"Successfully saved transparent image to {output_path}")
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
