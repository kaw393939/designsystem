# Audio Production Notes

## Purpose

Record the currently usable TTS path for the site media layer and the immediate rules for publishing long-form audio companions.

## Current command status

### Active path

Use `eai speak` with OpenAI TTS.

Confirmed useful options:

1. file input via `--input`
2. voices including `nova`, `alloy`, and `sage`
3. models `tts-1` and `tts-1-hd`
4. output formats including `mp3`, `flac`, and `wav`
5. pacing and pronunciation via `--instructions`

### Inactive optional path

`eai elevenlabs` exists, but the current environment does not have an ElevenLabs API key configured.

Treat ElevenLabs as optional future enhancement rather than as the active default.

## Working audio rules

1. publish nothing without a transcript
2. rewrite for speech instead of reading page prose unchanged
3. chapter any audio longer than 6 minutes
4. use one consistent primary narration voice for the public site
5. pair every longer audio item with a diagram, board, or note map

## Recommended defaults

### Main explainers

- Voice: `nova`
- Model: `tts-1-hd`
- Format: `mp3`

### Reflective formation pieces

- Voice: `sage`
- Model: `tts-1-hd`
- Format: `mp3`

### Quick utility clips

- Voice: `alloy`
- Model: `tts-1`
- Format: `mp3`

## Example command

```bash
eai speak --input script.txt --output lesson.mp3 --voice nova --model tts-1-hd --format mp3 --instructions "Speak clearly, slightly slower than normal, with calm instructional pacing and light emphasis on key terms."
```

## First audio slate

1. home orientation clip
2. why-now overview
3. formation overview
4. archetype atlas intro
5. trust and proof overview
6. publish and deployment overview
