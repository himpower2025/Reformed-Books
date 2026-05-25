const sharp = require('sharp');
const path = require('path');

async function removeBackground() {
  try {
    // 원본 이미지 읽기
    const inputPath = path.join(__dirname, '../public/logo-original.png');
    const outputPath = path.join(__dirname, '../public/logo-transparent.png');

    // 이미지 처리
    const image = sharp(inputPath);
    const { data, info } = await image
      .raw()
      .toBuffer({ resolveWithObject: true });

    // 베이지색 배경을 투명하게 변환
    const imageData = Buffer.from(data);
    
    for (let i = 0; i < imageData.length; i += info.channels) {
      const r = imageData[i];
      const g = imageData[i + 1];
      const b = imageData[i + 2];

      // 베이지색 감지 (R > 200, G > 195, B > 190)
      if (r > 200 && g > 195 && b > 190) {
        // 알파값을 0으로 설정하여 투명하게 만듦
        if (info.channels === 4) {
          imageData[i + 3] = 0;
        }
      }
    }

    // 투명한 배경으로 새 이미지 생성
    await sharp(imageData, {
      raw: {
        width: info.width,
        height: info.height,
        channels: info.channels,
      },
    })
      .png()
      .toFile(outputPath);

    console.log('✓ 배경 제거 완료: logo-transparent.png');
  } catch (error) {
    console.error('오류:', error.message);
    process.exit(1);
  }
}

removeBackground();
