// * 세자리 콤마
export const toComma = (
  value: number | string,
  maxDecimals: number | undefined = 4,
) => {
  if (typeof value === 'string') {
    value = parseFloat(value);
  }
  return value.toLocaleString(undefined, { maximumFractionDigits: maxDecimals });
};

// * Hex 컬러 밝기 감지
export const getBrightness = (color: string) => {
  const hasFullSpec = color.length == 7;
  const m = color.substring(1).match(hasFullSpec ? /(\S{2})/g : /(\S{1})/g);

  if (m) {
    const r = parseInt(m[0] + (hasFullSpec ? '' : m[0]), 16);
    const g = parseInt(m[1] + (hasFullSpec ? '' : m[1]), 16);
    const b = parseInt(m[2] + (hasFullSpec ? '' : m[2]), 16);
    return ((r * 299)+(g * 587)+(b * 114)) / 1000;
  }
  return 0;
};

// * 첫글자 대문자
export const toUpperCaseOnlyFirst = (value: string) => {
  return value.replace(/^[a-z]/, char => char.toUpperCase());
};

// * 첫글자마다 대문자
export const toUpperCaseEachFirst = (value: string) => {
  return value.replace(/\b[a-z]/g, char => char.toUpperCase());
};

// * 숫자 타입 확인
export const isNumber = (value?: number) => {
  return (typeof value === 'number');
};

// * Object to Query
export const toQuery = (queryObject: { [key: string]: any }) => {
  return Object.keys(queryObject)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(`${queryObject[k]}`))
    .join('&');
};
