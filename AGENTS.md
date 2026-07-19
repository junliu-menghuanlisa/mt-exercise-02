# AGENTS.md

## Cursor Cloud specific instructions

This repo contains two unrelated products (see `README.md` for the standard command sequence):

1. **PyTorch RNN language-model exercise** — a CLI train/generate pipeline (Python + PyTorch CPU).
2. **IAFPA 2026 A0 poster** — a single self-contained static file `index.html` (no build step). This is the focus of the poster branches.

The update script already creates the virtualenv (`venvs/torch3`), installs deps, clones the external tools into `tools/`, and downloads the required NLTK data. Activate the env with `source venvs/torch3/bin/activate`.

Non-obvious caveats:

- `scripts/install_packages.sh` does unguarded `git clone` into `tools/` and is NOT idempotent (it fails if `tools/moses-scripts` or `tools/pytorch-examples` already exist). The update script clones only when missing, so prefer the already-populated `tools/` rather than re-running that script.
- `scripts/preprocess.py` only runs `nltk.download('punkt')`, but NLTK 3.10 (installed here) also needs `punkt_tab` for `sent_tokenize`. The update script downloads both; without `punkt_tab`, `download_data.sh` fails during preprocessing.
- Training data is NOT fetched by the update script. Run `source venvs/torch3/bin/activate && ./scripts/download_data.sh` (needs internet: downloads Grimm tales from Project Gutenberg and links the bundled wikitext-2 corpus from `tools/pytorch-examples`).
- Training is CPU-only. `scripts/train.sh` runs 40 epochs on `data/grimm`; for a quick smoke test run `python main.py ... --epochs 1` from `tools/pytorch-examples/word_language_model`. `scripts/generate.sh` samples text from `models/model.pt` into `samples/sample`.
- Chinese variant: `python process_santi.py` uses `jieba` to build the `three_body` dataset under `tools/pytorch-examples/word_language_model/data/three_body`; point training `--data` at that directory.
- Poster: no server strictly required (`file://` works), but to view over HTTP run `python3 -m http.server 8000` from the repo root and open `http://localhost:8000/index.html`. It's an A0 print poster scaled down for on-screen preview.
- `venvs/`, `tools/`, `data/`, `models/`, `samples/` are generated during setup and are git-ignored.
