import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import dictionaries from './dictionaries';
import { titleCase } from '../util/helpers';

const PARAMS_REG_EXP = '%{(.*?)}';
const paramsRegExp = new RegExp(PARAMS_REG_EXP, 'g');

const content = (path, params = {}, transform) => {
  console.log(window.language);
  const dictionary = dictionaries[window.language || 'en'] || dictionaries.en;

  let value = get((dictionary), path, '');
  value = value.replace(
    paramsRegExp,
    (replaceText, key) => params.hasOwnProperty(key) ? params[key] : '',
  );

  switch (transform) {
    case 'upper':
      value = value.toUpperCase();
      break;
    case 'lower':
      value = value.toLowerCase();
      break;
    case 'title':
      value = titleCase(value);
      break;
    default:
      break;
  }

  return value;
};

const Content = ({ path, params = {}, transform, children }) => (
  <Fragment>
    {content(path, params, transform)}
    {children}
  </Fragment>
);

export default {
  Content,
  content,
};

export {
  Content,
  content,
};