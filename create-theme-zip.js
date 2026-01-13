import { createWriteStream } from 'fs';
import { readdir, stat } from 'fs/promises';
import { join, relative } from 'path';
import { createGzip } from 'zlib';
import archiver from 'archiver';

const sourceDir = './kadence-child-theme';
const outputFile = 'beachhydrovac-kadence-child-v2-animated.zip';

async function createZip() {
  const fs = await import('fs');
  const path = await import('path');
  const { default: archiver } = await import('archiver');

  const output = fs.createWriteStream(outputFile);
  const archive = archiver('zip', { zlib: { level: 9 } });

  output.on('close', () => {
    console.log('✅ ZIP created:', archive.pointer() + ' bytes');
    console.log('File:', outputFile);
  });

  archive.on('error', (err) => {
    throw err;
  });

  archive.pipe(output);
  archive.directory(sourceDir, false);
  archive.finalize();
}

createZip();
