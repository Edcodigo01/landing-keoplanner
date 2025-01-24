import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import moment from 'moment';
import 'moment/locale/es';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsUtils {
  public intervalSearch: any;

  constructor(@Inject(DOCUMENT) private document: Document) {
    moment.locale('es');
  }

  public onlyTextTypeUsername(event: any) {
    event.target.value = event.target.value.trim();

    let regex = /^[a-zA-Z\u00C0-\u017F0123456789]+$/;
    if (
      regex.test(event.key) ||
      event.key === 'Backspace' ||
      event.key === 'ArrowRight' ||
      event.key === 'ArrowLeft' ||
      event.key === 'Tab' ||
      event.key === 'Delete'
    ) {
      return true;
    } else {
      return false;
    }
  }

  public onlyTextEmail(event: any) {
    event.target.value = event.target.value.trim();

    let regex = /^[a-zA-Z\u00C0-\u017F0123456789.!#$'*+/=?^@_`{|}~-]+$/;
    if (
      regex.test(event.key) ||
      event.key === 'Backspace' ||
      event.key === 'ArrowRight' ||
      event.key === 'ArrowLeft' ||
      event.key === 'Tab' ||
      event.key === 'Delete'
    ) {
      return true;
    } else {
      return false;
    }
  }

  public onlyTextAndSpaces(event: any) {
    event.target.value = event.target.value.trimStart();
    event.target.value = event.target.value.replace(
      /[`1234567890`~!°@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi,
      ''
    );
    if (event.key === '-' && event.target.value.length === 1) {
      event.target.value = '';
    }
    let regex = /^[a-zA-Z\u00C0-\u017F -]+$/;
    if (
      regex.test(event.key) ||
      event.key === 'Backspace' ||
      event.key === 'ArrowRight' ||
      event.key === 'ArrowLeft' ||
      event.key === 'Tab' ||
      event.key === 'Delete'
    ) {
      return true;
    } else {
      return false;
    }
  }

  public onlyTextNumberAndSpaces(event: any) {
    event.target.value = event.target.value.trimStart();
    event.target.value = event.target.value.replace(
      /[`~!°@#$%^*()|\=?;:",<>\{\}\[\]\\\/]/gi,
      ''
    );

    let regex = /^[a-zA-Z\u00C0-\u017F0123456789 +_&-.']+$/;
    if (
      regex.test(event.key) ||
      event.key === 'Backspace' ||
      event.key === 'ArrowRight' ||
      event.key === 'ArrowLeft' ||
      event.key === 'Tab' ||
      event.key === 'Delete'
    ) {
      return true;
    } else {
      return false;
    }
  }

  public onlyTextNumber(event: any) {
    event.target.value = event.target.value.trim();
    event.target.value = event.target.value.replace(
      /[`~!°@#$%^*()|\=?;':",_+.<>\{\}\[\]\\\/]/gi,
      ''
    );
    if (event.key === '-' && event.target.value.length === 1) {
      event.target.value = '';
    }
    let regex = /^[a-zA-Z\u00C0-\u017F0123456789.-]+$/;
    if (
      regex.test(event.key) ||
      event.key === 'Backspace' ||
      event.key === 'ArrowRight' ||
      event.key === 'ArrowLeft' ||
      event.key === 'Tab' ||
      event.key === 'Delete'
    ) {
      return true;
    } else {
      return false;
    }
  }

  public onlyNumberAndPoints(
    event: any,
    validpoint: boolean = false,
    validcoma: boolean = false
  ) {
    event.target.value = event.target.value.trim();
    let regex =
      validpoint && !validcoma
        ? /^[0-9\.]$/
        : !validpoint && validcoma
        ? /^[0-9\,]$/
        : validpoint && validcoma
        ? /^[0-9\,.]$/
        : /^[0-9]$/;
    if (
      regex.test(event.key) ||
      event.key === 'Backspace' ||
      event.key === 'ArrowRight' ||
      event.key === 'ArrowLeft' ||
      event.key === 'Tab' ||
      event.key === 'Delete'
    ) {
      if (validpoint && !validcoma) {
        if (event.target.value.includes('.') && event.key === '.') {
          return false;
        } else {
          return true;
        }
      } else if (!validpoint && validcoma) {
        return true;
      } else if (validpoint && validcoma) {
        if (event.target.value.includes('.') && event.key === '.') {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  public compressImage(file: any, percentageQuality: number = 60) {
    return new Promise((resolve, reject) => {
      const _cnvs = this.document.createElement('canvas');
      const _img = new Image();
      const _pQuality = percentageQuality / 100;

      _img.onload = () => {
        _cnvs.width = _img.width;
        _cnvs.height = _img.height;
        _cnvs.getContext('2d')?.drawImage(_img, 0, 0);
        _cnvs.toBlob(
          (blob) => {
            if (blob === null) {
              return reject(blob);
            } else {
              resolve(blob);
            }
          },
          'image/jpeg',
          _pQuality
        );
      };

      _img.src = file;
    });
  }

  public blobToBase64(blob: Blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  public generateColorHex() {
    const character: string = '0123456789ABCDEF';
    let color: string = '#';

    for (let i = 0; i < 6; i++) {
      color = `${color}${character[Math.floor(Math.random() * 16)]}`;
    }

    return color;
  }

  public generateVoucherID(id: number, length: number) {
    let numberOutput = Math.abs(id);
    let _length = id.toString().length;
    let zero = '0';

    if (length <= _length) {
      if (id < 0) {
        return '-' + numberOutput.toString();
      } else {
        return numberOutput.toString();
      }
    } else {
      if (id < 0) {
        return '-' + zero.repeat(length - _length) + numberOutput.toString();
      } else {
        return zero.repeat(length - _length) + numberOutput.toString();
      }
    }
  }

  public changeTitleNoGoodBye(title: string) {
    let oldTitle = title;

    window.addEventListener('blur', () => {
      this.document.title = '¡No te vayas! ¡Vuelve! 😱';
    });

    window.addEventListener('focus', () => {
      this.document.title = oldTitle;
    });
  }

  public hiddenOptions(id: number): boolean {
    return id === 365;
  }
}
