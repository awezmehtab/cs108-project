import json
import csv
import sys

def json_to_csv(json_file, csv_file):
    with open(json_file, 'r') as jf:
        data = json.load(jf)

    with open(csv_file, 'w', newline='') as cf:
        writer = csv.DictWriter(cf, fieldnames=data[0].keys())
        writer.writeheader()
        for row in data:
            writer.writerow(row)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python jsonToPy.py <input_json_file> <output_csv_file>")
        sys.exit(1)

    json_file = sys.argv[1]
    csv_file = sys.argv[2]

    json_to_csv(json_file, csv_file)