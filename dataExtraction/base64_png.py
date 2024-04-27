import base64
import io
from PIL import Image

def base64_to_png(base64_string, output_file):
  # Remove the "data:image/png;base64," part
  base64_string = base64_string.split(",")[1]

  # Decode the base64 string
  image_data = base64.b64decode(base64_string)

  # Create a BytesIO object to hold the image data
  image_stream = io.BytesIO(image_data)

  # Open the image using PIL
  image = Image.open(image_stream)

  # Save the image as PNG
  image.save(output_file, "PNG")


import json

with open('sp_images.json', 'r') as file:
    images = json.load(file)

for rater, img in images.items():
    base64_to_png(img, f'sp_images/{rater.lower().replace(" ", "_")}.png')