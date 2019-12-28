## Lightweight Pure JS (ES2015) Masked Input Editor

I couldn't find an input masking module wasn't either library-sized or missing what I needed.

This is the result. Simple, small, flexible, works for me.

Tested in Chrome, Firefox and Edge.

### How To

1. import the **MaskedInputs** class and instantiate it

   import MaskedInputs from "./maskedInputs";

   const editState = {}; // contains current form data

   new MaskedInputs(editState);

2. Add the **data-mask** attribute to each <input> to be masked

   > set the attribute value to any of the constants defined in **mask-definitions.js**
   > add/modify named definitions as needed (see below)
   > Example:
   >
   > >  <input name="Phone" id="Phone" class="form-control" type="tel" data-mask="Telephone10"/>

3. Done

### Defining Masks

Mask constants are defined in **mask-definitions.js** using the inlcuded MaskDefinition class with these properties:

name

> the Constant name (e.g. 'Telephone10')

mask

> this is the mask displayed in the input
> for example (XXX) XXX-XXXX for Telephone10

format

> determines the allowed input pattern
>
> \* designates an allowed input position
> any other character is treated as a masked position
> example for Telephone10 : (\*\*\*) \*\*\*-\*\*\*\*

charset

> RegEx definition of the characters allowed in the input
> example, Telephone10 : 0-9
> an Alphanumeric mask would be : 0-9a-zAz

validator (optional)

> a validating javascript function to be executed on each input.
> see the simple example with the definition of the defined 'YearMonthDay' mask
> a custom validation event can be fired from there

```

```
