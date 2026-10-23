# ─────────────────────────────────────────────────────────────
# src/csv_manager.py
# One job: read and write CSV files, convert to usable formats
# Uses Python's built-in csv module — no extra install needed
# ─────────────────────────────────────────────────────────────

import csv
from pathlib import Path


class CSVManager:
    """Reads and writes CSV files from data/raw/ and data/processed/."""

    def __init__(self, raw_dir: str = "data/raw", processed_dir: str = "data/processed"):
        self.raw_dir = Path(raw_dir)
        self.processed_dir = Path(processed_dir)

    def read(self, filename: str) -> list[dict]:
        """Read a CSV from data/raw/ and return a list of dicts."""
        filepath = self.raw_dir / filename

        if not filepath.exists():
            raise FileNotFoundError(f"CSV not found: {filepath}")

        rows = []
        with open(filepath, "r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                rows.append(dict(row))

        print(f"  [CSVManager] Read {filename} — {len(rows)} row(s)")
        return rows

    def write(self, filename: str, rows: list[dict]) -> Path:
        """Write a list of dicts to data/processed/ as a CSV."""
        if not rows:
            raise ValueError("Cannot write empty data to CSV.")

        output_path = self.processed_dir / filename
        fieldnames = list(rows[0].keys())

        with open(output_path, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(rows)

        print(f"  [CSVManager] Saved {len(rows)} row(s) → {output_path}")
        return output_path

    def get_column(self, filename: str, column: str) -> list:
        """Extract a single column from a CSV as a list."""
        rows = self.read(filename)
        if not rows or column not in rows[0]:
            raise KeyError(f"Column '{column}' not found in {filename}")
        return [row[column] for row in rows]

    def filter_rows(self, filename: str, column: str, value: str) -> list[dict]:
        """Return only rows where column matches value."""
        rows = self.read(filename)
        filtered = [row for row in rows if row.get(column) == value]
        print(f"  [CSVManager] Filter '{column}={value}' → {len(filtered)} row(s)")
        return filtered


if __name__ == "__main__":
    # quick test when running this file directly
    manager = CSVManager()
    rows = manager.read("sample.csv")
    for row in rows:
        print(f"  {row['id']}: {row['title']}")
