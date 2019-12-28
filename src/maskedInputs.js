import MaskDefintions from "./mask-definitions";

export default class MaskedInputs {
  static init(formState) {
    this.formState = { ...formState };
    this.masks = {};
    document.querySelectorAll("[data-mask]").forEach(el => {
      this.masks[el.name] = {
        ...MaskDefintions.definitions[el.getAttribute("data-mask")]
      };
      el.addEventListener("keydown", k => {
        this.maskInput(el, k);
        if (this.masks[el.name].validator) this.masks[el.name].validator(el);
      });
      this.maskInput(el);
    }, this);
  }

  static maskInput(el, ke) {
    const maskdef = this.masks[el.name];
    if (el.value.length === 0) {
      el.value = maskdef.mask;
    }
    if (!ke) {
      return;
    }
    //allowed nav keys are unshifted left/right arrow, home, end, tab or shifted-tab
    if (
      (["ArrowLeft", "ArrowRight", "Home", "End"].includes(ke.key) &&
        !ke.shiftKey) ||
      ke.key === "Tab"
    ) {
      return;
    }

    const rex = new RegExp(`[^${maskdef.charset}]`, "g");
    const rin = new RegExp(`[${maskdef.charset}]`, "g");

    if (el.selectionEnd !== el.selectionStart)
      el.setSelectionRange(el.selectionStart, el.selectionStart);

    let position = el.selectionEnd;
    ke.preventDefault();
    switch (ke.key) {
      case "Backspace":
        if (position > 0) {
          let m = maskdef.mask.slice(position - 1, position);
          let left = el.value.slice(0, position - 1);
          let right = el.value.slice(position);
          el.value = `${left}${m}${right}`;
          el.focus();
          el.setSelectionRange(--position, position);
        }
        return;
      case "Delete":
        if (maskdef.format[position] !== "*") return;
        let formatted = el.value.slice(0, position);
        let stripped = el.value.slice(position + 1).replace(rex, "");
        let sx = 0;
        for (var ix = position; ix < maskdef.format.length; ix++) {
          if (maskdef.format[ix] === "*" && sx < stripped.length) {
            formatted += stripped.slice(sx, ++sx);
          } else {
            formatted += maskdef.mask.slice(ix, ix + 1);
          }
        }
        el.value = formatted;
        el.focus();
        el.setSelectionRange(position, position);
        return;
      default:
        if (rin.test(ke.key)) {
          while (
            position <= maskdef.format.length &&
            maskdef.format.slice(position, position + 1) !== "*"
          ) {
            position++;
          }
          if (position < maskdef.format.length) {
            let left = el.value.slice(0, position);
            let right = el.value.slice(position + 1);
            el.value = `${left}${ke.key}${right}`;
            el.focus();
            el.setSelectionRange(++position, position); //always end of input
          }
        }
        return;
    }
  }
}
