## Lightweight Pure JS (ES2015) Masked Inputs

I couldn't find an input masking module wasn't either library-sized or missing what I needed.

This is the result. Simple, small, flexible, works for me.

Tested in Chrome, Firefox and Edge. I.E. 11 should be fine as well, let me know if you spot something.

### Description

The class MaskedInputs handles masking keystrokes, while mask definitions (of class MaskDefinition) are stored in a separate file for easy maintenance. Definitions are imported into the (your) form page and the form's masked inputs are then initialized using a static method on the MaskedInputs class. Data is kept in the input itself, formatted.

**mask-definitions.js**

Defines named inputs masks (e.g. 'Telephone10'). The file provded has definitions for a 10-digit Telephone number and for a MM/DD/YYYY date input (standard input, not a date picker).

**maskedInputs.js**

Exports a single class ('MaskedInputs') with 2 static methods:

1. init

   Sets up key initial input values, masks and handlers.
   
   Parameter "formState" : initial form values in json

```javascript
MaskedInputs.init(formState)
```

2. maskInput

   Should not be called directly, let the handlers set up by MaskedInput.init do the work
   

### Setup & Usage

1. import the **MaskedInputs** class

```javascript
import MaskedInputs from "./maskedInputs";

```

2. Add the **data-mask** attribute to each input to be masked

   set the attribute value to any of the constants defined in **mask-definitions.js**
   
   add/modify named definitions as needed (see below)
   
   Example:

```javascript
   <input name="Phone" id="Phone" class="form-control" type="tel" data-mask="Telephone10"/>
```

3. Initialize

```javascript
  const formState = {} //current form data as json
  MaskedInputs.init(formState)
```

### Defining Masks

Mask constants are defined in **mask-definitions.js** using the inlcuded MaskDefinition class with these properties:

**name**

The Mask-name name (e.g. 'Telephone10')

**mask**

This is the mask displayed in the input. For example 

````
(XXX) XXX-XXXX //for Telephone10
````

**format**

determines the allowed input pattern :

````
* designates an allowed input position
````
any other character is treated as a masked (non-input) position

````
Telephone10 : (***) ***-****
````

**charset**

RegEx definition of the characters allowed in the input

````
example, Telephone10 charset is  "0-9"
an Alphanumeric mask would be "0-9a-zA-Z"
````

**validator** (optional)

a validating javascript function to be executed on each input.

see the simple example with the definition of the defined 'YearMonthDay' mask

a custom validation event can be fired from there
