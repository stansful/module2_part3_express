import fs from 'fs/promises';
import { NextFunction, Request, Response } from 'express';
import { Gallery, Position } from './gallery_interface';
import { config } from '../configs/config';
import { ExceptionService } from '../exception/exceptions_service';

class GalleryService {
  private readonly limit: number;
  private readonly picturesPath: string;

  constructor() {
    this.limit = config.DEFAULT_PICTURE_LIMIT;
    this.picturesPath = config.static.path.pictures;
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

  private async getTotalPages() {
    const allPictures = await this.getAllPictures();
    return Math.ceil(allPictures.length / this.limit);
  }

  private async getAllPictures() {
    return fs.readdir(this.picturesPath);
  }

  private async getRequiredPictures(startPosition: number, endPosition: number) {
    const pictures = await this.getAllPictures();
    return pictures.slice(startPosition, endPosition).map((pictureName) => {
      return `${config.env.PROTOCOL}://${config.env.DOMAIN}:${config.env.PORT}/${pictureName}`;
    });
  }

  private createSendingObject(picturesPath: string[], requestPage: number, totalPages: number): Gallery {
    return { objects: picturesPath, page: requestPage, total: totalPages };
  }

  public async sendRequiredPictures(req: Request, res: Response, next: NextFunction) {
    const requestPage = Number(req.query.page) || 1;
    const position = this.calculateCopyPositions(requestPage);
    const totalPages = await this.getTotalPages();
    try {
      this.checkPageBorders(requestPage, totalPages);
      const requiredPictures = await this.getRequiredPictures(position.start, position.end);
      const sendingObject = this.createSendingObject(requiredPictures, requestPage, totalPages);
      res.json(sendingObject);
    } catch (error) {
      next(error);
    }
  }
}

const saveContext = (req: Request, res: Response, next: NextFunction) => {
  const galleryService = new GalleryService();
  return galleryService.sendRequiredPictures(req, res, next);
};

export const galleryService = saveContext;
