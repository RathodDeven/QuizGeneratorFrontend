//function rotate array n times
export function rotateArray(arr, n) {
  let temp = arr
  for (let i = 0; i < n; i++) {
    temp.unshift(temp.pop())
  }
  return temp
}

export function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}
