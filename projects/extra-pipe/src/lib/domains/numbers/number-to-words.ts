const units: Readonly<Record<string, readonly string[]>> = {
    en: [
      '',
      'One',
      'Two',
      'Three',
      'Four',
      'Five',
      'Six',
      'Seven',
      'Eight',
      'Nine',
    ],
    fr: [
      '',
      'Un',
      'Deux',
      'Trois',
      'Quatre',
      'Cinq',
      'Six',
      'Sept',
      'Huit',
      'Neuf',
    ],
  };

const teens: Readonly<Record<string, readonly string[]>> = {
    en: [
      '',
      'Eleven',
      'Twelve',
      'Thirteen',
      'Fourteen',
      'Fifteen',
      'Sixteen',
      'Seventeen',
      'Eighteen',
      'Nineteen',
    ],
    fr: [
      '',
      'Onze',
      'Douze',
      'Treize',
      'Quatorze',
      'Quinze',
      'Seize',
      'Dix-sept',
      'Dix-huit',
      'Dix-neuf',
    ],
  };

const tens: Readonly<Record<string, readonly string[]>> = {
    en: [
      '',
      'Ten',
      'Twenty',
      'Thirty',
      'Forty',
      'Fifty',
      'Sixty',
      'Seventy',
      'Eighty',
      'Ninety',
    ],
    fr: [
      '',
      'Dix',
      'Vingt',
      'Trente',
      'Quarante',
      'Cinquante',
      'Soixante',
      'Soixante-dix',
      'Quatre-vingts',
      'Quatre-vingt-dix',
    ],
  };

const languageStrings: Readonly<Record<string, Readonly<{ tooLarge: string; billion: string; million: string; thousand: string; hundred: string; ten: string }>>> = {
    en: {
      tooLarge: 'Number is too large to convert',
      billion: 'Billion',
      million: 'Million',
      thousand: 'Thousand',
      hundred: 'Hundred',
      ten: 'Ten',
    },
    fr: {
      tooLarge: 'Le nombre est trop grand pour être converti',
      billion: 'Milliard',
      million: 'Million',
      thousand: 'Mille',
      hundred: 'Cent',
      ten: 'Dix',
    },
  };

const largeNumbers = {
    maxNumber: 999999999999,
    billion: 1000000000,
    million: 1000000,
    thousand: 1000,
    hundred: 100,
    ten: 10,
  };

/** Legacy English/French word conversion, kept separate from Angular adapters. */
export function convertNumberToWords(num: number, lang: string): string {
    
    const { tooLarge, billion, million, thousand, hundred } =
      languageStrings[lang];

    if (num > largeNumbers.maxNumber) {
      return tooLarge;
    }

    if (num === 0) {
      return 'Zero';
    }

    let result = '';

    if (num >= largeNumbers.billion) {
      result +=
        convertNumberToWords(Math.floor(num / largeNumbers.billion), lang) +
        ' ' +
        billion +
        ' ';
      num %= largeNumbers.billion;
    }

    if (num >= largeNumbers.million) {
      result +=
        convertNumberToWords(Math.floor(num / largeNumbers.million), lang) +
        ' ' +
        million +
        ' ';
      num %= largeNumbers.million;
    }

    if (num >= largeNumbers.thousand) {
      const thousands = Math.floor(num / largeNumbers.thousand);

      switch (lang) {
        case 'fr':
          if (thousands === 1) {
            result += 'Mille ';
          } else if (thousands > 1) {
            result +=
              convertNumberToWords(
                Math.floor(num / largeNumbers.thousand),
                lang
              ) + ' Mille ';
          }
          num %= largeNumbers.thousand;
          break;
        case 'en':
          result +=
            convertNumberToWords(Math.floor(num / largeNumbers.thousand), lang) +
            ' ' +
            thousand +
            ' ';
          num %= largeNumbers.thousand;
          break;
      }
    }

    if (num >= largeNumbers.hundred) {
      const hundreds = Math.floor(num / largeNumbers.hundred);

      switch (lang) {
        case 'fr':
          if (hundreds === 1) {
            result += 'Cent ';
          } else if (hundreds > 1) {
            result += units[lang][hundreds] + ' Cent ';
          }
          num %= largeNumbers.hundred;
          break;
        case 'en':
          result +=
            units[lang][Math.floor(num / largeNumbers.hundred)] +
            ' ' +
            hundred +
            ' ';
          num %= largeNumbers.hundred;
          break;
      }
    }
    if (num === 10) {
      result += tens[lang][Math.floor(num / largeNumbers.ten)];
    }
    if (num >= 20) {
      result += tens[lang][Math.floor(num / largeNumbers.ten)];
      switch (lang) {
        case 'fr':
          if (
            num % largeNumbers.ten !== 0 &&
            (num < 90 || num > 99) &&
            (num < 70 || num > 79)
          ) {
            result += '-' + units[lang][num % largeNumbers.ten];
          }
          if (num >= 91 && num <= 99) {
            result = result.replace(/-dix$/, '');
            result += '-' + teens[lang][num % largeNumbers.ten];
          }
          if (num >= 71 && num <= 79) {
            result = result.replace(/-dix$/, '');
            result += '-' + teens[lang][num % largeNumbers.ten];
          }
          break;
        case 'en':
          if (num % largeNumbers.ten !== 0) {
            result += '-' + units[lang][num % largeNumbers.ten];
          }
          break;
      }
    } else if (num >= largeNumbers.ten) {
      result += teens[lang][num - largeNumbers.ten];
    } else if (num > 0) {
      result += units[lang][num];
    }

    return result.trim();
  }
