import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { extname, parse } from 'path';

import { createWriteStream, existsSync, mkdirSync } from 'fs';


@Injectable()
export class FileMngService {

  saveImage(file: any, path: string) {
    if (!file) {
      throw new Error('No file uploaded');
    }
    let { originalname, buffer } = file;
    if (!buffer || buffer.length === 0) {
      throw new Error('Empty file buffer');
    }
    const fileName = parse(originalname).name.replace(/\s/g, '/') + "_" + Date.now() + extname(file.originalname);
    var filePath = `${path}/${fileName}`;
    if (!existsSync(`${path}`)) {
      mkdirSync(`${path}`);
    }
    const fileStream = createWriteStream(filePath);
    fileStream.on('error', (error) => {
      throw error;
    });
    fileStream.write(buffer);
    fileStream.end();

    // Don't want './' in front of it and want to match with front-end
    if (filePath[0] == '.' && filePath[1] == '/') {
      filePath = filePath.slice(2);
    }

    return filePath;
  }

  // delete file
  deleteFile(path: string) {
    try {
      fs.unlinkSync(path);
      //file removed
    } catch(err) {
      console.error(err)
    }
  }

  // replace file
  deleteAndAdd(olfFilePath: string, newFile: any, newPath: string) {
    this.deleteFile(olfFilePath);
    return this.saveImage(newFile, newPath);
  }
}
