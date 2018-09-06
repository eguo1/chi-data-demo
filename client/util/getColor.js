'use strict'


export const getColor = (max, min, adj, count) => {
  const rangeChunk = (max * adj - min) / 9
  return count > min + rangeChunk * 8 ? '#7f0000' :
         count > min + rangeChunk * 7 ? '#b30000' :
         count > min + rangeChunk * 6 ? '#d7301f' :
         count > min + rangeChunk * 5 ? '#ef6548' :
         count > min + rangeChunk * 4 ? '#fc8d59' :
         count > min + rangeChunk * 3 ? '#fdbb84' :
         count > min + rangeChunk * 2 ? '#fdd49e' :
         count > min + rangeChunk ? '#fee8c8' :
                                    '#fff7ec'
}
