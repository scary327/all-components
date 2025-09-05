const MIN_RATING = 0;
const MAX_RATING = 5;

export const getFormatRating = (rating?: number | null): string => {
  if (rating == null) return MIN_RATING.toString();

  // Ограничиваем значение в пределах min и max
  const clampedRating = Math.min(
    Math.max(Number(rating), MIN_RATING),
    MAX_RATING
  );

  return clampedRating
    .toFixed(1) // округляем до 1 знака
    .replace(/\.0$/, ""); // убираем .0 в конце
};

//Примеры использования:

// getFormatRating(10) - 5
// getFormatRating(-1) - 0
// getFormatRating(4) - 4
