'use strict'

export const getColor = (count) => {
  return count > 13000 ? '#330000' :
         count > 12000 ? '#6d0000' :
         count > 11000 ? '#fff7ec' :
         count > 10000 ? '#fee8c8' :
         count > 9000 ? '#fdd49e' :
         count > 8000 ? '#fdbb84' :
         count > 7000 ? '#fc8d59' :
         count > 6000 ? '#ef6548' :
         count > 5000 ? '#d7301f' :
         count > 4000 ? '#b30000' :
                        '#7f0000'
}

