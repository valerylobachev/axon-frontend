import buildStore from "./store";

export default function(/* { ssrContext } */) {
  return buildStore();
}
