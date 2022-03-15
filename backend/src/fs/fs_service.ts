import fsPromises from 'fs/promises';
import { ObjectEncodingOptions, PathLike } from 'fs';
import * as fs from 'fs';

class FsService {
  public async appendFile(
    filePath: PathLike | fsPromises.FileHandle,
    data: string | Uint8Array,
    options?: (ObjectEncodingOptions & fsPromises.FlagAndOpenMode) | BufferEncoding | null | undefined,
  ): Promise<void> {
    await fsPromises.appendFile(filePath, data, options);
  }

  public async checkExistFolder(path: PathLike): Promise<boolean> {
    return new Promise((resolve, reject) => {
      fs.exists(path, (exist) => {
        if (exist) {
          return resolve(exist);
        }
        reject(exist);
      });
    });
  }

  public async makeDirectory(path: PathLike, options?: fs.MakeDirectoryOptions) {
    return fsPromises.mkdir(path, options);
  }
}

export const fsService = new FsService();