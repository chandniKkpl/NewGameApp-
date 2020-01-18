import { findIndex, isEmpty } from "lodash";
import Validator from "../validator";

export const validateLinks = (id, links, err) => {
  const index = id - 1;
  const validate = Validator.createValidator(
    { value: ["required", "link"] },
    links[index],
    "value"
  );

  const { isValid, errors } = validate;
  if (isValid) {
    const value = links[index].value;
    const otherLinks = links.filter(o => o.id !== id);
    const exist =
      findIndex(otherLinks, o => {
        return o.value === value;
      }) !== -1;

    if (exist) {
      err[id] = "Duplicate link";
      return { err, isValid: false };
    }
  }

  err[id] = isEmpty(Object.values(errors)) ? "" : Object.values(errors)[0];
  return { err, isValid };
};

export const validateKeypoints = (id, keypoints, err) => {
  const index = id - 1;
  const validate = Validator.createValidator(
    { value: ["required"] },
    keypoints[index],
    "value"
  );

  const { isValid, errors } = validate;
  if (isValid) {
    const value = keypoints[index].value;
    const otherKeypoints = keypoints.filter(o => o.id !== id);
    const exist =
      findIndex(otherKeypoints, o => {
        return o.value === value;
      }) !== -1;

    if (exist) {
      err[id] = "Duplicate keypoint";
      return { err, isValid: false };
    }
  }

  err[id] = isEmpty(Object.values(errors)) ? "" : Object.values(errors)[0];
  return { err, isValid };
};
