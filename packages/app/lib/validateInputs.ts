import isNumeric from 'validator/lib/isNumeric';
import type { EntityConfig } from '../redux/battlefieldSlice';

type ValidatorHash = {
  [key in keyof EntityConfig]?: (v: string) => void;
} & {
  newShortcut?: (v: string) => void;
};

const validatorHash: ValidatorHash = {
  hp: (v) => isNumeric(v),
  newShortcut: (v) => {
    return Boolean(v.match(/.(?<=\d)d(?=\d+)\d*(?:\+\d*)*(?!.)/i));
  },
};

function validateInputs(input: { name: keyof ValidatorHash; value: string }) {
  const inputValidation = validatorHash[input.name] ?? false;
  if (inputValidation) {
    return inputValidation(input.value);
  }
  return true;
}

export default validateInputs;
