class FilterService {
  getAuthor() {
    return /(\d{11})/gm;
  }

  getBrazilianValue() {
    return /(\(?\s?R\s?\$\s?\)?\s?\:?\s?)(\d{1,2}.)(\d{3})(,\d{2})?/g;
  }
}

module.exports = FilterService;
