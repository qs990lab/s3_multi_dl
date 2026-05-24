#!/bin/bash
set -e

VERSION=$(grep '"version"' s3_multi_dl/manifest.json | grep -o '[0-9.]*')
OUTPUT="s3-multi-dl-${VERSION}.zip"

rm -f "$OUTPUT"
cd s3_multi_dl
zip -r "../$OUTPUT" . --exclude '*.DS_Store'
cd ..

echo "Created: $OUTPUT"
