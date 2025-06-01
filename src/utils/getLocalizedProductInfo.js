/**
 * Get localized product name and description based on current language
 * @param {Object} product - Product object with multilingual fields
 * @param {string} language - Current language code (vi, en, ja, zh)
 * @returns {Object} - Object with localized name and description
 */
export const getLocalizedProductInfo = (product, language = 'vi') => {
  if (!product) {
    return {
      name: '',
      description: ''
    };
  }

  // Default to Vietnamese if language not supported
  const supportedLanguages = ['vi', 'en', 'ja', 'zh'];
  const currentLang = supportedLanguages.includes(language) ? language : 'vi';

  let name = product.name; // Default Vietnamese name
  let description = product.description; // Default Vietnamese description

  // Get localized name
  switch (currentLang) {
    case 'en':
      name = product.nameEn || product.name;
      break;
    case 'ja':
      name = product.nameJa || product.name;
      break;
    case 'zh':
      name = product.nameZh || product.name;
      break;
    default:
      name = product.name;
      break;
  }

  // Get localized description
  switch (currentLang) {
    case 'en':
      description = product.descriptionEn || product.description;
      break;
    case 'ja':
      description = product.descriptionJa || product.description;
      break;
    case 'zh':
      description = product.descriptionZh || product.description;
      break;
    default:
      description = product.description;
      break;
  }

  return {
    name,
    description
  };
};

/**
 * Get localized product name only
 * @param {Object} product - Product object with multilingual fields
 * @param {string} language - Current language code (vi, en, ja, zh)
 * @returns {string} - Localized product name
 */
export const getLocalizedProductName = (product, language = 'vi') => {
  const { name } = getLocalizedProductInfo(product, language);
  return name;
};

/**
 * Get localized product description only
 * @param {Object} product - Product object with multilingual fields
 * @param {string} language - Current language code (vi, en, ja, zh)
 * @returns {string} - Localized product description
 */
export const getLocalizedProductDescription = (product, language = 'vi') => {
  const { description } = getLocalizedProductInfo(product, language);
  return description;
};
