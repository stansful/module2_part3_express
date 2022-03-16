import { NextFunction, Request, Response } from 'express';
import { Gallery, Position } from './gallery_interface';
import { config } from '../config/config';
import { ExceptionService } from '../exception/exceptions_service';
import { fsService } from '../fs/fs_service';
import path from 'path';

class GalleryService {
  private readonly limit: number;
  private readonly picturesPath: string;
  private readonly uploadsPath: string;

  constructor() {
    this.limit = config.DEFAULT_PICTURE_LIMIT;
    this.picturesPath = config.static.path.pictures;
    this.uploadsPath = config.static.path.uploads;
  }

  private checkPageBorders(page: number, total: number) {
    const isValid = page > 0 && page <= total;
    if (!isValid) {
      throw ExceptionService.BadRequest(`Page should be greater than 0 and less than ${total}`);
    }
  }

  private calculateCopyPositions(requestPage: number): Position {
    const offset = requestPage === 1 ? requestPage : (requestPage - 1) * this.limit;
    const start = requestPage === 1 ? 0 : offset;
    const end = start + this.limit;
    return { start, end };
  }

  private async getAllPictures() {
    return fsService.readdir(this.picturesPath);
  }

  private async getTotalPages() {
    const allPictures = await this.getAllPictures();
    return Math.ceil(allPictures.length / this.limit);
  }

  private async prepareRequiredPictures(startPosition: number, endPosition: number) {
    const pictures = await this.getAllPictures();
    return pictures.slice(startPosition, endPosition).map((pictureName) => {
      return `${config.env.PROTOCOL}://${config.env.DOMAIN}:${config.env.PORT}/${pictureName}`;
    });
  }

  private createSendingObject(picturesPath: string[], requestPage: number, totalPages: number): Gallery {
    return { objects: picturesPath, page: requestPage, total: totalPages };
  }

  public async getRequiredPictures(req: Request, res: Response, next: NextFunction) {
    const requestPage = Number(req.query.page) || 1;
    const position = this.calculateCopyPositions(requestPage);
    const totalPages = await this.getTotalPages();
    try {
      this.checkPageBorders(requestPage, totalPages);
      const requiredPictures = await this.prepareRequiredPictures(position.start, position.end);
      const sendingObject = this.createSendingObject(requiredPictures, requestPage, totalPages);
      res.json(sendingObject);
    } catch (error) {
      next(error);
    }
  }

  private checkIncomingFile(req: Request) {
    if (!req.file) {
      throw ExceptionService.BadRequest('File missing');
    }

    if (req.file.mimetype !== 'image/jpeg') {
      throw ExceptionService.BadRequest('Unfortunately we support only jpeg extension');
    }
  }

  private async createUploadFolderIfNotExist() {
    try {
      await fsService.checkExistFolder(this.uploadsPath);
    } catch (e) {
      await fsService.makeDirectory(this.uploadsPath, { recursive: true });
    }
  }

  public async createPicture(req: Request, res: Response, next: NextFunction) {
    const picturePath = req.file?.path || '';
    const filename = req.file?.filename || '';
    const fileOriginalName = req.file?.originalname || '';
    const newFilePath = path.join(this.picturesPath, filename + fileOriginalName);

    await this.createUploadFolderIfNotExist();

    try {
      this.checkIncomingFile(req);
      await fsService.moveFile(picturePath, newFilePath);
      res.end();
    } catch (e) {
      next(e);
    }
  }
}

const galleryService = new GalleryService();

export const getRequiredPictures = (req: Request, res: Response, next: NextFunction) => {
  return galleryService.getRequiredPictures(req, res, next);
};
export const createPicture = (req: Request, res: Response, next: NextFunction) => {
  return galleryService.createPicture(req, res, next);
};
