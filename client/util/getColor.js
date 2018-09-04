'use strict'


export const getColor = (count) => {
  return count > 14500 ? '#7f0000' :
         count > 13000 ? '#b30000' :
         count > 11500 ? '#d7301f' :
         count > 10000 ? '#ef6548' :
         count > 8500 ? '#fc8d59' :
         count > 7000 ? '#fdbb84' :
         count > 5500 ? '#fdd49e' :
         count > 4000 ? '#fee8c8' :
                        '#fff7ec'
}

