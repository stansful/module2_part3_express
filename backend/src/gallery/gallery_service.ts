import fs from 'fs/promises';
import { Request, Response } from 'express';
import { Gallery, Position } from './gallery_interface';
import { config } from '../configs/config';
import { responseService } from '../response/response_service';
import { tokenService } from '../token/token_service';

class GalleryService {
  limit: number;
  picturesPath: string;

  constructor() {
    this.limit = config.DEFAULT_PICTURE_LIMIT;
    this.picturesPath = config.static.path.pictures;
  }

  private static checkToken(token: string) {
    const isValid = tokenService.verifyToken(token);
    if (!isValid) {
      throw new Error('Token is not valid');
    }
  }

  private static checkPageBorders(page: number, total: number) {
    const isValid = page > 0 && page <= total;
    if (!isValid) {
      throw new Error('Page is not valid');
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

  public async sendRequiredPictures(req: Request, res: Response) {
    const token = req.headers.authorization || '';
    const requestPage = Number(req.query.page) || 1;
    const position = this.calculateCopyPositions(requestPage);
    const totalPages = await this.getTotalPages();
    try {
      GalleryService.checkToken(token);
      GalleryService.checkPageBorders(requestPage, totalPages);
      const requiredPictures = await this.getRequiredPictures(position.start, position.end);
      const sendingObject = this.createSendingObject(requiredPictures, requestPage, totalPages);
      responseService.galleryObjects<Gallery>(res, sendingObject);
    } catch (error) {
      responseService.badRequest(res, totalPages);
    }
  }
}

const saveContext = (req: Request, res: Response) => {
  const galleryService = new GalleryService();
  return galleryService.sendRequiredPictures(req, res);
};

export const galleryService = saveContext;
