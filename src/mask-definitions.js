class MaskDefinition {
  constructor(name, mask, format, charset, validator = null) {
    //required
    this.name = name;
    this.mask = mask;
    this.format = format;
    this.charset = charset;
    //optional
    this.validator = validator;
  }
}

const Telephone10 = {
  ...new MaskDefinition(
    "Telephone10",
    "(###) ###-####",
    "(***) ***-****",
    "0-9"
  )
};
const MonthDayYear = {
  ...new MaskDefinition(
    "MonthDayYear",
    "MM/DD/YYYY",
    "**/**/****",
    "0-9",
    el => {
      el.classList.remove("invalid");
      var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
      if (!date_regex.test(el.value)) {
        el.classList.add("invalid");
      }
    }
  )
};

const MaskDefinitions = {};
MaskDefinitions.definitions = {
  Telephone10,
  MonthDayYear
};

export { MaskDefinition, Telephone10, MonthDayYear };
export default MaskDefinitions;
