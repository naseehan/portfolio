const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Sprite Sheet Generator & Documenter for Pixel Cat Companion (v2)
 *
 * Design:
 * - Orange-and-white tabby cat with brown adventurer backpack, gold buckle, and red scarf.
 * - Consistent across all 36 frames.
 * - Source: 1024x1024 reference image with alpha-isolated background.
 * - Grid: 6 columns x 6 rows (36 frames total).
 * - Output: /public/images/pixel-cat-v2-spritesheet.png (960x960px, 160x160px per frame).
 */

const SPRITE_CONFIG = {
  assetPath: '/images/pixel-cat-v2-spritesheet.png',
  fullPath: path.join(__dirname, '..', 'public', 'images', 'pixel-cat-v2-spritesheet.png'),
  sheetWidth: 960,
  sheetHeight: 960,
  frameWidth: 160,
  frameHeight: 160,
  displayScale: 0.5, // 80x80px display
  columns: 6,
  rows: 6,
  animations: {
    idle: {
      row: 0,
      frames: 6,
      cols: [0, 1, 2, 3, 4, 5],
      interval: 180,
      loop: true,
      description: 'Breathing, looking around, ear twitch, happy blink, tail sway',
      coordinates: [
        { frame: 0, x: 0, y: 0, w: 160, h: 160 },
        { frame: 1, x: 160, y: 0, w: 160, h: 160 },
        { frame: 2, x: 320, y: 0, w: 160, h: 160 },
        { frame: 3, x: 480, y: 0, w: 160, h: 160 },
        { frame: 4, x: 640, y: 0, w: 160, h: 160 },
        { frame: 5, x: 800, y: 0, w: 160, h: 160 },
      ]
    },
    run: {
      row: 1,
      frames: 6,
      cols: [0, 1, 2, 3, 4, 5],
      interval: 95,
      loop: true,
      description: '6-frame full running gait with bobbing backpack and flowing red scarf',
      coordinates: [
        { frame: 0, x: 0, y: 160, w: 160, h: 160 },
        { frame: 1, x: 160, y: 160, w: 160, h: 160 },
        { frame: 2, x: 320, y: 160, w: 160, h: 160 },
        { frame: 3, x: 480, y: 160, w: 160, h: 160 },
        { frame: 4, x: 640, y: 160, w: 160, h: 160 },
        { frame: 5, x: 800, y: 160, w: 160, h: 160 },
      ]
    },
    sleep: {
      row: 2,
      frames: 6,
      cols: [0, 1, 2, 3, 4, 5],
      interval: 220,
      loop: true,
      description: 'Curled up sleeping loaf, gentle breathing, floating z letters',
      coordinates: [
        { frame: 0, x: 0, y: 320, w: 160, h: 160 },
        { frame: 1, x: 160, y: 320, w: 160, h: 160 },
        { frame: 2, x: 320, y: 320, w: 160, h: 160 },
        { frame: 3, x: 480, y: 320, w: 160, h: 160 },
        { frame: 4, x: 640, y: 320, w: 160, h: 160 },
        { frame: 5, x: 800, y: 320, w: 160, h: 160 },
      ]
    },
    jump: {
      row: 3,
      frames: 6,
      cols: [0, 1, 2, 3, 4, 5],
      interval: 130,
      loop: false,
      description: 'Anticipation crouch, launch upward, apex float, descent, touchdown, recovery',
      coordinates: [
        { frame: 0, x: 0, y: 480, w: 160, h: 160 },
        { frame: 1, x: 160, y: 480, w: 160, h: 160 },
        { frame: 2, x: 320, y: 480, w: 160, h: 160 },
        { frame: 3, x: 480, y: 480, w: 160, h: 160 },
        { frame: 4, x: 640, y: 480, w: 160, h: 160 },
        { frame: 5, x: 800, y: 480, w: 160, h: 160 },
      ]
    },
    roll: {
      row: 4,
      frames: 6,
      cols: [0, 1, 2, 3, 4, 5],
      interval: 150,
      loop: false,
      description: 'Playful flop, roll onto back, paws up wiggling, tummy rubs, roll recovery',
      coordinates: [
        { frame: 0, x: 0, y: 640, w: 160, h: 160 },
        { frame: 1, x: 160, y: 640, w: 160, h: 160 },
        { frame: 2, x: 320, y: 640, w: 160, h: 160 },
        { frame: 3, x: 480, y: 640, w: 160, h: 160 },
        { frame: 4, x: 640, y: 640, w: 160, h: 160 },
        { frame: 5, x: 800, y: 640, w: 160, h: 160 },
      ]
    },
    stretch: {
      row: 5,
      frames: 4,
      cols: [0, 1, 2, 3],
      interval: 200,
      loop: false,
      description: 'Attentive sit, downward dog stretch, deep cat stretch, recovery',
      coordinates: [
        { frame: 0, x: 0, y: 800, w: 160, h: 160 },
        { frame: 1, x: 160, y: 800, w: 160, h: 160 },
        { frame: 2, x: 320, y: 800, w: 160, h: 160 },
        { frame: 3, x: 480, y: 800, w: 160, h: 160 },
      ]
    },
    surprised: {
      row: 5,
      startFrame: 4,
      frames: 2,
      cols: [4, 5],
      interval: 220,
      loop: false,
      description: 'Open-mouth cheerful meow, alert perk with surprise exclamation marks',
      coordinates: [
        { frame: 0, x: 640, y: 800, w: 160, h: 160 },
        { frame: 1, x: 800, y: 800, w: 160, h: 160 },
      ]
    }
  }
};

function main() {
  console.log('=== Pixel Cat Companion v2 Sprite Sheet Generator ===');
  const psScriptPath = path.join(__dirname, 'build-cat-spritesheet-v2.ps1');

  if (process.platform === 'win32' && fs.existsSync(psScriptPath)) {
    console.log('Executing PowerShell build script:', psScriptPath);
    try {
      const output = execSync(`powershell -ExecutionPolicy Bypass -File "${psScriptPath}"`, { encoding: 'utf8' });
      console.log(output.trim());
    } catch (err) {
      console.error('Error building sprite sheet via PowerShell:', err.message);
    }
  }

  if (fs.existsSync(SPRITE_CONFIG.fullPath)) {
    const stats = fs.statSync(SPRITE_CONFIG.fullPath);
    console.log('\nVerified Sprite Sheet Asset:');
    console.log(`- Path: ${SPRITE_CONFIG.assetPath}`);
    console.log(`- Full Path: ${SPRITE_CONFIG.fullPath}`);
    console.log(`- File Size: ${(stats.size / 1024).toFixed(1)} KB`);
    console.log(`- Dimensions: ${SPRITE_CONFIG.sheetWidth}x${SPRITE_CONFIG.sheetHeight} px`);
    console.log(`- Frame Size: ${SPRITE_CONFIG.frameWidth}x${SPRITE_CONFIG.frameHeight} px`);
    console.log(`- Grid: ${SPRITE_CONFIG.columns} cols x ${SPRITE_CONFIG.rows} rows (36 frames)`);
    console.log('\nAnimation Mapping:');
    for (const [key, anim] of Object.entries(SPRITE_CONFIG.animations)) {
      console.log(`  [${key.toUpperCase()}] Row ${anim.row}, Frames: ${anim.frames}, Interval: ${anim.interval}ms, Loop: ${anim.loop}`);
      console.log(`    Description: ${anim.description}`);
      console.log(`    Coordinates: [${anim.coordinates.map(c => `(${c.x}, ${c.y})`).join(', ')}]`);
    }
  } else {
    console.warn('Sprite sheet file not found at:', SPRITE_CONFIG.fullPath);
  }
}

if (require.main === module) {
  main();
}

module.exports = SPRITE_CONFIG;
