import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, '../public/assets');

const processDirectory = (dir) => {
    if (!fs.existsSync(dir)) return;

    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            processDirectory(filePath);
        } else {
            const ext = path.extname(file).toLowerCase();
            if (['.jpg', '.jpeg', '.png'].includes(ext)) {
                // Determine output path
                const outputFilePath = filePath.replace(new RegExp(ext + '$'), '.webp');

                console.log(`Optimizing: ${file} -> ${path.basename(outputFilePath)}`);

                sharp(filePath)
                    .resize({ width: 1920, withoutEnlargement: true })
                    .webp({ quality: 80 })
                    .toFile(outputFilePath)
                    .then(info => {
                        console.log(`  Done: ${info.size} bytes`);
                    })
                    .catch(err => {
                        console.error(`  Error processing ${file}:`, err);
                    });
            }
        }
    });
};

processDirectory(inputDir);
