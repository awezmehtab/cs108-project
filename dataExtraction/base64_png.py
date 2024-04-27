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

base64_str = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA5ElEQVR4AaVTwQ3CMBDrBFXf/bYD0AWQ8qDvbMC32+SVFVggU8AusELxIUcYRYlAVLIa5Xx27nLpat9jmT0QCd/9+t0PU0LiTiSNtVwHJgTgCpGXAP62DowNteSeZCOdxZ0iH3t9ISDBC8iLrUXQsFgs7xcCSNoQOAIjBZ24O+6N5Gzq7K1hwE1OkRNOBho4iRs3Ad66HYE9Q0irmKxakvCiBaME2wIlIkuYE1CUAEEpYXJAWYK41JqoPRkhIk1sXKO4ta9RBykn6SBVhqtvjTIS3qNs4DpQbPj2XSQ5QWpQ/3vOTx/NNw2nGop1AAAAAElFTkSuQmCC"

import json

with open('images.json', 'r') as file:
    images = json.load(file)

for rater, img in images.items():
    base64_to_png(img, f'images/{rater.lower().replace(" ", "_")}.png')