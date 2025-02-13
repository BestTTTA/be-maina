
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class FormDataTransformPipe implements PipeTransform {
  transform(value: any) {
    // Convert lat to a number
    if (value.lat) {
      const parsedLat = parseFloat(value.lat);
      if (isNaN(parsedLat)) {
        throw new BadRequestException('lat must be a number');
      }
      value.lat = parsedLat;
    }
    // Convert lng to a number
    if (value.lng) {
      const parsedLng = parseFloat(value.lng);
      if (isNaN(parsedLng)) {
        throw new BadRequestException('lng must be a number');
      }
      value.lng = parsedLng;
    }
    // Ensure fee and difficulty are uppercase
    if (value.fee) {
      value.fee = value.fee.toUpperCase();
    }
    if (value.difficulty) {
      value.difficulty = value.difficulty.toUpperCase();
    }
    return value;
  }
}
