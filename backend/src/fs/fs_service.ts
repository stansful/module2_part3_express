import fsPromises from 'fs/promises';
import fs, { ObjectEncodingOptions, PathLike } from 'fs';

class FsService {
  public async appendFile(
    filePath: PathLike | fsPromises.FileHandle,
    data: string | Uint8Array,
    options?: ObjectEncodingOptions & fsPromises.FlagAndOpenMode,
  ) {
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

  public async readdir(path: PathLike, options?: fs.ObjectEncodingOptions) {
    return fsPromises.readdir(path, options);
  }

  public async moveFile(oldPath: PathLike, newPath: PathLike) {
    await fsPromises.rename(oldPath, newPath);
  }
}

export const fsService = new FsService();
