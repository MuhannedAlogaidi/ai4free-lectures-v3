# ─────────────────────────────────────────────────────────────
# src/pdf_manager.py
# One job: read PDF files, extract text, save to processed/
# ─────────────────────────────────────────────────────────────

from pathlib import Path

from pypdf import PdfReader


class PDFManager:
    """Reads PDF files from data/raw/ and saves extracted text to data/processed/."""

    def __init__(self, raw_dir: str = "data/raw", processed_dir: str = "data/processed"):
        self.raw_dir = Path(raw_dir)
        self.processed_dir = Path(processed_dir)

    def read(self, filename: str) -> str:
        """Read a PDF from data/raw/ and return its full text."""
        filepath = self.raw_dir / filename

        if not filepath.exists():
            raise FileNotFoundError(f"PDF not found: {filepath}")

        reader = PdfReader(str(filepath))
        pages = [page.extract_text() for page in reader.pages]
        text = "\n".join(pages)

        print(f"  [PDFManager] Read {filename} — {len(reader.pages)} page(s)")
        return text

    def get_metadata(self, filename: str) -> dict:
        """Return metadata from a PDF file."""
        filepath = self.raw_dir / filename

        if not filepath.exists():
            raise FileNotFoundError(f"PDF not found: {filepath}")

        reader = PdfReader(str(filepath))
        return {
            "filename": filename,
            "pages": len(reader.pages),
            "metadata": reader.metadata,
        }

    def save_text(self, filename: str, text: str) -> Path:
        """Save extracted text to data/processed/ as a .txt file."""
        output_name = Path(filename).stem + "_extracted.txt"
        output_path = self.processed_dir / output_name

        with open(output_path, "w", encoding="utf-8") as f:
            f.write(text)

        print(f"  [PDFManager] Saved extracted text → {output_path}")
        return output_path

    def process(self, filename: str) -> Path:
        """Read a PDF and save its text in one call."""
        text = self.read(filename)
        return self.save_text(filename, text)


if __name__ == "__main__":
    # quick test when running this file directly
    manager = PDFManager()
    manager.process("sample.pdf")
