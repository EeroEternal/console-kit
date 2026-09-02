#!/usr/bin/env bash
set -euo pipefail

if [ $# -lt 1 ]; then
    echo "Usage: ./init-project.sh <target-directory-or-new-project-name>"
    echo "Example: ./init-project.sh ../my-new-ai-gateway"
    exit 1
fi

TARGET_DIR="$1"
PROJECT_NAME="$(basename "$TARGET_DIR")"
# convert to valid rust crate name (replace hyphens with underscores if needed, or keep for package name)
CRATE_NAME="${PROJECT_NAME//-/_}"

echo "=========================================="
echo "Initializing new project from console-kit: $PROJECT_NAME"
echo "Target Directory: $TARGET_DIR"
echo "=========================================="

if [ -d "$TARGET_DIR" ] && [ "$(ls -A "$TARGET_DIR" 2>/dev/null)" ]; then
    echo "Warning: Target directory $TARGET_DIR already exists and is not empty."
    read -p "Continue anyway? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Aborted."
        exit 1
    fi
fi

mkdir -p "$TARGET_DIR"

# Copy console-kit (excluding git history and target build artifacts)
rsync -av --exclude='.git' --exclude='target' --exclude='init-project.sh' ./ "$TARGET_DIR/"

cd "$TARGET_DIR"

# Replace project names in Cargo.toml and files
if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' "s/name = \"console-kit\"/name = \"$PROJECT_NAME\"/g" Cargo.toml
    sed -i '' "s/console_kit/$CRATE_NAME/g" src/main.rs tests/server_test.rs 2>/dev/null || true
else
    sed -i "s/name = \"console-kit\"/name = \"$PROJECT_NAME\"/g" Cargo.toml
    sed -i "s/console_kit/$CRATE_NAME/g" src/main.rs tests/server_test.rs 2>/dev/null || true
fi

# Initialize fresh git repository if not already initialized
if [ ! -d ".git" ]; then
    git init
    git branch -M main
fi

echo "=========================================="
echo "Successfully created $PROJECT_NAME!"
echo "Copied three layers:"
echo "  kit (required): admin/src/components/ui + layout + common + index.css + docs/design"
echo "  examples (optional): admin/src/pages + lib/nav.ts"
echo "  backend: src/ + tests/"
echo "Upgrade kit later with:  <console-kit>/scripts/sync-admin-kit.sh $TARGET_DIR"
echo "Next steps:"
echo "  1. cd $TARGET_DIR"
echo "  2. cargo check --tests"
echo "  3. cd admin && npm install && npm run dev"
echo "=========================================="
