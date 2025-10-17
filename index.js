// ...existing code...
import { nodewhisper } from 'nodejs-whisper';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
// ...existing code...

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// resolve audio path relative to the script
const audioPath = path.resolve(__dirname, 'audio1.wav');

async function transcribeAudio() {
  try {
    if (!fs.existsSync(audioPath)) {
      console.error(`[ERROR] File not found: ${audioPath}`);
      process.exit(1);
    }

    const transcript = await nodewhisper(audioPath, {
        modelName: 'base.en',
        removeWavFileAfterTranscription: true,
        autoDownloadModelName: 'base.en',
        withCuda: false,
        logger: console,
        whisperOptions: {
            outputInCsv: false,
            outputInJson: false,
            outputInJsonFull: false,
            outputInLrc: false,
            outputInSrt: true,
            outputInText: true,
            outputInVtt: false,
            outputInWords: false,
            translateToEnglish: false,
            wordTimestamps: false,
            timestamps_length: 20,
            splitOnWord: true,
        },
    });
    console.log('Transcription Result:', transcript);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

transcribeAudio();
// ...existing code...