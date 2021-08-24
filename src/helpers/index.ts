export const formatKNumbers = (num: number) => {
  // replace method to remove .0 for 1K, 2K ...etc
  // $: to match the end. \: escape sequence.
  return num > 999 ? `${(num / 1000).toFixed(1).replace(/\.0$/, "")}K` : num;
};