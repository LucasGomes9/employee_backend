import fs from 'fs';
import path from 'path';

const imagesFolder = path.resolve(__dirname, '..', '..', 'tmp');

async function deleteAvatar(filename: string): Promise<void> {
  const avatarPath = path.join(imagesFolder, filename);
  await fs.promises.unlink(avatarPath);
}

export default deleteAvatar;
