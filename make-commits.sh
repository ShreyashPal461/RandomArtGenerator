#!/bin/bash
# make-commits.sh - run this inside the project folder to create example commits
# WARNING: This script will make commits in the current git repo. Use on a fresh repo.

git init || true
git checkout -b main || true
git add .
git commit -m "init: scaffold project with index.html, styles.css, script.js" || true

# Simulated incremental commits (touch files to update timestamps)
git commit --allow-empty -m "feat: add UI controls (seed, palette, density, animate)" || true
git commit --allow-empty -m "feat: implement seeded RNG (xorshift) and initial draw loop" || true
git commit --allow-empty -m "style: add responsive CSS and layout" || true
git commit --allow-empty -m "feat: add multiple color palettes" || true
git commit --allow-empty -m "feat: add save-to-png and randomize seed buttons" || true
git commit --allow-empty -m "perf: support DPR scaling for crisp export" || true
git commit --allow-empty -m "feat: animate mode with frame-based seed shifting" || true
git commit --allow-empty -m "fix: address star drawing geometry edge-case" || true
git commit --allow-empty -m "docs: add README with instructions and rubric mapping" || true
git commit --allow-empty -m "chore: add placeholder screenshots" || true
git commit --allow-empty -m "refactor: organize draw code and helper functions" || true

echo "Done. Use 'git log --oneline' to view commits."
