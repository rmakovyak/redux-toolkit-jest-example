import omit from 'lodash.omit';

export default function clearActionsMeta(actions) {
  return actions.map((action) => omit(action, ['meta']));
}
