# scripts/make_sample_pdf.py — creates data/raw/sample.pdf to test PDFManager.
# Run from the project root:  python scripts/make_sample_pdf.py

from fpdf import FPDF, XPos, YPos

LINES = [
    "Introduction to RAG Systems",
    "RAG stands for Retrieval-Augmented Generation.",
    "It combines search with language model generation.",
]

pdf = FPDF()
pdf.add_page()
pdf.set_font("Helvetica", size=12)
for line in LINES:
    pdf.cell(0, 10, line, new_x=XPos.LMARGIN, new_y=YPos.NEXT)
pdf.output("data/raw/sample.pdf")
print("Created: data/raw/sample.pdf")
